<script setup>
import { ref } from 'vue'
import Card from 'primevue/card'

const props = defineProps({
  claimId: {
    type: String,
    default: null
  }
})

// Mock data - in real app, this would be fetched from API
const claimSummary = ref({
  claimNumber: props.claimId || '77707',
  claimant: 'Jane Smith',
  injuryDate: '2024-01-15',
  status: 'Open',
  type: 'Medical Only',
  description: 'Employee suffered a back injury while lifting heavy equipment. Initial medical treatment provided at local clinic.'
})
</script>

<template>
  <Card class="shadow-md">
    <template #title>
      <div class="flex items-center gap-2">
        <i class="pi pi-file-edit text-blue-500"></i>
        <span>Claim Summary</span>
      </div>
    </template>
    <template #content>
      <div class="space-y-3">
        <div class="grid grid-cols-2 gap-2 text-sm">
          <div>
            <span class="font-semibold text-gray-600">Claim #:</span>
            <span class="ml-2">{{ claimSummary.claimNumber }}</span>
          </div>
          <div>
            <span class="font-semibold text-gray-600">Status:</span>
            <span class="ml-2 px-2 py-1 bg-green-100 text-green-800 rounded text-xs">{{ claimSummary.status }}</span>
          </div>
          <div>
            <span class="font-semibold text-gray-600">Claimant:</span>
            <span class="ml-2">{{ claimSummary.claimant }}</span>
          </div>
          <div>
            <span class="font-semibold text-gray-600">Injury Date:</span>
            <span class="ml-2">{{ claimSummary.injuryDate }}</span>
          </div>
          <div class="col-span-2">
            <span class="font-semibold text-gray-600">Type:</span>
            <span class="ml-2">{{ claimSummary.type }}</span>
          </div>
        </div>
        
        <div class="mt-4 p-3 bg-blue-50 rounded-lg">
          <p class="text-sm text-gray-700">{{ claimSummary.description }}</p>
        </div>
      </div>
    </template>
  </Card>
</template>

<script>
// Component metadata for AI-driven layout
export const metadata = {
  name: 'ClaimSummaryWidget',
  description: 'Displays a summary of claim information including claimant details, injury date, and claim status',
  roles: ['claims_adjuster', 'manager', 'all'],
  contexts: ['claim', 'dashboard'],
  columnSpan: 1,
  priority: 10
}
</script>
