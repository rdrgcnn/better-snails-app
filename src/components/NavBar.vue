<script setup lang="ts">
import { availableLocales, loadLanguageAsync } from '~/modules/i18n'

const router = useRouter()
const { t, locale } = useI18n()
const menuToggled = ref(false)
const routes = ref(router.currentRoute.value.fullPath.split('/'))

watchEffect(() => {
  routes.value = router.currentRoute.value.fullPath.split('/')
})

async function toggleLocales() {
  // change to some real logic
  const locales = availableLocales
  const newLocale = locales[(locales.indexOf(locale.value) + 1) % locales.length]
  await loadLanguageAsync(newLocale)
  locale.value = newLocale
}

function toggleMenu() {
  menuToggled.value = !menuToggled.value
}

function handleBack() {
  routes.value.pop()
  if (routes.value.length === 1) {
    router.push('/')
    return
  }
  router.push(routes.value.join('/'))
}
</script>

<template>
  <nav flex="~ gap-4" justify-between p-4 text-xl>
    <button v-if="router.currentRoute.value.fullPath !== '/'" icon-btn :title="t('button.back')" @click="handleBack()">
      <div
        i-carbon-arrow-left
      />
    </button>
    <h2>Better Snails</h2>
    <button icon-btn class="right" :title="t('button.toggle_dark')" @click="toggleMenu()">
      <div v-if="menuToggled" i-carbon-close />
      <div
        v-else
        i-carbon-settings
      />
    </button>
    <div v-if="menuToggled" class="menu" flex="~ gap-4" absolute right-4 mt-6 flex-col rounded bg-white p-4 shadow-lg dark:bg-gray-800>
      <button icon-btn :title="t('button.home')" @click="toggleDark()">
        <div
          i="carbon-sun dark:carbon-moon"
        />
      </button>
      <button icon-btn :title="t('button.toggle_langs')" @click="toggleLocales()">
        <div
          i-carbon-globe
        />
      </button>
    </div>
  </nav>
</template>

<style scoped>
</style>
