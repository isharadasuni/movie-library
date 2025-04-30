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


//movie
const { createApp } = Vue;
createApp({
  data() {
    return {
      query: '',
      searchResults: [],
      selectedGrid: [],
      dropdownVisible: false
    };
  },
  methods: {
    async searchShows() {
      if (this.query.length < 2) {
        this.searchResults = [];
        this.dropdownVisible = false;
        return;
      }

      try {
        const response = await fetch(`https://api.tvmaze.com/search/shows?q=${encodeURIComponent(this.query)}`);
        const data = await response.json();
        this.searchResults = data.map(item => item.show);
        this.dropdownVisible = true;
      } catch (error) {
        console.error('TVmaze API error:', error);
        this.searchResults = [];
        this.dropdownVisible = false;
      }
    },
    addToSelected(show) {
      const alreadyAdded = this.selectedGrid.some(s => s.id === show.id);
      if (!alreadyAdded) {
        this.selectedGrid.push(show);
      }
      this.query = '';
      this.searchResults = [];
      this.dropdownVisible = false;
    },
    removeFromGrid(index) {
      this.selectedGrid.splice(index, 1);
    },
    hideDropdown() {
      this.dropdownVisible = false;
    }
  },
  directives: {
    outside: {
      mounted(el, binding) {
        el.clickOutsideEvent = function (event) {
          if (!(el === event.target || el.contains(event.target))) {
            binding.value(event);
          }
        };
        document.body.addEventListener("click", el.clickOutsideEvent);
      },
      unmounted(el) {
        document.body.removeEventListener("click", el.clickOutsideEvent);
      }
    }
  }
}).mount('#app');






