<template>
    <div class="container-fluid">
      
      <nav class="d-flex justify-content-end align-items-center ">
        <div class="d-flex align-items-center gap-3">
          <p class="mb-0 tour-text">Take a tour</p>
          <img src="/images/notification.png" class="icon-img">
          <img src="/images/bell.png" class="icon-img">
        </div>
      </nav>

      <main class="mt-4">
        <div class="main-header">
          <h2 >Update Patient Medical Record</h2>
          <p>Click the tabs to view and edit patient medical details</p>
        </div>
        <div></div>
      </main>
    </div>
  </template>
  
  <style scoped>
  /* Maintain image shape and size */
  .icon-img {
    width: 20px; 
    height: 20px;
    object-fit: contain; /* Prevents distortion */
  }
  .tour-test{
   color: #382F9099;
  }
  .main-header>h2{
    color: #382F90;
  }
  .main-header p{
    color: #9FA2B4;
  }
  </style>
  