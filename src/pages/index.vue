<script setup lang="ts">
defineOptions({
  name: 'IndexPage',
})
// const user = useUserStore()
// const name = ref(user.savedName)

const router = useRouter()
function go() {
  router.push(`/vehicles`)
}

// const { t } = useI18n()
</script>

<template>
  <div>
    Bonjour a tous, here are some trucks :
    <div>
      <button
        m="3 t6" text-sm btn
        @click="go()"
      >
        SEE THAT
      </button>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
