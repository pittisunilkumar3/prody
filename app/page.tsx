'use client';
import { ArrowUpRight } from 'lucide-react';
import Experience from './experience';
import ScrollStatement from './scroll-statement';
export default function Home() {
  return <main id="main-content" className="continuous-cinema">
    <Experience/>
    <section className="worlds section-wrap" id="worlds"><p className="eyebrow">01 / TWO WORLDS. ONE VISION.</p><ScrollStatement>Technology Meets Creativity. Digital Experiences, Brand Growth, And Stories For The Screen. One Creative Home For Your Next Big Idea.</ScrollStatement><div className="world-grid"><a className="world-card digital" href="/it"><span className="eyebrow">STRATEGY MEETS POSSIBILITY</span><h3>ProDyum IT <ArrowUpRight/></h3><p>Digital experiences that move your business forward.</p><span className="service-tags">Digital marketing · Branding · Web development</span></a><a className="world-card cinema" href="/entertainment"><span className="eyebrow">STORIES MEET THE SCREEN</span><h3>Entertainments <ArrowUpRight/></h3><p>From the first idea to the final frame.</p><span className="service-tags">Film · Original content · Post-production</span></a></div></section>
    <section className="about section-wrap" id="about"><p className="eyebrow">CREATED IN HYDERABAD. MADE TO GO FURTHER.</p><h2>One home for<br/>your next <em>big idea.</em></h2><p>We bring technology, digital marketing, and entertainment together. Different perspectives. One creative team working toward your vision.</p><a id="contact" className="primary-link" href="/contact">Let’s create something <ArrowUpRight size={18}/></a></section>
  </main>
}
