/** Limit media movement to 0.65 seconds per real second, in either direction. */
export function advancePlayhead(current:number,target:number,elapsedSeconds:number){
 const distance=target-current;
 const step=.65*Math.min(.1,Math.max(0,elapsedSeconds));
 return current+Math.sign(distance)*Math.min(Math.abs(distance),step);
}
