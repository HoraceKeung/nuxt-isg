// This file was added by layer0 init.
// You should commit this file to source control.

const { Router } = require('@layer0/core/router')
const { nuxtRoutes } = require('@layer0/nuxt')

module.exports = new Router()
	.match('/service-worker.js', ({ serviceWorker }) => {
		serviceWorker('.nuxt/dist/client/service-worker.js')
	})
	.get('/', ({ cache }) => {
		cache({
			edge: {
				maxAgeSeconds: 60 * 60 * 24 * 365
			}
		})
	})
	.get('/:pokemon', ({ cache }) => {
		cache({
			edge: {
				maxAgeSeconds: 60 * 60 * 24,
				staleWhileRevalidateSeconds: 60 * 60
			}
		})
	})
	.use(nuxtRoutes)
