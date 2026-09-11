# ProDyum — One-page redesign

The redesigned project lives in this separate folder. The original project remains in the parent folder as a backup. This checkout continues the same private Sites project and its source history.

## Run

Use Node 22.13 or newer. Run `npm ci` to install dependencies, then `npm run dev -- --port 3001`. The development environment currently reuses the parent folder's installed dependencies through a local node_modules symlink; delete only that symlink before running a fresh npm ci if moving this folder elsewhere.

`npm run build` produces the hosted website. The page brings together the studio introduction, both business divisions, expandable services, the interactive Three.js sculpture, channels, process, collaboration and contact. Old paths redirect to anchors on the single page.

Contact links open an email draft, not an online submission. Channel links lead to the existing YouTube channels. Generated artwork is conceptual rather than a claim of completed client work.

## Motion

The chrome hero responds to pointer movement and scroll. Cards tilt on pointer movement. The sculpture supports pointer dragging and arrow keys. Scroll reveals, the continuous typographic strip, and process rotation respect reduced-motion preferences. A persistent motion toggle pauses ambient animation; the 3D sculpture remains manually explorable.

## Generated images

Created with the built-in image generation tool and saved under public/images:

- digital-sculpture.png — premium cinematic wide artwork; polished chrome impossible circular ribbon on a dark reflective stage, electric chartreuse inner light, mist, left-side negative space; no words or logos.
- cinema-stage.png — premium cinematic wide artwork; empty soundstage, foreground cinema camera, monumental amber-lit screen, reflected light and haze; no people, logos or words.

The original full prompts are in research/image-prompts.md.

## Cinematic luxury revision

The current page uses the cinematic + minimal studio direction documented in research/redesign-research.md. The main interaction is now a Brand / Digital / Film scene selector. Selection updates artwork, copy, relevant services and contact topic together. Previous/next buttons, keyboard-accessible controls and horizontal touch swipes are supported. Vertical scrolling remains native.

The standalone 3D knot is no longer used by the page. Motion is concentrated on bounded image parallax, scene transitions and section entrances. The research report and exact image prompts accompany the project.
