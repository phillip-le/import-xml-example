import { readFile } from 'node:fs/promises';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    include: ['**/src/**/*.{test,spec}.?(c|m)[jt]s?(x)'],
  },
  plugins: [
    {
      name: 'handle-xml',
      async transform(_, id) {
        const xmlRegex = /\.xml$/;
        if (!xmlRegex.test(id)) {
          return;
        }
        const xml = (await readFile(id)).toString();
        return {
          code: `export default \`${xml}\``,
        };
      },
    },
  ],
});
