'use client';
import { ArrowUpRight } from 'lucide-react';
import Experience from './experience';
export default function Home() {
  return <main>
    <header className="site-header"><a className="wordmark" href="#">prodyum<span>✳</span></a><nav aria-label="Main navigation"><a href="#worlds">Our worlds</a><a href="#about">The studio</a><a className="nav-contact" href="mailto:hr@prodyum.in">Let’s talk <ArrowUpRight size={16}/></a></nav></header>
    <Experience/>
    <section className="worlds section-wrap" id="worlds"><p className="eyebrow">01 / TWO WORLDS. ONE VISION.</p><h2>Different disciplines.<br/><span>Shared ambition.</span></h2><div className="world-grid"><a className="world-card digital" href="https://prodyum.in/it"><span className="eyebrow">STRATEGY MEETS POSSIBILITY</span><h3>ProDyum IT <ArrowUpRight/></h3><p>Digital experiences that move your business forward.</p><span className="service-tags">Digital marketing · Branding · Web development</span></a><a className="world-card cinema" href="https://prodyum.in/entertainment"><span className="eyebrow">STORIES MEET THE SCREEN</span><h3>Entertainments <ArrowUpRight/></h3><p>From the first idea to the final frame.</p><span className="service-tags">Film · Original content · Post-production</span></a></div></section>
    <section className="about section-wrap" id="about"><p className="eyebrow">CREATED IN HYDERABAD. MADE TO GO FURTHER.</p><h2>One home for<br/>your next <em>big idea.</em></h2><p>We bring technology, digital marketing, and entertainment together. Different perspectives. One creative team working toward your vision.</p><a id="contact" className="primary-link" href="mailto:hr@prodyum.in">Let’s create something <ArrowUpRight size={18}/></a></section><footer><a className="wordmark" href="#">prodyum<span>✳</span></a><span>© {new Date().getFullYear()} ProDyum</span><a href="https://prodyum.in/">Visit existing website <ArrowUpRight size={14}/></a></footer>
  </main>
}
