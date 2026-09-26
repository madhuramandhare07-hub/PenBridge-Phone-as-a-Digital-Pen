import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import type { PointerEvent as ReactPointerEvent } from 'react';
import { Link } from 'wouter';
import { ArrowLeft, ArrowUpRight, Check, CircleHelp, Copy, ExternalLink, PenLine, Redo2, Share2, Signal, Trash2, Undo2, Wifi, WifiOff } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { cn } from '@/lib/utils';
import { createStrokeId, type ConnectionState, type Point, type SocketTransport, type Stroke, usePenBridgeSocket } from '@/lib/penbridge-socket';

export function Brand({ compact = false }: { compact?: boolean }) {
  return <Link href="/" className="group inline-flex items-center gap-3" data-testid="link-brand">
    <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground shadow-sm">
      <span className="absolute h-5 w-5 rounded-full border border-primary-foreground/50" />
      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
    </span>
    {!compact && <span className="text-[17px] font-semibold tracking-[-.03em]">PenBridge</span>}
  </Link>;
}

export function Header({ action = true }: { action?: boolean }) {
  return <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-5 lg:px-8">
    <Brand />
    <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
      <Link href="/#how" className="transition-colors hover:text-foreground" data-testid="link-how-it-works">How it works</Link>
      <Link href="/join" className="transition-colors hover:text-foreground" data-testid="link-join-nav">Join a room</Link>
      {action && <Link href="/create" className="rounded-full bg-foreground px-4 py-2.5 font-medium text-background transition-transform hover:-translate-y-0.5" data-testid="link-create-nav">Create room <ArrowUpRight className="ml-1 inline h-4 w-4" /></Link>}
    </nav>
    <Link href="/create" className="rounded-full bg-foreground px-3.5 py-2 text-xs font-semibold text-background md:hidden" data-testid="link-create-mobile">Create room</Link>
  </header>;
}

export function Step({ number, title, copy, active = false }: { number: string; title: string; copy: string; active?: boolean }) {
  return <div className={cn('flex gap-4 rounded-2xl p-4 transition-colors', active && 'bg-secondary/65')}>
    <span className={cn('mono grid h-8 w-8 shrink-0 place-items-center rounded-full border text-xs', active ? 'border-primary bg-primary text-primary-foreground' : 'border-border text-muted-foreground')}>{number}</span>
    <div><h3 className="font-semibold">{title}</h3><p className="mt-1 text-sm leading-6 text-muted-foreground">{copy}</p></div>
  </div>;
}

export function StatusPill({ status, participants = 1 }: { status: ConnectionState; participants?: number }) {
  const labels = { connected: 'Live', connecting: 'Connecting', disconnected: 'Offline', error: 'Reconnect needed' };
  const Icon = status === 'connected' ? Wifi : status === 'connecting' ? Signal : WifiOff;
  return <div className={cn('inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium', status === 'connected' ? 'border-primary/20 bg-primary/8 text-primary' : 'border-accent/35 bg-accent/10 text-foreground')} data-testid="status-connection">
    <Icon className={cn('h-3.5 w-3.5', status === 'connecting' && 'signal-pulse')} />
    <span>{labels[status]}</span>{status === 'connected' && participants > 1 && <><span className="h-1 w-1 rounded-full bg-current opacity-50" /><span>{participants} connected</span></>}
  </div>;
}

export function RoomCode({ code, large = false }: { code: string; large?: boolean }) {
  const [copied, setCopied] = useState(false);
  const copyCode = async () => {
    await navigator.clipboard?.writeText(code);
    setCopied(true); setTimeout(() => setCopied(false), 1400);
  };
  return <button onClick={copyCode} className="group inline-flex items-center gap-2 text-left" aria-label="Copy room code" data-testid="button-copy-room-code">
    <span className={cn('mono font-medium tracking-[.16em]', large ? 'text-3xl text-foreground' : 'text-sm')}>{code}</span>
    {copied ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-3.5 w-3.5 text-muted-foreground transition-colors group-hover:text-foreground" />}
  </button>;
}

export function QrCard({ room }: { room: string }) {
  const joinUrl = `${window.location.origin}/mobile?room=${encodeURIComponent(room)}`;
  return <div className="soft-panel rounded-3xl p-5" data-testid="card-qr">
    <div className="flex items-start justify-between gap-5"><div><p className="text-xs font-semibold uppercase tracking-[.17em] text-muted-foreground">Join from phone</p><p className="mt-2 max-w-[190px] text-sm leading-5 text-muted-foreground">Scan this code, then write on the screen that opens.</p></div><div className="rounded-lg bg-primary/10 p-2"><Share2 className="h-4 w-4 text-primary" /></div></div>
    <div className="mx-auto my-5 flex aspect-square w-44 items-center justify-center rounded-xl bg-[#fcfbf6] p-3 shadow-inner" aria-label={`QR code for room ${room}`}><QRCodeSVG value={joinUrl} size={152} bgColor="#fcfbf6" fgColor="#253d3d" level="M" includeMargin={false} /></div>
    <div className="flex items-center justify-between border-t border-border pt-4"><div><p className="text-[10px] uppercase tracking-[.16em] text-muted-foreground">Room code</p><RoomCode code={room} /></div><a href={joinUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline" data-testid="link-open-phone">Open <ExternalLink className="h-3.5 w-3.5" /></a></div>
  </div>;
}

export function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  return <div className="fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3 rounded-full bg-foreground px-4 py-3 text-sm text-background shadow-lg animate-rise" role="status" data-testid="toast-notification"><Check className="h-4 w-4 text-accent" />{message}<button onClick={onClose} className="ml-1 text-background/60 hover:text-background" aria-label="Dismiss notification" data-testid="button-dismiss-toast">Dismiss</button></div>;
}

export function Toolbar({ color, setColor, width, setWidth, onClear, onUndo, onRedo, onPen, penActive = true }: { color: string; setColor: (value: string) => void; width: number; setWidth: (value: number) => void; onClear: () => void; onUndo: () => void; onRedo: () => void; onPen?: () => void; penActive?: boolean }) {
  return <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-border bg-card p-2 shadow-sm" data-testid="toolbar-canvas">
    <button onClick={onPen} className={cn('grid h-10 w-10 place-items-center rounded-xl transition-colors', penActive ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary')} aria-label="Pen tool" data-testid="button-tool-pen"><PenLine className="h-4 w-4" /></button>
    <button onClick={() => setColor(color === '#253d3d' ? '#e16a58' : '#253d3d')} className="grid h-10 w-10 place-items-center rounded-xl hover:bg-secondary" aria-label="Change ink color" data-testid="button-change-ink"><span className="h-5 w-5 rounded-full border-2 border-card" style={{ background: color, boxShadow: '0 0 0 1px hsl(var(--border))' }} /></button>
    <label className="hidden items-center gap-2 px-2 text-xs text-muted-foreground sm:flex">Size <input type="range" min="2" max="14" value={width} onChange={(event) => setWidth(Number(event.target.value))} className="accent-primary" data-testid="input-ink-size" /></label>
    <span className="mx-1 h-6 w-px bg-border" />
    <button onClick={onUndo} className="grid h-10 w-10 place-items-center rounded-xl text-muted-foreground hover:bg-secondary hover:text-foreground" aria-label="Undo last stroke" data-testid="button-undo"><Undo2 className="h-4 w-4" /></button>
    <button onClick={onRedo} className="grid h-10 w-10 place-items-center rounded-xl text-muted-foreground hover:bg-secondary hover:text-foreground" aria-label="Redo stroke" data-testid="button-redo"><Redo2 className="h-4 w-4" /></button>
    <button onClick={onClear} className="ml-auto grid h-10 w-10 place-items-center rounded-xl text-muted-foreground hover:bg-accent/15 hover:text-accent" aria-label="Clear canvas" data-testid="button-clear-canvas"><Trash2 className="h-4 w-4" /></button>
  </div>;
}

export function CanvasBoard({ room, readOnly = false, className, onStrokeCount, transport }: { room: string; readOnly?: boolean; className?: string; onStrokeCount?: (count: number) => void; transport?: SocketTransport }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const strokesRef = useRef<Stroke[]>([]);
  const redoRef = useRef<Stroke[]>([]);
  const activeRef = useRef<Stroke | null>(null);
  const ownTransport = usePenBridgeSocket(room, readOnly ? 'laptop' : 'phone', !transport);
  const { socket, connection, emit } = transport ?? ownTransport;
  const [color, setColor] = useState('#253d3d');
  const [width, setWidth] = useState(4);
  const [toast, setToast] = useState('');
  const [hasInk, setHasInk] = useState(false);
  const scalePoint = (event: ReactPointerEvent<HTMLCanvasElement>): Point => {
    const rect = event.currentTarget.getBoundingClientRect();
    return { x: (event.clientX - rect.left) / rect.width, y: (event.clientY - rect.top) / rect.height, pressure: event.pressure };
  };
  const render = () => {
    const canvas = canvasRef.current; if (!canvas) return;
    const context = canvas.getContext('2d'); if (!context) return;
    context.clearRect(0, 0, canvas.width, canvas.height); context.lineCap = 'round'; context.lineJoin = 'round';
    [...strokesRef.current, ...(activeRef.current ? [activeRef.current] : [])].forEach((stroke) => {
      context.strokeStyle = stroke.color; context.lineWidth = stroke.width; context.beginPath();
      stroke.points.forEach((point, index) => index === 0 ? context.moveTo(point.x * canvas.width, point.y * canvas.height) : context.lineTo(point.x * canvas.width, point.y * canvas.height)); context.stroke();
    });
  };
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const resize = () => { const rect = canvas.getBoundingClientRect(); canvas.width = rect.width; canvas.height = rect.height; render(); };
    resize(); window.addEventListener('resize', resize); return () => window.removeEventListener('resize', resize);
  }, []);
  useEffect(() => {
    if (!socket) return;
    const addStroke = (stroke: Stroke) => { if (stroke?.id && !strokesRef.current.some((item) => item.id === stroke.id)) { strokesRef.current = [...strokesRef.current, stroke]; setHasInk(true); onStrokeCount?.(strokesRef.current.length); render(); } };
    const moveStroke = (payload: { id: string; point: Point }) => { const item = strokesRef.current.find((stroke) => stroke.id === payload.id); if (item) { item.points.push(payload.point); render(); } };
    const endStroke = (stroke: Stroke) => addStroke(stroke);
    const syncState = (payload: { strokes?: Stroke[] }) => { strokesRef.current = payload?.strokes ?? []; redoRef.current = []; setHasInk(strokesRef.current.length > 0); render(); onStrokeCount?.(strokesRef.current.length); };
    socket.on('stroke:start', addStroke); socket.on('stroke:move', moveStroke); socket.on('stroke:end', endStroke); socket.on('canvas:state', syncState);
    return () => { socket.off('stroke:start', addStroke); socket.off('stroke:move', moveStroke); socket.off('stroke:end', endStroke); socket.off('canvas:state', syncState); };
  }, [socket, onStrokeCount]);
  useEffect(() => { if (connection === 'disconnected') setToast('Connection paused. We will keep trying.'); }, [connection]);
  const start = (event: ReactPointerEvent<HTMLCanvasElement>) => { if (readOnly) return; event.currentTarget.setPointerCapture(event.pointerId); const stroke = { id: createStrokeId(), points: [scalePoint(event)], color, width, tool: 'pen' as const, opacity: 1 }; activeRef.current = stroke; emit('stroke:start', stroke); render(); };
  const move = (event: ReactPointerEvent<HTMLCanvasElement>) => { if (!activeRef.current) return; const point = scalePoint(event); activeRef.current.points.push(point); emit('stroke:move', { id: activeRef.current.id, point }); render(); };
  const end = () => { if (!activeRef.current) return; const stroke = activeRef.current; activeRef.current = null; strokesRef.current.push(stroke); redoRef.current = []; setHasInk(true); emit('stroke:end', stroke); onStrokeCount?.(strokesRef.current.length); render(); };
  const clear = () => { strokesRef.current = []; redoRef.current = []; setHasInk(false); emit('canvas:clear', null); onStrokeCount?.(0); render(); };
  const undo = () => { const stroke = strokesRef.current.pop(); if (stroke) redoRef.current.push(stroke); setHasInk(strokesRef.current.length > 0); emit('canvas:undo', null); onStrokeCount?.(strokesRef.current.length); render(); };
  const redo = () => { const stroke = redoRef.current.pop(); if (stroke) strokesRef.current.push(stroke); setHasInk(strokesRef.current.length > 0); emit('canvas:redo', null); onStrokeCount?.(strokesRef.current.length); render(); };
  return <div className={cn('relative flex min-h-0 flex-1 flex-col gap-3', className)}>
    <div className="paper-grid relative min-h-[360px] flex-1 overflow-hidden rounded-3xl border border-border bg-[#fcfbf6] shadow-inner">
      <canvas ref={canvasRef} className={cn('absolute inset-0 h-full w-full touch-none', readOnly ? 'cursor-default' : 'cursor-crosshair')} onPointerDown={start} onPointerMove={move} onPointerUp={end} onPointerCancel={end} aria-label={readOnly ? 'Shared whiteboard' : 'Writing canvas'} data-testid="canvas-whiteboard" />
      {!hasInk && <div className="pointer-events-none absolute inset-0 grid place-items-center"><div className="text-center text-muted-foreground/70"><PenLine className="mx-auto mb-3 h-7 w-7" /><p className="text-sm">{readOnly ? 'Waiting for the first stroke' : 'Write here. It appears on the laptop instantly.'}</p></div></div>}
      <div className="pointer-events-none absolute bottom-4 left-4 rounded-full bg-card/75 px-3 py-1.5 text-[10px] uppercase tracking-[.13em] text-muted-foreground backdrop-blur" data-testid="text-canvas-hint">{readOnly ? 'Live canvas' : 'Pointer or stylus enabled'}</div>
    </div>
    {!readOnly && <Toolbar color={color} setColor={setColor} width={width} setWidth={setWidth} onClear={clear} onUndo={undo} onRedo={redo} />}
    {toast && <Toast message={toast} onClose={() => setToast('')} />}
  </div>;
}

export function RoomFrame({ children, room, status, participants, onLeave }: { children: ReactNode; room: string; status: ConnectionState; participants: number; onLeave: () => void }) {
  return <div className="flex min-h-[100dvh] flex-col bg-background">
    <header className="flex h-[70px] shrink-0 items-center justify-between border-b border-border px-4 lg:px-7"><div className="flex items-center gap-4"><Brand compact /><span className="hidden h-5 w-px bg-border sm:block" /><div className="hidden items-center gap-2 sm:flex"><span className="text-xs text-muted-foreground">Room</span><RoomCode code={room} /></div></div><div className="flex items-center gap-3"><StatusPill status={status} participants={participants} /><button onClick={onLeave} className="hidden rounded-full border border-border px-3 py-2 text-xs font-medium text-muted-foreground hover:bg-secondary hover:text-foreground sm:block" data-testid="button-leave-room">Leave room</button><button onClick={onLeave} className="rounded-full p-2 text-muted-foreground hover:bg-secondary sm:hidden" aria-label="Leave room" data-testid="button-leave-room-mobile"><ArrowLeft className="h-4 w-4" /></button></div></header>
    {children}
  </div>;
}

export function PageNotice({ children }: { children: ReactNode }) {
  return <div className="mx-auto mt-4 flex max-w-5xl items-center gap-3 rounded-2xl border border-accent/30 bg-accent/10 px-4 py-3 text-sm text-foreground"><CircleHelp className="h-4 w-4 shrink-0 text-accent" />{children}</div>;
}