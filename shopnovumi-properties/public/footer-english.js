(function(){
  function ready(fn){if(document.readyState!=='loading')fn();else document.addEventListener('DOMContentLoaded',fn)}
  function clean(t){return String(t||'').replace(/\s+/g,' ').trim()}
  function footerTextFix(){
    var oldText='\u09b8\u09b0\u09cd\u09ac\u09b8\u09cd\u09ac\u09a4\u09cd\u09ac \u09b8\u0982\u09b0\u0995\u09cd\u09b7\u09bf\u09a4';
    document.querySelectorAll('*').forEach(function(el){
      if(!el||!el.childNodes||el.childNodes.length!==1)return;
      if(el.childNodes[0].nodeType!==3)return;
      var t=el.textContent||'';
      if(t.indexOf(oldText)!==-1)el.textContent=t.replace(oldText,'All Rights Reserved');
    });
  }
  function openProjectFromSlider(slider){
    var title=clean((slider.querySelector('h3')||{}).textContent);
    var img=(slider.querySelector('img')||{}).src||'';
    var cards=Array.from(document.querySelectorAll('.project-card'));
    var match=cards.find(function(card){
      var name=clean((card.querySelector('h3')||{}).textContent);
      var cardImg=(card.querySelector('img')||{}).src||'';
      var titleMatch=title&&name&&(name.indexOf(title)>-1||title.indexOf(name)>-1);
      var imageMatch=img&&cardImg&&img.split('/').pop()===cardImg.split('/').pop();
      return titleMatch||imageMatch;
    });
    if(match){
      var btn=match.querySelector('button');
      if(btn)btn.click();
      setTimeout(function(){match.scrollIntoView({behavior:'smooth',block:'center'})},180);
    }
  }
  function enhanceSlider(){
    document.querySelectorAll('.slider').forEach(function(slider){
      slider.style.cursor='pointer';
      slider.setAttribute('title','এই প্রজেক্টের বিস্তারিত দেখতে ক্লিক করুন');
      if(!slider.querySelector('.sn-slider-hint')){
        var hint=document.createElement('div');
        hint.className='sn-slider-hint';
        hint.textContent='বিস্তারিত দেখতে ছবিতে ক্লিক করুন';
        slider.appendChild(hint);
      }
    });
  }
  function addFloating(){
    if(document.querySelector('.sn-floating'))return;
    var box=document.createElement('div');
    box.className='sn-floating';
    box.innerHTML='<a class="sn-wa" target="_blank" href="https://wa.me/8801734697485">WhatsApp</a><a class="sn-ms" target="_blank" href="https://www.facebook.com/shopnovumiproperties1">Messenger</a>';
    document.body.appendChild(box);
  }
  function removeAI(){
    document.querySelectorAll('.sn-ai-panel,.sn-ai-open').forEach(function(el){if(el)el.remove()});
  }
  ready(function(){
    footerTextFix();
    enhanceSlider();
    addFloating();
    removeAI();
    document.addEventListener('click',function(e){
      var slider=e.target.closest('.slider');
      if(!slider||e.target.closest('.slide-actions'))return;
      openProjectFromSlider(slider);
    });
    setInterval(function(){footerTextFix();enhanceSlider();removeAI()},700);
  });
})();
