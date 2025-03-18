<script setup lang="ts">
import { useAuth } from "@/composables/useAuth";

const { login } = useAuth();

// Log in automatically when the app starts
login();
</script>


<template>
  <div class="layout">
    <Sidebar class="sidebar" />
    <div class="content custom-bg">
      <slot></slot>
    </div>
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
</style>
