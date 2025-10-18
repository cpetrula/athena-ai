<script setup>
import { ref } from 'vue'
import Card from 'primevue/card'
import Badge from 'primevue/badge'

// Mock notifications
const notifications = ref([
  {
    id: 1,
    type: 'urgent',
    icon: 'pi pi-exclamation-circle',
    message: 'Claim #77709 requires immediate attention',
    time: '5 min ago',
    unread: true
  },
  {
    id: 2,
    type: 'info',
    icon: 'pi pi-info-circle',
    message: 'New medical report received for Claim #77707',
    time: '1 hour ago',
    unread: true
  },
  {
    id: 3,
    type: 'success',
    icon: 'pi pi-check-circle',
    message: 'Policy #54678 renewal processed successfully',
    time: '3 hours ago',
    unread: false
  }
])

const unreadCount = ref(notifications.value.filter(n => n.unread).length)
</script>

<template>
  <Card class="shadow-md">
    <template #title>
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <i class="pi pi-bell text-orange-500"></i>
          <span>Notifications</span>
        </div>
        <Badge v-if="unreadCount > 0" :value="unreadCount" severity="danger" />
      </div>
    </template>
    <template #content>
      <div class="space-y-3">
        <div
          v-for="notification in notifications"
          :key="notification.id"
          class="flex items-start gap-3 p-3 rounded-lg transition-colors hover:bg-gray-50"
          :class="{ 'bg-blue-50': notification.unread }"
        >
          <i
            :class="[
              notification.icon,
              {
                'text-red-500': notification.type === 'urgent',
                'text-blue-500': notification.type === 'info',
                'text-green-500': notification.type === 'success'
              }
            ]"
          ></i>
          <div class="flex-1">
            <p class="text-sm text-gray-900" :class="{ 'font-semibold': notification.unread }">
              {{ notification.message }}
            </p>
            <p class="text-xs text-gray-500 mt-1">{{ notification.time }}</p>
          </div>
        </div>
      </div>
    </template>
  </Card>
</template>

<script>
// Component metadata for AI-driven layout
export const metadata = {
  name: 'NotificationsWidget',
  description: 'Displays important notifications and alerts relevant to the user\'s role and current context',
  roles: ['all'],
  contexts: ['dashboard', 'claim', 'policy'],
  columnSpan: 1,
  priority: 7
}
</script>
