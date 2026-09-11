'use client';
import {useEffect,useRef,useState} from 'react';
import {ArrowUpRight,ArrowDown,ArrowLeft,ArrowRight,Plus,Minus,Menu,X,Pause,Play} from 'lucide-react';
import {digitalServices,cinemaServices,channels} from './site-content';

const worlds=[
 {name:'Brand',line:'A presence.\nA point of view.',description:'Distinctive identities and campaigns that give your business a voice of its own.',image:'/images/brand-paper.png',alt:'Sculptural red paper and frosted glass in a sunlit gallery',division:'digital' as const,service:1,interest:'Branding & design',tags:'BRAND STRATEGY / IDENTITY / CONTENT'},
 {name:'Digital',line:'Designed to connect.\nBuilt to perform.',description:'Websites, marketing, and digital experiences shaped around your audience and your ambition.',image:'/images/cinematic-shore.png',alt:'Terracotta architectural disc standing in a dramatic ocean landscape',division:'digital' as const,service:2,interest:'A digital project',tags:'WEB / EXPERIENCE / DIGITAL MARKETING'},
 {name:'Film',line:'Some stories\nstay with you.',description:'Films, original series, and visual storytelling. From the first idea to the final experience.',image:'/images/cinema-stage.png',alt:'An amber-lit cinema soundstage with a production camera',division:'cinema' as const,service:0,interest:'A film or production',tags:'PRODUCTION / ORIGINAL SERIES / POST'},
];
const steps=[['Listen','Every good project starts with a conversation. Your ambition, your audience, and the possibility ahead.'],['Shape','We define the idea, the creative direction, and a plan that brings the right people together.'],['Make','Designers, developers, and storytellers turn that direction into something tangible.'],['Refine','We bring care to the final details, then prepare the work for its next chapter.']];
export default function Home(){
 const [scene,setScene]=useState(2),[division,setDivision]=useState<'digital'|'cinema'>('cinema'),[open,setOpen]=useState<number|null>(0);
 const [paused,setPaused]=useState(false),[menu,setMenu]=useState(false),[scrolled,setScrolled]=useState(false),[interest,setInterest]=useState('A film or production');
 const root=useRef<HTMLDivElement>(null),stage=useRef<HTMLElement>(null),touch=useRef<{x:number;y:number}|null>(null);
 const world=worlds[scene],services=division==='cinema'?cinemaServices:digitalServices;
 const selectScene=(i:number)=>{const next=(i+worlds.length)%worlds.length;setScene(next);setDivision(worlds[next].division);setOpen(worlds[next].service);setInterest(worlds[next].interest)};
 useEffect(()=>{const media=matchMedia('(prefers-reduced-motion: reduce)');setPaused(media.matches);const change=()=>setPaused(media.matches);media.addEventListener('change',change);return()=>media.removeEventListener('change',change)},[]);
 useEffect(()=>{
  const el=root.current;if(!el)return;let raf=0;
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.1});el.querySelectorAll('[data-reveal]').forEach(node=>observer.observe(node));
  const update=()=>{if(raf)return;raf=requestAnimationFrame(()=>{raf=0;setScrolled(scrollY>60);el.style.setProperty('--scroll',`${Math.min(scrollY,innerHeight)}`);el.style.setProperty('--page-progress',`${scrollY/Math.max(1,document.documentElement.scrollHeight-innerHeight)}`);if(stage.current){const b=stage.current.getBoundingClientRect();stage.current.style.setProperty('--scene-scroll',`${Math.max(-1,Math.min(1,-b.top/innerHeight))}`)}})};
  const pointer=(event:PointerEvent)=>{if(paused||event.pointerType==='touch')return;el.style.setProperty('--pointer-x',`${(event.clientX/innerWidth-.5)*18}px`);el.style.setProperty('--pointer-y',`${(event.clientY/innerHeight-.5)*12}px`)};
  addEventListener('scroll',update,{passive:true});addEventListener('resize',update);addEventListener('pointermove',pointer,{passive:true});update();
  return()=>{observer.disconnect();cancelAnimationFrame(raf);removeEventListener('scroll',update);removeEventListener('resize',update);removeEventListener('pointermove',pointer)};
 },[paused]);
 useEffect(()=>{if(!menu)return;const escape=(e:KeyboardEvent)=>{if(e.key==='Escape')setMenu(false)};addEventListener('keydown',escape);return()=>removeEventListener('keydown',escape)},[menu]);
 return <div ref={root} className={`studio ${paused?'motion-off':''}`}>
  <a className="skip" href="#about">Skip to content</a><div className="page-progress"/>
  <header className={scrolled||menu?'solid':''}>
   <a href="#home" className="wordmark" aria-label="ProDyum home">prodyum<span>•</span></a>
   <nav aria-label="Main navigation" className={menu?'open':''}>{[['about','Studio'],['worlds','Our worlds'],['services','Expertise'],['channels','Discover']].map(([id,label])=><a key={id} href={`#${id}`} onClick={()=>setMenu(false)}>{label}</a>)}</nav>
   <a className="nav-contact" href="#contact">Start a conversation <ArrowUpRight size={16}/></a>
   <button className="menu-toggle" aria-label={menu?'Close menu':'Open menu'} aria-expanded={menu} onClick={()=>setMenu(!menu)}>{menu?<X/>:<Menu/>}</button>
  </header>
  <main>
   <section id="home" className="hero">
    <div className="hero-image"><img src="/images/cinematic-shore.png" alt="A lone figure on a dark shore facing a monumental terracotta disc" fetchPriority="high"/></div>
    <div className="hero-topline"><span>INDEPENDENT CREATIVE STUDIO</span><span>HYDERABAD, INDIA</span></div>
    <div className="hero-title"><h1>Made to<br/><em>move you.</em></h1><a className="hero-title-mark" href="#worlds" aria-label="Discover our creative worlds">↗</a></div>
    <div className="hero-bottom"><a href="#worlds" className="explore-link"><span className="arrow-circle"><ArrowDown size={21}/></span><span>Explore our worlds</span></a><p>We shape brands, build digital experiences,<br/>and tell stories that stay with you.</p><span className="hero-caption">TECHNOLOGY. CREATIVITY. CINEMA.</span></div>
   </section>
   <section id="about" className="studio-intro padded">
    <div className="section-label"><span>01</span> THE STUDIO</div>
    <div className="intro-copy"><h2 data-reveal>Different minds.<br/><em>A shared instinct.</em></h2><div className="intro-description" data-reveal><p>To find the idea that matters.<br/>And make it impossible to ignore.</p><div><p>ProDyum brings strategic thinking, digital craft, and cinematic storytelling into one creative ecosystem.</p><p>From a brand’s first impression to a film’s final frame, we connect the right disciplines around your ambition.</p></div></div></div>
   </section>
   <section id="worlds" className="worlds" ref={stage}>
    <div className="worlds-heading padded"><div className="section-label"><span>02</span> OUR WORLDS</div><h2 data-reveal>One studio.<br/><em>More possibilities.</em></h2><p>Choose a direction.<br/>See where it takes you.</p></div>
    <div className="world-tabs" role="group" aria-label="Explore a creative discipline">{worlds.map((w,i)=><button key={w.name} aria-pressed={scene===i} onClick={()=>selectScene(i)}><span>0{i+1}</span>{w.name}<ArrowUpRight size={22}/></button>)}</div>
    <div className="scene" onTouchStart={e=>{const t=e.touches[0];touch.current=t?{x:t.clientX,y:t.clientY}:null}} onTouchEnd={e=>{const t=e.changedTouches[0];if(!touch.current||!t)return;const distance=t.clientX-touch.current.x,vertical=t.clientY-touch.current.y;if(Math.abs(distance)>75&&Math.abs(distance)>Math.abs(vertical)*1.3)selectScene(scene+(distance<0?1:-1));touch.current=null}}>
     <div className="scene-art" key={world.image}><img src={world.image} alt={world.alt} loading="lazy"/></div><div className="scene-shade"/>
     <div className="scene-copy" key={world.name} aria-live="polite"><span className="micro">{scene===2?'PRODYUM ENTERTAINMENTS':'PRODYUM IT'}</span><h3>{world.line.split('\n').map((line,i)=><span key={line}>{i===1?<em>{line}</em>:line}</span>)}</h3><p>{world.description}</p><a href="#services" className="light-link">Explore {world.name.toLowerCase()} services <ArrowUpRight size={18}/></a></div>
     <div className="scene-footer"><span>{world.tags}</span><span>STUDIO CONCEPT / {world.name.toUpperCase()}</span></div>
     <div className="scene-controls"><span>0{scene+1}<b> / 03</b></span><button onClick={()=>selectScene(scene-1)} aria-label="Previous creative world"><ArrowLeft size={20}/></button><button onClick={()=>selectScene(scene+1)} aria-label="Next creative world"><ArrowRight size={20}/></button></div>
    </div>
   </section>
   <section id="services" className="expertise padded">
    <div className="expertise-heading"><div className="section-label"><span>03</span> OUR EXPERTISE</div><h2 data-reveal>Beautiful thinking.<br/><em>Considered craft.</em></h2><p>From the big picture to the smallest detail.<br/>Explore what we can create together.</p><div className="service-image"><img src={division==='cinema'?'/images/cinema-stage.png':'/images/brand-paper.png'} alt={division==='cinema'?'Cinematic studio concept':'Brand and design concept'} loading="lazy"/><span>{division==='cinema'?'PRODUCTION & POST-PRODUCTION':'STRATEGY, DESIGN & TECHNOLOGY'}</span></div></div>
    <div className="service-index"><div className="service-tabs" role="group" aria-label="Service division"><button aria-pressed={division==='digital'} onClick={()=>{setDivision('digital');setOpen(0);setInterest('A digital project')}}>Digital & design</button><button aria-pressed={division==='cinema'} onClick={()=>{setDivision('cinema');setOpen(0);setInterest('A film or production')}}>Film & production</button></div>{services.map((s,i)=><article key={s.title} className={open===i?'service expanded':'service'}><button className="service-title" onClick={()=>setOpen(open===i?null:i)} aria-expanded={open===i} aria-controls={`service-panel-${i}`}><span>0{i+1}</span><h3>{s.title}</h3>{open===i?<Minus size={19}/>:<Plus size={19}/>}</button><div id={`service-panel-${i}`} hidden={open!==i} className="service-body"><p>{s.description}</p><ul>{s.items.map(item=><li key={item}>{item}</li>)}</ul><a href="#contact" onClick={()=>setInterest(s.title)}>Start this conversation <ArrowUpRight size={16}/></a></div></article>)}</div>
   </section>
   <section id="process" className="process padded"><div className="process-top"><div className="section-label"><span>04</span> THE APPROACH</div><h2 data-reveal>Good things happen<br/><em>when we connect.</em></h2></div><div className="process-grid">{steps.map(([title,description],i)=><article data-reveal key={title}><span>0{i+1}</span><h3>{title}<span>.</span></h3><p>{description}</p></article>)}</div></section>
   <section id="channels" className="channels padded"><div className="channel-heading"><div className="section-label"><span>05</span> ON AIR</div><h2 data-reveal>Stay <em>curious.</em></h2><p>Stories, conversations, and original content.<br/>Discover the ProDyum channels.</p></div><div className="channel-list">{channels.map((c,i)=><a href={c.url} target="_blank" rel="noreferrer" key={c.name} className="channel-link" data-reveal><div className={`channel-monogram mark-${i}`} aria-hidden="true">{c.mark}</div><div><span className="micro">{c.tag}</span><h3>{c.name}</h3><p>{c.description}</p></div><span className="channel-action">Visit channel <ArrowUpRight/></span></a>)}</div></section>
   <section className="collaborate padded" data-reveal><div className="section-label">A PLACE FOR YOUR PERSPECTIVE</div><h2>Bring your craft.<br/><em>Find your people.</em></h2><div><p>Creators, future teammates, cast, crew, and production partners. There’s more than one way to be part of the story.</p><a href="#contact" onClick={()=>setInterest('Careers, casting or collaboration')}>Let’s meet <ArrowUpRight size={18}/></a></div></section>
   <section id="contact" className="contact padded"><div className="contact-intro"><div className="section-label"><span>06</span> START SOMETHING</div><span>YOUR NEXT CHAPTER BEGINS WITH A CONVERSATION.</span></div><h2 data-reveal>What’s on<br/><em>your mind?</em><ArrowUpRight aria-hidden="true"/></h2><div className="contact-row"><div className="interest"><label htmlFor="interest">I’d like to talk about</label><select id="interest" value={interest} onChange={e=>setInterest(e.target.value)}>{Array.from(new Set(['A film or production','A digital project','Branding & design','Careers, casting or collaboration',...digitalServices.map(s=>s.title),...cinemaServices.map(s=>s.title)])).map(option=><option key={option}>{option}</option>)}</select></div><a className="email" href={`mailto:hr@prodyum.in?subject=${encodeURIComponent('ProDyum enquiry — '+interest)}`}>hr@prodyum.in <ArrowUpRight size={24}/></a><p>Opens an email draft<br/>with your chosen topic.</p></div></section>
  </main>
  <footer><a href="#home" className="footer-logo">prodyum<span>•</span></a><div className="footer-bottom"><span>© {new Date().getFullYear()} ProDyum</span><span>MADE OF DIFFERENT MINDS. BASED IN HYDERABAD.</span><a href="#home">Back to top ↑</a></div></footer>
  <button className="motion-control" aria-label={paused?'Enable animations':'Pause animations'} aria-pressed={paused} onClick={()=>setPaused(!paused)}>{paused?<Play size={13}/>:<Pause size={13}/>}<span>Motion {paused?'off':'on'}</span></button>
 </div>
}
