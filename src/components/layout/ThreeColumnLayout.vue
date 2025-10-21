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
 * Organize components into a flat array with span information
 * Components can specify column span (1, 2, or 3 columns)
 */
 const organizedComponents = computed(() => {
  const rows = [];
  let currentRow = [];
  let remainingSpan = 3;

  filteredComponents.value.forEach(comp => {
    const metadata = comp.metadata;
    const columnSpan = metadata.columnSpan || 1;

    if (columnSpan > remainingSpan) {
      // Start a new row if the current component doesn't fit
      rows.push(currentRow);
      currentRow = [];
      remainingSpan = 3;
    }

    currentRow.push({ ...comp, span: columnSpan });
    remainingSpan -= columnSpan;

    if (remainingSpan === 0) {
      // Push the row if it's full
      rows.push(currentRow);
      currentRow = [];
      remainingSpan = 3;
    }
  });

  // Push the last row if it has any components
  if (currentRow.length > 0) {
    rows.push(currentRow);
  }

  console.log('Organized Components:', rows);

  return rows;
});
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
