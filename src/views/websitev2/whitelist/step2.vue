<template>
  <div class="main-container">
    <section
      class="cover cover-features  imagebg   text-center  height-100  "
      style="height: 100vh!important"
      data-overlay="4"
    >
      <div class="background-image-holder background-top ">
        <img alt="background" src="../../../assets/images/bg-whitelist.jpg" />
      </div>

      <div class="container mt-20">
        <div class="row justify-content-center">
          <img
            src="../../../assets/images/top-step3.png"
            style="max-width: 500px; width: 100%;padding: 20px;"
          />
          <div class="col-md-10 col-lg-8">
            <h1 class="title-whitelist mt-10">Referral Campaign has Ended</h1>
            <h1
              style="font-size: 2rem; margin: 20px 0; color: #E0FB16;    text-transform: uppercase;"
            >
              WHITELIST WINNERS WILL BE ANNOUNCED <br />
              09/29/2021 | 17.00 UTC
            </h1>

            <!-- <div class="timer">
              <div class="text-box">
                <Countdown
                  class=""
                  deadline="09/28/2021 23:00"
                  style="   margin-top: auto;
            "
                ></Countdown>
              </div>

              <img
                src="../../../assets/images/timer.png"
                style=" 
              display: block;
              height: auto;
              margin: auto;
              min-width: 400px;"
              />
            </div> -->

            <!-- <h1 class="sub-h1">
              500 Top Referrers Will Guarantee Presale
            </h1>

            <div class="row m-auto mt-10 pt-10" style="max-width: 700px;">
              <div class="col-md-9">
                <div class="feature__body">
                  <p class="title-ref">Your Referral code</p>

                  <div class="input-group">
                    <div class="input-group-area">
                      <input :value="referralLink" type="text" />
                    </div>
                    <div
                      style="cursor:pointer;"
                      v-clipboard:copy="referralLink"
                      v-clipboard:success="onCopy"
                      class="input-group-icon"
                    >
                      COPY
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-md-3">
                <div class="feature__body">
                  <p class="title-ref">your score</p>
                  <div class="box-score">
                    <span>{{ myRefferalScore }}</span>
                  </div>
                </div>
              </div>
            </div> -->

            <!-- <h1 class="sub-h1">
              top 500 ranker
            </h1>

            <div class="table-rank m-auto" style="max-width:700px;">
              <div class="row">
                <div class="col-md-4 col-4">
                  RANK
                </div>
                <div class="col-md-4 col-4">
                  USER
                </div>
                <div class="col-md-4 col-4">
                  POINT
                </div>
              </div>

              <div
                v-for="item in scoreTable"
                :key="item.rang"
                class="scroll-height"
              >
                <div class="rank-list m-auto">
                  <div class="row mt-2">
                    <div class="col-md-4 col-4 p-3">{{ item.rang }}</div>
                    <div class="col-md-4 col-4 p-3">
                      {{ item.account }}
                    </div>
                    <div class="col-md-4 col-4 p-3">{{ item.score }}</div>
                  </div>
                </div>
              </div>
            </div>

            <p class="title-ref text-center mt-10">
              The first 500 participants and top 500 highest referral will be
              guaranteed for Presale. For the rest participants, 1,000 lucky
              address will be granted Presale by lucky drawn.
            </p> -->
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import Web3 from "web3";
import ABI from "./../../../contracts/EcioWhitelist.json";
export default {
  components: {},
  data() {
    return {
      tables: [],
      email: "",
      country: "",
      validateError: false,
      currentActivityId: 1,
      step: 1,
      contract: undefined,
      contractAddress: "0x727BC2946fC83cC82e456a23f0C53f3f692645A8",
      walletAccount: "",
      isProcessing: false,
      myRefferalScore: 0,
      hasRegisterActivity: false
    };
  },
  computed: {
    referralLink() {
      const encryptedText = this.CryptoJS.AES.encrypt(
        this.walletAccount,
        "mzHfUfUyyuFK9kJwxr9Qv"
      ).toString();
      return "https://ecio.space?ref=" + encodeURIComponent(encryptedText);
    },
    scoreTable() {
      return this.sortRanking();
    }
  },
  mounted() {
    var that = this;
    window.ethereum.on("accountsChanged", function() {
      that.connectWallet();
      that.loadContract();
      that.hasRegister(window.ethereum.selectedAddress);
      that.getReferralScore(window.ethereum.selectedAddress);
      that.getAllRegister(that.currentActivityId);
    });

    window.ethereum.on("chainChanged", () => {
      that.connectWallet();
      that.loadContract();
      that.hasRegister(window.ethereum.selectedAddress);
      that.getReferralScore(window.ethereum.selectedAddress);
      that.getAllRegister(that.currentActivityId);
    });

    that.connectWallet();
    that.loadContract();
    that.hasRegister(window.ethereum.selectedAddress);
    that.getReferralScore(window.ethereum.selectedAddress);
    that.getAllRegister(that.currentActivityId);
  },
  methods: {
    separator(numb) {
      var str = numb.toString().split(".");
      str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return str.join(".");
    },
    shortAddress(address) {
      return "".concat(address.substring(0, 10), "....", address.slice(-10));
    },
    sortRanking() {
      var data = [];
      data = this.tables.sort(function(a, b) {
        return b.count - a.count;
      });

      var rangList = [];
      for (let i = 0; i < data.length; i++) {
        const e = data[i];

        //console.log(window.ethereum.selectedAddress + "--" + e.account);
        if (
          window.ethereum.selectedAddress.toLowerCase() ==
          e.account.toLowerCase()
        ) {
          this.myRanking = i + 1;
        }

        rangList.push({
          rang: i + 1,
          account: this.shortAddress(e.account),
          score: this.separator(e.count)
        });
      }

      return rangList;
    },
    nextPage() {
      window.location = "/registered";
      // this.$router.push({
      //   path: "/registered"
      // });
    },
    nextStep() {
      if (this.email === "" || this.country === "") {
        this.validateError = true;
        return;
      }
      // const data = {
      //   email: this.email,
      //   country: this.country
      // };

      //console.log(data);
      window.location = "/registered";
    },
    registerHandler() {
      this.Register();
    },

    async Register() {
      this.isProcessing = true;

      var ref = localStorage.getItem("ref");

      if (ref == undefined || ref == "") {
        ref = "0x0000000000000000000000000000000000000000";
      }

      //console.log(this.contract);
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
        .on("receipt", function() {
          //console.log("receipt");
          //console.log(data);
          // that.$router.push({
          //   path: "/registered",
          //   query: { tid: that.transactionHash }
          // });

          window.location = "/registered";
        })
        .on("sent", function() {
          //console.log(data);
        })
        .on("transactionHash", function() {
          //console.log(data);
          // that.transactionHash = data;
        })
        .on("confirmation", function() {
          //console.log("confirmation");
          //console.log(data);
        })
        .on("error", function() {
          //console.log(data);
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
      // console.log(this.contract);
    },
    async connectWallet() {
      if (this.validated()) {
        this.switchNetwork();

        await window.ethereum.request({
          method: "eth_requestAccounts"
        });

        //console.log(window.ethereum.selectedAddress);
        this.walletAccount = window.ethereum.selectedAddress;
        this.loadContract();
      }
    },
    validated() {
      if (typeof window.ethereum !== "undefined") {
        //console.log("MetaMask is installed!");
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
    async getAllRegister() {
      var that = this;
      await this.contract.methods
        .getAllRegister(that.currentActivityId)
        .call()
        .then(data => {
          //console.log(data);
          for (let i = 0; i < data[1].length; i++) {
            that.tables.push({
              account: data[1][i],
              count: data[0][i]
            });
          }
        });
    },
    async getReferralScore(address) {
      var that = this;
      await this.contract.methods
        .referralScore(that.currentActivityId, address)
        .call()
        .then(results => {
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
    }
  }
};
</script>

<style></style>
