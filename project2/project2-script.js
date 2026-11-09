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
  var fills=document.querySelectorAll('.rows .f');
  function run(){fills.forEach(function(f){f.style.width=(f.dataset.v/377*100)+'%'})}
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(e){if(e[0].isIntersecting){run();io.disconnect()}},{threshold:.4});
    io.observe(document.querySelector('.rows'));
  }else run();
})();