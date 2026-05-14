// Guaranteed visible slider click behavior
(function(){
  function clean(v){return String(v||'').replace(/\s+/g,' ').trim();}
  function makeGallery(title,img){
    if(!title && !img) return;
    var old=document.getElementById('sn-slider-gallery');
    if(old) old.remove();
    var s=document.createElement('section');
    s.id='sn-slider-gallery';
    s.className='gallery-section';
    s.style.margin='18px auto';
    s.style.maxWidth='1280px';
    s.innerHTML='<div class="section-title"><p>Project Gallery</p><h3>'+title+'</h3></div><div class="gallery-grid"><div class="gallery-img"><img src="'+img+'" alt="'+title+'"></div></div>';
    var hero=document.querySelector('.hero');
    if(hero && hero.parentNode){hero.parentNode.insertBefore(s,hero.nextSibling);}else{document.body.appendChild(s);}
    setTimeout(function(){s.scrollIntoView({behavior:'smooth',block:'start'});},80);
  }
  function tryOpenOriginal(title,img){
    var cards=[].slice.call(document.querySelectorAll('.project-card'));
    var card=cards.find(function(c){
      var t=clean((c.querySelector('h3')||{}).textContent);
      var ci=(c.querySelector('img')||{}).src||'';
      return (title && (t===title || t.indexOf(title)>-1 || title.indexOf(t)>-1)) || (img && ci && ci.indexOf(img.split('/').pop())>-1);
    });
    if(card){
      var btn=card.querySelector('button');
      if(btn && clean(btn.textContent).indexOf('বন্ধ')===-1) btn.click();
    }
  }
  document.addEventListener('click',function(e){
    var slider=e.target.closest('.slider');
    if(!slider || e.target.closest('.slide-actions')) return;
    e.preventDefault();
    e.stopPropagation();
    var title=clean((slider.querySelector('h3')||{}).textContent);
    var img=(slider.querySelector('img')||{}).src||'';
    tryOpenOriginal(title,img);
    makeGallery(title,img);
  },true);
})();
