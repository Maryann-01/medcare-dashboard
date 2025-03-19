<script setup lang="ts">
import { useInvestigations } from "@/composables/useInvestigations";
import { ref, watchEffect } from "vue";

const { groupedInvestigations, loading, error } = useInvestigations();
const selectedTests = ref<string[]>([]);
const hasMounted = ref(false);


const showCtOptions = ref(false);
const showMriOptions = ref(false);
const ctSpecification = ref('');
const mriSpecification = ref('');

watchEffect(() => {
  if (import.meta.client) hasMounted.value = true;
});

const toggleTest = (testId: string) => {
  if (!hasMounted.value) return;
  selectedTests.value = selectedTests.value.includes(testId)
    ? selectedTests.value.filter(id => id !== testId)
    : [...selectedTests.value, testId];
};

const toggleCtOptions = () => {
  showCtOptions.value = !showCtOptions.value;
  showMriOptions.value = false;
};

const toggleMriOptions = () => {
  showMriOptions.value = !showMriOptions.value;
  showCtOptions.value = false;
};

const submitMedicalRecord = async () => {
  // Implement your submission logic here
  console.log('Submitting:', {
    tests: selectedTests.value,
    ct: ctSpecification.value,
    mri: mriSpecification.value
  });
};
</script>

<template>
  <div class="container-fluid" v-if="hasMounted">
    <nav class="d-flex justify-content-end align-items-center py-3">
      <div class="d-flex align-items-center gap-3">
        <p class="mb-0 tour-text">Take a tour</p>
        <img src="/images/notification.png" alt="Notification" class="icon-img" />
        <img src="/images/bell.png" alt="Bell" class="icon-img" />
      </div>
    </nav>
    <div class="main-header mb-4">
        <h2>Update Patient Medical Record</h2>
        <p>Click the tabs to view and edit patient medical details</p>
      </div>
    <main class="px-3">
      <div v-if="loading" class="text-center py-5">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <p class="mt-2">Loading medical investigations...</p>
      </div>

    
      <div v-else-if="error" class="alert alert-danger mx-auto" style="max-width: 600px">
        <h4 class="alert-heading">Error Loading Data</h4>
        <p>{{ error.message }}</p>
      </div>

      
      <template v-else>
        <div 
          v-for="(category, index) in groupedInvestigations" 
          :key="index" 
          class="category-section mb-5 pb-4"
          :class="{ 'border-bottom': index < groupedInvestigations.length - 1 }"
        >
          <h4 class="category-title mb-4">{{ category.title }}</h4>
          <div class="row g-4">
            <div 
              v-for="test in category.investigations" 
              :key="test.id"
              class="col-md-3 col-6"
            >
              <div class="">
                <div class="card-body d-flex align-items-center p-3">
                  <input
                    type="checkbox"
                    :id="`test-${test.id}`"
                    :value="test.id"
                    v-model="selectedTests"
                    class="form-check-input me-3"
                  />
                  <label 
                    :for="`test-${test.id}`" 
                    class="form-check-label flex-grow-1 investigation-label m-0"
                  >
                    {{ test.title }}
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

     
        <div class="special-scans-section mt-4 p-3 bg-light rounded">
          <div class="row g-3">
            <!-- CT Scan -->
            <div class="col-md-6">
              <div class="scan-group">
                <h5 class="scan-title">CT Scan</h5>
                <div class="scan-input" @click="toggleCtOptions">
                  <div class="d-flex align-items-center gap-1">
                    <i class="bi bi-asterisk text-danger"></i>
                    <span class="placeholder">Specify</span>
                  </div>
                  <i class="bi bi-chevron-down"></i>
                </div>
                <div v-if="showCtOptions" class="scan-options mt-2">
                  <input
                    type="text"
                    v-model="ctSpecification"
                    placeholder="Enter CT scan details"
                    class="form-control form-control-sm"
                  >
                </div>
              </div>
            </div>

            
            <div class="col-md-6">
              <div class="scan-group">
                <h5 class="scan-title">MRI Scan</h5>
                <div class="scan-input" @click="toggleMriOptions">
                  <div class="d-flex align-items-center gap-1">
                    <i class="bi bi-asterisk text-danger"></i>
                    <span class="placeholder">Specify</span>
                  </div>
                  <i class="bi bi-chevron-down"></i>
                </div>
                <div v-if="showMriOptions" class="scan-options mt-2">
                  <input
                    type="text"
                    v-model="mriSpecification"
                    placeholder="Enter MRI scan details"
                    class="form-control form-control-sm"
                  >
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class=" bg-white py-4 border-top">
          <div class="text-end">
            <button 
              class="btn btn-primary px-5"
              :disabled="selectedTests.length === 0"
              @click="submitMedicalRecord"
            >
              <span v-if="selectedTests.length">Save & Send ({{ selectedTests.length }} selected)</span>
              <span v-else>Save & Send</span>
            </button>
          </div>
        </div>
      </template>
    </main>
  </div>
</template>

<style scoped>
.container-fluid {
  background-color: #f5f5fb;
  min-height: 100vh;
}

.main-header>h2{
  font-family: Avenir,"Poppins";
font-weight: 900;
font-size: 2rem;
color:#382F90;
}
.main-header>p{
  font-family: Avenir, "Poppins";
font-weight: 400;
color: #9FA2B4;
font-size: 0.9rem;
letter-spacing: 0.3px;
}
main {
  background-color: white;
  border-radius: 5px;
  padding: 2rem;
  margin: 0.4rem;
  /* box-shadow: 0 2px 8px rgba(0,0,0,0.05); */
}
.category-section:not(:last-child) {
  border-bottom: 2px solid #e0e0e0;
  margin-bottom: 2rem;
}

.investigation-card {
  transition: transform 0.2s, box-shadow 0.2s;
  border: 1px solid #e0e0e0;
}

.investigation-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.category-title {
 font-family: Avenir, "Poppins";
font-weight: 700;
font-size: 1.1rem;
color: #382F90;
}
.form-check-label{
  font-family: Lato;
font-weight: 600;
font-size: 0.85rem;
}
.sticky-bottom {
  /* position: sticky; */
  bottom: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(5px);
  margin-top: 2rem;
  padding-top: 1.5rem;
}

/* CT/MRI Scan Styles */
.scan-group {
  width: 100%;
}

.scan-input {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0.75rem;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  background: white;
  cursor: pointer;
  transition: all 0.2s;
}

.scan-input:hover {
  border-color: #2a36a4;
}

.scan-title {
  font-size: 0.95rem;
  font-weight: 600;
  color: #2a36a4;
  margin-bottom: 0.5rem;
}

.bi-asterisk {
  font-size: 0.7rem;
  vertical-align: middle;
}

.bi-chevron-down {
  font-size: 0.8rem;
  transition: transform 0.2s;
}

.scan-options {
  margin-top: 0.5rem;
}

@media (max-width: 768px) {
  .col-md-6 {
    margin-bottom: 1rem;
  }
}
</style>