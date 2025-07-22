import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    build: {
        chunkSizeWarningLimit: 99999999999,
    },
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            refresh: true,
        }),
        react(),
    ],
    server: {
        host: '127.0.0.1',
        // host: '192.168.123.34', // Your local IP
        port: 8000,
        cors: true, // ✅ Add this
    },
});
