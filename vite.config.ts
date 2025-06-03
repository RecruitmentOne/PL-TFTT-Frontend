import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(), 
		tailwindcss(),
		VitePWA({
			registerType: 'autoUpdate',
			workbox: {
				globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
				runtimeCaching: [
					{
						urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
						handler: 'CacheFirst',
						options: {
							cacheName: 'google-fonts-cache',
							expiration: {
								maxEntries: 10,
								maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
							}
						}
					},
					{
						urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
						handler: 'CacheFirst',
						options: {
							cacheName: 'gstatic-fonts-cache',
							expiration: {
								maxEntries: 10,
								maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
							}
						}
					},
					{
						urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/i,
						handler: 'CacheFirst',
						options: {
							cacheName: 'images-cache',
							expiration: {
								maxEntries: 50,
								maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
							}
						}
					},
					{
						urlPattern: /\/api\/.*/i,
						handler: 'NetworkFirst',
						options: {
							cacheName: 'api-cache',
							expiration: {
								maxEntries: 100,
								maxAgeSeconds: 60 * 60 * 24 // 24 hours
							},
							networkTimeoutSeconds: 3
						}
					}
				]
			},
			includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'favicons/favicon-16x16.png', 'favicons/favicon-32x32.png', 'favicons/favicon-white.png', 'favicons/favicon-black.png'],
			manifest: {
				name: 'TFTT Platform - Talents for the Team',
				short_name: 'TFTT',
				description: 'AI-powered talent and team matching platform. Connect with leading tech companies or find exceptional talent using advanced AI matching algorithms.',
				theme_color: '#F47E22', // TFTT primary color
				background_color: '#ffffff',
				display: 'standalone',
				scope: '/',
				start_url: '/',
				orientation: 'portrait-primary',
				categories: ['business', 'productivity', 'social'],
				lang: 'en-US',
				icons: [
					{
						src: 'pwa-192x192.png',
						sizes: '192x192',
						type: 'image/png'
					},
					{
						src: 'pwa-512x512.png',
						sizes: '512x512',
						type: 'image/png'
					},
					{
						src: 'pwa-512x512.png',
						sizes: '512x512',
						type: 'image/png',
						purpose: 'any maskable'
					}
				],
				shortcuts: [
					{
						name: 'Teams Dashboard',
						short_name: 'Teams',
						description: 'Access your teams dashboard',
						url: '/teams/dashboard',
						icons: [{ src: 'shortcut-teams.png', sizes: '96x96' }]
					},
					{
						name: 'Talent Profile',
						short_name: 'Profile',
						description: 'View and edit your talent profile',
						url: '/talent/profile',
						icons: [{ src: 'shortcut-talent.png', sizes: '96x96' }]
					},
					{
						name: 'Find Opportunities',
						short_name: 'Opportunities',
						description: 'Browse available opportunities',
						url: '/opportunities',
						icons: [{ src: 'shortcut-opportunities.png', sizes: '96x96' }]
					}
				],
				screenshots: [
					{
						src: 'screenshot-wide.png',
						sizes: '1280x720',
						type: 'image/png',
						form_factor: 'wide',
						label: 'TFTT Dashboard - Desktop view'
					},
					{
						src: 'screenshot-narrow.png',
						sizes: '750x1334',
						type: 'image/png',
						form_factor: 'narrow',
						label: 'TFTT Mobile Experience'
					}
				]
			},
			devOptions: {
				enabled: true,
				type: 'module'
			}
		})
	],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
	server: {
		host: true,
		port: 3001,
		open: true,
		allowedHosts: [
			'localhost',
			'6116-5-31-203-144.ngrok-free.app'
		],
		cors: {
			origin: [
				'http://localhost:3001',
				'https://6116-5-31-203-144.ngrok-free.app',
				'http://6116-5-31-203-144.ngrok-free.app'
			],
			credentials: true
		}
	},
	build: {
		outDir: 'dist',
		sourcemap: true,
		rollupOptions: {
			output: {
				manualChunks: {
					vendor: ['react', 'react-dom'],
					animations: ['framer-motion'],
					analytics: ['localforage', 'idb']
				}
			}
		},
		chunkSizeWarningLimit: 1000
	},
}) 