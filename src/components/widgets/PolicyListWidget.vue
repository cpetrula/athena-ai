<script setup>
import { ref } from 'vue'
import Card from 'primevue/card'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import { useRouter } from 'vue-router'

const router = useRouter()

// Mock policy data
const policies = ref([
  {
    policyNumber: '54678',
    insured: 'ABC Manufacturing Co.',
    effectiveDate: '2024-01-01',
    expirationDate: '2024-12-31',
    status: 'Active',
    premium: '$15,000'
  },
  {
    policyNumber: '54679',
    insured: 'XYZ Construction Inc.',
    effectiveDate: '2024-02-15',
    expirationDate: '2025-02-14',
    status: 'Active',
    premium: '$22,500'
  },
  {
    policyNumber: '54680',
    insured: 'Tech Solutions LLC',
    effectiveDate: '2023-11-01',
    expirationDate: '2024-10-31',
    status: 'Expiring Soon',
    premium: '$8,750'
  }
])

const viewPolicy = (policyNumber) => {
  router.push(`/policy/${policyNumber}`)
}
</script>

<template>
  <Card class="shadow-md">
    <template #title>
      <div class="flex items-center gap-2">
        <i class="pi pi-briefcase text-green-500"></i>
        <span>Recent Policies</span>
      </div>
    </template>
    <template #content>
      <DataTable :value="policies" stripedRows>
        <Column field="policyNumber" header="Policy #" sortable>
          <template #body="slotProps">
            <span class="text-blue-600 cursor-pointer hover:underline" @click="viewPolicy(slotProps.data.policyNumber)">
              {{ slotProps.data.policyNumber }}
            </span>
          </template>
        </Column>
        <Column field="insured" header="Insured" sortable></Column>
        <Column field="status" header="Status" sortable>
          <template #body="slotProps">
            <span
              class="px-2 py-1 rounded text-xs font-semibold"
              :class="{
                'bg-green-100 text-green-800': slotProps.data.status === 'Active',
                'bg-yellow-100 text-yellow-800': slotProps.data.status === 'Expiring Soon'
              }"
            >
              {{ slotProps.data.status }}
            </span>
          </template>
        </Column>
        <Column field="premium" header="Premium" sortable></Column>
        <Column header="Actions">
          <template #body="slotProps">
            <Button
              icon="pi pi-eye"
              size="small"
              text
              rounded
              @click="viewPolicy(slotProps.data.policyNumber)"
              aria-label="View policy"
            />
          </template>
        </Column>
      </DataTable>
    </template>
  </Card>
</template>

<script>
// Component metadata for AI-driven layout
export const metadata = {
  name: 'PolicyListWidget',
  description: 'Displays a list of recent policies with their status and key information',
  roles: ['manager', 'underwriter', 'all'],
  contexts: ['dashboard', 'policy'],
  columnSpan: 3,
  priority: 6
}
</script>
