const IM={
 "welcome": "assets/welcome.webp",
 "home": "assets/home.webp",
 "myki": "assets/myki.webp",
 "community": "assets/community.webp",
 "map": "assets/map.webp",
 "events": "assets/events.webp",
 "budget": "assets/budget.webp",
 "profile": "assets/profile.webp",
 "icon": "assets/icon.webp",
 "sanika": "assets/sanika.jpg",
 "aarav": "assets/aarav.jpg",
 "eco": "assets/eco.jpg",
 "flow": "assets/flow.jpg",
 "thematic": "assets/thematic.jpg",
 "comm": "assets/comm.jpg",
 "sk1": "assets/sk1.jpg",
 "sk2": "assets/sk2.jpg",
 "sk3": "assets/sk3.jpg",
 "mood": "assets/mood.jpg",
 "palette": "assets/palette.jpg",
 "figma": "assets/figma.jpg"
};
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches,root=document.documentElement;
try{const t=localStorage.getItem('anvi-theme');if(t)root.dataset.theme=t}catch(e){}
$('#th').onclick=()=>{const d=root.dataset.theme?root.dataset.theme==='dark':matchMedia('(prefers-color-scheme:dark)').matches;root.dataset.theme=d?'light':'dark';try{localStorage.setItem('anvi-theme',root.dataset.theme)}catch(e){}};
$$('[data-im]').forEach(i=>i.src=IM[i.dataset.im]);

/* data */
const PERS={sanika:{n:'Sanika',t:'The Community Seeker',m:'21 · Bachelors, Architecture · Shared housing with flatmates',q:'I wish someone had just told me where to start.',tg:['Sociable','Nostalgic','Organised','Trusting'],g:['Build real, ongoing connection with other Maharashtrian students','Access trustworthy guidance instead of learning things the hard way','Keep cultural traditions alive: food, language, festivals'],f:['No single reliable source for accommodation, jobs or events','Wishes she had known the real cost of living before arriving','Finds it hard to meet Maharashtrian students specifically'],c:'WhatsApp groups, Instagram, RMIT Indian Club'},
aarav:{n:'Aarav',t:'The Independent Explorer',m:'23 · Masters, Industrial Design · Alone in student accommodation',q:'I’ll figure it out myself before I ask anyone.',tg:['Independent','Resourceful','Reserved','Practical'],g:['Get transport, groceries and banking sorted quickly, on his own','Find affordable, familiar food without relying on others','Settle into a routine without feeling he owes anyone favours'],f:['Doesn’t know where to find other Maharashtrian students','Only learns about events when they appear on his social feed','Underestimated daily grocery and transport costs'],c:'Instagram, Google and ChatGPT, WhatsApp (passive)'}};
const FR=[['Overwhelmed by how many basics to sort out at once',5],['Homesick, missing food, festivals and family',3],['Underestimated the cost of living',2],['Felt disconnected from the community',2]];
const INS=['Students turn to friends, flatmates and family before official university channels.','Everyone called the move positive and growth-inducing, even when the first weeks were hard.','Connecting with other Maharashtrian students came down to luck: chance meetings and whatever the feed showed.','Some underestimated everyday costs and are still working out groceries, transport and budgets by trial and error.'];
const QS=[['It is always better when people who have experienced the similar things tell you upfront rather than going through the information from scratch online.','Interviewee, around six months in Melbourne'],['I wish I knew how difficult it would be to make new friends and build a social circle here.','Interviewee, Master’s student'],['I will create a Maharashtrian student community platform: an information exchange for jobs, events, useful places, accommodation and transport.','Interviewee, Master’s student, one to two months in Melbourne']];
const PS=[['Sanika','Sanika needs a way to find one trustworthy place for practical guidance and real Maharashtrian community, as she has relied on luck and scattered chats to learn the basics, like the real cost of living, the hard way.'],['Aarav','Aarav needs a way to sort out everyday essentials and find familiar food and community on his own, as he would rather figure things out himself than ask for help, and sees no easy way in.'],['New students','New Maharashtrian students at RMIT need one consolidated, trustworthy source for settling-in information and community, as they piece it together alone from Google, ChatGPT, Instagram and WhatsApp.'],['New students','New Maharashtrian students at RMIT need an easy, low-pressure way to find their community, whether they’re outgoing like Sanika or independent like Aarav, because meeting people at the moment comes down to luck.']];
const COL=[['Dark maroon','#560104','#faf1e0'],['Rust','#ba3c16','#fff'],['Spice orange','#c66a05','#fff'],['Saffron','#f8ca1d','#3a0a06'],['Cream','#faf1e0','#3a0a06']];
const F=[{t:'Settling-In Essentials',w:'aarav',n:['Need 2: sort everyday essentials and find familiar food and community on his own','Need 3: one consolidated source for settling-in information'],h:'How might we help new students know where to start and get the basics sorted quickly, on their own?',s:'A step-by-step checklist with progress tracking and short guides.',a:['Progress tracker shows how many basics are done','Up next: a short guide, like getting your myki','Checklist for phone, bank, groceries and student ID','Mark as done moves you to the next item'],i:['home','myki']},
{t:'Community Advice',w:'sanika',n:['Need 1: one trustworthy place for practical guidance and real community','Need 3: one consolidated source for settling-in information'],h:'How might we give students trustworthy advice from people who have been through it, instead of scattered chats and guesswork?',s:'A feed of advice from current students, filtered by housing, food, jobs, events and groceries.',a:['Filter by housing, food, jobs, events or groceries','Real answers from students, with their course and time in Melbourne'],i:['community']},
{t:'Store & Restaurant Map',w:'aarav',n:['Need 2: sort everyday essentials and find familiar food and community on his own'],h:'How might we help students find familiar, affordable food near them without having to ask around?',s:'An interactive map of Indian grocery stores and restaurants, with distance and opening hours.',a:['Search and filter by restaurants, grocery or veg','Near-you list with distance and opening hours'],i:['map']},
{t:'Events',w:'aarav',n:['Need 4: an easy, low-pressure way to find community, not luck'],h:'How might we make it easy for students to find their people and plans, without relying on luck or what shows up in their feed?',s:'An events page for festivals and meetups, with filters and how many people are going.',a:['Filter by this month, festivals or meetups','Meetups for new arrivals, with how many are going'],i:['events']},
{t:'Budget & Profile',w:'sanika',n:['Need 1: one trustworthy place for practical guidance','Need 3: one consolidated source for settling-in information'],h:'How might we help students plan for Melbourne’s real costs, with guidance that fits their university, timing and budget?',s:'A simple profile with university, course start and weekly budget that personalises the checklist and costs.',a:['Budget feeds your weekly estimate','Weekly cost estimate at a glance','Costs split into rent, food, transport and other'],i:['budget','profile']}];
const CM=[['Step-by-step settling-in checklist','No','No','No','Partly'],['Advice from students with course and time in Melbourne','Partly','Partly','No','No'],['Map of Indian stores and restaurants','Partly','No','Yes, not curated','No'],['Community events and meetups','Partly','Partly','Partly','No'],['Weekly cost estimate','No','No','Partly','Partly']];
const V=[['Settling-in essentials','First click and ease rating',6,0,'/6','clicked the right place first to get a myki','All 6 also rated it very easy: mean 1.0 out of 7, where 1 is very easy.'],['Community advice','Trust rating',4.5,1,'/5','average trust in the answers','4 of 6 gave the top score, mostly because the answers come from students who have lived it.'],['Store & restaurant map','First click',7,0,'/7','clicked the right place first','Task: find an Indian grocery that’s open until 9 pm.'],['Events','Initial impressions',6,0,'/6','were certain what every part meant','Confidence in understanding the page averaged 5.0 out of 5.'],['Budget & profile','Initial impressions',4.3,1,'/5','confidence planning money from the page','All 6 described it as a weekly budget or cost breakdown.']];
const VQ={'Community advice':['Because they are answers from students who are experienced.','Posts are made by students like me, however I’d like to do some research on my own too.'],'Events':['An overview of events and meetups.','It’s showing me the different types of events that there are.'],'Budget & profile':['A breakdown of how much it costs to live in Melbourne for a week.','A budget for one week.']};

/* build */
$('#bars').innerHTML='<p class="eb">How many of the five felt it</p>'+FR.map(([l,v])=>`<div class="br"><span>${l}</span><div class="bt"><i style="--w:${v/5*100}%"></i></div><b>${v}/5</b></div>`).join('');
$('#ins').innerHTML=INS.map((t,i)=>`<div class="card"><div class="num">0${i+1}</div><p>${t}</p></div>`).join('');
let qi=0;const showQ=()=>{const q=QS[qi%QS.length];$('#qt').innerHTML=`“${q[0]}”<small>${q[1]} · click for another</small>`};showQ();$('#qt').onclick=()=>{qi++;showQ()};$('#qt').onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();qi++;showQ()}};
$('#ptabs').innerHTML=Object.keys(PERS).map((k,i)=>`<button class="${i?'':'on'}" data-p="${k}">${PERS[k].n}, ${PERS[k].t}</button>`).join('');
const persona=k=>{const p=PERS[k];$('#persona').innerHTML=`<div class="pers"><img data-im="${k}" alt="${p.n}"><div><h4>${p.n}</h4><div class="t">${p.t}</div><div style="font-size:14px;color:var(--mut)">${p.m}</div><div class="tg">${p.tg.map(x=>`<span>${x}</span>`).join('')}</div><q>${p.q}</q><h5>Goals</h5><ul>${p.g.map(x=>`<li>${x}</li>`).join('')}</ul><h5>Frustrations</h5><ul>${p.f.map(x=>`<li>${x}</li>`).join('')}</ul><h5>Preferred channels</h5><div style="font-size:15px">${p.c}</div></div></div>`;$$('#persona [data-im]').forEach(i=>i.src=IM[i.dataset.im])};persona('sanika');
$('#ps').innerHTML=PS.map(([w,t],i)=>`<div class="card"><div class="num">0${i+1}</div><b>${w}</b><p>${t}</p></div>`).join('');
$('#sw').innerHTML=COL.map(([n,h,c])=>`<button style="background:${h};color:${c}" data-c="${h}">${n}<br>${h}</button>`).join('');
$('#ftabs').innerHTML=F.map((f,i)=>`<button class="${i?'':'on'}" data-f="${i}">${f.t}</button>`).join('');
const feat=i=>{const f=F[i];$('#fx').innerHTML=`<div class="pv">${f.i.map(k=>`<img src="${IM[k]}" alt="${f.t} screen">`).join('')}</div><div><div class="who"><img src="${IM[f.w]}" alt=""> Solves for ${PERS[f.w].n}</div>${f.n.map(x=>`<span class="pill">${x}</span>`).join('')}<p class="hmw">${f.h}</p><p><b>Solution.</b> ${f.s}</p><ul>${f.a.map(x=>`<li>${x}</li>`).join('')}</ul></div>`};feat(0);
const BEFORE=[['Lands in Melbourne','hl'],['Googles it'],['Asks ChatGPT'],['Scrolls Instagram'],['Joins WhatsApp groups'],['Conflicting, scattered answers','ac'],['Meets people by luck and learns costs the hard way','ac']];
const AFTER=[['ghar.','hl'],['Settling-in essentials: checklist and short guides'],['Community advice: answers from students like you'],['Budget: know your weekly costs'],['Store and restaurant map: find familiar food nearby'],['Events: meet new people easily']];
const ba=m=>{const A=m==='b'?BEFORE:AFTER;$('#ba').innerHTML=`<p class="eb">Before and after</p><div class="tabs"><button class="${m==='b'?'on':''}" data-b="b">Before ghar.</button><button class="${m==='a'?'on':''}" data-b="a">With ghar.</button></div><p>${m==='b'?'Sanika relied on flatmates and WhatsApp groups, met other Maharashtrian students by luck, and learned the real cost of living only after she arrived.':'With ghar., Sanika has one place for the basics, advice from students like her and meetups to join, so finding community no longer depends on luck.'}</p><div class="fl">${A.map((n,i)=>`<span class="nd ${n[1]||''}" style="animation-delay:${i*70}ms">${n[0]}</span>${i<A.length-1&&m==='b'?'<span class="ar">→</span>':''}`).join('')}</div>`};ba('b');
$('#cmp').innerHTML='<tr><th></th>'+['Instagram','WhatsApp groups','Google','ChatGPT','ghar.'].map((h,i)=>`<th data-col="${i+1}" style="${i==4?'color:var(--acc)':''}">${h}</th>`).join('')+'</tr>'+CM.map(r=>`<tr><td>${r[0]}</td>${r.slice(1).map((c,i)=>`<td data-col="${i+1}">${c}</td>`).join('')}<td class="y" data-col="5">Yes</td></tr>`).join('');
$('#val').innerHTML=V.map(v=>`<div class="card"><p class="eb" style="margin:0">${v[0]}</p><p style="font-style:italic;margin:2px 0 8px">${v[1]}</p><div class="stat"><div class="num"><span data-n="${v[2]}" data-d="${v[3]}">0</span>${v[4]}</div><b style="font-size:15px">${v[5]}</b></div><p style="margin-top:8px">${v[6]}</p></div>`).join('');
const qk=Object.keys(VQ);let qq=0;$('#qtabs').innerHTML=qk.map((k,i)=>`<button class="${i?'':'on'}" data-q="${k}">${k}</button>`).join('');
const vq=k=>{$('#vq').innerHTML=VQ[k].map(t=>`<p style="margin:0 0 10px">“${t}”</p>`).join('')+'<small>What students said, in their own words</small>'};vq(qk[0]);
$('#side').innerHTML=$$('.sx').map((s,i)=>{s.id='s'+i;return `<button class="${i?'':'on'}" data-s="${i}">${s.dataset.t}</button>`}).join('');

/* events */
const on=(sel,btn)=>$$(sel).forEach(b=>b.classList.toggle('on',b===btn));
document.addEventListener('click',e=>{const t=e.target;let x;
if(x=t.closest('[data-p]')){on('#ptabs button',x);persona(x.dataset.p);return}
if(x=t.closest('[data-f]')){on('#ftabs button',x);feat(+x.dataset.f);return}
if(x=t.closest('[data-b]')){ba(x.dataset.b);return}
if(x=t.closest('[data-q]')){on('#qtabs button',x);vq(x.dataset.q);return}
if(x=t.closest('[data-s]'))return $('#s'+x.dataset.s).scrollIntoView({behavior:reduce?'auto':'smooth'});
if(x=t.closest('[data-c]')){try{navigator.clipboard.writeText(x.dataset.c)}catch(err){}const o=x.innerHTML;x.innerHTML='Copied!<br>'+x.dataset.c;setTimeout(()=>x.innerHTML=o,1200);return}
if(x=t.closest('img.zoom')){$('#lb img').src=x.src;$('#lb').classList.add('on');return}
if(t.closest('#lb'))$('#lb').classList.remove('on')});
addEventListener('keydown',e=>{if(e.key==='Escape')$('#lb').classList.remove('on')});
document.addEventListener('pointerover',e=>{const c=e.target.closest?.('[data-col]');if(c)$$('[data-col]').forEach(d=>d.classList.toggle('h',d.dataset.col===c.dataset.col))});
$('#cmp').onpointerleave=()=>$$('[data-col]').forEach(d=>d.classList.remove('h'));
addEventListener('pointermove',e=>{if(reduce)return;const x=e.clientX/innerWidth-.5,y=e.clientY/innerHeight-.5;$$('#stage img').forEach(i=>{const d=+i.dataset.d;i.style.transform=`translate(${x*d}px,${y*d*.6}px) rotate(${x*d*.3}deg)`})});

/* reveal, count-up, spy, progress */
const count=el=>{const n=+el.dataset.n,d=+el.dataset.d;if(reduce){el.textContent=n.toFixed(d);return}let t0;const f=t=>{t0??=t;const p=Math.min(1,(t-t0)/1000);el.textContent=(n*p).toFixed(d);if(p<1)requestAnimationFrame(f)};requestAnimationFrame(f)};
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');e.target.querySelectorAll('[data-n]').forEach(count);io.unobserve(e.target)}}),{threshold:.12});
$$('.rv').forEach(el=>io.observe(el));
const spy=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)$$('#side button').forEach(b=>b.classList.toggle('on','s'+b.dataset.s===e.target.id))}),{rootMargin:'-35% 0px -60% 0px'});
$$('.sx').forEach(s=>spy.observe(s));
addEventListener('scroll',()=>{$('#pg').style.width=scrollY/Math.max(1,document.documentElement.scrollHeight-innerHeight)*100+'%'},{passive:true});