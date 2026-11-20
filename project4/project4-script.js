const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const root=document.documentElement,reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
try{const t=localStorage.getItem('anvi-theme');if(t)root.dataset.theme=t}catch(e){}
$('#th').onclick=()=>{const d=root.dataset.theme?root.dataset.theme==='dark':matchMedia('(prefers-color-scheme:dark)').matches;root.dataset.theme=d?'light':'dark';try{localStorage.setItem('anvi-theme',root.dataset.theme)}catch(e){}};

/* frame colours: tap or drag onto the strip */
const C=[['White','#ffffff'],['Black','#0b0b0b'],['Coral','#ff6b6b'],['Peach','#ffc08a'],['Navy','#141638'],['Lilac','#b98cff'],['Green','#2fb52f'],['Pink','#ff80d5'],['Red','#e00000']];
const strip=$('#strip'),wrap=$('#swatches'),bt=[];
const lum=h=>{const r=parseInt(h.slice(1,3),16)/255,g=parseInt(h.slice(3,5),16)/255,b=parseInt(h.slice(5,7),16)/255;return .2126*r+.7152*g+.0722*b};
function apply(i){const k=C[i];strip.style.setProperty('--frame',k[1]);strip.style.setProperty('--frame-ink',lum(k[1])>.55?'#2a0606':'#f6ece0');$('#cn').textContent=k[0];bt.forEach((b,j)=>b.setAttribute('aria-pressed',j===i?'true':'false'))}
C.forEach((k,i)=>{const b=document.createElement('button');b.type='button';b.className='swb';b.style.setProperty('--c',k[1]);b.draggable=true;b.setAttribute('aria-label',k[0]+' frame');b.setAttribute('aria-pressed','false');
b.addEventListener('click',()=>apply(i));
b.addEventListener('dragstart',e=>{try{e.dataTransfer.setData('text/plain',String(i));e.dataTransfer.effectAllowed='copy'}catch(x){}});
wrap.appendChild(b);bt.push(b)});
['dragover','dragenter'].forEach(ev=>strip.addEventListener(ev,e=>{e.preventDefault();strip.classList.add('over')}));
strip.addEventListener('dragleave',()=>strip.classList.remove('over'));
strip.addEventListener('drop',e=>{e.preventDefault();strip.classList.remove('over');const i=parseInt(e.dataTransfer.getData('text/plain'),10);if(!isNaN(i)&&C[i])apply(i)});
apply(4);

/* hero strip photos: milo1, milo2, milo3 in /assets (tries each file type until one loads) */
const EXT=['jpg','jpeg','png','webp'];
$$('#strip img[data-src]').forEach(img=>{let k=0;const next=()=>{if(k<EXT.length)img.src=`../assets/${img.dataset.src}.${EXT[k++]}`};img.onerror=next;next()});

/* sketch / mock up tabs (images are in /assets, one level up from /project4) */
const SH=[{src:'../assets/Sketch.png',alt:'Hand-drawn sketch of the photobooth layout: frame colours on the left, the strip in the middle, stickers on the right, and an upload image button underneath',cap:'First sketch. Arrows note the two drags: colour to frame, sticker to anywhere on the strip.'},
{src:'../assets/Mockup.png',alt:'Photobooth mock up with nine frame colour circles, a navy photo strip with three dog photos, and a panel of stickers',cap:'Mock up. Nine frame colours, the strip with its pre-loaded photos, and a sticker panel.'}];
function shot(i){const s=SH[i];$('#shot').innerHTML=`<img class="zoom" tabindex="0" src="${s.src}" alt="${s.alt}"><figcaption>${s.cap} Click to enlarge.</figcaption>`;$$('#tabs button').forEach((b,j)=>{b.classList.toggle('on',j===i);b.setAttribute('aria-selected',j===i)})}
$('#tabs').addEventListener('click',e=>{const b=e.target.closest('button');if(b)shot(+b.dataset.i)});shot(0);

/* lightbox */
const lb=$('#lb');
function openLb(img){lb.querySelector('img').src=img.currentSrc||img.src;lb.querySelector('img').alt=img.alt;lb.classList.add('on')}
document.addEventListener('click',e=>{const z=e.target.closest('img.zoom');if(z)return openLb(z);if(e.target.closest('#lb'))lb.classList.remove('on')});
document.addEventListener('keydown',e=>{if(e.key==='Escape')lb.classList.remove('on');if(e.key==='Enter'&&document.activeElement&&document.activeElement.classList&&document.activeElement.classList.contains('zoom'))openLb(document.activeElement)});

/* nav, progress */
$('#side').innerHTML=$$('.sx').map((s,i)=>{if(!s.id)s.id='s'+i;return `<button class="${i?'':'on'}" data-s="${s.id}">${s.dataset.t}</button>`}).join('');
$('#side').addEventListener('click',e=>{const b=e.target.closest('[data-s]');if(b)document.getElementById(b.dataset.s).scrollIntoView({behavior:reduce?'auto':'smooth'})});
const spy=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)$$('#side button').forEach(b=>b.classList.toggle('on',b.dataset.s===e.target.id))}),{rootMargin:'-35% 0px -60% 0px'});
$$('.sx').forEach(s=>spy.observe(s));
addEventListener('scroll',()=>{$('#pg').style.width=scrollY/Math.max(1,document.documentElement.scrollHeight-innerHeight)*100+'%'},{passive:true});

/* show the finished-booth screenshot only if img/final.png exists */
(function(){const i=new Image();i.onload=()=>{const f=$('#finalimg');f.src=i.src;f.width=i.width;f.height=i.height;$('#finalfig').hidden=false};i.src='img/final.png'})();