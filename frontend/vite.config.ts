import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig({
    base: '/',
    plugins: [react(), tailwindcss(), tsconfigPaths()],
    server: {
        host: true, // ここをtrueにすることでプライベートネットワークまで公開できるので、スマホ側から確認が可能になる。
    },
});
