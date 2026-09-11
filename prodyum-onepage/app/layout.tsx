import type {Metadata} from 'next';
import {Manrope,Instrument_Serif} from 'next/font/google';
import './globals.css';
const sans=Manrope({variable:'--font-sans',subsets:['latin']});
const serif=Instrument_Serif({variable:'--font-display',subsets:['latin'],weight:'400',style:['normal','italic']});
export const metadata:Metadata={title:'ProDyum — Made to move you',description:'An independent creative studio in Hyderabad. ProDyum brings together brands, digital experiences, and cinematic storytelling.'};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="en"><body className={`${sans.variable} ${serif.variable}`}>{children}</body></html>}
