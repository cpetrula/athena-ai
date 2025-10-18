# AI-Driven Component Layout System

## Overview

Athena AI uses an AI-driven component layout system that dynamically determines which components to display and where to place them based on:
- User role
- Current context (dashboard, claim, policy, etc.)
- Component metadata

## Architecture

### Component Metadata

Each widget component exports a metadata object that the AI layout engine uses to make decisions:

```javascript
export const metadata = {
  name: 'ComponentName',              // Unique identifier
  description: 'What this component does',  // AI uses this to understand purpose
  roles: ['role1', 'role2', 'all'],   // Which roles can see this component
  contexts: ['claim', 'dashboard'],   // Where this component makes sense
  columnSpan: 1,                      // 1, 2, or 3 columns
  priority: 10                        // Higher priority = more important
}
```

### Metadata Properties

#### `name` (string)
Unique identifier for the component.

#### `description` (string)
A clear description of what the component does. This helps the AI understand when to show the component.

#### `roles` (array of strings)
List of user roles that should see this component. Use `'all'` for universal access.

Common roles:
- `'claims_adjuster'` - Claims adjusters who process claims
- `'manager'` - Managers with oversight responsibilities
- `'underwriter'` - Policy underwriters
- `'all'` - Available to all users

#### `contexts` (array of strings)
List of contexts where this component is relevant.

Common contexts:
- `'dashboard'` - Main dashboard view
- `'claim'` - Claim detail view
- `'policy'` - Policy detail view
- `'all'` - Show in all contexts

#### `columnSpan` (number: 1, 2, or 3)
How many columns the component should occupy:
- `1` - Single column (default)
- `2` - Two columns (half width on desktop)
- `3` - Full width across all columns

#### `priority` (number)
Higher numbers indicate higher priority. The layout engine can use this to:
- Determine component placement order
- Decide which components to show when space is limited
- Weight AI decisions about component importance

## Three-Column Layout

The `ThreeColumnLayout` component:
1. Filters components based on role and context
2. Organizes filtered components into three columns
3. Respects column span requirements
4. Distributes components evenly for optimal layout

### Layout Rules

- **Full-width components** (columnSpan: 3) are placed spanning all columns
- **Two-column components** (columnSpan: 2) are placed spanning two adjacent columns
- **Single-column components** (columnSpan: 1) are distributed evenly across columns
- Layout is responsive - collapses to single column on mobile devices

## Creating New Components

### Step 1: Create the Component

Create your Vue component in `src/components/widgets/`:

```vue
<script setup>
import { ref } from 'vue'
import Card from 'primevue/card'

const props = defineProps({
  // Your props
})

// Your component logic
</script>

<template>
  <Card class="shadow-md">
    <template #title>
      <!-- Title with icon -->
    </template>
    <template #content>
      <!-- Your content -->
    </template>
  </Card>
</template>

<script>
// Export metadata for AI layout engine
export const metadata = {
  name: 'YourComponentName',
  description: 'Clear description of what this component does',
  roles: ['role1', 'role2'],
  contexts: ['context1', 'context2'],
  columnSpan: 1,
  priority: 5
}
</script>
```

### Step 2: Add to a View

In your view component (e.g., `DashboardView.vue`):

```javascript
import YourComponent from '../components/widgets/YourComponent.vue'
import { metadata as yourComponentMeta } from '../components/widgets/YourComponent.vue'

const components = ref([
  // ... other components
  {
    component: markRaw(YourComponent),
    metadata: yourComponentMeta,
    props: {
      // Props for your component
    }
  }
])
```

## Routing

The application uses Vue Router with dynamic routes:

- `/` - Dashboard view
- `/claim/:id` - Claim detail view (e.g., `/claim/77707`)
- `/policy/:id` - Policy detail view (e.g., `/policy/54678`)

### Adding New Routes

Edit `src/router/index.js`:

```javascript
{
  path: '/your-path/:id',
  name: 'your-route',
  component: YourView,
  meta: {
    title: 'Your Title',
    context: 'your-context'
  }
}
```

## Future AI Integration

The current implementation uses rule-based logic to filter and organize components. Future enhancements will include:

1. **AI-Powered Component Selection**
   - Machine learning models to predict which components are most relevant
   - Context-aware recommendations based on user behavior
   - Adaptive layouts that learn user preferences

2. **Natural Language Component Discovery**
   - Use component descriptions for semantic search
   - AI agents that can understand and fulfill complex requests
   - Dynamic component generation based on user needs

3. **Intelligent Prioritization**
   - Real-time priority adjustments based on urgency
   - Predictive analytics to surface important information
   - Context-aware notifications and alerts

4. **Personalization**
   - Learn individual user preferences
   - Customize layouts per user
   - Suggest optimal component arrangements

## Example Components

### ClaimSummaryWidget
- **Context**: Claim view
- **Roles**: Claims adjusters, managers
- **Column Span**: 1
- **Purpose**: Shows key claim information

### ClaimTimelineWidget
- **Context**: Claim view
- **Roles**: Claims adjusters, managers
- **Column Span**: 2
- **Purpose**: Displays chronological claim events

### AIInsightsWidget
- **Context**: All contexts
- **Roles**: All users
- **Column Span**: 1
- **Purpose**: AI-generated insights and recommendations

### NotificationsWidget
- **Context**: All contexts
- **Roles**: All users
- **Column Span**: 1
- **Purpose**: Important notifications and alerts

### PolicyListWidget
- **Context**: Dashboard, Policy view
- **Roles**: Managers, underwriters
- **Column Span**: 3
- **Purpose**: Table of recent policies

## Best Practices

1. **Keep metadata accurate** - The AI relies on accurate metadata to make good decisions
2. **Write clear descriptions** - Help the AI understand component purpose
3. **Use appropriate column spans** - Consider information density and user needs
4. **Set meaningful priorities** - Help the AI prioritize important information
5. **Test across roles and contexts** - Verify components appear correctly
6. **Follow design patterns** - Use PrimeVue components and Tailwind CSS consistently
