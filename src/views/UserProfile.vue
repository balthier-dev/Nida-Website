<template>
  <div class="main-container bg-custom min-h-screen xs:py-16">
    <div class="grid" :class="isSidebar && 'grid-cols-4'">
      <div
        v-if="isSidebar"
        class="xs:hidden xl:grid xl:col-start-1 xl:col-end-2"
      >
        <Sidebar
          :lkmBalance="inGameLkm"
          :ecioBalance="inGameEcio"
          :lkmBalanceUsd="inGameLkmUsd"
          :ecioBalanceUsd="inGameEcioUsd"
          :walletAddress="shortAddress"
          :displayName="displayName"
          :account="account"
        />
      </div>
      <div v-if="visibleSidebar && isSidebar">
        <Sidebar
          :lkmBalance="inGameLkm"
          :ecioBalance="inGameEcio"
          :lkmBalanceUsd="inGameLkmUsd"
          :ecioBalanceUsd="inGameEcioUsd"
          :walletAddress="shortAddress"
          :displayName="displayName"
          :account="account"
        />
      </div>
      <div
        class="
          xs:col-start-1
          xl:col-start-2
          col-end-5
          xs:mt-7
          xl:mt-14
          xs:ml-7 xs:mr-10
          xl:ml-10 xl:mr-20
          2xl:ml-0
          xl:mr-20
        "
      >
        <div class="grid grid-cols-1 justify-between mb-5 mt-4">
          <div class="self-center">
            <span
              class="
                quantico
                xs:text-lg
                md:text-xl
                lg:text-xl
                xl:text-2xl
                2xl:text-3xl
                text-white
                font-weight-bold
                uppercase
              "
              >wallet</span
            >
          </div>
        </div>
        <div
          v-if="loadingInfo"
          class="lds-ring-market"
          style="border-color: #e0fb16 transparent transparent transparent;"
        >
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div v-else class="grid grid-cols-1 justify-between mt-5">
          <TabView>
            <TabPanel header="IN-GAME ASSET">
              <div class="grid grid-cols-1 justify-between mt-3">
                <div class="self-center">
                  <span
                    class="
                      quantico
                      xs:text-lg
                      md:text-xl
                      lg:text-xl
                      xl:text-xl
                      2xl:text-xl
                      text-white
                      font-weight-bold
                      uppercase
                    "
                    >Token Inventory</span
                  >
                </div>
              </div>
              <div class="row">
                <div
                  class="
                    grid grid-rows-1 grid-flow-col
                    gap-3
                    bg-black
                    p-3
                    rounded-xl
                    justify-center
                    mt-4
                  "
                  style="
                    display: block;
                    background: #1e202c;
                    width: 350px;
                    margin-left: 0;
                    margin-right: 1.5em;
                  "
                >
                  <div class="row">
                    <div class="col-8">
                      <h2 class="xs:text-xs xl:text-lg 2xl:text-lg font-bold">
                        ECIO TOKENS
                      </h2>
                      <h1
                        class="
                          xs:text-xs
                          xl:text-xl
                          2xl:text-2xl
                          font-bold
                          mt-4
                        "
                      >
                        {{ inGameEcio }}
                      </h1>
                      <span
                        class="
                          xs:text-xs
                          xl:text-sm
                          2xl:text-sm
                          text-gray
                          uppercase
                          font-bold
                        "
                        >{{ inGameEcioUsd }} USD</span
                      >
                    </div>
                    <div class="col-4">
                      <img
                        src="../assets/userprofile/ecioToken.png"
                        alt="ecio icon"
                        style="width: 200px"
                      />
                    </div>
                  </div>
                  <div class="row mt-3">
                    <div class="col-12">
                      <img src="../assets/userprofile/Line.png" class="w-100" />
                    </div>
                  </div>
                  <div class="row mt-3">
                    <div class="col-12">
                      <button
                        @click="$modal.show('ecioClaim')"
                        class="btn btn-claim text-uppercase"
                      >
                        Claim REWARD
                      </button>
                    </div>
                  </div>
                </div>
                <div
                  class="
                    grid grid-rows-1 grid-flow-col
                    gap-3
                    bg-black
                    p-3
                    rounded-xl
                    justify-center
                    mt-4
                    ml-6
                  "
                  style="
                    display: block;
                    background: #1e202c;
                    width: 350px;
                    margin-left: 0;
                    margin-right: 1.5em;
                  "
                >
                  <div class="row">
                    <div class="col-8">
                      <h2
                        class="xs:text-xs xl:text-lg 2xl:text-lg font-bold"
                        style="color: #9a66ff"
                      >
                        LAKRIMA TOKENS
                      </h2>
                      <h1
                        class="
                          xs:text-xs
                          xl:text-xl
                          2xl:text-2xl
                          font-bold
                          mt-4
                        "
                      >
                        {{ inGameLkm }}
                      </h1>
                      <span
                        class="
                          xs:text-xs
                          xl:text-sm
                          2xl:text-sm
                          text-gray
                          uppercase
                          font-bold
                        "
                        >{{ inGameLkmUsd }} USD</span
                      >
                    </div>
                    <div class="col-4">
                      <img
                        src="../assets/userprofile/lkmToken.png"
                        alt="ecio icon"
                        style="width: 200px"
                      />
                    </div>
                  </div>
                  <div class="row mt-3">
                    <div class="col-12">
                      <img src="../assets/userprofile/Line.png" class="w-100" />
                    </div>
                  </div>
                  <div class="row mt-3">
                    <div class="col-12">
                      <button
                        @click="$modal.show('lkmClaim')"
                        class="btn btn-claim text-uppercase"
                      >
                        Claim REWARD
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </TabPanel>
            <TabPanel header="YOUR WALLET">
              <div class="grid grid-cols-1 justify-between mt-3">
                <div class="self-center">
                  <span
                    v-clipboard:copy="account"
                    class="
                      xs:text-sm
                      xl:text-lg
                      2xl:text-xl
                      text-white
                      font-bold
                      text-uppercase
                    "
                    style="cursor: pointer"
                  >
                    {{ shortAddress }}
                    <i
                      v-clipboard:copy="account"
                      class="pi pi-copy"
                      style="color: #e0fb16; cursor: pointer"
                    ></i>
                  </span>
                </div>
              </div>
              <div class="row">
                <div
                  class="
                    grid grid-rows-1 grid-flow-col
                    gap-3
                    bg-black
                    p-3
                    rounded-xl
                    justify-center
                    mt-4
                  "
                  style="
                    display: block;
                    background: #1e202c;
                    width: 350px;
                    margin-left: 0;
                    margin-right: 1.5em;
                  "
                >
                  <div class="row">
                    <div class="col-8">
                      <h2
                        class="
                          xs:text-xs
                          xl:text-lg
                          2xl:text-lg
                          font-bold
                          text-grey text-uppercase
                        "
                      >
                        Total Balance
                      </h2>
                      <h1
                        class="
                          xs:text-xs
                          xl:text-xl
                          2xl:text-2xl
                          font-bold
                          mt-4
                        "
                      >
                        {{ bnbBalance }} BNB
                      </h1>
                      <!-- <span
                        class="
                          xs:text-xs
                          xl:text-sm
                          2xl:text-sm
                          text-gray
                          uppercase
                          font-bold
                        "
                        >42 USD</span
                      > -->
                      <h1
                        class="
                          xs:text-xs
                          xl:text-xl
                          2xl:text-2xl
                          font-bold
                          mt-4
                        "
                      >
                        {{ busdBalance }} BUSD
                      </h1>
                    </div>
                  </div>
                </div>
                <div
                  class="
                    grid grid-rows-1 grid-flow-col
                    gap-3
                    bg-black
                    p-3
                    rounded-xl
                    justify-center
                    mt-4
                    ml-6
                  "
                  style="
                    display: block;
                    background: #1e202c;
                    width: 350px;
                    margin-left: 0;
                    margin-right: 1.5em;
                  "
                >
                  <div class="row">
                    <div class="col-8">
                      <h2 class="xs:text-xs xl:text-lg 2xl:text-lg font-bold">
                        ECIO TOKENS
                      </h2>
                      <h1
                        class="
                          xs:text-xs
                          xl:text-xl
                          2xl:text-2xl
                          font-bold
                          mt-4
                        "
                      >
                        {{ ecioBalance }}
                      </h1>
                      <!-- <span
                        class="
                          xs:text-xs
                          xl:text-sm
                          2xl:text-sm
                          text-gray
                          uppercase
                          font-bold
                        "
                        >42 USD</span
                      > -->
                    </div>
                    <div class="col-4">
                      <img
                        src="../assets/userprofile/ecioToken.png"
                        alt="ecio icon"
                        style="width: 200px"
                      />
                    </div>
                  </div>
                </div>
                <div
                  class="
                    grid grid-rows-1 grid-flow-col
                    gap-3
                    bg-black
                    p-3
                    rounded-xl
                    justify-center
                    mt-4
                    ml-6
                  "
                  style="
                    display: block;
                    background: #1e202c;
                    width: 350px;
                    margin-left: 0;
                    margin-right: 1.5em;
                  "
                >
                  <div class="row">
                    <div class="col-8">
                      <h2
                        class="xs:text-xs xl:text-lg 2xl:text-lg font-bold"
                        style="color: #9a66ff"
                      >
                        LAKRIMA TOKENS
                      </h2>
                      <h1
                        class="
                          xs:text-xs
                          xl:text-xl
                          2xl:text-2xl
                          font-bold
                          mt-4
                        "
                      >
                        {{ lkmBalance }}
                      </h1>
                      <!-- <span
                        class="
                          xs:text-xs
                          xl:text-sm
                          2xl:text-sm
                          text-gray
                          uppercase
                          font-bold
                        "
                        >66 USD</span
                      > -->
                    </div>
                    <div class="col-4">
                      <img
                        src="../assets/userprofile/lkmToken.png"
                        alt="ecio icon"
                        style="width: 200px"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </TabPanel>
          </TabView>
        </div>
        <div
          v-if="visibleSideMenu"
          class="fixed right-0 top-0 side-menu-top w-64 h-full side-menu-bg"
        >
          <SideMenu :account="shortAddress" />
        </div>
      </div>
    </div>

    <modal
      height="auto"
      :scrollable="true"
      :adaptive="true"
      name="lkmClaim"
      class="backdrop"
    >
      <div class="bg-ecio-bg p-5">
        <div class="flex justify-end">
          <button @click="$modal.hide('lkmClaim')">
            <img src="../assets/images/modal-close.png" alt="modal close" />
          </button>
        </div>
        <div class="flex">
          <span
            class="text-2xl font-weight-bold text-ecio-green uppercase quantico"
          >
            claim LAKRIMA reward
          </span>
        </div>
        <div class="text-white mt-4 my-2 uppercase quantico text-lg">
          <span>AVAILABLE: {{ inGameLkm }} LKM</span>
        </div>
        <div>
          <div class="input-group mb-0">
            <img
              src="../assets/userprofile/lkmIcon.png"
              style="margin-bottom: 0"
              width="42"
            />
            <money
              v-model="lkmAmount"
              @input="checkAmountLkm"
              class="form-control input-dark"
              aria-describedby="withdrawLkm"
            ></money>
            <!-- <input
                type="text"
                class="
                  form-control
                  radius-10
                  relative
                  bg-custom-amount
                  border-0
                  text-white
                "
                aria-label="Amount (to the nearest dollar)"
                v-model="lkmAmount"
                placeholder="LKM"
              /> -->
          </div>
        </div>
        <div
          class="text-grey my-2 uppercase quantico text-md"
          v-if="!validMaximum"
        >
          <span>Maximum 100,000 LKM per withdrawal</span>
        </div>
        <div
          class="text-custom-red my-2 uppercase quantico text-md"
          v-if="validMaximum"
        >
          <span>Maximum 100,000 LKM per withdrawal</span>
        </div>
        <div
          class="text-custom-red my-2 uppercase quantico text-md"
          v-if="ecioBalance < userWithdrawTax"
        >
          <span>You don't have much ECIO for pay TAX</span>
        </div>
        <div
          class="text-custom-red my-2 uppercase quantico text-md"
          v-if="validLimit"
        >
          <span>Maximum withdraw is {{ inGameLkm }} LKM</span>
        </div>
        <div class="mt-4">
          <div class="row">
            <div class="col-6">
              <span
                class="text-white quantico uppercase font-weight-bold text-md"
              >
                Last Claim
              </span>
            </div>
            <div class="col-6 text-right">
              <span class="text-grey quantico uppercase text-md">
                {{ lastClaim }}
              </span>
            </div>
          </div>
        </div>
        <div class="mt-0">
          <div class="row">
            <div class="col-6">
              <span
                class="text-white quantico uppercase font-weight-bold text-md"
              >
                Next Claim
              </span>
            </div>
            <div class="col-6 text-right">
              <span class="text-grey quantico uppercase text-md">
                {{ nextClaim }}
              </span>
            </div>
          </div>
        </div>
        <div class="mt-0">
          <span class="text-grey quantico uppercase text-md">
            (without increased tax)
          </span>
        </div>
        <div class="mt-0">
          <div class="row">
            <div class="col-6">
              <span
                class="text-white quantico uppercase font-weight-bold text-md"
              >
                Dynamic Fee
              </span>
              <span class="text-grey quantico uppercase text-md">
                ({{ feeRate }}%)
              </span>
              <i
                class="pi pi-info-circle"
                style="color: #e0fb16"
                content="The Dynamic fee is a reward withdrawal fee that will be randomized every hour, between a 5% - 15% rate deducted from the claimed tokens."
                v-tippy="{
                  placement: 'bottom',
                }"
              >
              </i>
            </div>
            <div class="col-6 text-right">
              <span
                class="text-grey font-weight-bold quantico uppercase text-md"
              >
                {{ dynamicFee }}
              </span>
              <span
                class="text-grey font-weight-bold quantico uppercase text-md"
              >
                LKM
              </span>
            </div>
          </div>
        </div>
        <div class="mt-4">
          <div class="row">
            <div class="col-6">
              <span
                class="text-white quantico uppercase font-weight-bold text-md"
              >
                Your wallet balance
              </span>
            </div>
            <div class="col-6 text-right">
              <span
                class="text-grey font-weight-bold quantico uppercase text-md"
              >
                {{ lkmBalance }} LKM
              </span>
            </div>
          </div>
        </div>
        <div class="mt-0">
          <div class="row">
            <div class="col-6">
              <span
                class="text-white quantico uppercase font-weight-bold text-md"
              >
                Tax
              </span>
              <i
                class="pi pi-info-circle"
                style="color: #e0fb16"
                content="The tax is a governance token burning mechanism. Starting from 5,000 $ECIO, the tax will increase by increments of 10% for each withdrawal within 36 hours. After 36 hours from the original withdrawal, the tax will be reset to 5,000 $ECIO."
                v-tippy="{
                  placement: 'bottom',
                }"
              >
              </i>
            </div>
            <div class="col-6 text-right">
              <span
                class="text-grey font-weight-bold quantico uppercase text-md"
              >
                {{
                  userWithdrawTax.toLocaleString(undefined, {
                    minimumFractionDigits: 3,
                    maximumFractionDigits: 3,
                  })
                }}
                ECIO
              </span>
            </div>
          </div>
        </div>

        <div class="mt-4">
          <div class="row">
            <div class="col-6">
              <span
                class="text-white quantico uppercase font-weight-bold text-md"
              >
                Total Fee
              </span>
            </div>
            <div class="col-6 text-right">
              <span
                class="
                  text-custom-green
                  font-weight-bold
                  quantico
                  uppercase
                  text-md
                "
              >
                {{ dynamicFee }} LKM
              </span>
            </div>
          </div>
        </div>
        <div class="mt-0">
          <div class="row">
            <div class="col-6">
              <span
                class="text-white quantico uppercase font-weight-bold text-md"
              >
                Total TAX
              </span>
            </div>
            <div class="col-6 text-right">
              <span
                class="
                  text-custom-green
                  font-weight-bold
                  quantico
                  uppercase
                  text-md
                "
              >
                {{
                  userWithdrawTax.toLocaleString(undefined, {
                    minimumFractionDigits: 3,
                    maximumFractionDigits: 3,
                  })
                }}
                ECIO
              </span>
            </div>
          </div>
        </div>
        <div class="mt-0">
          <div class="row">
            <div class="col-6">
              <span
                class="text-white quantico uppercase font-weight-bold text-md"
              >
                Total CLAIM
              </span>
            </div>
            <div class="col-6 text-right">
              <span
                class="
                  text-custom-green
                  font-weight-bold
                  quantico
                  uppercase
                  text-md
                "
              >
                {{
                  totalClaimLkm.toLocaleString(undefined, {
                    minimumFractionDigits: 3,
                    maximumFractionDigits: 3,
                  })
                }}
                LKM
              </span>
            </div>
          </div>
        </div>
        <div class="mt-4">
          <div class="row">
            <div class="col-6">
              <button
                v-if="onloadApprove"
                class="btn bg-custom-approve rounded-xl"
              >
                <span
                  class="quantico uppercase text-white font-weight-bold text-xl"
                >
                  <div class="lds-ring" style="border-color: #fff transparent transparent transparent;">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>

                  Processing
                </span>
              </button>
              <button
                v-else
                class="btn bg-custom-approve rounded-xl"
                :disabled="isApprovedEcio"
                @click="approveHandler"
              >
                <span class="quantico uppercase font-weight-bold text-white">
                  approve
                </span>
              </button>
            </div>
            <div class="col-6">
              <button
                v-if="onLoadConfirm"
                class="btn bg-custom-green rounded-xl"
              >
                <span
                  class="quantico uppercase text-black font-weight-bold text-xl"
                >
                  <div class="lds-ring">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>

                  Processing
                </span>
              </button>

              <button
                v-else
                class="btn btn-claim rounded-xl text-uppercase font-weight-bold"
                :disabled="
                  !isApprovedEcio ||
                  validLimit ||
                  validMaximum ||
                  ecioBalance < userWithdrawTax
                "
                @click="signWithdrawLkm"
              >
                confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </modal>

    <modal
      height="auto"
      :scrollable="true"
      :adaptive="true"
      name="ecioClaim"
      class="backdrop"
    >
      <div class="bg-ecio-bg p-5">
        <div class="flex justify-end">
          <button @click="$modal.hide('ecioClaim')">
            <img src="../assets/images/modal-close.png" alt="modal close" />
          </button>
        </div>
        <div class="flex">
          <span
            class="text-2xl font-weight-bold text-ecio-green uppercase quantico"
          >
            claim ECIO reward
          </span>
        </div>
        <div class="text-white mt-4 my-2 uppercase quantico text-lg">
          <span>AVAILABLE: {{ inGameEcio }} ECIO</span>
        </div>
        <div>
          <div class="input-group mb-0">
            <img
              src="../assets/userprofile/ecioIcon.png"
              style="margin-bottom: 0"
              width="42"
            />
            <!-- <span class="text-custom-green font-weight-bold my-2 mr-2 uppercase quantico text-lg">
                ECIO
              </span> -->
            <money
              v-model="ecioAmount"
              @input="checkAmountEcio"
              class="form-control input-dark"
              aria-describedby="withdrawEcio"
            ></money>
            <!-- <input
                type="text"
                class="
                  form-control
                  radius-10
                  relative
                  bg-custom-amount
                  border-0
                  text-white
                "
                aria-label="Amount (to the nearest dollar)"
                v-model="eciomount"
                placeholder="ECIO"
              /> -->
          </div>
        </div>
        <div
          class="text-grey my-2 uppercase quantico text-md"
          v-if="!validMaximum"
        >
          <span>Maximum 100,000 ECIO per withdrawal</span>
        </div>
        <div
          class="text-custom-red my-2 uppercase quantico text-md"
          v-if="validMaximum"
        >
          <span>Maximum 100,000 ECIO per withdrawal</span>
        </div>
        <div
          class="text-custom-red my-2 uppercase quantico text-md"
          v-if="ecioBalance < userWithdrawTax"
        >
          <span>You don't have much ECIO for pay TAX</span>
        </div>
        <div
          class="text-custom-red my-2 uppercase quantico text-md"
          v-if="validLimit"
        >
          <span>Maximum withdraw is {{ inGameEcio }} ECIO</span>
        </div>
        <div class="mt-4">
          <div class="row">
            <div class="col-6">
              <span
                class="text-white quantico uppercase font-weight-bold text-md"
              >
                Last Claim
              </span>
            </div>
            <div class="col-6 text-right">
              <span class="text-grey quantico uppercase text-md">
                {{ lastClaim }}
              </span>
            </div>
          </div>
        </div>
        <div class="mt-0">
          <div class="row">
            <div class="col-6">
              <span
                class="text-white quantico uppercase font-weight-bold text-md"
              >
                Next Claim
              </span>
            </div>
            <div class="col-6 text-right">
              <span class="text-grey quantico uppercase text-md">
                {{ nextClaim }}
              </span>
            </div>
          </div>
        </div>
        <div class="mt-0">
          <span class="text-grey quantico uppercase text-md">
            (without increased tax)
          </span>
        </div>
        <div class="mt-0">
          <div class="row">
            <div class="col-6">
              <span
                class="text-white quantico uppercase font-weight-bold text-md"
              >
                Dynamic Fee
              </span>
              <span class="text-grey quantico uppercase text-md">
                ({{ feeRate }}%)
              </span>
              <i
                class="pi pi-info-circle"
                style="color: #e0fb16"
                content="The Dynamic fee is a reward withdrawal fee that will be randomized every hour, between a 5% - 15% rate deducted from the claimed tokens."
                v-tippy="{
                  placement: 'bottom',
                }"
              >
              </i>
            </div>
            <div class="col-6 text-right">
              <span
                class="text-grey quantico font-weight-bold uppercase text-md"
              >
                {{ dynamicFee }} ECIO
              </span>
            </div>
          </div>
        </div>
        <div class="mt-4">
          <div class="row">
            <div class="col-6">
              <span
                class="text-white quantico uppercase font-weight-bold text-md"
              >
                Your wallet balance
              </span>
            </div>
            <div class="col-6 text-right">
              <span
                class="text-grey quantico font-weight-bold uppercase text-md"
              >
                {{ ecioBalance }} ECIO
              </span>
            </div>
          </div>
        </div>
        <div class="mt-0">
          <div class="row">
            <div class="col-6">
              <span
                class="text-white quantico uppercase font-weight-bold text-md"
              >
                Tax
              </span>
              <i
                class="pi pi-info-circle"
                style="color: #e0fb16"
                content="The tax is a governance token burning mechanism. Starting from 5,000 $ECIO, the tax will increase by increments of 10% for each withdrawal within 36 hours. After 36 hours from the original withdrawal, the tax will be reset to 5,000 $ECIO."
                v-tippy="{
                  placement: 'bottom',
                }"
              >
              </i>
            </div>
            <div class="col-6 text-right">
              <span
                class="text-grey quantico font-weight-bold uppercase text-md"
              >
                {{
                  userWithdrawTax.toLocaleString(undefined, {
                    minimumFractionDigits: 3,
                    maximumFractionDigits: 3,
                  })
                }}
                ECIO
              </span>
            </div>
          </div>
        </div>

        <div class="mt-4">
          <div class="row">
            <div class="col-6">
              <span
                class="text-white quantico uppercase font-weight-bold text-md"
              >
                Total Fee
              </span>
            </div>
            <div class="col-6 text-right">
              <span
                class="
                  text-custom-green
                  font-weight-bold
                  quantico
                  uppercase
                  text-md
                "
              >
                {{ dynamicFee }} ECIO
              </span>
            </div>
          </div>
        </div>
        <div class="mt-0">
          <div class="row">
            <div class="col-6">
              <span
                class="text-white quantico uppercase font-weight-bold text-md"
              >
                Total TAX
              </span>
            </div>
            <div class="col-6 text-right">
              <span
                class="
                  text-custom-green
                  font-weight-bold
                  quantico
                  uppercase
                  text-md
                "
              >
                {{
                  userWithdrawTax.toLocaleString(undefined, {
                    minimumFractionDigits: 3,
                    maximumFractionDigits: 3,
                  })
                }}
                ECIO
              </span>
            </div>
          </div>
        </div>
        <div class="mt-0">
          <div class="row">
            <div class="col-6">
              <span
                class="text-white quantico uppercase font-weight-bold text-md"
              >
                Total CLAIM
              </span>
            </div>
            <div class="col-6 text-right">
              <span
                class="
                  text-custom-green
                  font-weight-bold
                  quantico
                  uppercase
                  text-md
                "
              >
                {{
                  totalClaimEcio.toLocaleString(undefined, {
                    minimumFractionDigits: 3,
                    maximumFractionDigits: 3,
                  })
                }}
                ECIO
              </span>
            </div>
          </div>
        </div>
        <div class="mt-4">
          <div class="row">
            <div class="col-6">
              <button
                v-if="onloadApprove"
                class="btn bg-custom-approve rounded-xl"
              >
                <span
                  class="quantico uppercase text-white font-weight-bold text-xl"
                >
                  <div class="lds-ring" style="border-color: #fff transparent transparent transparent;">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>

                  Processing
                </span>
              </button>
              <button
                v-else
                class="btn bg-custom-approve rounded-xl"
                :disabled="isApprovedEcio"
                @click="approveHandler"
              >
                <span class="quantico uppercase font-weight-bold text-white">
                  approve
                </span>
              </button>
            </div>
            <div class="col-6">
              <button
                v-if="onLoadConfirm"
                class="btn bg-custom-green rounded-xl"
              >
                <span
                  class="quantico uppercase text-black font-weight-bold text-xl"
                >
                  <div class="lds-ring">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>

                  Processing
                </span>
              </button>

              <button
                v-else
                class="btn btn-claim rounded-xl text-uppercase font-weight-bold"
                :disabled="
                  !isApprovedEcio ||
                  validLimit ||
                  validMaximum ||
                  ecioBalance < userWithdrawTax
                "
                @click="signWithdrawEcio"
              >
                confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </modal>

    <modal
      height="auto"
      :scrollable="true"
      :adaptive="true"
      name="successClaim"
      class="backdrop"
    >
      <div class="bg-ecio-bg p-5">
        <div class="flex justify-center">
          <img src="../assets/userprofile/true.png" />
        </div>
        <div class="mt-4 text-center">
          <span class="text-white quantico uppercase font-weight-bold text-2xl">
            The reward claim has been successful
          </span>
        </div>
        <div class="mt-4">
          <div class="row">
            <div class="col-12">
              <button
                class="btn rounded-xl bg-custom-close"
                @click="$modal.hide('successClaim')"
              >
                <span class="quantico uppercase font-weight-bold text-white">
                  close
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </modal>

    <modal
      height="auto"
      :scrollable="true"
      :adaptive="true"
      name="falseClaim"
      class="backdrop"
    >
      <div class="bg-ecio-bg p-5">
        <div class="flex justify-center">
          <img src="../assets/userprofile/false.png" />
        </div>
        <div class="mt-4 text-center">
          <span class="text-white quantico uppercase font-weight-bold text-2xl">
            Something went wrong in the claiming process
          </span>
        </div>
        <div class="mt-4">
          <div class="row">
            <div class="col-12">
              <button
                class="btn rounded-xl bg-custom-close"
                @click="$modal.hide('falseClaim')"
              >
                <span class="quantico uppercase font-weight-bold text-white">
                  close
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
import mautic from "mautic-tracking";
import { recoverPersonalSignature } from "eth-sig-util";
import { ethers } from "ethers";
mautic.initialize("https://mt.ecio.space/mtc.js");
import "primevue/resources/themes/arya-green/theme.css";
import Sidebar from "../components/Sidebar/SidebarProfile.vue";
import SideMenu from "../components/SideMenu/SideMenu.vue";
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
import ClaimToken from "@/contracts/ClaimToken.json";
import Web3 from "web3";
import axios from "axios";
import ERC20 from "./../contracts/ERC20.json";
export default {
  components: {
    Sidebar,
    SideMenu,
    TabView,
    TabPanel,
  },
  props: {
    isOwner: {
      type: Boolean,
      default: false,
    },
    isSidebar: {
      type: Boolean,
      default: true,
    },
    isFavScreen: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
    },
    reSort: {
      type: Boolean,
    },
  },
  computed: {
    convertTokenId() {
      return (
        "#" +
        "0".repeat(9 - String(this.currentCard.token_id).length) +
        this.currentCard.token_id
      );
    },
    visibleSidebar() {
      return this.$store.getters.getSidebar;
    },
    visibleSideMenu() {
      return this.$store.getters.getSideMenu;
    },
    cards() {
      return this.$store.getters.getCards;
    },
    shortAddress() {
      return "".concat(
        this.walletAccount.substring(0, 6),
        "...",
        this.walletAccount.slice(-4)
      );
    },
  },
  data() {
    return {
      addressTo: "",
      validMaximum: false,
      validLimit: false,
      walletAccount: "",
      account: "",
      selectedOption: {},
      ecioContract: undefined,
      lkmContract: undefined,
      ecioBalance: 0,
      lkmBalance: 0,
      busdBalance: 0,
      bnbBalance: 0,
      ecioBalanceUsd: 0,
      lkmBalanceUsd: 0,
      ecioAmount: 0,
      lkmAmount: 0,
      nftCoreContract: undefined,
      busdContract: undefined,
      claimTokenContract: undefined,
      onloadApprove: false,
      isApproveEcio: false,
      onLoadConfirm: false,
      totalClaimLkm: 0,
      totalClaimEcio: 0,
      inGameLkm: "-",
      inGameEcio: "-",
      inGameEcioNumber: "-",
      inGameLkmNumber: "-",
      inGameLkmUsd: "-",
      inGameEcioUsd: "-",
      displayName: "",
      country: "",
      feeRate: 5,
      isApprovedEcio: false,
      lastClaim: "First Claim",
      nextClaim: "",
      dynamicFee: "-",
      stackClaim: "-",
      startCountTime: "",
      userWithdrawTax: 5000,
      loadingInfo: false,
    };
  },
  mounted() {
    var that = this;
    window.ethereum.on("accountsChanged", function () {
      that.connectWallet();
      that.walletAccount = window.ethereum.selectedAddress;
      that.$emit("connected", window.ethereum.selectedAddress);
    });

    window.ethereum.on("chainChanged", () => {
      that.connectWallet();
      that.walletAccount = window.ethereum.selectedAddress;
      that.$emit("connected", window.ethereum.selectedAddress);
    });

    window.ethereum.on("disconnect", () => {
      that.walletAccount = "";
      that.$emit("disconnected", window.ethereum.selectedAddress);
    });

    window.ethereum.on("connected", () => {
      that.$emit("connected", window.ethereum.selectedAddress);
    });
    if (
      window.ethereum.selectedAddress != "" ||
      typeof window.ethereum != "undefined"
    ) {
      this.connectWallet().then(() => {
        this.loadContract();
        this.loadAccountBalance();
        this.loadUserData();
        this.loadFeeRate();
        this.checkWithdrawInfo();
      });
    }
  },
  methods: {
    async loadAccountBalance() {
      this.loadContract().then(() => {
        this.ecioContract.methods
          .balanceOf(window.ethereum.selectedAddress)
          .call()
          .then((results) => {
            this.ecioBalance = Number(
              Web3.utils.fromWei(results, "ether")
            ).toLocaleString(undefined, {
              minimumFractionDigits: 3,
              maximumFractionDigits: 3,
            });
          });
        this.lkmContract.methods
          .balanceOf(window.ethereum.selectedAddress)
          .call()
          .then((results) => {
            this.lkmBalance = Number(
              Web3.utils.fromWei(results, "ether")
            ).toLocaleString(undefined, {
              minimumFractionDigits: 3,
              maximumFractionDigits: 3,
            });
          });
        this.busdContract.methods
          .balanceOf(window.ethereum.selectedAddress)
          .call()
          .then((results) => {
            this.busdBalance = Number(
              Web3.utils.fromWei(results, "ether")
            ).toLocaleString(undefined, {
              minimumFractionDigits: 3,
              maximumFractionDigits: 3,
            });
          });
      });
    },
    async connectWallet() {
      if (this.validated()) {
        this.switchNetwork();

        await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        // console.log(window.web3.eth.getBalance(window.ethereum.selectedAddress));
        this.bnbBalance = await window.web3.eth.getBalance(
          window.ethereum.selectedAddress
        );
        this.account = await window.web3.eth.getAccounts();
        this.walletAccount = window.ethereum.selectedAddress;
        this.checkLoadApprove();
        // console.log(Web3.currentProvider.selectedAddress);
      }
    },
    async loadUserData() {
      this.loadingInfo = true;
      axios
        .get(
          "https://n9wv0b0vy9.execute-api.ap-southeast-1.amazonaws.com/prod/api/v1/" +
            "token?wallet_address=" +
            this.account
        )
        .then((response) => {
          this.loadingInfo = false;
          this.inGameLkm = response.data.coin_lakrima.toLocaleString(
            undefined,
            {
              minimumFractionDigits: 3,
              maximumFractionDigits: 3,
            }
          );
          this.inGameEcio = response.data.coin_ecio.toLocaleString(undefined, {
            minimumFractionDigits: 3,
            maximumFractionDigits: 3,
          });
          this.inGameEcioNumber = response.data.coin_ecio;
          this.inGameLkmNumber = response.data.coin_lakrima;
          this.inGameLkmUsd = response.data.coin_lakrima_usd.toLocaleString(
            undefined,
            {
              minimumFractionDigits: 3,
              maximumFractionDigits: 3,
            }
          );
          this.inGameEcioUsd = response.data.coin_ecio_usd.toLocaleString(
            undefined,
            {
              minimumFractionDigits: 3,
              maximumFractionDigits: 3,
            }
          );
          console.log(this.walletAccount);
          this.displayName = response.data.display_name;
          this.country = response.data.country;
        });
    },
    async loadFeeRate() {
      axios
        .get(
          "https://n9wv0b0vy9.execute-api.ap-southeast-1.amazonaws.com/prod/api/v1/" +
            "dynamic_fee"
        )
        .then((response) => {
          console.log(response.data);
          this.feeRate = response.data.rate;
        });
    },
    async loadContract() {
      window.web3 = new Web3(window.ethereum);
      if (typeof window.ethereum == "undefined") {
        window.web3.setProvider(
          new Web3.providers.HttpProvider(process.env.VUE_APP_RPC_URL)
        );
      }

      this.ecioContract = await new window.web3.eth.Contract(
        ERC20.abi,
        process.env.VUE_APP_ECIO_CONTRACT_ADDRESS
      );

      this.lkmContract = await new window.web3.eth.Contract(
        ERC20.abi,
        process.env.VUE_APP_LAKRIMA_CONTRACT_ADDRESS
      );

      this.busdContract = await new window.web3.eth.Contract(
        ERC20.abi,
        process.env.VUE_APP_BUSD_TOKEN_CONTRACT_ADDRESS
      );

      this.claimTokenContract = await new window.web3.eth.Contract(
        ClaimToken.abi,
        process.env.VUE_APP_NFT_CLAIM_TOKEN_CONTRACT_ADDRESS
      );
    },
    async checkLoadApprove() {
      await this.loadContract().then(() => {
        this.ecioContract.methods
          .allowance(
            this.walletAccount,
            process.env.VUE_APP_NFT_CLAIM_TOKEN_CONTRACT_ADDRESS
          )
          .call()
          .then((pl) => {
            let allowanceAmount = Web3.utils.fromWei(pl, "ether");
            if (allowanceAmount >= 5000) {
              // this.isStaked = false;
              this.isApprovedEcio = true;
            } else {
              this.isApprovedEcio = false;
            }
          });
      });
      this.bnbBalance = Number(
        Web3.utils.fromWei(this.bnbBalance, "ether")
      ).toLocaleString(undefined, {
        minimumFractionDigits: 3,
        maximumFractionDigits: 3,
      });
    },
    async checkWithdrawInfo() {
      // console.log("HERE");
      await this.loadContract().then(() => {
        this.claimTokenContract.methods
          .userInfo(this.walletAccount)
          .call()
          .then((pl) => {
            if (pl.lastClaimTime !== "0") {
              let lastClaim = new Date(Number(pl.lastClaimTime + "000"));
              this.lastClaim =
                lastClaim.getUTCDate() +
                "/" +
                Number(lastClaim.getUTCMonth() + 1) +
                "/" +
                lastClaim.getUTCFullYear() +
                " " +
                lastClaim.getUTCHours() +
                ":" +
                lastClaim.getUTCMinutes() +
                " UTC";
              this.stackClaim = pl.stackCount;
              this.startCountTime = pl.startCountTime;
              this.userWithdrawTax = Number(
                Web3.utils.fromWei(pl.userWithdrawFee, "ether")
              );
              let minutesToAdd = 2160;
              let timestamp = new Date(
                Number(pl.lastClaimTime + "000") + minutesToAdd * 60000
              );
              this.nextClaim =
                timestamp.getUTCDate() +
                "/" +
                Number(timestamp.getUTCMonth() + 1) +
                "/" +
                timestamp.getUTCFullYear() +
                " " +
                timestamp.getUTCHours() +
                ":" +
                timestamp.getUTCMinutes() +
                " UTC";
            } else {
              let minutesToAdd = 2160;
              let currentDate = new Date();
              console.log(currentDate.toUTCString());
              // let testTime = "1647956012";
              let timestamp = new Date(
                currentDate.getTime() + minutesToAdd * 60000
              );

              // let lastClaim = new Date(Number(testTime+"000"));
              // console.log(lastClaim.toUTCString());
              // this.lastClaim =
              //   lastClaim.getUTCDate() +
              //   "/" +
              //   lastClaim.getUTCMonth() +
              //   "/" +
              //   lastClaim.getUTCFullYear() +
              //   " " +
              //   lastClaim.getUTCHours() +
              //   ":" +
              //   lastClaim.getUTCMinutes() +
              //   " UTC";
              this.nextClaim =
                timestamp.getUTCDate() +
                "/" +
                Number(timestamp.getUTCMonth() + 1) +
                "/" +
                timestamp.getUTCFullYear() +
                " " +
                timestamp.getUTCHours() +
                ":" +
                timestamp.getUTCMinutes() +
                " UTC";
            }
          });
      });
    },
    approveHandler() {
      this.onloadApprove = true;
      this.loadContract().then(() => {
        var allowEcioWei = Web3.utils.toWei(
          Web3.utils.toBN(500000).toString(),
          "ether"
        );
        this.ecioContract.methods
          .approve(
            process.env.VUE_APP_NFT_CLAIM_TOKEN_CONTRACT_ADDRESS,
            allowEcioWei
          )
          .send({ from: this.walletAccount })
          .on("sent", (data) => this.sendApprove(data))
          .on("transactionHash", (tx) => this.transactionHash(tx))
          .on("receipt", (data) => this.receiptApprove(data))
          // .on("confirmation", (data) => this.confirmApprove(data))
          .on("error", (error) => {
            this.showToastError(error);
            this.onloadApprove = false;
          });
      });
    },
    sendApprove(data) {
      console.log("sendApprove data", data);
    },
    transactionHash(transaction) {
      console.log("transaction", transaction);
    },
    receiptApprove() {
      // this.successTransaction("Approved your wallet", this.txHash);
      this.isApprovedEcio = true;
      this.onloadApprove = false;
      this.checkLoadApprove();
    },
    checkAmountLkm() {
      // console.log(this.lkmAmount);
      // console.log(this.inGameLkmNumber);
      if (this.lkmAmount > 100000) {
        this.validMaximum = true;
      } else {
        this.validMaximum = false;
      }
      if (this.lkmAmount > this.inGameLkmNumber) {
        this.validLimit = true;
      } else {
        this.validLimit = false;
      }
      this.dynamicFee = Number(
        this.lkmAmount * (this.feeRate / 100)
      ).toLocaleString(undefined, {
        minimumFractionDigits: 3,
        maximumFractionDigits: 3,
      });
      this.totalClaimLkm =
        this.lkmAmount - this.lkmAmount * (this.feeRate / 100);
    },
    checkAmountEcio() {
      if (this.ecioAmount > 100000) {
        this.validMaximum = true;
      } else {
        this.validMaximum = false;
      }
      if (this.ecioAmount > this.inGameEcioNumber) {
        this.validLimit = true;
      } else {
        this.validLimit = false;
      }
      this.dynamicFee = Number(
        this.ecioAmount * (this.feeRate / 100)
      ).toLocaleString(undefined, {
        minimumFractionDigits: 3,
        maximumFractionDigits: 3,
      });
      this.totalClaimEcio =
        this.ecioAmount - this.ecioAmount * (this.feeRate / 100);
    },
    async testSign() {
      let message = "9543624284" + this.lkmAmount;
      // console.log(message);
      let hashMsg = Web3.utils.keccak256(message);
      window.web3 = new Web3(window.ethereum);
      if (typeof window.ethereum == "undefined") {
        window.web3.setProvider(
          new Web3.providers.HttpProvider(process.env.VUE_APP_RPC_URL)
        );
      }
      // console.log(window.web3.eth.getCoinbase());
      // console.log(window.web3.eth.getAccounts());
      let wallet = await window.web3.eth.getAccounts();
      console.log(this.walletAccount);
      window.web3.eth.sign(hashMsg, this.walletAccount, function (err, result) {
        if (err) return console.error(err);
        console.log("SIGNED SIG:" + result);
        console.log(wallet[0]);

        // Recover address from Sig
        const address = recoverPersonalSignature({
          data: hashMsg,
          sig: result,
        });
        console.log(address);

        // Verify Sig
        console.log("VERIFY " + wallet[0].toLowerCase() + " = " + address);

        const pk = ethers.utils.recoverPublicKey(
          ethers.utils.arrayify(hashMsg),
          result
        );

        console.log(pk);
      });

      // var web3 = new Web3(window.ethereum);
      // var signature = window.web3.eth.accouts.sign(message, '0xb5b1870957d373ef0eeffecc6e4812c0fd08f554b37b233526acc331bf1544f7');
      // console.log("signature :", signature);
      // var messageHash = window.web3.eth.accounts.hashMessage(message);
      // var recover_1 = window.web3.eth.accounts.recover({
      //   messageHash: messageHash,
      //   v: signature.v,
      //   r: signature.r,
      //   s: signature.s,
      // });

      // console.log("recover 1 :", recover_1);
    },
    async signWithdrawLkm() {
      let wallet = await window.web3.eth.getAccounts();
      this.onLoadConfirm = true;
      axios
        .post(
          "https://n9wv0b0vy9.execute-api.ap-southeast-1.amazonaws.com/prod/api/v1/" +
            "nonce",
          { wallet_address: wallet[0] }
        )
        .then((response) => {
          // let message = response.data + this.lkmAmount;
          // console.log(response);
          let message = response.data + this.lkmAmount;
          console.log("MSG b4 hash : " + message);
          let hashMsg = Web3.utils.keccak256(message);
          window.web3 = new Web3(window.ethereum);
          if (typeof window.ethereum == "undefined") {
            window.web3.setProvider(
              new Web3.providers.HttpProvider(process.env.VUE_APP_RPC_URL)
            );
          }
          let lkmAmount = this.lkmAmount;
          console.log(lkmAmount);
          let that = this;
          window.web3.eth.sign(
            hashMsg,
            that.walletAccount,
            function (err, result) {
              if (err) return console.error(err);
              console.log("SIGNED SIG:" + result);
              const pk = ethers.utils.recoverPublicKey(
                ethers.utils.arrayify(hashMsg),
                result
              );

              console.log(pk);
              axios
                .post(
                  "https://n9wv0b0vy9.execute-api.ap-southeast-1.amazonaws.com/prod/api/v1/" +
                    "claim_reward",
                  {
                    lakrima_amount: lkmAmount,
                    wallet_address: wallet[0],
                    signature: result,
                  }
                )
                .then((res) => {
                  that.onLoadConfirm = false;
                  console.log(res);
                  that.loadAccountBalance();
                  that.loadUserData();
                  that.loadFeeRate();
                  that.switchModal("successClaim", "lkmClaim");
                })
                .catch((err) => {
                  that.onLoadConfirm = false;
                  console.log("ERROR");
                  that.switchModal("falseClaim", "lkmClaim");
                  console.log(err);
                });
            }
          );
        });
    },
    async signWithdrawEcio() {
      let wallet = await window.web3.eth.getAccounts();
      this.onLoadConfirm = true;
      axios
        .post(
          "https://n9wv0b0vy9.execute-api.ap-southeast-1.amazonaws.com/prod/api/v1/" +
            "nonce",
          { wallet_address: wallet[0] }
        )
        .then((response) => {
          // let message = response.data + this.lkmAmount;
          console.log(response);
          let message = response.data + this.ecioAmount;
          console.log("MSG b4 hash : " + message);
          let hashMsg = Web3.utils.keccak256(message);
          window.web3 = new Web3(window.ethereum);
          if (typeof window.ethereum == "undefined") {
            window.web3.setProvider(
              new Web3.providers.HttpProvider(process.env.VUE_APP_RPC_URL)
            );
          }
          let ecioAmount = this.ecioAmount;
          console.log(ecioAmount);
          let that = this;
          window.web3.eth.sign(
            hashMsg,
            that.walletAccount,
            function (err, result) {
              if (err) return console.error(err);
              console.log("SIGNED SIG:" + result);
              const pk = ethers.utils.recoverPublicKey(
                ethers.utils.arrayify(hashMsg),
                result
              );

              console.log(pk);
              axios
                .post(
                  "https://n9wv0b0vy9.execute-api.ap-southeast-1.amazonaws.com/prod/api/v1/" +
                    "claim_reward",
                  {
                    ecio_amount: ecioAmount,
                    wallet_address: wallet[0],
                    signature: result,
                  }
                )
                .then((res) => {
                  that.onLoadConfirm = false;
                  this.loadAccountBalance();
                  this.loadUserData();
                  this.loadFeeRate();
                  console.log(res);
                  that.switchModal("successClaim", "ecioClaim");
                })
                .catch((err) => {
                  that.onLoadConfirm = false;
                  console.log("ERROR");
                  that.switchModal("falseClaim", "ecioClaim");
                  console.log(err);
                });
            }
          );
        });
    },
    switchModal(open, close) {
      this.$modal.show(open);
      this.$modal.hide(close);
    },
    isNumber: function (evt) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      console.log(charCode);
      if (charCode < 48 || charCode > 57) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
    validated() {
      if (typeof window.ethereum !== "undefined") {
        return true;
      }

      return false;
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
  },
};
</script>

<style>
.side-menu-top {
  margin-top: 100px;
}
.preview {
  color: #3f4148;
}
.vm--modal {
  height: auto !important;
}
.load-more:hover {
  color: #e0fb16 !important;
}
.side-menu-bg {
  background-color: #1d1d1d;
}
.bg-custom-amount {
  background-color: #222326 !important;
}
.bg-custom-amount:focus {
  background-color: #222326;
}
.amiko {
  font-family: "Amiko";
}
.radius-10 {
  border-radius: 10px !important;
}
.bg-custom {
  background-color: #111111;
}
.bg-custom-purple {
  background-color: #9a66ff;
}
.bg-custom-approve {
  background-color: #4804d9;
}
.bg-custom-close {
  background-color: #2f3245;
}
.currecy-text-color {
  color: #3f4148;
}
.card {
  background-color: #252525;
  border-radius: 10px;
}
.bg-custom-green {
  background: #e0fb16;
}
.divider {
  border-bottom: 1px solid #000000;
}
.card-id {
  color: rgba(255, 255, 255, 0.5);
}
.form-select {
  background-color: #000000;
  color: #ffffff;
  padding-left: 10px;
  height: 40px;
}
.quantico {
  font-family: Quantico;
}
.search-auto-complete .ui.selection.dropdown {
  border-radius: 10px;
  background-color: #000000 !important;
  border-color: #000000;
}
.search-auto-complete .ui.selection.active.dropdown:hover,
.ui.selection.active.dropdown:hover .menu {
  border-color: #000000;
  background-color: #000000;
}
.search-auto-complete .ui.selection.dropdown .menu > .item {
  color: #ffffff;
  border-color: #000000;
}
.search-auto-complete .ui.dropdown .menu .selected.item,
.ui.dropdown.selected {
  background: linear-gradient(0deg, #3f4148, #3f4148), #222326;
}
.search-auto-complete .ui.dropdown .menu {
  border-color: #000000;
}
.search-auto-complete .ui.dropdown .menu {
  background-color: #000000;
  border-color: #000000 !important;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
}
.backdrop {
  background-color: rgba(0, 0, 0, 0.8);
}

.bg-custom-green:disabled {
  background: #9e9e9e;
}

.bg-custom-purple:disabled {
  background: #9e9e9e;
}
.text-custom-green {
  color: #e0fb16;
}
.text-custom-purple {
  color: #9a66ff;
}
.text-custom-red {
  color: red;
}
.lds-ring {
  display: inline-block;
  position: relative;
  width: 30px;
  height: 20px;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 24px;
  height: 24px;
  margin: 3px;
  border: 3px solid #000;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #000 transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
.p-tabview .p-tabview-panels {
  background: none;
  font-family: "Quantico";
}
.p-tabview .p-tabview-nav {
  font-family: "Quantico";
}
.p-tabview .p-tabview-nav li .p-tabview-nav-link {
  background: none;
}
.p-tabview .p-tabview-nav li.p-highlight .p-tabview-nav-link {
  background: none;
  border-color: #e0fb16;
  color: #e0fb16;
}
.btn-claim {
  font-size: 1.2rem;
  padding: 20px;
  text-align: center;
  background-color: #e0fb16;
  color: #000;
  height: 40px;
  border-radius: 10px;
  text-transform: uppercase;
  font-family: "Quantico" !important;
}
.p-tabview
  .p-tabview-nav
  li:not(.p-highlight):not(.p-disabled):hover
  .p-tabview-nav-link {
  border-color: #e0fb16 !important;
}

@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
