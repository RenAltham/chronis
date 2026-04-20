/* ============================================================
   CHRONIS SHARED JS — Timeborne Interactive
   Include in ALL pages: <script src="shared.js"></script>
   ============================================================ */

// ===== CUSTOM CURSOR WITH PARTICLE TRAILS =====
const dot=document.getElementById('cursorDot');
const ring=document.getElementById('cursorRing');
let mx=0,my=0,rx=0,ry=0;
const trails=[];
const TRAIL_COUNT=8;

if(dot&&ring){
  // Create trail particles
  for(let i=0;i<TRAIL_COUNT;i++){
    const t=document.createElement('div');
    t.className='cursor-trail';
    t.style.width=(3-i*.3)+'px';
    t.style.height=(3-i*.3)+'px';
    document.body.appendChild(t);
    trails.push({el:t,x:0,y:0});
  }

  document.addEventListener('mousemove',e=>{
    mx=e.clientX;my=e.clientY;
    dot.style.left=(mx-3)+'px';
    dot.style.top=(my-3)+'px';
  });

  function animCursor(){
    rx+=(mx-rx)*.12;ry+=(my-ry)*.12;
    ring.style.left=rx+'px';ring.style.top=ry+'px';
    // Animate trails
    let prevX=mx,prevY=my;
    trails.forEach((t,i)=>{
      const speed=.15-i*.012;
      t.x+=(prevX-t.x)*speed;
      t.y+=(prevY-t.y)*speed;
      t.el.style.left=(t.x-1.5)+'px';
      t.el.style.top=(t.y-1.5)+'px';
      t.el.style.opacity=Math.max(0,(1-i/TRAIL_COUNT)*.3);
      prevX=t.x;prevY=t.y;
    });
    requestAnimationFrame(animCursor);
  }
  animCursor();

  // Hover effect on interactive elements
  document.querySelectorAll('a,button,.chronis-card,[onclick]').forEach(el=>{
    el.addEventListener('mouseenter',()=>ring.classList.add('hover'));
    el.addEventListener('mouseleave',()=>ring.classList.remove('hover'));
  });
}

// ===== NAV SCROLL EFFECT =====
const nav=document.querySelector('.chronis-nav');
if(nav){
  window.addEventListener('scroll',()=>{
    nav.classList.toggle('scrolled',scrollY>60);
  });
}

// ===== MOBILE MENU =====
window.chronisMenuToggle=function(){
  document.querySelector('.nav-links')?.classList.toggle('open');
};
window.chronisMenuClose=function(){
  document.querySelector('.nav-links')?.classList.remove('open');
};

// ===== REVEAL ON SCROLL =====
const revealObs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting)e.target.classList.add('vis');
  });
},{threshold:.1,rootMargin:'0px 0px -40px 0px'});
document.querySelectorAll('.rv').forEach(r=>revealObs.observe(r));

// ===== PAGE TRANSITIONS =====
document.querySelectorAll('a[href$=".html"]').forEach(a=>{
  a.addEventListener('click',function(e){
    if(this.target==='_blank'||this.getAttribute('href').startsWith('http'))return;
    e.preventDefault();
    const url=this.href;
    const tr=document.getElementById('pageTransition');
    if(tr){tr.classList.add('flash');setTimeout(()=>window.location=url,350);}
    else{window.location=url;}
  });
});

// ===== ACTIVE NAV LINK =====
const currentPage=location.pathname.split('/').pop()||'index.html';
document.querySelectorAll('.nav-links a').forEach(a=>{
  const href=a.getAttribute('href');
  if(href===currentPage||(currentPage===''&&href==='index.html')){
    a.classList.add('active');
  }
});

// ===== CARD GLOW FOLLOW =====
document.querySelectorAll('.chronis-card,.lore-card').forEach(card=>{
  card.addEventListener('mousemove',e=>{
    const r=card.getBoundingClientRect();
    card.style.setProperty('--mx',((e.clientX-r.left)/r.width*100)+'%');
    card.style.setProperty('--my',((e.clientY-r.top)/r.height*100)+'%');
  });
});
