const SN_DOWN_PER_KATHA = 200000;
const SN_BOOKING_PER_KATHA = 20000;
const BN_DIGITS = '০১২৩৪৫৬৭৮৯';

function toBn(value) {
  return String(value).replace(/[0-9]/g, digit => BN_DIGITS[Number(digit)]);
}

function money(value) {
  return toBn(new Intl.NumberFormat('en-US').format(Math.round(Number(value) || 0))) + ' ৳';
}

function num(text) {
  const normalized = String(text || '')
    .replace(/[০-৯]/g, digit => String(BN_DIGITS.indexOf(digit)))
    .replace(/,/g, '');
  const match = normalized.match(/[0-9]+(?:\.[0-9]+)?/);
  return match ? Number(match[0]) : 0;
}

function selected(select) {
  return select ? (select.options[select.selectedIndex]?.textContent || select.value || '') : '';
}

function findRow(rows, label) {
  return rows.find(row => (row.querySelector('span')?.textContent || '').includes(label));
}

function updateBox(box) {
  const selects = Array.from(box.querySelectorAll('select'));
  const katha = num(selected(selects.find(select => selected(select).includes('কাঠা'))));
  const installments = num(selected(selects.find(select => selected(select).includes('কিস্তি')))) || 1;
  if (!katha) return;

  const rows = Array.from(box.querySelectorAll('.pay-rows p'));
  const rateRow = findRow(rows, 'প্রতি কাঠা');
  const totalRow = findRow(rows, 'সর্বমোট');
  const bookingRow = findRow(rows, 'বুকিং');
  const downRow = findRow(rows, 'ডাউন পেমেন্ট');
  const remainingRow = findRow(rows, 'অবশিষ্ট');
  const monthlyRow = findRow(rows, 'মাসিক কিস্তি');
  if (!rateRow || !downRow || !remainingRow || !monthlyRow) return;

  const rate = num(rateRow.querySelector('b')?.textContent);
  const total = rate * katha;
  const booking = SN_BOOKING_PER_KATHA * katha;
  const down = SN_DOWN_PER_KATHA * katha;
  const remaining = Math.max(total - booking - down, 0);
  const monthly = remaining / installments;

  if (totalRow) totalRow.querySelector('b').textContent = money(total);
  if (bookingRow) bookingRow.querySelector('b').textContent = money(booking);
  downRow.querySelector('b').textContent = money(down);
  remainingRow.querySelector('b').textContent = money(remaining);
  monthlyRow.querySelector('b').textContent = money(monthly);
}

function updateAll() {
  document.querySelectorAll('.payment-box').forEach(updateBox);
  document.querySelectorAll('.notes p').forEach(note => {
    if ((note.textContent || '').includes('ডাউন পেমেন্ট')) {
      note.textContent = '• ডাউন পেমেন্ট: কাঠা প্রতি ' + money(SN_DOWN_PER_KATHA);
    }
  });
}

window.addEventListener('load', updateAll);
document.addEventListener('DOMContentLoaded', updateAll);
document.addEventListener('change', () => setTimeout(updateAll, 50), true);
document.addEventListener('click', () => setTimeout(updateAll, 50), true);
setInterval(updateAll, 500);
