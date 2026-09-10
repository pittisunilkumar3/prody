# ProDyum Universe

A responsive ProDyum concept site with a 30-second film and a scroll-controlled frame sequence.

## Run

- `npm install`
- `npm run dev`
- `npm run build`

## Media and interaction

Original generated artwork was animated with a gradual camera push and pull, then rendered into a 30-second 1600 × 686 H.264 film. This is motion design using a generated 3D still, not a real-time 3D model or multi-scene AI video generation.

The website uses 360 JPEG frames extracted at 12 fps from the clean animation. Only frames near the scroll position are loaded; a bounded cache limits decoded memory. The exported film includes five branded title chapters, and a VTT caption file. The poster remains visible if frame loading is unavailable. Reduced-motion preferences disable the frame canvas and transition animation.

The five chapters cover the brand reveal, ProDyum IT, branding and digital marketing, ProDyum Entertainments, and the shared creative ecosystem.

Contact opens an email draft to the address published on the original website. Division links now stay inside the replacement site. Dedicated routes cover both divisions, services, project conversations, channels, about, contact, careers, casting, and partnerships. Contact forms prepare email drafts for the visitor to review and send; they do not claim automatic delivery. No emails are submitted by this site, and no unverified portfolio work, metrics, celebrity credits, or testimonials are reproduced.

## Checks

TypeScript, production compilation, video duration and decoding, and completeness of all 360 frame assets. Browser interaction testing has not been performed.
