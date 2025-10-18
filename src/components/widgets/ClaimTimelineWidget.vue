<script setup>
import { ref } from 'vue'
import Card from 'primevue/card'
import Timeline from 'primevue/timeline'

defineProps({
  claimId: {
    type: String,
    default: null
  }
})

// Mock timeline data
const events = ref([
  {
    date: '2024-01-15',
    status: 'Claim Filed',
    icon: 'pi pi-file',
    color: 'blue',
    description: 'Initial claim submitted by employee'
  },
  {
    date: '2024-01-16',
    status: 'Medical Treatment',
    icon: 'pi pi-heart',
    color: 'green',
    description: 'First medical appointment at clinic'
  },
  {
    date: '2024-01-20',
    status: 'Investigation Started',
    icon: 'pi pi-search',
    color: 'orange',
    description: 'Claims adjuster assigned and investigation begun'
  },
  {
    date: '2024-01-25',
    status: 'Documentation Received',
    icon: 'pi pi-check-circle',
    color: 'green',
    description: 'Medical records and incident report received'
  }
])
</script>

<template>
  <Card class="shadow-md">
    <template #title>
      <div class="flex items-center gap-2">
        <i class="pi pi-clock text-purple-500"></i>
        <span>Claim Timeline</span>
      </div>
    </template>
    <template #content>
      <Timeline :value="events" class="customized-timeline">
        <template #marker="slotProps">
          <span
            class="flex items-center justify-center w-8 h-8 rounded-full shadow-sm"
            :class="`bg-${slotProps.item.color}-100`"
          >
            <i :class="slotProps.item.icon" :style="`color: var(--${slotProps.item.color}-500)`"></i>
          </span>
        </template>
        <template #content="slotProps">
          <div class="ml-3">
            <div class="text-sm font-semibold text-gray-900">{{ slotProps.item.status }}</div>
            <div class="text-xs text-gray-500 mt-1">{{ slotProps.item.date }}</div>
            <div class="text-sm text-gray-600 mt-2">{{ slotProps.item.description }}</div>
          </div>
        </template>
      </Timeline>
    </template>
  </Card>
</template>

<script>
// Component metadata for AI-driven layout
export const metadata = {
  name: 'ClaimTimelineWidget',
  description: 'Displays a chronological timeline of events and activities related to a claim',
  roles: ['claims_adjuster', 'manager', 'all'],
  contexts: ['claim'],
  columnSpan: 2,
  priority: 8
}
</script>

<style scoped>
:deep(.customized-timeline .p-timeline-event-content) {
  padding-bottom: 1rem;
}
</style>
