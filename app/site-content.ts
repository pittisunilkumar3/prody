export const digitalServices = [
  {title:'Digital marketing', number:'01', description:'Connect your business with the people who are looking for it. Bring your channels, campaigns, and content into one considered strategy.', items:['Social media management','Meta Ads & Google Ads','Search engine optimisation','YouTube marketing','Content strategy']},
  {title:'Branding & design', number:'02', description:'Give your business an identity people recognise. Build a consistent visual language across every place your brand appears.', items:['Logo design','Brand identity systems','Social media creatives','Marketing graphics','UI/UX design']},
  {title:'Web development', number:'03', description:'Turn your digital presence into a useful business tool. Clear journeys and responsive design make it easier for your audience to take the next step.', items:['Business & corporate websites','Campaign landing pages','E-commerce websites','Responsive web experiences']},
  {title:'Video & multimedia', number:'04', description:'Put your product, people, and ideas in the spotlight with visual content created for the way your audience watches.', items:['Product shoots','Video editing','Promotional videos','Social media reels']},
];
export const cinemaServices = [
  {title:'Film production',number:'01',description:'Build a story for the screen, from early development through production and delivery.',items:['Feature films','Story development','Casting & production planning','Production coordination']},
  {title:'Original series',number:'02',description:'Develop episodic stories with a clear voice and a production approach built around the series.',items:['Web series','Season planning','Episodic production','Launch content']},
  {title:'Short films & music videos',number:'03',description:'Make every frame count in compact stories, music-led films, and branded content.',items:['Short films','Music videos','Branded films','Digital media production']},
  {title:'Post-production',number:'04',description:'Shape the final experience through picture, colour, effects, and sound.',items:['Editing & conform','DI / colour grading','Title design & VFX','Sound design & 5.1 mix']},
];
export const channels = [
 {name:'ProDyum Entertainments',tag:'THE STUDIO CHANNEL',description:'Movies, web series, short films, and more from the ProDyum entertainment world.',url:'https://www.youtube.com/@ProDyumEntertainments',mark:'PE'},
 {name:'Kavya’s Tape Recorder',tag:'STORIES & CONVERSATIONS',description:'A creative channel featuring storytelling and entertainment content.',url:'https://www.youtube.com/@kavyasistla',mark:'KT'},
 {name:'ProDyum Media',tag:'DIGITAL CONTENT',description:'Explore ProDyum’s digital content and media productions.',url:'https://www.youtube.com/@ProDyumMedia',mark:'PM'},
];
export type PageType = 'division'|'services'|'about'|'portfolio'|'projects'|'contact'|'careers'|'casting'|'investors';
export type PageInfo = {title:string; eyebrow:string; description:string; type:PageType; division:'it'|'entertainment'|'brand'; accent:string};
export const pages:Record<string,PageInfo> = {
 '/it':{title:'Ideas into digital experiences.',eyebrow:'PRODYUM IT PVT LTD',description:'We connect strategy, design, marketing, and technology to help your business build a stronger digital presence.',type:'division',division:'it',accent:'experiences.'},
 '/it/services':{title:'Built around your business.',eyebrow:'DIGITAL CAPABILITIES',description:'Four connected disciplines. A considered approach to your brand’s next stage of growth.',type:'services',division:'it',accent:'business.'},
 '/it/portfolio':{title:'Your next project starts here.',eyebrow:'PROJECT CONVERSATIONS',description:'From a new identity to a complete website, explore the kinds of work we can help you create. Ask our team for relevant work samples.',type:'portfolio',division:'it',accent:'here.'},
 '/it/about':{title:'A partner for what comes next.',eyebrow:'ABOUT PRODYUM IT',description:'A Hyderabad-based digital solutions company bringing together creative thinking, strategic marketing, and web technology.',type:'about',division:'it',accent:'next.'},
 '/it/careers':{title:'Bring your perspective.',eyebrow:'CAREERS AT PRODYUM IT',description:'Introduce yourself and the work you love doing. Start a conversation with our team about future opportunities.',type:'careers',division:'it',accent:'perspective.'},
 '/it/contact':{title:'Let’s build your next chapter.',eyebrow:'START A DIGITAL PROJECT',description:'Tell us about your business, your audience, and what you would like to achieve.',type:'contact',division:'it',accent:'chapter.'},
 '/entertainment':{title:'Stories that stay with you.',eyebrow:'PRODYUM ENTERTAINMENTS',description:'A cinema-first studio bringing movies, original series, short films, and music videos from idea to screen.',type:'division',division:'entertainment',accent:'you.'},
 '/entertainment/services':{title:'From first idea to final frame.',eyebrow:'PRODUCTION & POST-PRODUCTION',description:'A connected production and post-production workflow for stories in every format.',type:'services',division:'entertainment',accent:'frame.'},
 '/entertainment/projects':{title:'Enter our story worlds.',eyebrow:'CHANNELS & ORIGINAL CONTENT',description:'Discover the channels connected to ProDyum and explore their latest published content.',type:'projects',division:'entertainment',accent:'worlds.'},
 '/entertainment/investors':{title:'Let’s talk about the next story.',eyebrow:'PRODUCTION PARTNERSHIPS',description:'Connect with the studio to discuss project scope, production plans, and potential collaboration.',type:'investors',division:'entertainment',accent:'story.'},
 '/entertainment/casting':{title:'Find your place in the story.',eyebrow:'CASTING & CREW',description:'Actors, storytellers, and production professionals: introduce your craft to ProDyum Entertainments.',type:'casting',division:'entertainment',accent:'story.'},
 '/entertainment/contact':{title:'Make something worth watching.',eyebrow:'START A PRODUCTION CONVERSATION',description:'Share your idea, format, and production needs. Let’s explore how we can work together.',type:'contact',division:'entertainment',accent:'watching.'},
 '/about':{title:'Different minds. Shared ambition.',eyebrow:'THE PRODYUM ECOSYSTEM',description:'Technology, digital marketing, and entertainment, brought together in one creative ecosystem in Hyderabad.',type:'about',division:'brand',accent:'ambition.'},
 '/contact':{title:'What’s your next big idea?',eyebrow:'LET’S CREATE TOGETHER',description:'A brand to build. A business to grow. A story to tell. Start the conversation with ProDyum.',type:'contact',division:'brand',accent:'idea.'},
};
