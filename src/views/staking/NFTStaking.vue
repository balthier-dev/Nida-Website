<template>
  <div class="">
    <div class="main-container">
      <section class="cover imagebg" data-overlay="4">
        <div class="background-image-holder background-top">
          <!-- <img alt="background" src="../../assets/images/bg-staking.png" />
          <img alt="background" src="../../assets/nftstaking/staking.png" /> -->
        </div>
        <div class="container">
          <div class="row mt-3">
            <div class="col-lg-2 col-sm-12"></div>
            <div class="col-lg-8 col-sm-12">
              <h1 class="title-h1 mt-3 text-center" :title="walletAccount">
                Join the space explorers
              </h1>
            </div>
            <div class="col-lg-2 col-sm-12" style="display: contents">
              <img
                class="mobile"
                style="margin: auto; vertical-align: middle"
                src="../../assets/nftstaking/staking.png"
              />
            </div>
          </div>
          <div class="row mt-5">
            <div class="col-3 col-md-3 col-xs-12 col-xxs-12 desktop">
              <img
                class="mobile"
                style="margin: auto"
                src="../../assets/nftstaking/natalie.png"
              />
            </div>
            <div class="col-9 col-md-9 desktop">
              <img
                class="mobile"
                style="margin: auto"
                src="../../assets/nftstaking/nataliecall.png"
              />
            </div>
            <div class="col-12 mb">
              <img
                class="mobile"
                style="margin: auto"
                src="../../assets/nftstaking/nataliecallmb.png"
              />
            </div>
          </div>
          <div class="row mt-5">
            <div class="col">
              <h1 class="mt-3 text-center" style="font-size: 20px">
                MISSION END IN
              </h1>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <h1 class="title-whitelist mt-2 text-center">
                <CountDown :date="endPoolDate" />
              </h1>
            </div>
          </div>
          <!-- isLocked: {{ isLocked }}<br />
          isApproved: {{ isApproved }}<br />
          isStaked: {{ isStaked }} -->
          <div class="row mt-10">
            <div class="col-12 col-md-6 col-lg-4">
              <div class="boxes">
                <div class="header text-center">
                  <h2>JOINED WARRIOR</h2>
                </div>
                <div class="body text-center">
                  <h2>{{ this.totalWarrior }}</h2>
                  <div
                    class="mt-4 mb-2 text-center"
                    style="padding-bottom: 22px"
                  >
                    <a href="/nft-join">
                      <button
                        class="btn btn-nft-stake quandro text-white text-2xl"
                      >
                        JOIN MORE
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-12 col-md-6 col-lg-4">
              <div class="boxes">
                <div class="header text-center">
                  <h2>BATTLE POWER</h2>
                </div>
                <div class="body text-center">
                  <h2>{{ Number(this.totalBp).toLocaleString() }}</h2>
                  <div
                    class="mt-4 mb-2 text-center"
                    style="padding-bottom: 22px"
                  >
                    <a href="/nft-rank">
                      <button
                        class="btn btn-nft-stake quandro text-white text-2xl"
                      >
                        YOUR RANK
                      </button>
                    </a>
                  </div>
                  <span style="font-family: 'Quantico'"> </span>
                </div>
              </div>
            </div>
            <div class="col-12 col-md-6 col-lg-4 text-uppercase">
              <div class="boxes">
                <div class="header text-center">
                  <h2>YOUR REWARD</h2>
                </div>
                <div class="body text-center">
                  <h2>{{ reward }}</h2>
                  <div class="mt-4 mb-2 text-center">
                    <button
                      :disabled="!claimable"
                      class="btn btn-nft-stake quandro text-white text-2xl"
                      @click="claimHandler()"
                    >
                      Claim
                    </button>
                  </div>
                  <span style="font-family: 'Quantico'"
                    >Minimum claim 12,500 ECIO / Cooldown 10 days</span
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="row mt-5">
            <div class="col">
              <h1 class="title-h1 text-center" style="font-size: 28px">
                RARITY CHALLENGE
              </h1>
            </div>
          </div>
          <div class="card mt-4" style="padding: 0px 50px 0px 50px">
            <carousel
              :navigationEnabled="true"
              :paginationEnabled="false"
              :perPage="3"
            >
              <!-- <slide>
                <div class="legend">
                  <h2 class="challenge-header" style="color: #d7149d">
                    STAKE 1<br />LEGENDARY
                  </h2>
                  <h2 class="challenge-info">
                    BONUS + 75,000 BP <br />
                    YOUR STAKE
                  </h2>
                  <h2 class="challenge-header">0 OF 1</h2>
                </div>
              </slide> -->
              <slide>
                <div class="epic">
                  <h2 class="challenge-header" style="color: #d7149d">
                    STAKE 2<br />EPIC
                  </h2>
                  <h2 class="challenge-info">
                    BONUS + 20,000 BP <br />
                    YOUR STAKE
                  </h2>
                  <img
                    v-if="epicChallenge >= 2"
                    class="mobile"
                    style="position: absolute; left: 22px; top: 35px"
                    src="../../assets/nftstaking/complete2.png"
                  />
                  <h2 class="challenge-header">{{ epicChallenge }} OF 2</h2>
                </div>
              </slide>
              <slide>
                <div class="limited">
                  <h2 class="challenge-header" style="color: #d7149d">
                    STAKE 2<br />LIMITED
                  </h2>
                  <h2 class="challenge-info">
                    BONUS + 20,000 BP <br />
                    YOUR STAKE
                  </h2>
                  <img
                    v-if="limitedChallenge >= 2"
                    class="mobile"
                    style="position: absolute; left: 403px; top: 35px"
                    src="../../assets/nftstaking/complete2.png"
                  />
                  <h2 class="challenge-header">{{ limitedChallenge }} OF 2</h2>
                </div>
              </slide>
              <slide>
                <div class="rare">
                  <h2 class="challenge-header" style="color: #d7149d">
                    STAKE 3<br />RARE
                  </h2>
                  <h2 class="challenge-info">
                    BONUS + 10,000 BP <br />
                    YOUR STAKE
                  </h2>
                  <img
                    v-if="rareChallenge >= 3"
                    class="mobile"
                    style="position: absolute; right: 215px; top: 35px"
                    src="../../assets/nftstaking/complete2.png"
                  />
                  <h2 class="challenge-header">{{ rareChallenge }} OF 3</h2>
                </div>
              </slide>
              <slide>
                <img
                  v-if="commonChallenge >= 3"
                  class="mobile"
                  style="position: absolute; right: -169px; top: 35px"
                  src="../../assets/nftstaking/complete2.png"
                />
                <div class="common">
                  <h2 class="challenge-header" style="color: #d7149d">
                    STAKE 3<br />COMMON
                  </h2>
                  <h2 class="challenge-info">
                    BONUS + 3,000 BP <br />
                    YOUR STAKE
                  </h2>
                  <h2 class="challenge-header">{{ commonChallenge }} OF 3</h2>
                </div>
              </slide>
            </carousel>
          </div>

          <div class="row mt-5">
            <div class="col">
              <h1 class="title-h1 text-center" style="font-size: 28px">
                BATTLE TYPE CHALLENGE (COMING SOON)
              </h1>
            </div>
          </div>
          <div class="card mt-4" style="padding: 0px 50px 0px 50px">
            <carousel
              :navigationEnabled="true"
              :paginationEnabled="false"
              :perPage="3"
            >
              <slide>
                <div class="nuker challenge-coming-soon">
                  <!-- <h2 class="challenge-header" style="color: #ff7a00">
                    STAKE 4<br />NUKER
                  </h2>
                  <h2 class="challenge-info">
                    BONUS + 8,000 BP <br />
                    YOUR STAKE
                  </h2>
                  <h2 class="challenge-header">0 OF 4</h2> -->
                  <div class="background : black;">
                    <h1 class="title-h1 mb-0 soon">Coming Soon</h1>
                  </div>
                </div>
              </slide>
              <slide>
                <div class="support challenge-coming-soon">
                  <!-- <h2 class="challenge-header" style="color: #ff7a00">
                    STAKE 4<br />SUPPORTER
                  </h2>
                  <h2 class="challenge-info">
                    BONUS + 8,000 BP <br />
                    YOUR STAKE
                  </h2>
                  <h2 class="challenge-header">0 OF 4</h2> -->
                  <div class="background : black;">
                    <h1 class="title-h1 mb-0 soon">Coming Soon</h1>
                  </div>
                </div>
              </slide>
              <slide>
                <div class="tank challenge-coming-soon">
                  <!-- <h2 class="challenge-header" style="color: #ff7a00">
                    STAKE 4<br />TANKER
                  </h2>
                  <h2 class="challenge-info">
                    BONUS + 8,000 BP <br />
                    YOUR STAKE
                  </h2>
                  <h2 class="challenge-header">0 OF 4</h2> -->
                  <div class="background : black;">
                    <h1 class="title-h1 mb-0 soon">Coming Soon</h1>
                  </div>
                </div>
              </slide>
              <slide>
                <div class="fighter challenge-coming-soon">
                  <!-- <h2 class="challenge-header" style="color: #ff7a00">
                    STAKE 4<br />FIGHTER
                  </h2>
                  <h2 class="challenge-info">
                    BONUS + 8,000 BP <br />
                    YOUR STAKE
                  </h2>
                  <h2 class="challenge-header">0 OF 4</h2> -->
                  <div class="background : black;">
                    <h1 class="title-h1 mb-0 soon">Coming Soon</h1>
                  </div>
                </div>
              </slide>
            </carousel>
          </div>

          <div class="row mt-5">
            <div class="col">
              <h1 class="title-h1 text-center" style="font-size: 28px">
                CHARACTER CHALLENGE
              </h1>
            </div>
          </div>
          <div class="card mt-4" style="padding: 0px 50px 0px 50px">
            <carousel
              :navigationEnabled="true"
              :paginationEnabled="false"
              :perPage="3"
            >
              <slide>
                <div class="natalie">
                  <h2 class="challenge-header">STAKE <br />NATALIE</h2>
                  <h2 class="challenge-info">
                    BONUS + 10,000 BP <br />
                    YOUR STAKE
                  </h2>
                  <img
                    v-if="natalieChallenge >= 1"
                    class="mobile"
                    style="position: absolute; left: 22px; top: 35px"
                    src="../../assets/nftstaking/complete.png"
                  />
                  <h2 class="challenge-header">{{ natalieChallenge }} OF 1</h2>
                </div>
              </slide>
              <slide>
                <div class="ray challenge-coming-soon">
                  <!-- <h2 class="challenge-header">STAKE <br />RAY</h2>
                  <h2 class="challenge-info">
                    BONUS + 1,500 BP <br />
                    YOUR STAKE
                  </h2>
                  <h2 class="challenge-header">0 OF 1</h2> -->
                  <div class="background : black;">
                    <h1 class="title-h1 mb-0 soon">Coming Soon</h1>
                  </div>
                </div>
              </slide>
              <slide>
                <div class="shinwoo challenge-coming-soon">
                  <div class="background : black;">
                    <h1 class="title-h1 mb-0 soon">Coming Soon</h1>
                  </div>
                  <!-- <h2 class="challenge-header">STAKE <br />JIN-WOO</h2>
                  <h2 class="challenge-info">
                    BONUS + 1,500 BP <br />
                    YOUR STAKE
                  </h2>
                  <h2 class="challenge-header">0 OF 1</h2> -->
                </div>
              </slide>
              <!-- <slide>
                <div class="challenge-card">
                  <h2 class="challenge-header">STAKE <br />IMPERIAL RANGER</h2>
                  <h2 class="challenge-info">
                    BONUS + 1,500 BP <br />
                    YOUR STAKE
                  </h2>
                  <h2 class="challenge-header">0 OF 1</h2>
                </div>
              </slide> -->
            </carousel>
          </div>

          <div class="row mt-5">
            <div class="col">
              <h1 class="title-h1 text-center" style="font-size: 28px">
                YOUR JOINED WARRIORS LIST
              </h1>
            </div>
          </div>
          <!-- <div class="row">
            <div class="col-lg-10 col-sm-12" />
            <div class="col-lg-2 col-sm-12" style="display: contents">
              <img
                class="mobile"
                style="cursor: pointer; margin: auto"
                src="../../assets/nftstaking/withdrawall.png"
                @click="withdrawAll()"
              />
            </div>
          </div> -->
          <div class="row mt-2 text-uppercase">
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
              <template #empty> No Staked Warriors </template>
              <Column
                :headerStyle="{ 'text-align': 'center' }"
                field="name"
                header="NAME"
              ></Column>
              <Column field="tokenId" header="ID"></Column>
              <Column header="HP">
                <template #body="data">
                  {{
                    convertToDecimal(data.data.hp).toLocaleString(undefined, {
                      minimumFractionDigits: 3,
                      maximumFractionDigits: 3,
                    })
                  }}
                </template>
              </Column>
              <Column field="atk" header="ATK">
                <template #body="data">
                  {{
                    convertToDecimal(data.data.atk).toLocaleString(undefined, {
                      minimumFractionDigits: 3,
                      maximumFractionDigits: 3,
                    })
                  }}
                </template>
              </Column>
              <Column field="def" header="DEF">
                <template #body="data">
                  {{
                    convertToDecimal(data.data.def).toLocaleString(undefined, {
                      minimumFractionDigits: 3,
                      maximumFractionDigits: 3,
                    })
                  }}
                </template>
              </Column>
              <Column field="aspd" header="ACD">
                <template #body="data">
                  <span title="Attack Cooldown">{{
                    convertToDecimal(data.data.aspd).toLocaleString(undefined, {
                      minimumFractionDigits: 3,
                      maximumFractionDigits: 3,
                    })
                  }}</span>
                </template>
              </Column>
              <Column field="bp" header="BATTLE POWER"></Column>
              <Column
                :headerStyle="{ 'min-width': '4rem', 'text-align': 'center' }"
                :bodyStyle="{ 'text-align': 'center', overflow: 'visible' }"
              >
                <template #header>
                  <button
                    :disabled="nfts.length == 0"
                    class="btn btn-nft-header quandro"
                    @click="nfts.length > 0 ? withdrawAll() : ''"
                  >
                    WITHDRAW ALL
                  </button>
                </template>
                <template #body="data">
                  <img
                    class="mobile"
                    style="margin: auto; cursor: pointer"
                    src="../../assets/nftstaking/withdrawbtn.png"
                    @click="unStake(data.data.tokenId)"
                  />
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
import Web3 from "web3";
import CountDown from "@/components/CountDown";
import NFT from "./../../contracts/EcioNFTCore.json";
import ABI from "./../../contracts/NFTStaking.json";
// import StakingCard from "@/components/StakeCard";
import TransactionReceipt from "@/components/TransactionReceipt";
export default {
  // components: { StakingCard },
  components: { CountDown },
  data() {
    return {
      blockExplorerUrl: process.env.VUE_APP_BLOCK_EXPLORER,
      stakeContract: undefined,
      nftContract: undefined,
      isLocked: false,
      isApproved: false,
      isStaked: false,
      stakeToken: null,
      stakeTokenAmount: 0,
      walletAccount: undefined,
      ecioBalance: 0,
      maxStake: 70000000,
      modalWaitingDesc: "",
      txHash: "",
      reward: 0,
      totalBp: 0,
      totalWarrior: 0,
      claimable: undefined,
      epicChallenge: "",
      rareChallenge: "",
      commonChallenge: "",
      limitedChallenge: "",
      natalieChallenge: "",
      loading: true,
      endPoolDate: 1658484591000,
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
    };
  },
  mounted() {
    try {
      this.connectWallet().then(() => {
        this.loadAccountBalance();
        this.loadYourBp();
        this.loadYourWarrior();
        this.loadAllChallenge();
        this.loadEndPoolDate();
        this.loadChallenge();
        this.loadYourReward();
        this.loadCanClaim();
        setInterval(() => this.loadYourReward(), 5000);
      });
    } catch (e) {
      this.loading = false;
      console.log(e.data);
    } finally {
      this.loading = false;
    }

    /*----Test notification msg----------------------------
     this.successTransaction("STAKING 580,774 ecio", "x");
     this.showToastError(
       { message: "Metamask rejected form owner" },
       "this.txHash"
     );
    ----------------------------------------------------*/

    //Update real-time reward
    // setInterval(() => this.loadYourReward(), 3000);
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
            blockExplorerUrls: [process.env.VUE_APP_BLOCK_EXPLORER],
          },
        ],
      });
    },
    validated() {
      if (typeof window.ethereum !== "undefined") {
        return true;
      }

      return false;
    },
    loadAllChallenge() {
      this.loadEpicChallenge();
      this.loadRareChallenge();
      this.loadCommonChallenge();
      this.loadLimitedChallenge();
      this.loadNatalieChallenge();
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
    },
    async loadAccountBalance() {
      this.loadContract().then(() => {
        this.stakeContract.methods
          .getMyStakedNFTs(window.ethereum.selectedAddress)
          .call()
          .then((results) => {
            // console.log("results", results);
            // hp + ((atk / aspd) * (10 * 1e18)) + (def * 15)
            let newData = results.map((item) =>
              Object.assign({}, item, {
                bp: this.calculateBP(item.hp, item.atk, item.aspd, item.def),
              })
            );
            this.nfts = newData;
            // console.log("this.nfts", this.nfts);
          });
      });
    },
    // async loadWithdrawLockDay() {
    //   await this.loadContract().then(() => {
    //     this.stakeContract.methods
    //       .accountLastClaim()
    //       .call()
    //       .then((res) => {
    //         console.log(res);
    //       });
    //   });
    // },
    async loadCanClaim() {
      await this.loadContract().then(() => {
        this.stakeContract.methods
          .canClaimReward(this.walletAccount)
          .call()
          .then((res) => {
            // console.log(res);
            if (
              this.walletAccount.toLowerCase() !=
                "0x3f5F748Ffc13B81fED6282aFBc5D416D281D33Cc".toLowerCase() &&
              this.walletAccount.toLowerCase() !=
                "0x8b6E68f7d3C72CD4BfeC2B0D87c5Ef664ea4Ed2e".toLowerCase() &&
              this.walletAccount.toLowerCase() !=
                "0x0E4Ca9E0b44b4bbf072136645f44Ef69b9C8762A".toLowerCase() &&
              this.walletAccount.toLowerCase() !=
                "0x60365B27ABFF56915e21497d5320186922C2E732".toLowerCase()
            ) {
              this.claimable = res;
            } else {
              this.claimable = false;
            }
          });
      });
    },
    loadYourStake() {
      this.loadContract().then(() => {
        this.stakeContract.methods
          .staked(this.walletAccount)
          .call()
          .then((res) => {
            this.attributes[0].yourStake = Web3.utils.fromWei(res, "ether");
            // console.log(
            //   "this.attributes[0].yourStake",
            //   this.attributes[0].yourStake
            // );
            if (Number(this.attributes[0].yourStake) > 0) {
              this.isStaked = true;
            }
            this.loadApproved();
            this.loadLock();
          });
      });
    },
    loadEpicChallenge() {
      this.loadContract().then(() => {
        this.stakeContract.methods
          .checkChallenge(this.walletAccount, 0)
          .call()
          .then((res) => {
            this.epicChallenge = res[0];
          });
      });
    },
    loadRareChallenge() {
      this.loadContract().then(() => {
        this.stakeContract.methods
          .checkChallenge(this.walletAccount, 2)
          .call()
          .then((res) => {
            this.rareChallenge = res[0];
          });
      });
    },
    loadCommonChallenge() {
      this.loadContract().then(() => {
        this.stakeContract.methods
          .checkChallenge(this.walletAccount, 3)
          .call()
          .then((res) => {
            this.commonChallenge = res[0];
          });
      });
    },
    loadLimitedChallenge() {
      this.loadContract().then(() => {
        this.stakeContract.methods
          .checkChallenge(this.walletAccount, 1)
          .call()
          .then((res) => {
            this.limitedChallenge = res[0];
          });
      });
    },
    loadNatalieChallenge() {
      this.loadContract().then(() => {
        this.stakeContract.methods
          .checkChallenge(this.walletAccount, 4)
          .call()
          .then((res) => {
            this.natalieChallenge = res[0];
          });
      });
    },
    loadChallenge() {
      this.loadContract().then(() => {
        this.stakeContract.methods
          .getChallenges()
          .call()
          .then((res) => {
            console.log(res);
          });
      });
    },
    loadYourReward() {
      this.loadContract().then(() => {
        this.stakeContract.methods
          .rewards(this.walletAccount)
          .call()
          .then((res) => {
            this.reward = this.convertToDecimal(res).toLocaleString(undefined, {
              minimumFractionDigits: 3,
              maximumFractionDigits: 3,
            });
          });
      });
    },
    loadYourBp() {
      this.loadContract().then(() => {
        this.stakeContract.methods
          .getTotalBattlePower(this.walletAccount)
          .call()
          .then((res) => {
            this.totalBp = Web3.utils.fromWei(res, "ether");
            this.loadContract().then(() => {
              this.stakeContract.methods
                .totalChallengeBonus(this.walletAccount)
                .call()
                .then((res) => {
                  res.map(
                    (i) =>
                      (this.totalBp =
                        Number(this.totalBp) +
                        Number(Web3.utils.fromWei(i, "ether")))
                  );
                });
            });
          });
      });
    },
    loadYourWarrior() {
      this.loadContract().then(() => {
        this.stakeContract.methods
          .userStakedNFTCount(this.walletAccount)
          .call()
          .then((res) => {
            this.totalWarrior = res;
            this.loading = false;
          });
      });
    },
    loadEndPoolDate() {
      this.loadContract().then(() => {
        this.stakeContract.methods
          .getEndPoolDate()
          .call()
          .then((res) => {
            var dt = new Date(res * 1000);
            // console.log(dt);
            this.endPoolDate = dt;
            // console.log("end date : "+this.endPoolDate);
          });
      });
    },
    async loadLock() {
      this.loadContract().then(() => {
        var vm = this;
        this.stakeContract.methods
          .isUnlock(vm.walletAccount)
          .call()
          .then((pl) => {
            // console.log("loadUnLock", pl);
            if (!pl) {
              this.isStaked = true;
              this.isLocked = true;
            } else {
              this.isLocked = false;
            }
          });

        this.stakeContract.methods
          .releaseTime(vm.walletAccount)
          .call()
          .then((pl) => {
            if (pl != 0) {
              this.attributes[0].releaseTime = new Date(pl * 1000);
              console.log("releaseTime Date", this.attributes[0].releaseTime);
            }
          });
      });
    },
    loadStakeStatus() {
      this.loadContract().then(() => {
        this.stakeContract.methods
          .status(this.walletAccount)
          .call()
          .then((res) => {
            this.attributes[0].stakeStatus = res;
            // console.log(
            //   "this.attributes[0].yourStake",
            //   this.attributes[0].stakeStatus
            // );
            if (this.attributes[0].stakeStatus == "NO STAKE") {
              this.isStaked = false;
              this.isLocked = false;
            } else if (this.attributes[0].stakeStatus == "STAKED") {
              this.isStaked = true;
              this.isLocked = false;
            } else if (this.attributes[0].stakeStatus == "WAITING") {
              this.isStaked = true;
              this.isLocked = true;
            }
          });
      });
    },
    transactionHash(transaction) {
      console.log("transaction", transaction);
      this.txHash = transaction;
      this.switchModal("transactionSubmit", "waitConfirmTransaction");
    },
    async unStake(tokenId) {
      this.loadContract().then(() => {
        var vm = this;
        this.stakeContract.methods
          .unJoinWarrior(tokenId)
          .send({ from: vm.walletAccount })
          .on("sent", () => {
            this.sendUnStake("waitConfirmTransaction", "confirmUnstake");
          })
          .on("transactionHash", (tx) => this.transactionHash(tx))
          .on("receipt", (data) => this.receiptUnStake(data))
          .on("error", (error) => this.showToastError(error));
      });
    },
    sendUnStake(open, close) {
      // this.modalWaitingDesc = `UNSTAKING ${Number(
      //   this.attributes[0].yourStake + this.attributes[0].yourReward
      // ).toLocaleString()} ECIO`;
      this.modalWaitingDesc = `UNSTAKING`;
      this.switchModal(open, close);
    },
    receiptUnStake(data) {
      console.log("Approve data", data);
      this.alertTransaction("Unstake Warrior!", this.txHash);
    },
    async claimHandler() {
      this.loadContract().then(() => {
        var vm = this;
        if (
          this.walletAccount.toLowerCase() !=
            "0x3f5F748Ffc13B81fED6282aFBc5D416D281D33Cc".toLowerCase() &&
          this.walletAccount.toLowerCase() !=
            "0x8b6E68f7d3C72CD4BfeC2B0D87c5Ef664ea4Ed2e".toLowerCase() &&
          this.walletAccount.toLowerCase() !=
            "0x0E4Ca9E0b44b4bbf072136645f44Ef69b9C8762A".toLowerCase() &&
          this.walletAccount.toLowerCase() !=
            "0x60365B27ABFF56915e21497d5320186922C2E732".toLowerCase()
        ) {
          this.stakeContract.methods
            .claimReward()
            .send({
              from: vm.walletAccount,
              value: Web3.utils.toWei("0.005", "ether"),
            })
            .on("sent", () => {
              this.sendClaim("waitConfirmTransaction", "confirmClaim");
            })
            .on("transactionHash", (tx) => this.transactionHash(tx))
            .on("receipt", (data) => this.receiptClaim(data))
            .on("error", (error) => this.showToastError(error));
        } else {
          let err = { message: "Please try another wallet" };
          this.showToastError(err);
        }
      });
    },
    sendClaim(open, close) {
      this.modalWaitingDesc = `CLAIMING`;
      this.switchModal(open, close);
    },
    receiptClaim(data) {
      var msg = `Claimed staked ECIO`;
      console.log("receiptClaimed data", data);
      this.successTransaction(msg, this.txHash);
      this.switchModal("transactionSubmit", "waitConfirmTransaction");
      this.isStaked = false;
    },
    async withdrawAll() {
      this.loadContract().then(() => {
        var vm = this;
        this.stakeContract.methods
          .unJoinAllWarrior()
          .send({ from: vm.walletAccount })
          .on("sent", () => {
            this.sendUnStake("waitConfirmTransaction", "confirmUnstake");
          })
          .on("transactionHash", (tx) => this.transactionHash(tx))
          .on("receipt", (data) => this.receiptUnStake(data))
          .on("error", (error) => this.showToastError(error));
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
        // this.loadYourStake();
        this.loadAccountBalance();
        this.loadYourBp();
        this.loadYourWarrior();
        this.loadCanClaim();
        this.loadAllChallenge();
        // this.loadYourReward();
        // this.loadAccountBalance();
        // this.loadRemainingPool();
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
      // const text = {
      //   component: TransactionReceipt,
      //   props: {
      //     title: "Transaction Failed",
      //     txt: err.message
      //   },
      // };
      console.log("error", err);
      this.$toast.error(text, {
        position: "top-right",
        timeout: 5000,
        hideProgressBar: true,
        icon: true,
        rtl: false,
      });
    },
    switchModal(open, close) {
      this.$modal.show(open);
      this.$modal.hide(close);
    },
    convertToDecimal(wei) {
      // console.log(wei.data.hp);
      // console.log(Web3.utils.fromWei(wei, 'ether'));
      let result = Web3.utils.fromWei(wei);
      return Number(
        result.toLocaleString(undefined, {
          minimumFractionDigits: 3,
          maximumFractionDigits: 3,
        })
      );
    },
    calculateBP(hp, atk, aspd, def) {
      // console.log(wei.data.hp);
      // console.log(Web3.utils.fromWei(wei, 'ether'));
      let hpCon = this.convertToDecimal(hp);
      let atkCon = this.convertToDecimal(atk);
      let aspdCon = this.convertToDecimal(aspd);
      let defCon = this.convertToDecimal(def);
      // + ((item.atk / item.aspd) * 10 + (item.def * 15)))
      let result = hpCon + ((atkCon / aspdCon) * 10 + defCon * 15);
      // let result = parseInt(Web3.utils.fromWei(wei));
      return result.toLocaleString(undefined, {
        minimumFractionDigits: 3,
        maximumFractionDigits: 3,
      });
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
  padding: 25px 20px;
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
  padding: 25px;
  background-image: url("../../assets/nftstaking/bgchabox.png");
  background-repeat: no-repeat;
  background-position: top center;
  background-size: 100% 100%;
  margin-top: 10px;
  margin-bottom: 20px;
}

.natalie {
  padding: 25px;
  background-image: url("../../assets/nftstaking/challenge/natalie.png");
  background-repeat: no-repeat;
  background-position: top center;
  background-size: 100% 100%;
  margin-top: 10px;
  margin-bottom: 20px;
}

.ray {
  padding: 25px;
  background-image: url("../../assets/nftstaking/challenge/ray.png");
  background-repeat: no-repeat;
  background-position: top center;
  background-size: 100% 100%;
  margin-top: 10px;
  margin-bottom: 20px;
  /* opacity: 60%; */
}

.shinwoo {
  padding: 25px;
  background-image: url("../../assets/nftstaking/challenge/shinwoo.png");
  background-repeat: no-repeat;
  background-position: top center;
  background-size: 100% 100%;
  margin-top: 10px;
  margin-bottom: 20px;
  /* opacity: 60%; */
}

.common {
  padding: 25px;
  background-image: url("../../assets/nftstaking/challenge/cm.png");
  background-repeat: no-repeat;
  background-position: top center;
  background-size: 100% 100%;
  margin-top: 10px;
  margin-bottom: 20px;
}

.rare {
  padding: 25px;
  background-image: url("../../assets/nftstaking/challenge/rare.png");
  background-repeat: no-repeat;
  background-position: top center;
  background-size: 100% 100%;
  margin-top: 10px;
  margin-bottom: 20px;
}

.epic {
  padding: 25px;
  background-image: url("../../assets/nftstaking/challenge/epic.png");
  background-repeat: no-repeat;
  background-position: top center;
  background-size: 100% 100%;
  margin-top: 10px;
  margin-bottom: 20px;
}

.limited {
  padding: 25px;
  background-image: url("../../assets/nftstaking/challenge/limited.png");
  background-repeat: no-repeat;
  background-position: top center;
  background-size: 100% 100%;
  margin-top: 10px;
  margin-bottom: 20px;
}

.legend {
  padding: 25px;
  background-image: url("../../assets/nftstaking/challenge/lg.png");
  background-repeat: no-repeat;
  background-position: top center;
  background-size: 100% 100%;
  margin-top: 10px;
  margin-bottom: 20px;
}

.nuker {
  padding: 25px;
  background-image: url("../../assets/nftstaking/challenge/nuker.png"),
    url("../../assets/nftstaking/coming-soon.png");
  background-repeat: no-repeat, no-repeat;
  background-position: top center, top center;
  background-size: 100% 100%, 100% 100%;
  margin-top: 10px;
  margin-bottom: 20px;
  /* opacity: 60%; */
}

.support {
  padding: 25px;
  background-image: url("../../assets/nftstaking/challenge/support.png");
  background-repeat: no-repeat;
  background-position: top center;
  background-size: 100% 100%;
  margin-top: 10px;
  margin-bottom: 20px;
  /* opacity: 60%; */
}

.tank {
  padding: 25px;
  background-image: url("../../assets/nftstaking/challenge/tank.png");
  background-repeat: no-repeat;
  background-position: top center;
  background-size: 100% 100%;
  margin-top: 10px;
  margin-bottom: 20px;
  /* opacity: 60%; */
}

.fighter {
  padding: 25px;
  background-image: url("../../assets/nftstaking/challenge/fighter.png");
  background-repeat: no-repeat;
  background-position: top center;
  background-size: 100% 100%;
  margin-top: 10px;
  margin-bottom: 20px;
  /* opacity: 60%; */
}

.challenge-header {
  font-size: 22px;
  text-align: end;
  font-weight: 700;
}

.challenge-info {
  font-size: 15px;
  text-align: end;
  font-weight: 500;
  color: white;
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

.VueCarousel-navigation-button button {
  color: white !important;
  margin-right: 25px;
}

.desktop {
  display: block;
}

.soon {
  text-align: center;
}

.mb {
  display: none;
}
.btn-nft-stake {
  padding: 5px;
  border-radius: 10px;
  background-color: #4804d9;
  text-align: center;
  color: #fff;
  font-size: 16px !important;
  height: 40px;
  width: 200px;
  font-weight: bold !important;
  border: 0;
}
button.btn-nft-header {
  padding: 5px 10px;
  border-radius: 5px;
  background-color: #fff;
  text-align: center;
  color: #000 !important;
  font-size: 14px !important;
  height: 40px;
  font-weight: bold !important;
  border: 0;
  width: 120px;
}
.btn-nft-header:disabled {
  background-color: #000 !important;
  color: #585858 !important;
}
.challenge-coming-soon {
  opacity: 0.4 !important;
}
@media (max-width: 800px) {
  .desktop {
    display: none;
  }
  .mb {
    display: block;
  }
}
</style>
