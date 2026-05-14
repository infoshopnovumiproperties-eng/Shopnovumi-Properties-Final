// Click any home project slider/card and jump directly to that project's gallery
(function(){
  function normalizeText(value){
    return String(value || '').replace(/\s+/g,' ').trim();
  }

  function scrollToVisibleGallery(){
    setTimeout(function(){
      var galleries = Array.from(document.querySelectorAll('.gallery-section'));
      var visibleGallery = galleries.find(function(el){
        return el.offsetParent !== null && el.getBoundingClientRect().height > 40;
      });
      if(visibleGallery){
        visibleGallery.scrollIntoView({behavior:'smooth', block:'start'});
      }
    }, 450);
  }

  function openProjectByTitle(title){
    var projectTitle = normalizeText(title);
    if(!projectTitle) return;

    var cards = Array.from(document.querySelectorAll('.project-card'));
    var matchedCard = cards.find(function(card){
      var cardTitle = normalizeText((card.querySelector('h3') || {}).textContent);
      return cardTitle === projectTitle || cardTitle.includes(projectTitle) || projectTitle.includes(cardTitle);
    });

    if(matchedCard){
      var btn = matchedCard.querySelector('button');
      var btnText = normalizeText(btn && btn.textContent);
      if(btn && !btnText.includes('বন্ধ')){
        btn.click();
      }
      scrollToVisibleGallery();
    }
  }

  document.addEventListener('click', function(event){
    var slider = event.target.closest('.slider');
    if(slider){
      var title = slider.querySelector('h3');
      openProjectByTitle(title && title.textContent);
      return;
    }

    var projectButton = event.target.closest('.project-card button');
    if(projectButton){
      scrollToVisibleGallery();
    }
  });

  document.addEventListener('mouseover', function(event){
    var slider = event.target.closest('.slider');
    if(slider){ slider.style.cursor = 'pointer'; }
  });
})();
