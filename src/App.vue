<template>
  <div class="app" :class="(lightMode) ? '' : 'dark-mode'">
    <MenuBar />
    <main>
      <RouterView />
    </main>
  </div>
</template>

<script>
import MenuBar from './components/UI/MenuBar.vue';
export default {
  components: {
    MenuBar
  },
  computed: {
    lightMode() {
      return this.$store.getters['getLightModeToggle'];
    }
  },
  methods: {
    toggleIsMobile() {
      if (window.innerWidth < 768) {
        this.$store.commit('toggleIsMobile', true);
      }
      else {
        this.$store.commit('toggleIsMobile', false);
      }
    }
  },
  beforeCreate() {
    this.$store.dispatch('getInvoices');
  },
  async created() {
    this.toggleIsMobile();
  },
  mounted() {
    window.addEventListener('resize', this.toggleIsMobile);
  },
  beforeUnmounted() {
    window.removeEventListener('resize', this.toggleIsMobile);
  }
}
</script>

<style lang="scss">
@font-face {
  font-family: "Spartan";
  src: url("@/assets/fonts/SpartanMB-Regular.otf");
  font-weight: 500;
  font-style: normal;
}

@font-face {
  font-family: "Spartan";
  src: url("@/assets/fonts/SpartanMB-Bold.otf");
  font-weight: 700;
  font-style: normal;
}

* {
  margin: 0;
  padding: 0;
  font-family: "Spartan", sans-serif, Arial;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

:root {
  --background-color-primary: #f2f2f2;
  --background-second-color: #FFF;
  --main-font-color: #0C0E16;
  --grey-font-color: #888EB0;
  --invoice-detail-font-color: #7E88C3;
  --invoice-detail-items-background: #F9FAFE;
  --invoice-detail-total-background: #373B53;
  --input-border-color: #DFE3FA;
  --input-background-color: transparent;
  --date-picker-background-color: #FFF;
  --form-scrollbar-thumb: #DFE3FA;
}

.dark-mode {
  --background-color-primary: #141625;
  --background-second-color: #1E2139;
  --main-font-color: #fff;
  --grey-font-color: #DFE3FA;
  --invoice-detail-font-color: #DFE3FA;
  --invoice-detail-items-background: #252945;
  --invoice-detail-total-background: #0C0E16;
  --input-border-color: #252945;
  --input-background-color: #1E2139;
  --date-picker-background-color: #252945;
  --form-scrollbar-thumb: #252945;
}

input,
button,
textarea,
select {
  font: inherit;
}

.app {
  display: flex;
  background-color: var(--background-color-primary);
  height: 100%;
}

main {
  width: 730px;
  margin: 0 auto;
}

h1 {
  font-size: 32px;
  font-weight: 700;
  line-height: 35.84px;
  letter-spacing: -1px;
  color: var(--main-font-color);
}

h2 {
  font-size: 20px;
  font-weight: 700;
  line-height: 22.4px;
  letter-spacing: -0.63px;
}

h3 {
  font-size: 18px;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: -0.8px;
}

h4 {
  font-size: 12px;
  font-weight: 700;
  line-height: 15px;
  letter-spacing: -0.25px;
}

button {
  cursor: pointer;
  border-radius: 24px;
  border: 0;
  height: 48px;
  line-height: 15px;
  letter-spacing: -0.25px;
  font-weight: 700;
  padding: 0 24px;
}

input {
  height: 48px;
  border: 1px solid var(--input-border-color);
  border-radius: 4px;
  padding: 0 16px 0 20px;
  font-weight: 700;
  background-color: var(--input-background-color);
  color: var(--main-font-color);
}

@media screen and (max-width: 1024px) {
  .app {
    flex-direction: column;
  }

  main {
    width: unset;
    margin: unset;
  }
}
</style>
