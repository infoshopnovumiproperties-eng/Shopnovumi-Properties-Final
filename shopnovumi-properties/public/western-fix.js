(function(){
  function banglaToEnglish(value){
    return String(value||'').replace(/[\u09e6-\u09ef]/g,function(ch){return String(ch.charCodeAt(0)-0x09e6);});
  }
  function readNumber(value){
    return Number(banglaToEnglish(value).replace(/[^0-9.]/g,''))||0;
  }
  function banglaMoney(value){
    return String(Math.round(value).toLocaleString('en-US')).replace(/[0-9]/g,function(d){return String.fromCharCode(0x09e6+Number(d));})+' \u09f3';
  }
  function fix(){
    document.querySelectorAll('.payment-box').forEach(function(box){
      if((box.innerText||'').indexOf('Phase')===-1) return;
      var selects=box.querySelectorAll('select');
      if(selects.length<4) return;
      var size=readNumber(selects[2].value || (selects[2].selectedOptions[0]||{}).textContent);
      var months=readNumber(selects[3].value || (selects[3].selectedOptions[0]||{}).textContent) || 1;
      var rows={};
      box.querySelectorAll('.pay-rows p').forEach(function(row){
        var label=row.querySelector('span');
        var val=row.querySelector('b');
        if(label&&val) rows[label.textContent.trim()]=val;
      });
      var total=readNumber(rows['\u09b8\u09b0\u09cd\u09ac\u09ae\u09cb\u099f'] && rows['\u09b8\u09b0\u09cd\u09ac\u09ae\u09cb\u099f'].textContent);
      var booking=20000*size;
      var down=200000*size;
      var remaining=Math.max(total-booking-down,0);
      var downKey='\u09a1\u09be\u0989\u09a8 \u09aa\u09c7\u09ae\u09c7\u09a8\u09cd\u099f';
      var remKey='\u0985\u09ac\u09b6\u09bf\u09b7\u09cd\u099f';
      var monthlyKey='\u09ae\u09be\u09b8\u09bf\u0995 \u0995\u09bf\u09b8\u09cd\u09a4\u09bf';
      if(rows[downKey]) rows[downKey].textContent=banglaMoney(down);
      if(rows[remKey]) rows[remKey].textContent=banglaMoney(remaining);
      if(rows[monthlyKey]) rows[monthlyKey].textContent=banglaMoney(remaining/months);
    });
    document.querySelectorAll('.notes p').forEach(function(p){
      var t=p.textContent||'';
      if(t.indexOf('\u09a1\u09be\u0989\u09a8 \u09aa\u09c7\u09ae\u09c7\u09a8\u09cd\u099f')!==-1){
        p.textContent='\u2022 \u09a1\u09be\u0989\u09a8 \u09aa\u09c7\u09ae\u09c7\u09a8\u09cd\u099f: \u0995\u09be\u09a0\u09be \u09aa\u09cd\u09b0\u09a4\u09bf \u09e8\u09e6\u09e6,\u09e6\u09e6\u09e6 \u09f3';
      }
    });
  }
  document.addEventListener('change',function(){setTimeout(fix,50);});
  setInterval(fix,300);
})();
