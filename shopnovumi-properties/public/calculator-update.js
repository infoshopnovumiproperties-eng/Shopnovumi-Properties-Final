const SN_DOWN_PER_KATHA = 200000;
const SN_BOOKING_PER_KATHA = 20000;

function snBanglaDigits(value) {
  const map = {'0':'০','1':'১','2':'۲','3':'۳','4':'۴','5':'۵','6':'۶','7':'۷','8':'۸','9':'۹'};
  return String(value).replace(/[0-9]/g, d => map[d] || d);
}

function snMoney(value) {
  const rounded = Math.round(Number(value) || 0);
  return snBanglaDigits(new Intl.NumberFormat('en-US').format(rounded)) + ' ৳';
}

function snNumber(text) {
  const map = {'۰':'0','۱':'1','۲':'2','۳':'3','۴':'4','۵':'5','۶':'6','۷':'7','۸':'8','۹':'9','০':'0','১':'1','২':'2','۳':'3','۴':'4','৫':'5','۶':'6','۷':'7','۸':'8','۹':'9'};
  const normalized = String(text || '').replace(/[۰-۹۰-۹]/g, d => map[d] || d).replace(/,/g, '');
  const match = normalized.match(/[0-9]+(?:\.[0-9]+)?/);
  return match ? Number(match[0]) : 0;
}

function snSelectText(select) {
  return select ? (select.options[select.selectedIndex]?.textContent || select.value || '') : '';
}

function snUpdateBox(box) {
  const selects = Array.from(box.querySelectorAll('select'));
  const kathaSelect = selects.find(s => snSelectText(s).includes('কাঠা'));
  const installmentSelect = selects.find(s => snSelectText(s).includes('কিস্তি'));
  const katha = snNumber(snSelectText(kathaSelect));
  const installments = snNumber(snSelectText(installmentSelect)) || 1;
  if (!katha) return;

  const rows = Array.from(box.querySelectorAll('.pay-rows p'));
  const row = label => rows.find(r => (r.querySelector('span')?.textContent || '').includes(label));
  const rateRow = row('প্রতি কাঠা');
  const totalRow = row('সর্বমোট');
  const bookingRow = row('বুকিং');
  const downRow = row('ডাউন পেমেন্ট');
  const remainingRow = row('অবশিষ্ট');
  const monthlyRow = row('মাসিক কিস্তি');
  if (!rateRow || !downRow || !remainingRow || !monthlyRow) return;

  const rate = snNumber(rateRow.querySelector('b')?.textContent);
  const total = rate * katha;
  const booking = SN_BOOKING_PER_KATHA * katha;
  const down = SN_DOWN_PER_KATHA * katha;
  const remaining = Math.max(total - booking - down, 0);
  const monthly = remaining / installments;

  if (totalRow) totalRow.querySelector('b').textContent = snMoney(total);
  if (bookingRow) bookingRow.querySelector('b').textContent = snMoney(booking);
  downRow.querySelector('b').textContent = snMoney(down);
  remainingRow.querySelector('b').textContent = snMoney(remaining);
  monthlyRow.querySelector('b').textContent = snMoney(monthly);
}

function snUpdateAllCalculators() {
  document.querySelectorAll('.payment-box').forEach(snUpdateBox);
  document.querySelectorAll('.notes p').forEach(note => {
    if ((note.textContent || '').includes('ডাউন পেমেন্ট')) {
      note.textContent = '• ডাউন পেমেন্ট: কাঠা প্রতি ' + snMoney(SN_DOWN_PER_KATHA);
    }
  });
}

window.addEventListener('load', snUpdateAllCalculators);
document.addEventListener('change', () => setTimeout(snUpdateAllCalculators, 50), true);
document.addEventListener('click', () => setTimeout(snUpdateAllCalculators, 50), true);
setInterval(snUpdateAllCalculators, 700);
