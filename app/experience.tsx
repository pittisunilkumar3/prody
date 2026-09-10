'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight, Download, Pause, Play, RotateCcw } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { Slider } from '@/components/ui/slider';

const CHAPTERS = [
  { name: 'The spark', label: 'TECHNOLOGY. CREATIVITY. CINEMA.', first: 'Built to make', last: 'you', accent: 'feel.', description: 'We build brands. We bring stories to life.', detail: 'Welcome to the world of ProDyum.' },
  { name: 'Digital', label: '01 / PRODYUM IT', first: 'Ideas into', last: 'digital', accent: 'experiences.', description: 'Websites that connect. Technology that delivers.', detail: 'Designed around your next chapter.' },
  { name: 'Brand', label: '02 / BRANDING & DIGITAL MARKETING', first: 'Be seen.', last: 'Be', accent: 'remembered.', description: 'Strategy, identity, and content with a clear purpose.', detail: 'Make your presence mean something.' },
  { name: 'Cinema', label: '03 / PRODYUM ENTERTAINMENTS', first: 'Every story', last: 'deserves a', accent: 'screen.', description: 'Movies. Original series. Films that stay with you.', detail: 'From the first idea to the final frame.' },
  { name: 'Together', label: '04 / ONE CREATIVE ECOSYSTEM', first: 'Your vision.', last: 'Our', accent: 'universe.', description: 'Technology and storytelling, brought together.', detail: 'Let’s create what comes next.' },
];
const FRAME_COUNT = 360;
const frameUrl = (index: number) => `/media/frames/frame-${String(index + 1).padStart(3, '0')}.jpg`;

export default function Experience() {
  const journey = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const cache = useRef(new Map<number, HTMLImageElement>());
  const wanted = useRef(0);
  const painter = useRef<() => void>(() => {});
  const [progress, setProgress] = useState(0);
  const [motion, setMotion] = useState(true);
  const [ready, setReady] = useState(false);
  const [filmOpen, setFilmOpen] = useState(false);
  const [filmError, setFilmError] = useState(false);
  const video = useRef<HTMLVideoElement>(null);
  const chapter = Math.min(4, Math.floor(progress * 5));
  const current = CHAPTERS[chapter];

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    setMotion(!media.matches);
    const update = () => setMotion(!media.matches);
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = journey.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        setProgress(Math.max(0, Math.min(1, -rect.top / Math.max(1, rect.height - window.innerHeight))));
      });
    };
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('scroll', update); window.removeEventListener('resize', update); };
  }, []);

  useEffect(() => {
    if (!motion) return;
    let active = true;
    const draw = () => {
      const el = canvas.current;
      if (!el || !active) return;
      let img = cache.current.get(wanted.current);
      if (!img?.complete || !img.naturalWidth) {
        const candidates = [...cache.current.entries()].filter(([, value]) => value.complete && value.naturalWidth);
        candidates.sort((a, b) => Math.abs(a[0] - wanted.current) - Math.abs(b[0] - wanted.current));
        img = candidates[0]?.[1];
      }
      if (!img) return;
      const rect = el.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = Math.round(rect.width * ratio), h = Math.round(rect.height * ratio);
      if (!w || !h) return;
      if (el.width !== w || el.height !== h) { el.width = w; el.height = h; }
      const context = el.getContext('2d');
      if (!context) return;
      const scale = Math.max(w / img.naturalWidth, h / img.naturalHeight);
      const iw = img.naturalWidth * scale, ih = img.naturalHeight * scale;
      context.drawImage(img, (w - iw) * (w < h ? .68 : .6), (h - ih) * .5, iw, ih);
      setReady(true);
    };
    painter.current = draw;
    window.addEventListener('resize', draw);
    draw();
    return () => { active = false; window.removeEventListener('resize', draw); };
  }, [motion]);

  useEffect(() => {
    if (!motion) return;
    const target = Math.min(FRAME_COUNT - 1, Math.round(progress * (FRAME_COUNT - 1)));
    wanted.current = target;
    // A small moving cache prevents hundreds of decoded frames staying in memory.
    for (const [key, img] of cache.current) {
      if (Math.abs(key - target) > 14) { img.onload = null; cache.current.delete(key); }
    }
    const offsets = [0, 1, -1, 2, -2, 3, -3, 4, 5, 6];
    for (const offset of offsets) {
      const index = target + offset;
      if (index < 0 || index >= FRAME_COUNT || cache.current.has(index)) continue;
      const img = new Image();
      img.decoding = 'async';
      img.onload = () => painter.current();
      img.onerror = () => cache.current.delete(index);
      cache.current.set(index, img);
      img.src = frameUrl(index);
    }
    painter.current();
  }, [progress, motion]);

  const seek = useCallback((value: number) => {
    const el = journey.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + value * (el.offsetHeight - window.innerHeight), behavior: 'instant' });
    setProgress(value);
  }, []);


  return <>
    <section className={`journey ${motion ? '' : 'motion-off'}`} ref={journey} aria-label="Explore the ProDyum brand film">
      <div className="hero-stage">
        <img className="hero-art" src="/media/portal.jpg" alt="A chrome ribbon portal with cyan and lime reflections" fetchPriority="high"/>
        <canvas className={`hero-art frame-canvas ${ready && motion ? 'is-ready' : ''}`} ref={canvas} aria-hidden="true"/>
        <div className="hero-shade"/>
        <div className="hero-copy" key={chapter}>
          <p className="eyebrow"><span className="status-dot"/>{current.label}</p>
          <h1>{current.first}<br/>{current.last} <em>{current.accent}</em></h1>
          <p className="hero-description">{current.description}<br/>{current.detail}</p>
          <div className="hero-actions"><a className="primary-link" href={chapter === 4 ? '/contact' : '#worlds'}>{chapter === 4 ? 'Let’s create together' : 'Explore our worlds'} <ArrowUpRight size={19}/></a><button className="watch-button" onClick={() => { setFilmError(false); setFilmOpen(true); }}><span className="play-disc"><Play size={13} fill="currentColor"/></span>Watch the film <span className="duration">00:30</span></button></div>
        </div>
        <div className="scene-note" aria-hidden="true"><span>PRODYUM UNIVERSE</span><span>{String(chapter + 1).padStart(2, '0')} — 05</span><i/></div>
        <div className="journey-controls">
          <div className="chapter-nav" aria-label="Film chapters">{CHAPTERS.map((item, index) => <button key={item.name} className={index === chapter ? 'active' : ''} aria-current={index === chapter ? 'step' : undefined} onClick={() => seek(index / 5 + (index ? .005 : 0))}><span>{String(index + 1).padStart(2, '0')}</span>{item.name}</button>)}</div>
          <div className="scrubber-row"><span className="timecode">00:{String(Math.floor(progress * 30)).padStart(2, '0')}</span><Slider aria-label="Film position" value={[progress * 100]} min={0} max={100} step={.1} onValueChange={(value) => seek((Array.isArray(value) ? value[0] : value) / 100)}/><span className="timecode total-time">00:30</span></div>
          <div className="hero-bottom"><a className="scroll-label" href="#worlds"><ArrowDown size={14}/><span>SCROLL TO EXPLORE</span></a><button className="motion-button" aria-pressed={!motion} onClick={() => setMotion(!motion)}>{motion ? <Pause size={12}/> : <Play size={12}/>} {motion ? 'REDUCE MOTION' : 'ENABLE MOTION'}</button><span>HYDERABAD, INDIA</span></div>
        </div>
      </div>
    </section>
    <Dialog open={filmOpen} onOpenChange={setFilmOpen}>
      <DialogContent className="film-dialog">
        <DialogTitle className="film-title">ProDyum — Built to make you feel.</DialogTitle>
        <DialogDescription>Our worlds, in thirty seconds.</DialogDescription>
        <div className="film-screen">
          <video ref={video} src="/media/prodyum-film.mp4" poster="/media/portal.jpg" controls autoPlay muted playsInline preload="metadata" onError={() => setFilmError(true)} aria-label="30-second ProDyum brand film"><track kind="captions" src="/media/film-captions.vtt" srcLang="en" label="English"/></video>
        </div>
        {filmError && <p role="alert">The film couldn’t load. You can try the download link below.</p>}
        <div className="film-footer"><button onClick={() => { if (video.current) { video.current.currentTime = 0; void video.current.play().catch(() => {}); } }}><RotateCcw size={15}/> Replay</button><a href="/media/prodyum-film.mp4" download="prodyum-brand-film.mp4"><Download size={15}/> Download film</a></div>
      </DialogContent>
    </Dialog>
  </>;
}
