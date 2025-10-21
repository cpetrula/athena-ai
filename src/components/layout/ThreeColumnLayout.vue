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
 * Organize components into rows with optimal column filling
 * Uses a bin-packing approach to minimize wasted space while respecting priority
 */
const organizedComponents = computed(() => {
  // Create a copy of components with their spans
  const components = filteredComponents.value.map(comp => ({
    ...comp,
    span: comp.metadata.columnSpan || 1,
    priority: comp.metadata.priority || 0
  }))

  // Sort by priority (higher first)
  const sortedComponents = [...components].sort((a, b) => {
    return b.priority - a.priority
  })

  const rows = []
  const used = new Set()

  // Helper to find components that fit in remaining space
  const findComponentsToFill = (startIdx, remainingSpan, usedSet) => {
    const rowIndices = [startIdx]
    let currentRemaining = remainingSpan - sortedComponents[startIdx].span
    const rowUsed = new Set([...usedSet, startIdx])

    while (currentRemaining > 0) {
      let bestIdx = -1
      let bestPriority = -1

      // Find highest priority component that fits
      for (let i = 0; i < sortedComponents.length; i++) {
        if (rowUsed.has(i)) continue
        const comp = sortedComponents[i]
        
        if (comp.span <= currentRemaining && comp.priority > bestPriority) {
          bestIdx = i
          bestPriority = comp.priority
        }
      }

      if (bestIdx !== -1) {
        rowIndices.push(bestIdx)
        rowUsed.add(bestIdx)
        currentRemaining -= sortedComponents[bestIdx].span
      } else {
        break
      }
    }

    return { indices: rowIndices, waste: currentRemaining }
  }

  // Pack components into rows
  while (used.size < sortedComponents.length) {
    let bestConfiguration = null
    let bestWaste = 4

    // Try each unused component as a starting point
    for (let i = 0; i < sortedComponents.length; i++) {
      if (used.has(i)) continue

      const config = findComponentsToFill(i, 3, used)
      
      // Prefer configuration with less waste
      // If same waste, prefer one that starts with higher priority
      if (config.waste < bestWaste ||
          (config.waste === bestWaste && sortedComponents[i].priority > sortedComponents[bestConfiguration.indices[0]].priority)) {
        bestConfiguration = config
        bestWaste = config.waste
      }

      // Perfect fit found, use it
      if (bestWaste === 0) break
    }

    if (bestConfiguration) {
      const currentRow = bestConfiguration.indices.map(idx => {
        used.add(idx)
        return sortedComponents[idx]
      })
      rows.push(currentRow)
    }
  }

  console.log('Organized Components:', rows)

  return rows
})
</script>

<template>
  <div class="three-column-layout">
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <template v-for="(row, rowIndex) in organizedComponents" :key="`row-${rowIndex}`">
        <div
          v-for="(comp, index) in row"
          :key="`comp-${rowIndex}-${index}`"
          :class="{
            'lg:col-span-1': comp.span === 1,
            'lg:col-span-2': comp.span === 2,
            'lg:col-span-3': comp.span === 3
          }"
        >
          <!-- Render component content here -->
          <component :is="comp.component" v-bind="comp.props" />
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
.three-column-layout {
  width: 100%;
}
</style>
