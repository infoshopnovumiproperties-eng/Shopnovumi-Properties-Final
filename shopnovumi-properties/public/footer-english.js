(function(){
  function run(){
    var oldText = '\u09b8\u09b0\u09cd\u09ac\u09b8\u09cd\u09ac\u09a4\u09cd\u09ac \u09b8\u0982\u09b0\u0995\u09cd\u09b7\u09bf\u09a4';
    document.querySelectorAll('*').forEach(function(el){
      if(!el || !el.childNodes || el.childNodes.length !== 1) return;
      if(el.childNodes[0].nodeType !== 3) return;
      var t = el.textContent || '';
      if(t.indexOf(oldText) !== -1){
        el.textContent = t.replace(oldText, 'All Rights Reserved');
      }
    });
  }
  document.addEventListener('DOMContentLoaded', run);
  setInterval(run, 500);
})();
