'use client';
import {useEffect,useRef} from 'react';
export default function ScrollStatement({children}:{children:string}){
 const root=useRef<HTMLHeadingElement>(null);
 useEffect(()=>{const el=root.current;if(!el)return;const words=Array.from(el.querySelectorAll<HTMLElement>('.reveal-word'));const media=matchMedia('(prefers-reduced-motion: reduce)');let raf=0;
 const update=()=>{if(raf)return;raf=requestAnimationFrame(()=>{raf=0;if(media.matches){words.forEach(w=>{w.style.opacity='1';w.style.filter='none'});el.style.transform='none';return}const progress=Math.min(1,Math.max(0,(innerHeight*.9-el.getBoundingClientRect().top)/(innerHeight*.55)));el.style.transform=`rotate(${(1-progress)*1.5}deg)`;words.forEach((word,i)=>{const value=Math.min(1,Math.max(0,progress*1.35-i/words.length*.35));word.style.opacity=String(.65+value*.35);word.style.filter=`blur(${(1-value)*.65}px)`})})};update();addEventListener('scroll',update,{passive:true});addEventListener('resize',update);media.addEventListener('change',update);return()=>{cancelAnimationFrame(raf);removeEventListener('scroll',update);removeEventListener('resize',update);media.removeEventListener('change',update)}},[]);
 return <h2 ref={root} className="scroll-statement" aria-label={children}>{children.split(/\s+/).map((word,i)=><span className={`reveal-word ${/^(Stories|Life|Film,|Original|Storytelling\.|Technology|Creativity\.|Growth,|Digital|Brands\.)$/i.test(word)?'word-highlight':''}`} aria-hidden="true" key={i}>{word}{' '}</span>)}</h2>;
}
