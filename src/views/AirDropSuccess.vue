<template>
  <div>
    <div
      :style="{
        'background-image': 'url(' + require('../assets/images/bg.png') + ')'
      }"
      class="
        min-w-screen
        h-screen
        animated
        fadeIn
        faster
        fixed
        left-0
        top-0
        flex
        justify-center
        items-center
        inset-0
        z-50
        outline-none
        focus:outline-none
        bg-no-repeat bg-center bg-cover
      "
      id="modal-id"
    >
      <div class="absolute bg-black opacity-30 inset-0 z-0"></div>
      <div
        class="
          w-full
          max-w-lg
          p-5
          relative
          mx-auto
          my-auto
          rounded-xl
          shadow-lg
          bg-white
        "
      >
        <!--content-->
        <div class="">
          <!--body-->
          <div class="text-center p-5 flex-auto justify-center">
            <!-- <img  class="justify-center" src="data:image/png;base64,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">
             -->

            <h2 class="text-xl font-bold py-4">
              You received a Common Box NFT airdrop!
            </h2>
            <p class="text-sm text-gray-500 px-8">
              You can keep this NFT to redeem rewards in the next event.
            </p>
          </div>
          <!--footer-->
          <div class="p-3 mt-2 text-center space-x-4 md:block">
            <a
              target="_blank"
              :href="tid"
              class="
                mb-2
                md:mb-0
                bg-white
                px-5
                py-2
                text-sm
                shadow-sm
                font-medium
                tracking-wider
                border
                text-gray-600
                rounded-full
                hover:shadow-lg
                hover:bg-gray-100
              "
            >
              View Transaction
            </a>
            <a
              href="https://opensea.io/account"
              class="
                mb-2
                md:mb-0
                bg-yellow-400
                border border-yellow-400
                px-5
                py-2
                text-sm
                shadow-sm
                font-medium
                tracking-wider
                text-white
                rounded-full
                hover:shadow-lg
                hover:bg-yellow-400
              "
            >
              View Your NFTs
            </a>
          </div>

          <div class="p-3 mt-2 text-center space-x-4 md:block">
            <p class="text-sm text-gray-500 px-8">
              You referral links to your friend to promote rewards.
            </p>
            <input
              v-model="currentAddress"
              class="
                mb-2
                md:mb-0
                bg-white
                px-5
                py-2
                text-sm
                shadow-sm
                font-medium
                tracking-wider
                border
                text-gray-600
                rounded-full
                hover:shadow-lg
                hover:bg-gray-100
              "
            />

            <button
              type="button"
              v-clipboard:copy="currentAddress"
              v-clipboard:success="onCopy"
              class="
                mb-2
                md:mb-0
                bg-yellow-400
                border border-yellow-400
                px-5
                py-2
                text-sm
                shadow-sm
                font-medium
                tracking-wider
                text-white
                rounded-full
                hover:shadow-lg
                hover:bg-yellow-400
              "
            >
              Copy
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import ncrypt from "ncrypt-js";
import Web3 from "web3";
import ABI from "./../contracts/EcioAirDrop.json";
export default {
  created() {
    // this.tid = "https://polygonscan.com/tx/" + this.$route.query.tid; //Polygon
    this.tid = "https://bscscan.com/tx/" + this.$route.query.tid; //BSC
  },
  data() {
    return {
      tid: "",
      referralLink: "",
      cards: [],
      contractAddress: "0x0BDF643161E49f51158fd3bB43B0AbB2176B6B74",
      walletAddress: "",
      error: {
        hasMetaMask: true,
        isReceived: false,
        isMaticNetwork: true
      }
    };
  },
  computed: {
    currentAddress() {
      // var { encodeData} = new ncrypt("ecio");
      // const encrypt =  encodeData(this.walletAddress);
      return "https://ecio.space?ref=" + this.walletAddress;
    }
  },
  mounted() {
    var that = this;
    console.log(this.isHaveMetaMask());
    console.log(this.isMetaMask());
    if (this.isHaveMetaMask() && this.isMetaMask()) {
      //รอฟังการเปลี่ยน account
      window.ethereum.on("accountsChanged", function(accounts) {
        console.log("accountsChanged");
        if (accounts.length == 0) {
          this.error.isMaticNetwork = true;
        } else {
          that.walletAddress = accounts[0];
          that.loadContract();
        }
      });

      window.ethereum.on("chainChanged", _chainId => {
        console.log("chainChanged");
        console.log(_chainId);
        this.loadContract();
      });

      this.loadContract();
    }
  },
  methods: {
    onCopy() {
      alert("Copied");
    },
    balanceOfNFTs(address) {
      var that = this;
      this.airdropNFTContract.methods
        .balanceOf(address, 0)
        .call()
        .then(results => {
          that.cards = [];
          for (let index = 0; index < parseInt(results); index++) {
            that.cards.push({
              id: "#" + index,
              name: "Common Box NFT #" + index,
              image: "../assets/cards/0.png"
            });
          }

          that.numberOfCommonBox = parseInt(results);
        });
    },
    //ตรวจสอบว่ามี Wallet หรือไม่
    isHaveMetaMask() {
      return typeof window.ethereum !== "undefined";
    },

    //ตรวจสอบว่า Wallet ที่มีเป็น MetaMask ไหม
    isMetaMask() {
      return window.ethereum.isMetaMask;
    },
    validateChain(_chainId) {
      return _chainId == "0x386" || _chainId == "56"; //BSC
    },
    async loadContract() {
      var that = this;

      //เชื่อม mataMask กับ Web3
      window.web3 = new Web3(window.ethereum);

      await window.ethereum
        .request({ method: "eth_chainId" })
        .then(_chainId => {
          this.error.isMaticNetwork = that.validateChain(_chainId);
        });

      //

      if (this.error.isMaticNetwork) {
        this.walletAddress = window.ethereum.selectedAddress;
        //สร้าง Instance ของ Contract ด้วย ABI และ address ของ contract ที่ Deploy ไปแล้ว
        this.airdropNFTContract = new window.web3.eth.Contract(
          ABI.abi,
          this.contractAddress
        );

        // this.setupEvent();
        this.balanceOfNFTs(this.walletAddress);
      } else {
        this.clear();
      }
    }
  }
};
</script>
