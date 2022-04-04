<template>
  <div>
    <NavbarMarketPlace v-if="isMarketplace" />
    <Navbar v-else @connected="connectedHandler" />
    <transition name="fade">
      <div
        id="pagetop"
        class="fixed right-0 bottom-0"
        v-show="scY > 300"
        @click="toTop"
        style="z-index: 10; padding: 10px"
      >
        <svg
          width="60"
          height="60"
          viewBox="0 0 60 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="30" cy="30" r="30" fill="#4804D9" />
          <path d="M30 20L43.8564 35H16.1436L30 20Z" fill="white" />
        </svg>
      </div>
    </transition>
    <router-view />
  </div>
</template>

<script>
import Navbar from "./views/websitev2/navbar.vue";
import NavbarMarketPlace from "./views/websitev2/NavbarMarketPlace.vue";

export default {
  methods: {
    connectedHandler() {
      // window.location.href = "?";
      console.log("connected");
    },
    handleScroll: function () {
      if (this.scTimer) return;
      this.scTimer = setTimeout(() => {
        this.scY = window.scrollY;
        clearTimeout(this.scTimer);
        this.scTimer = 0;
      }, 100);
    },
    toTop: function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
    toggleBar: function () {
      this.toggle = !this.toggle;
    },
  },
  name: "App",
  components: {
    Navbar,
    NavbarMarketPlace,
  },
  data() {
    return {
      pathname: "",
      scTimer: 0,
      scY: 0,
      color: "#E0FB16",
      position: "right",
      toggle: true,
    };
  },
  watch: {},
  computed: {
    isMarketplace() {
      return (
        window.location.pathname === "/" ||
        window.location.pathname === "/token" ||
        window.location.pathname === "/my-collection" ||
        window.location.pathname === "/my-favorite" ||
        window.location.pathname === "/user-profile" ||
        window.location.pathname === "/claim-binance" ||
        window.location.pathname.includes("/items")
      );
    },
    isLanding() {
      return window.location.pathname === "/";
    },
  },
  mounted() {
    this.pathname = window.location.pathname;
    window.addEventListener("scroll", this.handleScroll);
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.text-xl {
  font-size: 1.25rem !important;
}
.text-lg,
.text-xl {
  line-height: 1.75rem !important;
}
.maxWidth10 {
  max-width: 10rem;
}
.router-back:hover {
  color: #fff;
  text-decoration: none;
}
.color-pink {
  color: #d668b5;
}
.color-green {
  color: #96ec6e;
}
.color-blue {
  color: #84daff;
}
.color-orange {
  color: #fbbb16;
}
.color-yellow {
  color: #fff500 !important;
}
.color-purple {
  color: #bf9eff;
}
.color-red {
  color: #ff5b5b;
}
.color-light-blue {
  color: #00ffff;
}

.color-danger {
  color: #ff0000;
}
.vm--modal {
  height: auto !important;
  background-color: unset !important;
}
.bg-ecio-gray {
  background-color: #585858;
}
.backdrop {
  background-color: rgba(0, 0, 0, 0.8);
}
@font-face {
  font-family: "Quantico";
  src: url("./assets/fonts/Quantico-Regular.eot"); /* IE9 Compat Modes */
  src: url("./assets/fonts/Quantico-Regular.eot?#iefix")
      format("embedded-opentype"),
    /* IE6-IE8 */ url("./assets/fonts/Quantico-Regular.woff2") format("woff2"),
    /* Super Modern Browsers */ url("./assets/fonts/Quantico-Regular.woff")
      format("woff"),
    /* Pretty Modern Browsers */ url("./assets/fonts/Quantico-Regular.ttf")
      format("truetype"),
    /* Safari, Android, iOS */
      url("./assets/fonts/Quantico-Regular.svg#svgFontName") format("svg"); /* Legacy iOS */
}
@font-face {
  font-family: "Amiko";
  src: url("./assets/fonts/Amiko-Regular.eot"); /* IE9 Compat Modes */
  src: url("./assets/fonts/Amiko-Regular.eot?#iefix")
      format("embedded-opentype"),
    /* IE6-IE8 */ url("./assets/fonts/Amiko-Regular.woff2") format("woff2"),
    /* Super Modern Browsers */ url("./assets/fonts/Amiko-Regular.woff")
      format("woff"),
    /* Pretty Modern Browsers */ url("./assets/fonts/Amiko-Regular.ttf")
      format("truetype"),
    /* Safari, Android, iOS */
      url("./assets/fonts/Amiko-Regular.svg#svgFontName") format("svg"); /* Legacy iOS */
}
.bg-ecio-purple:disabled {
  background: #9e9e9e;
  opacity: 0.6;
}
.bg-ecio-green:disabled {
  background: #9e9e9e;
  opacity: 0.6;
}

.lds-ring {
  display: inline-block;
  position: relative;
  width: 30px;
  height: 20px;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 24px;
  height: 24px;
  margin: 3px;
  border: 3px solid #000;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #000 transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.text-ecio {
  color: #e0fb16;
}

.toggle-btn {
  position: fixed;
  right: 0px;
  top: 350px;
  z-index: 4;
  cursor: pointer;
  margin-right: -4px;
}

.toggleup-btn {
  position: fixed;
  right: 0px;
  top: 350px;
  cursor: pointer;
}
::-webkit-scrollbar {
  width: 8px;
  height: 10px;
}
::-webkit-scrollbar-thumb {
  background: #9a9a9a;
  border-radius: 10px;
}
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 2px grey;
  box-shadow: inset 0 0 2px grey;
  border-radius: 10px;
}

.desktop {
  display: block;
}

@media (max-width: 800px) {
  .desktop {
    display: none;
  }
}

@media (min-width: 320px) {
  .container {
    max-width: 360px !important;
  }
}

@media (min-width: 640px) {
  .container {
    max-width: 640px !important;
  }
}
@media (min-width: 768px) {
  .container {
    max-width: 768px !important;
  }
}
@media (min-width: 1024px) {
  .container {
    max-width: 1024px !important;
  }
}
@media (min-width: 1280px) {
  .container {
    max-width: 1280px !important;
  }
}
</style>
