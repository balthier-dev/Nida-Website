<template>
  <div id="alpha-pass-page">
    <div class="main-container">
      <section class="cover imagebg" data-overlay="4">
        <div
          class="background-image-holder background-top"
          style="
            background-size: contain !important;
            background-repeat: no-repeat;
          "
        >
          <img alt="background" src="../assets/images/bg-staking.png" />
        </div>
        <div class="container">
          <div class="row">
            <div class="col">
              <!-- <h1 class="title-h1 mt-3 text-center" :title="walletAccount">
                ALPHA PASS PROGRAMME
              </h1> -->
              <img
                class="mt-5 mb-3"
                src="../assets/images/staking/headerAlpha.png"
                style="margin: auto"
              />
              <h2 class="text-uppercase text-center" style="font-size: 24px">
                STAKE YOUR TOKEN
              </h2>
              <h1 class="text-uppercase text-center">Choose only 1 pool</h1>
            </div>
          </div>
          <!-- isLocked: {{ isLocked }}<br />
          isApproved: {{ isApproved }}<br />
          isStaked: {{ isStaked }} -->
          <div class="row mt-3">
            <div class="col-12 col-md-6 col-lg-4">
              <StakingCard
                title="gold"
                pack="A"
                :attribute="attributes[0]"
                :isStaked="isStaked.gold"
                :isApproved="isApproved.gold"
                :status="true"
                :index="0"
                :ap="true"
                :isClaimable="attributes[0].claimable"
                @approveHandler="approveHandler"
                @setSelectPool="
                  (e, v) => {
                    activePool = e;
                    activeValue = v;
                    stakeTokenAmount = attributes[e].require;
                  }
                "
              />
            </div>
            <div class="col-12 col-md-6 col-lg-4">
              <StakingCard
                title="silver"
                pack="B"
                :attribute="attributes[1]"
                :isStaked="isStaked.silver"
                :isApproved="isApproved.silver"
                :index="1"
                :status="true"
                :bp="true"
                :isClaimable="attributes[1].claimable"
                @approveHandler="approveHandler"
                @setSelectPool="
                  (e, v) => {
                    activePool = e;
                    activeValue = v;
                    stakeTokenAmount = attributes[e].require;
                  }
                "
              />
            </div>
            <div class="col-12 col-md-6 col-lg-4">
              <StakingCard
                title="bronze"
                pack="C"
                :attribute="attributes[2]"
                :isStaked="isStaked.bronze"
                :isApproved="isApproved.bronze"
                :status="true"
                :index="2"
                :cp="true"
                :isClaimable="attributes[2].claimable"
                @approveHandler="approveHandler"
                @setSelectPool="
                  (e, v) => {
                    activePool = e;
                    activeValue = v;
                    stakeTokenAmount = attributes[e].require;
                  }
                "
              />
            </div>
            <div class="row mt-3">
              <div class="col-9" style="margin: auto">
                <h1 class="text-uppercase text-center">
                  To participate in our Alpha Pass Program, participants need to
                  choose one staking pool. Only participants who have staked
                  successfully in any one of the pools, will get the benefits
                  of; Alpha testnet & mainnet access & a chance to share the
                  Alpha Reward pool of $ECIO tokens, as well as other gifts &
                  lotteries. The top 50 NFT staking participants will
                  automatically get a Special Pass that grants access to the
                  Alpha Pass Program.
                </h1>
              </div>
            </div>
            <div class="row mt-3 w-100 d-flex justify-content-center">
              <div class="col-3" style="min-width: 140px">
                <a
                  href="https://medium.com/@ECIOspace/alpha-pass-program-662ea0cd570b"
                  target="_blank"
                >
                  <button class="btn btn-ecio text-uppercase">MORE INFO</button>
                </a>
              </div>
            </div>
            <div class="pass-body desktop">
              <div class="row mt-5">
                <div class="col-12 text-center">
                  <h1 class="title-h1 mt-5 mb-5">YOUR ALPHA PASS STATUS</h1>
                </div>
              </div>
              <div class="row mt-3 pass-info">
                <div class="col-6">
                  <h2 class="pass-header">YOUR STAKING POOL</h2>
                  <div class="row mt-3">
                    <div class="col-6">
                      <h2 class="text-uppercase">Your STAKED tokens</h2>
                    </div>
                    <div class="col-6">
                      <h2 class="text-uppercase">TOKEN LOCK REMAINING</h2>
                    </div>
                  </div>
                  <div class="row mt-3">
                    <div class="col-6">
                      <h1
                        v-if="attributes[activePool].yourStake > 1"
                        class="text-uppercase"
                      >
                        {{
                          Number(
                            attributes[activePool].yourStake
                          ).toLocaleString()
                        }}
                      </h1>
                      <h1 v-else class="text-uppercase">NO DATA</h1>
                    </div>
                    <div class="col-6">
                      <h1 class="text-uppercase">
                        <CountDown :date="attributes[activePool].releaseTime" />
                      </h1>
                    </div>
                  </div>
                  <div class="row mt-4 pass-claim">
                    <div class="col-6">
                      <h2 class="text-uppercase">YOUR reward</h2>
                      <h1 class="text-uppercase pass-value mt-2">
                        {{
                          Number(
                            attributes[activePool].yourReward
                          ).toLocaleString()
                        }}
                      </h1>
                    </div>
                    <div class="col-6 align-self-center">
                      <div class="col-12">
                        <!-- !attributes[activePool].claimable:
                        {{ !attributes[activePool].claimable }}<br />
                        !isStaked all:
                        {{
                          !isStaked.gold &&
                            !isStaked.silver &&
                            !isStaked.bronze
                        }}<br />
                        isStaked.gold: {{ isStaked.gold }}<br />
                        isStaked.silver: {{ isStaked.silver }}<br />
                        isStaked.bronze: {{ isStaked.bronze }}<br /> -->
                        <button
                          class="btn btn-ecio w-100"
                          :disabled="
                            !attributes[activePool].claimable ||
                            (!isStaked.gold &&
                              !isStaked.silver &&
                              !isStaked.bronze)
                          "
                          @click="$modal.show('confirmUnstake')"
                        >
                          CLAIM TOKENS & REWARD
                        </button>
                        <!-- <img
                          v-if="!attributes[activePool].claimable"
                          src="../assets/images/staking/claim-disable.png"
                        />
                        <img
                          v-else
                          src="../assets/images/staking/claim.png"
                          style="cursor : pointer;"
                          @click="
                            $modal.show('confirmUnstake'),
                              $emit('setSelectPool', index, title)
                          "
                        /> -->
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-6">
                  <h2 class="pass-header">YOUR ALPHA PASS TICKET</h2>
                  <div class="row mt-3">
                    <div class="col-12">
                      <img
                        v-if="attributes[0].yourStake > 1"
                        src="../assets/images/staking/alphaPass-gold.png"
                      />
                      <img
                        v-else-if="rankPass"
                        src="../assets/images/staking/alphaPass-special.png"
                      />
                      <img
                        v-else-if="attributes[1].yourStake > 1"
                        src="../assets/images/staking/alphaPass-silver.png"
                      />
                      <img
                        v-else-if="attributes[2].yourStake > 1"
                        src="../assets/images/staking/alphaPass-bronze.png"
                      />
                      <img
                        v-else-if="testerPass"
                        src="../assets/images/staking/alphaPass-tester.png"
                      />
                      <img
                        v-else
                        src="../assets/images/staking/alphaPass-nopass.png"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div class="row mt-5 pass-link">
                <div class="col-6" style="margin: auto">
                  <h2 class="text-uppercase">GO TO ALPHA TESTNET</h2>
                  <h1 class="text-uppercase pass-value mt-2">
                    Please read this instruction before play the game
                  </h1>
                  <p>
                    <a
                      href="https://medium.com/@ECIOspace/ecio-alpha-testnet-detail-instruction-7a76084f9572"
                      target="_blank"
                    >
                      <button
                        class="btn btn-ecio text-uppercase"
                        style="width: 200px"
                      >
                        READ INSTRUCTION
                      </button></a
                    >
                  </p>
                </div>
                <div class="col-6">
                  <img
                    v-if="
                      (attributes[activePool].yourStake >= 75000 &&
                        testLaunchTime - dateNow > 0) ||
                      (rankPass && testLaunchTime - dateNow > 0) ||
                      (testerPass && testLaunchTime - dateNow > 0)
                    "
                    style="opacity: 1"
                    src="../assets/images/staking/playSectionTestnet.png"
                  />
                  <a
                    v-else-if="
                      attributes[activePool].yourStake > 1 ||
                      rankPass ||
                      testerPass
                    "
                    href="https://testnet.ecio.space"
                  >
                    <img
                      style="opacity: 1"
                      src="../assets/images/staking/playSectionTestnetEnable.png"
                  /></a>
                  <img
                    v-else
                    style="opacity: 0.4"
                    src="../assets/images/staking/playSectionTestnet.png"
                  />
                </div>
              </div>

              <div class="row mt-5 pass-link">
                <div class="col-6" style="margin: auto">
                  <h2 class="text-uppercase">GO TO ALPHA MAINNET</h2>
                  <h1 class="text-uppercase pass-value mt-2">
                    Please read this instruction before play the game
                  </h1>
                </div>
                <div class="col-6">
                  <!-- <div class="background-image-holder background-top" > -->
                  <img
                    alt="background"
                    style="opacity: 0.4"
                    src="../assets/images/staking/playSection.png"
                  />
                  <!-- </div> -->
                </div>
              </div>
            </div>

            <div class="pass-body mobile">
              <div class="row mt-3">
                <div class="col-12 text-center">
                  <h1 class="title-h1 mt-3" style="font-size: 24px">
                    YOUR ALPHA PASS STATUS
                  </h1>
                </div>
              </div>
              <div class="row mt-3 pass-info-mb">
                <div class="col">
                  <div class="row mt-3">
                    <h2 class="pass-header">YOUR STAKING POOL</h2>
                  </div>
                  <div class="row mt-3">
                    <h2 class="text-uppercase">Your STAKED tokens</h2>
                  </div>
                  <div class="row mt-1">
                    <h1
                      v-if="attributes[activePool].yourStake > 1"
                      class="text-uppercase"
                    >
                      {{
                        Number(
                          attributes[activePool].yourStake
                        ).toLocaleString()
                      }}
                    </h1>
                    <h1 v-else class="text-uppercase">NO DATA</h1>
                  </div>
                  <div class="row mt-3">
                    <h2 class="text-uppercase">Token lock remaining</h2>
                  </div>
                  <div class="row mt-1">
                    <h1 class="text-uppercase">
                      <CountDown :date="attributes[activePool].releaseTime" />
                    </h1>
                  </div>
                  <div class="row mt-4 pass-claim">
                    <button
                      class="btn btn-ecio w-100"
                      :disabled="
                        !attributes[activePool].claimable ||
                        (!isStaked.gold && !isStaked.silver && !isStaked.bronze)
                      "
                      @click="$modal.show('confirmUnstake')"
                    >
                      CLAIM TOKENS & REWARD
                    </button>
                    <!-- <div class="col-12">
                      <h2 class="text-uppercase">YOUR reward</h2>
                      <h1 class="text-uppercase pass-value mt-2">
                        {{
                          Number(
                            attributes[activePool].yourReward
                          ).toLocaleString()
                        }}
                      </h1>
                    </div>
                    <div class="col-12 mt-6">
                      <div class="col-12">
                        <img src="../assets/images/staking/claim-disable.png" />
                      </div>
                    </div> -->
                  </div>

                  <h2 class="pass-header mt-5">YOUR ALPHA PASS TICKET</h2>
                  <div class="row mt-3">
                    <div class="col-12">
                      <img
                        v-if="attributes[0].yourStake > 1"
                        src="../assets/images/staking/alphaPass-gold-mb.png"
                      />
                      <img
                        v-else-if="rankPass"
                        src="../assets/images/staking/alphaPass-special-mb.png"
                      />
                      <img
                        v-else-if="attributes[1].yourStake > 1"
                        src="../assets/images/staking/alphaPass-silver-mb.png"
                      />
                      <img
                        v-else-if="attributes[2].yourStake > 1"
                        src="../assets/images/staking/alphaPass-bronze-mb.png"
                      />
                      <img
                        v-else-if="testerPass"
                        src="../assets/images/staking/alphaPass-tester-mb.png"
                      />
                      <img
                        v-else
                        src="../assets/images/staking/alphaPass-nopass-mb.png"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div class="row mt-3 pass-link-mb">
                <div class="col-12" style="margin: auto">
                  <h2 class="text-uppercase" style="font-size: 20px">
                    GO TO ALPHA TESTNET
                  </h2>
                  <h1 class="text-uppercase pass-value mt-2">
                    Please read this instruction before play the game
                  </h1>
                  <img
                    v-if="
                      (attributes[activePool].yourStake >= 75000 &&
                        testLaunchTime - dateNow > 0) ||
                      (rankPass && testLaunchTime - dateNow > 0) ||
                      (testerPass && testLaunchTime - dateNow > 0)
                    "
                    style="opacity: 1; margin-top: 12%"
                    src="../assets/images/staking/playSectionTestnet-mb.png"
                  />
                  <a
                    v-else-if="
                      attributes[activePool].yourStake > 1 ||
                      rankPass ||
                      testerPass
                    "
                    href="https://testnet.ecio.space"
                  >
                    <img
                      style="opacity: 1"
                      src="../assets/images/staking/playSectionTestnetEnable-mb.png"
                  /></a>
                  <img
                    v-else
                    style="opacity: 0.4; margin-top: 12%"
                    src="../assets/images/staking/playSectionTestnet-mb.png"
                  />
                </div>
              </div>

              <div class="row mt-3 pass-link-mb">
                <div class="col-12" style="margin: auto">
                  <h2 class="text-uppercase" style="font-size: 20px">
                    GO TO ALPHA MAINNET
                  </h2>
                  <h1 class="text-uppercase pass-value mt-2">
                    Please read this instruction before play the game
                  </h1>
                  <img
                    style="opacity: 0.4; margin-top: 12%"
                    src="../assets/images/staking/playSection-mb.png"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="row my-5 pt-5 daily-lotto">
            <div class="col-12 col-md-6 pl-0">
              <h1 class="title-h1 mt-5 mb-0">DAILY LOTTERY WINNERS</h1>
              <h3 class="text-uppercase">Special Assassin NFT</h3>
              <p class="my-5">
                Winner’s Prizes will be automatically airdrop to your wallet
                address at the end of the Alpha Pass program Tokens Lock period
              </p>
            </div>

            <div class="col-12 col-md-6 pr-0 winners-box">
              <div class="button-with-gradient-border px-1 py-1">
                <div
                  class="table-header text-custom-green text-2xl p-3"
                  style="background: #060017"
                >
                  Winner
                </div>
                <div>
                  <div class="row mt-0 pt-4">
                    <div class="col-5 col-md-6">
                      <h4 class="px-5">Date</h4>
                    </div>
                    <div class="col-7 col-md-6">
                      <h4 class="px-3">Address</h4>
                    </div>
                  </div>
                  <div class="overflow-spinner">
                    <div
                      class="spinner-main"
                      v-for="(data, index) in sortLottoWinners"
                      :key="index"
                    >
                      <div class="spinner-sub">
                        <div class="row mt-0">
                          <div class="col-5 col-md-6">
                            <h4 class="px-3">{{ data.date }}</h4>
                          </div>
                          <div class="col-7 col-md-6">
                            <h4 class="px-3 text-custom-green">
                              {{ data.address | shortAddress }}
                            </h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- <DataTable
                :value="lottoWinners"
                responsiveLayout="stack"
                breakpoint="960px"
                tableClass="p-datatable-nft quantico"
                :loading="loading"
              >
                <template #header>
                  <div class="table-header">
                    Winners
                  </div>
                </template>
                <template #loading>
                  Counting your winners
                  <span
                    class="ml-1 spinner-border spinner-border-sm"
                    style="position: relative; top: -6px"
                    role="status"
                  >
                  </span>
                </template>
                <template #empty> No Winners found </template>
                <Column
                  :headerStyle="{ 'text-align': 'center' }"
                  field="date"
                  header="DATE"
                ></Column>
                <Column
                  field="address"
                  header="ADDRESS"
                  :bodyStyle="{
                    'text-align': 'center',
                    overflow: 'visible',
                    color: '#e0fb16',
                  }"
                ></Column>
              </DataTable> -->
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
            Your tokens will be locked for a period of 45 days. This period
            starts when you initiate the stake and cannot be interrupted. When
            the period has ended, you can claim your full staked amount as well
            as the rewards generated during this period.
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
                @click="
                  switchModal('stakeToken', 'caution'),
                    (stakeTokenAmount = attributes[activePool].minPerStake)
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
        name="stakeToken"
      >
        <div class="bg-ecio-bg p-5">
          <h2 class="text-center text-white mb-3 text-2xl text-uppercase">
            STAKING TOKENs
            <!-- <span class="text-grey"
              >Minimum Per staking
              {{ Number(attributes[activePool].minPerStake).toLocaleString() }}
              ECIO</span
            > -->
          </h2>
          <div class="text-right">
            <span class="text-right text-uppercase text-grey text-sm"
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
            <!-- <div class="form-control input-dark">
            {{Number(stakeTokenAmount)}}
            </div> -->
            <!-- Number(
                  Number(attributes[activePool].yourStake) +
                    Number(stakeTokenAmount)
                ) > Number(attributes[activePool].minPerStake - 1)
                  ? (validMinimum = false)
                  : (validMinimum = true),
                  checkActivePoolRemain() -->
            <money
              v-model="stakeTokenAmount"
              disabled
              @input="
                Number(
                  Number(attributes[activePool].yourStake) +
                    Number(stakeTokenAmount)
                ) > Number(attributes[activePool].minPerStake - 1)
                  ? (validMinimum = false)
                  : (validMinimum = true),
                  checkActivePoolRemain()
              "
              class="form-control input-dark"
              aria-describedby="stakeToken"
              style="background: #222326"
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
                :disabled="attributes[activePool].poolRemain"
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
            PLEASE CONFIRM UNSTAKE ON {{ attributes[activePool].title }}
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
              <!-- {{ isStaked[activeValue] && !isLocked[activeValue] }}<br />
              isStaked[activeValue]: {{ isStaked[activeValue] }}<br />
              !isLocked[activeValue]: {{ !isLocked[activeValue] }}<br />
              activeValue: {{ activeValue }} -->
              <button
                class="btn btn-ecio-primary w-100 text-uppercase"
                :disabled="!attributes[activePool].claimable"
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
import ABIGold from "./../contracts/EcioGoldStakingPool.json";
import ABISilver from "./../contracts/EcioSilverStakingPool.json";
import ABIBronze from "./../contracts/EcioBronzeStakingPool.json";
import StakingCard from "@/components/WLStakeCard";
import CountDown from "@/components/CountDown";
import TransactionReceipt from "@/components/TransactionReceipt";
import axios from "axios";

export default {
  components: { StakingCard, CountDown },
  data() {
    return {
      lottoWinners: [],
      loading: true,
      attributes: [
        {
          title: "gold",
          poolEnd: new Date("12/21/2022 19:50:00 GMT+0700"), //Mainnet Deploy date (Dec-26-2021 12:48:36 PM +UTC)
          apr: 50,
          totalPoolStatusCurrent: 0,
          totalPoolStatusMax: 50,
          yourStake: 0,
          yourReward: 0,
          claimable: false,
          releaseTime: new Date(),
          stakeStatus: "NO STAKE",
          poolRemain: true,
          poolRemainMin: true,
          isPoolEnd: true,
          unlockable: false,
          lockDay: 45,
          require: 200000,
          benefits: [
            {
              icon: "1",
              desc: "ALPHA PASS TICKET (TESTNET)",
            },
            {
              icon: "1",
              desc: "ALPHA PASS TICKET (MAINNET) - Guarantee",
            },
            {
              icon: "1",
              desc: "BUG Bounty Reward",
            },
            {
              icon: "1",
              desc: "Stage Clear Reward ",
            },
            {
              icon: "2",
              desc: "1 x ANDROMEDIAN Red cocoon",
            },
            {
              icon: "3",
              desc: "5 Tickets Daily for Alpha Lottery (Special ASSASSIN Set)",
            },
            {
              icon: "1",
              desc: "Chance to whitelist for golden time lakrima buyer",
            },
          ],
        },
        {
          title: "silver",
          poolEnd: new Date("12/21/2022 19:50:00 GMT+0700"),
          apr: 40,
          totalPoolStatusCurrent: 0,
          totalPoolStatusMax: 300,
          yourStake: 0,
          yourReward: 0,
          claimable: false,
          releaseTime: new Date(),
          stakeStatus: "NO STAKE",
          poolRemain: true,
          poolRemainMin: true,
          isPoolEnd: true,
          lockDay: 45,
          unlockable: false,
          require: 150000,
          benefits: [
            {
              icon: "1",
              desc: "ALPHA PASS TICKET (TESTNET)",
            },
            {
              icon: "1",
              desc: "ALPHA PASS TICKET (MAINNET) - Guarantee",
            },
            {
              icon: "1",
              desc: "BUG Bounty Reward",
            },
            {
              icon: "1",
              desc: "Stage Clear Reward",
            },
            {
              icon: "3",
              desc: "2 Tickets Daily for Alpha Lottery (SPECIAL ASSASSIN Set)",
            },
          ],
        },
        {
          title: "bronze",
          poolEnd: new Date("01/13/2023 20:50:00 GMT+0700"),
          apr: 20,
          totalPoolStatusCurrent: 0,
          totalPoolStatusMax: 1000,
          yourStake: 0,
          yourReward: 0,
          claimable: false,
          releaseTime: new Date(),
          stakeStatus: "NO STAKE",
          poolRemain: true,
          poolRemainMin: true,
          isPoolEnd: true,
          lockDay: 45,
          unlockable: false,
          require: 75000,
          benefits: [
            {
              icon: "1",
              desc: "ALPHA PASS TICKET (TESTNET)",
            },
            {
              icon: "1",
              desc: "ALPHA PASS TICKET (MAINNET) - Lottery",
            },
            {
              icon: "1",
              desc: "BUG Bounty Reward ",
            },
            {
              icon: "3",
              desc: "1 Ticket Daily for Alpha Lottery (SPecial ASSASSIN Set)",
            },
          ],
        },
      ],
      validMinimum: false,
      // testLaunchTime: 1644994800, // 16/02/2022
      testLaunchTime: 1646485200, // 05/03/2022 1300 UTC
      dateNow: Math.trunc(new Date().getTime() / 1000),
      accept: false,
      rankPass: false,
      blockExplorerUrl: process.env.VUE_APP_BLOCK_EXPLORER,
      contractAddressGold: process.env.VUE_APP_STAKING_GOLD_CONTRACT_ADDRESS,
      contractAddressBronze:
        process.env.VUE_APP_STAKING_BRONZE_CONTRACT_ADDRESS,
      contractAddressSilver:
        process.env.VUE_APP_STAKING_SILVER_CONTRACT_ADDRESS,
      goldContract: undefined,
      silverContract: undefined,
      bronzeContract: undefined,
      ecioContract: undefined,
      isLocked: {
        gold: false,
        silver: false,
        bronze: false,
      },
      isApproved: {
        gold: false,
        silver: false,
        bronze: false,
      },
      isStaked: {
        gold: false,
        silver: false,
        bronze: false,
      },
      stakeToken: null,
      stakeTokenAmount: 0,
      walletAccount: undefined,
      ecioBalance: 0,
      modalWaitingDesc: "",
      txHash: "",
      activePool: 0,
      activeValue: "gold",
      testerPass: false,
    };
  },
  mounted() {
    this.getLottoWinners();
    this.connectWallet().then(() => {
      this.loadAccountBalance();
      this.loadMinStaking();
      // this.loadMaxStaking();
      this.loadWithdrawLockDay();
      // this.loadFeeRate();
      this.loadRemainingPool();
      this.loadYourStake();
      this.loadYourReward();
      // this.loadEndPool();
      this.loadLock();
      this.loadStakeStatus();
      this.checkUnlock();
      this.checkSpecialPass();
      // this.checkPoolRemain();
    });

    /*----Test notification msg----------------------------
     this.successTransaction("STAKING 580,774 ecio", "x");
     this.showToastError(
       { message: "Metamask rejected form owner" },
       "this.txHash"
     );
    ----------------------------------------------------*/

    //Update real-time reward
    // setInterval(() => this.loadYourReward(), 10000);
  },
  computed: {
    sortLottoWinners() {
      return this.lottoWinners
        .filter(() => true)
        .sort((a, b) => {
          let aA = a.date.split("/");
          let bB = b.date.split("/");
          aA = aA[2] + aA[1] + aA[0];
          bB = bB[2] + bB[1] + bB[0];
          return aA < bB ? 1 : -1;
        });
    },
  },
  methods: {
    async getLottoWinners() {
      this.loading = true;
      await axios
        .get(`https://ld.ecio.space/api/v1/lucky_draw_users`)
        .then((res) => {
          this.lottoWinners = res.data;
        })
        .catch((e) => {
          console.log("wallet error: ", e);
        });
    },
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
      this.goldContract = await new window.web3.eth.Contract(
        ABIGold.abi,
        this.contractAddressGold
      );
      this.silverContract = await new window.web3.eth.Contract(
        ABISilver.abi,
        this.contractAddressSilver
      );
      this.bronzeContract = await new window.web3.eth.Contract(
        ABIBronze.abi,
        this.contractAddressBronze
      );
      this.ecioContract = await new window.web3.eth.Contract(
        ERC20.abi,
        process.env.VUE_APP_ECIO_CONTRACT_ADDRESS
      );
      // console.log("this.goldContract", this.goldContract);
      // console.log("this.bronzeContract", this.bronzeContract);
      // console.log("this.ecioContract", this.ecioContract);
      // console.log("this.contractAddressGold", this.contractAddressGold);
      // console.log("this.contractAddressBronze", this.contractAddressBronze);
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
          .allowance(this.walletAccount, this.contractAddressGold)
          .call()
          .then(async (pl) => {
            let allowanceAmountGold = Web3.utils.fromWei(pl, "ether");
            console.log("allowanceAmountGold", allowanceAmountGold);
            if (
              allowanceAmountGold >
              this.attributes[0].totalPoolStatusMax / 2
            ) {
              this.isApproved.gold = true;
            }
          });

        await this.ecioContract.methods
          .allowance(this.walletAccount, this.contractAddressSilver)
          .call()
          .then(async (pl) => {
            let allowanceAmountSilver = Web3.utils.fromWei(pl, "ether");
            console.log("allowanceAmountSil", allowanceAmountSilver);
            if (
              allowanceAmountSilver >
              this.attributes[1].totalPoolStatusMax / 2
            ) {
              this.isApproved.silver = true;
            }
          });

        await this.ecioContract.methods
          .allowance(this.walletAccount, this.contractAddressBronze)
          .call()
          .then(async (pl) => {
            let allowanceAmountBronze = Web3.utils.fromWei(pl, "ether");
            console.log("allowanceAmountBronze", allowanceAmountBronze);
            if (
              allowanceAmountBronze >
              this.attributes[2].totalPoolStatusMax / 2
            ) {
              this.isApproved.bronze = true;
            }
          });
        this.loadLock();
      });
    },
    async loadMinStaking() {
      await this.loadContract().then(() => {
        this.goldContract.methods
          .MINIMUM_STAKING()
          .call()
          .then((pl) => {
            this.attributes[0].minPerStake = Web3.utils.fromWei(pl, "ether");
          });

        this.silverContract.methods
          .MINIMUM_STAKING()
          .call()
          .then((pl) => {
            this.attributes[1].minPerStake = Web3.utils.fromWei(pl, "ether");
          });

        this.bronzeContract.methods
          .MINIMUM_STAKING()
          .call()
          .then((pl) => {
            this.attributes[2].minPerStake = Web3.utils.fromWei(pl, "ether");
          });
      });
    },
    async loadMaxStaking() {
      await this.loadContract().then(() => {
        this.goldContract.methods
          .MAXIMUM_STAKING()
          .call()
          .then((pl) => {
            this.attributes[0].totalPoolStatusMax = Web3.utils.fromWei(
              pl,
              "ether"
            );
          });

        this.silverContract.methods
          .MAXIMUM_STAKING()
          .call()
          .then((pl) => {
            this.attributes[1].totalPoolStatusMax = Web3.utils.fromWei(
              pl,
              "ether"
            );
          });

        this.bronzeContract.methods
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
        this.goldContract.methods
          .endPool()
          .call()
          .then((time) => {
            var dt = new Date(time * 1000);
            this.attributes[0].poolEnd = dt.setDate(dt.getDate() - 5);
          });

        this.silverContract.methods
          .endPool()
          .call()
          .then((time) => {
            var dt = new Date(time * 1000);
            this.attributes[1].poolEnd = dt.setDate(dt.getDate() - 5);
          });

        this.bronzeContract.methods
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
        this.goldContract.methods
          .WITHDRAW_LOCK_DAY()
          .call()
          .then((res) => {
            this.attributes[0].unstakePeriodFree = res;
          });
        this.silverContract.methods
          .WITHDRAW_LOCK_DAY()
          .call()
          .then((res) => {
            this.attributes[1].unstakePeriodFree = res;
          });

        this.bronzeContract.methods
          .WITHDRAW_LOCK_DAY()
          .call()
          .then((res) => {
            this.attributes[2].unstakePeriodFree = res;
          });
      });
    },
    async loadFeeRate() {
      await this.loadContract().then(() => {
        this.goldContract.methods
          .FEE()
          .call()
          .then((res) => {
            this.attributes[0].unstakePeriodUrgentFee = res / 100;
          });

        this.silverContract.methods
          .FEE()
          .call()
          .then((res) => {
            this.attributes[1].unstakePeriodUrgentFee = res / 100;
          });

        this.bronzeContract.methods
          .FEE()
          .call()
          .then((res) => {
            this.attributes[2].unstakePeriodUrgentFee = res / 100;
          });
      });
    },
    async loadRemainingPool() {
      await this.loadContract().then(() => {
        this.goldContract.methods
          .getUserCount()
          .call()
          .then((pl) => {
            this.attributes[0].totalPoolStatusCurrent = pl;
          });

        this.silverContract.methods
          .getUserCount()
          .call()
          .then((pl) => {
            this.attributes[1].totalPoolStatusCurrent = pl;
          });

        this.bronzeContract.methods
          .getUserCount()
          .call()
          .then((pl) => {
            this.attributes[2].totalPoolStatusCurrent = pl;
            console.log("bronze : " + pl);
          });
      });
    },
    loadYourStake() {
      this.loadContract().then(() => {
        this.bronzeContract.methods
          .staked(this.walletAccount)
          .call()
          .then((res) => {
            this.attributes[2].yourStake = Web3.utils.fromWei(res, "ether");
            if (Number(this.attributes[2].yourStake) > 0) {
              this.isStaked.bronze = true;
              this.activePool = 2;
              this.activeValue = this.attributes[this.activePool].title;
            }
          });

        this.silverContract.methods
          .staked(this.walletAccount)
          .call()
          .then((res) => {
            this.attributes[1].yourStake = Web3.utils.fromWei(res, "ether");
            if (Number(this.attributes[1].yourStake) > 0) {
              this.isStaked.silver = true;
              this.activePool = 1;
              this.activeValue = this.attributes[this.activePool].title;
            }
          });

        this.goldContract.methods
          .staked(this.walletAccount)
          .call()
          .then((res) => {
            this.attributes[0].yourStake = Web3.utils.fromWei(res, "ether");
            if (Number(this.attributes[0].yourStake) > 0) {
              this.isStaked.gold = true;
              this.activePool = 0;
              this.activeValue = this.attributes[this.activePool].title;
            }
          });

        this.loadApproved();
        this.loadLock();
      });
    },
    loadYourReward() {
      this.loadContract().then(() => {
        this.goldContract.methods
          .earned(this.walletAccount)
          .call()
          .then((res) => {
            this.attributes[0].yourReward = Web3.utils.fromWei(res, "ether");
          });

        this.silverContract.methods
          .earned(this.walletAccount)
          .call()
          .then((res) => {
            this.attributes[1].yourReward = Web3.utils.fromWei(res, "ether");
          });

        this.bronzeContract.methods
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
        this.goldContract.methods
          .isUnlock(vm.walletAccount)
          .call()
          .then((pl) => {
            console.log("loadUnLock", pl);
            if (!pl) {
              this.isStaked.gold = true;
              this.isLocked.gold = true;
            } else {
              this.isLocked.gold = false;
              this.attributes[0].claimable = pl;
            }
          });

        this.goldContract.methods
          .releaseTime(vm.walletAccount)
          .call()
          .then((pl) => {
            if (pl != 0) {
              this.attributes[0].releaseTime = new Date(pl * 1000);
            }
          });

        this.silverContract.methods
          .isUnlock(vm.walletAccount)
          .call()
          .then((pl) => {
            console.log("loadUnLock", pl);
            if (!pl) {
              this.isStaked.silver = true;
              this.isLocked.silver = true;
            } else {
              this.isLocked.silver = false;
              this.attributes[1].claimable = pl;
            }
          });

        this.silverContract.methods
          .releaseTime(vm.walletAccount)
          .call()
          .then((pl) => {
            if (pl != 0) {
              this.attributes[1].releaseTime = new Date(pl * 1000);
            }
          });

        this.bronzeContract.methods
          .isUnlock(vm.walletAccount)
          .call()
          .then((pl) => {
            // console.log("loadUnLock", pl);
            if (!pl) {
              this.isStaked.bronze = true;
              this.isLocked.bronze = true;
            } else {
              this.isLocked.bronze = false;
              this.attributes[2].claimable = pl;
            }
          });

        this.bronzeContract.methods
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
        this.goldContract.methods
          .status(this.walletAccount)
          .call()
          .then((res) => {
            this.attributes[0].stakeStatus = res;
            if (this.attributes[0].stakeStatus == "NO STAKE") {
              this.isStaked.gold = false;
              this.isLocked.gold = false;
            } else if (this.attributes[0].stakeStatus == "STAKED") {
              this.isStaked.gold = true;
              this.isLocked.gold = false;
            } else if (this.attributes[0].stakeStatus == "WAITING") {
              this.isStaked.gold = true;
              this.isLocked.gold = true;
            }
          });

        this.silverContract.methods
          .status(this.walletAccount)
          .call()
          .then((res) => {
            this.attributes[1].stakeStatus = res;
            if (this.attributes[1].stakeStatus == "NO STAKE") {
              this.isStaked.silver = false;
              this.isLocked.silver = false;
            } else if (this.attributes[1].stakeStatus == "STAKED") {
              this.isStaked.silver = true;
              this.isLocked.silver = false;
            } else if (this.attributes[1].stakeStatus == "WAITING") {
              this.isStaked.silver = true;
              this.isLocked.silver = true;
            }
          });

        this.bronzeContract.methods
          .status(this.walletAccount)
          .call()
          .then((res) => {
            this.attributes[2].stakeStatus = res;
            if (this.attributes[2].stakeStatus == "NO STAKE") {
              this.isStaked.bronze = false;
              this.isLocked.bronze = false;
            } else if (this.attributes[2].stakeStatus == "STAKED") {
              this.isStaked.bronze = true;
              this.isLocked.bronze = false;
            } else if (this.attributes[2].stakeStatus == "WAITING") {
              this.isStaked.bronze = true;
              this.isLocked.bronze = true;
            }
          });
      });
    },
    checkPoolRemain() {
      for (let i = 0; i < 3; i++) {
        this.attributes[i].poolRemain =
          Number(this.attributes[this.activePool].totalPoolStatusCurrent) >=
          Number(this.attributes[this.activePool].totalPoolStatusMax);
      }
    },
    checkActivePoolRemain() {
      this.attributes[this.activePool].poolRemain =
        Number(this.attributes[this.activePool].totalPoolStatusCurrent) >=
        Number(this.attributes[this.activePool].totalPoolStatusMax);
    },
    approveHandler(index) {
      this.loadContract().then(() => {
        console.log("approveHandler", index);
        let vm = this;
        let maxStakeWei = Web3.utils.toWei(
          Web3.utils.toBN(vm.attributes[index].require).toString(),
          "ether"
        );
        if (index == 0) {
          this.ecioContract.methods
            .approve(this.contractAddressGold, maxStakeWei)
            .send({ from: this.walletAccount })
            .on("sent", (data) => this.sendApprove(data))
            .on("transactionHash", (tx) => this.transactionHash(tx))
            .on("receipt", (data) => this.receiptApprove(data, "gold"))
            // .on("confirmation", (data) => this.confirmApprove(data))
            .on("error", (error) => this.showToastError(error));
        }

        if (index == 1) {
          this.ecioContract.methods
            .approve(this.contractAddressSilver, maxStakeWei)
            .send({ from: this.walletAccount })
            .on("sent", (data) => this.sendApprove(data))
            .on("transactionHash", (tx) => this.transactionHash(tx))
            .on("receipt", (data) => this.receiptApprove(data, "silver"))
            // .on("confirmation", (data) => this.confirmApprove(data))
            .on("error", (error) => this.showToastError(error));
        }
        if (index == 2) {
          this.ecioContract.methods
            .approve(this.contractAddressBronze, maxStakeWei)
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
          this.goldContract.methods
            .stake(stakeValue)
            .send({ from: vm.walletAccount })
            .on("sent", (data) => this.sendStake(data))
            .on("transactionHash", (tx) => this.transactionHash(tx))
            .on("receipt", (data) => this.receiptStake(data))
            // .on("confirmation", (data) => this.successTransaction(data))
            .on("error", (error) => this.showToastError(error));
        }

        if (this.activePool == 1) {
          console.log("this.activePool", this.activePool);
          this.silverContract.methods
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
          this.bronzeContract.methods
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
      this.loadLock();
      this.attributes[this.activePool].claimable = false;
      // this.isStaked[this.activeValue] = true;
    },
    async unStake() {
      console.log("unstake");
      this.loadContract().then(() => {
        var vm = this;
        if (this.activePool == 0) {
          this.goldContract.methods
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

        if (this.activePool == 1) {
          this.silverContract.methods
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
          this.bronzeContract.methods
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
      var msg = `Unstaked ${Number(
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
          this.goldContract.methods
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

        if (this.activePool == 1) {
          console.log("claimHandler", this.activePool);
          this.silverContract.methods
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
          this.bronzeContract.methods
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
          this.goldContract.methods
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

        if (this.activePool == 1) {
          this.silverContract.methods
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
          this.bronzeContract.methods
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
    checkSpecialPass() {
      axios
        .get(
          "https://1nai8p9ji5.execute-api.ap-southeast-1.amazonaws.com/prod/api/v1/duplicate_address_top_rank"
        )
        .then((response) => {
          // console.log("IN");
          // console.log(response.data.special.address);
          response.data.special.address.map((special) => {
            if (special.address === this.walletAccount) {
              this.rankPass = true;
            }
          });

          response.data.tester.address.map((tester) => {
            if (tester.address === this.walletAccount) {
              this.testerPass = true;
            }
          });
        });
    },
    checkUnlock() {
      this.loadContract().then(() => {
        if (this.activePool == 0) {
          this.goldContract.methods
            .isUnlock(this.walletAccount)
            .call()
            .then((res) => {
              this.attributes[0].unlockable = res;
            });
        }

        if (this.activePool == 1) {
          this.silverContract.methods
            .isUnlock(this.walletAccount)
            .call()
            .then((res) => {
              this.attributes[1].unlockable = res;
            });
        }

        if (this.activePool == 2) {
          this.silverContract.methods
            .isUnlock(this.walletAccount)
            .call()
            .then((res) => {
              this.attributes[2].unlockable = res;
            });
        }
      });
    },
  },
};
</script>

<style scoped>
.background-image-holder {
  background-size: contain !important;
  background-repeat: no-repeat !important;
}

.main-container {
  min-height: 100vh;
  background: #000;
}

a.color-light-blue:hover {
  color: #00ffff;
}

.pass-body {
  width: 100%;
  margin-top: 25px;
}

.pass-info {
  padding-top: 10px;
  background-image: url("../assets/images/staking/bgPass.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: top center;
  padding: 36px 20px 38px 20px;
}

.pass-info-mb {
  padding: 25px;
  background-image: url("../assets/images/staking/bgPass-mb.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: top center;
  margin: 5px;
  height: 1185px;
}

.pass-link {
  padding-top: 10px;
  background-image: url("../assets/images/staking/bgPass2.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: top center;
  padding: 30px 20px 38px 20px;
}

.pass-link-mb {
  padding-top: 10px;
  background-image: url("../assets/images/staking/bgPass2-mb.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: top center;
  padding: 30px 20px 38px 20px;
  margin: 5px;
  height: 505px;
}

.pass-claim {
  border: #4804d9;
  border-style: solid;
  border-radius: 10px;
  padding: 20px;
}

.pass-header {
  font-size: 18px;
  font-weight: bold;
}

.pass-value {
  font-size: 18px;
}

.desktop {
  display: block;
}
.mobile {
  display: none;
}

@media (max-width: 800px) {
  .desktop {
    display: none;
  }
  .mobile {
    display: block;
  }

  .daily-lotto h3 {
    text-align: center !important;
  }
  .daily-lotto .winners-box {
    padding: 0 !important;
  }
}

.form-control:disabled,
.form-control[readonly] {
  background: #222326;
  padding: 2px 15px 0 15px;
  font-size: 20px !important;
}
.btn.btn-ecio {
  min-width: 140px;
}

.button-with-gradient-border {
  background-image: radial-gradient(
      circle at 100% 100%,
      transparent 8px,
      #6666cc 8px,
      #6666cc 10px,
      transparent 10px
    ),
    linear-gradient(to right, #6666cc, #4804d9),
    radial-gradient(
      circle at 0% 100%,
      transparent 8px,
      #4804d9 8px,
      #4804d9 10px,
      transparent 10px
    ),
    linear-gradient(to bottom, #4804d9, #4804d9),
    radial-gradient(
      circle at 0% 0%,
      transparent 8px,
      #4804d9 8px,
      #4804d9 10px,
      transparent 10px
    ),
    linear-gradient(to left, #4804d9, #6666cc),
    radial-gradient(
      circle at 100% 0%,
      transparent 8px,
      #6666cc 8px,
      #6666cc 10px,
      transparent 10px
    ),
    linear-gradient(to top, #6666cc, #6666cc);
  background-size: 10px 10px, calc(100% - 20px) 2px, 10px 10px,
    2px calc(100% - 20px);
  background-position: top left, top center, top right, center right,
    bottom right, bottom center, bottom left, center left;
  background-repeat: no-repeat;
}
.spinner-main {
  padding: 0 13px;
  margin: 15px 0;
}
.spinner-sub {
  font-size: 17px;
  background: #585858;
  padding: 13px 10px;
  border-radius: 8px;
}
.text-custom-green {
  color: #e0fb16 !important;
}
.overflow-spinner {
  max-height: 260px;
  overflow-y: scroll;
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
