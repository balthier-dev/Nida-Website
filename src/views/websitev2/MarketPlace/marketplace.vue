<template>
  <div>
    <CardList
      ref="card"
      :loading="loading"
      :isOwner="false"
      :isSidebar="true"
      @filter="handleSearch"
      @setLoading="handleSetLoading"
      @handleResetFilter="fetchMarketPlaces"
      @transferred="handleTransferred"
    />
  </div>
</template>

<script>
import CardList from "../../../components/List/CardList.vue";
import { createClient } from "urql";

export default {
  components: {
    CardList,
  },
  computed: {
    cards: function() {
      return this.$store.getters.getCards;
    },
  },
  data() {
    return {
      loading: false,
    };
  },
  mounted() {
    this.fetchMarketPlaces();
    this.fetchMonthly();
  },
  methods: {
    handleTransferred(card) {
      this.loading = true;
      const filterCard = this.cards.filter((c) => c.id !== card.id);
      this.$store.dispatch("setCards", filterCard);
      this.loading = false;
    },
    async handleSearch(props) {
      this.loading = true;
      const {
        camps,
        classes,
        elements,
        parts,
        rarity,
        search,
        star,
        price,
        nft_type,
        fragment,
      } = props;
      let query = "";
      if (price.min >= 0 || price.max >= 0) {
        query += `orders: {price: {_gte:${price.min},_lte:${price.max}}}`;
      }
      if (search) {
        query += `,name:{_eq:"${search}"} `;
      }
      if (camps.length > 0) {
        query += `,camp:{_in:[${this.handleQuery(camps)}]} `;
      }
      if (classes.length > 0 || elements.length > 0) {
        if (classes.length > 0 && elements.length > 0) {
          query += `,nft_class:{_in:[${this.handleQuery(
            classes
          )},${this.handleQuery(elements)}]} `;
        } else if (classes.length > 0) {
          query += `,nft_class:{_in:[${this.handleQuery(classes)}]} `;
        } else if (elements.length > 0) {
          {
            query += `,nft_class:{_in:[${this.handleQuery(elements)}]} `;
          }
        }
      }
      if (parts.length > 0) {
        query += `,part:{_in:[${this.handleQuery(parts)}]} `;
      }
      if (rarity.length > 0) {
        query += `,rarity: {_in:[${this.handleQuery(rarity)}]}`;
      }
      if (star > 0) {
        query += `,level: {_eq:"${star}"}`;
      }

      if (nft_type !== "ALL") {
        query += `,nft_type: {_eq:"${nft_type}"}`;
      }
      if (nft_type !== "CARD" && fragment) {
        query += `,fragment: {_eq:"${fragment}"}`;
      }
      const APIURL = process.env.VUE_APP_THE_GRAPH;
      const tokensQuery = `{
        nfts(where:{${query}, is_active_order:{_eq:true}}) {
          id
          name
          image
          token_id
          part_code
          nft_type
  				level
    			nft_class
    			part
    			rarity
    			camp
          level
    			fragment
    			tribe
          updated_at
          contract_address
          market_owner
          orders(where: {status: {_eq: "OPEN"}}){
            id
            price
            status
            buy_with_erc20_address
          }
        }
      }`;
      const client = createClient({
        url: APIURL,
        fetchOptions: {
          headers: {
            "x-hasura-admin-secret": `${process.env.VUE_APP_HASURA_ADMIN_SECRET}`,
          },
        },
      });
      this.$refs.card.resetFilter();
      const { data } = await client.query(tokensQuery).toPromise();
      const filterData = await this.checkCollectionItem(data);
      this.$store.dispatch("setCards", filterData);
      this.loading = false;
    },
    handleQuery(array) {
      return array.map((arr, index) => {
        let text = `"${arr}"`;
        if (index === array.length) {
          text += ",";
        }
        return text;
      });
    },
    handleSetLoading(isLoading) {
      this.loading = isLoading;
    },
    checkCollectionItem(data) {
      let filterItems = [];
      if (data && data.nfts && data.nfts.length) {
        data.nfts.forEach((nft) => {
          nft.orders.forEach((order) => {
            if (order.status === "OPEN") {
              nft.isSelling = true;
              nft.orderId = order.order_id;
              nft.price = order.price;
              nft.buyWith = order.buy_with_erc20_address;
              filterItems.push(nft);
            }
          });
        });
      }
      return filterItems;
    },
    async fetchMarketPlaces() {
      this.loading = true;
      const APIURL = process.env.VUE_APP_THE_GRAPH;
      const tokensQuery = `{
        nfts(where: {is_active_order: {_eq: true}}){
          id
          name
          image
          token_id
          part_code
          nft_type
  				level
    			nft_class
    			part
    			rarity
    			camp
          level
    			fragment
    			tribe
          updated_at
          contract_address
          market_owner
          orders(where: {status: {_eq: "OPEN"}}) {
            id
            price
            status
            buy_with_erc20_address
          }
        }
      }`;
      const client = createClient({
        url: APIURL,
        fetchOptions: {
          headers: {
            "x-hasura-admin-secret": `${process.env.VUE_APP_HASURA_ADMIN_SECRET}`,
          },
        },
      });

      const { data } = await client.query(tokensQuery).toPromise();
      this.$refs.card.resetFilter();
      const filterNfts = await this.checkCollectionItem(data).sort((a, b) =>
        a.nft_type > b.nft_type ? 1 : -1
      );
      this.$store.dispatch("setCards", filterNfts);
      this.loading = false;
    },
    async fetchMonthly() {
      this.loading = true;
      console.log("HERE");
      const APIURL = process.env.VUE_APP_THE_GRAPH;
      const tokensQuery = `{
        nfts(where: {orders: {status: {_eq: "SOLD"}, updated_at: {_lt: "2022-01-31", _gt: "2022-01-01"}}}){
          token_id
          orders(where: {status: {_eq: "SOLD"}}) {
            price
            status
          }
        }
      }`;
      const client = createClient({
        url: APIURL,
        fetchOptions: {
          headers: {
            "x-hasura-admin-secret": `${process.env.VUE_APP_HASURA_ADMIN_SECRET}`,
          },
        },
      });

      const { data } = await client.query(tokensQuery).toPromise();
      let sum = 0;
      if (data && data.nfts && data.nfts.length) {
        data.nfts.forEach((nft, index) => {
          nft.orders.forEach((order) => {
            if (order.status === "SOLD") {
              sum = sum + order.price;
            }
            if (index === data.nfts.length) {
              console.log("SUM of JAN : " + sum);
            }
          });
        });
      }
    },
  },
};
</script>
