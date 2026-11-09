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
  var P={sanika:['Sanika, the Community Seeker','<span class="todo">Add 2 or 3 lines on her goals, frustrations and needs</span>'],
         aarav:['Aarav, the Independent Explorer','<span class="todo">Add 2 or 3 lines on his goals, frustrations and needs</span>']};
  var btns=document.querySelectorAll('.tabs button');
  btns.forEach(function(b){b.addEventListener('click',function(){
    btns.forEach(function(x){x.setAttribute('aria-pressed',x===b)});
    document.getElementById('pn').textContent=P[b.dataset.p][0];
    document.getElementById('pt').innerHTML=P[b.dataset.p][1];
  })});
})();