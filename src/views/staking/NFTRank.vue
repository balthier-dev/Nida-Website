<template>
  <div class="">
    <div class="main-container">
      <section class="cover imagebg" data-overlay="4">
        <div class="background-image-holder background-top">
          <!-- <img alt="background" src="../../assets/images/bg-staking.png" />
          <img alt="background" src="../../assets/nftstaking/staking.png" /> -->
        </div>
        <div class="container text-uppercase">
          <div class="row mt-3">
            <div class="col-lg-2 col-sm-12" style="display: contents">
              <a
                href="/nft-staking"
                style="margin: auto; vertical-align: middle"
                class="ml-0"
              >
                <img class="mobile" src="../../assets/nftstaking/backbtn.png" />
              </a>
            </div>
            <div class="col-lg-8 col-sm-12">
              <h1 class="title-h1 mt-3 text-center" :title="walletAccount">
                TOP RANK
              </h1>
            </div>
            <div class="col-lg-2 col-sm-12" style="display: contents">
              <img
                class="mobile mr-0"
                style="margin: auto; vertical-align: middle"
                src="../../assets/nftstaking/staking.png"
              />
            </div>
          </div>
          <div class="row mt-3">
            <DataTable
              :value="ranks"
              responsiveLayout="stack"
              breakpoint="960px"
              tableClass="p-datatable-nft quantico"
              :loading="loading"
            >
              <template #loading>
                Finding the top commanders
                <span
                  class="ml-1 spinner-border spinner-border-sm"
                  style="position: relative; top: -6px"
                  role="status"
                >
                </span>
              </template>
              <template #empty>Waiting for the top commanders</template>
              <Column field="no" header="NO">
                <template #body="data">
                  <span
                    :class="{
                      'color-yellow': myRank == data.index + 1,
                    }"
                    >{{ data.index + 1 }}</span
                  >
                </template>
              </Column>
              <Column field="name" header="ACCOUNT NAME"> </Column>
              <Column field="address" header="ADDRESS"></Column>
              <Column field="country" header="COUNTRY"> </Column>
              <Column field="amount" header="WARRIORS"></Column>
              <Column field="bp" header="BATTLE POWER"> </Column>
            </DataTable>
          </div>
          <div class="row mt-2">
            <div class="col rank">
              <h1
                class="title-h1 mt-3 text-center"
                style="padding-top: 5px; font-size: 20px"
              >
                YOUR RANK
              </h1>
              <h1 class="title-h1 mt-3 text-center" style="padding-bottom: 5px">
                {{ Number(myRank).toLocaleString() }}
              </h1>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Web3 from "web3";
import ABI from "../../contracts/NFTStaking.json";
export default {
  data() {
    return {
      responsiveOptions: [
        {
          breakpoint: "1024px",
          numVisible: 3,
          numScroll: 3,
        },
        {
          breakpoint: "600px",
          numVisible: 2,
          numScroll: 2,
        },
        {
          breakpoint: "480px",
          numVisible: 1,
          numScroll: 1,
        },
      ],
      blockExplorerUrl: process.env.VUE_APP_BLOCK_EXPLORER,
      ranks: [],
      stakeContract: undefined,
      myRank: 0,
      accountNames: [],
      countries: [],
      loading: true,
      walletAccount: null,
    };
  },
  mounted() {
    try {
      this.connectWallet().then(() => {
        //wait for dev
        this.checkMyRank();
        this.checkTop20Rank();
      });
    } catch (e) {
      this.loading = false;
      console.log(e.data);
    } finally {
      this.loading = false;
    }

    //Update real-time reward
    // setInterval(() => this.loadYourReward(), 3000);
  },
  methods: {
    async connectWallet() {
      if (this.validated()) {
        this.switchNetwork();

        await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        this.walletAccount = window.ethereum.selectedAddress;
      }
    },
    async switchNetwork() {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: process.env.VUE_APP_CHAIN_ID,
            chainName: process.env.VUE_APP_CHAIN_NAME,
            rpcUrls: [process.env.VUE_APP_RPC_URL],
            nativeCurrency: {
              name: process.env.VUE_APP_CURRENCY_NAME,
              symbol: process.env.VUE_APP_CURRENCY_SYMBOL,
              decimals: 18,
            },
            blockExplorerUrls: [process.env.VUE_APP_BLOCK_EXPLORER],
          },
        ],
      });
    },
    validated() {
      if (typeof window.ethereum !== "undefined") {
        return true;
      }

      return false;
    },
    async loadContract() {
      window.web3 = new Web3(window.ethereum);
      if (typeof window.ethereum == "undefined") {
        window.web3.setProvider(
          new Web3.providers.HttpProvider(process.env.VUE_APP_RPC_URL)
        );
      }
      this.stakeContract = await new window.web3.eth.Contract(
        ABI.abi,
        process.env.VUE_APP_NFT_STAKING_CONTRACT_ADDRESS
      );
    },
    async checkMyRank() {
      this.loadContract().then(() => {
        this.stakeContract.methods
          .getRank(this.walletAccount)
          .call()
          .then((results) => {
            // console.log("results", results);
            // let results.map( rank => console.log(rank));
            if (results > 50) {
              this.myRank = results;
            }
          });
      });
    },
    async checkTop20Rank() {
      this.loading = true;
      this.loadContract().then(() => {
        this.stakeContract.methods
          .getTopRanking(100)
          .call()
          .then((results) => {
            // let newData = results.map((item) =>
            //   Object.assign({}, item, {name : "test"},{country : "TH"})
            // );
            // this.ranks = newData;
            console.log("tuple : " + results);

            let ranking = [];
            let rankLength = results.length;
            for (let res in results) {
              let params = { wallet: results[res].account };
              axios
                .post(process.env.VUE_APP_API_GATEWAY + "check/wallet", params)
                .then((response) => {
                  let data = {};
                  // console.log("response", response);
                  // // if (response.data.data === "Check wallet") {

                  // data.no = res;

                  data.name =
                    typeof response.data.obj !== "undefined"
                      ? response.data.obj[0].display_name != null
                        ? response.data.obj[0].display_name
                        : "-"
                      : "-";
                  data.country =
                    typeof response.data.obj !== "undefined"
                      ? response.data.obj[0].country != null
                        ? response.data.obj[0].country
                        : "-"
                      : "-";
                  // console.log(
                  //   "getTotalBattlePower results[res].account",
                  //   results[res].account
                  // );
                  this.stakeContract.methods
                    .getTotalBattlePower(results[res].account)
                    .call()
                    .then((bpRes) => {
                      // console.log("bpRes", bpRes);
                      // console.log(
                      //   "totalChallengeBonus results[res].account",
                      //   results[res].account
                      // );
                      this.stakeContract.methods
                        .totalChallengeBonus(results[res].account)
                        .call()
                        .then((resp) => {
                          let sum = 0;
                          resp.map((i, index) => {
                            sum = sum + Number(Web3.utils.fromWei(i, "ether"));
                            if (index == resp.length - 1) {
                              // console.log(sum+Number(Web3.utils.fromWei(bpRes, "ether")));
                              data.battlePower =
                                sum +
                                Number(Web3.utils.fromWei(bpRes, "ether"));
                              data.bp = Number(
                                sum + Number(Web3.utils.fromWei(bpRes, "ether"))
                              ).toLocaleString(undefined, {
                                minimumFractionDigits: 3,
                                maximumFractionDigits: 3,
                              });
                              // data.battlePower = results[res].totalBattlePower;
                              data.address = this.shortAddress(
                                results[res].account
                              );
                              data.amount = results[res].amount;
                              ranking.push(data);
                              if (ranking.length == rankLength) {
                                this.ranks = ranking.sort(
                                  (a, b) => b.battlePower - a.battlePower
                                );

                                for (let i in this.ranks) {
                                  if (
                                    this.shortAddress(
                                      this.ranks[i].address
                                    ).toLowerCase() ==
                                    this.shortAddress(this.walletAccount)
                                  ) {
                                    this.myRank = Number(i) + 1;
                                  }
                                }
                                this.loading = false;
                              }
                              this.ranks = this.ranks.splice(0, 50);
                            }
                          });
                        });
                    });
                });
            }
          });
      });
    },
    convertToDecimal(wei) {
      let result = Web3.utils.fromWei(wei);
      return Number(result).toLocaleString(undefined, {
        minimumFractionDigits: 3,
        maximumFractionDigits: 3,
      });
    },
    shortAddress(wallet) {
      return "".concat(wallet.substring(0, 6), "...", wallet.slice(-4));
    },
  },
};
</script>

<style scoped>
.main-container {
  min-height: 100vh;
  background: #000;
}

.boxes .header {
  padding-top: 10px;
  background-image: url("../../assets/images/staking/header.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: top center;
  height: 75px;
}

.boxes .header h2 {
  color: #e0fb16;
  text-transform: uppercase;
  font-size: 1.9rem;
}

.boxes .body {
  padding: 35px;
  background-image: url("../../assets/nftstaking/bg.png");
  background-repeat: no-repeat;
  background-position: top center;
  background-size: 100% 100%;
  margin-top: 10px;
  margin-bottom: 20px;
  /* min-height: 600px; */
}

.boxes .body h2 {
  color: #e0fb16;
  text-transform: uppercase;
  font-size: 1.9rem;
}

a.color-light-blue:hover {
  color: #00ffff;
}

.product-item .product-item-content {
  border: 1px solid var(--surface-d);
  border-radius: 3px;
  margin: 0.3rem;
  text-align: center;
  padding: 2rem 0;
}

.product-item .product-image {
  width: 50%;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}

.challenge-card {
  padding: 35px;
  background-image: url("../../assets/nftstaking/bgchabox.png");
  background-repeat: no-repeat;
  background-position: top center;
  background-size: 100% 100%;
  margin-top: 10px;
  margin-bottom: 20px;
}

.rank {
  background-image: url("../../assets/nftstaking/bgyourrank.png");
  background-repeat: no-repeat;
  background-position: top center;
  background-size: 100% 100%;
}

.VueCarousel-slide {
  padding: 25px;
}

.VueCarousel-navigation-button .VueCarousel-navigation-prev {
  color: white !important;
  margin-left: 25px !important;
}

button {
  color: white !important;
}

.VueCarousel-navigation-button .VueCarousel-navigation-next {
  color: white;
  margin-right: 25px;
}

/* .btn-coming {
  background: #222326;
  width: 100%;
  color: #fff;
  border: 0;
  font-size: 19px;
  height: 35px;
  border-radius: 10px;
} */
</style>
