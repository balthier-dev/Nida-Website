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
              src="../../../assets/images/progress3.png"
              style="max-width: 600px; width: 100%; padding: 20px"
            />
            <div class="col-md-10 col-lg-8">
              <h1 class="title-whitelist mt-10">Presale UNLOCK CONDITION</h1>
              <p class="lead"></p>
            </div>
          </div>

          <div class="row mt-5">
            <div class="col-md-4">
              <div class="feature feature-1 boxed boxed--border">
                <div class="feature__body condition">
                  <h1>20 DEC 2021, 14.00 UTC</h1>
                  <p>20%</p>
                  <p>{{ numberWithCommas(amountPeriod1) }} ECIO</p>
                  <button  @click="claimTokenHandler(1)" class="btn btn-ecio mt-4 text-dark" :disabled="!isbuttonPeriod1Enabled || amountPeriod1==0" >CLAIM</button>
                </div>
              </div>
              <!--end feature-->
            </div>
            <div class="col-md-4">
              <div class="feature feature-1 boxed boxed--border">
                <div class="feature__body condition">
                  <h1>20 JAN 2022, 14.00 UTC</h1>
                  <p>16%</p>
                  <p>{{ numberWithCommas(amountPeriod2) }} ECIO</p>
                  <button @click="claimTokenHandler(2)" class="btn btn-ecio mt-4 text-dark" :disabled="!isbuttonPeriod2Enabled || amountPeriod2==0" >CLAIM</button>
                </div>
              </div>
              <!--end feature-->
            </div>
            <div class="col-md-4">
              <div class="feature feature-1 boxed boxed--border">
                <div class="feature__body condition">
                  <h1>20 FEB 2022, 14.00 UTC</h1>
                  <p>16%</p>
                  <p>{{ numberWithCommas(amountPeriod3) }} ECIO</p>
                  <button @click="claimTokenHandler(3)" class="btn btn-ecio mt-4 text-dark" :disabled="!isbuttonPeriod3Enabled || amountPeriod3==0 ">CLAIM</button>
                </div>
              </div>
            </div>

          </div>

          <div class="row mt-4">
            <div class="col-md-4">
              <div class="feature feature-1 boxed boxed--border">
                <div class="feature__body condition">
                  <h1>20 MAR 2022, 14.00 UTC</h1>
                  <p>16%</p>
                  <p>{{ numberWithCommas(amountPeriod4) }} ECIO</p>
                  <button @click="claimTokenHandler(4)" class="btn btn-ecio mt-4 text-dark" :disabled="!isbuttonPeriod4Enabled || amountPeriod4==0">CLAIM</button>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="feature feature-1 boxed boxed--border">
                <div class="feature__body condition">
                  <h1>20 APR 2022, 14.00 UTC</h1>
                  <p>16%</p>
                  <p>{{ numberWithCommas(amountPeriod5) }} ECIO</p>
                  <button @click="claimTokenHandler(5)" class="btn btn-ecio mt-4 text-dark" :disabled="!isbuttonPeriod5Enabled || amountPeriod5==0">CLAIM</button>
                </div>
              </div>
            </div>

            <div class="col-md-4">
              <div class="feature feature-1 boxed boxed--border">
                <div class="feature__body condition">
                  <h1>20 MAY 2022, 14.00 UTC</h1>
                  <p>16%</p>
                  <p>{{ numberWithCommas(amountPeriod6) }} ECIO</p>
                  <button @click="claimTokenHandler(6)" class="btn btn-ecio mt-4 text-dark" :disabled="!isbuttonPeriod6Enabled || amountPeriod6==0">CLAIM</button>
                </div>
              </div>
            </div>
          </div>

          <div class="row mt-4">
            <div class="col-md-12">
              <h1 class="mt-10 text-lot">YOUR REMAINING TOKENS</h1>
              <div class="box-lot">
                {{ numberWithCommas(totalEcioBalance) }} ECIO
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import Web3 from "web3";
import claimTokenContractABI from "./../../../contracts/ClaimToken.json";

export default {
  computed: {
    totalEcioBalance(){
      return parseInt(this.amountPeriod1) + parseInt(this.amountPeriod2)+ parseInt(this.amountPeriod3)+ parseInt(this.amountPeriod4)+ parseInt(this.amountPeriod5)+ parseInt(this.amountPeriod6);
    }
  },
  created() {
     setInterval(()=>{
       this.connectWallet().then(() => {
       this.getEcioAmountByPeriod();
       this.getClaimAvailableByPeriod();
       console.log("11")
    });
     }
     ,2000)
    
  },
  data() {
    return {
      claimTokenContract: undefined,
      amountPeriod1: 0,
      amountPeriod2: 0,
      amountPeriod3: 0,
      amountPeriod4: 0,
      amountPeriod5: 0,
      amountPeriod6: 0,
      isbuttonPeriod1Enabled: false,
      isbuttonPeriod2Enabled: false,
      isbuttonPeriod3Enabled: false,
      isbuttonPeriod4Enabled: false,
      isbuttonPeriod5Enabled: false,
      isbuttonPeriod6Enabled: false
    };
  },
  components: {},

  methods: {

    claimTokenHandler(periodId){
       this.loadConnect().then(() => {
        this.claimTokenContract.methods
          .claimECIOToken(periodId)
          .send({ from: window.ethereum.selectedAddress })
          .on("receipt", function() {
           
          })
          .on("sent", function() {
        
          })
          .on("transactionHash", function() {
          
          })
          .on("confirmation", function() {
           
          })
          .on("error", function() {
           
          });
      });
    },
    getClaimAvailableByPeriod(){

      this.loadConnect().then(() => {
        this.claimTokenContract.methods
          .checkIsAvailable(1)
          .call()
          .then((results) => {
             this.isbuttonPeriod1Enabled = results;
          });
      });

      this.loadConnect().then(() => {
        this.claimTokenContract.methods
          .checkIsAvailable(2)
          .call()
          .then((results) => {
             this.isbuttonPeriod2Enabled = results;
          });
      });

      this.loadConnect().then(() => {
        this.claimTokenContract.methods
          .checkIsAvailable(3)
          .call()
          .then((results) => {
             this.isbuttonPeriod3Enabled = results;
          });
      });

      this.loadConnect().then(() => {
        this.claimTokenContract.methods
          .checkIsAvailable(4)
          .call()
          .then((results) => {
             this.isbuttonPeriod4Enabled = results;
          });
      });

      this.loadConnect().then(() => {
        this.claimTokenContract.methods
          .checkIsAvailable(5)
          .call()
          .then((results) => {
             this.isbuttonPeriod5Enabled = results;
          });
      });

      this.loadConnect().then(() => {
        this.claimTokenContract.methods
          .checkIsAvailable(6)
          .call()
          .then((results) => {
             this.isbuttonPeriod6Enabled = results;
          });
      });

    },
    getEcioAmountByPeriod(){
  
      //1
      this.loadConnect().then(() => {
        this.claimTokenContract.methods
          .ecioAmountByPeriod(window.ethereum.selectedAddress, 1)
          .call()
          .then((results) => {
             this.amountPeriod1 = Web3.utils.fromWei(results, "ether");
          });
      });

      //2
      this.loadConnect().then(() => {
        this.claimTokenContract.methods
          .ecioAmountByPeriod(window.ethereum.selectedAddress, 2)
          .call()
          .then((results) => {
             this.amountPeriod2 = Web3.utils.fromWei(results, "ether");
          });
      });

      //3
      this.loadConnect().then(() => {
        this.claimTokenContract.methods
          .ecioAmountByPeriod(window.ethereum.selectedAddress, 3)
          .call()
          .then((results) => {
             this.amountPeriod3 = Web3.utils.fromWei(results, "ether");
          });
       });

      //4
      this.loadConnect().then(() => {
        this.claimTokenContract.methods
          .ecioAmountByPeriod(window.ethereum.selectedAddress, 4)
          .call()
          .then((results) => {
             this.amountPeriod4 = Web3.utils.fromWei(results, "ether");
          });
       });

      //5
      this.loadConnect().then(() => {
        this.claimTokenContract.methods
          .ecioAmountByPeriod(window.ethereum.selectedAddress, 5)
          .call()
          .then((results) => {
             this.amountPeriod5 = Web3.utils.fromWei(results, "ether");
          });
       });

      //6
      this.loadConnect().then(() => {
        this.claimTokenContract.methods
          .ecioAmountByPeriod(window.ethereum.selectedAddress, 6)
          .call()
          .then((results) => {
             this.amountPeriod6 = Web3.utils.fromWei(results, "ether");
          });
       });
    },

    // presaleContractAddress(walletAddress) {
    //   for (let i = 0; i < this.lot4Accounts.length; i++) {
    //     const account = this.lot4Accounts[i];
    //     if(account.toUpperCase()===walletAddress.toUpperCase()){
    //       console.log("VUE_APP_PRESALE_CONTRACT_ADDRESS_V2")
    //       return process.env.VUE_APP_PRESALE_CONTRACT_ADDRESS_V2;
    //     }
    //   }
    //   console.log("VUE_APP_PRESALE_CONTRACT_ADDRESS")
    //   return process.env.VUE_APP_PRESALE_CONTRACT_ADDRESS;
    // },

    numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },

    // async loadAccountBalances() {
    //   this.loadConnect().then(() => {
    //     this.presaleContract.methods
    //       .accountBalances(window.ethereum.selectedAddress)
    //       .call()
    //       .then((results) => {
    //         let busd = Web3.utils.fromWei(results, "ether");
    //         this.ecioBalance = busd / 0.002;
    //       });
    //   });
    // },

    async loadConnect() {
      window.web3 = new Web3(window.ethereum);
      this.claimTokenContract = await new window.web3.eth.Contract(
        claimTokenContractABI.abi,
        process.env.VUE_APP_CLAIM_TOKEN_CONTRACT
      );
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
    async connectWallet() {
      await this.switchNetwork();
      await window.ethereum.request({
        method: "eth_requestAccounts",
      });
    },
  },
};
</script>

<style>
.feature__body.condition p {
  font-size: 1.5rem !important;
}
</style>
