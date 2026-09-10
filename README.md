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

## Scroll background update

The homepage now renders the supplied cleaned.mp4 as a full-screen scroll-driven background (480 frames at 16 fps over 30 seconds). Entertainment uses the supplied 15-second fantasy clip (240 frames at 16 fps). Forward and reverse scrolling select frames on a canvas. No embedded player, autoplay, or playback controls are used in the page experience. Frame decoding uses a moving cache; the first frame is a loading fallback. Reduced-motion visitors can opt into the animation. Local browser checks verified frames 0 → 70 → 141 → 70 on Entertainment, plus scroll-triggered chapter changes.

## Extended spatial interactions

A new original Three.js sequence follows the approved hero on the homepage and both division pages. It uses geometric light rings, a particle field, scroll-driven camera travel, pointer parallax, and typography at different depths. The reference repository https://github.com/vikod3/void-atlasp was studied for its spatial design techniques; its source, videos, hosting settings, and demo form were not copied.

Services, channels, project directions, process steps, about, contact, and footer content now use staggered depth reveals. Pointer-capable devices get perspective tilt and moving highlights on cards. Reduced-motion preferences disable these effects. The WebGL scene is lazy loaded, rendered only near the viewport, and disposed on navigation. If WebGL is unavailable, the text and page links remain usable over a static background.
