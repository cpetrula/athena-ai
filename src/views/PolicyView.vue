<script setup>
import { ref, computed, markRaw } from 'vue'
import { useRoute } from 'vue-router'
import ThreeColumnLayout from '../components/layout/ThreeColumnLayout.vue'
import PolicyDetailsWidget from '../components/widgets/PolicyDetailsWidget.vue'
import AIInsightsWidget from '../components/widgets/AIInsightsWidget.vue'
import NotificationsWidget from '../components/widgets/NotificationsWidget.vue'

// Import metadata from widgets
import { metadata as policyDetailsMeta } from '../components/widgets/PolicyDetailsWidget.vue'
import { metadata as aiInsightsMeta } from '../components/widgets/AIInsightsWidget.vue'
import { metadata as notificationsMeta } from '../components/widgets/NotificationsWidget.vue'

const route = useRoute()
const policyId = computed(() => route.params.id)

// Current user role (in real app, this would come from auth service)
const userRole = ref('underwriter')
const context = ref('policy')

// Mock policy data
const policyDetails = ref({
  policyNumber: policyId.value,
  insured: 'ABC Manufacturing Co.',
  effectiveDate: '2024-01-01',
  expirationDate: '2024-12-31',
  status: 'Active',
  premium: '$15,000',
  coverageType: 'Workers Compensation',
  employeeCount: 150,
  payroll: '$7,500,000'
})

// Define components with their metadata for the AI layout engine
const components = ref([
  {
    component: markRaw(PolicyDetailsWidget),
    metadata: policyDetailsMeta,
    props: policyDetails.value
  },
  {
    component: markRaw(AIInsightsWidget),
    metadata: aiInsightsMeta,
    props: {}
  },
  {
    component: markRaw(NotificationsWidget),
    metadata: notificationsMeta,
    props: {}
  }
])
</script>

<template>
  <div class="container mx-auto px-4 py-6">
    <div class="mb-6">
      <h1 class="text-3xl font-bold text-gray-900">Policy #{{ policyId }}</h1>
      <p class="text-gray-600 mt-2">View and manage policy information and coverage details.</p>
    </div>
    
    <ThreeColumnLayout
      :components="components"
      :user-role="userRole"
      :context="context"
    />
  </div>
</template>
