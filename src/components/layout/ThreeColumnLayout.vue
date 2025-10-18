<script setup>
import { computed } from 'vue'

const props = defineProps({
  components: {
    type: Array,
    default: () => []
  },
  userRole: {
    type: String,
    default: 'user'
  },
  context: {
    type: String,
    default: 'dashboard'
  }
})

/**
 * Filter components based on user role and context using AI-like decision logic
 * In a real implementation, this would call an AI service
 */
const filteredComponents = computed(() => {
  return props.components.filter(comp => {
    const metadata = comp.metadata
    
    // Check if component should be shown for this role
    const roleMatch = !metadata.roles || 
                      metadata.roles.length === 0 || 
                      metadata.roles.includes(props.userRole) ||
                      metadata.roles.includes('all')
    
    // Check if component should be shown in this context
    const contextMatch = !metadata.contexts || 
                         metadata.contexts.length === 0 || 
                         metadata.contexts.includes(props.context) ||
                         metadata.contexts.includes('all')
    
    return roleMatch && contextMatch
  })
})

/**
 * Organize components into columns based on their metadata
 * Components can specify column span (1, 2, or 3 columns)
 */
const organizedColumns = computed(() => {
  const columns = { left: [], center: [], right: [] }
  let currentColumn = 'left'
  
  filteredComponents.value.forEach(comp => {
    const metadata = comp.metadata
    const columnSpan = metadata.columnSpan || 1
    
    if (columnSpan === 3) {
      // Full width components go to all columns
      columns.left.push({ ...comp, fullWidth: true })
    } else if (columnSpan === 2) {
      // Two column components
      if (currentColumn === 'left') {
        columns.left.push({ ...comp, twoColumn: true })
        currentColumn = 'right'
      } else {
        columns.center.push({ ...comp, twoColumn: true })
        currentColumn = 'left'
      }
    } else {
      // Single column components - distribute evenly
      if (currentColumn === 'left') {
        columns.left.push(comp)
        currentColumn = 'center'
      } else if (currentColumn === 'center') {
        columns.center.push(comp)
        currentColumn = 'right'
      } else {
        columns.right.push(comp)
        currentColumn = 'left'
      }
    }
  })
  
  return columns
})
</script>

<template>
  <div class="three-column-layout">
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <!-- Left Column -->
      <div class="space-y-4">
        <div
          v-for="(comp, index) in organizedColumns.left"
          :key="`left-${index}`"
          :class="{
            'lg:col-span-3': comp.fullWidth,
            'lg:col-span-2': comp.twoColumn
          }"
        >
          <component :is="comp.component" v-bind="comp.props || {}" />
        </div>
      </div>

      <!-- Center Column -->
      <div class="space-y-4">
        <div
          v-for="(comp, index) in organizedColumns.center"
          :key="`center-${index}`"
          :class="{
            'lg:col-span-3': comp.fullWidth,
            'lg:col-span-2': comp.twoColumn
          }"
        >
          <component :is="comp.component" v-bind="comp.props || {}" />
        </div>
      </div>

      <!-- Right Column -->
      <div class="space-y-4">
        <div
          v-for="(comp, index) in organizedColumns.right"
          :key="`right-${index}`"
          :class="{
            'lg:col-span-3': comp.fullWidth,
            'lg:col-span-2': comp.twoColumn
          }"
        >
          <component :is="comp.component" v-bind="comp.props || {}" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.three-column-layout {
  width: 100%;
}
</style>
