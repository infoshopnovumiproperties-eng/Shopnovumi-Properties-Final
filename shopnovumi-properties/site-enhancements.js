(function(){
  'use strict';
  var LOGO='https://i.postimg.cc/2S9NC5p0/Shopnovumi-Properties-Logo.png';
  var WA='8801734697485';
  var FB='https://www.facebook.com/shopnovumiproperties1';
  var defaultText='আসসালামু আলাইকুম, আমি Shopnovumi Properties এর একটি প্রজেক্ট সম্পর্কে বিস্তারিত জানতে চাই।';
  function waLink(text){return 'https://wa.me/'+WA+'?text='+encodeURIComponent(text||defaultText)}
  function ready(fn){if(document.readyState!=='loading')fn();else document.addEventListener('DOMContentLoaded',fn)}
  function toast(msg){
    var t=document.querySelector('.sn-toast');
    if(!t){t=document.createElement('div');t.className='sn-toast';document.body.appendChild(t)}
    t.textContent=msg;t.classList.add('show');
    setTimeout(function(){t.classList.remove('show')},3000);
  }
  function addSeo(){
    document.title='Shopnovumi Properties | স্মার্ট বিনিয়োগে, সমৃদ্ধ ভবিষ্যৎ';
    var meta={
      description:'Shopnovumi Properties — ঢাকা ওয়েস্টার্ন ভ্যালি, পুষ্প ইকো সিটি, পুষ্প স্যাটেলাইট সিটি সহ প্রিমিয়াম প্লট ও প্রপার্টি ইনভেস্টমেন্ট সল্যুশন।',
      keywords:'Shopnovumi Properties, ঢাকা ওয়েস্টার্ন ভ্যালি, Pushpo Eco City, Plot in Dhaka, Property Bangladesh, জমি, প্লট',
      themeColor:'#047857'
    };
    function up(name,content,attr){var s=attr||'name';var el=document.querySelector('meta['+s+'="'+name+'"]');if(!el){el=document.createElement('meta');el.setAttribute(s,name);document.head.appendChild(el)}el.setAttribute('content',content)}
    up('description',meta.description);up('keywords',meta.keywords);up('theme-color',meta.themeColor);
    up('og:description',meta.description,'property');up('og:type','website','property');up('og:site_name','Shopnovumi Properties','property');
    up('twitter:card','summary_large_image');up('twitter:title',document.title);up('twitter:description',meta.description);up('twitter:image',LOGO);
  }
  function addLoader(){
    if(document.querySelector('.sn-loader'))return;
    var l=document.createElement('div');l.className='sn-loader';
    l.innerHTML='<div class="sn-loader-card"><img src="'+LOGO+'" alt="Shopnovumi Properties"><h3>Shopnovumi Properties</h3><p>স্মার্ট বিনিয়োগে, সমৃদ্ধ ভবিষ্যৎ!</p><div class="sn-spinner"></div></div>';
    document.body.appendChild(l);
    window.addEventListener('load',function(){setTimeout(function(){l.classList.add('hide')},650)});
    setTimeout(function(){l.classList.add('hide')},2300);
  }
  function addFloating(){
    if(document.querySelector('.sn-floating'))return;
    var f=document.createElement('div');f.className='sn-floating';
    f.innerHTML='<a class="sn-wa" target="_blank" href="'+waLink()+'">WhatsApp</a><a class="sn-ms" target="_blank" href="'+FB+'">Messenger</a><button class="sn-open-form" type="button">Plot Inquiry</button>';
    document.body.appendChild(f);
    f.querySelector('.sn-open-form').addEventListener('click',function(){openModal()});
  }
  function addModal(){
    if(document.querySelector('.sn-modal'))return;
    var m=document.createElement('div');m.className='sn-modal';
    m.innerHTML='<form class="sn-form"><h3>Plot Inquiry Form</h3><p>আপনার তথ্য দিন, WhatsApp এ সুন্দরভাবে inquiry message তৈরি হয়ে যাবে।</p><input name="name" placeholder="আপনার নাম" required><input name="phone" placeholder="মোবাইল নাম্বার" required><select name="project"><option>ঢাকা ওয়েস্টার্ন ভ্যালি</option><option>পুষ্প ইকো সিটি</option><option>পুষ্প স্যাটেলাইট সিটি</option><option>দুবাই গার্ডেন সিটি</option><option>দ্যা বে আইকন</option><option>পুষ্প সিটি লাক্সারিয়াস কনডোমিনিয়াম</option></select><select name="size"><option>৩ কাঠা</option><option>৪ কাঠা</option><option>৫ কাঠা</option><option>৬ কাঠা</option><option>৮ কাঠা</option><option>১০ কাঠা</option><option>২০ কাঠা</option></select><textarea name="note" placeholder="আপনার প্রয়োজন / বাজেট / লোকেশন পছন্দ লিখুন"></textarea><div class="sn-form-actions"><button class="sn-close" type="button">বন্ধ করুন</button><button class="sn-submit" type="submit">WhatsApp এ পাঠান</button></div></form>';
    document.body.appendChild(m);
    m.addEventListener('click',function(e){if(e.target===m)closeModal()});
    m.querySelector('.sn-close').addEventListener('click',closeModal);
    m.querySelector('form').addEventListener('submit',function(e){
      e.preventDefault();
      var fd=new FormData(e.currentTarget);
      var msg='আসসালামু আলাইকুম, আমি Shopnovumi Properties থেকে বিস্তারিত জানতে চাই।\n\nনাম: '+fd.get('name')+'\nমোবাইল: '+fd.get('phone')+'\nপ্রজেক্ট: '+fd.get('project')+'\nপ্লট সাইজ: '+fd.get('size')+'\nনোট: '+(fd.get('note')||'')+'\n\nদয়া করে আমাকে বিস্তারিত জানাবেন।';
      try{localStorage.setItem('shopnovumi_last_lead',JSON.stringify({name:fd.get('name'),phone:fd.get('phone'),project:fd.get('project'),size:fd.get('size'),note:fd.get('note'),time:new Date().toISOString()}))}catch(err){}
      if(window.fbq){window.fbq('track','Lead')}
      toast('Inquiry ready — WhatsApp খুলছে');
      window.open(waLink(msg),'_blank');
      closeModal();
    });
  }
  function openModal(){var m=document.querySelector('.sn-modal');if(m)m.classList.add('show')}
  function closeModal(){var m=document.querySelector('.sn-modal');if(m)m.classList.remove('show')}
  function addReviews(){
    if(document.querySelector('.sn-reviews'))return;
    var contact=document.querySelector('.contact');
    var r=document.createElement('section');r.className='sn-reviews';
    r.innerHTML='<div class="sn-reviews-wrap"><h3>কেন গ্রাহকরা আমাদের উপর আস্থা রাখেন</h3><div class="sn-review-grid"><article class="sn-review"><b>নিরাপদ বিনিয়োগ ভাবনা</b><p>লোকেশন, কিস্তি সুবিধা ও প্রজেক্ট তথ্য সুন্দরভাবে বুঝিয়ে দেওয়ার কারণে সিদ্ধান্ত নেওয়া সহজ হয়।</p></article><article class="sn-review"><b>প্রফেশনাল সাপোর্ট</b><p>প্রতিটি প্রজেক্টের দাম, প্লট সাইজ, বুকিং ও পেমেন্ট প্ল্যান পরিষ্কারভাবে জানানো হয়।</p></article><article class="sn-review"><b>ভবিষ্যৎ সম্ভাবনাময় লোকেশন</b><p>সংযোগ সুবিধা ও পরিকল্পিত উন্নয়নের কারণে দীর্ঘমেয়াদি ইনভেস্টমেন্টের জন্য ভালো সম্ভাবনা তৈরি হয়।</p></article></div><div class="sn-badge-row"><span>Premium Project</span><span>Installment Facility</span><span>WhatsApp Support</span></div></div>';
    if(contact&&contact.parentNode){contact.parentNode.insertBefore(r,contact)}else{document.body.appendChild(r)}
  }
  function autoPopup(){
    var shown=false;
    function showOnce(){if(shown)return;shown=true;toast('প্রজেক্ট সম্পর্কে জানতে Plot Inquiry দিন');setTimeout(openModal,700)}
    setTimeout(showOnce,18000);
  }
  function connectButtons(){
    document.addEventListener('click',function(e){
      var txt=(e.target.textContent||'').toLowerCase();
      if(txt.indexOf('inquiry')>-1||txt.indexOf('বুকিং')>-1){if(window.fbq)window.fbq('track','Lead')}
    });
  }
  ready(function(){addSeo();addLoader();addModal();addFloating();addReviews();autoPopup();connectButtons()});
})();
