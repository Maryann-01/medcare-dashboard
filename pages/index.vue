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
    <main class="mx-3">
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
        <div v-for="(category, index) in groupedInvestigations" :key="index" class="category-section mb-5 pb-4"
          :class="{ 'border-bottom': index < groupedInvestigations.length - 1 }">
          <h4 class="category-title mb-1">{{ category.title }}</h4>
          <div class="row g-4">
            <div v-for="test in category.investigations" :key="test.id" class="col-md-3 col-6">
              <div class="">
                <div class="form-check d-flex align-items-center p-3 g-1">
                  <input type="checkbox" :id="`test-${test.id}`" :value="test.id" v-model="selectedTests"
                    class="form-check-input me-1" />
                  <label :for="`test-${test.id}`" class="form-check-label investigation-label m-0">
                    {{ test.title }}
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div class="special-scans-section mt-4 p-3 rounded">
          <div class="row g-3">
            <!-- CT Scan -->
            <div class="col-md-6">
              <div class="scan-group position-relative">
                <h5 class="scan-title mb-2">CT Scan</h5>

                <!-- Clickable Header -->
                <div class="scan-input border rounded bg-light p-2 d-flex justify-content-between align-items-center"
                  @click="showCtOptions = !showCtOptions" :class="{ 'border-primary': showCtOptions }">
                  <span class="text-muted">
                    {{ ctSpecification || '* Specify' }}
                  </span>
                  <i class="bi bi-chevron-down" :class="{ 'rotate-180': showCtOptions }"></i>
                </div>

                <!-- Dropdown Input -->
                <div v-if="showCtOptions" class="scan-options border rounded bg-white mt-1 p-2 position-absolute w-100">
                  <input type="text" v-model="ctSpecification" placeholder="Enter CT scan details" class="form-control"
                    @keyup.enter="showCtOptions = false" @click.stop>
                </div>
              </div>
            </div>

            <!-- MRI Scan -->
            <div class="col-md-6">
              <div class="scan-group position-relative">
                <h5 class="scan-title mb-2">MRI Scan</h5>

                <!-- Clickable Header -->
                <div class="scan-input border rounded bg-light p-2 d-flex justify-content-between align-items-center"
                  @click="showMriOptions = !showMriOptions" :class="{ 'border-primary': showMriOptions }">
                  <span class="text-muted">
                    {{ mriSpecification || '*Specify' }}
                  </span>
                  <i class="bi bi-chevron-down" :class="{ 'rotate-180': showMriOptions }"></i>
                </div>

                <!-- Dropdown Input -->
                <div v-if="showMriOptions"
                  class="scan-options border rounded bg-white mt-1 p-2 position-absolute w-100">
                  <input type="text" v-model="mriSpecification" placeholder="Enter MRI scan details"
                    class="form-control" @keyup.enter="showMriOptions = false" @click.stop>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="py-4 border-top">
          <div class="text-end">
            <button class="btn btn-primary px-2" :disabled="selectedTests.length === 0" @click="submitMedicalRecord">
              <span v-if="selectedTests.length">Save and Send ({{ selectedTests.length }} )</span>
              <span v-else>Save and Send</span>
            </button>
          </div>
        </div>
      </template>
    </main>
  </div>
<!-- Success Modal -->
<div class="modal fade" id="successModal" tabindex="-1" aria-hidden="true" ref="successModal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Success!</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        Medical record submitted successfully!
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
</template>


<style scoped>
.container-fluid {
  background-color: #f5f5fb;
  min-height: 100vh;
}

.main-header>h2 {
  font-family: "Poppins", Avenir;
  font-weight: 800;
  font-size: 2rem;
  color: #382F90;
}

.main-header>p {
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
  /* border:2px solid red; */
  padding: 3rem 6rem;
}

.category-section:not(:last-child) {
  border-bottom: 2px solid #e0e0e0;
  margin-bottom: 1rem;
}

.investigation-card {
  transition: transform 0.2s, box-shadow 0.2s;
  border: 1px solid #e0e0e0;
}


.category-title {
  font-family: "Poppins", Avenir;
  font-weight: 700;
  font-size: 1.1rem;
  color: #382F90;
}

.form-check-label {
  font-family: Lato;
  font-weight: 600;
  font-size: 0.87rem;
  padding-top:5px;
  /* border:2px solid red; */
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
  font-family: Lato;
font-weight: 700;
font-size: 0.85rem;
}

.btn {
  background-color: #382F90;
  border:none;
}

.btn:disabled,
.btn[disabled] {
  opacity: 1 !important;
  box-shadow: none !important;
}

.special-scans-section{
  color:#9FA2B4;
  font-family: Lato;
font-weight: 700;
font-size: 14px;
}

.bi-chevron-down {
  font-size: 0.8rem;
  transition: transform 0.2s;
  color:#9FA2B4 !important
}

.scan-input {
  cursor: pointer;
  transition: all 0.2s;
  z-index: 1;
}

.scan-options {
  z-index: 1000;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
}

.rotate-180 {
  transform: rotate(180deg);
  transition: transform 0.2s;
}
.text-muted{
  font-family: Lato;
font-weight: 650;
font-size: 0.85rem;
color:#9FA2B4;
}
.bi-asterisk {
  font-size: 0.8rem;
  vertical-align: super;
}


@media (max-width: 768px) {
  .col-md-6 {
    margin-bottom: 1rem;
  }
}
</style>