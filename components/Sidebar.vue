<template>
    <div class="sidebar d-flex flex-column  ">
      <ul class="nav flex-column">
        <li v-for="(item, index) in firstGroup" :key="index" class="nav-item">
          <a
            :href="item.link"
            class="nav-link d-flex align-items-center"
            :class="{ active: activeMenu === item.name }"
            @click="setActive(item.name)">
            <img :src="item.icon" :alt="item.name" class="icon" />
            <span class="ms-2">{{ item.name }}</span>
          </a>
        </li>
      </ul>
  
      <hr class="separator" />
  
      <ul class="nav flex-column">
        <li v-for="(item, index) in secondGroup" :key="index" class="nav-item">
          <a
            :href="item.link"
            class="nav-link d-flex align-items-center"
            :class="{ active: activeMenu === item.name }"
            @click="setActive(item.name)"
          >
            <img :src="item.icon" :alt="item.name" class="icon" />
            <span class="ms-2">{{ item.name }}</span>
          </a>
        </li>
      </ul>
    </div>
    
  </template>

<script setup>
import { ref } from "vue";


const menuItems = [
{ name: "Dashboard", link: "/", icon: "/images/dashboard.png" },
{ name: "Profile", link: "/settings", icon: "/images/profile.png" },
{ name: "Services", link: "/services", icon: "/images/services.png" },
{ name: "Medical Records", link: "/medical-record", icon: "/images/mrecords.png" },
{ name: "Care Wallet", link: "/care-wallet", icon: "/images/wallet.png" },
{ name: "Messages", link: "/messages", icon: "/images/messages.png" },
{ name: "Resources", link: "/appointments", icon: "/images/resources.png" },
{ name: "Account Settings", link: "/help", icon: "/images/settings.png" },
{ name: "Contact Support", link: "/notifications", icon: "/images/support.png" },
{ name: "Logout", link: "/logout", icon: "/images/logout.png" }
];

const firstGroup = menuItems.slice(0, 7); 
const secondGroup = menuItems.slice(7); 

const activeMenu=ref("Dashboard")
const setActive=(menuName)=>{
    activeMenu.value=menuName
}
</script>

<style scoped>

*{
    padding:0;
    margin:0;
    box-sizing:border-box;
}
.sidebar {
padding-top:5rem;
  width: 250px;
  height: 100vh;
  background: #FFFFFF;
  color: #A0A0A0;
  position: fixed;
overflow-y:auto;
  box-sizing:border-box;
}


.logo {
  font-size: 20px;
  margin-bottom: 20px;
  font-weight: bold;
  color: white;
}


.nav {
  padding: 0;
}

.nav-item {
  margin: 8px 0;
}


.nav-link {
  color: #A0A0A0;
  font-family: Product Sans;
font-size: 16px;
font-weight:400;
  text-decoration: none;
  padding-left:30px;
}


.active {
  background: #2A36A4 !important;
 height:45px;
  color:white;
}


.icon {
  width: 15px;
height: 15px;
}


.separator {
  margin: 5px 0;
  border: 1px solid #DFE0EB
}

@media (max-width: 768px) {
  .sidebar {
    width: 64px; 
    padding-left: 0;
    padding-right: 0;
  }

  .nav-link {
    justify-content: center;
    padding-left: 0 !important;
  }

  .nav-link span {
    display: none; 
  }

  .active {
    height: auto; 
    padding: 0.5rem 0;
  }

  .separator {
    margin: 5px 10px; 
  }
}


</style>






