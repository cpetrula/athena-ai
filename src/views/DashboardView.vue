<script setup>
import { ref, markRaw } from 'vue'
import ThreeColumnLayout from '../components/layout/ThreeColumnLayout.vue'
import ClaimSummaryWidget from '../components/widgets/ClaimSummaryWidget.vue'
import AIInsightsWidget from '../components/widgets/AIInsightsWidget.vue'
import NotificationsWidget from '../components/widgets/NotificationsWidget.vue'
import PolicyListWidget from '../components/widgets/PolicyListWidget.vue'
import OpenAIChat from '../components/widgets/OpenAIChat.vue'

// Import metadata from widgets
import { metadata as claimSummaryMeta } from '../components/widgets/ClaimSummaryWidget.vue'
import { metadata as aiInsightsMeta } from '../components/widgets/AIInsightsWidget.vue'
import { metadata as notificationsMeta } from '../components/widgets/NotificationsWidget.vue'
import { metadata as policyListMeta } from '../components/widgets/PolicyListWidget.vue'
import { metadata as openAIChatMeta } from '../components/widgets/OpenAIChat.vue'

// Current user role (in real app, this would come from auth service)
const userRole = ref('claims_adjuster')
const context = ref('dashboard')

// Define components with their metadata for the AI layout engine
const components = ref([
  {
    component: markRaw(NotificationsWidget),
    metadata: notificationsMeta,
    props: {}
  },
  {
    component: markRaw(AIInsightsWidget),
    metadata: aiInsightsMeta,
    props: {}
  },
  {
    component: markRaw(ClaimSummaryWidget),
    metadata: claimSummaryMeta,
    props: {}
  },
  {
    component: markRaw(PolicyListWidget),
    metadata: policyListMeta,
    props: {}
  },
  {
    component: markRaw(OpenAIChat),
    metadata: openAIChatMeta,
    props: {}
  }

])
</script>

<template>
  <div class="container mx-auto px-4 py-6">
     
    <ThreeColumnLayout
      :components="components"
      :user-role="userRole"
      :context="context"
    />
  </div>
</template>
