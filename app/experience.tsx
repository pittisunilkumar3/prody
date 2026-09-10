'use client';
import {useCallback,useEffect,useRef,useState} from 'react';
import {ArrowDown,ArrowUpRight} from 'lucide-react';
const brandScenes=[
 ['TECHNOLOGY. CREATIVITY. CINEMA.','Ideas beyond','the ordinary.','Digital experiences. Brand growth. Stories for the screen.'],
 ['01 / DIGITAL EXPERIENCES','Make your','presence felt.','Strategy, design, and technology for your next chapter.'],
 ['02 / BRAND & MARKETING','Built to be','remembered.','Connect your brand with the people who matter.'],
 ['03 / CINEMA & PRODUCTION','Stories that','move you.','From the first idea to the final frame.'],
 ['04 / THE PRODYUM ECOSYSTEM','Your vision.','Our universe.','One creative home for what comes next.'],
];
const cinemaScenes=[
 ['PRODYUM ENTERTAINMENTS','Stories beyond','the ordinary.','A cinema-first world of production and possibility.'],
 ['01 / THE IDEA','Every world starts','with a story.','Film, original series, short films, and music videos.'],
 ['02 / THE CRAFT','Create something','worth feeling.','Bring the right people and creative direction together.'],
 ['03 / THE FRAME','Make every','moment matter.','Editing, colour, visual effects, and sound.'],
 ['04 / YOUR NEXT STORY','From imagination','to the screen.','Let’s bring your next production to life.'],
];
export default function Experience({entertainment=false}:{entertainment?:boolean}){
 const sequence=entertainment?'fantasy':'action';const count=entertainment?240:480;
 const scenes=entertainment?cinemaScenes:brandScenes;
 const section=useRef<HTMLElement>(null);const canvas=useRef<HTMLCanvasElement>(null);
 const images=useRef(new Map<number,HTMLImageElement>());const wanted=useRef(0);const visible=useRef(true);
 const drawRef=useRef<()=>void>(()=>{});const loaderRef=useRef<(index:number)=>void>(()=>{});
 const [progress,setProgress]=useState(0);const [ready,setReady]=useState(false);const [motion,setMotion]=useState(true);
 const [frameNumber,setFrameNumber]=useState(0);
 const url=useCallback((index:number)=>`/media/scroll-${sequence}/frame-${String(index+1).padStart(3,'0')}.jpg`,[sequence]);
 useEffect(()=>{const query=window.matchMedia('(prefers-reduced-motion: reduce)');setMotion(!query.matches);const update=()=>setMotion(!query.matches);query.addEventListener('change',update);return()=>query.removeEventListener('change',update)},[]);
 useEffect(()=>{
  let active=true;
  const draw=()=>{
   if(!active||!visible.current)return;
   const el=canvas.current;if(!el)return;
   let index=wanted.current;let img=images.current.get(index);
   if(!img?.complete||!img.naturalWidth){const available=[...images.current.entries()].filter(([,image])=>image.complete&&image.naturalWidth);available.sort((a,b)=>Math.abs(a[0]-wanted.current)-Math.abs(b[0]-wanted.current));if(!available.length)return;[index,img]=available[0];}
   const rect=el.getBoundingClientRect();const dpr=Math.min(window.devicePixelRatio||1,1.5);const width=Math.round(rect.width*dpr),height=Math.round(rect.height*dpr);
   if(!width||!height)return;if(el.width!==width||el.height!==height){el.width=width;el.height=height;}
   const context=el.getContext('2d');if(!context)return;
   const scale=Math.max(width/img.naturalWidth,height/img.naturalHeight);const w=img.naturalWidth*scale,h=img.naturalHeight*scale;
   context.drawImage(img,(width-w)*.5,(height-h)*.5,w,h);setFrameNumber(index);setReady(true);
  };
  drawRef.current=draw;
  const load=(index:number)=>{if(index<0||index>=count||images.current.has(index))return;const img=new Image();img.decoding='async';images.current.set(index,img);img.onload=draw;img.onerror=()=>images.current.delete(index);img.src=url(index);};loaderRef.current=load;
  load(0);for(let i=1;i<12;i++)load(i);
  window.addEventListener('resize',draw);
  return()=>{active=false;window.removeEventListener('resize',draw);for(const img of images.current.values())img.onload=null;images.current.clear()};
 },[count,url]);
 useEffect(()=>{
  let raf=0;
  const update=()=>{cancelAnimationFrame(raf);raf=requestAnimationFrame(()=>{
   const el=section.current;if(!el)return;const rect=el.getBoundingClientRect();visible.current=rect.bottom>0&&rect.top<window.innerHeight;
   const value=Math.max(0,Math.min(1,-rect.top/Math.max(1,el.offsetHeight-window.innerHeight)));setProgress(value);
   const target=motion?Math.round(value*(count-1)):0;wanted.current=target;
   loaderRef.current(target);
   // Load around the requested frame, rather than decoding the whole film at once.
   for(let offset=1;offset<=12;offset++){loaderRef.current(target+offset);if(offset<=6)loaderRef.current(target-offset);}
   drawRef.current();
   for(const [index,img]of images.current){if(Math.abs(index-target)>24){img.onload=null;images.current.delete(index);}}
  });};
  update();window.addEventListener('scroll',update,{passive:true});window.addEventListener('resize',update);
  return()=>{cancelAnimationFrame(raf);window.removeEventListener('scroll',update);window.removeEventListener('resize',update)};
 },[count,motion]);
 const chapter=Math.min(4,Math.floor(progress*5));const text=scenes[chapter];
 const destination=entertainment?'#page-content':'#worlds';
 return <section className="scroll-world" ref={section} aria-label="Scroll-driven cinematic background"><div className="scroll-world-stage">
  <img className="world-backdrop" src={url(0)} alt="" aria-hidden="true" fetchPriority="high"/>
  <canvas ref={canvas} className={`world-backdrop ${ready?'frame-visible':''}`} aria-hidden="true" data-frame={frameNumber}/>
  <div className="world-vignette"/>
  <div className="world-story" key={chapter}><p className="eyebrow"><span className="status-dot"/>{text[0]}</p><h1>{text[1]}<br/><em>{text[2]}</em></h1><p className="world-description">{text[3]}</p><a className="world-cta" href={chapter===4?(entertainment?'/entertainment/contact':'/contact'):destination}>{chapter===4?'Let’s create together':entertainment?'Explore the studio':'Explore our worlds'}<ArrowUpRight size={18}/></a></div>
  <div className="world-side-label" aria-hidden="true">PRODYUM / {entertainment?'ENTERTAINMENTS':'CREATIVE ECOSYSTEM'}</div>
  <div className="world-scroll-footer"><span className="world-scroll-hint"><ArrowDown size={16}/>{progress>.98?'CONTINUE TO EXPLORE':'SCROLL TO MOVE THROUGH THE STORY'}</span><span className="world-chapter" aria-label={`Chapter ${chapter+1} of 5`}>{String(chapter+1).padStart(2,'0')}<span> / 05</span></span><a href={destination}>Skip intro <ArrowDown size={14}/></a></div>
  {!motion&&<button className="enable-background-motion" onClick={()=>setMotion(true)}>Enable scroll animation</button>}
  <div className="world-progress" aria-hidden="true"><span style={{transform:`scaleX(${progress})`}}/></div>
 </div></section>
}
