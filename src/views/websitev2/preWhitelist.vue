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

        <div class="container mt-20">
          <div class="row justify-content-center">
            <img
              src="../../assets/images/top-step1.png"
              style="max-width: 500px; width: 100%;padding: 20px;"
            />
            <div class="col-md-10 col-lg-8">
              <h1 class="title-whitelist mt-10">Join Ecio Presale Whitelist</h1>
              <p class="lead"></p>
            </div>
          </div>

          <div class="row mt-5">
            <div class="col-md-4">
              <div class="feature feature-1 boxed boxed--border">
                <div class="feature__body condition">
                  <h1>Presale Token</h1>
                  <span>rECIO</span>
                  <p>
                    A replicate version of ECIO token that can be claimed as
                    ECIO taken after IDO.
                  </p>
                </div>
              </div>
              <!--end feature-->
            </div>
            <div class="col-md-4">
              <div class="feature feature-1 boxed boxed--border">
                <div class="feature__body condition">
                  <h1>Presale Supply</h1>
                  <span>75M</span>
                  <p>
                    75M of the total supply will be distributed to 2,000 chosen
                    address.
                  </p>
                </div>
              </div>
              <!--end feature-->
            </div>
            <div class="col-md-4">
              <div class="feature feature-1 boxed boxed--border">
                <div class="feature__body condition ">
                  <h1>Presale Price</h1>
                  <span>$0.004</span>
                  <p>
                    15% off IDO price. One address can register up to maximum
                    50,000 token.
                  </p>
                </div>
              </div>
            </div>

            <div class="col-md-4">
              <div class="feature feature-1 boxed boxed--border">
                <div class="feature__body condition ">
                  <h1>25M Token for</h1>
                  <span>500</span>
                  <p>
                    Fisrt Registered Address Guarantee 50K token per address
                  </p>
                </div>
              </div>
            </div>

            <div class="col-md-4">
              <div class="feature feature-1 boxed boxed--border">
                <div class="feature__body condition ">
                  <h1>25M Token for</h1>
                  <span>500</span>
                  <p>
                    Top referral Address Guarantee 50K token per address
                  </p>
                </div>
              </div>
            </div>

            <div class="col-md-4">
              <div class="feature feature-1 boxed boxed--border">
                <div class="feature__body condition ">
                  <h1>25M Token for</h1>
                  <span>1000</span>
                  <p>
                    Lucky Draw Address First come, first served
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="row mt-20">
            <div class="col-md-12">
              <h1 style="font-size:2rem" class="mb-5">
                Pre-Sale Registration has been closed
              </h1>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import Web3 from "web3";
import ABI from "./../../contracts/EcioWhitelist.json";
export default {
  data() {
    return {
      currentActivityId: 0,
      step: 1,
      contract: undefined,
      contractAddress: "0x727BC2946fC83cC82e456a23f0C53f3f692645A8",
      walletAccount: "",
      isProcessing: false,
      myRefferalScore: 0,
      hasRegisterActivity: false
    };
  },
  components: {},

  methods: {
    registerHandler() {
      this.Register();
    },
    onChildClick(value) {
      console.log(value);
    },
    async Register() {
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
        .on("receipt", function(data) {
          console.log("receipt");
          console.log(data);
          that.step = 3;
          // that.isSuccess = true;
          // that.$router.push({
          //   path: "/referral",
          //   query: { tid: that.transactionHash }
          // });
        })
        .on("sent", function(data) {
          console.log(data);
        })
        .on("transactionHash", function(data) {
          console.log(data);
          // that.transactionHash = data;
        })
        .on("confirmation", function(data) {
          //console.log("confirmation");
          console.log(data);
        })
        .on("error", function(data) {
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
          method: "eth_requestAccounts"
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
        params: [
          {
            chainId: "0x38",
            chainName: "BSCMAINET",
            rpcUrls: ["https://bsc-dataseed1.binance.org"],
            nativeCurrency: {
              name: "BINANCE COIN",
              symbol: "BNB",
              decimals: 18
            },
            blockExplorerUrls: ["https://bscscan.com/"]
          }
          // {
          //   chainId: "80001",
          //   chainName: "Poligon Testnet",
          //   rpcUrls: ["https://rpc-mumbai.maticvigil.com"],
          //   nativeCurrency: {
          //     name: "MATIC",
          //     symbol: "MATIC",
          //     decimals: 18,
          //   },
          //   blockExplorerUrls: ["https://mumbai-explorer.matic.today/"],
          // },
        ]
      });
    },
    async getReferralScore(address) {
      var that = this;
      await this.contract.methods
        .referralScore(that.currentActivityId, address)
        .call()
        .then(results => {
          alert(results);
          that.myRefferalScore = parseInt(results);
        });
    },
    async hasRegister(address) {
      var that = this;
      await this.contract.methods
        .hasRegister(that.currentActivityId, address)
        .call()
        .then(results => {
          that.hasRegisterActivity = results;
        });
    },
    handleNextStep(value) {
      console.log(value); // someValue
      this.step = value.step;
    },
    textStep() {
      if (this.step === 1) {
        return "NEXT STEP";
      } else if (this.step === 2) {
        return "REGISTER";
      }
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
    }
  }
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
  background: #98098d;
}
.feature__body.condition h1 {
  font-size: 2rem;
  color: #e0fb16;
}
.feature__body.condition span {
  font-size: 3rem;
  font-weight: 300;
}
.feature__body.condition p {
  font-size: 1rem !important;
}

/deep/ iframe html {
  background: none !important;
}
html.enter {
  background-image: none !important;
}
.purple .btn__text {
  color: #000000 !important;
}
.box-score span {
  color: #000000 !important;
}
</style>
