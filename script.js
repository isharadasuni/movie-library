// hamburger toggle event
const app = Vue.createApp({
    data() {
      return {
        menuVisible: false,
        isMobile: false,
        isTablet: false,
        isDesktop: true
      };
    },
    methods: {
      toggleMenu() {
        this.menuVisible = !this.menuVisible;
      },
      checkScreenSize() {
        const width = window.innerWidth;
        this.isMobile = width <= 768;
        this.isTablet = width > 768 && width <= 1024;
        this.isDesktop = width > 1024;
      }
    },
    mounted() {
      this.checkScreenSize();
      window.addEventListener('resize', this.checkScreenSize);
    },
    beforeUnmount() {
      window.removeEventListener('resize', this.checkScreenSize);
    }
  });
  app.mount('#navbar-script');