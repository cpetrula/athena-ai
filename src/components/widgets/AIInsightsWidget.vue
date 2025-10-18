<script setup>
import { ref } from 'vue'
import Card from 'primevue/card'
import Message from 'primevue/message'

// Mock AI insights
const insights = ref([
  {
    type: 'info',
    icon: 'pi pi-info-circle',
    title: 'Similar Claims Pattern',
    message: 'This claim shares similarities with 3 other claims from the same location in the past 6 months.'
  },
  {
    type: 'warn',
    icon: 'pi pi-exclamation-triangle',
    title: 'Attention Required',
    message: 'Medical documentation is pending. Follow-up recommended within 48 hours.'
  },
  {
    type: 'success',
    icon: 'pi pi-check',
    title: 'Cost Projection',
    message: 'Based on similar cases, estimated total cost: $2,500 - $3,200'
  }
])
</script>

<template>
  <Card class="shadow-md">
    <template #title>
      <div class="flex items-center gap-2">
        <i class="pi pi-sparkles text-yellow-500"></i>
        <span>AI Insights</span>
      </div>
    </template>
    <template #content>
      <div class="space-y-3">
        <Message
          v-for="(insight, index) in insights"
          :key="index"
          :severity="insight.type"
          :closable="false"
        >
          <div class="flex flex-col gap-1">
            <span class="font-semibold text-sm">{{ insight.title }}</span>
            <span class="text-sm">{{ insight.message }}</span>
          </div>
        </Message>
      </div>
    </template>
  </Card>
</template>

<script>
// Component metadata for AI-driven layout
export const metadata = {
  name: 'AIInsightsWidget',
  description: 'Displays AI-generated insights, recommendations, and contextual awareness for the current view',
  roles: ['claims_adjuster', 'manager', 'all'],
  contexts: ['claim', 'policy', 'dashboard'],
  columnSpan: 1,
  priority: 9
}
</script>
