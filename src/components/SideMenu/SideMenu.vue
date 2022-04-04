<template>
  <div class="container-side-menu p-0">
    <div class="p-3">
      <div class="text-left">
        <p class="color-white xl:text-base 2xl:text-sm">{{ account }}</p>
      </div>
    </div>
    <div class="divider" />
    <div class="grid gap-4 mt-8">
      <div class="text-center">
        <router-link to="/marketplace">
          <span
            :class="{ activeMenu: $route.path === '/marketplace' }"
            class="color-white"
          >
            marketplace
          </span>
        </router-link>
      </div>
      <div class="text-center">
        <router-link to="/my-collection">
          <span
            :class="{ activeMenu: $route.path === '/my-collection' }"
            class="color-white"
          >
            my collection
          </span>
        </router-link>
      </div>
      <div class="text-center">
        <router-link to="/my-favorite">
          <span
            :class="{ activeMenu: $route.path === '/my-favorite' }"
            class="color-white"
          >
            my favorite
          </span>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "SideMenu",
  props: {
    account: {
      type: String,
    },
  },
};
</script>
<style>
.activeMenu {
  color: #e0fb16 !important;
}
.container-side-menu {
  background: #1d1d1d;
}
.divider {
  border-bottom: 1px solid #000000;
}
</style>
