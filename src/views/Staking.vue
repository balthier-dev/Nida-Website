<template>
  <div class="">
    <div class="main-container">
      <section class="cover imagebg" data-overlay="4">
        <div class="background-image-holder background-top">
          <img alt="background" src="../assets/images/bg-staking.png" />
        </div>
        <div class="container">
          <div class="row">
            <div class="col">
              <h1 class="title-h1 mt-3 text-center" :title="walletAccount">
                POOLS
              </h1>
            </div>
          </div>
          <!-- isLocked: {{ isLocked }}<br />
          isApproved: {{ isApproved }}<br />
          isStaked: {{ isStaked }} -->
          <div class="row mt-3">
            <div class="col-12 col-md-6 col-lg-4">
              <StakingCard
                title="admiral"
                :attribute="attributes[0]"
                :isStaked="isStaked.admiral"
                :isApproved="isApproved.admiral"
                :status="true"
                :index="0"
                @approveHandler="approveHandler"
                @setSelectPool="
                  (e, v) => {
                    activePool = e;
                    activeValue = v;
                  }
                "
              />
            </div>
            <div class="col-12 col-md-6 col-lg-4">
              <StakingCard
                title="captain"
                :attribute="attributes[1]"
                :isStaked="isStaked.captain"
                :isApproved="isApproved.captain"
                :index="1"
                :status="false"
                @setSelectPool="
                  (e, v) => {
                    activePool = e;
                    activeValue = v;
                  }
                "
              />
            </div>
            <div class="col-12 col-md-6 col-lg-4">
              <StakingCard
                title="crewman"
                :attribute="attributes[2]"
                :isStaked="isStaked.crewman"
                :isApproved="isApproved.crewman"
                :status="true"
                :index="2"
                @approveHandler="approveHandler"
                @setSelectPool="
                  (e, v) => {
                    activePool = e;
                    activeValue = v;
                  }
                "
              />
            </div>
          </div>
        </div>
      </section>
      <modal
        height="auto"
        :scrollable="true"
        :adaptive="true"
        class="backdrop"
        name="caution"
      >
        <div class="bg-ecio-bg p-5 text-uppercase">
          <h2
            class="text-center color-red text-3xl d-flex justify-content-center"
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
            caution
          </h2>
          <h3 class="color-red text-xl my-3 text-uppercase text-center">
            Please read this carefully :
          </h3>
          <p class="text-white text-xl">
            At the end of your staking, there will be a
            {{ attributes[activePool].unstakePeriodFree }} days unstake period.
            During this period, your tokens will be locked and can be claimed
            when the period has passed,
            <span class="text-custom-green">without any fees.</span>
          </p>
          <p class="my-4 text-white text-xl">
            If you wish to claim your tokens before the end of the
            {{ attributes[activePool].unstakePeriodFree }} day UNSTAKING PERIOD,
            you will be charged a
            <span class="text-custom-green"
              >{{ attributes[activePool].unstakePeriodUrgentFee }}% urgency
              unlock fee.</span
            >
            This fee will be deducted from your staked tokens.
          </p>
          <p class="text-white text-xl">
            By continuing with the staking process, you’re agreeing to these
            terms
          </p>
          <div class="mt-3">
            <input
              type="checkbox"
              name="agreeBox"
              id="agreeBox"
              v-model="accept"
            />
            <label for="agreeBox" class="text-white text-xl"
              >I have read the above agreements</label
            >
          </div>
          <div class="row mt-3">
            <div class="col-6">
              <button
                class="btn btn-ecio-dark w-100"
                @click="$modal.hide('caution')"
              >
                CANCEL
              </button>
            </div>
            <div class="col-6">
              <button
                :disabled="!accept"
                class="btn btn-ecio-primary w-100 text-uppercase"
                @click="switchModal('stakeToken', 'caution')"
              >
                CONFIRM
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
        name="stakeToken"
      >
        <div class="bg-ecio-bg p-5">
          <h2 class="text-center text-white mb-5 text-2xl text-uppercase">
            STAKING TOKENs <br />
            <span class="text-grey"
              >Minimum Per staking
              {{ Number(attributes[activePool].minPerStake).toLocaleString() }}
              ECIO</span
            >
          </h2>
          <div class="text-right">
            <span
              @click="setMaxStakeHandler"
              style="cursor: pointer"
              class="text-right text-uppercase text-grey text-sm"
              >Balance: {{ Number(ecioBalance).toLocaleString() }}</span
            >
          </div>
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span
                class="input-group-text quantico text-white text-2xl"
                id="stakeToken"
                >ECIO</span
              >
            </div>
            <money
              v-model="stakeTokenAmount"
              @input="
                Number(
                  Number(attributes[activePool].yourStake) +
                    Number(stakeTokenAmount)
                ) > Number(attributes[activePool].minPerStake - 1)
                  ? (validMinimum = false)
                  : (validMinimum = true),
                  checkActivePoolRemain(stakeTokenAmount)
              "
              class="form-control input-dark"
              aria-describedby="stakeToken"
            ></money>
          </div>
          <div class="row mt-3">
            <div class="col-6">
              <button
                class="btn btn-ecio-dark w-100"
                @click="$modal.hide('stakeToken')"
              >
                CANCEL
              </button>
            </div>
            <!-- line 188   Number(stakeTokenAmount) > -->
            <div class="col-6">
              <button
                class="btn btn-ecio-primary w-100 text-uppercase"
                @click="
                  Number(
                    Number(attributes[activePool].yourStake) +
                      Number(stakeTokenAmount)
                  ) > Number(attributes[activePool].minPerStake - 1)
                    ? !attributes[activePool].poolRemain &&
                      !(Number(ecioBalance) < Number(stakeTokenAmount))
                      ? stakingHandler()
                      : ''
                    : (validMinimum = true)
                "
              >
                CONFIRM
              </button>
            </div>
          </div>
          <div v-if="validMinimum" class="color-red text-center mt-3">
            <h4>
              You need to Stake at least
              {{ Number(attributes[activePool].minPerStake).toLocaleString() }}
              ECIO.
            </h4>
          </div>
          <div
            v-if="attributes[activePool].poolRemain"
            class="color-red text-center mt-3"
          >
            <h4>The Stake Pool doesn't have enough space.</h4>
          </div>
          <div
            v-if="Number(ecioBalance) < Number(stakeTokenAmount)"
            class="color-red text-center mt-3"
          >
            <h4>Insufficient ECIO balance.</h4>
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
        name="confirmUnstake"
      >
        <div class="bg-ecio-bg p-5 text-uppercase quantico">
          <h2 class="text-white text-2xl text-center">
            PLEASE CONFIRM UNSTAKE
          </h2>
          <h2 class="color-red text-2xl text-center">
            YOUR TOKENs WILL BE LOCKED FOR
            {{ attributes[activePool].unstakePeriodFree }} DAYS
          </h2>
          <div class="row mt-5 text-xl">
            <div class="col-6 text-white">your tokens</div>
            <div class="col-6 text-custom-green text-right">
              {{
                Number(attributes[activePool].yourStake).toLocaleString(
                  undefined,
                  {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }
                )
              }}
            </div>
            <div class="col-6 text-white">your rewards</div>
            <div class="col-6 text-custom-green text-right">
              {{
                Number(attributes[activePool].yourReward).toLocaleString(
                  undefined,
                  {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }
                )
              }}
            </div>
            <div class="col-12">
              <hr class="my-3" />
            </div>
            <div class="col-6 text-white">Receive total</div>
            <div class="col-6 text-custom-green text-right">
              {{
                Number(
                  Number(attributes[activePool].yourStake) +
                    Number(attributes[activePool].yourReward)
                ).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })
              }}
            </div>
          </div>
          <div class="row mt-3">
            <div class="col-6">
              <button
                class="btn btn-ecio-dark w-100"
                @click="$modal.hide('confirmUnstake')"
              >
                CANCEL
              </button>
            </div>
            <div class="col-6">
              <button
                class="btn btn-ecio-primary w-100 text-uppercase"
                @click="
                  isStaked[activeValue] && !isLocked[activeValue]
                    ? unStake()
                    : [(isLocked[activeValue] = false), $modal.hide('unstake')]
                "
              >
                CONFIRM
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
        name="claimToken"
      >
        <div class="bg-ecio-bg p-5 text-uppercase quantico">
          <h2 class="text-white text-2xl text-center">CLAIM YOUR TOKENs</h2>
          <div class="row mt-5 text-xl">
            <div class="col-6 text-white">Your tokens</div>
            <div class="col-6 text-custom-green text-right">
              {{
                Number(attributes[activePool].yourStake).toLocaleString(
                  undefined,
                  {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }
                )
              }}
            </div>
            <div class="col-6 text-white">Your rewards</div>
            <div class="col-6 text-custom-green text-right">
              {{
                Number(attributes[activePool].yourReward).toLocaleString(
                  undefined,
                  {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }
                )
              }}
            </div>
            <div class="col-12">
              <hr class="my-3" />
            </div>
            <div class="col-6 text-white">Receive total</div>
            <div class="col-6 text-custom-green text-right">
              {{
                Number(
                  Number(attributes[activePool].yourStake) +
                    Number(attributes[activePool].yourReward)
                ).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })
              }}
            </div>
          </div>
          <div class="row mt-3">
            <div class="col-6">
              <button
                class="btn btn-ecio-dark w-100"
                @click="$modal.hide('claimToken')"
              >
                CANCEL
              </button>
            </div>
            <div class="col-6">
              <button
                class="btn btn-ecio-primary w-100 text-uppercase"
                @click="
                  $modal.hide('claimToken'),
                    claimHandler(),
                    (isLocked[activeValue] = true)
                "
              >
                CONFIRM
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
        name="unStakeNow"
      >
        <div class="bg-ecio-bg p-5 text-uppercase quantico">
          <h2 class="text-white text-2xl text-center">
            Please confirm urgent unstake you need to pay
          </h2>
          <div class="row mt-5 text-xl">
            <div class="col-6 text-white">your tokens</div>
            <div class="col-6 text-custom-green text-right">
              {{
                Number(attributes[activePool].yourStake).toLocaleString(
                  undefined,
                  {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }
                )
              }}
            </div>
            <div class="col-6 text-white">
              {{ attributes[activePool].unstakePeriodUrgentFee }}% Fee
            </div>
            <div class="col-6 text-custom-green text-right">
              {{
                (
                  (Number(attributes[activePool].yourStake) *
                    Number(attributes[activePool].unstakePeriodUrgentFee) *
                    -1) /
                  100
                ).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })
              }}
            </div>
            <div class="col-6 text-white">Your rewards</div>
            <div class="col-6 text-custom-green text-right">
              {{
                Number(attributes[activePool].yourReward).toLocaleString(
                  undefined,
                  {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }
                )
              }}
            </div>
            <div class="col-12">
              <hr class="my-3" />
            </div>
            <div class="col-6 text-white">Receive total</div>
            <div class="col-6 text-custom-green text-right">
              {{
                Number(
                  Number(attributes[activePool].yourStake) +
                    (Number(attributes[activePool].yourStake) *
                      Number(attributes[activePool].unstakePeriodUrgentFee) *
                      -1) /
                      100 +
                    Number(attributes[activePool].yourReward)
                ).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })
              }}
            </div>
          </div>
          <div class="row mt-3">
            <div class="col-6">
              <button
                class="btn btn-ecio-dark w-100"
                @click="$modal.hide('unStakeNow')"
              >
                CANCEL
              </button>
            </div>
            <div class="col-6">
              <button
                class="btn btn-ecio-primary w-100 text-uppercase"
                @click="unStakeNow()"
              >
                CONFIRM
              </button>
            </div>
          </div>
        </div>
      </modal>
      <!-- <modal
        height="auto"
        :scrollable="true"
        :adaptive="true"
        class="backdrop"
        name="transactionReceipt"
      >
        <div class="bg-ecio-bg p-5">
          <div class="row">
            <div class="col-3 d-flex align-items-center justify-content-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="45"
                height="45"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#e0fb16"
                  d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.25 17.292l-4.5-4.364 1.857-1.858 2.643 2.506 5.643-5.784 1.857 1.857-7.5 7.643z"
                />
              </svg>
            </div>
            <div class="col-12 text-uppercase">
              <h2 class="text-white mb-3 text-2xl">transaction receipt</h2>
              <h3 class="mb-3 text-xl h2">
                swapping 300 BUSD for 58774.1 ecio
              </h3>
              <h2 class="color-light-blue mb-3 text-2xl">
                <u>view on bscscan</u>
              </h2>
            </div>
          </div>
        </div>
      </modal> -->
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
      <modal
        height="auto"
        :scrollable="true"
        :adaptive="true"
        class="backdrop"
        name="transactionReject"
      >
        <div class="bg-ecio-bg p-5 text-uppercase">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="35"
              height="35"
              viewBox="0 0 24 24"
              class="mx-auto"
            >
              <path
                fill="#FF0000"
                d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1 5h2v10h-2v-10zm1 14.25c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25z"
              />
            </svg>
          </div>
          <h2 class="text-center color-danger my-3 text-2xl">
            Transaction rejected.
          </h2>
          <div class="col-4 mx-auto">
            <button
              class="btn btn-ecio-dark text-uppercase"
              @click="switchModal('transactionFail', 'transactionReject')"
            >
              DISMISS
            </button>
          </div>
        </div>
      </modal>
      <!-- <modal
        height="auto"
        :scrollable="true"
        :adaptive="true"
        class="backdrop"
        name="transactionFail"
      >
        <div class="bg-ecio-bg p-5">
          <div class="row">
            <div class="col-3 d-flex align-items-center justify-content-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="45"
                height="45"
                viewBox="0 0 24 24"
                class="mx-auto"
              >
                <path
                  fill="#FF0000"
                  d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1 5h2v10h-2v-10zm1 14.25c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25z"
                />
              </svg>
            </div>
            <div class="col-9 text-uppercase d-flex align-items-center">
              <h2 class="color-danger text-2xl">transaction failed</h2>
            </div>
          </div>
        </div>
      </modal> -->
      <modal
        height="auto"
        :scrollable="true"
        :adaptive="true"
        class="backdrop"
        name="unstake"
      >
        <div class="bg-ecio-bg p-5">
          <h2 class="text-center text-white mb-5 text-2xl text-uppercase">
            Please confirm to unstake
          </h2>
          <div class="row mt-3">
            <div class="col-6">
              <button
                class="btn btn-ecio-dark w-100"
                @click="$modal.hide('unstake')"
              >
                CANCEL
              </button>
            </div>
            <div class="col-6">
              <button
                class="btn btn-ecio-primary w-100 text-uppercase"
                @click="
                  isStaked[activeValue] && !isLocked[activeValue]
                    ? [$modal.hide('unstake'), (isLocked[activeValue] = true)]
                    : [(isLocked[activeValue] = false), $modal.hide('unstake')]
                "
              >
                CONFIRM
              </button>
            </div>
          </div>
        </div>
      </modal>
    </div>
  </div>
</template>
<script>
import Web3 from "web3";
import ERC20 from "./../contracts/ERC20.json";
import ABIAdmiral from "./../contracts/ECIOStakingPool1.json";
import ABICrewman from "./../contracts/ECIOStakingPoolCrewman.json";
import StakingCard from "@/components/StakeCard";
import TransactionReceipt from "@/components/TransactionReceipt";
export default {
  components: { StakingCard },
  data() {
    return {
      attributes: [
        {
          poolEnd: new Date("12/21/2022 19:50:00 GMT+0700"), //Mainnet Deploy date (Dec-26-2021 12:48:36 PM +UTC)
          apr: 200,
          minPerStake: 35000,
          unstakePeriodFree: "5",
          unstakePeriodUrgentFee: "10",
          totalPoolStatusCurrent: 0,
          totalPoolStatusMax: 70000000,
          yourStake: 0,
          yourReward: 0,
          releaseTime: new Date(),
          stakeStatus: "NO STAKE",
          poolRemain: true,
          poolRemainMin: true,
          isPoolEnd: false,
        },
        {
          poolEnd: null,
          apr: null,
          minPerStake: 17500,
          unstakePeriodFree: "5",
          unstakePeriodUrgentFee: "10",
          totalPoolStatusCurrent: 0,
          totalPoolStatusMax: 140000000,
          yourStake: 0,
          yourReward: 0,
          releaseTime: new Date(),
          stakeStatus: "NO STAKE",
          poolRemain: true,
          poolRemainMin: true,
          isPoolEnd: false,
        },
        {
          poolEnd: new Date("01/13/2023 20:50:00 GMT+0700"),
          apr: 100,
          minPerStake: 5000,
          unstakePeriodFree: "3",
          unstakePeriodUrgentFee: "10",
          totalPoolStatusCurrent: 0,
          totalPoolStatusMax: 70000000,
          yourStake: 0,
          yourReward: 0,
          releaseTime: new Date(),
          stakeStatus: "NO STAKE",
          poolRemain: true,
          poolRemainMin: true,
          isPoolEnd: false,
        },
      ],
      validMinimum: false,
      accept: false,
      blockExplorerUrl: process.env.VUE_APP_BLOCK_EXPLORER,
      contractAddressAdmiral:
        process.env.VUE_APP_STAKING_ADMIRAL_CONTRACT_ADDRESS,
      contractAddressCrewman:
        process.env.VUE_APP_STAKING_CREWMAN_CONTRACT_ADDRESS,
      admiralContract: undefined,
      crewManContract: undefined,
      ecioContract: undefined,
      isLocked: {
        admiral: false,
        captain: false,
        crewman: false,
      },
      isApproved: {
        admiral: false,
        captain: false,
        crewman: false,
      },
      isStaked: {
        admiral: false,
        captain: false,
        crewman: false,
      },
      stakeToken: null,
      stakeTokenAmount: 0,
      walletAccount: undefined,
      ecioBalance: 0,
      modalWaitingDesc: "",
      txHash: "",
      activePool: 0,
      activeValue: "admiral",
    };
  },
  mounted() {
    this.connectWallet().then(() => {
      this.loadAccountBalance();
      this.loadMinStaking();
      this.loadMaxStaking();
      this.loadWithdrawLockDay();
      this.loadFeeRate();
      this.loadRemainingPool();
      this.loadYourStake();
      this.loadYourReward();
      this.loadEndPool();
      // this.loadApproved();
      this.loadLock();
      this.loadStakeStatus();
      this.checkPoolRemain();
    });

    /*----Test notification msg----------------------------
     this.successTransaction("STAKING 580,774 ecio", "x");
     this.showToastError(
       { message: "Metamask rejected form owner" },
       "this.txHash"
     );
    ----------------------------------------------------*/

    //Update real-time reward
    setInterval(() => this.loadYourReward(), 3000);
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
      // console.log("chainId", process.env.VUE_APP_CHAIN_ID);
      // console.log("chainName", process.env.VUE_APP_CHAIN_NAME);
      // console.log("rpcUrls", process.env.VUE_APP_RPC_URL);
      // console.log("name", process.env.VUE_APP_CURRENCY_NAME);
      // console.log("symbol", process.env.VUE_APP_CURRENCY_SYMBOL);
      // console.log("blockExplorerUrls", process.env.VUE_APP_BLOCK_EXPLORER);
    },
    validated() {
      if (typeof window.ethereum !== "undefined") {
        return true;
      }

      return false;
    },
    async loadContract() {
      window.web3 = new Web3(window.ethereum);
      if (typeof window.ethereum == "undefined") {
        window.web3.setProvider(
          new Web3.providers.HttpProvider(process.env.VUE_APP_RPC_URL)
        );
        console.log("window.ethereum undefined", process.env.VUE_APP_RPC_URL);
      }
      this.admiralContract = await new window.web3.eth.Contract(
        ABIAdmiral.abi,
        this.contractAddressAdmiral
      );
      this.crewManContract = await new window.web3.eth.Contract(
        ABICrewman.abi,
        this.contractAddressCrewman
      );
      this.ecioContract = await new window.web3.eth.Contract(
        ERC20.abi,
        process.env.VUE_APP_ECIO_CONTRACT_ADDRESS
      );
      // console.log("this.admiralContract", this.admiralContract);
      // console.log("this.crewManContract", this.crewManContract);
      // console.log("this.ecioContract", this.ecioContract);
      // console.log("this.contractAddressAdmiral", this.contractAddressAdmiral);
      // console.log("this.contractAddressCrewman", this.contractAddressCrewman);
      // console.log(
      //   "process.env.VUE_APP_ECIO_CONTRACT_ADDRESS",
      //   process.env.VUE_APP_ECIO_CONTRACT_ADDRESS
      // );
    },
    async loadAccountBalance() {
      this.loadContract().then(() => {
        this.ecioContract.methods
          .balanceOf(window.ethereum.selectedAddress)
          .call()
          .then((results) => {
            this.ecioBalance = Web3.utils.fromWei(results, "ether");
          });
      });
    },
    async loadApproved() {
      this.loadContract().then(async () => {
        await this.ecioContract.methods
          .allowance(this.walletAccount, this.contractAddressAdmiral)
          .call()
          .then(async (pl) => {
            let allowanceAmountAdmiral = Web3.utils.fromWei(pl, "ether");
            console.log("allowanceAmountAdmiral", allowanceAmountAdmiral);
            if (
              allowanceAmountAdmiral >
              this.attributes[0].totalPoolStatusMax / 2
            ) {
              this.isApproved.admiral = true;
            }
          });
        await this.ecioContract.methods
          .allowance(this.walletAccount, this.contractAddressCrewman)
          .call()
          .then(async (pl) => {
            let allowanceAmountCrewman = Web3.utils.fromWei(pl, "ether");
            console.log("allowanceAmountCrewman", allowanceAmountCrewman);
            if (
              allowanceAmountCrewman >
              this.attributes[2].totalPoolStatusMax / 2
            ) {
              this.isApproved.crewman = true;
            }
          });
        this.loadLock();
      });
    },
    async loadMinStaking() {
      await this.loadContract().then(() => {
        this.admiralContract.methods
          .MINIMUM_STAKING()
          .call()
          .then((pl) => {
            this.attributes[0].minPerStake = Web3.utils.fromWei(pl, "ether");
          });

        this.crewManContract.methods
          .MINIMUM_STAKING()
          .call()
          .then((pl) => {
            this.attributes[2].minPerStake = Web3.utils.fromWei(pl, "ether");
          });
      });
    },
    async loadMaxStaking() {
      await this.loadContract().then(() => {
        this.admiralContract.methods
          .MAXIMUM_STAKING()
          .call()
          .then((pl) => {
            this.attributes[0].totalPoolStatusMax = Web3.utils.fromWei(
              pl,
              "ether"
            );
          });

        this.crewManContract.methods
          .MAXIMUM_STAKING()
          .call()
          .then((pl) => {
            this.attributes[2].totalPoolStatusMax = Web3.utils.fromWei(
              pl,
              "ether"
            );
          });
      });
    },
    async loadEndPool() {
      await this.loadContract().then(() => {
        this.admiralContract.methods
          .endPool()
          .call()
          .then((time) => {
            var dt = new Date(time * 1000);
            this.attributes[0].poolEnd = dt.setDate(dt.getDate() - 5);
          });

        this.crewManContract.methods
          .endPool()
          .call()
          .then((time) => {
            var dt = new Date(time * 1000);
            this.attributes[2].poolEnd = dt.setDate(dt.getDate() - 5);
          });
      });
    },
    async loadWithdrawLockDay() {
      await this.loadContract().then(() => {
        this.admiralContract.methods
          .WITHDRAW_LOCK_DAY()
          .call()
          .then((res) => {
            this.attributes[0].unstakePeriodFree = res;
          });

        this.crewManContract.methods
          .WITHDRAW_LOCK_DAY()
          .call()
          .then((res) => {
            this.attributes[2].unstakePeriodFree = res;
          });
      });
    },
    async loadFeeRate() {
      await this.loadContract().then(() => {
        this.admiralContract.methods
          .FEE()
          .call()
          .then((res) => {
            this.attributes[0].unstakePeriodUrgentFee = res / 100;
          });

        this.crewManContract.methods
          .FEE()
          .call()
          .then((res) => {
            this.attributes[2].unstakePeriodUrgentFee = res / 100;
          });
      });
    },
    async loadRemainingPool() {
      await this.loadContract().then(() => {
        this.admiralContract.methods
          .remainingPool()
          .call()
          .then((pl) => {
            console.log(
              "admiral RemainingPool",
              Web3.utils.fromWei(pl, "ether")
            );
            this.attributes[0].totalPoolStatusCurrent = Web3.utils.fromWei(
              pl,
              "ether"
            );
          });

        this.crewManContract.methods
          .remainingPool()
          .call()
          .then((pl) => {
            console.log(
              "crewMan RemainingPool",
              Web3.utils.fromWei(pl, "ether")
            );
            this.attributes[2].totalPoolStatusCurrent = Web3.utils.fromWei(
              pl,
              "ether"
            );
          });
      });
    },
    loadYourStake() {
      this.loadContract().then(() => {
        this.admiralContract.methods
          .staked(this.walletAccount)
          .call()
          .then((res) => {
            this.attributes[0].yourStake = Web3.utils.fromWei(res, "ether");
            if (Number(this.attributes[0].yourStake) > 0) {
              this.isStaked.admiral = true;
            }
          });
        this.crewManContract.methods
          .staked(this.walletAccount)
          .call()
          .then((res) => {
            this.attributes[2].yourStake = Web3.utils.fromWei(res, "ether");
            if (Number(this.attributes[2].yourStake) > 0) {
              this.isStaked.crewman = true;
            }
          });
        this.loadApproved();
        this.loadLock();
      });
    },
    loadYourReward() {
      this.loadContract().then(() => {
        this.admiralContract.methods
          .earned(this.walletAccount)
          .call()
          .then((res) => {
            this.attributes[0].yourReward = Web3.utils.fromWei(res, "ether");
          });

        this.crewManContract.methods
          .earned(this.walletAccount)
          .call()
          .then((res) => {
            this.attributes[2].yourReward = Web3.utils.fromWei(res, "ether");
          });
      });
    },
    async loadLock() {
      this.loadContract().then(() => {
        var vm = this;
        this.admiralContract.methods
          .isUnlock(vm.walletAccount)
          .call()
          .then((pl) => {
            // console.log("loadUnLock", pl);
            if (!pl) {
              this.isStaked.admiral = true;
              this.isLocked.admiral = true;
            } else {
              this.isLocked.admiral = false;
            }
          });

        this.admiralContract.methods
          .releaseTime(vm.walletAccount)
          .call()
          .then((pl) => {
            if (pl != 0) {
              this.attributes[0].releaseTime = new Date(pl * 1000);
            }
          });

        this.crewManContract.methods
          .isUnlock(vm.walletAccount)
          .call()
          .then((pl) => {
            // console.log("loadUnLock", pl);
            if (!pl) {
              this.isStaked.crewman = true;
              this.isLocked.crewman = true;
            } else {
              this.isLocked.crewman = false;
            }
          });

        this.crewManContract.methods
          .releaseTime(vm.walletAccount)
          .call()
          .then((pl) => {
            if (pl != 0) {
              this.attributes[2].releaseTime = new Date(pl * 1000);
            }
          });
      });
    },
    loadStakeStatus() {
      this.loadContract().then(() => {
        this.admiralContract.methods
          .status(this.walletAccount)
          .call()
          .then((res) => {
            this.attributes[0].stakeStatus = res;
            if (this.attributes[0].stakeStatus == "NO STAKE") {
              this.isStaked.admiral = false;
              this.isLocked.admiral = false;
            } else if (this.attributes[0].stakeStatus == "STAKED") {
              this.isStaked.admiral = true;
              this.isLocked.admiral = false;
            } else if (this.attributes[0].stakeStatus == "WAITING") {
              this.isStaked.admiral = true;
              this.isLocked.admiral = true;
            }
          });

        this.crewManContract.methods
          .status(this.walletAccount)
          .call()
          .then((res) => {
            this.attributes[2].stakeStatus = res;
            if (this.attributes[2].stakeStatus == "NO STAKE") {
              this.isStaked.crewman = false;
              this.isLocked.crewman = false;
            } else if (this.attributes[2].stakeStatus == "STAKED") {
              this.isStaked.crewman = true;
              this.isLocked.crewman = false;
            } else if (this.attributes[2].stakeStatus == "WAITING") {
              this.isStaked.crewman = true;
              this.isLocked.crewman = true;
            }
          });
      });
    },
    checkPoolRemain(checkAmount) {
      for (let i = 0; i < 3; i++) {
        this.attributes[i].poolRemain =
          Number(this.attributes[i].totalPoolStatusCurrent) <=
            Number(checkAmount) && Number(checkAmount) > 0;
      }
    },
    checkActivePoolRemain(checkAmount) {
      this.attributes[this.activePool].poolRemain =
        Number(this.attributes[this.activePool].totalPoolStatusCurrent) <=
          Number(checkAmount) && Number(checkAmount) > 0;
    },
    setMaxStakeHandler() {
      this.stakeTokenAmount = Math.floor(this.ecioBalance);
    },
    approveHandler(index) {
      this.loadContract().then(() => {
        console.log("approveHandler", index);
        let vm = this;
        let maxStakeWei = Web3.utils.toWei(
          Web3.utils.toBN(vm.attributes[index].totalPoolStatusMax).toString(),
          "ether"
        );
        if (index == 0) {
          this.ecioContract.methods
            .approve(this.contractAddressAdmiral, maxStakeWei)
            .send({ from: this.walletAccount })
            .on("sent", (data) => this.sendApprove(data))
            .on("transactionHash", (tx) => this.transactionHash(tx))
            .on("receipt", (data) => this.receiptApprove(data, "admiral"))
            // .on("confirmation", (data) => this.confirmApprove(data))
            .on("error", (error) => this.showToastError(error));
        }
        if (index == 2) {
          this.ecioContract.methods
            .approve(this.contractAddressCrewman, maxStakeWei)
            .send({ from: this.walletAccount })
            .on("sent", (data) => this.sendApprove(data))
            .on("transactionHash", (tx) => this.transactionHash(tx))
            .on("receipt", (data) => this.receiptApprove(data, "crewman"))
            // .on("confirmation", (data) => this.confirmApprove(data))
            .on("error", (error) => this.showToastError(error));
        }
      });
    },
    sendApprove(data) {
      console.log("sendApprove data", data);
      this.modalWaitingDesc = "Approving your wallet";
      this.switchModal("waitConfirmTransaction", "stakeToken");
    },
    transactionHash(transaction) {
      console.log("transaction", transaction);
      this.txHash = transaction;
      this.switchModal("transactionSubmit", "waitConfirmTransaction");
    },
    receiptApprove(data, type) {
      console.log("Approve data", data, type);
      this.successTransaction("Approved your wallet", this.txHash);
      this.isStaked[type] = false;
      this.isApproved[type] = true;
    },
    async stakingHandler() {
      this.loadContract().then(() => {
        var vm = this;
        var stakeValue = Web3.utils.toWei(
          Web3.utils.toBN(vm.stakeTokenAmount).toString(),
          "ether"
        );
        console.log("stakeValue", stakeValue);
        if (this.activePool == 0) {
          console.log("this.activePool", this.activePool);
          this.admiralContract.methods
            .stake(stakeValue)
            .send({ from: vm.walletAccount })
            .on("sent", (data) => this.sendStake(data))
            .on("transactionHash", (tx) => this.transactionHash(tx))
            .on("receipt", (data) => this.receiptStake(data))
            // .on("confirmation", (data) => this.successTransaction(data))
            .on("error", (error) => this.showToastError(error));
        }

        if (this.activePool == 2) {
          console.log("this.activePool", this.activePool);
          this.crewManContract.methods
            .stake(stakeValue)
            .send({ from: vm.walletAccount })
            .on("sent", (data) => this.sendStake(data))
            .on("transactionHash", (tx) => this.transactionHash(tx))
            .on("receipt", (data) => this.receiptStake(data))
            // .on("confirmation", (data) => this.successTransaction(data))
            .on("error", (error) => this.showToastError(error));
        }
      });
    },
    sendStake() {
      this.modalWaitingDesc = `STAKING ${Number(
        this.stakeTokenAmount
      ).toLocaleString()} ECIO`;
      this.switchModal("waitConfirmTransaction", "stakeToken");
      // setTimeout(() => {
      //   this.successTransaction();
      //   this.switchModal("transactionSubmit", "waitConfirmTransaction");
      //   this.isStaked = true;
      // }, 2500);
    },
    receiptStake(data) {
      var msg = `Staked ${Number(this.stakeTokenAmount).toLocaleString()} ECIO`;
      console.log("receiptStake data", data);
      this.successTransaction(msg, this.txHash);
      this.switchModal("transactionSubmit", "waitConfirmTransaction");
      this.loadYourStake();
      this.loadStakeStatus();
      this.checkActivePoolRemain();
      this.isStaked[this.activeValue] = true;
    },
    async unStake() {
      this.loadContract().then(() => {
        var vm = this;
        if (this.activePool == 0) {
          this.admiralContract.methods
            .unStake()
            .send({ from: vm.walletAccount })
            .on("sent", () => {
              this.sendUnStake("waitConfirmTransaction", "confirmUnstake");
            })
            .on("transactionHash", (tx) => this.transactionHash(tx))
            .on("receipt", (data) => this.receiptUnStake(data))
            .on("confirmation", () => {
              this.$modal.hide("confirmUnstake");
              this.isLocked[this.activeValue] = true;
            })
            .on("error", (error) => this.showToastError(error));
        }

        if (this.activePool == 2) {
          this.crewManContract.methods
            .unStake()
            .send({ from: vm.walletAccount })
            .on("sent", () => {
              this.sendUnStake("waitConfirmTransaction", "confirmUnstake");
            })
            .on("transactionHash", (tx) => this.transactionHash(tx))
            .on("receipt", (data) => this.receiptUnStake(data))
            .on("confirmation", () => {
              this.$modal.hide("confirmUnstake");
              this.isLocked[this.activeValue] = true;
            })
            .on("error", (error) => this.showToastError(error));
        }
      });
    },
    sendUnStake(open, close) {
      this.modalWaitingDesc = `UNSTAKING`;
      this.switchModal(open, close);
    },
    receiptUnStake(data) {
      var msg = `Unstaking ${Number(
        Number(this.attributes[this.activePool].yourStake) +
          Number(this.attributes[this.activePool].yourReward)
      ).toLocaleString()} ECIO`;
      console.log("receiptUnStaking data", data);
      this.successTransaction(msg, this.txHash);
      this.switchModal("transactionSubmit", "waitConfirmTransaction");
      this.loadLock();
      this.loadStakeStatus();
      this.isStaked[this.activeValue] = true;
    },
    async claimHandler() {
      this.loadContract().then(() => {
        var vm = this;
        if (this.activePool == 0) {
          console.log("claimHandler", this.activePool);
          this.admiralContract.methods
            .claim()
            .send({ from: vm.walletAccount })
            .on("sent", () => {
              this.sendClaim("waitConfirmTransaction", "confirmClaim");
            })
            .on("transactionHash", (tx) => this.transactionHash(tx))
            .on("receipt", (data) => this.receiptClaim(data))
            .on("confirmation", () => {
              this.$modal.hide("confirmClaim");
              // this.isLocked = true;
            })
            .on("error", (error) => this.showToastError(error));
        }

        if (this.activePool == 2) {
          console.log("claimHandler", this.activePool);
          this.crewManContract.methods
            .claim()
            .send({ from: vm.walletAccount })
            .on("sent", () => {
              this.sendClaim("waitConfirmTransaction", "confirmClaim");
            })
            .on("transactionHash", (tx) => this.transactionHash(tx))
            .on("receipt", (data) => this.receiptClaim(data))
            .on("confirmation", () => {
              this.$modal.hide("confirmClaim");
              // this.isLocked = true;
            })
            .on("error", (error) => this.showToastError(error));
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
      this.loadLock();
      this.loadStakeStatus();
      this.isStaked[this.activeValue] = false;
    },
    async unStakeNow() {
      this.loadContract().then(() => {
        var vm = this;
        if (this.activePool == 0) {
          this.admiralContract.methods
            .unStakeNow()
            .send({ from: vm.walletAccount })
            .on("sent", () => {
              this.sendUnStake("waitConfirmTransaction", "unStakeNow");
            })
            .on("transactionHash", (tx) => this.transactionHash(tx))
            .on("receipt", (data) => this.receiptUnStakeNow(data))
            .on("confirmation", () => {
              this.isStaked[this.activeValue] = false;
              //this.successTransaction(data)
            })
            .on("error", (error) => this.showToastError(error));
        }

        if (this.activePool == 2) {
          this.crewManContract.methods
            .unStakeNow()
            .send({ from: vm.walletAccount })
            .on("sent", () => {
              this.sendUnStake("waitConfirmTransaction", "unStakeNow");
            })
            .on("transactionHash", (tx) => this.transactionHash(tx))
            .on("receipt", (data) => this.receiptUnStakeNow(data))
            .on("confirmation", () => {
              this.isStaked[this.activeValue] = false;
              //this.successTransaction(data)
            })
            .on("error", (error) => this.showToastError(error));
        }
      });
    },
    receiptUnStakeNow(data) {
      var msg = `Unstaked ${Number(
        Number(this.attributes[this.activePool].yourStake) +
          (Number(this.attributes[this.activePool].yourStake) *
            Number(this.attributes[this.activePool].unstakePeriodUrgentFee) *
            -1) /
            100 +
          Number(this.attributes[this.activePool].yourReward)
      )
        .toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
        .toLocaleString()} ECIO`;
      console.log("receiptUnStaked data", data);
      this.successTransaction(msg, this.txHash);
      this.switchModal("transactionSubmit", "waitConfirmTransaction");
      this.loadStakeStatus();
      this.isLocked[this.activeValue] = false;
    },
    successTransaction(txt, tx) {
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
        this.loadYourStake();
        this.loadYourReward();
        this.loadAccountBalance();
        this.loadRemainingPool();
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
  },
};
</script>

<style scoped>
.main-container {
  min-height: 100vh;
  background: #000;
}

a.color-light-blue:hover {
  color: #00ffff;
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
