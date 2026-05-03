import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'shopnovumi-production-fixes',
      transform(code, id) {
        if (!id.endsWith('/src/main.jsx') && !id.endsWith('\\src\\main.jsx')) {
          return null;
        }

        let updated = code
          .split('down=100000*size').join('down=200000*size')
          .split('money(100000)').join('money(200000)');

        const start = updated.indexOf('function BayIconCalculator()');
        const end = updated.indexOf('function WesternPriceTable()', start);
        if (start !== -1 && end !== -1) {
          updated = updated.slice(0, start) + 'function BayIconCalculator(){return null;}\n\n' + updated.slice(end);
        }

        return updated;
      }
    }
  ]
});
