'use client';
import {useEffect,useRef,useState} from 'react';
import * as THREE from 'three';
export default function Sculpture({paused}:{paused:boolean}){
 const host=useRef<HTMLDivElement>(null);const [available,setAvailable]=useState(true);
 useEffect(()=>{const el=host.current;if(!el)return;let renderer:THREE.WebGLRenderer;
 try{renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'});}catch{setAvailable(false);return}
 const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(36,1,.1,100);camera.position.z=6;
 renderer.setPixelRatio(Math.min(devicePixelRatio,1.7));el.appendChild(renderer.domElement);
 const geometry=new THREE.TorusKnotGeometry(1,.28,160,24,2,3),material=new THREE.MeshPhysicalMaterial({color:0xd4ff4f,metalness:.65,roughness:.24,clearcoat:1});
 const knot=new THREE.Mesh(geometry,material);scene.add(knot);scene.add(new THREE.HemisphereLight(0xffffff,0x36382b,3));
 const light=new THREE.DirectionalLight(0xffffff,6);light.position.set(2,3,4);scene.add(light);
 const rim=new THREE.PointLight(0xbaff00,35);rim.position.set(-3,-1,2);scene.add(rim);
 const ringGeometry=new THREE.TorusGeometry(1.95,.005,8,120),ringMaterial=new THREE.MeshBasicMaterial({color:0x6a7058});
 const ring=new THREE.Mesh(ringGeometry,ringMaterial);ring.rotation.x=.7;scene.add(ring);
 let raf=0,visible=true,drag=false,lastX=0,lastY=0,rx=.3,ry=0,last=0;
 const render=(time:number)=>{raf=0;if(!visible)return;const dt=Math.min(.04,(time-last)/1000||0);last=time;if(!paused&&!drag)ry+=dt*.18;knot.rotation.x+=(rx-knot.rotation.x)*.13;knot.rotation.y+=(ry-knot.rotation.y)*.13;renderer.render(scene,camera);if(!paused||drag)raf=requestAnimationFrame(render)};
 const draw=()=>{if(!raf)raf=requestAnimationFrame(render)};
 const size=()=>{const rect=el.getBoundingClientRect();renderer.setSize(rect.width,rect.height);camera.aspect=rect.width/rect.height;camera.updateProjectionMatrix();draw()};
 const down=(e:PointerEvent)=>{drag=true;lastX=e.clientX;lastY=e.clientY;el.setPointerCapture(e.pointerId);el.dataset.dragging='true';draw()};
 const move=(e:PointerEvent)=>{if(!drag)return;ry+=(e.clientX-lastX)*.009;rx+=(e.clientY-lastY)*.009;lastX=e.clientX;lastY=e.clientY;draw()};
 const up=()=>{drag=false;el.dataset.dragging='false';draw()};
 const key=(e:KeyboardEvent)=>{if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.key))return;e.preventDefault();ry+=e.key==='ArrowLeft'?-.3:e.key==='ArrowRight'?.3:0;rx+=e.key==='ArrowUp'?-.3:e.key==='ArrowDown'?.3:0;knot.rotation.set(rx,ry,0);draw()};
 const resize=new ResizeObserver(size);resize.observe(el);const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;if(visible){last=performance.now();draw()}else{cancelAnimationFrame(raf);raf=0}});observer.observe(el);
 el.addEventListener('pointerdown',down);el.addEventListener('pointermove',move);el.addEventListener('pointerup',up);el.addEventListener('pointercancel',up);el.addEventListener('keydown',key);size();
 return()=>{cancelAnimationFrame(raf);resize.disconnect();observer.disconnect();el.removeEventListener('pointerdown',down);el.removeEventListener('pointermove',move);el.removeEventListener('pointerup',up);el.removeEventListener('pointercancel',up);el.removeEventListener('keydown',key);geometry.dispose();material.dispose();ringGeometry.dispose();ringMaterial.dispose();renderer.dispose();renderer.domElement.remove()};
 },[paused]);
 return <div className="sculpture-wrap"><div className="sculpture" ref={host} tabIndex={available?0:-1} role="img" aria-label="Interactive 3D sculpture. Drag or use arrow keys to rotate.">{!available&&<img src="/images/digital-sculpture.png" alt="Chrome sculpture with lime light"/>}</div><span className="sculpture-hint">{available?'↔ Drag to explore · arrow keys to rotate':'Technology meets creativity'}</span></div>
}
