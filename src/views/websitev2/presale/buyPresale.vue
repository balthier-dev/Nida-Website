<template>
  <div class="">
    <div class="main-container">
      <section
        class="cover cover-features imagebg text-center"
        data-overlay="4"
      >
        <div class="background-image-holder background-top">
          <img alt="background" src="../../../assets/images/bg-whitelist.jpg" />
        </div>
        <div class="container mt-20">
          <div class="row justify-content-center">
            <img
              src="../../../assets/images/progress2.png"
              style="max-width: 600px; width: 100%; padding: 20px"
            />
            <div class="col-md-10 col-lg-8" style="margin-bottom: 10px">
              <h1 class="mt-10 text-lot">your Presale pool</h1>

              <div class="box-lot w-100">{{ currentLotLabel }}</div>
            </div>
          </div>

          <div class="row mt-5">
            <div v-if="tokenPool != 0" class="col-md-12">
              <figure class="textcenter">
                <!-- <img
                  src="../../../assets/images/bg-panel-mobile.png"
                  class="panel-mobile-active"
                /> -->
                <img
                  src="../../../assets/images/bg-pannel.png"
                  class="panel-desktop-active"
                />
                <figcaption>
                  <div style="color: #e0fb16">
                    <div>BUY ECIO TOKEN</div>
                    <div style="font-size: 0.875rem">
                      Your Maximum Quota = {{ currentUserQuota }} BUSD
                    </div>
                  </div>

                  <div
                    class="flex justify-between text-white mt-4"
                    style="font-size: 1.2rem"
                  >
                    <div>You pay</div>
                    <div>Remaining : {{ busdBalance }} BUSD</div>
                  </div>
                  <div class="flex" style="height: 45px">
                    <input
                      v-model="busdInput"
                      :max="currentUserQuota"
                      min="1"
                      class="form-swap"
                      type="number"
                      @keypress="isNumber($event)"
                    />
                    <button
                      @click="maxButtonHandler"
                      class="btn btn-ecio-white"
                      style="padding: 20px"
                    >
                      MAX
                    </button>
                  </div>
                  <p
                    class="text-left text-danger"
                    style="font-size: 0.875rem !important; margin-top: 10px"
                  >
                    *Minimum purchase 1 BUSD
                  </p>

                  <h1 class="text-lot mt-4">You Receive</h1>

                  <div class="box-lot">{{ receiveECIO }} ECIO</div>
                  <button
                    :disabled="hasApproved"
                    @click="approveHandler"
                    class="btn btn-ecio mt-4  "
                  >
                    <div class="flex flex-row">
                      <div class="lds-ring ml-2 mt-0" v-if="approveHash !== ''">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                      </div>

                      <div style="margin: auto;width: auto;">APPROVE</div>
                    </div>
                  </button>
                  <button
                    :disabled="!hasApproved || !isEnableSwapButton"
                    @click="swapHandler"
                    class="btn btn-ecio mt-4 "
                  >
                    <div class="flex flex-row">
                      <div class="lds-ring ml-2 mt-0" v-if="swapHash !== ''">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                      </div>

                      <div style="margin: auto;width: auto;">SWAP</div>
                    </div>
                  </button>
                </figcaption>
              </figure>
            </div>
          </div>

          <div class="row current-token">
            <div class="col-md-12">
              <h1 class="text-lot mt-4" style="font-size: 1.5rem">
                YOUR CURRENT TOKENS
              </h1>

              <div class="box-lot">
                {{ numberWithCommas(ecioBalance) }} ECIO
              </div>
              <button @click="claimHandler" class="btn btn-ecio mt-4">
                CLAIM
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import Web3 from "web3";
import PresaleABI from "./../../../contracts/Presale.json";
import ERC20TokenABI from "./../../../contracts/ERC20.json";
export default {
  watch: {
    busdInput: function(val) {
      if (val[0] == "0" || val < 0) {
        this.busdInput = 1;
      } else if (val > this.currentUserQuota) {
        this.busdInput = this.currentUserQuota;
      }
    }
  },
  data() {
    return {
      tokenOfLot: 0,
      tokenPool: 0,
      busdInput: 1,
      ecioBalance: 0,
      tokenAvailable: 0,
      ecioRate: 0.004,
      currentUserQuota: 0,
      busdBalance: 0,
      currentLot: 1,
      presaleContract: undefined,
      BUSDContract: undefined,
      userLotId: 0,
      hasApproved: false,
      isApproveProcessing: false,
      isSwapProcessing: false,
      approveHash: "",
      swapHash: ""
    };
  },
  computed: {
    isEnableSwapButton() {
      return this.busdInput <= this.currentUserQuota;
    },
    totalPool() {
      return this.numberWithCommas(this.tokenOfLot / this.ecioRate);
    },
    progressBar() {
      return parseInt((this.tokenPool / this.tokenOfLot) * 100);
    },

    totalAvailablePool() {
      return this.numberWithCommas(this.tokenPool / this.ecioRate);
    },
    currentLotLabel() {
      return "SPECIAL LOT";
    },
    receiveECIO() {
      return this.numberWithCommas(this.busdInput / this.ecioRate);
    }
  },
  created() {
    this.connectWallet().then(() => {
      this.loadAccountBalance();
      this.loadBUSDAvailable();
      this.allowance();
      this.hasPresalePermission();
    });
  },
  methods: {
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
              decimals: 18
            },
            blockExplorerUrls: [process.env.VUE_APP_BLOCK_EXPLORER]
          }
        ]
      });
    },
    async connectWallet() {
      this.switchNetwork();
      await window.ethereum.request({
        method: "eth_requestAccounts"
      });
    },
    claimHandler() {
      window.location = "/claim-token";
    },
    swapHandler() {
      this.loadConnect().then(() => {
        var value = Web3.utils.toWei(
          Web3.utils.toBN(this.busdInput).toString(),
          "ether"
        );
        this.presaleContract.methods
          .buyPresale(window.ethereum.selectedAddress, value)
          .send({ from: window.ethereum.selectedAddress })
          .on("receipt", function() {
            // alert("Done");
            window.location = "?";
            this.isSwapProcessing = false;
          })
          .on("sent", function() {
            this.isSwapProcessing = true;
          })
          .on("transactionHash", function(data) {
            this.isSwapProcessing = true;
            console.log(data);
            this.swapHash = data;
          })
          .on("error", function() {
            this.isSwapProcessing = false;
          });
      });
    },
    approveHandler() {
      this.loadConnect().then(() => {
        var value = Web3.utils.toWei(Web3.utils.toBN(200).toString(), "ether");

        this.BUSDContract.methods
          .approve(process.env.VUE_APP_PRESALE_CONTRACT_ADDRESS_V2, value)
          .send({ from: window.ethereum.selectedAddress })
          .on("receipt", function() {
            // console.log("receipt");
            // console.log(data);
            this.isApproveProcessing = false;
            window.location = "?";
            // window.location = "/registered";
            // that.$router.push({
            //   path: "/registered",
            //   query: { tid: that.transactionHash }
            // });
          })
          .on("sent", function() {
            this.isApproveProcessing = true;
          })
          .on("transactionHash", function(data) {
            this.approveHash = data;
            //that.isProcessing = true;
            console.log(data);
            // that.transactionHash = data;
            this.isApproveProcessing = true;
          })
          .on("confirmation", function() {
            //console.log("confirmation");
            //console.log(data);
          })
          .on("error", function() {
            this.isApproveProcessing = false;
            //that.isProcessing = false;
          });
      });
    },

    numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    async loadTokenAvailable() {
      this.loadConnect().then(() => {
        this.presaleContract.methods
          .accountBalances(window.ethereum.selectedAddress)
          .call()
          .then(results => {
            let busd = Web3.utils.fromWei(results, "ether");
            this.ecioBalance = busd / 0.004;
            this.tokenAvailable = busd;
          });
      });
    },
    async loadTokenOfLot(lotId) {
      this.loadConnect().then(() => {
        this.presaleContract.methods
          .tokenPerLot(lotId)
          .call()
          .then(results => {
            this.tokenOfLot = Web3.utils.fromWei(results, "ether");
            console.log("tokenOfLot:", this.tokenOfLot);
          });
      });
    },
    async loadTokenPool(lotId) {
      this.loadConnect().then(() => {
        this.presaleContract.methods
          .lotsTokenPool(lotId)
          .call()
          .then(results => {
            let value = Web3.utils.fromWei(results, "ether");
            this.tokenPool = value;
            console.log("tokenPool:", this.tokenPool);
          });
      });
    },
    async loadAccountBalance() {
      this.loadConnect().then(() => {
        this.presaleContract.methods
          .accountBalances(window.ethereum.selectedAddress)
          .call()
          .then(results => {
            let busd = Web3.utils.fromWei(results, "ether");
            this.ecioBalance = busd / 0.004;
            this.currentUserQuota = 200 - busd;
          });
      });
    },
    async loadBUSDAvailable() {
      this.loadConnect().then(() => {
        this.BUSDContract.methods
          .balanceOf(window.ethereum.selectedAddress)
          .call()
          .then(results => {
            var floatValue = Web3.utils.fromWei(results, "ether");
            this.busdBalance = parseInt(floatValue);
          });
      });
    },
    async allowance() {
      this.loadConnect().then(() => {
        this.BUSDContract.methods
          .allowance(
            window.ethereum.selectedAddress,
            process.env.VUE_APP_PRESALE_CONTRACT_ADDRESS_V2
          )
          .call()
          .then(results => {
            var value = Web3.utils.fromWei(results, "ether");
            console.log("allowance:", value);
            this.hasApproved = value !== "0";
          });
      });
    },

    async hasPresalePermission() {
      this.loadConnect().then(() => {
        this.presaleContract.methods
          .lotId(window.ethereum.selectedAddress)
          .call()
          .then(results => {
            if (results == 0) {
              window.location = "/access-denied";
            }
            this.userLotId = results;
            this.loadTokenPool(this.userLotId);
            this.loadTokenOfLot(this.userLotId);
          });
      });
    },

    maxButtonHandler() {
      if (this.busdBalance >= this.currentUserQuota - this.tokenAvailable) {
        this.busdInput = this.currentUserQuota - this.tokenAvailable;
      } else {
        this.busdInput = this.busdBalance;
      }
    },
    isNumber: function(evt) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      console.log(charCode);
      if (charCode < 48 || charCode > 57) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
    async loadConnect() {
      window.web3 = new Web3(window.ethereum);
      this.presaleContract = await new window.web3.eth.Contract(
        PresaleABI.abi,
        process.env.VUE_APP_PRESALE_CONTRACT_ADDRESS_V2
      );
      this.BUSDContract = await new window.web3.eth.Contract(
        ERC20TokenABI.abi,
        process.env.VUE_APP_BUSD_TOKEN_CONTRACT_ADDRESS
      );
    }
  }
};
</script>

<style>
.progress-horizontal__progress {
  background: #e0fb16;
  border-radius: 0px;
}
.imagebg .progress-horizontal__bar {
  background: rgba(20, 20, 20, 0.2);
  border: none;
  border: solid 1px #e0fb16;
  border-radius: inherit;
}
.btn:not(:last-child) {
  margin-bottom: 0px !important;
}

.glow-on-hover {
  width: 100%;
  height: 21px;
  border: none;
  outline: none;
  color: #fff;
  background: #111;
  cursor: pointer;
  position: relative;
  z-index: 0;
  border-radius: 10px;
}

.glow-on-hover:before {
  content: "";
  background: linear-gradient(
    45deg,
    #00ff43,
    #c3ff00,
    #fffb00,
    #48ff00,
    #00ffd5,
    #0084ff,
    #3fb5b5,
    #8bc34a,
    #4caf50
  );
  position: absolute;
  top: -2px;
  left: -2px;
  background-size: 400%;
  z-index: -1;
  filter: blur(5px);
  width: calc(100% + 4px);
  height: calc(100% + 4px);
  animation: glowing 20s linear infinite;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  border-radius: 0px;
}

/* .glow-on-hover:active {
  color: #000;
} */

/* .glow-on-hover:active:after {
  background: transparent;
} */

.glow-on-hover:before {
  opacity: 1;
}

.glow-on-hover:after {
  z-index: -1;
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  background: #111;
  left: 0;
  top: 0;
  border-radius: 0px;
}

@keyframes glowing {
  0% {
    background-position: 0 0;
  }
  50% {
    background-position: 400% 0;
  }
  100% {
    background-position: 0 0;
  }
}
.k-progress-outer {
  padding: 0px !important;
}
.k-progress {
  margin: 0 !important;
}

.k-progress-outer-line-success {
  border-radius: 0px !important;
}
.k-progress-outer-line-success {
  background: #c4e305 !important;
}
.k-progress-outer-bg-border {
  background: #000 !important;
  border: none !important;
}
</style>
