/** A short, frame-rate-independent catch-up keeps the film tied to the scroll. */
export function advancePlayhead(current:number,target:number,elapsedSeconds:number){
 const blend=1-Math.exp(-Math.min(.1,Math.max(0,elapsedSeconds))/.12);
 return current+(target-current)*blend;
}
