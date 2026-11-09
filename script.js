(function(){
  /* ============ EDIT YOUR DETAILS HERE ============ */
  var LINKS={
    email:'anvi6307@gmail.com',
    linkedin:'https://www.linkedin.com/in/anvi-kashelikar/',
    resume:'assets/Anvi-Resume.pdf',
    github:'https://github.com/Anvi086',
    photo:''
  };
  /* link = the case study page that opens when the project is clicked in the book */
  var PROJECTS=[
    {title:'ghar.',img:'',link:'project1/project1.html',tag:'UX / UI',sum:'An app that helps new Maharashtrian students settle into Melbourne.',
     role:'Researcher and designer',tools:'Figma, Miro',time:'2026',
     p1:'New students have to sort out housing, food, money and friends all at once.',
     p2:'Ran 5 interviews, built two personas and designed five app features.',
     p3:'An app concept with a before and after flow.'},
    {title:'MakeMyTrip',img:'',link:'project2/project2.html',tag:'UX redesign',sum:'A redesign of the flight search form, which asks for too much at once.',
     role:'UX designer',tools:'Figma, Adobe Express',time:'2026',
     p1:'The booking form crowds in fare types, GST fields and promos.',
     p2:'Ran think-aloud, 5-second and first click tests, then built a prototype.',
     p3:'Average time on task fell from 6:17 to 3:15.'},
    {title:'Milky Way',img:'',link:'project3/project3.html',tag:'Interaction',sum:'A wordless musical galaxy for toddlers, played by moving near planets.',
     role:'Designer and developer',tools:'JavaScript, Web Audio',time:'2026',
     p1:'Toddlers cannot read, and most instruments punish wrong notes.',
     p2:'Built six prototypes across mapping and feedback.',
     p3:'An instrument where every note sounds right.'},
    {title:'Photo Booth Studio',img:'',link:'project4/project4.html',tag:'Interactive',sum:'A drag and drop photo strip maker for an events company.',
     role:'Designer and developer',tools:'HTML, CSS, JavaScript',time:'2026',
     p1:'Event guests want a keepsake they can make themselves.',
     p2:'Built frame colours, photo upload, stickers and download.',
     p3:'A working strip maker in a dark red and cream theme.'}
  ];
  /* ================================================== */

  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $=function(id){return document.getElementById(id)};
  var root=document.documentElement;
  var BASE=560,MAXW=800;

  /* The sun (original wavy rays) */
  function sun(fill){
    var rays='',n=12,R=34;
    for(var i=0;i<n;i++){
      var L=i%2===0?38:22,w=i%2===0?8:6;
      var d='M'+(-w)+','+(-R)+' C'+(-w-7)+','+(-R-L*.35)+' '+(w+2)+','+(-R-L*.65)+' 3,'+(-R-L)+' C'+(w+9)+','+(-R-L*.6)+' '+(w+7)+','+(-R-L*.25)+' '+w+','+(-R)+' Z';
      rays+='<path d="'+d+'" transform="rotate('+(i*360/n)+')"/>';
    }
    return '<svg viewBox="-80 -80 160 160" aria-hidden="true" fill="'+fill+'">'+rays+'<circle r="27"/></svg>';
  }
  $('theme').innerHTML=sun('var(--sun)');
  $('photoSun').innerHTML=sun('#D4FF4F');
  var navSun=$('theme').firstChild,ticking=false;
  addEventListener('scroll',function(){
    if(ticking||reduce)return;ticking=true;
    requestAnimationFrame(function(){navSun.style.transform='rotate('+(scrollY*.25)+'deg)';ticking=false});
  },{passive:true});

  /* Theme toggle */
  function isDark(){var t=root.getAttribute('data-theme');return t?t==='dark':matchMedia('(prefers-color-scheme: dark)').matches}
  $('theme').addEventListener('click',function(){
    root.setAttribute('data-theme',isDark()?'light':'dark');
    try{localStorage.setItem('anvi-theme',root.getAttribute('data-theme'))}catch(e){}
  });
  try{var saved=localStorage.getItem('anvi-theme');if(saved)root.setAttribute('data-theme',saved)}catch(e){}

  /* Links and email */
  document.querySelectorAll('[data-link]').forEach(function(a){
    var k=a.getAttribute('data-link');
    if(LINKS[k]){a.setAttribute('href',LINKS[k]);a.setAttribute('target','_blank');a.setAttribute('rel','noopener')}
  });
  $('emailText').innerHTML='<a href="mailto:'+LINKS.email+'">'+LINKS.email+'</a>';
  if(LINKS.photo){var ph=document.querySelector('.photo');if(ph)ph.innerHTML='<img src="'+LINKS.photo+'" alt="Photo of Anvi">'}
  $('copy').addEventListener('click',function(){
    var b=this;
    function done(t){b.textContent=t;setTimeout(function(){b.textContent='Copy'},1800)}
    function sel(){var r=document.createRange();r.selectNodeContents($('emailText'));var s=getSelection();s.removeAllRanges();s.addRange(r);done('Press Ctrl+C')}
    try{navigator.clipboard.writeText(LINKS.email).then(function(){done('Copied')},sel)}catch(e){sel()}
  });

  /* Ticker: greetings in the languages of my two homes */
  (function(){
    var words=['Hello','Namaste','G’day','Hello','Namaste','G’day'],s='';
    for(var r=0;r<2;r++)words.forEach(function(w){s+='<span>'+w+sun('#0F1420')+'</span>'});
    $('track').innerHTML=s;
  })();

  /* Letters */
  var idx=0;
  function build(host,text){
    var arr=[];
    text.split(' ').forEach(function(word,wi){
      if(wi)host.appendChild(document.createTextNode(' '));
      var wd=document.createElement('span');wd.className='wd';
      word.split('').forEach(function(c){
        var ch=document.createElement('span');ch.className='ch';
        var ci=document.createElement('span');ci.className='ci';ci.textContent=c;ci.style.setProperty('--i',idx++);
        ch.appendChild(ci);wd.appendChild(ch);
        arr.push({ch:ch,ci:ci,x:0,y:0,vx:0,vy:0,rot:0,p:0});
      });
      host.appendChild(wd);
    });
    return arr;
  }
  function lock(arr){
    arr.forEach(function(o){o.ch.style.width='';o.ci.style.fontVariationSettings='"wght" '+MAXW});
    var ws=arr.map(function(o){return o.ci.getBoundingClientRect().width});
    arr.forEach(function(o,i){o.ch.style.width=ws[i]+'px';o.ci.style.fontVariationSettings='"wght" '+BASE});
  }
  function paint(o,p){
    o.ci.style.fontVariationSettings='"wght" '+Math.round(BASE+p*(MAXW-BASE));
    o.ci.style.color=p>.01?'color-mix(in srgb, var(--lime) '+Math.round(p*100)+'%, var(--on-hero))':'';
  }

  var heroL=build($('l1'),'Hello,').concat(build($('l2'),'I’m Anvi.'));
  var contactL=build($('chead'),'Say hello.');
  function relock(){if($('view-home').hidden)return;lock(heroL);lock(contactL)}
  if(document.fonts&&document.fonts.ready)document.fonts.ready.then(relock);else relock();
  var rt;addEventListener('resize',function(){clearTimeout(rt);rt=setTimeout(relock,150)});

  /* Hero physics: springs, cursor repulsion, drag and throw */
  var panel=$('heroPanel'),P={x:0,y:0,active:false},drag=null,dragTravel=0,running=false,last=0;
  var K=.075;
  function wake(){if(!running&&!reduce){running=true;last=performance.now();requestAnimationFrame(frame)}}
  function frame(t){
    var dt=Math.min(2,(t-last)/16.67||1);last=t;
    var R=Math.max(130,Math.min(250,panel.clientWidth*.17)),moving=false;
    var rects=heroL.map(function(o){return o.ch.getBoundingClientRect()});
    heroL.forEach(function(o,i){
      var r=rects[i],hx=r.left+r.width/2-o.x,hy=r.top+r.height/2-o.y,target=0;
      if(o===drag){
        var nx=o.x+((P.x-hx)-o.x)*.5,ny=o.y+((P.y-hy)-o.y)*.5;
        o.vx=(nx-o.x)/dt;o.vy=(ny-o.y)/dt;o.x=nx;o.y=ny;target=1;
      }else{
        if(P.active){
          var dx=hx+o.x-P.x,dy=hy+o.y-P.y,d=Math.hypot(dx,dy)||1;
          if(d<R){var f=Math.pow(1-d/R,2)*2.8;o.vx+=dx/d*f*dt;o.vy+=dy/d*f*dt}
          target=Math.max(0,1-d/R);
        }
        o.vx-=K*o.x*dt;o.vy-=K*o.y*dt;
        var damp=Math.pow(.89,dt);o.vx*=damp;o.vy*=damp;
        o.x+=o.vx*dt;o.y+=o.vy*dt;
      }
      o.p+=(target-o.p)*Math.min(1,.22*dt);
      o.rot+=(Math.max(-35,Math.min(35,o.vx*1.8))-o.rot)*.25;
      o.ch.style.transform='translate('+o.x.toFixed(2)+'px,'+o.y.toFixed(2)+'px) rotate('+o.rot.toFixed(2)+'deg)';
      paint(o,o.p);
      if(Math.abs(o.x)+Math.abs(o.y)+Math.abs(o.vx)+Math.abs(o.vy)+o.p>.05)moving=true;
    });
    if(moving||P.active||drag)requestAnimationFrame(frame);else running=false;
  }
  panel.addEventListener('pointermove',function(e){
    var pr=panel.getBoundingClientRect();
    panel.style.setProperty('--mx',(e.clientX-pr.left)+'px');panel.style.setProperty('--my',(e.clientY-pr.top)+'px');
    P.x=e.clientX;P.y=e.clientY;
    if(drag)dragTravel+=Math.abs(e.movementX||0)+Math.abs(e.movementY||0);
    P.active=e.pointerType!=='touch'||!!drag;
    wake();
  });
  panel.addEventListener('pointerleave',function(){if(!drag){P.active=false;wake()}});
  panel.addEventListener('pointerdown',function(e){
    var ch=e.target.closest&&e.target.closest('.ch');
    if(!ch||reduce)return;
    drag=heroL.filter(function(o){return o.ch===ch})[0];
    if(!drag)return;
    dragTravel=0;P.x=e.clientX;P.y=e.clientY;P.active=true;
    ch.classList.add('drag');try{ch.setPointerCapture(e.pointerId)}catch(err){}
    wake();
  });
  function release(){
    if(!drag)return;
    var o=drag;o.ch.classList.remove('drag');
    if(dragTravel<6){o.vy=-18;o.vx=(Math.random()-.5)*10}
    drag=null;wake();
  }
  panel.addEventListener('pointerup',release);
  panel.addEventListener('pointercancel',release);
  $('scatter').addEventListener('click',function(){
    heroL.forEach(function(o){o.vx=(Math.random()-.5)*50;o.vy=-14-Math.random()*28});
    wake();
  });
  if(reduce){$('tools').style.display='none'}

  /* Contact heading reacts to the cursor with weight and colour */
  var cp=$('contactPanel');
  cp.addEventListener('pointermove',function(e){
    if(reduce||e.pointerType==='touch')return;
    var R=Math.max(140,Math.min(280,cp.clientWidth*.22));
    contactL.forEach(function(o){
      var r=o.ch.getBoundingClientRect(),d=Math.hypot(e.clientX-(r.left+r.width/2),e.clientY-(r.top+r.height/2));
      paint(o,Math.max(0,1-d/R));
    });
  });
  cp.addEventListener('pointerleave',function(){contactL.forEach(function(o){paint(o,0)})});

  /* About statement lights up word by word as you scroll */
  var st=$('statement'),words=[];
  (function(){
    var parts=st.textContent.split(/(\s+)/);st.textContent='';
    parts.forEach(function(t){
      if(/^\s+$/.test(t)||!t){st.appendChild(document.createTextNode(t));return}
      var em=t.charAt(0)==='*';
      var span=document.createElement('span');span.className='w'+(em?' em':'');
      span.textContent=t.replace(/\*/g,'');st.appendChild(span);words.push(span);
    });
  })();
  var rev=false;
  function reveal(){
    rev=false;
    if(!st.offsetParent)return;
    var r=st.getBoundingClientRect(),vh=innerHeight;
    var prog=(vh*.88-r.top)/(r.height+vh*.18);
    prog=Math.max(0,Math.min(1,prog));
    var n=Math.round(prog*words.length);
    words.forEach(function(w,i){w.classList.toggle('on',i<n)});
  }
  addEventListener('scroll',function(){if(!rev){rev=true;requestAnimationFrame(reveal)}},{passive:true});
  addEventListener('resize',reveal);

  /* Projects book */
  function art(i){
    if(PROJECTS[i].img)return '<img src="'+PROJECTS[i].img+'" alt="'+PROJECTS[i].title+' project">';
    var s='<svg viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">',j;
    if(i===0){
      s+='<rect width="400" height="400" fill="var(--tint)"/>'+
      '<path d="M-10 90 H410 M-10 250 H410 M110 -10 V410 M290 -10 V410" stroke="var(--paper)" stroke-width="30" fill="none"/>'+
      '<rect x="125" y="105" width="150" height="130" rx="18" fill="var(--lime)"/><circle cx="60" cy="330" r="46" fill="var(--lime)"/>'+
      '<path d="M110 330 V250 H290 V90" fill="none" stroke="var(--hero)" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>'+
      '<circle cx="110" cy="330" r="14" fill="var(--ink)"/><path d="M290 40 a22 22 0 0 1 22 22 c0 22 -22 40 -22 40 s-22 -18 -22 -40 a22 22 0 0 1 22 -22z" fill="var(--coral)"/><circle cx="290" cy="62" r="8" fill="var(--paper)"/>';
    }else if(i===1){
      s+='<rect width="400" height="400" fill="var(--lime)"/><circle cx="130" cy="250" r="90" fill="var(--hero)"/><circle cx="270" cy="220" r="70" fill="var(--coral)"/><circle cx="210" cy="120" r="56" fill="#0F1420"/>'+
      '<path d="M210 64 C214 40 236 30 252 34 C250 56 232 68 210 64Z" fill="var(--lime)"/><path d="M130 160 C140 138 162 130 180 136 C176 158 154 168 130 160Z" fill="var(--lime)"/>'+
      '<rect x="40" y="340" width="320" height="16" rx="8" fill="#0F1420"/>';
    }else if(i===2){
      s+='<rect width="400" height="400" fill="var(--hero)"/>';
      for(j=0;j<18;j++){var x=36+(j%6)*66,y=50+Math.floor(j/6)*92+((j%2)*18),sc=.6+((j*7)%5)*.18;
        s+='<path transform="translate('+x+' '+y+') scale('+sc+')" d="M0 -26 C16 -4 22 6 22 16 a22 22 0 0 1 -44 0 C-22 6 -16 -4 0 -26Z" fill="var(--lime)" opacity="'+(.45+((j*3)%4)*.18)+'"/>';}
      s+='<path d="M20 350 C90 300 140 340 200 290 S320 250 380 300" fill="none" stroke="#F7F8FF" stroke-width="6" stroke-linecap="round"/>';
    }else{
      s+='<rect width="400" height="400" fill="var(--coral)"/><circle cx="330" cy="70" r="40" fill="var(--lime)"/>';
      for(j=0;j<3;j++){var sx=34+j*112;
        s+='<path d="M'+sx+' 170 a42 42 0 0 1 84 0Z" fill="'+(j===1?'var(--lime)':'#0F1420')+'"/><path d="M'+sx+' 170 h84 a14 14 0 0 1 -28 0 a14 14 0 0 1 -28 0 a14 14 0 0 1 -28 0Z" fill="'+(j===1?'#0F1420':'var(--paper)')+'"/>'+
        '<rect x="'+(sx+6)+'" y="190" width="72" height="120" fill="var(--paper)"/><circle cx="'+(sx+42)+'" cy="250" r="'+(16+j*4)+'" fill="'+(j===0?'var(--lime)':j===1?'var(--hero)':'var(--coral)')+'"/>';}
      s+='<rect x="20" y="310" width="360" height="16" rx="8" fill="#0F1420"/>';
    }
    return s+'</svg>';
  }
  var book=$('book'),rig=$('rig'),leaves=[],cur=0,opened=false,busy=false,N=PROJECTS.length;
  var ARW_R='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
  var ARW_L='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>';
  /* Anything with data-href sends the visitor to that project's case study page */
  function href(i){return PROJECTS[i].link?' data-href="'+PROJECTS[i].link+'" style="cursor:pointer"':''}
  function textPane(i){
    var p=PROJECTS[i],dots='';
    PROJECTS.forEach(function(q,j){dots+='<button type="button" data-go="'+j+'" aria-label="Go to project '+(j+1)+': '+q.title+'" aria-current="'+(j===i)+'"></button>'});
    return '<div class="pane"><div class="art mob"'+href(i)+'>'+art(i)+'</div>'+
      '<div class="eyebrow mono"><span>Case study <b>'+String(i+1).padStart(2,'0')+'</b> / '+String(N).padStart(2,'0')+'</span><span class="tagc">'+p.tag+'</span></div>'+
      '<h3'+href(i)+'>'+p.title+'</h3><p class="sum">'+p.sum+'</p>'+
      '<dl class="meta"><div><dt class="mono">Role</dt><dd>'+p.role+'</dd></div><div><dt class="mono">Tools</dt><dd>'+p.tools+'</dd></div><div><dt class="mono">Time</dt><dd>'+p.time+'</dd></div></dl>'+
      '<ul class="pts"><li><b>Problem</b><span>'+p.p1+'</span></li><li><b>What I did</b><span>'+p.p2+'</span></li><li><b>Outcome</b><span>'+p.p3+'</span></li></ul>'+
      (p.link?'<a class="more" href="'+p.link+'">View case study \u2197</a>':'')+
      '<div class="pager"><div class="dots" role="group" aria-label="Choose a project">'+dots+'</div><div class="pg-btns">'+
      '<button class="btn sm prev" type="button" data-act="prev"'+(i===0?' disabled':'')+'><span class="dot">'+ARW_L+'</span>Back</button>'+
      '<button class="btn sm" type="button" data-act="next">'+(i===N-1?'Let’s talk':'Next project')+'<span class="dot">'+ARW_R+'</span></button>'+
      '</div></div></div>';
  }
  function artPane(i){return '<div class="pane center"><div class="art"'+href(i)+'>'+art(i)+'</div>'+(PROJECTS[i].link?'<span class="mono dim">Click to open the case study</span>':(PROJECTS[i].img?'':'<span class="mono dim">Sample artwork. Swap in your screenshots.</span>'))+'</div>'}
  function setZ(k,flipped){
    var el=leaves[k].el;
    el.style.zIndex=flipped?10+k:100-k;
    el.style.setProperty('--z',((flipped?k:N+1-k)*.6)+'px');
  }
  function mkLeaf(front,back){
    var k=leaves.length,el=document.createElement('div');
    el.className='leaf';el.innerHTML=front+back;rig.appendChild(el);
    leaves.push({el:el,front:el.querySelector('.front'),back:el.querySelector('.back')});
    setZ(k,false);
  }
  mkLeaf('<button class="face front cover" type="button" aria-label="Open the projects book"><span class="cover-in"><span class="cover-sun">'+sun('#0F1420')+'</span>'+
    '<span><h3>Projects</h3><p class="sub mono">Selected work · 2025–26</p></span>'+
    '<span class="open-me">Open me<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 4v15M6 13l6 6 6-6"/></svg></span></span></button>',
    '<div class="face back">'+artPane(0)+'</div>');
  for(var k=1;k<=N;k++){
    mkLeaf('<div class="face front">'+textPane(k-1)+'</div>',
      '<div class="face back">'+(k<N?artPane(k):'<div class="pane center"><span class="mono dim">The end. Let’s talk.</span></div>')+'</div>');
  }
  function updateInert(){
    leaves.forEach(function(l,k){
      l.front.inert=!(opened?k===cur+1:k===0);
      l.back.inert=true;
    });
  }
  updateInert();
  function fit(){
    if(!leaves.length||!book.offsetParent)return;
    book.style.height='0px';
    var h=0;
    leaves.forEach(function(l){[l.front,l.back].forEach(function(f){var pn=f.querySelector('.pane');if(pn)h=Math.max(h,pn.scrollHeight)})});
    book.style.height=Math.max(h,innerWidth<820?470:600)+'px';
  }
  fit();
  if(document.fonts&&document.fonts.ready)document.fonts.ready.then(fit);
  var ft;addEventListener('resize',function(){clearTimeout(ft);ft=setTimeout(fit,150)});

  function turn(k,flip,delay){
    setTimeout(function(){
      var l=leaves[k];
      l.el.style.zIndex=200;l.el.classList.add('turning');l.el.classList.toggle('flipped',flip);
      setTimeout(function(){l.el.classList.remove('turning');setZ(k,flip)},reduce?0:1150);
    },delay);
  }
  function openBook(){
    if(opened)return;opened=true;
    rig.style.transform='';book.classList.add('open');
    $('bookHint').textContent='Turn the page with Next, or click a project to open it';
    turn(0,true,0);updateInert();
    setTimeout(function(){var b=leaves[cur+1].front.querySelector('[data-act="next"]');if(b)b.focus({preventScroll:true})},reduce?0:1200);
  }
  function go(n){
    if(!opened||busy||n===cur||n<0||n>=N)return;
    busy=true;
    var count=Math.abs(n-cur),hadFocus=book.contains(document.activeElement),k;
    if(n>cur){for(k=cur+1;k<=n;k++)turn(k,true,(k-cur-1)*170)}
    else{for(k=cur;k>n;k--)turn(k,false,(cur-k)*170)}
    cur=n;updateInert();
    setTimeout(function(){
      busy=false;
      if(hadFocus){var b=leaves[cur+1].front.querySelector('[data-act="next"]');if(b)b.focus({preventScroll:true})}
    },(count-1)*170+(reduce?0:1150));
  }
  book.addEventListener('click',function(e){
    /* clicking a project's picture or title opens its case study page */
    var g=opened&&e.target.closest('[data-href]');
    if(g){location.href=g.getAttribute('data-href');return}
    var t=e.target.closest('[data-go],[data-act],.cover');if(!t)return;
    if(t.classList.contains('cover')){openBook();return}
    if(t.hasAttribute('data-go')){go(+t.getAttribute('data-go'));return}
    if(t.getAttribute('data-act')==='prev')go(cur-1);
    else if(cur===N-1)location.hash='contact';
    else go(cur+1);
  });
  /* the closed book tilts toward the cursor */
  book.addEventListener('pointermove',function(e){
    if(opened||reduce||e.pointerType==='touch')return;
    var r=book.getBoundingClientRect(),px=(e.clientX-r.left)/r.width-.5,py=(e.clientY-r.top)/r.height-.5;
    rig.style.transform='rotateY('+(px*-14).toFixed(1)+'deg) rotateX('+(py*12).toFixed(1)+'deg)';
  });
  book.addEventListener('pointerleave',function(){if(!opened)rig.style.transform=''});
  document.addEventListener('keydown',function(e){
    if(!opened||!book.contains(document.activeElement))return;
    if(e.key==='ArrowRight'&&cur<N-1)go(cur+1);
    if(e.key==='ArrowLeft')go(cur-1);
  });

  /* Router: #home, #about-me, #projects, #contact */
  var vh=$('view-home'),va=$('view-about');
  function route(){
    var h=location.hash.slice(1),about=h==='about-me';
    va.hidden=!about;vh.hidden=about;
    document.querySelectorAll('[data-nav]').forEach(function(a){
      var k=a.getAttribute('data-nav');
      if((about&&k==='about-me')||(!about&&k==='home'&&(!h||h==='home')))a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');
    });
    document.title=about?'About Anvi':"Anvi's Portfolio";
    if(about){window.scrollTo({top:0,behavior:'instant'});return}
    relock();fit();reveal();
    var el=h&&$(h);
    if(el&&h!=='home')el.scrollIntoView();else window.scrollTo({top:0,behavior:'instant'});
  }
  addEventListener('hashchange',route);
  route();
  reveal();
})();