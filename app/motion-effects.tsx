'use client';
import {useEffect} from 'react';
import {usePathname} from 'next/navigation';
export default function MotionEffects(){
 const pathname=usePathname();
 useEffect(()=>{
  const media=window.matchMedia('(prefers-reduced-motion: reduce)');let observer:IntersectionObserver|undefined;let mutation:MutationObserver|undefined;
  const decorated=new Set<HTMLElement>();
  const selector='.world-card,.capability-card,.channel-card,.project-direction,.values-grid article,.process-grid article,.service-row,.story-copy,.contact-layout aside,.enquiry-panel,.footer-columns>div,.industry-list>div,.about h2,.section-heading,.cross-world>div,.page-cta h2,.talent-intro>div';
  const tiltSelector='.world-card,.capability-card,.channel-card,.project-direction,.process-grid article';
  const decorate=()=>{document.querySelectorAll<HTMLElement>(selector).forEach((el,index)=>{if(decorated.has(el))return;decorated.add(el);el.style.setProperty('--reveal-delay',`${(index%4)*65}ms`);if(el.getBoundingClientRect().top<window.innerHeight*.95){el.dataset.revealed='true';}else{el.dataset.revealed='false';observer?.observe(el)}if(el.matches(tiltSelector))el.dataset.tilt='true';el.classList.add('depth-reveal')})};
  const pointer=(event:PointerEvent)=>{if(event.pointerType==='touch')return;const el=(event.target as HTMLElement).closest<HTMLElement>('[data-tilt]');if(!el)return;const rect=el.getBoundingClientRect();const x=(event.clientX-rect.left)/rect.width,y=(event.clientY-rect.top)/rect.height;el.style.setProperty('--tilt-x',`${(y-.5)*-12}deg`);el.style.setProperty('--tilt-y',`${(x-.5)*16}deg`);el.style.setProperty('--glow-x',`${x*100}%`);el.style.setProperty('--glow-y',`${y*100}%`);el.dataset.hovered='true'};
  const leave=(event:PointerEvent)=>{const el=(event.target as HTMLElement).closest<HTMLElement>('[data-tilt]');if(el&&(!(event.relatedTarget instanceof Node)||!el.contains(event.relatedTarget))){el.style.setProperty('--tilt-x','0deg');el.style.setProperty('--tilt-y','0deg');el.dataset.hovered='false'}};
  const start=()=>{if(media.matches)return;document.documentElement.classList.add('rich-motion');observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){(entry.target as HTMLElement).dataset.revealed='true';observer?.unobserve(entry.target)}}),{threshold:.08,rootMargin:'0px 0px -20px 0px'});decorate();mutation=new MutationObserver(decorate);mutation.observe(document.querySelector('main')||document.body,{childList:true,subtree:true});document.addEventListener('pointermove',pointer,{passive:true});document.addEventListener('pointerout',leave,{passive:true})};
  const stop=()=>{observer?.disconnect();mutation?.disconnect();document.documentElement.classList.remove('rich-motion');document.removeEventListener('pointermove',pointer);document.removeEventListener('pointerout',leave);decorated.forEach(el=>{el.classList.remove('depth-reveal');delete el.dataset.tilt;delete el.dataset.revealed;delete el.dataset.hovered;el.style.removeProperty('--tilt-x');el.style.removeProperty('--tilt-y')});decorated.clear()};
  const change=()=>{stop();start()};start();media.addEventListener('change',change);return()=>{stop();media.removeEventListener('change',change)};
 },[pathname]);
 return null;
}
