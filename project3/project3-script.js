const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const root=document.documentElement,reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
try{const t=localStorage.getItem('anvi-theme');if(t)root.dataset.theme=t}catch(e){}
$('#th').onclick=()=>{const d=root.dataset.theme?root.dataset.theme==='dark':matchMedia('(prefers-color-scheme:dark)').matches;root.dataset.theme=d?'light':'dark';try{localStorage.setItem('anvi-theme',root.dataset.theme)}catch(e){}};
const esc=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

/* playable stage */
const bodies=[
{id:'mercury',n:'Mercury',c:'#9e9c98',note:'G3',f:196.0,s:.66},
{id:'venus',n:'Venus',c:'#e8c27a',note:'A3',f:220.0,s:.82},
{id:'earth',n:'Earth',c:'#328bd0',note:'C4',f:261.63,s:.86},
{id:'mars',n:'Mars',c:'#d96548',note:'D4',f:293.66,s:.72},
{id:'jupiter',n:'Jupiter',c:'#d9a66f',note:'E4',f:329.63,s:1},
{id:'saturn',n:'Saturn',c:'#e5cc91',note:'G4',f:392.0,s:.94},
{id:'uranus',n:'Uranus',c:'#9de5e5',note:'A4',f:440.0,s:.8},
{id:'neptune',n:'Neptune',c:'#4668d6',note:'C5',f:523.25,s:.78}];
const sky=$('#sky'),stage=$('#stage'),loopState=$('#loopState'),active={},cells={},stars=[];
for(let i=0;i<46;i++){const s=document.createElement('span');s.className='star';const z=1+Math.random()*2;s.style.cssText=`left:${Math.random()*100}%;top:${Math.random()*100}%;width:${z}px;height:${z}px;--t:${3+Math.random()*4}s;--d:${-Math.random()*6}s`;stage.appendChild(s);stars.push(s)}
const flash=c=>{for(let n=0;n<6;n++){const st=stars[Math.floor(Math.random()*stars.length)];st.style.background=c;st.style.boxShadow=`0 0 6px 1px ${c}`;setTimeout(()=>{st.style.background='';st.style.boxShadow=''},450)}};
function cell(o){const c=document.createElement('div');c.className='cell'+(o.sun?' sun-cell':'');const b=document.createElement('button');b.type='button';b.className='body-btn';b.style.setProperty('--c',o.c);b.style.setProperty('--s',o.s||1);b.setAttribute('aria-label',o.sun?'Sun: start or stop the loop':`${o.n}, plays ${o.note}`);const l=document.createElement('div');l.className='nm';l.innerHTML=`<em>${o.n}</em>${o.sun?'Start / stop':o.note}`;c.append(b,l);sky.appendChild(c);return{c,b}}
let ctx=null;
function audio(){if(!ctx){const A=window.AudioContext||window.webkitAudioContext;if(!A)return null;ctx=new A()}if(ctx.state==='suspended')ctx.resume();return ctx}
function tone(f,d){const a=audio();if(!a)return;const t=a.currentTime,o=a.createOscillator(),g=a.createGain();o.type='triangle';o.frequency.value=f;g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(.28,t+.02);g.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(g);g.connect(a.destination);o.start(t);o.stop(t+d+.05)}
function ripple(b){const {c,b:btn}=cells[b.id];for(let k=0;k<3;k++){const r=document.createElement('span');r.className='ring';r.style.setProperty('--c',b.c);r.style.animationDelay=k*.25+'s';r.style.width=btn.offsetWidth+'px';r.style.top=btn.offsetTop+'px';c.appendChild(r);r.addEventListener('animationend',()=>r.remove())}flash(b.c)}
const play=b=>{tone(b.f,.45);ripple(b)};
const sun=cell({sun:true,n:'Sun',c:'#ffd83d'});
bodies.forEach(b=>{cells[b.id]=cell(b);cells[b.id].b.addEventListener('click',()=>{const on=!active[b.id];active[b.id]=on;cells[b.id].b.classList.toggle('on',on);if(on)play(b)})});
let timer=null,step=0;
sun.b.addEventListener('click',()=>{audio();if(timer){clearInterval(timer);timer=null;sun.c.classList.remove('playing');loopState.textContent='Loop stopped';return}
const any=bodies.some(b=>active[b.id]);step=0;timer=setInterval(()=>{const b=bodies[step%bodies.length];if(active[b.id])play(b);step++},250);sun.c.classList.add('playing');loopState.textContent=any?'Looping':'Looping, switch a planet on'});

/* feature tabs */
const F=[
{t:'Tap a planet',h:'Note, ripples and on/off',what:'A tap plays the planet\'s note, draws ripples and switches the planet on or off for the loop. Planets that are on keep a glow, so a child can see which ones will play.',how:'Each planet is an SVG circle with a click listener. It plays the note, draws the ripples, and adds or removes the planet from a Set of active planets.',code:`// browsers need a tap before audio can start
planet.addEventListener("click", async (event) => {
  await Tone.start();
  synth.triggerAttackRelease(noteFor(id), "8n");
  ripplePlanet(planet);
  // add or remove the planet from activePlanets
});`},
{t:'Pitch from your tap',h:'Where you tap sets the height',what:'Tap the top of a planet for a higher note and the bottom for a lower one. Each planet remembers its own offset, and the loop uses it too.',how:'The tap position is converted into SVG coordinates and then into a number from 0 (top) to 1 (bottom). That becomes an offset of -2 to +2 notes along the scale.',code:`const svgPoint = point.matrixTransform(sky.getScreenCTM().inverse());
const fraction = (svgPoint.y - (cy - r)) / (2 * r);  // 0 = top, 1 = bottom
planetOffset[id] = Math.round((0.5 - height) * 4);   // -2 ... +2`},
{t:'Pitch panel',h:'Lower, Higher and five dots',what:'The panel along the bottom moves every planet up or down together, then plays a short preview note so the change can be heard straight away.',how:'The state is one number, pitchStep, from -2 to +2. Each step moves a note three places along the pentatonic scale, which keeps everything in key. Lower, Higher and each dot call the same function.',code:`function noteFor(id) {
  let index = planetBase[id] + planetOffset[id] + pitchStep * 3;
  index = Math.max(0, Math.min(scale.length - 1, index));
  return scale[index];
}`},
{t:'Ripples',h:'Rings in each planet\'s colour',what:'Three rings spread out from the planet and fade, in that planet\'s colour.',how:'ripplePlanet() creates three SVG circles, each starting 0.25 seconds after the last. A CSS animation scales and fades them, and each ring removes itself when it ends. The colour is read from a CSS custom property, --glow-halo, set once on each planet.',code:''},
{t:'Twinkling stars',h:'A background that listens',what:'Whenever a planet plays, a handful of stars flash in that planet\'s colour. The glow stays small and tight so the background stays calm. Try it in the sky above.',how:'Seventy small stars are created in JavaScript with random positions, sizes and twinkle speeds.',code:''},
{t:'Intro and audio',h:'A sound warning, then a tap to start',what:'A pop-up opens on load to warn the grown-up that the instrument makes noise.',how:'A native dialog element holds the warning. Browsers block audio until the user does something, so every tap calls Tone.start() before playing.',code:''}];
function sol(i){const f=F[i];$('#sol').innerHTML=`<h4>${f.h}</h4><h5>What it does</h5><p>${f.what}</p><h5>How it works</h5><p>${f.how}</p>${f.code?`<pre>${esc(f.code)}</pre>`:''}`;$$('#tabs button').forEach((b,j)=>b.classList.toggle('on',j===i))}
$('#tabs').innerHTML=F.map((f,i)=>`<button type="button" data-i="${i}">${i+1}. ${f.t}</button>`).join('');
$('#tabs').addEventListener('click',e=>{const b=e.target.closest('button');if(b)sol(+b.dataset.i)});sol(0);

/* swatches */
const SW=[['Space','#171419','Page background','#f0f6f0'],['Light','#f0f6f0','Main text','#171419'],['Purple','#d372f6','Buttons and links','#171419'],['Yellow','#ffd83d','Number badges and headings','#171419'],['Pitch blue','#9fb2ff','Pitch dots and line','#171419']];
$('#sw').innerHTML=SW.map(s=>`<button type="button" style="--c:${s[1]};--k:${s[3]}" data-c="${s[1]}">${s[0]}<small>${s[1]}</small><small>${s[2]}</small></button>`).join('');
$('#sw').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;const c=b.dataset.c;const done=()=>{$('#copied').textContent='Copied '+c};try{navigator.clipboard.writeText(c).then(done,()=>{$('#copied').textContent=c})}catch(err){$('#copied').textContent=c}});

/* planet bars */
const maxF=523.25;
$('#bars').innerHTML='<p class="eb">Note frequency by planet</p>'+bodies.map(b=>`<div class="br"><span>${b.n}</span><div class="bt"><i style="--c:${b.c};--w:${b.f/maxF*100}%"></i></div><b>${b.note} · ${b.f.toFixed(2)} Hz</b></div>`).join('');

/* nav, progress */
$('#side').innerHTML=$$('.sx').map((s,i)=>{s.id='s'+i;return `<button class="${i?'':'on'}" data-s="${i}">${s.dataset.t}</button>`}).join('');
$('#side').addEventListener('click',e=>{const b=e.target.closest('[data-s]');if(b)$('#s'+b.dataset.s).scrollIntoView({behavior:reduce?'auto':'smooth'})});
const spy=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)$$('#side button').forEach(b=>b.classList.toggle('on','s'+b.dataset.s===e.target.id))}),{rootMargin:'-35% 0px -60% 0px'});
$$('.sx').forEach(s=>spy.observe(s));
addEventListener('scroll',()=>{$('#pg').style.width=scrollY/Math.max(1,document.documentElement.scrollHeight-innerHeight)*100+'%'},{passive:true});