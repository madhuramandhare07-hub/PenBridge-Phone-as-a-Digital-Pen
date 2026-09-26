import { useEffect, useRef, useState } from 'react';
import { io, type Socket } from 'socket.io-client';

export type Point = { x: number; y: number; pressure?: number };
export type Tool = 'pen' | 'highlighter' | 'eraser';
export type Stroke = {
  id: string;
  points: Point[];
  color: string;
  width: number;
  tool: Tool;
  opacity: number;
};
export type ConnectionState = 'connecting' | 'connected' | 'disconnected' | 'error';
export type RoomStatus = { phoneConnected?: boolean; laptopConnected?: boolean };
export type SocketTransport = ReturnType<typeof usePenBridgeSocket>;

const socketUrl = import.meta.env.VITE_SOCKET_URL || window.location.origin;

export function usePenBridgeSocket(room?: string, role: 'laptop' | 'phone' = 'phone', enabled = true) {
  const socketRef = useRef<Socket | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connection, setConnection] = useState<ConnectionState>('connecting');
  const [participants, setParticipants] = useState(1);

  useEffect(() => {
    if (!enabled) {
      setConnection('connecting');
      setSocket(null);
      return;
    }
    const socket = io(socketUrl, { transports: ['websocket', 'polling'], autoConnect: true });
    socketRef.current = socket;
    setSocket(socket);
    const onConnect = () => setConnection('connected');
    const onDisconnect = () => setConnection('disconnected');
    const onError = () => setConnection('error');
    const onPresence = (payload: RoomStatus) =>
      setParticipants(Number(Boolean(payload?.laptopConnected)) + Number(Boolean(payload?.phoneConnected)));
    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('connect_error', onError);
    socket.on('room:status', onPresence);
    if (room) socket.emit('room:join', { code: room, role });
    return () => {
      if (room) socket.emit('room:leave');
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('connect_error', onError);
      socket.off('room:status', onPresence);
      socket.disconnect();
      socketRef.current = null;
      setSocket(null);
    };
  }, [enabled, role, room]);

  const emit = (event: string, payload?: unknown, callback?: (response: unknown) => void) => {
    if (payload === undefined) socketRef.current?.emit(event, callback);
    else socketRef.current?.emit(event, payload, callback);
  };

  return { socket, connection, participants, emit };
}

export function createStrokeId() {
  return `stroke-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}