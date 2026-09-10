'use client';
import {useEffect,useRef,useState} from 'react';
import {ArrowDown,ArrowUpRight} from 'lucide-react';
const worlds={
 brand:[{word:'IMAGINE.',title:'Every possibility starts here.',description:'A new brand. A digital experience. A story waiting to be told.',label:'01 / THE IDEA',href:'/about'},{word:'CREATE.',title:'Different disciplines. One vision.',description:'Design, technology, and storytelling, brought into the same space.',label:'02 / THE CRAFT',href:'/it/services'},{word:'CONNECT.',title:'Make something that matters.',description:'Bring your next ambition into the ProDyum universe.',label:'03 / THE IMPACT',href:'/contact'}],
 entertainment:[{word:'IMAGINE.',title:'Build a world worth entering.',description:'Movies, original series, short films, and music videos.',label:'01 / DEVELOPMENT',href:'/entertainment/services'},{word:'CREATE.',title:'Bring every detail to life.',description:'From production and performance to colour, effects, and sound.',label:'02 / PRODUCTION',href:'/entertainment/services'},{word:'FEEL.',title:'Leave a lasting impression.',description:'Tell us about the story you want to bring to the screen.',label:'03 / THE SCREEN',href:'/entertainment/contact'}],
 it:[{word:'DEFINE.',title:'Find what makes you different.',description:'Your audience, your ambitions, and a clear creative direction.',label:'01 / STRATEGY',href:'/it/services'},{word:'BUILD.',title:'Turn ideas into experiences.',description:'Brand identities, websites, campaigns, and multimedia.',label:'02 / DESIGN & TECHNOLOGY',href:'/it/services'},{word:'CONNECT.',title:'Meet your audience where they are.',description:'Create a stronger digital presence with ProDyum IT.',label:'03 / DIGITAL PRESENCE',href:'/it/contact'}],
};
const spatialLabels=['BRAND STRATEGY','DIGITAL EXPERIENCES','ORIGINAL STORIES','DESIGN','TECHNOLOGY','PRODUCTION','CREATIVITY','POST-PRODUCTION'];
export default function CreativeUniverse({variant='brand'}:{variant?:keyof typeof worlds}){
 const section=useRef<HTMLElement>(null),host=useRef<HTMLDivElement>(null),stage=useRef<HTMLDivElement>(null);
 const scrollProgress=useRef(0),pointer=useRef({x:0,y:0});const [chapter,setChapter]=useState(0),[enabled,setEnabled]=useState(true);
 const steps=worlds[variant],current=steps[chapter];
 useEffect(()=>{
  const el=section.current,surface=stage.current;if(!el||!surface)return;
  const media=window.matchMedia('(prefers-reduced-motion: reduce)');setEnabled(!media.matches);
  let raf=0;
  const update=()=>{cancelAnimationFrame(raf);raf=requestAnimationFrame(()=>{const rect=el.getBoundingClientRect();const value=Math.min(1,Math.max(0,-rect.top/Math.max(1,el.offsetHeight-window.innerHeight)));scrollProgress.current=value;setChapter(Math.min(2,Math.floor(value*3)));surface.style.setProperty('--flight',String(value));const phase=value*3-Math.min(2,Math.floor(value*3));surface.style.setProperty('--word-scale',String(.72+phase*1.9));surface.style.setProperty('--word-opacity',String(Math.min(1,Math.max(0,(1-phase)*3))));surface.dataset.progress=value.toFixed(3);})};
  const change=()=>setEnabled(!media.matches);media.addEventListener('change',change);window.addEventListener('scroll',update,{passive:true});window.addEventListener('resize',update);update();
  return()=>{cancelAnimationFrame(raf);media.removeEventListener('change',change);window.removeEventListener('scroll',update);window.removeEventListener('resize',update)};
 },[]);
 useEffect(()=>{
  const element=host.current,container=section.current;if(!element||!container||!enabled)return;
  let disposed=false,active=false,raf=0,disposeScene=()=>{};
  const setup=async()=>{
   const THREE=await import('three');if(disposed)return;
   const renderer=new THREE.WebGLRenderer({alpha:true,antialias:false,powerPreference:'low-power'});
   renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.5));renderer.setClearColor(0x050a08,0);renderer.domElement.setAttribute('aria-hidden','true');element.appendChild(renderer.domElement);
   const scene=new THREE.Scene();scene.fog=new THREE.FogExp2(0x050a08,.017);const camera=new THREE.PerspectiveCamera(65,1,.1,180);camera.position.z=8;
   const group=new THREE.Group();scene.add(group);const geometries:import('three').BufferGeometry[]=[];const materials:import('three').Material[]=[];
   // A geometric light passage gives real perspective, parallax, and camera travel.
   for(let i=0;i<24;i++){
    const geometry=new THREE.TorusGeometry(8+(i%3)*.6,.018,4,80);geometries.push(geometry);
    const material=new THREE.MeshBasicMaterial({color:i%3===0?0x8adcf2:0xb9f36c,transparent:true,opacity:.18+(i%4)*.04});materials.push(material);
    const ring=new THREE.Mesh(geometry,material);ring.position.set(Math.sin(i*.6)*.7,Math.cos(i*.43)*.5,-i*5);ring.rotation.set(Math.sin(i*.4)*.18,Math.cos(i*.6)*.2,i*.12);group.add(ring);
   }
   const compact=window.innerWidth<760;const n=compact?420:850;const positions=new Float32Array(n*3);let seed=9831;const random=()=>{seed=(seed*16807)%2147483647;return(seed-1)/2147483646};
   for(let i=0;i<n;i++){const angle=random()*Math.PI*2,radius=4.5+random()*18;positions[i*3]=Math.cos(angle)*radius;positions[i*3+1]=Math.sin(angle)*radius;positions[i*3+2]=-random()*150;}
   const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.BufferAttribute(positions,3));geometries.push(geometry);
   const material=new THREE.PointsMaterial({color:0xbcf6cc,size:.055,transparent:true,opacity:.75,depthWrite:false});materials.push(material);const particles=new THREE.Points(geometry,material);scene.add(particles);
   let smooth=scrollProgress.current,px=0,py=0;
   const resize=()=>{const box=element.getBoundingClientRect();renderer.setSize(box.width,box.height,false);camera.aspect=box.width/Math.max(1,box.height);camera.updateProjectionMatrix()};
   const resizeObserver=new ResizeObserver(resize);resizeObserver.observe(element);resize();
   const draw=()=>{if(disposed||!active||document.hidden){raf=0;return;}smooth+=(scrollProgress.current-smooth)*.08;px+=(pointer.current.x-px)*.045;py+=(pointer.current.y-py)*.045;camera.position.set(px*.85+Math.sin(smooth*5)*.4,-py*.55,8-smooth*95);camera.lookAt(px*.22,-py*.18,camera.position.z-25);camera.rotation.z=Math.sin(smooth*Math.PI*2)*.1;group.rotation.z=smooth*.7+Math.sin(performance.now()*.0001)*.025;particles.rotation.z=smooth*.16+performance.now()*.000008;renderer.render(scene,camera);element.dataset.cameraZ=camera.position.z.toFixed(2);raf=requestAnimationFrame(draw)};
   const observer=new IntersectionObserver(([entry])=>{active=entry.isIntersecting;if(active&&!raf)draw();},{rootMargin:'150px'});observer.observe(container);
   const visibility=()=>{if(!document.hidden&&active&&!raf)draw()};document.addEventListener('visibilitychange',visibility);
   const lost=(event:Event)=>{event.preventDefault();element.dataset.renderMode='fallback';cancelAnimationFrame(raf)};renderer.domElement.addEventListener('webglcontextlost',lost);
   element.dataset.renderMode='webgl';
   disposeScene=()=>{cancelAnimationFrame(raf);observer.disconnect();resizeObserver.disconnect();document.removeEventListener('visibilitychange',visibility);renderer.domElement.removeEventListener('webglcontextlost',lost);geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());renderer.dispose();renderer.domElement.remove()};
   if(disposed)disposeScene();
  };
  setup().catch(()=>{element.dataset.renderMode='fallback'});
  return()=>{disposed=true;disposeScene()};
 },[enabled]);
 const jump=(index:number)=>{const el=section.current;if(!el)return;window.scrollTo({top:el.getBoundingClientRect().top+window.scrollY+(index/3+.08)*(el.offsetHeight-window.innerHeight),behavior:enabled?'smooth':'instant'})};
 return <section ref={section} className={`creative-universe ${enabled?'':'universe-reduced'}`} aria-label="Explore ProDyum’s creative process in three dimensions"><div ref={stage} className="universe-stage" onPointerMove={event=>{const rect=event.currentTarget.getBoundingClientRect();pointer.current={x:(event.clientX-rect.left)/rect.width*2-1,y:(event.clientY-rect.top)/rect.height*2-1};event.currentTarget.style.setProperty('--pointer-x',`${pointer.current.x*10}px`);event.currentTarget.style.setProperty('--pointer-y',`${pointer.current.y*8}px`)}} onPointerLeave={()=>{pointer.current={x:0,y:0}}}>
  <div className="universe-renderer" ref={host}/><div className="universe-shade"/>
  <div className="spatial-labels" aria-hidden="true">{spatialLabels.map((label,index)=><span key={label} style={{left:`${[8,65,13,75,6,70,27,53][index]}%`,top:`${[20,14,65,70,43,43,84,86][index]}%`,transform:`translate3d(calc(var(--pointer-x,0px) * ${index%3+1}),calc(var(--pointer-y,0px) * ${index%2+1}),${-180-index*65}px) rotateY(${index%2?'-':' '}${12+index}deg)`}}>{label}</span>)}</div>
  <div className="universe-topline"><span>THE PRODYUM UNIVERSE</span><a href={variant==='brand'?'#worlds':'#division-capabilities'}>Explore capabilities <ArrowDown size={14}/></a></div>
  <div className="universe-word" aria-hidden="true">{current.word}</div>
  <div className="universe-content" key={chapter}><p className="eyebrow">{current.label}</p><h2>{current.title}</h2><p>{current.description}</p><a href={current.href}>Explore this world <ArrowUpRight size={17}/></a></div>
  <div className="universe-bottom"><span><ArrowDown size={15}/> SCROLL DEEPER · MOVE TO EXPLORE</span><nav aria-label="Creative process chapters">{steps.map((step,index)=><button key={step.word} onClick={()=>jump(index)} aria-current={index===chapter?'step':undefined}>{String(index+1).padStart(2,'0')}<span>{step.word.replace('.','')}</span></button>)}</nav></div>
 </div></section>;
}
