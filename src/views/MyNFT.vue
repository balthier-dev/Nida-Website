<template>
  <div
    :style="{
      'background-image': 'url(' + require('../assets/images/bg-2.png') + ')'
    }"
    class="
        min-w-screen
        h-screen
       
        bg-no-repeat bg-center bg-cover
      "
    id="modal-id"
  >
    <header class="text-green-100 body-font">
      <div
        class="
          container
          mx-auto
          flex flex-wrap
          p-5
          flex-col
          md:flex-row
          items-center
        "
      >
        <a
          class="
            flex
            title-font
            font-medium
            items-center
            text-green-100
            mb-4
            md:mb-0
          "
        >
          <svg
            width="60"
            height="50"
            viewBox="0 0 110 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.18545 14.6314H22.8864L25.4891 12.0266H35.9807L38.5855 14.6314L40.9503 16.9942L46.6578 22.7037L49.7565 25.8004L50.0307 26.0766V35.6872L45.4139 40.304L35.7207 49.9992L34.0433 49.9972V43.32L34.13 43.2333L35.7207 41.6426V33.5905L38.4303 30.8829L33.7792 26.2318H12.7879L7.09454 20.5384H4.72163L0 15.8168L1.18545 14.6314Z"
              fill="#2D0860"
            />
            <path
              d="M108.781 14.6314H87.0802L84.4774 12.0266H73.9858L71.381 14.6314L69.0162 16.9942L63.3087 22.7037L60.21 25.8004L59.9358 26.0766V35.6872L64.5526 40.304L74.2459 49.9992L75.9232 49.9972V43.32L75.8365 43.2333L74.2459 41.6426V33.5905L71.5363 30.8829L76.1873 26.2318H97.1786L102.872 20.5384H105.245L109.967 15.8168L108.781 14.6314Z"
              fill="#2D0860"
            />
            <path
              d="M53.2727 19.9893H56.6939L64.9779 11.7073V8.28402L56.6939 0H53.2727L44.9886 8.28402V11.7053L53.2727 19.9893Z"
              fill="#2D0860"
            />
          </svg>

          <span class="ml-3 text-xl">My NFT Cards</span>
        </a>
        <nav
          class="
            md:ml-auto
            flex flex-wrap
            items-center
            text-base
            justify-center
          "
        >
          <a href="/" class="mr-5 hover:text-green-200">Home</a>
          <a
            href="https://opensea.io/collection/ecio-nft"
            class="mr-5 hover:text-green-200"
            >Opensea</a
          >
          <a href="#" class="mr-5 hover:text-green-200"
            >Wallet:{{ walletAddress }}</a
          >
        </nav>
      </div>
    </header>

    <section class="text-gray-600 body-font">
      <div class="container px-5 py-10 mx-auto">
        <div class="flex flex-wrap -m-4">
          <div
            v-for="card in cards"
            :key="card.id"
            class="lg:w-1/4 md:w-1/2 p-4 w-full"
          >
            <a class="block relative h-50 rounded overflow-hidden">
              <img
                class="object-cover object-center w-full h-full block"
                src="../assets/cards/0.png"
              />
            </a>
            <div class="mt-4">
              <h3
                class="text-green-100 text-xs tracking-widest title-font mb-1"
              >
                CATEGORY
              </h3>
              <h2 class="text-green-200 title-font text-lg font-medium">
                {{ card.name }}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Web3 from "web3";
import ABI from "./../contracts/EcioAirDrop.json";
export default {
  title: "ECIO - View NFT",
  methods: {
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
      return _chainId == "0x13881" || _chainId == "0x89";
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
  },
  data() {
    return {
      cards: [],
      contractAddress: "0xaf85a19F9474F293fd16ecDd0db9A39fEfb30fdd",
      walletAddress: "",
      error: {
        hasMetaMask: true,
        isReceived: false,
        isMaticNetwork: true
      }
    };
  },
  mounted() {
    var that = this;
    console.log(this.isHaveMetaMask());
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
  }
};
</script>
