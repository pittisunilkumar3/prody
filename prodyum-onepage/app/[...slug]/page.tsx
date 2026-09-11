import {redirect} from 'next/navigation';
export default async function LegacyPage({params}:{params:Promise<{slug:string[]}>}){const {slug}=await params;const path=slug.join('/');const anchor=/contact|career|casting|investor/.test(path)?'contact':/service/.test(path)?'services':/project|portfolio/.test(path)?'channels':/about/.test(path)?'about':'worlds';redirect('/#'+anchor)}
