import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Security headers middleware with comprehensive CSP
const securityHeaders = () => ({
  name: 'security-headers',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      // Set strict security headers
      res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
      res.setHeader('X-Content-Type-Options', 'nosniff');
      res.setHeader('X-Frame-Options', 'SAMEORIGIN'); // Allow framing on same origin for preview
      res.setHeader('X-XSS-Protection', '1; mode=block');
      res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
      res.setHeader('Permissions-Policy', 'accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=(), interest-cohort=()');
      
      // Comprehensive CSP with all required sources and localhost
      res.setHeader('Content-Security-Policy', [
        "default-src 'self' http://localhost:* http://127.0.0.1:*",
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://appssdk.zoom.us https://static.elfsight.com https://cdn.jsdelivr.net http://localhost:* http://127.0.0.1:*",
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
        "img-src 'self' data: https://*.unsplash.com https://stackblitz.com blob: http://localhost:* http://127.0.0.1:*",
        "font-src 'self' https://fonts.gstatic.com",
        "connect-src 'self' https://gxkiubkgtkgvyidvuagh.supabase.co wss://gxkiubkgtkgvyidvuagh.supabase.co https://*.supabase.co http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:*",
        "frame-src 'self' https://elfsight.com https://appssdk.zoom.us http://localhost:* http://127.0.0.1:*",
        "media-src 'self' https://stackblitz.com http://localhost:* http://127.0.0.1:*",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self'",
        "frame-ancestors 'self'", // Allow framing on same origin for preview
        "upgrade-insecure-requests",
        "block-all-mixed-content"
      ].join('; '));

      next();
    });
  },
  configurePreviewServer(server) {
    server.middlewares.use((req, res, next) => {
      // Set strict security headers
      res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
      res.setHeader('X-Content-Type-Options', 'nosniff');
      res.setHeader('X-Frame-Options', 'SAMEORIGIN'); // Allow framing on same origin for preview
      res.setHeader('X-XSS-Protection', '1; mode=block');
      res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
      res.setHeader('Permissions-Policy', 'accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=(), interest-cohort=()');
      
      // Comprehensive CSP with all required sources and localhost
      res.setHeader('Content-Security-Policy', [
        "default-src 'self' http://localhost:* http://127.0.0.1:*",
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://appssdk.zoom.us https://static.elfsight.com https://cdn.jsdelivr.net http://localhost:* http://127.0.0.1:*",
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
        "img-src 'self' data: https://*.unsplash.com https://stackblitz.com blob: http://localhost:* http://127.0.0.1:*",
        "font-src 'self' https://fonts.gstatic.com",
        "connect-src 'self' https://gxkiubkgtkgvyidvuagh.supabase.co wss://gxkiubkgtkgvyidvuagh.supabase.co https://*.supabase.co http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:*",
        "frame-src 'self' https://elfsight.com https://appssdk.zoom.us http://localhost:* http://127.0.0.1:*",
        "media-src 'self' https://stackblitz.com http://localhost:* http://127.0.0.1:*",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self'",
        "frame-ancestors 'self'", // Allow framing on same origin for preview
        "upgrade-insecure-requests",
        "block-all-mixed-content"
      ].join('; '));

      next();
    });
  }
});

export default defineConfig({
  plugins: [
    react(),
    securityHeaders()
  ],
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp',
      'Cross-Origin-Resource-Policy': 'same-origin'
    }
  }
});