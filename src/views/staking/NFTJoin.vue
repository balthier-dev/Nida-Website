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
            <div class="col-2" style="display: contents">
              <a
                href="/nft-staking"
                style="margin: auto; vertical-align: middle"
                class="ml-0"
              >
                <img class="mobile" src="../../assets/nftstaking/backbtn.png" />
              </a>
            </div>
            <div class="col-8">
              <h1 class="title-h1 mt-3 text-center" :title="walletAccount">
                Your Available Warriors
              </h1>
            </div>
            <div class="col-2" style="display: contents">
              <img
                class="mobile mr-0"
                style="margin: auto; vertical-align: middle"
                src="../../assets/nftstaking/staking.png"
              />
            </div>
          </div>
          <!-- <div class="row mt-2">
            <div class="col-lg-10 col-sm-12" />
            <div class="col-lg-2 col-sm-12" style="display: contents">
              <img
                v-if="!isApproved"
                class="mobile"
                style="margin: auto; cursor: pointer"
                src="../../assets/nftstaking/approvebtn.png"
                @click="approveHandler()"
              />
              <img
                class="mobile"
                v-if="isApproved"
                style="cursor: pointer; margin: auto"
                src="../../assets/nftstaking/joinallbtn.png"
                @click="joinAllHandler()"
              />
            </div> 
          </div>-->
          <div class="row mt-2">
            <DataTable
              :value="nfts"
              responsiveLayout="stack"
              breakpoint="960px"
              tableClass="p-datatable-nft quantico"
              :loading="loading"
            >
              <template #loading>
                Counting your warriors
                <span
                  class="ml-1 spinner-border spinner-border-sm"
                  style="position: relative; top: -6px"
                  role="status"
                >
                </span>
              </template>
              <template #empty> No Warriors found </template>
              <Column
                :headerStyle="{ 'text-align': 'center' }"
                field="name"
                header="NAME"
              ></Column>
              <Column field="tokenId" header="ID"></Column>
              <Column field="hp" header="HP"></Column>
              <Column field="atk" header="ATK"></Column>
              <Column field="def" header="DEF"></Column>
              <Column
                field="aspd"
                header="ACD"
                title="Attack Cooldown"
              ></Column>
              <Column field="bp" header="BATTLE POWER"></Column>
              <Column
                :headerStyle="{ 'min-width': '4rem', 'text-align': 'center' }"
                :bodyStyle="{ 'text-align': 'center', overflow: 'visible' }"
              >
                <!-- <template #header="isApproved">
                  <img
                    v-if="!isApproved"
                    class="mobile"
                    style="margin: auto; cursor: pointer"
                    src="../../assets/nftstaking/approvebtn.png"
                    @click="approveHandler()"
                  />
                  <img
                    class="mobile"
                    v-if="isApproved"
                    style="cursor: pointer; margin: auto"
                    src="../../assets/nftstaking/joinallbtn.png"
                    @click="joinAllHandler()"
                  />
                </template> -->
                <template #body="data">
                  <img
                    v-if="isApproved"
                    class="mobile"
                    style="margin: auto; cursor: pointer"
                    src="../../assets/nftstaking/join2btn.png"
                    @click="joinHandler(data)"
                  />
                  <img
                    v-if="!isApproved"
                    class="mobile"
                    style="margin: auto; cursor: pointer"
                    src="../../assets/nftstaking/approvebtn.png"
                    @click="approveHandler()"
                  />
                  <!-- <img
                    v-if="data.data.tokenId < 5000 && !isApproved2"
                    class="mobile"
                    style="margin: auto; cursor: pointer"
                    src="../../assets/nftstaking/approvebtn.png"
                    @click="approve2Handler()"
                  />
                  <img
                    v-if="data.data.tokenId < 5000 && isApproved2"
                    class="mobile"
                    style="margin: auto; cursor: pointer"
                    src="../../assets/nftstaking/join2btn.png"
                    @click="joinHandler(data)"
                  /> -->
                </template>
              </Column>
            </DataTable>
          </div>
        </div>
      </section>

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
            >. We have created a migration tool to swap your NFTs to V2 with
            full utility. Those who migrate between 28 January 2022 to 4
            February 2022, will be reimbursed for the gas fee in the form of a
            random NFT fragment (blueprint or genomic), airdropped to your
            wallet.
          </p>
          <p class="mt-3 mb-0 text-white text-center text-xl py-3">
            <img style="margin: auto" src="../../assets/migrate/migrate.png" />
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
              <span>
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
                style="background: #e0fb16; color: black !important"
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
  </div>
</template>
<script>
// import Countdown from "vuejs-countdown";
// import Web3 from "web3";
// import ERC20 from "./../../contracts/ERC20.json";
// import ABI from "./../../contracts/EcioStaking.json";
// import StakingCard from "@/components/StakeCard";
// import TransactionReceipt from "@/components/TransactionReceipt";
import { createClient } from "urql";
import Web3 from "web3";
import ABI from "../../contracts/NFTStaking.json";
import NFT from "../../contracts/EcioNFTCore.json";
import MIGRATE from "../../contracts/NFTMigrate.json";
import TransactionReceipt from "../../components/TransactionReceipt";
import axios from "axios";
import banIds from "../../store/banIds.json";
// import BigNumber from "bignumber.js";
export default {
  // components: { StakingCard },
  data() {
    return {
      loading: true,
      modalWaitingDesc: "",
      txHash: "",
      walletAccount: "",
      isApproved: false,
      isApproved2: false,
      stakeContract: undefined,
      nftContract: undefined,
      nft2Contract: undefined,
      migrateContract: undefined,
      blockExplorerUrl: process.env.VUE_APP_BLOCK_EXPLORER,
      oldNFTs: [],
      oldNFTsInMarket: [],
      nftContractV1: process.env.VUE_APP_CONTRACT_NFTCORE,
      nftContractV2: process.env.VUE_APP_CONTRACT_NFTCORE_V2,
      accept: false,
      isApprovedForMigrate: false,
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
      nfts: [],
      tokenIdList: [],
    };
  },
  watch: {
    // walletAccount: function (newVal, oldVal) {
    //   if (newVal !== "") {
    //     this.fetchCharacter(newVal);
    //   } else if (oldVal !== "") {
    //     this.fetchCharacter(oldVal);
    //   }
    // },
  },
  mounted() {
    try {
      this.connectWallet().then(() => {
        this.fetchCharacter();
        this.fetchMigrate();
        this.checkApprovedForAll();
      });
    } catch (e) {
      this.loading = false;
      console.log(e.data);
    } finally {
      this.loading = false;
    }

    // this.loading = true;
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
            blockExplorerUrl: [process.env.VUE_APP_BLOCK_EXPLORER],
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
      this.stakeContract = await new window.web3.eth.Contract(
        ABI.abi,
        process.env.VUE_APP_NFT_STAKING_CONTRACT_ADDRESS
      );
      this.nftContract = await new window.web3.eth.Contract(
        NFT.abi,
        process.env.VUE_APP_CONTRACT_NFTCORE_V2
      );
      this.nft2Contract = await new window.web3.eth.Contract(
        NFT.abi,
        process.env.VUE_APP_CONTRACT_NFTCORE
      );
      this.migrateContract = await new window.web3.eth.Contract(
        MIGRATE.abi,
        process.env.VUE_APP_NFT_MIGRATE_CONTRACT_ADDRESS
      );
      console.log("this.stakeContract  ", this.stakeContract._address);
      console.log("this.nftContract    ", this.nftContract._address);
      console.log(
        "nftContractAddress  ",
        process.env.VUE_APP_CONTRACT_NFTCORE_V2
      );
      console.log("this.nft2Contract   ", this.nft2Contract._address);
      console.log("CONTRACT_NFTCORE    ", process.env.VUE_APP_CONTRACT_NFTCORE);
    },
    async checkApprovedForAll() {
      this.loadContract().then(() => {
        this.nftContract.methods
          .isApprovedForAll(
            this.walletAccount,
            process.env.VUE_APP_NFT_STAKING_CONTRACT_ADDRESS
          )
          .call()
          .then((results) => {
            if (results === true) {
              this.isApproved = true;
            } else {
              console.log("Please Approve!!");
            }
          });
        this.nft2Contract.methods
          .isApprovedForAll(
            this.walletAccount,
            process.env.VUE_APP_NFT_STAKING_CONTRACT_ADDRESS
          )
          .call()
          .then((results) => {
            console.log(results);
            if (results === true) {
              this.isApproved2 = true;
            } else {
              console.log("Please Approve!!");
            }
          });
        this.nft2Contract.methods
          .isApprovedForAll(
            this.walletAccount,
            process.env.VUE_APP_NFT_MIGRATE_CONTRACT_ADDRESS
          )
          .call()
          .then((results) => {
            console.log(results);
            if (results === true) {
              this.isApprovedForMigrate = true;
            } else {
              console.log("Please Approve!!");
            }
          });
      });
    },
    async fetchCharacter() {
      this.nfts = [];
      const APIURL = process.env.VUE_APP_THE_GRAPH;
      // console.log(this.walletAccount);
      const tokensQuery = `{
        nfts(where: {owner: {_ilike: "${this.walletAccount}"},nft_type: {_eq: "CARD"}}){
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

      this.loading = data.nfts.length > 0 ? true : false;
      // console.log("data.nfts.length", data.nfts.length);
      let nfts = [];
      let index = data.nfts.length - 1;

      for (let nft in data.nfts) {
        axios
          .get(
            process.env.VUE_APP_NFT_METADATA_ENDPOINT +
              "/items/" +
              data.nfts[nft].token_id
          )
          .then((response) => {
            let data = {};
            data.tokenId = response.data.nft_id;
            data.name = response.data.name;
            data.hp = Number(response.data.attributes[27].value).toLocaleString(
              undefined,
              {
                minimumFractionDigits: 3,
                maximumFractionDigits: 3,
              }
            );
            data.atk = Number(
              response.data.attributes[29].value
            ).toLocaleString(undefined, {
              minimumFractionDigits: 3,
              maximumFractionDigits: 3,
            });
            data.def = Number(
              response.data.attributes[28].value
            ).toLocaleString(undefined, {
              minimumFractionDigits: 3,
              maximumFractionDigits: 3,
            });
            data.aspd = Number(
              response.data.attributes[30].value
            ).toLocaleString(undefined, {
              minimumFractionDigits: 3,
              maximumFractionDigits: 3,
            });
            // hp + ((atk / aspd) * (10 * 1e18)) + (def * 15)
            // data.bp =
            //   Number(response.data.attributes[27].value).toLocaleString(
            //     undefined,
            //     {
            //       minimumFractionDigits: 3,
            //       maximumFractionDigits: 3,
            //     }
            //   ) +
            //   (Number(response.data.attributes[29].value).toLocaleString(
            //     undefined,
            //     {
            //       minimumFractionDigits: 3,
            //       maximumFractionDigits: 3,
            //     }
            //   ) /
            //     Number(response.data.attributes[30].value).toLocaleString(
            //     undefined,
            //     {
            //       minimumFractionDigits: 3,
            //       maximumFractionDigits: 3,
            //     }
            //   )) *
            //     10 +
            //   (Number(response.data.attributes[28].value).toLocaleString(
            //     undefined,
            //     {
            //       minimumFractionDigits: 3,
            //       maximumFractionDigits: 3,
            //     }
            //   ) * 15).toLocaleString(undefined, {
            //   minimumFractionDigits: 3,
            //   maximumFractionDigits: 3,
            // });
            // data.bp = Number(response.data.attributes[27].value)
            var sumOfBp =
              Number(response.data.attributes[27].value) +
              (Number(
                (response.data.attributes[29].value /
                  Number(response.data.attributes[30].value)) *
                  10
              ) +
                Number(response.data.attributes[28].value) * 15);
            // console.log(sumOfBp);
            data.bp = sumOfBp.toLocaleString(undefined, {
              minimumFractionDigits: 3,
              maximumFractionDigits: 3,
            });
            nfts.push(data);
            if (nfts.length - 1 == index) {
              this.nfts = nfts.sort((a, b) => a.tokenId - b.tokenId);
              this.loading = false;
            }
          });
      }
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
      data.nfts.filter((nft, i) => {
        if (nft.token_id < 5000) {
          this.oldNFTs.push(nft.token_id);
        }
        if (i === data.nfts.length - 1) {
          if (this.oldNFTs.length > 0) {
            this.switchModal("cautionMigrate", "");
          }
        }
      });

      const tokensQueryX = `{
        accounts(where:{address:{_ilike: "${value}"}}){
          nfts {
           id
          token_id
          market_owner
          orders {
            order_id
            token_id
            status
          }
          }
        }
      }`;
      const clientX = createClient({
        url: APIURL,
        fetchOptions: {
          headers: {
            "x-hasura-admin-secret": `${process.env.VUE_APP_HASURA_ADMIN_SECRET}`,
          },
        },
      });

      const dataX = await clientX.query(tokensQueryX).toPromise();
      dataX.data.accounts[0].nfts.filter((nft) => {
        if (nft.market_owner.toLowerCase() === this.walletAccount) {
          nft.orders.map((order) => {
            if (order.status === "OPEN") {
              if (order.token_id < 5000) {
                this.oldNFTsInMarket.push(order.token_id);
              }
            }
          });
        }
      });
    },
    approveHandler() {
      this.loadContract().then(() => {
        console.log("approveHandler", this.nftContract._address);
        this.nftContract.methods
          .setApprovalForAll(
            process.env.VUE_APP_NFT_STAKING_CONTRACT_ADDRESS,
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
    approve2Handler() {
      this.loadContract().then(() => {
        console.log("approve2Handler", this.nft2Contract._address);
        this.nft2Contract.methods
          .setApprovalForAll(
            process.env.VUE_APP_NFT_STAKING_CONTRACT_ADDRESS,
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
    approveMigrateHandler() {
      this.loadContract().then(() => {
        console.log("approve2Handler", this.nft2Contract._address);
        this.nft2Contract.methods
          .setApprovalForAll(
            process.env.VUE_APP_NFT_MIGRATE_CONTRACT_ADDRESS,
            true
          )
          .send({ from: this.walletAccount })
          .on("sent", (data) => this.sendApproveMigrate(data))
          .on("transactionHash", (tx) => this.transactionHash(tx))
          .on("receipt", (data) => this.receiptApproveMigrate(data))
          // .on("confirmation", (data) => this.confirmApprove(data))
          .on("error", (error) => this.showToastError(error));
      });
    },
    joinHandler(tokenId) {
      // console.log(tokenId.data.token_id);
      const id = tokenId.data.tokenId;
      this.loadContract().then(() => {
        console.log("join this.stakeContract", this.stakeContract._address);
        console.log("id", id);
        if (!banIds.includes(id)) {
          this.stakeContract.methods
            .joinWarrior(id)
            .send({ from: this.walletAccount })
            .on("sent", (data) => this.sendWarrior(data))
            .on("transactionHash", (tx) => this.transactionHash(tx))
            .on("receipt", (data) => this.receiptWarrior(data))
            // .on("confirmation", (data) => this.confirmApprove(data))
            .on("error", (error) => this.showToastError(error));
        } else {
          let err = { message: "Forbidden Token" };
          this.showToastError(err);
        }
      });
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
          // .on("confirmation", (data) => this.confirmApprove(data))
          .on("error", (error) => this.showToastError(error));
      });
    },
    joinAllHandler() {
      let tokenIds = this.nfts.map((nft) => nft.tokenId);
      // console.log(tokenIds);
      this.loadContract().then(() => {
        this.stakeContract.methods
          .joinAllWarrior(tokenIds)
          .send({ from: this.walletAccount })
          .on("sent", (data) => this.sendWarrior(data))
          .on("transactionHash", (tx) => this.transactionHash(tx))
          .on("receipt", (data) => this.receiptMigrate(data))
          // .on("confirmation", (data) => this.confirmApprove(data))
          .on("error", (error) => this.showToastError(error));
      });
    },
    switchModal(open, close) {
      this.$modal.show(open);
      this.$modal.hide(close);
    },
    sendApprove(data) {
      console.log("sendApprove data", data);
      this.modalWaitingDesc = "Approving your wallet";
      this.switchModal("waitConfirmTransaction", "stakeToken");
    },
    sendApproveMigrate(data) {
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
      this.alertTransaction("Approved your wallet", this.txHash);
      this.isApproved = true;
    },

    receiptApproveMigrate(data) {
      console.log("Approve data", data);
      this.alertTransaction("Approved your wallet", this.txHash);
      this.isApprovedForMigrate = true;
      this.switchModal("cautionMigrate", "");
    },

    sendMigrate(data) {
      console.log("Approve data", data);
      this.modalWaitingDesc = "Migrating NFTs...";
      this.switchModal("waitConfirmTransaction", "cautionMigrate");
    },
    receiptMigrate(data) {
      console.log("Approve data", data);
      this.alertTransaction("Migrated NFTs!", this.txHash);
    },

    sendWarrior(data) {
      console.log("Approve data", data);
      this.modalWaitingDesc = "Sending Warrior...";
      this.switchModal("waitConfirmTransaction", "stakeToken");
    },
    receiptWarrior(data) {
      console.log("Approve data", data);
      this.alertTransaction("Sent Warrior!", this.txHash);
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
        this.fetchCharacter();
      });
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
    validated() {
      if (typeof window.ethereum !== "undefined") {
        return true;
      }

      return false;
    },
    shortAddress(address) {
      return (
        "(".concat(address.substring(0, 5), "...", address.slice(-4)) + ")"
      );
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

.p-datatable-thead thead {
  background-image: url("../../assets/nftstaking/headertdbg.png");
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
