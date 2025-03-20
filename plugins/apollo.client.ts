export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.hook('apollo:auth', ({ token }) => {
      // Client-side only check
      if (import.meta.client) { 
        const authToken = localStorage.getItem('authToken')
        if (authToken) {
          token.value = authToken
        }
      }
    })
  })