<template>
  <div>
    <div
      class="
        relative
        pt-16
        pb-32
        flex
        content-center
        items-center
        justify-center
      "
    >
      <div
        class="
          absolute
          top-0
          w-full
          h-full
          bg-center bg-cover
          images-bg-airdrop
        "
      >
        <span class="w-full h-full absolute opacity-0 bg-black"></span>
      </div>

      <div class="container relative mx-auto lg:w-8/12">
        <h1 class="text-ecio text-center" style="font-size: 2.5rem">MY NFTS</h1>

        <div
          class="
            flex flex-wrap
            mx-4
            overflow-hidden
            sm:-mx-4
            md:-mx-3
            lg:-mx-3
            xl:-mx-3
            justify-center
          "
        >
          <div
            class="
              p-10
              my-4
              px-4
              w-full
              overflow-hidden
              sm:my-4
              sm:px-4
              sm:w-full
              md:my-3
              md:px-3
              md:w-1/2
              lg:my-3
              lg:px-3
              lg:w-1/2
              xl:my-3
              xl:px-3
              xl:w-1/2
            "
          >
            <img
              v-if="nftID == 0"
              src="../assets/cards/0.png"
              width="400px"
              class="m-auto card-hover"
            />
            <img
              v-if="nftID == 1"
              src="../assets/cards/1.png"
              width="400px"
              class="m-auto card-hover"
            />
            <img
              v-if="nftID == 2"
              src="../assets/cards/2.png"
              width="400px"
              class="m-auto card-hover"
            />
          </div>

          <div
            class="
              pt-10
              my-4
               
              w-full
              overflow-hidden
              sm:my-4
              sm:px-4
              sm:w-full
              md:my-3
              md:px-3
              md:w-1/2
              lg:my-3
              lg:px-3
              lg:w-1/2
              xl:my-3
              xl:px-3
              xl:w-1/2
            "
          >
            <div class="bg-frame-airdrop p-10">
              <h1 class="text-2xl fs-blod text-ecio">
                <!-- YOU RECEIVE 1st NFT AIRDROP -->
                {{ NFTDetail.name }}
              </h1>

              <p class="pt-5 text-white">
                <!-- <img
                          src="../assets/images/user.png"
                          width="20px"
                          style="    display: inline-block; margin-right: 5px"
                        /> -->
                <span> Description: {{ NFTDetail.description }} </span>
              </p>
              <!-- <p class="pt-5 text-white">
                <router-link to="/" class="a-op-5">
                  <img
                    :src="NFTDetail.image"
                    width="20px"
                    style="display: inline-block; margin-right: 5px"
                  />
                  <span> Owner: 0xc1EB...ed7b </span>
                </router-link>
              </p> -->
              <p class="pt-5 text-white">
                <a
                  target="_bank"
                  href="https://bscscan.com/address/0x1ddCD5B73afb734b4AE6B1C139858F36311Ed4d3"
                  class="a-op-5"
                >
                  <img
                    src="../assets/images/contact.png"
                    width="20px"
                    style="display: inline-block; margin-right: 5px"
                  />

                  <span>Contract: 0x1ddC...Ed4d3</span>
                </a>
              </p>

              <div class="mt-10">
                <router-link to="/my-collection">
                  <div
                    class="button-connect-wallet text-center"
                    style="cursor: pointer"
                  >
                    <h1>My Collection</h1>
                  </div>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  title: "ECIO - View NFT",
  data() {
    return {
      nftID: "",
      nftData: undefined,
      nftMetadataHost: process.env.VUE_APP_NFT_METADATA_ENDPOINT
    };
  },
  computed: {
    NFTDetail() {
      return this.nftData;
    }
  },
  methods: {
    async LoadNFTDetail(nftId) {
      let that = this;
      return await axios
        .get(this.nftMetadataHost + "/api/token/" + nftId)
        .then(function(response) {
          that.nftData = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  mounted() {
    const nftID = this.$route.params.id;
    this.nftID = nftID;
    this.LoadNFTDetail(nftID);
  }
};
</script>

<style scoped>
.images-bg-airdrop {
  background: linear-gradient(90deg, #2d0860 1.04%, #090214 98.96%);
  min-height: 100vh;
}
.title-h1 {
  font-size: 1.9rem;
  text-transform: uppercase;
}
.title-sub {
  font-size: 0.875rem;
}

.button-receive-airdrop:hover {
  color: #9749ff;
  transition: 1s;
}
.button-connect-wallet {
  padding: 8px;
  background: #e0fb16;
  width: 250px;
  margin: auto;
  color: #111111;
  font-weight: 600;
  margin-top: 15px;
  text-transform: uppercase;
  transition: 1s;
}
.button-receive-airdrop {
  padding: 15px;
  background: #e0fb16;
  width: 250px;
  margin: auto;
  color: #111111;
  font-weight: 600;
  margin-top: 30px;
  text-transform: uppercase;
  transition: 1s;
}
.bg-frame-airdrop {
  background-color: rgb(121 114 175 / 14%);
  padding-bottom: 50px;
  box-shadow: 10px 10px 5px -3px rgb(0 0 0 / 52%);
  -webkit-box-shadow: 10px 10px 5px -3px rgb(0 0 0 / 52%);
  -moz-box-shadow: 10px 10px 5px -3px rgba(0, 0, 0, 0.52);
}
.width-mobile-airdrop {
  width: 400px;
}

@media screen and (max-width: 700px) {
  .width-mobile-airdrop {
    width: 100%;
  }
  .max-width-mobile {
    padding: 0 15px;
  }
  .button-connect-wallet {
    width: 100%;
  }
}
.text-limit {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  text-align: left;
}
.text-alert-airdrop {
  max-width: 260px;
  color: red;
  margin: auto;
  margin-top: 10px;
  line-height: 1.2rem;
  text-align: left;
}
.fs-blod {
  font-weight: 800;
}
.text-limit h1 {
  display: inline-block;
  width: 210px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.1;
  margin-top: 5px;
}
.text-ecio {
  color: #e0fb16;
}
.highlight span {
  color: #e0fb16;
}
.head-line {
  margin-top: 20px;
  text-transform: uppercase;
  color: #e0fb16;
  font-weight: bold;
}
.input-group {
  display: table;
  border-collapse: collapse;
  width: 100%;
}
.input-group > div {
  display: table-cell;
  padding-right: 10px;
  vertical-align: middle; /* needed for Safari */
}
.input-group-icon {
  color: #fff;
  padding: 0 12px;
  border: 2px solid #ffffff;
}
.input-group-area {
  width: 100%;
}
.input-group input {
  border: 0;
  display: block;
  width: 100%;
  padding: 8px;
}
.title-ref {
  text-transform: uppercase;
  color: #fff;
  font-weight: bold;
  margin-top: 20px;
}
.text-ecio {
  color: #e0fb16;
}
.ranking-button {
  padding: 5px;
  background: #e0fb16;
  text-align: center;
  width: 100%;
  margin: auto;
  color: #111111;
  font-weight: 600;
  margin-top: 5px;
  text-transform: uppercase;
  font-size: 0.8rem;
}
.card-hover:hover {
  box-shadow: 1px 0px 23px 4px rgba(73, 130, 255, 0.87);
  -webkit-box-shadow: 1px 0px 23px 4px rgba(73, 130, 255, 0.87);
  -moz-box-shadow: 1px 0px 23px 4px rgba(73, 130, 255, 0.87);
  transition: 0.5s;
}
.a-op-5:hover {
  color: #7b74b0;
}
</style>
