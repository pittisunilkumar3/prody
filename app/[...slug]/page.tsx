import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { DetailPage } from '../detail-page';
import { pages } from '../site-content';
type Props={params:Promise<{slug:string[]}>};
export function generateStaticParams(){return Object.keys(pages).map(path=>({slug:path.slice(1).split('/')}))}
export async function generateMetadata({params}:Props):Promise<Metadata>{const {slug}=await params;const page=pages['/'+slug.join('/')];return page?{title:`${page.eyebrow} — ProDyum`,description:page.description}:{title:'Page not found — ProDyum'}}
export default async function Page({params}:Props){const {slug}=await params;const page=pages['/'+slug.join('/')];if(!page)notFound();return <DetailPage page={page}/>}
