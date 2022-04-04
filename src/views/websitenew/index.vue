<template>
  <div>
    <div class="main-container">
      <kinesis-container event="move">
        <section class="cover cover-features imagebg height-100 text-start">
          <div class="background-image-holder">
            <!-- <img alt="background" src="../../assets/webv3/ecio-cover.png" /> -->
          </div>
          <!-- <kinesis-element :strength="30" type="translate" axis="y">
            <img
              class="desktop home-nft"
              alt="background"
              src="../../assets/webv3/banner/Cover.png"
              width="750"
            />
          </kinesis-element> -->

          <!-- Trailer -->

          <div class="container" style="z-index: 6">
            <div class="row text-center">
              <div class="col-md-12 col-lg-12 mt-5" style="margin: 2% 0 0 -2%">
                <!-- src="../../assets/images/logo-ecio.png" -->
                <h1 class="text-3xl uppercase">Hello World NIDA!!</h1>
              </div>
            </div>
            <div class="row text-center">
              <div class="col-md-12 col-lg-12" style="margin: auto">
                <!-- src="../../assets/images/logo-ecio.png" -->
                <h1 class="text-xl uppercase">
                  This Landing page use web3 to get data from Smart contract.
                </h1>
                <h1 class="text-xl uppercase">
                  Make sure you have enoungh gas for transaction.
                </h1>
              </div>

              <!-- <div
                class="col-md-9 col-lg-6 col-sm-3 mobile"
                style="margin: auto"
              >
                <img
                  v-clipboard:copy="address"
                  style="padding: 10px"
                  src="../../assets/webv3/banner/ecioaddress.png"
                  class="mb-10 mobile"
                  content="Copy Address"
                  v-tippy="{
                    placement: 'right',
                  }"
                />
                <a
                  href="https://pancakeswap.finance/swap?outputCurrency=0x327a3e880bf2674ee40b6f872be2050ed406b021"
                  target="_blank"
                >
                  <img
                    class="mb-10 mobile"
                    src="../../assets/webv3/banner/copybuttonmb.png"
                    style="cursor: pointer; padding-top: 10px; margin: auto"
                  />
                </a>
                <a href="/alpha-pass">
                  <img
                    class="mobile"
                    src="../../assets/webv3/banner/alphapassbtn.png"
                    style="cursor: pointer; padding-top: 10px"
                  />
                </a>
              </div> -->
            </div>
            <div class="row text-center mt-5">
              <div class="col-md-12 col-lg-12" style="margin: auto">
                <!-- src="../../assets/images/logo-ecio.png" -->
                <h1 class="text-xl uppercase">
                  GET GREETING WORD FROM SMART CONTRACT ({{
                    greetContractAddress
                  }})
                </h1>
                <span class="uppercase title-header-section">
                  {{ greetingWord }}
                </span>
              </div>
            </div>

            <div class="row text-center mt-5">
              <div class="col-md-12 col-lg-12" style="margin: auto">
                <!-- src="../../assets/images/logo-ecio.png" -->
                <h1 class="text-xl uppercase">
                  you can change this word by write transactions here
                </h1>
                <input
                  v-model="greetChangeWord"
                  class="mauticform-input"
                  type="text"
                  style="width: 406px; border-radius: 5px"
                />
              </div>
            </div>

            <div class="row text-center mt-2">
              <div class="col-md-12 col-lg-12" style="margin: auto">
                <div
                  v-if="onApproving"
                  class="lds-ring-market"
                  style="
                    border-color: #e0fb16 transparent transparent transparent;
                  "
                >
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                <button v-else @click="submitWord" class="btn btn-approve">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </section>
      </kinesis-container>

      <footer class="text-center space--sm footer-5 bg--primary">
        <div class="container">
          <div class="row">
            <div class="col-sm-12">
              <div>
                <form
                  class="row justify-content-center form--active mt-0 pt-0"
                  style="max-width: 900px; margin: auto"
                >
                  <div class="col-md-12">
                    <span class="text-white break-space text-2xl"
                      >This is Example Project for Milk's NIDA Project
                    </span>
                  </div>
                  <div
                    style="position: absolute; left: -5000px"
                    aria-hidden="true"
                  ></div>
                </form>
                <div class="text-uppercase">
                  <span class="text-white break-space text-xl"
                    >Only use for non-commercial.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
import Web3 from "web3";
import ERC20 from "@/contracts/ERC20.json";
import GreetABI from "@/contracts/Greet.json";

export default {
  data() {
    return {
      address: "",
      greetingWord: "...",
      greetContractAddress: "".concat(
        process.env.VUE_APP_GREET_CONTRACT_ADDRESS.substring(0, 6),
        "...",
        process.env.VUE_APP_GREET_CONTRACT_ADDRESS.slice(-4)
      ),
      greetingContract: undefined,
      milkTokenContract: undefined,
      walletAccount: "",
      greetChangeWord: "",
      onApproving: false
    };
  },
  created() {
    const ref = this.$route.query.ref;
    if (ref != undefined) {
      const encryptedText = decodeURIComponent(ref);
      const decryptedText = this.CryptoJS.AES.decrypt(
        encryptedText,
        "mzHfUfUyyuFK9kJwxr9Qv"
      ).toString(this.CryptoJS.enc.Utf8);
      localStorage.setItem("ref", decryptedText);
    }
  },
  async mounted() {
    window.web3 = new Web3(window.ethereum);
    if (typeof window.ethereum == "undefined") {
      window.web3.setProvider(
        new Web3.providers.HttpProvider(process.env.VUE_APP_RPC_URL)
      );
    }
    this.connectWallet().then(() => {
      // this.loadContract();
      this.loadGreetingWord();
      this.loadAccountBalance();
    });
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
    validated() {
      if (typeof window.ethereum !== "undefined") {
        return true;
      }
      return false;
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
    async loadContract() {
      window.web3 = new Web3(window.ethereum);
      if (typeof window.ethereum == "undefined") {
        window.web3.setProvider(
          new Web3.providers.HttpProvider(process.env.VUE_APP_RPC_URL)
        );
      }
      this.greetingContract = await new window.web3.eth.Contract(
        GreetABI.abi,
        process.env.VUE_APP_GREET_CONTRACT_ADDRESS
      );

      console.log(this.greetingContract);

      this.milkTokenContract = await new window.web3.eth.Contract(
        ERC20.abi,
        process.env.VUE_APP_MILK_CONTRACT_ADDRESS
      );
    },
    async loadGreetingWord() {
      this.loadContract().then(() => {
        this.greetingContract.methods
          .greet()
          .call()
          .then((res) => {
            console.log(res);
            this.greetingWord = res;
          });
      });
    },
    async loadAccountBalance() {
      this.loadContract().then(() => {
        this.milkTokenContract.methods
          .balanceOf(window.ethereum.selectedAddress)
          .call()
          .then((results) => {
            console.log(results);
            // this.greetingWord = results;
          });
      });
    },
    submitWord() {
      this.loadContract().then(() => {
        // var allowEcioWei = Web3.utils.toWei(
        //   Web3.utils.toBN(amount).toString(),
        //   "ether"
        // );
        this.greetingContract.methods
          .setGreeting(this.greetChangeWord)
          .send({ from: this.walletAccount })
          .on("sent", (data) => this.sendGreeting(data))
          .on("transactionHash", (tx) => this.transactionHash(tx))
          .on("receipt", (data) => this.receiptGreeting(data))
          // .on("confirmation", (data) => this.confirmApprove(data))
          .on("error", (error) => {
            this.showToastError(error);
            this.onApproving = false;
          });
      });
    },
    sendGreeting(data) {
      console.log("send Change to Blockchain", data);
      this.onApproving = true;
    },
    transactionHash(transaction) {
      console.log("transaction", transaction);
    },
    receiptGreeting(data) {
      console.log("Greeting Changed", data);
      this.onApproving = false;
      this.loadGreetingWord(this.active);
    },
  },
};
</script>

<style scoped>
.swiper {
  height: 300px;
  width: 100%;
}
.swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-weight: bold;
}
.agile .dots {
  bottom: 10px;
  left: 50%;
  position: absolute;
  transform: translateX(-50%);
}
.header-section {
  margin: 1% 0px 5% 0px;
}

.title-header-section {
  font-size: 2.14285714em;
  color: #e0fb16;
}
.title-ecio {
  font-size: 4rem;
  font-weight: bold;
}
.m-logo {
  /* padding-top: 60px !important; */
  /* margin: 0px 0px 0px 0px !important; */
}
.bg--purple {
  background: #410b53;
  padding-bottom: 0;
}

.btn-approve {
  font-size: 1.2rem;
  padding: 20px;
  text-align: center;
  background-color: #4804d9;
  color: #fff;
  height: 40px;
  width: 150px;
  border-radius: 10px;
  text-transform: uppercase;
  font-family: "Quantico" !important;
}

.bg--purple [data-overlay]:before {
  background: #410b53 !important;
}
.slider.roadmap {
  margin-bottom: 0;
}
.bg--team {
  background-image: linear-gradient(
    to top,
    #000000 100%,
    #120457 100%,
    #44124e 100%
  );
}
/deep/ .roadmap .flickity-page-dots {
  bottom: 50px !important;
}
/deep/ .roadmap .flickity-page-dots .dot {
  background: #ffffff !important;
}
.project-thumb:not(.hover-element) > a {
  margin-bottom: 0px;
}

@media (max-width: 767.98px) {
  /deep/ .roadmap .flickity-page-dots {
    bottom: 10px !important;
  }
  .videobg {
    height: 100vh !important;
  }
}
section,
footer {
  padding-top: 5em;
  padding-bottom: 5em;
}

/deep/ .flickity-page-dots .dot {
  width: 12px;
  height: 12px;
}

.carousel {
  background: #fafafa;
}

.carousel-cell {
  width: 66%;
  height: 200px;
  margin-right: 10px;
  background: #8c8;
  border-radius: 5px;
  counter-increment: carousel-cell;
}

/* cell number */
.carousel-cell:before {
  display: block;
  /* text-align: center; */
  content: counter(carousel-cell);
  line-height: 200px;
  font-size: 80px;
  color: white;
}

.button {
  font-size: 22px;
}

.button-group {
  margin-bottom: 20px;
}
.mauticform-page-1 {
  display: flex !important;
  justify-content: center;
}
.btn-ecio-partner {
  background: #e0fb16;
  color: #000000;
  border-radius: 5px;
  margin-left: 20px;
  white-space: nowrap;
  padding: 6px 12px;
  position: relative;
  font-weight: bold;
  width: 100%;
  display: flex;
  align-items: center;
  font-family: "Quantico";
  justify-content: center;
}
.mauticform-button.btn-default {
  border-radius: 5px;
  color: #000000 !important;
  font-family: "Quantico";
  font-size: 14px !important;
  font-weight: bold !important;
}
.break-space {
  white-space: break-spaces;
}
.mauticform-input {
  height: 100%;
  padding: 14px;
}

.container.partner {
  background: rgb(0 0 0 / 20%);
  padding: 30px;
}
.desktop {
  display: block;
}
.mobile {
  display: none;
}
.desktop-header {
  display: flex;
}
.max-marketplace-text {
  font-size: 4rem;
  color: #ffffff;
}
.blueunion {
  display: flex;
}

.home-nft {
  position: absolute;
  right: 3%;
  z-index: 5;
  margin-top: 50px;
}

.p-galleria-thumbnail-items-container {
  height: 520px !important;
}

@media (max-width: 600px) {
  .container {
    max-width: 100%;
  }
}

@media (max-width: 800px) {
  .desktop {
    display: none;
  }
  .mobile {
    display: block;
  }
  .desktop-header {
    display: none;
  }
  .blueunion {
    display: none;
  }
}

@media (max-width: 1100px) {
  .max-marketplace-text {
    font-size: 3.5rem;
    color: #ffffff;
  }
}

@media (max-width: 1000px) {
  .max-marketplace-text {
    font-size: 3rem;
    color: #ffffff;
  }
}

@media (max-width: 1600px) {
  .home-nft {
    margin-top: -25px;
  }
}
</style>
