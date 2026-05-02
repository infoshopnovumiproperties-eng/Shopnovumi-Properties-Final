Shopnovumi Properties Website - VS Code Run Guide

IMPORTANT:
- এই ZIP file-এ node_modules রাখা হয়নি। কারণ পুরোনো/ভাঙা node_modules থাকলে VS Code-এ vite/react error দেখায়।
- প্রথমবার শুধু npm install দিতে হবে। এরপর npm run dev দিলেই localhost link আসবে।

RUN STEPS:
1) ZIP file unzip করুন।
2) VS Code খুলুন।
3) File > Open Folder থেকে ভিতরের folder "shopnovumi-properties" open করুন।
   খেয়াল রাখবেন: VS Code-এর left side-এ package.json দেখা যেতে হবে।
4) VS Code Terminal খুলুন: Terminal > New Terminal
5) Command দিন:
   npm install
6) Install complete হলে Command দিন:
   npm run dev
7) Terminal-এ যে localhost link আসবে সেটা browser-এ open করুন। সাধারণত:
   http://localhost:5173

যদি npm install কাজ না করে:
- Node.js LTS install করুন: https://nodejs.org
- তারপর VS Code বন্ধ করে আবার খুলুন।
- Terminal-এ check করুন:
  node -v
  npm -v

ভুল করবেন না:
- index.html double click করে run করবেন না।
- ZIP-এর outer folder open করবেন না। অবশ্যই inner "shopnovumi-properties" folder open করবেন।
- পুরোনো node_modules copy করবেন না।
