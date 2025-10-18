<script setup>
import { computed } from 'vue'
import Card from 'primevue/card'

const props = defineProps({
  policyNumber: {
    type: String,
    required: true
  },
  insured: {
    type: String,
    default: 'ABC Manufacturing Co.'
  },
  effectiveDate: {
    type: String,
    default: '2024-01-01'
  },
  expirationDate: {
    type: String,
    default: '2024-12-31'
  },
  status: {
    type: String,
    default: 'Active'
  },
  premium: {
    type: String,
    default: '$15,000'
  },
  coverageType: {
    type: String,
    default: 'Workers Compensation'
  },
  employeeCount: {
    type: Number,
    default: 150
  },
  payroll: {
    type: String,
    default: '$7,500,000'
  }
})

const statusClass = computed(() => {
  return props.status === 'Active' 
    ? 'px-3 py-1 bg-green-100 text-green-800 rounded text-sm font-semibold'
    : 'px-3 py-1 bg-yellow-100 text-yellow-800 rounded text-sm font-semibold'
})
</script>

<template>
  <Card class="shadow-md">
    <template #title>
      <div class="flex items-center gap-2">
        <i class="pi pi-briefcase text-green-500"></i>
        <span>Policy Details</span>
      </div>
    </template>
    <template #content>
      <div class="space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <span class="text-sm font-semibold text-gray-600">Policy Number:</span>
            <p class="text-lg font-bold text-gray-900">{{ policyNumber }}</p>
          </div>
          <div>
            <span class="text-sm font-semibold text-gray-600">Status:</span>
            <p class="mt-1">
              <span :class="statusClass">{{ status }}</span>
            </p>
          </div>
          <div>
            <span class="text-sm font-semibold text-gray-600">Insured:</span>
            <p class="text-gray-900">{{ insured }}</p>
          </div>
          <div>
            <span class="text-sm font-semibold text-gray-600">Coverage Type:</span>
            <p class="text-gray-900">{{ coverageType }}</p>
          </div>
          <div>
            <span class="text-sm font-semibold text-gray-600">Effective Date:</span>
            <p class="text-gray-900">{{ effectiveDate }}</p>
          </div>
          <div>
            <span class="text-sm font-semibold text-gray-600">Expiration Date:</span>
            <p class="text-gray-900">{{ expirationDate }}</p>
          </div>
          <div>
            <span class="text-sm font-semibold text-gray-600">Premium:</span>
            <p class="text-lg font-bold text-blue-600">{{ premium }}</p>
          </div>
          <div>
            <span class="text-sm font-semibold text-gray-600">Employee Count:</span>
            <p class="text-gray-900">{{ employeeCount }}</p>
          </div>
          <div class="col-span-2">
            <span class="text-sm font-semibold text-gray-600">Annual Payroll:</span>
            <p class="text-gray-900">{{ payroll }}</p>
          </div>
        </div>
      </div>
    </template>
  </Card>
</template>

<script>
// Component metadata for AI-driven layout
export const metadata = {
  name: 'PolicyDetailsWidget',
  description: 'Displays detailed information about a workers compensation policy including insured, coverage, and premium details',
  roles: ['underwriter', 'manager', 'all'],
  contexts: ['policy'],
  columnSpan: 2,
  priority: 10
}
</script>
