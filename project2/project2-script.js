const IM={};
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches,root=document.documentElement;
try{const t=localStorage.getItem('anvi-theme');if(t)root.dataset.theme=t}catch(e){}
$('#th').onclick=()=>{const d=root.dataset.theme?root.dataset.theme==='dark':matchMedia('(prefers-color-scheme:dark)').matches;root.dataset.theme=d?'light':'dark';try{localStorage.setItem('anvi-theme',root.dataset.theme)}catch(e){}};

const S=[
{t:'1. Overwhelming flow',h:'Less on screen, one clear main action',p:'The search form put trip type, fare type, a GST field, price drop protection and promos in front of people at the same time.',w:'5-second test on the original page (5 people), repeated on the redesign on Lyssna (17 responses), plus think-aloud time on task.',r:'Time on task fell from 7:19, 5:21 and 6:12 on the original to about 4:00, 3:45 and 2:00 on the redesign.',d:'Describe what you removed, moved or grouped on the search form.'},
{t:'2. Hidden fees',h:'Showing the real price earlier',p:'Fees showed up late in the flow, so the price people saw first wasn’t always the price they paid.',w:'Think-aloud test repeated on the redesign with 3 participants.',r:'All three said the final price matched what they expected, and rated their confidence 4, 5 and 4.',d:'Describe how the redesign shows fees and the final price.'},
{t:'3. Comparing flights',h:'Making the comparison easy to find',p:'It wasn’t obvious where to click to compare flights side by side.',w:'First click test: “Where would you click to compare these flights?” Five people on the original page, 15 on the redesign, one click each.',r:'On the original, people clicked unrelated areas and didn’t know what to do. On the redesign 10 of 15 clicked the right place, and the average time dropped from 23 seconds to 12.',d:'Describe where the compare option now lives and how it looks.'}];
const pane=(k,l)=>IM[k]?`<img src="${IM[k]}" alt="${l}">`:`<span>＋ Add: ${l}</span>`;
const sol=i=>{const s=S[i],k=i+1;$('#sol').innerHTML=`<h4>${s.h}</h4><h5>The problem</h5><p>${s.p}</p><h5>What I changed</h5><p class="todo">✎ ${s.d}</p><div class="cmp"><div class="pane a">${pane('a'+k,'redesign screen')}</div><div class="pane b">${pane('b'+k,'original screen')}</div><span class="lb" style="left:10px">Before</span><span class="lb" style="right:10px">After</span><div class="hd"></div><input type="range" min="0" max="100" value="50" aria-label="Reveal before and after"></div><h5>How I tested it</h5><p>${s.w}</p><h5>What happened</h5><p><b>${s.r}</b></p>`;
const c=$('.cmp'),inp=c.querySelector('input');inp.oninput=()=>{c.querySelector('.pane.b').style.clipPath=`inset(0 ${100-inp.value}% 0 0)`;c.querySelector('.hd').style.left=inp.value+'%'}};
$('#tabs').innerHTML=S.map((s,i)=>`<button class="${i?'':'on'}" data-t="${i}">${s.t}</button>`).join('');sol(0);
const fmt=s=>Math.floor(s/60)+':'+String(s%60).padStart(2,'0');
const O=[439,321,372],R=[240,225,120];
$('#race').innerHTML='<p class="eb" style="margin:0 0 6px">Think-aloud time on task</p>'+O.map((o,i)=>`<div class="rr"><span>Person ${i+1}</span><div style="display:grid;gap:4px"><div class="rb"><i style="--w:${o/439*100}%"></i></div><div class="rb"><i class="af" style="--w:${R[i]/439*100}%"></i></div></div><b>${fmt(o)}<br><span style="color:var(--acc)">${fmt(R[i])}</span></b></div>`).join('')+'<p style="font-size:13px;color:var(--mut);margin:6px 0 0">Grey is the original. Red is the redesign.</p><button class="btn" id="replay">Replay</button>';
$('#fc').innerHTML='<p class="eb" style="margin:0 0 6px">Average time to click: 23s on the original, 12s on the redesign</p><div class="rr"><span>Original</span><div class="rb"><i style="--w:100%"></i></div><b>23s</b></div><div class="rr"><span>Redesign</span><div class="rb"><i class="af" style="--w:52%"></i></div><b>12s</b></div><p style="margin:14px 0 0"><b>Clicked the right place on the redesign: 10 of 15</b></p><div class="dots">'+Array.from({length:15},(_,i)=>`<i class="${i<10?'y':''}" style="--n:${i}"></i>`).join('')+'</div>';
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