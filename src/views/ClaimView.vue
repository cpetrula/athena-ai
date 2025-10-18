<script setup>
import { ref, computed, markRaw } from 'vue'
import { useRoute } from 'vue-router'
import ThreeColumnLayout from '../components/layout/ThreeColumnLayout.vue'
import ClaimSummaryWidget from '../components/widgets/ClaimSummaryWidget.vue'
import ClaimTimelineWidget from '../components/widgets/ClaimTimelineWidget.vue'
import AIInsightsWidget from '../components/widgets/AIInsightsWidget.vue'
import NotificationsWidget from '../components/widgets/NotificationsWidget.vue'

// Import metadata from widgets
import { metadata as claimSummaryMeta } from '../components/widgets/ClaimSummaryWidget.vue'
import { metadata as claimTimelineMeta } from '../components/widgets/ClaimTimelineWidget.vue'
import { metadata as aiInsightsMeta } from '../components/widgets/AIInsightsWidget.vue'
import { metadata as notificationsMeta } from '../components/widgets/NotificationsWidget.vue'

const route = useRoute()
const claimId = computed(() => route.params.id)

// Current user role (in real app, this would come from auth service)
const userRole = ref('claims_adjuster')
const context = ref('claim')

// Define components with their metadata for the AI layout engine
const components = ref([
  {
    component: markRaw(ClaimSummaryWidget),
    metadata: claimSummaryMeta,
    props: { claimId: claimId.value }
  },
  {
    component: markRaw(AIInsightsWidget),
    metadata: aiInsightsMeta,
    props: {}
  },
  {
    component: markRaw(ClaimTimelineWidget),
    metadata: claimTimelineMeta,
    props: { claimId: claimId.value }
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
      <h1 class="text-3xl font-bold text-gray-900">Claim #{{ claimId }}</h1>
      <p class="text-gray-600 mt-2">View and manage claim details, timeline, and related information.</p>
    </div>
    
    <ThreeColumnLayout
      :components="components"
      :user-role="userRole"
      :context="context"
    />
  </div>
</template>
