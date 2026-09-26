import { randomBytes } from "node:crypto";
import type { Server as HttpServer } from "node:http";
import { Server as SocketIOServer, type Socket } from "socket.io";
import { logger } from "./lib/logger";

type Role = "laptop" | "phone";
type Tool = "pen" | "highlighter" | "eraser";

export interface Point {
  x: number;
  y: number;
  pressure?: number;
}

export interface Stroke {
  id: string;
  points: Point[];
  color: string;
  width: number;
  tool: Tool;
  opacity: number;
}

interface Room {
  code: string;
  createdAt: number;
  lastActivity: number;
  laptopSocketId?: string;
  phoneSocketId?: string;
  strokes: Stroke[];
  redo: Stroke[];
  liveStrokes: Map<string, Stroke>;
}

interface JoinPayload {
  code: string;
  role: Role;
}

interface Ack<T> {
  (payload: T): void;
}

interface RoomResponse {
  ok: boolean;
  code?: string;
  error?: "INVALID_CODE" | "ROOM_NOT_FOUND" | "ROOM_FULL";
  message?: string;
  strokes?: Stroke[];
  phoneConnected?: boolean;
  laptopConnected?: boolean;
}

const rooms = new Map<string, Room>();
const ROOM_TTL_MS = 30 * 60 * 1000;
const CODE_PATTERN = /^[A-Z0-9]{6}$/;

function createRoomCode() {
  let code = "";
  do {
    code = randomBytes(5)
      .toString("base64url")
      .replace(/[^A-Z0-9]/gi, "")
      .toUpperCase()
      .slice(0, 6);
  } while (code.length !== 6 || rooms.has(code));
  return code;
}

function getStatus(room: Room) {
  return {
    phoneConnected: Boolean(room.phoneSocketId),
    laptopConnected: Boolean(room.laptopSocketId),
  };
}

function sendStatus(io: SocketIOServer, room: Room) {
  io.to(room.code).emit("room:status", getStatus(room));
}

function clearSocketRole(socket: Socket, room: Room) {
  if (room.laptopSocketId === socket.id) room.laptopSocketId = undefined;
  if (room.phoneSocketId === socket.id) room.phoneSocketId = undefined;
}

function getRoomForSocket(socket: Socket) {
  const code = socket.data.roomCode as string | undefined;
  return code ? rooms.get(code) : undefined;
}

function touch(room: Room) {
  room.lastActivity = Date.now();
}

// Socket.IO ACK callbacks are optional because clients may emit fire-and-forget events.
export function createRealtimeServer(httpServer: HttpServer) {
  const io = new SocketIOServer(httpServer, {
    path: "/api/socket.io",
    cors: {
      origin: true,
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    socket.on(
      "room:create",
      (ack?: Ack<RoomResponse>) => {
        const respond: Ack<RoomResponse> = typeof ack === "function" ? ack : () => {};
        const code = createRoomCode();
        const room: Room = {
          code,
          createdAt: Date.now(),
          lastActivity: Date.now(),
          laptopSocketId: socket.id,
          strokes: [],
          redo: [],
          liveStrokes: new Map(),
        };
        rooms.set(code, room);
        socket.data.roomCode = code;
        socket.data.role = "laptop";
        void socket.join(code);
        respond({ ok: true, code, ...getStatus(room), strokes: [] });
      },
    );

    socket.on(
      "room:join",
      (payload: JoinPayload, ack?: Ack<RoomResponse>) => {
        const respond: Ack<RoomResponse> = typeof ack === "function" ? ack : () => {};
        const code = payload?.code?.trim().toUpperCase();
        const role = payload?.role;
        if (!CODE_PATTERN.test(code) || (role !== "laptop" && role !== "phone")) {
          respond({
            ok: false,
            error: "INVALID_CODE",
            message: "Enter a six-character room code.",
          });
          return;
        }

        const room = rooms.get(code);
        if (!room) {
          respond({
            ok: false,
            error: "ROOM_NOT_FOUND",
            message: "That room is no longer available.",
          });
          return;
        }

        const existingSocketId = role === "laptop" ? room.laptopSocketId : room.phoneSocketId;
        const existingSocketIsAlive =
          Boolean(existingSocketId) && io.sockets.sockets.has(existingSocketId!);
        const occupied =
          Boolean(existingSocketId) &&
          existingSocketId !== socket.id &&
          existingSocketIsAlive;
        if (occupied) {
          respond({
            ok: false,
            error: "ROOM_FULL",
            message: `This room already has a ${role} connected.`,
          });
          return;
        }

        const previousRoom = getRoomForSocket(socket);
        if (previousRoom && previousRoom.code !== code) {
          clearSocketRole(socket, previousRoom);
          void socket.leave(previousRoom.code);
          sendStatus(io, previousRoom);
        }

        if (role === "laptop") room.laptopSocketId = socket.id;
        else room.phoneSocketId = socket.id;
        socket.data.roomCode = code;
        socket.data.role = role;
        touch(room);
        void socket.join(code);

        respond({ ok: true, code, ...getStatus(room), strokes: room.strokes });
        socket.emit("canvas:state", { strokes: room.strokes });
        sendStatus(io, room);
      },
    );

    socket.on("room:leave", () => {
      const room = getRoomForSocket(socket);
      if (!room) return;
      clearSocketRole(socket, room);
      touch(room);
      void socket.leave(room.code);
      sendStatus(io, room);
      socket.data.roomCode = undefined;
      socket.data.role = undefined;
    });

    socket.on("stroke:start", (stroke: Stroke) => {
      const room = getRoomForSocket(socket);
      if (!room || !isValidStroke(stroke)) return;
      touch(room);
      room.liveStrokes.set(stroke.id, {
        ...stroke,
        points: [stroke.points[0]],
      });
      socket.to(room.code).emit("stroke:start", stroke);
    });

    socket.on(
      "stroke:move",
      (payload: { id: string; point: Point }) => {
        const room = getRoomForSocket(socket);
        if (!room || !payload?.id || !isValidPoint(payload.point)) return;
        const liveStroke = room.liveStrokes.get(payload.id);
        if (!liveStroke) return;
        touch(room);
        liveStroke.points.push(payload.point);
        socket.to(room.code).emit("stroke:move", payload);
      },
    );

    socket.on("stroke:end", (stroke: Stroke) => {
      const room = getRoomForSocket(socket);
      if (!room || !isValidStroke(stroke)) return;
      touch(room);
      room.liveStrokes.delete(stroke.id);
      room.strokes.push(stroke);
      room.redo = [];
      socket.to(room.code).emit("stroke:end", stroke);
    });

    socket.on("canvas:clear", () => {
      const room = getRoomForSocket(socket);
      if (!room) return;
      touch(room);
      room.strokes = [];
      room.redo = [];
      room.liveStrokes.clear();
      io.to(room.code).emit("canvas:state", { strokes: [] });
    });

    socket.on("canvas:undo", () => {
      const room = getRoomForSocket(socket);
      if (!room || room.strokes.length === 0) return;
      touch(room);
      const stroke = room.strokes.pop();
      if (stroke) room.redo.push(stroke);
      io.to(room.code).emit("canvas:state", { strokes: room.strokes });
    });

    socket.on("canvas:redo", () => {
      const room = getRoomForSocket(socket);
      if (!room || room.redo.length === 0) return;
      touch(room);
      const stroke = room.redo.pop();
      if (stroke) room.strokes.push(stroke);
      io.to(room.code).emit("canvas:state", { strokes: room.strokes });
    });

    socket.on("disconnect", () => {
      const room = getRoomForSocket(socket);
      if (!room) return;
      clearSocketRole(socket, room);
      touch(room);
      sendStatus(io, room);
    });
  });

  const cleanupTimer = setInterval(() => {
    const cutoff = Date.now() - ROOM_TTL_MS;
    for (const [code, room] of rooms) {
      if (room.lastActivity < cutoff) rooms.delete(code);
    }
  }, 60_000);
  cleanupTimer.unref();

  logger.info("PenBridge realtime server ready");
  return io;
}

function isValidPoint(point: Point | undefined): point is Point {
  return Boolean(
    point &&
      Number.isFinite(point.x) &&
      Number.isFinite(point.y) &&
      point.x >= 0 &&
      point.x <= 1 &&
      point.y >= 0 &&
      point.y <= 1,
  );
}

function isValidStroke(stroke: Stroke | undefined): stroke is Stroke {
  return Boolean(
    stroke &&
      typeof stroke.id === "string" &&
      stroke.id.length < 100 &&
      Array.isArray(stroke.points) &&
      stroke.points.length > 0 &&
      stroke.points.every(isValidPoint) &&
      typeof stroke.color === "string" &&
      /^#[0-9a-f]{6}$/i.test(stroke.color) &&
      Number.isFinite(stroke.width) &&
      stroke.width > 0 &&
      stroke.width < 100 &&
      ["pen", "highlighter", "eraser"].includes(stroke.tool) &&
      Number.isFinite(stroke.opacity) &&
      stroke.opacity >= 0 &&
      stroke.opacity <= 1,
  );
}