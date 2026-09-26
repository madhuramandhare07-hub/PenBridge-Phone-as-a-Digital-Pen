import { useState } from 'react';
import { Link, useLocation, useParams } from 'wouter';
import { ArrowLeft, ArrowRight, Code2, Laptop, Lightbulb, LockKeyhole, Menu, MousePointer2, PenLine, QrCode, ScanLine, Smartphone, Terminal, X } from 'lucide-react';
import { Brand, CanvasBoard, Header, QrCard, RoomCode, RoomFrame, StatusPill, Step } from '@/components/penbridge';
import { usePenBridgeSocket } from '@/lib/penbridge-socket';

export function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  return <main className="min-h-[100dvh] overflow-hidden">
    <Header />
    <div className="mx-auto max-w-7xl px-5 lg:px-8">
      <section className="relative grid items-center gap-14 pb-24 pt-14 lg:grid-cols-[.92fr_1.08fr] lg:gap-20 lg:pb-36 lg:pt-24">
        <div className="relative z-10 animate-rise">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-3 py-1.5 text-xs font-medium text-primary"><span className="h-1.5 w-1.5 rounded-full bg-accent signal-pulse" />A writing bridge for ordinary screens</div>
          <h1 className="max-w-xl text-[clamp(3.5rem,8vw,7.5rem)] leading-[.86] tracking-[-.075em]">Put a <span className="display-serif font-normal italic text-primary">pen</span><br />on your laptop.</h1>
          <p className="mt-8 max-w-md text-lg leading-8 text-muted-foreground">PenBridge turns a phone into a precise writing surface. Make a room, scan once, and see every stroke arrive on the big screen.</p>
          <div className="mt-9 flex flex-wrap items-center gap-3"><Link href="/create" className="group inline-flex items-center gap-3 rounded-full bg-primary px-5 py-3.5 text-sm font-semibold text-primary-foreground shadow-sm transition-transform hover:-translate-y-0.5" data-testid="link-create-hero">Create a room <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link><Link href="/join" className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-5 py-3.5 text-sm font-semibold hover:bg-secondary" data-testid="link-join-hero">Join a room</Link></div>
          <div className="mt-10 flex items-center gap-4 text-xs text-muted-foreground"><span className="inline-flex items-center gap-2"><LockKeyhole className="h-3.5 w-3.5" />Rooms disappear when you leave</span><span className="h-1 w-1 rounded-full bg-border" /><span className="mono">0 setup</span></div>
        </div>
        <div className="relative animate-rise animate-rise-delay-2">
          <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
          <div className="relative mx-auto max-w-[620px]">
            <div className="absolute -left-5 top-16 z-20 hidden -rotate-6 rounded-2xl border border-border bg-card px-4 py-3 shadow-md md:block"><div className="flex items-center gap-2 text-xs font-semibold"><span className="h-2 w-2 rounded-full bg-primary" />phone connected</div><p className="mt-1 text-[11px] text-muted-foreground">Your next line is already here</p></div>
            <div className="rounded-[28px] border-[10px] border-foreground/90 bg-foreground p-2 shadow-[0_30px_90px_rgba(25,51,51,.22)]">
              <div className="paper-grid relative aspect-[1.25] overflow-hidden rounded-[15px] bg-[#fcfbf6]">
                <div className="absolute left-[11%] top-[18%] font-serif text-[clamp(1.3rem,3vw,2.7rem)] italic text-primary/85">the room is ready</div>
                <svg viewBox="0 0 600 300" className="absolute inset-0 h-full w-full" fill="none" aria-label="A handwritten line on a whiteboard"><path d="M90 170 C130 120, 155 220, 205 164 S292 113, 318 170 S378 215, 414 150 S478 112, 510 168" stroke="#e16a58" strokeWidth="5" strokeLinecap="round" className="[stroke-dasharray:1200] [animation:drawIn_2.2s_ease-out_.4s_both]" /><path d="M103 210 C175 190, 220 228, 278 209 S392 190, 482 215" stroke="#1f7773" strokeWidth="3" strokeLinecap="round" opacity=".45" /></svg>
                <span className="absolute bottom-5 right-6 mono text-[10px] uppercase tracking-[.18em] text-muted-foreground">room // INK-472</span>
              </div>
            </div>
            <div className="mx-auto mt-[-3px] h-8 w-40 rounded-b-2xl bg-foreground/90 shadow-lg" />
            <div className="absolute -bottom-8 right-8 w-32 rotate-6 rounded-[22px] border-[6px] border-foreground/90 bg-foreground p-1.5 shadow-xl md:w-40">
              <div className="paper-grid aspect-[.58] rounded-[14px] bg-[#fcfbf6] p-3"><div className="mt-6 text-center text-[9px] uppercase tracking-[.15em] text-muted-foreground">write here</div><svg viewBox="0 0 100 120" className="mt-5 h-24 w-full" fill="none"><path d="M12 75 C24 35 30 103 45 63 S63 35 85 72" stroke="#253d3d" strokeWidth="3" strokeLinecap="round" /></svg><div className="mt-2 h-1 rounded-full bg-primary/15" /></div>
            </div>
          </div>
        </div>
      </section>
      <section id="how" className="border-t border-border py-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[.7fr_1.3fr]"><div><p className="mono text-xs uppercase tracking-[.2em] text-accent">The first minute</p><h2 className="mt-4 max-w-sm text-4xl tracking-[-.06em] md:text-5xl">Four moves.<br /><span className="display-serif italic text-primary">Zero mystery.</span></h2></div><div className="grid gap-2 md:grid-cols-2"><Step number="01" title="Create a room" copy="One click gives your session a short, private code." active /><Step number="02" title="Scan the bridge" copy="Point your phone at the QR code. No app, no account." /><Step number="03" title="Write naturally" copy="Your phone becomes a quiet, responsive writing surface." /><Step number="04" title="See it live" copy="Strokes travel over the room as you make them." /></div></div>
      </section>
      <section className="grid gap-10 border-t border-border py-20 lg:grid-cols-[1fr_.75fr] lg:py-28"><div><p className="mono text-xs uppercase tracking-[.2em] text-primary">Built for the in-between</p><h2 className="mt-4 max-w-2xl text-4xl tracking-[-.055em] md:text-6xl">A better surface for the moments when <span className="display-serif italic text-accent">ideas move fast.</span></h2></div><div className="self-end text-sm leading-7 text-muted-foreground lg:pb-2"><p>Sketch a graph in a study group. Work through a proof while your hands stay free. Draw over a bug with a teammate across the room.</p><p className="mt-5">PenBridge is deliberately small: just the space between a thought and its mark.</p></div></section>
      <footer className="flex flex-col justify-between gap-5 border-t border-border py-8 text-sm text-muted-foreground sm:flex-row sm:items-center"><Brand compact /><div className="flex items-center gap-5"><span className="mono text-[10px] uppercase tracking-[.18em]">paper / ink / signal</span><Link href="/dsa/INK-472" className="hover:text-foreground" data-testid="link-dsa-demo">DSA workspace</Link></div></footer>
    </div>
    <button className="fixed right-5 top-5 z-30 rounded-full bg-foreground p-3 text-background md:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'} data-testid="button-mobile-menu">{menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}</button>
    {menuOpen && <div className="fixed inset-x-5 top-16 z-20 rounded-2xl border border-border bg-card p-4 shadow-lg md:hidden"><Link href="/join" className="block rounded-xl px-3 py-3 text-sm hover:bg-secondary" data-testid="link-mobile-join">Join a room</Link><Link href="/create" className="block rounded-xl bg-primary px-3 py-3 text-sm font-semibold text-primary-foreground" data-testid="link-mobile-create">Create a room</Link></div>}
  </main>;
}

function RoomSetup({ mode }: { mode: 'create' | 'join' }) {
  const [, setLocation] = useLocation();
  const [roomInput, setRoomInput] = useState('');
  const [createdCode, setCreatedCode] = useState('');
  const [error, setError] = useState('');
  const { connection, emit } = usePenBridgeSocket(undefined, 'laptop');
  const submit = () => {
    setError('');
    const code = roomInput.trim().toUpperCase();
    if (mode === 'create') {
      emit('room:create', undefined, (response) => {
        const result = response as { ok?: boolean; code?: string; message?: string };
        if (result.ok && result.code) {
          setCreatedCode(result.code);
          setLocation(`/whiteboard/${result.code}`);
        } else setError(result.message ?? 'Could not create a room. Try again.');
      });
      return;
    }
    emit('room:join', { code, role: 'laptop' }, (response) => {
      const result = response as { ok?: boolean; message?: string };
      if (result.ok) setLocation(`/whiteboard/${code}`);
      else setError(result.message ?? 'That room could not be joined.');
    });
  };
  return <main className="min-h-[100dvh] bg-background"><Header action={false} /><div className="mx-auto max-w-5xl px-5 pb-20 pt-10 lg:px-8 lg:pt-20">
    <Link href="/" className="mb-12 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground" data-testid="link-back-home"><ArrowLeft className="h-4 w-4" />Back to PenBridge</Link>
     <div className="grid gap-14 lg:grid-cols-[.8fr_1.2fr] lg:items-start"><div className="animate-rise"><p className="mono text-xs uppercase tracking-[.2em] text-accent">{mode === 'create' ? 'Laptop setup' : 'Phone or laptop'}</p><h1 className="mt-4 text-5xl tracking-[-.065em] md:text-7xl">{mode === 'create' ? <>Make space<br /><span className="display-serif italic text-primary">for a mark.</span></> : <>Step into<br /><span className="display-serif italic text-primary">the room.</span></>}</h1><p className="mt-7 max-w-sm leading-7 text-muted-foreground">{mode === 'create' ? 'Start on the screen you want to draw on. PenBridge will give it a temporary room and a private bridge.' : 'Enter the short code your partner shared. You will join their live whiteboard in one tap.'}</p><div className="mt-10"><StatusPill status={connection} /></div></div>
       <div className="soft-panel animate-rise animate-rise-delay-2 rounded-[28px] p-6 md:p-9">{mode === 'create' ? <><div className="flex items-center gap-3 text-sm font-semibold"><span className="grid h-8 w-8 place-items-center rounded-xl bg-primary text-primary-foreground"><Laptop className="h-4 w-4" /></span>Your new room</div><div className="my-10 rounded-2xl bg-secondary/60 p-7 text-center"><p className="text-xs uppercase tracking-[.18em] text-muted-foreground">Your code</p><p className="mono mt-3 text-5xl tracking-[.14em] text-primary" data-testid="text-new-room-code">{createdCode || '------'}</p><p className="mt-3 text-xs text-muted-foreground">Create the room to generate a private code.</p></div><button onClick={submit} className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-4 font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5" data-testid="button-start-room">Create room <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></button></> : <><div className="flex items-center gap-3 text-sm font-semibold"><span className="grid h-8 w-8 place-items-center rounded-xl bg-accent text-foreground"><ScanLine className="h-4 w-4" /></span>Enter a room code</div><label className="mt-8 block text-xs font-semibold uppercase tracking-[.15em] text-muted-foreground" htmlFor="room-code">Room code</label><input autoFocus id="room-code" value={roomInput} onChange={(event) => setRoomInput(event.target.value.toUpperCase())} onKeyDown={(event) => event.key === 'Enter' && roomInput && submit()} maxLength={6} placeholder="A7K9P2" className="mono mt-3 w-full rounded-2xl border border-input bg-background px-5 py-5 text-3xl tracking-[.12em] outline-none transition-colors placeholder:text-muted-foreground/40 focus:border-primary" data-testid="input-room-code" /><button onClick={submit} disabled={roomInput.trim().length !== 6} className="group mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-4 font-semibold text-primary-foreground transition-all hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40" data-testid="button-join-room">Join whiteboard <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></button><p className="mt-5 flex items-center gap-2 text-xs text-muted-foreground"><QrCode className="h-4 w-4" />Have a QR code? Scan it to skip this step.</p></>}</div>
       {error && <p className="mt-4 rounded-2xl border border-accent/30 bg-accent/10 px-4 py-3 text-sm text-foreground" role="alert" data-testid="status-room-error">{error}</p>}
    </div>
  </div></main>;
}

export function CreatePage() { return <RoomSetup mode="create" />; }
export function JoinPage() { return <RoomSetup mode="join" />; }

export function WhiteboardPage() {
  const { room = 'INK-472' } = useParams<{ room: string }>();
  const [, setLocation] = useLocation();
  const bridge = usePenBridgeSocket(room, 'laptop');
  const { connection, participants, emit } = bridge;
  const [strokeCount, setStrokeCount] = useState(0);
  return <RoomFrame room={room.toUpperCase()} status={connection} participants={participants} onLeave={() => { emit('room:leave', null); setLocation('/'); }}>
     <div className="mx-auto flex w-full max-w-[1500px] flex-1 flex-col gap-5 p-4 lg:flex-row lg:gap-6 lg:p-6"><section className="flex min-h-[62vh] min-w-0 flex-1 flex-col gap-4"><div className="flex items-end justify-between px-1"><div><p className="mono text-[10px] uppercase tracking-[.2em] text-muted-foreground">Shared whiteboard</p><h1 className="mt-1 text-2xl font-semibold tracking-[-.04em]">Make the laptop touchable.</h1></div><span className="hidden items-center gap-2 text-xs text-muted-foreground sm:flex"><span className="h-2 w-2 rounded-full bg-accent" />{strokeCount ? `${strokeCount} ${strokeCount === 1 ? 'stroke' : 'strokes'}` : 'Ready for ink'}</span></div><CanvasBoard room={room} transport={bridge} onStrokeCount={setStrokeCount} /></section><aside className="grid w-full shrink-0 gap-4 lg:w-[280px] lg:grid-rows-[auto_1fr]"><QrCard room={room.toUpperCase()} /><div className="hidden rounded-3xl border border-border bg-secondary/40 p-5 lg:block"><p className="mono text-[10px] uppercase tracking-[.18em] text-muted-foreground">Bridge notes</p><div className="mt-5 space-y-4 text-sm"><div className="flex gap-3"><MousePointer2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" /><p>Use a finger or stylus. Pressure is carried across the bridge.</p></div><div className="flex gap-3"><Smartphone className="mt-0.5 h-4 w-4 shrink-0 text-primary" /><p>Keep this tab open while your phone is writing.</p></div></div></div></aside></div>
  </RoomFrame>;
}

export function MobilePage() {
  const params = new URLSearchParams(window.location.search);
  const room = params.get('room')?.toUpperCase() || 'INK-472';
  const bridge = usePenBridgeSocket(room, 'phone');
  const { connection } = bridge;
  const [help, setHelp] = useState(false);
  return <main className="min-h-[100dvh] bg-foreground text-background"><header className="flex items-center justify-between px-5 py-5"><Brand compact /><div className="flex items-center gap-2"><StatusPill status={connection} /><button onClick={() => setHelp(!help)} className="rounded-full border border-background/20 p-2 text-background/65 hover:text-background" aria-label="Show writing tips" data-testid="button-mobile-help">{help ? <X className="h-4 w-4" /> : <Lightbulb className="h-4 w-4" />}</button></div></header><div className="mx-auto flex min-h-[calc(100dvh-80px)] max-w-xl flex-col px-4 pb-4"><div className="mb-4 flex items-end justify-between px-1"><div><p className="mono text-[10px] uppercase tracking-[.18em] text-background/50">Writing into</p><button onClick={() => navigator.clipboard?.writeText(room)} className="mono mt-1 text-3xl tracking-[.12em] text-background" data-testid="button-mobile-copy-room">{room}</button></div><span className="text-right text-xs text-background/50">Laptop is<br />watching live</span></div>{help && <div className="mb-3 rounded-2xl border border-background/15 bg-background/8 p-4 text-sm text-background/75 animate-rise" data-testid="text-mobile-help">Write anywhere on the paper. Lift your finger to finish a stroke. Your marks travel as you make them.</div>}<div className="flex min-h-0 flex-1"><CanvasBoard room={room} transport={bridge} className="w-full" /></div><div className="flex items-center justify-center gap-2 pt-4 text-xs text-background/40"><SignalIcon />Touch or stylus enabled</div></div></main>;
}

function SignalIcon() { return <span className="inline-flex h-2 w-2 rounded-full bg-accent signal-pulse" />; }

export function DsaPage() {
  const { room = 'INK-472' } = useParams<{ room: string }>();
  const [, setLocation] = useLocation();
  const bridge = usePenBridgeSocket(room, 'laptop');
  const { connection, participants, emit } = bridge;
  const [selected, setSelected] = useState('Binary Search');
  const topics = ['Binary Search', 'Two Pointers', 'Sliding Window', 'Graph Traversal'];
  return <RoomFrame room={room.toUpperCase()} status={connection} participants={participants} onLeave={() => { emit('room:leave', null); setLocation('/'); }}><div className="mx-auto flex w-full max-w-[1500px] flex-1 flex-col p-4 lg:p-6"><div className="mb-5 flex items-center justify-between"><div><div className="flex items-center gap-2 text-xs text-muted-foreground"><Code2 className="h-4 w-4 text-accent" />DSA workspace <span className="text-border">/</span> {selected}</div><h1 className="mt-2 text-2xl font-semibold tracking-[-.04em]">Think it through together.</h1></div><button onClick={() => setSelected(topics[(topics.indexOf(selected) + 1) % topics.length])} className="hidden items-center gap-2 rounded-full border border-border px-4 py-2 text-xs font-medium hover:bg-secondary sm:flex" data-testid="button-next-topic">Next topic <ArrowRight className="h-3.5 w-3.5" /></button></div><div className="grid min-h-[70vh] flex-1 overflow-hidden rounded-3xl border border-border bg-card lg:grid-cols-[210px_1fr_1fr]"><aside className="border-b border-border bg-secondary/35 p-4 lg:border-b-0 lg:border-r"><p className="mono mb-4 text-[10px] uppercase tracking-[.18em] text-muted-foreground">Problems</p>{topics.map((topic, index) => <button key={topic} onClick={() => setSelected(topic)} className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm transition-colors ${selected === topic ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-secondary hover:text-foreground'}`} data-testid={`button-topic-${index}`}><span className="mono text-[10px] opacity-60">0{index + 1}</span>{topic}</button>)}</aside><section className="flex min-h-[430px] min-w-0 flex-col border-b border-border p-4 lg:border-b-0 lg:border-r lg:p-6"><div className="mb-3 flex items-center justify-between"><div><p className="mono text-[10px] uppercase tracking-[.16em] text-muted-foreground">Prompt</p><h2 className="mt-1 text-lg font-semibold">{selected}</h2></div><span className="rounded-full bg-accent/15 px-2.5 py-1 text-[10px] font-semibold text-accent">practice</span></div><div className="flex-1 rounded-2xl bg-secondary/35 p-5 text-sm leading-7 text-muted-foreground"><p>Given a sorted array of integers, find the position of a target value. Return the index, or <span className="mono text-foreground">-1</span> if the target is not present.</p><div className="mt-6 border-l-2 border-primary/40 pl-4 text-foreground/80"><p className="mono text-xs">input: [2, 4, 7, 11, 18] → 11</p><p className="mono mt-2 text-xs">output: 3</p></div></div><div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground"><Terminal className="h-3.5 w-3.5" />Solve aloud, sketch freely.</div></section><section className="flex min-h-[430px] min-w-0 flex-col p-4 lg:p-6"><div className="mb-3 flex items-center justify-between"><div><p className="mono text-[10px] uppercase tracking-[.16em] text-muted-foreground">Shared sketch</p><p className="mt-1 text-sm text-muted-foreground">Your partner sees this canvas live.</p></div><PenLine className="h-4 w-4 text-primary" /></div><CanvasBoard room={room} transport={bridge} className="min-h-[370px]" /></section></div></div></RoomFrame>;
}