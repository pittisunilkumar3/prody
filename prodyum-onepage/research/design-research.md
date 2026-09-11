# ProDyum cinematic website research

## Recommended direction

ProDyum should present itself as a creative business with two connected disciplines: digital services and entertainment. The most appropriate immersive experience is an editorial studio site with a cinematic opening, continuous footage behind the full page, clear capabilities, and direct routes to a project conversation. Motion should make the work and services easier to understand. It should not become a separate attraction that visitors must complete before discovering what the company does.

The previous implementation combined an animated film opening with an abstract ring tunnel, scattered discipline labels, and repeated dark cards. The assessment here is a design judgment: those elements did not form a specific studio identity. The tunnel added scrolling distance without showing additional craft or evidence. Repeating similar dark sections reduced the contrast between moments. The final direction follows the supplied WISA layout specification: one continuous film background with minimal white typography and content moving over it.

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

The revised media files are 1080p upscales, not native Full HD recordings. Upscaling interpolates additional pixels; sharpening increases local edge contrast. Neither reconstructs authentic fine detail that was absent from the original. Soft focus, motion blur, generative inconsistencies, and compression already in the source can remain. FFmpeg documents image scaling and unsharp filtering as image-processing operations [6]. The appropriate next source upgrade is a native 1080p or 4K master, if available.

The visual treatment also matters. Heavy overlays can hide texture even when the asset has adequate resolution. The revision reduces the broad dark wash while retaining shading where text needs separation. Full-screen cropping still affects how much of the original composition is visible, especially on portrait devices. The film remains controlled by page scrolling; no visible video-player box replaces the requested interaction.

## Final motion and layout specification

The supplied WISA specification [12] resolves the visual direction: a fixed film background, lower-left headline, supporting copy toward the right, translucent split buttons, word-by-word scroll reveals, an animated navigation bar, and a glass-style footer. The business identity and copy remain ProDyum; the football material and unrelated external video are not adopted.

The final page uses one fixed video layer. Document scroll is mapped to the film duration, finishing near the footer. Services, channels, process, and contact links remain over the same surface. There is no separate gallery, tunnel, or second video section. Semantic sections remain for accessible navigation, without opaque background divisions.

The rendering mechanism now uses locally encoded H.264 films rather than transferring hundreds of JPEG frames. Both output videos are 1920×1080 at 24 fps. The action film is approximately 21.87 MiB and the fantasy film approximately 11.11 MiB. Both are carefully upscaled from the supplied 720p sources. Encoding uses frequent keyframes to support seeking. Only the opening poster from each generated frame collection is retained in the new media directories.

## Rendering, loading, and accessibility

The video element has no visible player controls. Scrolling determines its position. The implementation stores the latest requested time, checks whether a seek is already running, and applies any pending target after the seek completes. This adds a completion path to the pasted example: simply ignoring scroll events during a seek can otherwise leave the video behind the final requested position.

The pasted explanation overstates what the seeking guard guarantees. It can coordinate seek requests, but cannot guarantee tear-free output or identical smoothness on every browser and device. Decoding, bandwidth, keyframe spacing, and browser scheduling still affect results. No universal performance claim is made here.

A poster remains visible while the media loads, avoiding a blocking full-screen loading gate. Fixed background dimensions avoid layout changes as the video becomes ready, consistent with media layout-stability guidance [9]. Reduced-motion preferences disable scrubbing by default [10], and the persistent motion button allows pausing or enabling it. All text and links remain available independently of the background motion. The typography uses Manrope with JetBrains Mono for secondary labels, as requested by the reference.

## Validation and limits

Acceptance checks include successful page rendering, 1920×1080 image dimensions, removal of the rejected gallery, changing video positions after scrolling beyond the opening, and normal service and contact links. Compilation checks detect integration errors. These checks are not a substitute for a representative device and network performance study.

The final result preserves the supplied films as continuous scroll-controlled backgrounds. The media is carefully upscaled from 720p; a native higher-resolution master remains the best source upgrade. No unsupported client logos, awards, financial results, or production credits have been introduced.

## Sources

1. vikod3. [Void Atlas source repository](https://github.com/vikod3/void-atlasp), inspected supplied repository and component structure.
2. Bruno Simon. [Portfolio and behind-the-scenes information](https://bruno-simon.com/), official site, accessed September 10, 2026.
3. Resn. [Work](https://resn.co.nz/work), official studio portfolio, accessed September 10, 2026.
4. Active Theory. [Official website](https://activetheory.net/), limited text access; not used to substantiate detailed visual claims.
5. ProDyum. [Existing website](https://prodyum.in/), existing business source, complemented by retained project content from the earlier site study.
6. FFmpeg. [Filters documentation: scale and unsharp](https://ffmpeg.org/ffmpeg-filters.html), official technical documentation.
7. Three.js. [Responsive design and HD-DPI](https://threejs.org/manual/en/responsive.html), official manual.
8. MDN. [Optimizing video surface](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Optimizing_video surface), technical documentation.
9. web.dev. [Optimize Cumulative Layout Shift](https://web.dev/articles/optimize-cls), technical guidance.
10. MDN. [prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion), technical documentation.
11. Supplied local media: `cleaned.mp4` and `hf_20260409_094505_e898193e-ec14-4ecc-92ed-be976174fc88.mp4`. Private local files; dimensions and frame rates inspected directly. No public source URL.

12. Supplied WISA landing-page specification, `pasted-text.txt`, private attachment. Used as the primary layout and interaction reference; not as business content or permission to replace the project dependencies.
