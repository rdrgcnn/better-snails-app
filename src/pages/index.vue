<script setup lang="ts">
defineOptions({
  name: 'IndexPage',
})

const router = useRouter()
function go() {
  router.push(`/vehicles`)
}

const { t } = useI18n()
</script>

<template>
  <div>
    {{ t('intro.title') }}
    <div>
      <button
        m="3 t6" text-sm btn
        @click="go()"
      >
        {{ t('intro.search') }}
      </button>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
