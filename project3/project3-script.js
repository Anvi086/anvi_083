(function(){
  var $=function(id){return document.getElementById(id)},root=document.documentElement;
  /* sun + theme toggle (same behaviour as the home page) */
  function sun(){var r='',i,L,w,d;for(i=0;i<12;i++){L=i%2?22:38;w=i%2?6:8;
    d='M'+(-w)+',-34 C'+(-w-7)+','+(-34-L*.35)+' '+(w+2)+','+(-34-L*.65)+' 3,'+(-34-L)+' C'+(w+9)+','+(-34-L*.6)+' '+(w+7)+','+(-34-L*.25)+' '+w+',-34 Z';
    r+='<path d="'+d+'" transform="rotate('+i*30+')"/>';}
    return '<svg viewBox="-80 -80 160 160" aria-hidden="true" fill="var(--sun)">'+r+'<circle r="27"/></svg>'}
  $('theme').innerHTML=sun();
  try{var s=localStorage.getItem('anvi-theme');if(s)root.setAttribute('data-theme',s)}catch(e){}
  $('theme').addEventListener('click',function(){
    var t=root.getAttribute('data-theme'),dark=t?t==='dark':matchMedia('(prefers-color-scheme: dark)').matches;
    root.setAttribute('data-theme',dark?'light':'dark');
    try{localStorage.setItem('anvi-theme',root.getAttribute('data-theme'))}catch(e){}
  });
  /* screenshots: if the image file exists it replaces the dashed placeholder */
  document.querySelectorAll('.shot[data-img]').forEach(function(box){
    var im=new Image();im.alt=box.getAttribute('data-alt')||'';
    im.onload=function(){box.textContent='';box.appendChild(im)};
    im.src=box.getAttribute('data-img');
  });
  /* reveal on scroll */
  var els=document.querySelectorAll('.rv');
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12});
    els.forEach(function(el){io.observe(el)});
  }else els.forEach(function(el){el.classList.add('in')});
})();

(function(){
  var stage=document.getElementById('stage'),ctx=null;
  var notes=[261.63,293.66,329.63,349.23,392,440,493.88,523.25];
  var cols=['#b8b8c8','#ffb37a','#6fd0ff','#ff7a6b','#ffd166','#e9c98a','#8be0d4','#9aa8ff'];
  function play(f){
    if(!ctx)ctx=new (window.AudioContext||window.webkitAudioContext)();
    var o=ctx.createOscillator(),g=ctx.createGain(),t=ctx.currentTime;
    o.type='sine';o.frequency.value=f;
    g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.25,t+.03);g.gain.exponentialRampToValueAtTime(.001,t+1.2);
    o.connect(g);g.connect(ctx.destination);o.start(t);o.stop(t+1.25);
  }
  notes.forEach(function(f,i){
    var b=document.createElement('button');b.type='button';b.className='pl';b.style.setProperty('--c',cols[i]);
    b.setAttribute('aria-label','Planet '+(i+1));
    function hit(){b.classList.add('on');play(f);setTimeout(function(){b.classList.remove('on')},220)}
    b.addEventListener('pointerenter',function(e){if(e.pointerType!=='touch'&&ctx)hit()});
    b.addEventListener('pointerdown',hit);
    stage.appendChild(b);
  });
  document.getElementById('live').addEventListener('click',function(e){if(this.getAttribute('href')==='#')e.preventDefault()});
})();