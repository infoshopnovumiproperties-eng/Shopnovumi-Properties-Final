const SN_DOWN_PER_KATHA=200000;
const SN_BOOKING_PER_KATHA=20000;
const BN='০১২৩৪৫৬۷۸۹';
function toBn(v){return String(v).replace(/[0-9]/g,d=>BN[Number(d)]);}
function money(v){return toBn(new Intl.NumberFormat('en-US').format(Math.round(Number(v)||0)))+' ৳';}
function num(t){return String(t||'').replace(/[০-۹]/g,d=>String(BN.indexOf(d))).replace(/,/g,'').match(/[0-9]+(\.[0-9]+)?/)?.[0]*1||0;}
function selected(s){return s?(s.options[s.selectedIndex]?.textContent||s.value||''):'';}
function row(rows,label){return rows.find(r=>(r.querySelector('span')?.textContent||'').includes(label));}
function updateBox(box){
 const selects=[...box.querySelectorAll('select')];
 const katha=num(selected(selects.find(s=>selected(s).includes('কাঠা'))));
 const inst=num(selected(selects.find(s=>selected(s).includes('কিস্তি'))))||1;
 if(!katha)return;
 const rows=[...box.querySelectorAll('.pay-rows p')];
 const rateRow=row(rows,'প্রতি কাঠা'), totalRow=row(rows,'সর্বমোট'), bookingRow=row(rows,'বুকিং'), downRow=row(rows,'ডাউন পেমেন্ট'), remRow=row(rows,'অবশিষ্ট'), monRow=row(rows,'মাসিক কিস্তি');
 if(!rateRow||!downRow||!remRow||!monRow)return;
 const rate=num(rateRow.querySelector('b')?.textContent);
 const total=rate*katha, booking=SN_BOOKING_PER_KATHA*katha, down=SN_DOWN_PER_KATHA*katha, remaining=Math.max(total-booking-down,0), monthly=remaining/inst;
 if(totalRow)totalRow.querySelector('b').textContent=money(total);
 if(bookingRow)bookingRow.querySelector('b').textContent=money(booking);
 downRow.querySelector('b').textContent=money(down);
 remRow.querySelector('b').textContent=money(remaining);
 monRow.querySelector('b').textContent=money(monthly);
}
function updateAll(){
 document.querySelectorAll('.payment-box').forEach(updateBox);
 document.querySelectorAll('.notes p').forEach(n=>{if((n.textContent||'').includes('ডাউন পেমেন্ট'))n.textContent='• ডাউন পেমেন্ট: কাঠা প্রতি '+money(SN_DOWN_PER_KATHA);});
}
window.addEventListener('load',updateAll);
document.addEventListener('DOMContentLoaded',updateAll);
document.addEventListener('change',()=>setTimeout(updateAll,50),true);
document.addEventListener('click',()=>setTimeout(updateAll,50),true);
setInterval(updateAll,500);
