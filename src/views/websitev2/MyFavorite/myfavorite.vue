<template>
  <div>
    <CardList
      :loading="loading"
      :isOwner="false"
      :isSidebar="false"
      :isFavScreen="true"
      @setLoading="handleSetLoading"
    />
  </div>
</template>

<script>
import CardList from "../../../components/List/CardList.vue";

export default {
  components: {
    CardList,
  },
  data() {
    return {
      loading: false,
    };
  },
  mounted() {
    this.loading = true;
    this.$store.dispatch("setCards", []);
    this.fetchFavoriteCards();
  },
  methods: {
    async fetchFavoriteCards() {
      let favoriteItem = localStorage.getItem("favorite");
      if (favoriteItem) {
        const favorites = JSON.parse(localStorage.getItem("favorite"));
        this.$store.dispatch("setCards", favorites);
      }
      this.loading = false;
    },
  },
};
</script>
