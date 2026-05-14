// Clean project click flow: click project -> show only that project's gallery
(function(){
  var galleries={
    'ঢাকা ওয়েস্টার্ন ভ্যালি':['https://i.postimg.cc/JhJpxSHS/7.jpg','https://i.postimg.cc/cLf3bWT1/8.jpg','https://i.postimg.cc/zf5hmQPh/9.jpg','https://i.postimg.cc/jjX7RhGm/10.jpg','https://i.postimg.cc/bzQ06xFT/11.jpg','https://i.postimg.cc/76tJ2ZYk/12.jpg'],
    'পুষ্প ইকো সিটি':['https://i.postimg.cc/nLQ4Z7Hn/1.jpg','https://i.postimg.cc/qqpy852v/2.jpg','https://i.postimg.cc/KcQg6QnN/3.jpg','https://i.postimg.cc/02BKQQX1/4.jpg','https://i.postimg.cc/Hk8c7gFM/5.jpg','https://i.postimg.cc/W3N1SLYW/6.jpg'],
    'পুষ্প স্যাটেলাইট সিটি':['https://i.postimg.cc/L8DfRVd6/1.jpg','https://i.postimg.cc/q7Z36MMW/2.jpg','https://i.postimg.cc/bJD2xcZp/3.jpg','https://i.postimg.cc/Qt2KS47g/4.jpg','https://i.postimg.cc/J0jDFNc8/5.jpg','https://i.postimg.cc/DyKbXNFH/6.jpg']
  };
  function clean(v){return String(v||'').replace(/\s+/g,' ').trim();}
  function matchTitle(t){t=clean(t);return galleries[t]?t:Object.keys(galleries).find(function(k){return t.indexOf(k)>-1||k.indexOf(t)>-1;})||t;}
  function imageList(title,fallback){var key=matchTitle(title);return galleries[key]||[fallback].filter(Boolean);}
  function render(title,imgs){
    document.getElementById('sn-clean-project-gallery')?.remove();
    var box=document.createElement('section');
    box.id='sn-clean-project-gallery';
    box.className='gallery-section sn-clean-project-gallery';
    box.innerHTML='<div class="section-title"><p>প্রজেক্ট গ্যালারি</p><h3>'+clean(title)+'</h3><span>এই প্রজেক্টের ছবি ও ভিজ্যুয়াল এখানে দেখুন</span></div><div class="gallery-grid">'+imgs.map(function(src,i){return '<div class="gallery-img"><img src="'+src+'" alt="'+clean(title)+' '+(i+1)+'"></div>';}).join('')+'</div>';
    var projects=document.querySelector('.projects');
    if(projects&&projects.parentNode){projects.parentNode.insertBefore(box,projects.nextSibling);}else{document.body.appendChild(box);}
    setTimeout(function(){box.scrollIntoView({behavior:'smooth',block:'start'});},100);
  }
  function handle(el,e){
    var title=clean((el.querySelector('h3')||{}).textContent);
    var img=((el.querySelector('img')||{}).src)||'';
    if(!title&&!img)return;
    e.preventDefault();e.stopPropagation();
    render(title,imageList(title,img));
  }
  document.addEventListener('click',function(e){
    var slider=e.target.closest('.slider');
    if(slider&&!e.target.closest('.slide-actions'))return handle(slider,e);
    var card=e.target.closest('.project-card');
    if(card)return handle(card,e);
  },true);
})();
