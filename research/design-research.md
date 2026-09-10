# ProDyum cinematic website research

## Recommended direction

ProDyum should present itself as a creative business with two connected disciplines: digital services and entertainment. The most appropriate immersive experience is an editorial studio site with a cinematic opening, continuous footage behind the full page, clear capabilities, and direct routes to a project conversation. Motion should make the work and services easier to understand. It should not become a separate attraction that visitors must complete before discovering what the company does.

The previous implementation combined an animated film opening with an abstract ring tunnel, scattered discipline labels, and repeated dark cards. The assessment here is a design judgment: those elements did not form a specific studio identity. The tunnel added scrolling distance without showing additional craft or evidence. Repeating similar dark sections reduced the contrast between moments. The recommended replacement uses a consistent cinematic surface, followed by one continuous film background with typography and content moving over it.

## Evidence and reference comparison

| Reference | Supported observation | Application to ProDyum | Boundary |
|---|---|---|---|
| Void Atlas repository [1] | The supplied source includes a tunnel experience and spatial typography components. | Use depth, perspective, and scroll position as compositional tools. | A space tunnel is not itself a distinct entertainment-studio identity. The implementation should not simply repeat that motif. |
| Bruno Simon portfolio [2] | The portfolio is a navigable world with keyboard, touch, camera, quality, and recovery controls. Its information page identifies Three.js and publishes source code. | Make interaction legible and offer direct controls alongside exploration. | A driving game is appropriate to that developer’s demonstration; it would add unnecessary work to a production enquiry. |
| Resn work page [3] | Its public work taxonomy explicitly connects brand, content, experience, and digital. | Present multidisciplinary work through clear categories and coherent art direction. | Its clients, credits, and case studies cannot be transferred to ProDyum. |
| Active Theory [4] | The official landing response depends on JavaScript. Text retrieval did not expose enough of the experience for reliable visual conclusions. | Treat it as a reference lead, not evidence for specific animation or layout decisions. | No performance or visual claim is inferred from the inaccessible response. |

The direct sources support a distinction between an immersive concept and decorative effects. The concrete recommendation is an inference from the comparisons, not a measured claim that a particular design will increase conversions. There is no conversion study of ProDyum’s current visitors in the available material.

## Content and visitor journey

The existing ProDyum content separates IT services from entertainment [5]. The redesign retains those divisions and their established routes. Entertainment presents production, original series, short films and music videos, and post-production. Digital presents marketing, identity, websites, and multimedia. These service categories are more useful to an interested client than a long sequence of abstract words.

A visitor should be able to follow four steps: understand the division, explore its craft, identify the relevant service, and contact the team. The cinematic opening retains a skip link. A persistent background-motion control allows the visitor to pause animation. Service links remain normal links that work independently of the animation. The channel area links to the existing YouTube channels, rather than pretending the supplied concept footage constitutes verified client work.

The supplied clips are visual material for the experience. Their presence does not establish production ownership, release credits, or commercial results. Project examples continue to be described as discussion directions where completed work has not been verified. Contact forms continue to prepare email drafts; the design must not imply that a message has been delivered automatically.

## Video-quality diagnosis

The supplied action clip is 1280 × 720 at 24 frames per second, with a video bitrate of approximately 3.82 Mbit/s according to local metadata inspection. The supplied fantasy clip is also 1280 × 720 at 24 frames per second. The earlier website frame export reduced the pictures to 960 × 540 and sampled at 16 frames per second. Those choices discarded spatial and temporal information before full-screen display.

| Property | Previous website | Revised export |
|---|---|---|
| Image dimensions | 960 × 540 | 1920 × 1080 |
| Sequence sampling | 16 frames/s | 24 frames/s |
| Action sequence | 480 pictures | 720 pictures |
| Fantasy sequence | 240 pictures | 360 pictures |
| Image export | More compressed JPEG | Higher-quality JPEG export |
| Source handling | Reduced source size | Direct export from original, Lanczos scaling, mild sharpening |

The revised files are 1080p upscales, not native Full HD recordings. Upscaling interpolates additional pixels; sharpening increases local edge contrast. Neither reconstructs authentic fine detail that was absent from the original. Soft focus, motion blur, generative inconsistencies, and compression already in the source can remain. FFmpeg documents image scaling and unsharp filtering as image-processing operations [6]. The appropriate next source upgrade is a native 1080p or 4K master, if available.

The visual treatment also matters. Heavy overlays can hide texture even when the asset has adequate resolution. The revision reduces the broad dark wash while retaining shading where text needs separation. Full-screen cropping still affects how much of the original composition is visible, especially on portrait devices. The film remains controlled by page scrolling; no visible video-player box replaces the requested interaction.

## Final motion and layout specification

The final direction uses a single fixed canvas behind the complete page. The film timeline maps to total page scroll, so services, channels, process, and contact content all appear over the footage. Scrolling backwards moves back through the film. There is no separate gallery, tunnel, or second video section, and the background is not restricted to the opening screen.

The headline introduces the business once. Subsequent text flows naturally over the same film surface. Service and process content uses thin dividing lines and restrained perspective reveals instead of opaque blocks. Normal document semantics remain for accessibility, but there are no abrupt background-colour changes between content areas. The background-motion button remains available while reading.

This is an art-direction recommendation shaped by the requested continuous experience, not a claim of conversion improvement. Animation must remain secondary to identifying services and reaching a project enquiry.

## Rendering, loading, and accessibility

High-density displays multiply rendering cost, as discussed in the Three.js responsive guide [7]. The canvas caps pixel ratio and uses high-quality image smoothing. It loads frames around the requested position instead of decoding the entire movie into memory. A single 1080p RGBA picture requires about 7.9 MiB before browser overhead; storing all 720 pictures decoded could consume several gigabytes. The bounded cache is therefore necessary.

MDN recommends avoiding unnecessary canvas work [8]. The sequence redraws on scroll, resize, and relevant image completion rather than running a permanent animation loop. A source frame remains behind the canvas while loading. Fixed background sizing prevents newly loaded images from shifting content; reserving media dimensions is consistent with web.dev layout-stability guidance [9].

Reduced-motion preferences disable the scrolling animation by default [10]. The persistent button lets the visitor pause or enable it. All text and normal links remain available with motion disabled. The full frame collection is substantial in size, so these exports should not be described as a lightweight static page. Loading a limited neighbourhood reduces initial transfer but does not remove total transfer cost for an extended browsing session.

## Validation and limits

Acceptance checks include successful page rendering, 1920×1080 image dimensions, removal of the rejected gallery, changing canvas frames after scrolling beyond the opening, and normal service and contact links. Compilation checks detect integration errors. These checks are not a substitute for a representative device and network performance study.

The final result preserves the supplied films as continuous scroll-controlled backgrounds. The media is carefully upscaled from 720p; a native higher-resolution master remains the best source upgrade. No unsupported client logos, awards, financial results, or production credits have been introduced.

## Sources

1. vikod3. [Void Atlas source repository](https://github.com/vikod3/void-atlasp), inspected supplied repository and component structure.
2. Bruno Simon. [Portfolio and behind-the-scenes information](https://bruno-simon.com/), official site, accessed September 10, 2026.
3. Resn. [Work](https://resn.co.nz/work), official studio portfolio, accessed September 10, 2026.
4. Active Theory. [Official website](https://activetheory.net/), limited text access; not used to substantiate detailed visual claims.
5. ProDyum. [Existing website](https://prodyum.in/), existing business source, complemented by retained project content from the earlier site study.
6. FFmpeg. [Filters documentation: scale and unsharp](https://ffmpeg.org/ffmpeg-filters.html), official technical documentation.
7. Three.js. [Responsive design and HD-DPI](https://threejs.org/manual/en/responsive.html), official manual.
8. MDN. [Optimizing canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Optimizing_canvas), technical documentation.
9. web.dev. [Optimize Cumulative Layout Shift](https://web.dev/articles/optimize-cls), technical guidance.
10. MDN. [prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion), technical documentation.
11. Supplied local media: `cleaned.mp4` and `hf_20260409_094505_e898193e-ec14-4ecc-92ed-be976174fc88.mp4`. Private local files; dimensions and frame rates inspected directly. No public source URL.
