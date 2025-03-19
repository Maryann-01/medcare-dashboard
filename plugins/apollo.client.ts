export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.hook('apollo:auth', ({ token }) => {
    
      if (import.meta.client) { 
        const authToken = localStorage.getItem('authToken')
        if (authToken) {
          token.value = authToken
        }
      }
    })
  })