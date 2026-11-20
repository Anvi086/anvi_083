const IM={
  b1:'../assets/MMT-Orignal-1.png', a1:'../assets/MMT-Redesign-1.png',
  b2:'../assets/MMT-Orignal-2.png', a2:'../assets/MMT-Redesign-2.png',
  b3:'../assets/MMT-Orignal-3.png', a3:'../assets/MMT-Redesign-3.png'
};

// First click test averages. If Lyssna gives a new average for the 15 original
// participants, change ORIG_AVG here (and the 23 in the HTML hero, Results and Outcomes).
const ORIG_AVG=23,REDESIGN_AVG=12;

const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches,root=document.documentElement;
try{const t=localStorage.getItem('anvi-theme');if(t)root.dataset.theme=t}catch(e){}
$('#th').onclick=()=>{const d=root.dataset.theme?root.dataset.theme==='dark':matchMedia('(prefers-color-scheme:dark)').matches;root.dataset.theme=d?'light':'dark';try{localStorage.setItem('anvi-theme',root.dataset.theme)}catch(e){}};

// ratio is the width divided by the height of the comparison window.
// 1.5 suits your screenshots. Raise it for wider windows, lower it for taller ones.
const S=[
{t:'1. Overwhelming flow',ratio:1.5,h:'Less on screen, one clear main action',p:'The search form put trip type, fare type, a GST field, price drop protection and promos in front of people at the same time.',
 d:['Search bar simplified, trip and dates first','Filters minimised but still working','Promo strip removed, results sit together'],
 w:'5-second test on the original page (15 people on Lyssna), repeated on the redesign (17 responses).',
 r:'Attention moved from the dates and filters to the flight. All 15 still knew what the site was for.'},
{t:'2. Hidden fees',ratio:1.5,h:'Showing the real price earlier',p:'Fees showed up late in the flow, so the price people saw first wasn’t always the price they paid.',
 d:['Price per adult shown first','Baggage included is listed','Cancellation and date change fees shown','Seats and meals marked as extra'],
 w:'Think-aloud test repeated on the redesign with 3 participants.',
 r:'Average time on task fell from 6:17 to 3:15. Price confidence rose from 2.7 to 4.3 out of 5, and 3 of 3 said the final price matched.'},
{t:'3. Comparing flights',ratio:1.5,h:'Making the comparison easy to find',p:'It wasn’t obvious where to click to compare flights side by side.',
 d:['A Compare panel keeps both flights in view','A Compare box on each result','The price difference is worked out for you'],
 w:'First click test: “Where would you click to compare these flights?” 15 people on the original page and 15 on the redesign, one click each.',
 r:'Time to click fell from '+ORIG_AVG+' seconds to '+REDESIGN_AVG+'. 10 of 15 knew where to click to compare flights.'}];

const pane=(k,l)=>IM[k]?`<img src="${IM[k]}" alt="${l}">`:`<span>＋ Add: ${l}</span>`;
const sol=i=>{const s=S[i],k=i+1;
$('#sol').innerHTML=`
<h4>${s.h}</h4>
<div class="cmp" style="--ratio:${s.ratio}">
  <div class="pane a">${pane('a'+k,'redesign screen')}</div>
  <div class="pane b">${pane('b'+k,'original screen')}</div>
  <span class="lb l">Before</span><span class="lb r">After</span>
  <div class="hd"></div>
  <input type="range" min="0" max="100" value="50" aria-label="Reveal before and after">
</div>
<div class="cols">
  <div class="col"><h5>The problem</h5><p>${s.p}</p></div>
  <div class="col"><h5>What I changed</h5><ul class="chg">${s.d.map(x=>`<li>${x}</li>`).join('')}</ul></div>
  <div class="col"><h5>How I tested it</h5><p>${s.w}</p></div>
  <div class="col hl"><h5>What happened</h5><p>${s.r}</p></div>
</div>`;
const c=$('.cmp'),inp=c.querySelector('input');
inp.oninput=()=>{c.querySelector('.pane.b').style.clipPath=`inset(0 ${100-inp.value}% 0 0)`;c.querySelector('.hd').style.left=inp.value+'%'}};
$('#tabs').innerHTML=S.map((s,i)=>`<button class="${i?'':'on'}" data-t="${i}">${s.t}</button>`).join('');sol(0);

const fmt=s=>Math.floor(s/60)+':'+String(s%60).padStart(2,'0');
const O=[439,321,372],R=[240,225,120];
$('#race').innerHTML='<p class="eb" style="margin:0 0 6px">Think-aloud time on task</p>'+O.map((o,i)=>`<div class="rr"><span>Person ${i+1}</span><div style="display:grid;gap:4px"><div class="rb"><i style="--w:${o/439*100}%"></i></div><div class="rb"><i class="af" style="--w:${R[i]/439*100}%"></i></div></div><b>${fmt(o)}<br><span style="color:var(--acc)">${fmt(R[i])}</span></b></div>`).join('')+'<p style="font-size:13px;color:var(--mut);margin:6px 0 0">Grey is the original. Red is the redesign.</p><button class="btn" id="replay">Replay</button>';

const fcW=Math.round(REDESIGN_AVG/ORIG_AVG*100);
$('#fc').innerHTML=`<p class="eb" style="margin:0 0 6px">Average time to click: ${ORIG_AVG}s on the original, ${REDESIGN_AVG}s on the redesign</p><div class="rr"><span>Original</span><div class="rb"><i style="--w:100%"></i></div><b>${ORIG_AVG}s</b></div><div class="rr"><span>Redesign</span><div class="rb"><i class="af" style="--w:${fcW}%"></i></div><b>${REDESIGN_AVG}s</b></div><p style="margin:14px 0 0"><b>Clicked the right place on the redesign: 10 of 15</b></p><div class="dots">`+Array.from({length:15},(_,i)=>`<i class="${i<10?'y':''}" style="--n:${i}"></i>`).join('')+'</div>';

$('#side').innerHTML=$$('.sx').map((s,i)=>{s.id='s'+i;return `<button class="${i?'':'on'}" data-s="${i}">${s.dataset.t}</button>`}).join('');
document.addEventListener('click',e=>{const t=e.target;let x;
if(x=t.closest('[data-t]')&&t.closest('#tabs button')){$$('#tabs button').forEach(b=>b.classList.toggle('on',b===t.closest('#tabs button')));sol(+t.closest('#tabs button').dataset.t);return}
if(x=t.closest('[data-s]'))return $('#s'+x.dataset.s).scrollIntoView({behavior:reduce?'auto':'smooth'});
if(t.id==='replay'){const r=$('#race');r.classList.remove('in');void r.offsetWidth;r.classList.add('in')}});
const count=el=>{const n=+el.dataset.n;if(reduce){el.textContent=n;return}let t0;const f=t=>{t0??=t;const p=Math.min(1,(t-t0)/1000);el.textContent=Math.round(n*p);if(p<1)requestAnimationFrame(f)};requestAnimationFrame(f)};
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');e.target.querySelectorAll('[data-n]').forEach(count);io.unobserve(e.target)}}),{threshold:.12});
$$('.rv').forEach(el=>io.observe(el));
const spy=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)$$('#side button').forEach(b=>b.classList.toggle('on','s'+b.dataset.s===e.target.id))}),{rootMargin:'-35% 0px -60% 0px'});
$$('.sx').forEach(s=>spy.observe(s));
addEventListener('scroll',()=>{$('#pg').style.width=scrollY/Math.max(1,document.documentElement.scrollHeight-innerHeight)*100+'%'},{passive:true});