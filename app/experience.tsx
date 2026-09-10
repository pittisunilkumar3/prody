'use client';
import {useCallback,useEffect,useRef,useState} from 'react';
import {ArrowDown,ArrowUpRight} from 'lucide-react';
export default function Experience({entertainment=false,backgroundOnly=false}:{entertainment?:boolean;backgroundOnly?:boolean}){
 const sequence=entertainment?'fantasy':'action';const count=entertainment?360:720;

 const section=useRef<HTMLDivElement>(null);const canvas=useRef<HTMLCanvasElement>(null);
 const images=useRef(new Map<number,HTMLImageElement>());const wanted=useRef(0);const visible=useRef(true);
 const drawRef=useRef<()=>void>(()=>{});const loaderRef=useRef<(index:number)=>void>(()=>{});
 const [progress,setProgress]=useState(0);const [ready,setReady]=useState(false);const [motion,setMotion]=useState(true);
 const [frameNumber,setFrameNumber]=useState(0);
 const url=useCallback((index:number)=>`/media/hd-${sequence}/frame-${String(index+1).padStart(3,'0')}.jpg`,[sequence]);
 useEffect(()=>{const query=window.matchMedia('(prefers-reduced-motion: reduce)');setMotion(!query.matches);const update=()=>setMotion(!query.matches);query.addEventListener('change',update);return()=>query.removeEventListener('change',update)},[]);
 useEffect(()=>{
  let active=true;
  const draw=()=>{
   if(!active||!visible.current)return;
   const el=canvas.current;if(!el)return;
   let index=wanted.current;let img=images.current.get(index);
   if(!img?.complete||!img.naturalWidth){const available=[...images.current.entries()].filter(([,image])=>image.complete&&image.naturalWidth);available.sort((a,b)=>Math.abs(a[0]-wanted.current)-Math.abs(b[0]-wanted.current));if(!available.length)return;[index,img]=available[0];}
   const rect=el.getBoundingClientRect();const dpr=Math.min(window.devicePixelRatio||1,2);const width=Math.round(rect.width*dpr),height=Math.round(rect.height*dpr);
   if(!width||!height)return;if(el.width!==width||el.height!==height){el.width=width;el.height=height;}
   const context=el.getContext('2d');if(!context)return;
   context.imageSmoothingEnabled=true;context.imageSmoothingQuality='high';
   const scale=Math.max(width/img.naturalWidth,height/img.naturalHeight);const w=img.naturalWidth*scale,h=img.naturalHeight*scale;
   context.drawImage(img,(width-w)*.5,(height-h)*.5,w,h);setFrameNumber(index);setReady(true);
  };
  drawRef.current=draw;
  const load=(index:number)=>{if(index<0||index>=count||images.current.has(index))return;const img=new Image();img.decoding='async';images.current.set(index,img);img.onload=draw;img.onerror=()=>images.current.delete(index);img.src=url(index);};loaderRef.current=load;
  load(0);for(let i=1;i<4;i++)load(i);
  window.addEventListener('resize',draw);
  return()=>{active=false;window.removeEventListener('resize',draw);for(const img of images.current.values())img.onload=null;images.current.clear()};
 },[count,url]);
 useEffect(()=>{
  let raf=0;
  const update=()=>{cancelAnimationFrame(raf);raf=requestAnimationFrame(()=>{
   const el=section.current;if(!el)return;visible.current=!document.hidden;
   const value=Math.max(0,Math.min(1,window.scrollY/Math.max(1,document.documentElement.scrollHeight-window.innerHeight)));setProgress(value);
   const target=motion?Math.round(value*(count-1)):wanted.current;wanted.current=target;
   loaderRef.current(target);
   // Load around the requested frame, rather than decoding the whole film at once.
   for(let offset=1;offset<=4;offset++){loaderRef.current(target+offset);if(offset<=2)loaderRef.current(target-offset);}
   drawRef.current();
   for(const [index,img]of images.current){if(Math.abs(index-target)>9){img.onload=null;images.current.delete(index);}}
  });};
  update();window.addEventListener('scroll',update,{passive:true});window.addEventListener('resize',update);
  return()=>{cancelAnimationFrame(raf);window.removeEventListener('scroll',update);window.removeEventListener('resize',update)};
 },[count,motion]);
 const destination=entertainment?'#page-content':'#worlds';
 return <><div className="page-film-backdrop" ref={section} aria-hidden="true">
  <img className="world-backdrop" src={url(0)} alt="" fetchPriority="high"/>
  <canvas ref={canvas} className={`world-backdrop ${ready?'frame-visible':''}`} data-frame={frameNumber}/>
  <div className="page-film-shade"/>
 </div>
 {!backgroundOnly&&<section className="continuous-intro" aria-label={entertainment?'ProDyum Entertainments':'ProDyum'}>
  <div className="world-story"><p className="eyebrow"><span className="status-dot"/>{entertainment?'PRODYUM ENTERTAINMENTS':'TECHNOLOGY. CREATIVITY. CINEMA.'}</p><h1>{entertainment?'Stories beyond':'Ideas beyond'}<br/><em>the ordinary.</em></h1><p className="world-description">{entertainment?'Film, original stories, and the craft of bringing them to life.':'Digital experiences. Brand growth. Stories for the screen.'}</p><a className="world-cta" href={destination}>{entertainment?'Explore the studio':'Explore our worlds'}<ArrowUpRight size={18}/></a></div>
  <div className="world-scroll-footer"><span className="world-scroll-hint"><ArrowDown size={16}/> SCROLL TO EXPLORE</span><span>PRODYUM / HYDERABAD</span></div>
 </section>}
 <button className="film-motion-control" onClick={()=>setMotion(value=>!value)} aria-pressed={motion}>{motion?'Pause background':'Enable background motion'}</button>
 <div className="page-film-progress" aria-hidden="true"><span style={{transform:`scaleX(${progress})`}}/></div>
 </>;
}
