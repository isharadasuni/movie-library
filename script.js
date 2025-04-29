// hamburger toggle event
const navbarScript = Vue.createApp({
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
  navbarScript.mount('#navbarScript');


  //slide show 
  const creativeApp = Vue.createApp({
    data() {
      return {
        slides: [
          { type: 'image', src: 'Assets/Images/HeaderImage.jpg', alt: 'header image' },
          { type: 'video', src: 'Assets/Videos/HeaderVideo.mp4' }
        ],
        currentIndex: 0
      };
    },
    computed: {
      currentSlide() {
        return this.slides[this.currentIndex];
      }
    },
    mounted() {
      this.startLoop();
    },
    methods: {
      async startLoop() {
        while (true) {
          // Show image for a few seconds
          this.currentIndex = 0;
          await this.$nextTick();
          await this.wait(4000); 
  
          // Show video
          this.currentIndex = 1;
          await this.$nextTick();
          await this.wait(9000); 
        }
      },
      wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
    }
  });
  creativeApp.mount('#creativeApp');