<script setup lang="ts">
import { useAuth } from '@/composables/useAuth'
import { ref } from 'vue'
import Sidebar from '@/components/Sidebar.vue' // Adjust path as needed

const { login } = useAuth()
const authState = ref<'loading'|'authenticated'|'error'>('loading')

const handleLogin = async () => {
  try {
    authState.value = 'loading'
    const success = await login()
    authState.value = success ? 'authenticated' : 'error'
  } catch {
    authState.value = 'error'
  }
}

handleLogin()
</script>

<template>
  <div v-if="authState === 'authenticated'" class="layout">
    <Sidebar class="sidebar" />
    <div class="content custom-bg">
      <slot></slot>
    </div>
  </div>

  <div v-else-if="authState === 'error'" class="error-state">
    <div class="alert alert-danger">
      <h4>Authentication Failed</h4>
      <button class="btn btn-primary mt-2" @click="handleLogin">
        Retry Authentication
      </button>
    </div>
  </div>

  <div v-else class="loading-state">
    <div class="spinner-border text-primary"></div>
    <p class="mt-2">Initializing application...</p>
  </div>
</template>


<style scoped>
.layout {
  display: flex;
  height: 100vh;
}

.sidebar {
  flex-shrink: 0; 
  position: relative; 
}


.content {
  flex-grow: 1; 
  padding: 3rem 2rem;
  background: #F5F5FB;
  height: 100vh;
  overflow-y: auto;
  position: relative; 
}
  
/* Responsive adjustments */
@media (max-width: 768px) {
  .sidebar {
    flex: 0 0 60px;
    margin-left: -250px;
  }
  
  .content {
    margin-left: 0;
  }
}


</style>