<template>
  <div class="">
    <div class="main-container">
      <section
        class="cover cover-features  imagebg   text-center  "
        data-overlay="4"
      >
        <div class="background-image-holder background-top ">
          <img alt="background" src="../../assets/images/bg-whitelist.jpg" />
        </div>

        <step1 v-if="step === 1" @dataStep1="handleNextStep" />
        <step2 v-else-if="step === 2" @dataStep2="handleNextStep" />
        <step3 v-else-if="step === 3" @dataStep3="handleNextStep" />
      </section>
    </div>

    <section class="text-center">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-10 col-lg-8">
            <h1 class="title-whitelist">Whitelist and Presale</h1>
            <p class="lead"></p>
          </div>
        </div>
        <!--end of row-->

        <div class="container mt-10">
          <div class="row">
            <div class="col-md-12">
              <ul class="process-stepper clearfix" data-process-steps="6">
                <li class="active">
                  <h1 class="text-center">Preparation</h1>

                  <img
                    v-if="step === 1"
                    src="../../assets/images/master-star.png"
                    width="100"
                    class="text-center m-auto"
                  />

                  <span class="badge-date" :class="{ active: step === 1 }"
                    >Sep 21, 11:00:00 PM</span
                  >
                </li>
                <li :class="{ active: step >= 2 }">
                  <h1>Whitelist</h1>
                  <img
                    v-if="step === 2"
                    src="../../assets/images/master-star.png"
                    width="100"
                    class="text-center m-auto"
                  />
                  <span class="badge-date" :class="{ active: step === 2 }"
                    >Sep 21, 11:00:00 PM</span
                  >
                </li>
                <li :class="{ active: step >= 3 }">
                  <h1>Announcement</h1>
                  <img
                    v-if="step === 3"
                    src="../../assets/images/master-star.png"
                    width="100"
                    class="text-center m-auto"
                  />
                  <span class="badge-date" :class="{ active: step === 3 }"
                    >Sep 21, 11:00:00 PM</span
                  >
                </li>
                <li>
                  <h1>Presale 1st</h1>
                  <span class="badge-date">Sep 21, 11:00:00 PM</span>
                </li>
                <li>
                  <h1>Presale 2st</h1>
                  <span class="badge-date">Sep 21, 11:00:00 PM</span>
                </li>
                <li>
                  <h1>IDO and Claim {{myRefferalScore}}</h1>
                  <span class="badge-date">Sep 21, 11:00:00 PM</span>
                </li>
              </ul>
            </div>
          </div>
          <!--end of row-->
        </div>
      </div>
      <!--end of container-->
    </section>

    <section class="bg--secondary">
      <step1 v-if="step === 1" @dataStep1="handleNextStep" />
      <step2 v-else-if="step === 2" @register="registerHandler" />
      <step3
        :refferalScore="myRefferalScore"
        v-else-if="step === 3"
        @dataStep3="handleNextStep"
      />
      <!-- <div class="container mt-32 text-center" v-if="step < 3">
        <a class="btn btn--primary purple type--uppercase " href="#">
          <span class="btn__text" @click="nextStep()">
            {{ textStep() }}
          </span>
        </a>
      </div> -->
    </section>
  </div>
</template>

<script>
import step1 from "./whitelist/step1.vue";
import step2 from "./whitelist/step2.vue";
import step3 from "./whitelist/step3.vue";
import Web3 from "web3";
import ABI from "./../../contracts/EcioWhitelist.json";
export default {
  data() {
    return {
      currentActivityId: 1,
      step: 1,
      contract: undefined,
      contractAddress: "0xc309FcBeDF739555E116a6915Bc0a8583D96c66D",
      walletAccount: "",
      isProcessing: false,
      myRefferalScore: 0,
      hasRegisterActivity: false,
    };
  },
  components: {
    step1,
    step2,
    step3,
  },
  mounted() {
    var that = this;
    window.ethereum.on("accountsChanged", function () {
      that.connectWallet();
      that.loadContract();
      that.hasRegister(window.ethereum.selectedAddress);
      that.getReferralScore(window.ethereum.selectedAddress);
    });

    window.ethereum.on("chainChanged", () => {
      that.connectWallet();
      that.loadContract();
      that.hasRegister(window.ethereum.selectedAddress);
      that.getReferralScore(window.ethereum.selectedAddress);
    });

    that.connectWallet();
    that.loadContract();
    that.hasRegister(window.ethereum.selectedAddress);
    that.getReferralScore(window.ethereum.selectedAddress);
  },
  methods: {
    async getReferralScore(address) {
      var that = this;
      await this.contract.methods
        .referralScore(that.currentActivityId, address)
        .call()
        .then((results) => {
          alert(results)
          that.myRefferalScore = parseInt(results);
        });
    },
    async hasRegister(address) {
      var that = this;
      await this.contract.methods
        .hasRegister(that.currentActivityId, address)
        .call()
        .then((results) => {
          that.hasRegisterActivity = results;
        });
    },
    handleNextStep(value) {
      console.log(value); // someValue
      this.step = value.step;
    },

    nextStep() {
      switch (this.step) {
        case 1:
          this.step = 2;
          break;
        case 2:
          this.step = 3;
          break;

        default:
          break;
      }
    },
    registerHandler() {
      this.ReceiveAirDrop();
    },
    onChildClick(value) {
      console.log(value);
    },
    async ReceiveAirDrop() {
      this.isProcessing = true;

      var ref = localStorage.getItem("ref");

      if (ref == undefined || ref == "") {
        ref = "0x0000000000000000000000000000000000000000";
      }

      console.log(this.contract);
      var that = this;
      // await this.contract.methods
      //   .registerWhitelist(1, ref)
      //   .estimateGas({ from: this.walletAccount })
      //   .then(function(gasAmount) {
      //     console.log(gasAmount);
      //   })
      //   .catch(function(error) {
      //     console.log(error);
      //     that.isProcessing = false;
      //   });

      await this.contract.methods
        .registerWhitelist(this.currentActivityId, ref)
        .send({ from: this.walletAccount })
        .on("receipt", function (data) {
          console.log("receipt");
          console.log(data);
          that.step = 3;
          // that.isSuccess = true;
          // that.$router.push({
          //   path: "/referral",
          //   query: { tid: that.transactionHash }
          // });
        })
        .on("sent", function (data) {
          console.log(data);
        })
        .on("transactionHash", function (data) {
          console.log(data);
          // that.transactionHash = data;
        })
        .on("confirmation", function (data) {
          //console.log("confirmation");
          console.log(data);
        })
        .on("error", function (data) {
          console.log(data);
          that.isProcessing = false;
        });
    },

    async loadContract() {
      //เชื่อม mataMask กับ Web3
      window.web3 = new Web3(window.ethereum);

      //สร้าง Instance ของ Contract ด้วย ABI และ address ของ contract ที่ Deploy ไปแล้ว
      this.contract = new window.web3.eth.Contract(
        ABI.abi,
        this.contractAddress
      );
      console.log(this.contract);
    },
    async connectWallet() {
      if (this.validated()) {
        this.switchNetwork();

        await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        console.log(window.ethereum.selectedAddress);
        this.walletAccount = window.ethereum.selectedAddress;
        this.loadContract();
      }
    },
    validated() {
      if (typeof window.ethereum !== "undefined") {
        console.log("MetaMask is installed!");
        return true;
      }

      return false;
    },
    async switchNetwork() {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
      });

      // await window.ethereum.request({
      //   method: "wallet_addEthereumChain",
      //   params: [
      //     {
      //       chainId: "0x38",
      //       chainName: "BSCMAINET",
      //       rpcUrls: ["https://bsc-dataseed1.binance.org"],
      //       nativeCurrency: {
      //         name: "BINANCE COIN",
      //         symbol: "BNB",
      //         decimals: 18
      //       },
      //       blockExplorerUrls: ["https://bscscan.com/"]
      //     }
      //     // {
      //     //   chainId: "80001",
      //     //   chainName: "Poligon Testnet",
      //     //   rpcUrls: ["https://rpc-mumbai.maticvigil.com"],
      //     //   nativeCurrency: {
      //     //     name: "MATIC",
      //     //     symbol: "MATIC",
      //     //     decimals: 18,
      //     //   },
      //     //   blockExplorerUrls: ["https://mumbai-explorer.matic.today/"],
      //     // },
      //   ]
      // });
    },
  },
};
</script>
<style>
.process-stepper {
  font-size: 1.3rem;
  color: #333;
}
.background-image-holder.background-top {
  background-position: top !important;
}
.feature__body h1 {
  font-size: 1.5rem;
  text-align: center;
}
.icon-Duplicate-Window,
.feature.feature-1 {
  text-align: center;
}
.feature.feature-1 .icon {
  line-height: 1em;
  font-size: 4em;
  margin-bottom: 30px;
}
.badge-date {
  background: #d5d5d5;
  padding: 2px 10px;
  border-radius: 5px;
  color: #fff;
  font-size: 1rem;
  border: solid 2px #eee;
}
.badge-date.active {
  background: #98088e;
}
.process-stepper > li > h1 {
}
.btn--primary.purple {
  background: #e0fb16;
  border-color: #e0fb16;
  color: #000000 !important;
}
.process-stepper > li.active:before,
.process-stepper > li.active:after {
  background: #e0fb16;
}
.imagebg:not(.image--light) span {
  color: #000;
}
</style>
