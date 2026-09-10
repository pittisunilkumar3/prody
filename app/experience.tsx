'use client';
import {useEffect,useRef,useState} from 'react';
import {ArrowDown,ArrowRight} from 'lucide-react';
import {advancePlayhead} from './film-motion';
export default function Experience({entertainment=false,backgroundOnly=false}:{entertainment?:boolean;backgroundOnly?:boolean}){
 const film=useRef<HTMLVideoElement>(null),wanted=useRef(0),enabled=useRef(true);
 const [motion,setMotion]=useState(true),[ready,setReady]=useState(false),[progress,setProgress]=useState(0);
 const sequence=entertainment?'fantasy':'action';
 useEffect(()=>{const media=matchMedia('(prefers-reduced-motion: reduce)');const update=()=>{enabled.current=!media.matches;setMotion(!media.matches)};update();media.addEventListener('change',update);return()=>media.removeEventListener('change',update)},[]);
 useEffect(()=>{
  const video=film.current;if(!video)return;let raf=0,renderFrame=0,alive=true,lastStep=performance.now();
  const animate=(now:number)=>{renderFrame=0;
   if(!alive||!enabled.current||document.hidden||video.readyState<2||!Number.isFinite(video.duration))return;
   const target=Math.min(Math.max(0,video.duration-.045),wanted.current);
   if(Math.abs(video.currentTime-target)<1/48)return;
   if(!video.seeking){const next=advancePlayhead(video.currentTime,target,(now-lastStep)/1000);lastStep=now;video.currentTime=next;}
   renderFrame=requestAnimationFrame(animate);
  };
  const seek=()=>{if(!renderFrame&&alive&&enabled.current&&!document.hidden){lastStep=performance.now();renderFrame=requestAnimationFrame(animate)}};
  const update=()=>{if(raf)return;raf=requestAnimationFrame(()=>{raf=0;const footer=document.querySelector('.site-footer');const stop=footer?footer.getBoundingClientRect().top+scrollY-innerHeight*.2:document.documentElement.scrollHeight-innerHeight;const fraction=Math.min(1,Math.max(0,scrollY/Math.max(1,stop)));setProgress(fraction);if(enabled.current&&Number.isFinite(video.duration)){wanted.current=fraction*video.duration;seek()}})};
  const loaded=()=>{setReady(true);update()};
  // Scroll sets the destination; a capped clock carries the film there gently.
  video.addEventListener('loadeddata',loaded);video.addEventListener('seeked',seek);video.addEventListener('canplay',seek);addEventListener('scroll',update,{passive:true});addEventListener('resize',update);document.addEventListener('visibilitychange',update);
  const resize=new ResizeObserver(update);resize.observe(document.body);
  if(video.readyState>=2)loaded();else video.load();update();
  return()=>{alive=false;cancelAnimationFrame(raf);cancelAnimationFrame(renderFrame);resize.disconnect();video.removeEventListener('loadeddata',loaded);video.removeEventListener('seeked',seek);video.removeEventListener('canplay',seek);removeEventListener('scroll',update);removeEventListener('resize',update);document.removeEventListener('visibilitychange',update)};
 },[sequence,motion]);
 const toggle=()=>{enabled.current=!enabled.current;setMotion(enabled.current)};
 return <><div className="page-film-backdrop" aria-hidden="true"><img className="world-backdrop" src={`/media/hd-${sequence}/frame-001.jpg`} alt="" fetchPriority="high"/><video ref={film} className={`world-backdrop ${ready?'film-ready':''}`} muted playsInline preload="auto" disablePictureInPicture poster={`/media/hd-${sequence}/frame-001.jpg`}><source src={`/media/cinema/${sequence}-hd.mp4`} type="video/mp4"/></video><div className="page-film-shade"/></div>
 {!backgroundOnly&&<section className="continuous-intro" aria-label={entertainment?'ProDyum Entertainments':'ProDyum'}><div className="world-story"><p className="eyebrow">{entertainment?'PRODYUM ENTERTAINMENTS':'TECHNOLOGY. CREATIVITY. CINEMA.'}</p><h1>{entertainment?'Bringing Stories':'Bringing Ideas'}<br/><span className="headline-highlight">{entertainment?'Beyond The Screen.':'Into A New Dimension.'}</span></h1><p className="world-description">{entertainment?'Film, original series, and visual storytelling. From the first idea to the final frame.':'Digital experiences, brand strategy, and entertainment. Different disciplines. One shared ambition.'}<strong>{entertainment?' We create stories that stay with you.':' Your next chapter starts here.'}</strong></p><a className="world-cta split-cta" href={entertainment?'#page-content':'#worlds'}><span>{entertainment?'EXPLORE OUR STUDIO':'EXPLORE OUR WORLDS'}</span><span><ArrowRight size={20}/></span></a></div><div className="world-scroll-footer"><span className="world-scroll-hint"><ArrowDown size={14}/> SCROLL TO DISCOVER</span><span>HYDERABAD, INDIA</span></div></section>}
 <button className="film-motion-control" onClick={toggle} aria-pressed={motion}>{motion?'Pause motion':'Enable motion'}</button><div className="page-film-progress" aria-hidden="true"><span style={{transform:`scaleX(${progress})`}}/></div></>;
}
