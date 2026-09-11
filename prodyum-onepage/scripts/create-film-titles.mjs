import sharp from 'sharp';
import { writeFileSync } from 'node:fs';
const titles = [
['TECHNOLOGY. CREATIVITY. CINEMA.','Built to make','you feel.','We build brands. We bring stories to life.'],
['01 / PRODYUM IT','Ideas into','digital experiences.','Websites that connect. Technology that delivers.'],
['02 / BRANDING & DIGITAL MARKETING','Be seen.','Be remembered.','Strategy, identity, and content with a clear purpose.'],
['03 / PRODYUM ENTERTAINMENTS','Every story','deserves a screen.','Movies. Original series. From idea to final frame.'],
['04 / ONE CREATIVE ECOSYSTEM','Your vision.','Our universe.','Technology and storytelling, brought together.']
];
const escape = (s) => s.replaceAll('&','&amp;').replaceAll('<','&lt;');
for (let i = 0; i < titles.length; i++) {
 const [label,first,last,description] = titles[i].map(escape);
 const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="686"><defs><linearGradient id="shade"><stop stop-color="#020604" stop-opacity=".72"/><stop offset=".75" stop-color="#020604" stop-opacity="0"/></linearGradient></defs><rect width="1600" height="686" fill="url(#shade)"/><g font-family="Helvetica,Arial,sans-serif"><text x="108" y="82" font-size="29" font-weight="700" fill="#eff1e9" letter-spacing="-1">prodyum</text><text x="108" y="205" font-size="13" letter-spacing="3" fill="#c6f568">${label}</text><text x="103" y="306" font-size="78" letter-spacing="-3" fill="#eff1e9">${first}</text><text x="103" y="395" font-family="Georgia,serif" font-style="italic" font-size="78" letter-spacing="-3" fill="#c6f568">${last}</text><text x="108" y="452" font-size="21" fill="#c3ccbb">${description}</text><text x="108" y="630" font-size="12" letter-spacing="3" fill="#a1ad96">HYDERABAD, INDIA</text><text x="1420" y="630" font-size="13" fill="#c6f568">0${i+1} / 05</text></g></svg>`;
 await sharp(Buffer.from(svg)).png().toFile(`/tmp/prodyum-title-${i}.png`);
}
writeFileSync('public/media/film-captions.vtt', 'WEBVTT\n\n'+titles.map((t,i)=>`00:${String(i*6).padStart(2,'0')}.000 --> 00:${String((i+1)*6).padStart(2,'0')}.000\n${t[1]} ${t[2]} ${t[3]}\n`).join('\n'));
