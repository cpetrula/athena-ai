<script setup>
import { ref } from 'vue'
import Button from 'primevue/button'
import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

const inputValue = ref('')
const products = ref([
  { id: 1, name: 'Vue.js', category: 'Framework', price: 'Free' },
  { id: 2, name: 'PrimeVue', category: 'UI Library', price: 'Free' },
  { id: 3, name: 'Tailwind CSS', category: 'CSS Framework', price: 'Free' },
  { id: 4, name: 'Vite', category: 'Build Tool', price: 'Free' }
])
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
    <div class="container mx-auto px-4">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-5xl font-bold text-gray-800 mb-4">
          Athena AI
        </h1>
        <p class="text-xl text-gray-600">
          Built with Vue.js, PrimeVue, Tailwind CSS & Vite
        </p>
      </div>

      <!-- Main Content Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <!-- Welcome Card -->
        <Card class="shadow-lg">
          <template #title>
            <div class="flex items-center gap-2">
              <i class="pi pi-sparkles text-blue-500"></i>
              <span>Welcome to Athena AI</span>
            </div>
          </template>
          <template #content>
            <p class="text-gray-700 mb-4">
              This is a modern Vue.js application showcasing the latest versions of:
            </p>
            <ul class="list-disc list-inside text-gray-700 space-y-2">
              <li><strong>Vue.js 3.5</strong> - The Progressive JavaScript Framework</li>
              <li><strong>PrimeVue</strong> - Rich UI Component Library</li>
              <li><strong>Tailwind CSS</strong> - Utility-First CSS Framework</li>
              <li><strong>Vite 7</strong> - Next Generation Frontend Tooling</li>
            </ul>
          </template>
        </Card>

        <!-- Interactive Demo Card -->
        <Card class="shadow-lg">
          <template #title>
            <div class="flex items-center gap-2">
              <i class="pi pi-code text-purple-500"></i>
              <span>Interactive Demo</span>
            </div>
          </template>
          <template #content>
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Try PrimeVue Input
                </label>
                <InputText 
                  v-model="inputValue" 
                  placeholder="Type something..." 
                  class="w-full"
                />
                <p v-if="inputValue" class="mt-2 text-sm text-gray-600">
                  You typed: <strong>{{ inputValue }}</strong>
                </p>
              </div>
              
              <div class="flex gap-2 flex-wrap">
                <Button label="Primary" severity="primary" />
                <Button label="Success" severity="success" />
                <Button label="Info" severity="info" />
                <Button label="Warning" severity="warn" />
              </div>
              
              <Button 
                label="Button with Icon" 
                icon="pi pi-check" 
                iconPos="right"
                class="w-full"
              />
            </div>
          </template>
        </Card>
      </div>

      <!-- Data Table Card -->
      <Card class="shadow-lg">
        <template #title>
          <div class="flex items-center gap-2">
            <i class="pi pi-table text-green-500"></i>
            <span>Technology Stack</span>
          </div>
        </template>
        <template #content>
          <DataTable :value="products" stripedRows>
            <Column field="id" header="ID" sortable></Column>
            <Column field="name" header="Name" sortable></Column>
            <Column field="category" header="Category" sortable></Column>
            <Column field="price" header="Price" sortable></Column>
          </DataTable>
        </template>
      </Card>

      <!-- Footer -->
      <div class="mt-8 text-center">
        <p class="text-gray-600">
          <i class="pi pi-heart-fill text-red-500"></i>
          Made with love using modern web technologies
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Additional component-specific styles can go here */
</style>
