<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Menu from 'primevue/menu'

const route = useRoute()
const searchQuery = ref('')
const userMenu = ref()

// Mock user data - in real app, this would come from auth service
const currentUser = ref({
  name: 'John Doe',
  role: 'Claims Adjuster',
  email: 'john.doe@example.com'
})

// Context-aware information based on current route
const contextInfo = computed(() => {
  const context = route.meta.context
  const id = route.params.id
  
  if (context === 'claim' && id) {
    return `Claim #${id}`
  } else if (context === 'policy' && id) {
    return `Policy #${id}`
  } else if (context === 'dashboard') {
    return 'Dashboard'
  }
  return ''
})

const userMenuItems = ref([
  {
    label: 'Profile',
    icon: 'pi pi-user',
    command: () => {
      console.log('Navigate to profile')
    }
  },
  {
    label: 'Preferences',
    icon: 'pi pi-cog',
    command: () => {
      console.log('Navigate to preferences')
    }
  },
  {
    separator: true
  },
  {
    label: 'Logout',
    icon: 'pi pi-sign-out',
    command: () => {
      console.log('Logout user')
    }
  }
])

const toggleUserMenu = (event) => {
  userMenu.value.toggle(event)
}

const handleSearch = () => {
  console.log('Search for:', searchQuery.value)
  // In real app, implement global search functionality
}
</script>

<template>
  <header class="bg-white border-b border-gray-200 shadow-sm">
    <div class="container mx-auto px-4 py-3">
      <div class="flex items-center justify-between gap-4">
        <!-- Logo and Context Info -->
        <div class="flex items-center gap-6">
          <router-link to="/" class="flex items-center gap-2 text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
            <i class="pi pi-shield text-blue-600"></i>
            <span>Athena AI</span>
          </router-link>
          
          <div v-if="contextInfo" class="hidden md:flex items-center gap-2 text-gray-600">
            <i class="pi pi-angle-right"></i>
            <span class="font-medium">{{ contextInfo }}</span>
          </div>
        </div>

        <!-- Global Search Bar -->
        <div class="flex-1 max-w-md">
          <div class="relative">
            <span class="absolute left-3 top-1/2 -translate-y-1/2">
              <i class="pi pi-search text-gray-400"></i>
            </span>
            <InputText
              v-model="searchQuery"
              placeholder="Search claims, policies, or anything..."
              class="w-full pl-10"
              @keyup.enter="handleSearch"
            />
          </div>
        </div>

        <!-- User Menu -->
        <div class="flex items-center gap-3">
          <div class="hidden lg:block text-right">
            <div class="text-sm font-medium text-gray-900">{{ currentUser.name }}</div>
            <div class="text-xs text-gray-500">{{ currentUser.role }}</div>
          </div>
          
          <Button
            type="button"
            icon="pi pi-user"
            rounded
            text
            severity="secondary"
            @click="toggleUserMenu"
            aria-label="User menu"
          />
          <Menu ref="userMenu" :model="userMenuItems" popup />
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
/* Additional header styles if needed */
</style>
