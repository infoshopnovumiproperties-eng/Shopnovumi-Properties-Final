// Robust click system: homepage animated project slider -> exact project gallery
(function(){
  function txt(v){return String(v||'').replace(/\s+/g,' ').trim();}
  function normUrl(v){return String(v||'').split('?')[0].trim();}

  function getVisibleGallery(){
    var galleries=[].slice.call(document.querySelectorAll('.gallery-section'));
    return galleries.find(function(el){
      var r=el.getBoundingClientRect();
      return el.offsetParent!==null && r.height>60 && r.width>100;
    });
  }

  function scrollGalleryRetry(count){
    count=count||0;
    var gallery=getVisibleGallery();
    if(gallery){
      gallery.scrollIntoView({behavior:'smooth',block:'start'});
      return;
    }
    if(count<8){setTimeout(function(){scrollGalleryRetry(count+1);},250);}
  }

  function findMatchingCard(slider){
    var title=txt((slider.querySelector('h3')||{}).textContent);
    var img=slider.querySelector('img');
    var src=normUrl(img && img.getAttribute('src'));
    var cards=[].slice.call(document.querySelectorAll('.project-card'));

    var byTitle=cards.find(function(card){
      var cardTitle=txt((card.querySelector('h3')||{}).textContent);
      return cardTitle && title && (cardTitle===title || cardTitle.indexOf(title)>-1 || title.indexOf(cardTitle)>-1);
    });
    if(byTitle)return byTitle;

    var byImg=cards.find(function(card){
      var cardImg=card.querySelector('img');
      var cardSrc=normUrl(cardImg && cardImg.getAttribute('src'));
      return src && cardSrc && (src===cardSrc || cardSrc.indexOf(src)>-1 || src.indexOf(cardSrc)>-1);
    });
    return byImg||null;
  }

  function openCardThenGallery(card){
    if(!card)return;
    var btn=card.querySelector('button');
    var btnText=txt(btn && btn.textContent);
    if(btn && btnText.indexOf('বন্ধ')===-1){btn.click();}
    scrollGalleryRetry(0);
  }

  document.addEventListener('click',function(e){
    var slider=e.target.closest('.slider');
    if(slider){
      e.preventDefault();
      e.stopPropagation();
      openCardThenGallery(findMatchingCard(slider));
      return false;
    }
    var card=e.target.closest('.project-card');
    if(card){
      setTimeout(function(){scrollGalleryRetry(0);},150);
    }
  },true);

  document.addEventListener('touchend',function(e){
    var slider=e.target.closest('.slider');
    if(slider){
      openCardThenGallery(findMatchingCard(slider));
    }
  },true);

  document.addEventListener('mouseover',function(e){
    var slider=e.target.closest('.slider');
    if(slider){slider.style.cursor='pointer';}
  },true);
})();
