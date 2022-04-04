<template>
  <div>
    <CardList
      ref="card"
      :loading="loading"
      :isOwner="true"
      :isSidebar="true"
      @filter="handleSearch"
      @setLoading="handleSetLoading"
      @handleResetFilter="fetchMarketPlaces"
      @transferred="handleTransferred"
      @canceled="handleCanceled"
    />

    <modal
      height="auto"
      :scrollable="true"
      :adaptive="true"
      class="backdrop"
      name="cautionMigrate"
      width="800"
    >
      <div class="bg-ecio-bg p-5 text-uppercase border-ecio-primary">
        <h2
          class="text-center color-red text-3xl d-flex justify-content-center"
          style="font-weight: bold"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            class="mr-2"
          >
            <path
              fill="#ff5b5b"
              d="M12 1l-12 22h24l-12-22zm-1 8h2v7h-2v-7zm1 11.25c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25z"
            />
          </svg>
          Migrate Your NFTs
        </h2>
        <p class="mt-4 text-white text-xl text-justify">
          There are several V1 NFTs in rotation that cannot utilize all
          functionalities such as NFT Collect to Earn staking & some upcoming
          game features. We have found that your
          <span v-if="oldNFTs.length > 0">
            wallet contains
            <span class="text-custom-green"> {{ oldNFTs.length }} </span> V1
            NFTs (ID below 5000) in your collection</span
          ><span v-if="oldNFTsInMarket.length > 0">
            <span v-if="oldNFTs.length > 0 && oldNFTsInMarket.length > 0">
              and</span
            >
            <span class="text-custom-green">
              {{ oldNFTsInMarket.length }}
            </span>
            NFTs are currently listed on the marketplace. Please remove all
            marketplace listed NFTs in preparation for the migrating</span
          >. We have created a migration tool to swap your NFTs to V2 with full
          utility. Those who migrate between 28 January 2022 to 4 February 2022,
          will be reimbursed for the gas fee in the form of a random NFT
          fragment (blueprint or genomic), airdropped to your wallet.
        </p>
        <p class="mt-3 mb-0 text-white text-center text-xl py-3">
          <img style="margin: auto" src="../../../assets/migrate/migrate.png" />
        </p>
        <div class="row mt-3 text-white text-center text-xl">
          <div class="col-6">
            <p class="mb-0">From NFTs V1</p>
            <span>
              <a
                :href="`${blockExplorerUrl}address/${nftContractV1}`"
                class="text-white"
                >{{ shortAddress(nftContractV1) }}</a
              >
            </span>
          </div>
          <div class="col-6">
            <p class="mb-0">To NFTs V2</p>
            <span class="text-white">
              <a
                :href="`${blockExplorerUrl}address/${nftContractV2}`"
                class="text-white"
                >{{ shortAddress(nftContractV2) }}</a
              >
            </span>
          </div>
        </div>
        <div class="row mt-5">
          <div class="col-6">
            <button
              class="btn btn-ecio-dark w-100"
              @click="$modal.hide('cautionMigrate')"
            >
              CANCEL
            </button>
          </div>
          <div class="col-6">
            <button
              v-if="!isApprovedForMigrate"
              class="btn btn-ecio-primary w-100 text-uppercase"
              @click="approveMigrateHandler()"
            >
              APPROVE
            </button>
            <button
              v-if="isApprovedForMigrate"
              class="btn btn-ecio-primary w-100 text-uppercase"
              style="background: #e0fb16; color: black"
              @click="migrateHandler()"
            >
              MIGRATE
            </button>
          </div>
        </div>
      </div>
    </modal>
    <modal
      height="auto"
      :scrollable="true"
      :adaptive="true"
      class="backdrop"
      name="waitConfirmTransaction"
    >
      <div class="bg-ecio-bg p-5 text-uppercase">
        <div>
          <svg
            class="mx-auto"
            width="70"
            height="70"
            version="1.1"
            id="L9"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 100 100"
            enable-background="new 0 0 0 0"
            xml:space="preserve"
          >
            <path
              fill="#e0fb16"
              d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"
            >
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="rotate"
                dur="1s"
                from="0 50 50"
                to="360 50 50"
                repeatCount="indefinite"
              />
            </path>
          </svg>
        </div>
        <h2 class="text-center text-white mb-3 text-2xl">
          Waiting for confirmation
        </h2>
        <h3 class="text-center mb-3 text-xl h2">
          {{ modalWaitingDesc }}
        </h3>
        <h3 class="text-center text-grey mb-3 text-xl">
          confirm this transaction in your wallet
        </h3>
      </div>
    </modal>

    <modal
      height="auto"
      :scrollable="true"
      :adaptive="true"
      class="backdrop"
      name="transactionSubmit"
    >
      <div class="bg-ecio-bg p-5">
        <h2 class="text-center text-white mb-3 text-2xl text-uppercase">
          Transaction Submitted
        </h2>
        <h2 class="text-center mb-3 text-2xl text-uppercase">
          <a
            class="color-light-blue"
            :href="`${blockExplorerUrl}tx/${txHash}`"
            target="_blank"
            ><u>view on bscscan</u></a
          >
        </h2>
        <div class="col-4 mx-auto">
          <button
            class="btn btn-ecio-dark text-uppercase"
            @click="switchModal('transactionReceipt', 'transactionSubmit')"
          >
            CLOSE
          </button>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
import Web3 from "web3";
import { createClient } from "urql";
import mautic from "mautic-tracking";
mautic.initialize("https://mt.ecio.space/mtc.js");
import CardList from "../../../components/List/CardList.vue";
import TransactionReceipt from "../../../components/TransactionReceipt";
import NFT from "../../../contracts/EcioNFTCore.json";
import MIGRATE from "../../../contracts/NFTMigrate.json";
export default {
  components: {
    CardList,
  },
  computed: {
    cards: function() {
      return this.$store.getters.getCards;
    },
  },
  data() {
    return {
      loading: false,
      txHash: "",
      walletAccount: "",
      oldNFTs: [],
      oldNFTsInMarket: [],
      accept: false,
      migrateContract: undefined,
      nftContractV1: process.env.VUE_APP_CONTRACT_NFTCORE,
      nftContractV2: process.env.VUE_APP_CONTRACT_NFTCORE_V2,
      blockExplorerUrl: process.env.VUE_APP_BLOCK_EXPLORER,
      isApprovedForMigrate: false,
    };
  },
  watch: {
    walletAccount: function(newVal, oldVal) {
      if (newVal !== "") {
        this.fetchMarketPlaces(newVal);
      } else if (oldVal !== "") {
        this.fetchMarketPlaces(oldVal);
      }
    },
  },
  mounted() {
    this.connectWallet()
      .then(() => {
        this.checkApprovedForAll();
        this.fetchMigrate();
      })
      .error((this.loading = false));
    this.loading = true;
    var that = this;
    window.ethereum.on("accountsChanged", function() {
      that.connectWallet();
      that.walletAccount = Web3.utils.toChecksumAddress(
        window.ethereum.selectedAddress
      );
      that.$emit("connected", window.ethereum.selectedAddress);
    });

    window.ethereum.on("chainChanged", () => {
      that.connectWallet();
      that.walletAccount = Web3.utils.toChecksumAddress(
        window.ethereum.selectedAddress
      );
      that.$emit("connected", window.ethereum.selectedAddress);
    });

    window.ethereum.on("disconnect", () => {
      that.walletAccount = "";
      that.$emit("disconnected", window.ethereum.selectedAddress);
    });

    window.ethereum.on("connected", () => {
      that.walletAccount = Web3.utils.toChecksumAddress(
        window.ethereum.selectedAddress
      );
      that.$emit("connected", window.ethereum.selectedAddress);
    });

    if (window.ethereum.selectedAddress != "") {
      that.connectWallet();
    }
  },
  methods: {
    async loadContract() {
      window.web3 = new Web3(window.ethereum);
      if (typeof window.ethereum == "undefined") {
        window.web3.setProvider(
          new Web3.providers.HttpProvider(process.env.VUE_APP_RPC_URL)
        );
      }
      this.migrateContract = await new window.web3.eth.Contract(
        MIGRATE.abi,
        process.env.VUE_APP_NFT_MIGRATE_CONTRACT_ADDRESS
      );

      this.nftContract = await new window.web3.eth.Contract(
        NFT.abi,
        process.env.VUE_APP_CONTRACT_NFTCORE
      );
    },
    handleTransferred() {
      this.fetchMarketPlaces(this.walletAccount);
    },
    async connectWallet() {
      if (this.validated()) {
        this.switchNetwork();

        await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        this.walletAccount = Web3.utils.toChecksumAddress(
          window.ethereum.selectedAddress
        );

        mautic.pageView({
          walletaddress: window.ethereum.selectedAddress,
          firstname: window.ethereum.selectedAddress,
        });
      }
    },
    handleCanceled(card) {
      this.loading = true;
      card.isSelling = false;
      const filterCard = this.cards.map((c) => (c.id === card.id ? card : c));
      this.$store.dispatch("setCards", filterCard);
      this.loading = false;
    },
    handleQuery(array) {
      return array.map((arr, index) => {
        let text = `"${arr}"`;
        if (index === array.length) {
          text += ",";
        }
        return text;
      });
    },
    async handleSearch(props) {
      this.loading = true;
      const {
        camps,
        classes,
        elements,
        parts,
        rarity,
        search,
        star,
        nft_type,
        fragment,
      } = props;
      let query = "";
      if (search) {
        query += `,name:{_eq:"${search}"} `;
      }
      if (camps.length > 0) {
        if (search) {
          query += ",";
        }
        query += `,camp:{_in:[${this.handleQuery(camps)}]} `;
      }
      if (classes.length > 0) {
        if (search || camps.length > 0) {
          query += ",";
        }
        query += `,nft_class:{_in:[${this.handleQuery(classes)}]} `;
      }
      if (elements.length > 0) {
        if (search || camps.length > 0 || classes.length > 0) {
          query += ",";
        }
        query += `,nft_class:{_in:[${this.handleQuery(elements)}]} `;
      }
      if (parts.length > 0) {
        if (
          search ||
          camps.length > 0 ||
          classes.length > 0 ||
          elements.length > 0
        ) {
          query += ",";
        }
        query += `,part:{_in:[${this.handleQuery(parts)}]} `;
      }
      if (rarity.length > 0) {
        if (
          search ||
          camps.length > 0 ||
          classes.length > 0 ||
          elements.length > 0 ||
          parts.length > 0
        ) {
          query += ",";
        }
        query += `,rarity: {_in:[${this.handleQuery(rarity)}]}`;
      }
      if (star > 0) {
        if (
          search ||
          camps.length > 0 ||
          classes.length > 0 ||
          elements.length > 0 ||
          parts.length > 0 ||
          rarity.length > 0
        ) {
          query += ",";
        }
        query += `,level: {_eq:"${star}"}`;
      }

      if (nft_type !== "ALL") {
        query += `,nft_type: {_eq:"${nft_type}"}`;
      }
      if (nft_type !== "CARD" && fragment) {
        query += `,fragment: {_eq:"${fragment}"}`;
      }

      const APIURL = process.env.VUE_APP_THE_GRAPH;

      const tokensQuery = `{
        accounts(where:{address:{_eq: "${this.walletAccount}"}}){
            nfts(where:{${query}}) {
            id
          name
          image
          token_id
          part_code
          nft_type
  				level
    			nft_class
    			part
    			rarity
    			camp
    			fragment
    			tribe
          market_owner
          contract_address
          orders {
            order_id
            status
            id
            price
            buy_with_erc20_address
          }
          }
        }
      }`;
      const client = createClient({
        url: APIURL,
        fetchOptions: {
          headers: {
            "x-hasura-admin-secret": `${process.env.VUE_APP_HASURA_ADMIN_SECRET}`,
          },
        },
      });

      const { data } = await client.query(tokensQuery).toPromise();
      const cards = this.checkCollectionItem(data);
      this.$store.dispatch("setCards", cards);
      this.loading = false;
      this.$refs.card.resetFilter();
    },
    handleSetLoading(isLoading) {
      this.loading = isLoading;
    },
    async fetchMarketPlaces(value) {
      if (typeof value === "undefined") {
        value = this.walletAccount;
      }
      this.loading = true;
      const APIURL = process.env.VUE_APP_THE_GRAPH;
      const tokensQuery = `{
        accounts(where:{address:{_eq: "${value}"}}){
          nfts {
           id
          name
          image
          token_id
          part_code
          nft_type
  				level
    			nft_class
    			part
    			rarity
    			camp
    			fragment
    			tribe
          market_owner
          owner
          contract_address
          orders {
            order_id
            status
            id
            price
            buy_with_erc20_address
            token_id
          }
          }
        }
      }`;
      const client = createClient({
        url: APIURL,
        fetchOptions: {
          headers: {
            "x-hasura-admin-secret": `${process.env.VUE_APP_HASURA_ADMIN_SECRET}`,
          },
        },
      });

      const { data } = await client.query(tokensQuery).toPromise();
      const cards = this.checkCollectionItem(data);
      this.$store.dispatch("setCards", cards);
      this.$refs.card.resetFilter();
      this.loading = false;
    },
    async fetchMigrate(value) {
      if (typeof value === "undefined") {
        value = this.walletAccount;
      }
      this.loading = true;
      const APIURL = process.env.VUE_APP_THE_GRAPH;
      const tokensQuery = `{
        nfts(where: {owner: {_ilike: "${this.walletAccount}"}, contract_address: {_ilike: "${process.env.VUE_APP_CONTRACT_NFTCORE}"}}){
          token_id
        }
      }`;
      const client = createClient({
        url: APIURL,
        fetchOptions: {
          headers: {
            "x-hasura-admin-secret": `${process.env.VUE_APP_HASURA_ADMIN_SECRET}`,
          },
        },
      });

      const { data } = await client.query(tokensQuery).toPromise();
      this.checkMigrateItem(data);
    },
    checkCollectionItem(data) {
      if (data && data.accounts.length && data.accounts[0].nfts.length) {
        data.accounts[0].nfts.filter((nft) => {
          if (nft.market_owner === this.walletAccount) {
            nft.orders.map((order) => {
              if (order.status === "OPEN") {
                nft.isSelling = true;
                nft.orderId = order.order_id;
                if (order.token_id < 5000) {
                  this.oldNFTsInMarket.push(order.token_id);
                }
              }
              return order;
            });
          }
        });
        return data.accounts[0].nfts;
      }
      return [];
    },
    async checkApprovedForAll() {
      this.loadContract().then(() => {
        this.nftContract.methods
          .isApprovedForAll(
            this.walletAccount,
            process.env.VUE_APP_NFT_MIGRATE_CONTRACT_ADDRESS
          )
          .call()
          .then((results) => {
            if (results === true) {
              this.isApprovedForMigrate = true;
              console.log("Approved!!");
            } else {
              console.log("Please Approve!!");
            }
          });
      });
    },
    approveMigrateHandler() {
      this.loadContract().then(() => {
        this.nftContract.methods
          .setApprovalForAll(
            process.env.VUE_APP_NFT_MIGRATE_CONTRACT_ADDRESS,
            true
          )
          .send({ from: this.walletAccount })
          .on("sent", (data) => this.sendApprove(data))
          .on("transactionHash", (tx) => this.transactionHash(tx))
          .on("receipt", (data) => this.receiptApprove(data))
          // .on("confirmation", (data) => this.confirmApprove(data))
          .on("error", (error) => this.showToastError(error));
      });
    },
    checkMigrateItem(data) {
      if (data) {
        // console.log(data.accounts[0].nfts);
        data.nfts.filter((nft, index) => {
          if (nft.token_id < 5000) {
            this.oldNFTs.push(nft.token_id);
          }
          if (index === data.nfts.length - 1) {
            if (this.oldNFTs.length > 0) {
              console.log("You have old NFT = " + this.oldNFTs.length);
              this.$modal.show("cautionMigrate");
            }
          }
        });
      }
    },
    validated() {
      if (typeof window.ethereum !== "undefined") {
        return true;
      }

      return false;
    },
    migrateHandler() {
      // console.log(tokenIds);
      this.loadContract().then(() => {
        this.migrateContract.methods
          .migrateAllNFTV1(this.oldNFTs)
          .send({ from: this.walletAccount })
          .on("sent", (data) => this.sendMigrate(data))
          .on("transactionHash", (tx) => this.transactionHash(tx))
          .on("receipt", (data) => this.receiptMigrate(data))
          .on("error", (error) => this.showToastError(error));
      });
    },
    sendApprove(data) {
      console.log("sendApprove data", data);
      this.modalWaitingDesc = "Approving your wallet";
      this.switchModal("waitConfirmTransaction", "cautionMigrate");
    },
    transactionHash(transaction) {
      console.log("transaction", transaction);
      this.txHash = transaction;
      this.switchModal("transactionSubmit", "waitConfirmTransaction");
    },
    receiptApprove(data) {
      console.log("Approve data", data);
      this.oldNFTs = [];
      this.alertTransaction("Approved your wallet", this.txHash);
      this.switchModal("cautionMigrate", "");
      this.isApprovedForMigrate = true;
    },
    switchModal(open, close) {
      this.$modal.show(open);
      this.$modal.hide(close);
    },
    sendMigrate(data) {
      console.log("Approve data", data);
      this.modalWaitingDesc = "Migrating NFTs...";
      this.switchModal("waitConfirmTransaction", "stakeToken");
    },
    receiptMigrate(data) {
      console.log("Approve data", data);
      this.alertTransaction("Migrated NFTs!", this.txHash);
      this.$modal.hide("cautionMigrate");
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
    shortAddress(address) {
      return (
        "(".concat(address.substring(0, 5), "...", address.slice(-4)) + ")"
      );
    },
    showToastError(err) {
      this.switchModal("transactionReject", "waitConfirmTransaction");
      const text = (
        <div class="col-12 text-uppercase">
          <h1 class="mb-3 text-xl">Transaction failed</h1>
          <span class="text-sm font-weight-normal">{err.message}</span>
        </div>
      );
      console.log("error", err);
      this.$toast.error(text, {
        position: "top-right",
        timeout: 5000,
        hideProgressBar: true,
        icon: true,
        rtl: false,
      });
    },
    alertTransaction(txt, tx) {
      const text = {
        component: TransactionReceipt,
        props: {
          title: "Transaction Receipt",
          txt: txt,
          blockExplorerUrl: this.blockExplorerUrl,
          tx: tx,
        },
      };
      this.$toast.success(text, {
        position: "top-right",
        timeout: 5000,
        hideProgressBar: true,
        icon: true,
        rtl: false,
      });
      this.connectWallet().then(() => {
        this.checkApprovedForAll();
        // this.fetchMigrate();
        this.fetchMarketPlaces();
      });
    },
  },
};
</script>
