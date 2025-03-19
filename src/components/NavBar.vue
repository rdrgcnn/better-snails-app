<script setup lang="ts">
import { availableLocales, loadLanguageAsync } from '~/modules/i18n'

const { t, locale } = useI18n()
const menuToggled = ref(false)

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
</script>

<template>
  <nav flex="~ gap-4" :class="menuToggled ? 'flex-col' : 'flex-row'" absolute right-0 top-0 mr-6 mt-6 justify-end text-xl>
    <button icon-btn :title="t('button.toggle_dark')" @click="toggleMenu()">
      <div v-if="menuToggled" i-carbon-close />
      <div
        v-else
        i-carbon-settings
      />
    </button>
    <div v-if="menuToggled" flex="~ gap-4" mt-4 flex-col>
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
