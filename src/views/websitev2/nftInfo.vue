<template>
  <div v-if="!loading" class="flex-1 font-quantico bg-ecio-bg text-white pt-20">
    <div class="xs:p-6 xs:mt-6 lg:p-12 flex flex-row justify-between m-auto">
      <router-link to="/marketplace" class="router-back">
        <button class="flex gap-2 items-center" @click="$router.go(-1)">
          <div><img src="../../assets/images/leftarrow.png" /></div>
          <span
            class="
              xs:text-base
              lg:text-2xl
              font-weight-bold
              text-uppercase text-white
            "
            >Back</span
          >
        </button>
      </router-link>
      <span class="xs:text-base lg:text-xl font-weight-bold text-gray-600">
        INFORMATION
      </span>
    </div>
    <div
      class="
        xs:hidden
        xl:grid
        mx-12
        p-12
        grid-cols-5
        bg-ecio-container
        rounded-xl
      "
    >
      <div
        class="
          grid
          col-start-1 col-end-3
          justify-center
          align-center
          self-center
        "
      >
        <div class="text-center">
          <img
            class="xs:px-20 xs:max-w-xs lg:px-10 mr-5 lg:max-w-lg h-auto"
            :src="changeImageEndpoint(card.image)"
          />
        </div>
      </div>
      <div class="col-start-3 col-end-6 relative">
        <div class="grid grid-cols-2">
          <div>
            <span class="xs:text-md md:text-5xl uppercase font-weight-bold">
              {{ cardInfo.name }}
            </span>
          </div>
          <div class="text-right">
            <span class="xs:text-xs md:text-3xl xl:text-4xl text-gray-600">
              {{ convertTokenId }}
            </span>
          </div>
        </div>
        <div class="mt-8">
          <span class="uppercase text-2xl">{{ card.nft_type }}</span>
          <span class="text-2xl ml-4" :class="rarities[card.rarity]">
            {{ card.rarity }}
          </span>
        </div>
        <div
          class="
            flex
            justify-center
            align-center
            flex-col
            xl:justify-start
            mt-8
            mb-12
          "
        >
          <span class="xs:text-xl lg:text-3xl font-weight-bold"
            >Information</span
          >
          <span class="xs:text-md lg:text-2xl amiko mt-3">
            {{ cardInfo.description }}
          </span>
        </div>
        <div class="flex mt-2 mb-5 gap-4 items-center xs:text-base lg:text-2xl">
          <span class="uppercase">Owner</span>
          <span style="color: #07f7f8" v-if="card.market_owner">
            {{ card.market_owner.slice(0, 4) }}...{{
              card.market_owner.slice(38, 42)
            }}
          </span>
        </div>

        <div
          style="position: relative"
          class="items-center w-full absolute bottom-0 flex justify-between"
        >
          <div>
            <span class="text-4xl text-ecio-green font-weight-bold">
              {{ card.price || "-" }}
              BUSD
            </span>
          </div>
          <div v-if="!isCardOwner && isListed" class="text-right">
            <div>
              <button
                v-if="!onloadApprove"
                :disabled="isApprove"
                class="
                  w-60
                  h-11
                  lg:max-w-md
                  bg-ecio-purple
                  rounded-xl
                  text-black
                  uppercase
                  mr-3
                  font-weight-bold
                "
                @click="approveHandler"
              >
                {{ isApprove ? "Approved" : "Approve" }}
              </button>

              <button
                v-else
                class="
                  w-60
                  h-11
                  lg:max-w-md
                  bg-ecio-purple
                  rounded-xl
                  text-black
                  uppercase
                  mr-3
                  font-weight-bold
                "
              >
                <div class="lds-ring">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>

                PROCESSING
              </button>

              <button
                v-if="!processingBuy"
                :disabled="!isApprove"
                class="
                  w-60
                  h-11
                  lg:max-w-md
                  bg-ecio-green
                  rounded-xl
                  text-black
                  uppercase
                  font-weight-bold
                "
                @click="createSale"
              >
                Buy
              </button>

              <button
                v-if="processingBuy"
                class="
                  w-60
                  h-11
                  lg:max-w-md
                  bg-ecio-green
                  rounded-xl
                  text-black
                  uppercase
                  font-weight-bold
                "
              >
                <div class="lds-ring">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                PROCESSING
              </button>
            </div>
          </div>
          <div
            v-else-if="isCardOwner"
            class="text-right flex justify-end gap-4"
          >
            <div v-if="card.isSelling">
              <button v-if="onloadCancel" class="btn bg-ecio-gray rounded-xl">
                <span
                  class="
                    quantico
                    uppercase
                    text-black
                    font-weight-bold
                    w-60
                    h-11
                    lg:max-w-md
                    font-weight-bold
                  "
                >
                  <div class="lds-ring">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                  Canceling
                </span>
              </button>

              <button
                v-else
                class="
                  w-60
                  h-11
                  lg:max-w-md
                  bg-ecio-gray
                  rounded-xl
                  text-black
                  uppercase
                  quantico
                  font-weight-bold
                "
                @click="cancelOrder"
              >
                Cancel
              </button>
            </div>
            <div v-else>
              <button
                class="
                  w-60
                  h-11
                  lg:max-w-md
                  bg-ecio-purple
                  rounded-xl
                  text-black
                  uppercase
                  font-weight-bold
                "
                @click="$modal.show('sell')"
              >
                Sell
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="
        xs:block
        xl:hidden
        mx-4
        p-4
        grid
        align-center
        bg-ecio-container
        rounded-xl
      "
    >
      <div class="grid justify-center align-center self-center">
        <div class="text-center">
          <img
            class="xs:px-10 xs:max-w-xs lg:px-0 lg:max-w-lg h-auto"
            :src="changeImageEndpoint(card.image)"
          />
        </div>
        <div class="text-center xs:mt-2 lg:mt-4">
          <span class="xs:text-xs md:text-3xl xl:text-5xl text-gray-600">
            {{ convertTokenId }}
          </span>
        </div>
      </div>
      <div class="flex lg:mx-12 flex-col justify-between xl:justify-start">
        <div class="flex flex-col">
          <div class="grid grid-cols-2 items-center mt-5 font-bold xl:flex-row">
            <div>
              <span class="xs:text-md md:text-3xl uppercase">
                {{ cardInfo.name }}
              </span>
            </div>
            <div class="text-right">
              <span class="xs:text-md text-ecio-green md:text-3xl uppercase">
                {{ numberWithCommas(card.price) || "-" }} BUSD
              </span>
            </div>
          </div>
          <div class="flex mt-2 gap-4 items-center xs:text-base lg:text-4xl">
            <span class="uppercase">{{ card.nft_type }}</span>
            <span class="text-ecio-pink" v-if="card.rarity === 'LEGENDARY'">
              LEGENDARY
            </span>
            <span class="text-ecio" v-if="card.rarity === 'LIMITED'"
              >LIMITED</span
            >
            <span class="text-ecio-purple" v-if="card.rarity === 'EPIC'"
              >EPIC</span
            >
            <span class="text-ecio-blue" v-if="card.rarity === 'RARE'"
              >RARE</span
            >
            <span class="text-ecio-grey" v-if="card.rarity === 'COMMON'"
              >COMMON</span
            >
          </div>
          <div
            class="
              flex
              justify-center
              align-center
              flex-col
              xl:justify-start
              mt-2
              mb-12
            "
          >
            <span class="xs:text-xl lg:text-3xl">Information</span>
            <span class="xs:text-md lg:text-2xl mt-3 amiko">
              {{ cardInfo.description }}
            </span>
          </div>
          <div
            class="flex mt-2 mb-3 gap-4 items-center xs:text-base lg:text-2xl"
          >
            <span class="uppercase">Owner</span>
            <span style="color: #07f7f8" v-if="card.market_owner">
              {{ card.market_owner.slice(0, 4) }}...{{
                card.market_owner.slice(38, 42)
              }}
            </span>
          </div>
        </div>
        <div class="flex items-center justify-between flex-col xl:flex-row">
          <span class="sm:hidden text-4xl text-ecio-green">
            {{ numberWithCommas(card.price) || "-" }} BUSD
          </span>
          <div>
            <div
              v-if="!isCardOwner && isListed"
              class="
                text-center
                flex
                gap-4
                flex-col
                mt-2
                xl:mt-0 xl:flex-row
                xs:w-100
              "
            >
              <button
                :disabled="isApprove"
                class="
                  w-60
                  h-11
                  lg:max-w-md
                  bg-ecio-purple
                  rounded-xl
                  text-black
                  uppercase
                "
                @click="approveHandler"
              >
                {{ isApprove ? "Approved" : "Approve" }}
              </button>
              <button
                class="
                  w-60
                  h-11
                  lg:max-w-md
                  bg-ecio-green
                  rounded-xl
                  text-black
                  uppercase
                "
                @click="createSale"
              >
                BUY
              </button>
            </div>
            <div v-else-if="isCardOwner">
              <div
                v-if="card.isSelling"
                class="grid gap-4 grid-cols-2 mt-2 xl:mt-0 xl:flex-row"
              >
                <button
                  class="
                    mb-3
                    w-60
                    h-11
                    lg:max-w-md
                    bg-ecio-gray
                    rounded-xl
                    text-black
                    uppercase
                  "
                  @click="cancelOrder"
                >
                  Cancel
                </button>
                <!-- <button
                  class="
                    w-60
                    h-11
                    lg:max-w-md
                    bg-custom-gray
                    rounded-xl
                    text-black
                    uppercase
                  "
                  @click="$modal.show('gift')"
                >
                  Gift
                </button> -->
              </div>
              <div v-else>
                <button
                  class="
                    mb-3
                    w-60
                    h-11
                    lg:max-w-md
                    bg-ecio-purple
                    rounded-xl
                    text-black
                    uppercase
                  "
                  @click="$modal.show('sell')"
                >
                  SELL
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="grid gap-4 flex xs:mx-6 xl:mx-12 mt-3"
      :class="abilityLogo ? 'xs:grid-cols-1' : 'xl:grid-cols-2'"
    >
      <div
        class="
          xs:p-4
          lg:p-5
          flex
          bg-ecio-container
          rounded-xl
          justify-start
          items-center
          flex-col
          lg:flex-row
        "
      >
        <div
          v-if="
            card.code_weapon != '' &&
            card.code_weapon != undefined &&
            card.nft_type === 'CARD'
          "
          class="flex justify-center xl:flex-none"
        >
          <img
            width="229"
            height="226"
            :src="
              require(`@/assets/weapon-icons/weapon_icon_${card.code_weapon}.png`)
            "
            alt="ability"
          />
        </div>
        <div class="flex flex-col self-start mt-3 lg:mt-0 lg:ml-10">
          <span class="text-3xl lg:text-3xl font-bold">{{
            card.nft_type === "FRAGMENT" ? "Ability" : "Weapon Ability"
          }}</span>
          <span class="text-sm lg:text-xl font-bold mt-3">{{ skill }}</span>
        </div>
      </div>
      <div class="p-3 flex bg-ecio-container rounded-xl flex-col gap-4">
        <span class="xs:text-3xl text-3xl lg:text-left">Stats</span>
        <div
          class="
            grid grid-cols-2
            sm:grid-cols-2
            md:grid-cols-4
            gap-5
            lg:gap-5
            flex
            justify-center
          "
        >
          <div
            v-for="(value, name) in stats"
            :key="value + name"
            class="flex items-center gap-4"
          >
            <img
              width="60"
              height="60"
              :src="require(`../../assets/images/${stats[name].image}`)"
              alt="hp"
            />
            <div class="flex flex-col">
              <span v-if="name == 'ASPD'" title="Attack Cooldown">ACD</span>
              <span v-else>{{ name }}</span>
              <span class="color-light-blue">{{
                parseFloat(stats[name].value).toFixed(2)
              }}</span>
            </div>
          </div>
        </div>
        <div v-if="bonuses.length != 0" class="">
          <span class="xs:text-3xl text-3xl lg:text-left">Bonus Stats</span>
          <div
            class="
              grid grid-cols-2
              sm:grid-cols-2
              md:grid-cols-4
              gap-3
              lg:gap-5
              flex
              justify-center
              mt-3
            "
          >
            <div class="flex items-center gap-4">
              <img
                width="60"
                height="60"
                src="../../assets/images/hp_icon.png"
                alt="hp"
              />
              <div class="flex flex-col">
                <span>HP</span>
                <span class="color-light-blue">{{ bonuses[0].value }}%</span>
              </div>
            </div>
            <div class="flex items-center gap-4">
              <img
                width="60"
                height="60"
                src="../../assets/images/def_icon.png"
                alt="def"
              />
              <div class="flex flex-col">
                <span>DEF</span>
                <span class="color-light-blue">{{ bonuses[1].value }}%</span>
              </div>
            </div>
            <div class="flex items-center gap-4">
              <img
                width="60"
                height="60"
                src="../../assets/images/atk_icon.png"
                alt="atk"
              />
              <div class="flex flex-col">
                <span>ATK</span>
                <span class="color-light-blue">{{ bonuses[2].value }}%</span>
              </div>
            </div>
            <div class="flex items-center gap-4">
              <img
                width="60"
                height="60"
                src="../../assets/images/aspd_icon.png"
                alt="aspd"
              />
              <div class="flex flex-col">
                <span title="Attack Cooldown">ACD</span>
                <span class="color-light-blue">{{ bonuses[3].value }}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="xs:mx-6 xl:mx-12 pb-12 mt-3">
      <div
        v-if="card.nft_type === 'CARD'"
        class="p-3 flex bg-ecio-container rounded-xl flex flex-col gap-4"
      >
        <span class="text-3xl lg:text-left">Body parts</span>
        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <div class="flex flex-col bg-ecio-bg rounded-xl p-5">
            <div class="grid grid-cols-2">
              <span class="text-ecio">PART</span>
              <span>CHARACTER</span>
            </div>
            <div class="grid grid-cols-2">
              <span class="text-ecio">NAME</span>
              <span>{{ bodyPart["character_name"] }}</span>
            </div>
            <div class="grid grid-cols-2">
              <span class="text-ecio">RARITY</span>
              <span :class="rarities[bodyPart.character_rarity]">{{
                bodyPart["character_rarity"]
              }}</span>
            </div>
            <div class="grid grid-cols-2">
              <span class="text-ecio">CLASS</span>
              <span>{{ bodyPart["character_class"] }}</span>
            </div>
          </div>
          <div class="flex flex-col bg-ecio-bg rounded-xl p-5">
            <div class="grid grid-cols-2">
              <span class="text-ecio">PART</span>
              <span>CAMP</span>
            </div>
            <div class="grid grid-cols-2">
              <span class="text-ecio">NAME</span>
              <span>{{ bodyPart["camp_name"] }}</span>
            </div>
            <div class="grid grid-cols-2">
              <span class="text-ecio">RARITY</span>
              <span :class="rarities[bodyPart.camp_rarity]">{{
                bodyPart["camp_rarity"]
              }}</span>
            </div>
            <div class="grid grid-cols-2">
              <span class="text-ecio">CLASS</span>
              <span>{{ bodyPart["camp_class"] }}</span>
            </div>
          </div>
          <div class="flex flex-col bg-ecio-bg rounded-xl p-5">
            <div class="grid grid-cols-2">
              <span class="text-ecio">PART</span>
              <span>WEAPON</span>
            </div>
            <div class="grid grid-cols-2">
              <span class="text-ecio">NAME</span>
              <span>{{ bodyPart["weapon_name"] }}</span>
            </div>
            <div class="grid grid-cols-2">
              <span class="text-ecio">RARITY</span>
              <span :class="rarities[bodyPart.weapon_rarity]">{{
                bodyPart["weapon_rarity"]
              }}</span>
            </div>
            <div class="grid grid-cols-2">
              <span class="text-ecio">CLASS</span>
              <span>{{ bodyPart["weapon_class"] }}</span>
            </div>
          </div>
          <div class="flex flex-col bg-ecio-bg rounded-xl p-5">
            <div class="grid grid-cols-2">
              <span class="text-ecio">PART</span>
              <span>BATTLE SUIT</span>
            </div>
            <div class="grid grid-cols-2">
              <span class="text-ecio">NAME</span>
              <span>{{ bodyPart["battle_suit_name"] }}</span>
            </div>
            <div class="grid grid-cols-2">
              <span class="text-ecio">RARITY</span>
              <span :class="rarities[bodyPart.battle_suit_rarity]">{{
                bodyPart["battle_suit_rarity"]
              }}</span>
            </div>
            <div class="grid grid-cols-2">
              <span class="text-ecio">CLASS</span>
              <span>{{ bodyPart["battle_suit_class"] }}</span>
            </div>
          </div>
          <div class="flex flex-col bg-ecio-bg rounded-xl p-5">
            <div class="grid grid-cols-2">
              <span class="text-ecio">PART</span>
              <span>BATTLE GEAR</span>
            </div>
            <div class="grid grid-cols-2">
              <span class="text-ecio">NAME</span>
              <span>{{ bodyPart["battle_gear_name"] }}</span>
            </div>
            <div class="grid grid-cols-2">
              <span class="text-ecio">RARITY</span>
              <span :class="rarities[bodyPart.battle_gear_rarity]">{{
                bodyPart["battle_gear_rarity"]
              }}</span>
            </div>
            <div class="grid grid-cols-2">
              <span class="text-ecio">CLASS</span>
              <span>{{ bodyPart["battle_gear_class"] }}</span>
            </div>
          </div>
          <div class="flex flex-col bg-ecio-bg rounded-xl p-5">
            <div class="grid grid-cols-2">
              <span class="text-ecio">PART</span>
              <span>BATTLE DRONE</span>
            </div>
            <div class="grid grid-cols-2">
              <span class="text-ecio">NAME</span>
              <span>{{ bodyPart["battle_drone_name"] }}</span>
            </div>
            <div class="grid grid-cols-2">
              <span class="text-ecio">RARITY</span>
              <span :class="rarities[bodyPart.battle_drone_rarity]">{{
                bodyPart["battle_drone_rarity"]
              }}</span>
            </div>
            <div class="grid grid-cols-2">
              <span class="text-ecio">CLASS</span>
              <span>{{ bodyPart["battle_drone_class"] }}</span>
            </div>
          </div>
          <div class="flex flex-col bg-ecio-bg rounded-xl p-5">
            <div class="grid grid-cols-2">
              <span class="text-ecio">PART</span>
              <span>BATTLE BOT</span>
            </div>
            <div class="grid grid-cols-2">
              <span class="text-ecio">NAME</span>
              <span>{{ bodyPart["battle_bot_name"] }}</span>
            </div>
            <div class="grid grid-cols-2">
              <span class="text-ecio">RARITY</span>
              <span :class="rarities[bodyPart.battle_bot_rarity]">{{
                bodyPart["battle_bot_rarity"]
              }}</span>
            </div>
            <div class="grid grid-cols-2">
              <span class="text-ecio">CLASS</span>
              <span>{{ bodyPart["battle_bot_class"] }}</span>
            </div>
          </div>
          <!-- <div class="flex flex-col bg-ecio-bg rounded-xl p-5">
            <div class="grid grid-cols-2">
              <h1>BATTLE POWER</h1>
              <span>500000</span>
            </div>
          </div> -->
        </div>
      </div>
    </div>
    <!-- <div class="xs:mx-6 xl:mx-12 pb-12 mt-3">
      <span class="text-3xl lg:text-left">Sale History</span>
      <div
        v-for="history in cardHistory" :key="history.id"
        class="p-3 flex bg-ecio-container rounded-xl flex flex-col gap-4"
      >
            <div class="grid grid-cols-3">
              <span>{{history.name}} #{{history.tokenId}}</span>
              <span class="text-ecio">BUYER : {{history.buyer}}</span>
              <span class="text-right">${{history.price}}</span>
              <span></span>
              <span></span>
              <span class="text-right" style="color : #3F3F3F">{{history.soldDate.getDate() +
                "/" + history.soldDate.getMonth() +
                "/" + history.soldDate.getFullYear() +
                " " +history.soldDate.getHours() +
                ":" +history.soldDate.getMinutes()}}

              </span>
            </div>
      </div>
    </div> -->
    <div>
      <modal
        height="auto"
        :scrollable="true"
        :adaptive="true"
        name="sell"
        class="backdrop"
      >
        <div v-if="card.id" class="bg-ecio-bg p-5">
          <div class="flex justify-end">
            <button @click="$modal.hide('sell')">
              <img
                src="../../assets/images/modal-close.png"
                alt="modal close"
              />
            </button>
          </div>
          <div class="flex justify-center mb-3">
            <span class="text-2xl font-weight-bold quantico text-ecio-green">
              LIST ITEM FOR SALE
            </span>
          </div>
          <div>
            <div class="input-group mb-3">
              <money
                v-model="amount"
                class="
                  form-control
                  radius-10
                  relative
                  bg-custom-amount
                  border-0
                  text-white
                "
                aria-label="Amount (to the nearest dollar)"
                placeholder="Amount"
              ></money>
              <div
                class="
                  input-group-append
                  absolute
                  right-0
                  top-0
                  bottom-0
                  items-center
                "
              >
                <span class="currecy-text-color amiko uppercase text-xs mr-3"
                  >(BUSD)</span
                >
              </div>
            </div>
          </div>
          <div>
            <span class="text-white">Fees</span>
          </div>
          <div class="grid grid-cols-2">
            <div><span class="quantico card-id">Received</span></div>
            <div class="text-right text-white card-id">
              <span class="quantico"
                >{{
                  (amount - amount * (feeRate / 100)).toLocaleString(
                    undefined,
                    {
                      minimumFractionDigits: 3,
                      maximumFractionDigits: 3,
                    }
                  )
                }}
                BUSD</span
              >
            </div>
          </div>
          <div class="grid grid-cols-2">
            <div>
              <span class="quantico card-id">Service Fee ({{ feeRate }}%)</span>
            </div>
            <div class="text-right text-white card-id">
              <span class="quantico"
                >{{
                  (amount * (feeRate / 100)).toLocaleString(undefined, {
                    minimumFractionDigits: 3,
                    maximumFractionDigits: 3,
                  })
                }}
                BUSD</span
              >
            </div>
          </div>
          <div class="mt-4 flex gap-4">
            <button v-if="onloadApprove" class="btn bg-custom-green rounded-xl">
              <span
                class="quantico uppercase text-black font-weight-bold text-xl"
              >
                <div class="lds-ring">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                processing
              </span>
            </button>

            <button
              v-else
              class="btn bg-custom-purple rounded-xl"
              @click="approveForSellHandler"
              :disabled="isApproveForSell"
            >
              <span
                class="quantico uppercase text-black font-weight-bold text-xl"
              >
                {{ isApproveForSell ? "Approved" : "Approve" }}
              </span>
            </button>

            <button v-if="onLoadConfirm" class="btn bg-custom-green rounded-xl">
              <span
                class="quantico uppercase text-black font-weight-bold text-xl"
              >
                <div class="lds-ring">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                processing
              </span>
            </button>

            <button
              v-else
              class="btn bg-custom-green rounded-xl"
              @click="createOrder"
              :disabled="!approveForSellHandler"
            >
              <span
                class="quantico uppercase text-black font-weight-bold text-xl"
              >
                confirm
              </span>
            </button>
          </div>
        </div>
      </modal>
      <modal
        height="auto"
        :scrollable="true"
        :adaptive="true"
        name="gift"
        class="backdrop"
      >
        <div v-if="card.id" class="bg-ecio-bg p-5">
          <div class="flex justify-end">
            <button @click="$modal.hide('gift')">
              <img
                src="../../assets/images/modal-close.png"
                alt="modal close"
              />
            </button>
          </div>
          <div class="flex justify-center">
            <span
              class="
                text-2xl
                font-weight-bold
                text-ecio-green
                uppercase
                quantico
              "
            >
              transfer
            </span>
          </div>
          <div class="mt-3 grid justify-center">
            <img class="max-h-72" :src="changeImageEndpoint(card.image)" />
          </div>
          <div
            class="text-center text-white mt-4 my-2 uppercase quantico text-lg"
          >
            <span>Wallet address or ENS name</span>
          </div>
          <div>
            <div class="input-group mb-3">
              <input
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
                placeholder="e.g. 0x2ef3... or deatinatiom.eth"
                v-model="addressTo"
              />
            </div>
          </div>
          <div class="text-center">
            <span class="text-white quantico"
              >“Card {{ convertTokenId }}” will be transferred to
              {{ addressTo || "..." }}</span
            >
          </div>
          <div class="mt-4">
            <button
              class="btn bg-custom-purple rounded-xl"
              @click="handleTransfer"
              :disabled="onloadApprove"
            >
              <span class="quantico uppercase font-weight-bold text-xl">
                transfer
              </span>
            </button>
          </div>
        </div>
      </modal>

      <modal
        name="balance"
        classes="dialog-class"
        transition="scale"
        style="background: rgba(0, 0, 0, 0.7)"
        :height="600"
        :width="600"
        :adaptive="true"
      >
        <div class="bg-ecio-bg p-5">
          <div class="row">
            <div class="col-12 mb-3">
              <div class="box-agree text-white">
                <h1 class="text-3xl text-center text-uppercase mb-3 mt-3">
                  To make this purchase {{card.price}} BUSD, it is required for your wallet to have
                  minimum holding of {{ requiredBusd }} BUSD
                </h1>
              </div>
            </div>
            <div class="col-12 my-3">
              <button
                class="btn btn-ecio w-100 quandro text-2xl"
                @click="$modal.hide('balance')"
              >
                Back
              </button>
            </div>
          </div>
        </div>
      </modal>
    </div>
  </div>
</template>

<script>
import { createClient } from "urql";
import axios from "axios";
import mautic from "mautic-tracking";
mautic.initialize("https://mt.ecio.space/mtc.js");
import MarketPlace from "../../contracts/MarketPlace.json";
import NFTCore from "../../contracts/NFTCore.json";
import ERC20 from "../../contracts/ERC20.json";
import Web3 from "web3";

export default {
  computed: {
    isListed() {
      return this.card.is_active_order;
    },
    isCardOwner() {
      if (
        window.ethereum == undefined ||
        window.ethereum.selectedAddress === null
      ) {
        return false;
      }

      const market_owner = Web3.utils.toChecksumAddress(this.card.market_owner);
      const wallet = Web3.utils.toChecksumAddress(
        window.ethereum.selectedAddress
      );

      return market_owner == wallet;
    },
    convertTokenId() {
      return (
        "#" +
        "0".repeat(9 - String(this.card.token_id).length) +
        this.card.token_id
      );
    },
  },
  data() {
    return {
      loading: false,
      feeRate: process.env.VUE_APP_FEE_RATE,
      card: {},
      cardHistory: [],
      cardInfo: {},
      pageTypeId: 0,
      amount: 0,
      addressTo: "",
      walletAccount: "",
      bonuses: [],
      onloadApprove: false,
      isApprove: false,
      isApproveForSell: false,
      onLoadConfirm: false,
      marketPlaceContract: undefined,
      nftCoreContract: undefined,
      ecioContract: undefined,
      abilityLogo: false,
      skill: "",
      bodyPart: undefined,
      processingBuy: false,
      onloadCancel: false,
      requiredBusd: 0,
      rarities: {
        LEGENDARY: "text-ecio-pink",
        LIMITED: "text-ecio",
        EPIC: "text-ecio-purple",
        RARE: "text-ecio-blue",
        COMMON: "text-ecio-grey",
      },
      stats: {
        HP: { image: "icon-hp.png", value: "" },
        DEF: { image: "icon-def.png", value: "" },
        ATK: { image: "icon-atk.png", value: "" },
        ASPD: { image: "icon-aspd.png", value: "" },
        RANGE: { image: "icon-range.png", value: "" },
        CRITICAL: { image: "icon-critical.png", value: "" },
        DODGE: { image: "icon-dodge.png", value: "" },
        "LIFE STEAL": { image: "icon-lifesteal.png", value: "" },
      },
    };
  },
  mounted() {
    var that = this;
    if (window.ethereum != undefined) {
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
      if (window.ethereum.selectedAddress != null) {
        that.connectWallet();
        that.loadAccountBalance();
      }
    }

    this.checkQueryParams();
  },
  methods: {
    async loadContract() {
      window.web3 = new Web3(window.ethereum);
      if (typeof window.ethereum == "undefined") {
        window.web3.setProvider(
          new Web3.providers.HttpProvider(process.env.VUE_APP_RPC_URL)
        );
      }

      this.busdContract = await new window.web3.eth.Contract(
        ERC20.abi,
        process.env.VUE_APP_BUSD_TOKEN_CONTRACT_ADDRESS
      );
    },
    async loadAccountBalance() {
      this.loadContract().then(() => {
        this.busdContract.methods
          .balanceOf(window.ethereum.selectedAddress)
          .call()
          .then((results) => {
            this.busdBalance = Number(Web3.utils.fromWei(results, "ether"));
          });
      });
    },
    changeImageEndpoint(imageURL) {
      if (typeof imageURL != "undefined") {
        var pathName = new URL(imageURL).pathname;
        imageURL = process.env.VUE_APP_NFT_METADATA_ENDPOINT + pathName;
      }

      // if (process.env.ENV == "mainnet") {
      //   return imageURL.replace(
      //     "metadata.ecio.space",
      //     "metadata-v2.ecio.space"
      //   );
      // }
      return imageURL;
    },
    numberWithCommas(x) {
      if (x == undefined) {
        return "0";
      }

      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    async connectWallet() {
      if (this.validated()) {
        this.switchNetwork();

        await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        this.walletAccount = window.ethereum.selectedAddress;

        mautic.pageView({
          walletaddress: window.ethereum.selectedAddress,
          firstname: window.ethereum.selectedAddress,
        });
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
    async checkQueryParams() {
      this.loading = true;
      const tokenId = this.$route.params.tokenId;
      this.card = await this.getCard(tokenId);
      this.cardHistory = await this.getHistory(tokenId);
      this.cardInfo = await this.getCardInfo(tokenId);
      this.cardInfo.attributes.filter((attribute) => {
        if (this.stats[attribute.display_type]) {
          this.stats[attribute.display_type].value = attribute.value;
        }
        if (attribute.trait_type === "skill") {
          this.skill = attribute.value;
        }
        if (attribute.trait_type.includes("bonus")) {
          this.bonuses.push(attribute);
        }
        if (
          attribute.trait_type.includes("_name") ||
          attribute.trait_type.includes("_rarity") ||
          attribute.trait_type.includes("_class")
        ) {
          this.bodyPart = {
            ...this.bodyPart,
            [`${attribute.trait_type}`]:
              attribute.value === "" || attribute.value === "NONE"
                ? "-"
                : attribute.value,
          };
        }
      });
      this.loadConnect();
      this.loading = false;
    },

    async loadConnect() {
      if (window.ethereum != undefined) {
        window.web3 = new Web3(window.ethereum);
        this.marketPlaceContract = await new window.web3.eth.Contract(
          MarketPlace.abi,
          process.env.VUE_APP_MARKET_CONTRACT_ADDRESS
        );
        console.log(
          "this.card.contract_address",
          this.card.contract_address,
          this.card.token_id
        );
        this.nftCoreContract = await new window.web3.eth.Contract(
          NFTCore.abi,
          this.card.contract_address
        );

        if (this.card.is_active_order) {
          this.ecioContract = await new window.web3.eth.Contract(
            ERC20.abi,
            this.card.buyWith
          );

          this.ecioContract.methods
            .allowance(
              window.ethereum.selectedAddress,
              process.env.VUE_APP_MARKET_CONTRACT_ADDRESS
            )
            .call()
            .then((amountWei) => {
              const etherValue = Web3.utils.fromWei(amountWei, "ether");
              const order = this.card.orders[this.card.orders.length - 1];
              this.isApprove =
                parseFloat(etherValue) >= parseFloat(order.price);
              console.log(order);
              console.log("order.token_id", order.token_id);
              console.log("allowEther", etherValue);
              console.log("order.price", order.price);
            });
        } else {
          this.nftCoreContract = await new window.web3.eth.Contract(
            NFTCore.abi,
            this.card.contract_address
          );
          this.nftCoreContract.methods
            .isApprovedForAll(
              window.ethereum.selectedAddress,
              process.env.VUE_APP_MARKET_CONTRACT_ADDRESS
            )
            .call()
            .then((isApprove) => {
              this.isApproveForSell = isApprove;
            });
        }
      }
    },
    async handleTransfer() {
      this.loadConnect().then(() => {
        var vm = this;
        this.nftCoreContract.methods
          .safeTransferFrom(vm.walletAccount, vm.addressTo, vm.card.tokenId)
          .send({ from: vm.walletAccount })
          .on("sent", () => {
            vm.setOnloadApprove(true);
          })
          .on("transactionHash", () => {})
          .on("receipt", () => {})
          .on("confirmation", () => {
            vm.setOnloadApprove(false);
            vm.$modal.hide("gift");
            vm.emitTransferred();
          })
          .on("error", () => {});
      });
    },
    async createOrder() {
      this.loadConnect().then(() => {
        var vm = this;
        var value = Web3.utils.toWei(
          Web3.utils.toBN(vm.amount).toString(),
          "ether"
        );
        this.marketPlaceContract.methods
          .createOrder(
            vm.card.token_id < 4000
              ? process.env.VUE_APP_CONTRACT_NFTCORE
              : process.env.VUE_APP_CONTRACT_NFTCORE_V2,
            vm.card.token_id,
            value,
            process.env.VUE_APP_BUSD_TOKEN_CONTRACT_ADDRESS
          )
          .send({ from: vm.walletAccount })
          .on("sent", () => {
            vm.setOnloadConfirm(true);
          })
          .on("transactionHash", () => {})
          .on("receipt", () => {})
          .on("confirmation", () => {
            vm.setOnloadConfirm(false);
            vm.$modal.hide("sell_complete");
            vm.emitTransferred();
          })
          .on("error", (err) => {
            vm.setOnloadConfirm(false);
            console.log("error", err);
          });
      });
    },
    async buyHandler() {
      this.loadConnect().then(() => {
        var vm = this;
        this.marketPlaceContract.methods
          .createSale(vm.card.orderId)
          .send({ from: window.ethereum.selectedAddress })
          .on("receipt", function () {
            // vm.$emit("transferred", vm.card);
          })
          .on("sent", function () {})
          .on("transactionHash", function () {})
          .on("confirmation", function () {})
          .on("error", function () {});
      });
    },
    async cancelOrder() {
      this.loadConnect().then(() => {
        var vm = this;
        this.marketPlaceContract.methods
          .cancelOrder(vm.card.orderId)
          .send({ from: window.ethereum.selectedAddress })
          .on("transactionHash", () => {
            vm.onloadCancel = true;
          })
          .on("receipt", () => {})
          .on("confirmation", () => {
            vm.card.isSelling = false;
            vm.onloadCancel = false;
          })
          .on("error", () => {});
      });
    },
    async approveForSellHandler() {
      this.loadConnect().then(() => {
        // var vm = this;
        this.nftCoreContract.methods
          .setApprovalForAll(process.env.VUE_APP_MARKET_CONTRACT_ADDRESS, true)
          .send({ from: window.ethereum.selectedAddress })
          .on("receipt", function () {})
          .on("sent", function () {
            // vm.setOnloadApprove(true);
          })
          .on("transactionHash", function () {})
          .on("confirmation", function () {
            //  vm.isApproveForSell = true;
          })
          .on("error", function () {});
      });
    },
    async approveHandler() {
      this.loadConnect().then(() => {
        var vm = this;
        var value = Web3.utils.toWei(
          Web3.utils.toBN(vm.card.price * 10).toString(),
          "ether"
        );
        this.ecioContract.methods
          .approve(process.env.VUE_APP_MARKET_CONTRACT_ADDRESS, value)
          .send({ from: window.ethereum.selectedAddress })
          .on("receipt", function () {})
          .on("sent", function () {
            vm.setOnloadApprove(true);
          })
          .on("transactionHash", function () {
            // vm.setIsApprove(true);
            // vm.setOnloadApprove(false);
          })
          .on("confirmation", function () {
            vm.setIsApprove(true);
            vm.setOnloadApprove(false);
            // vm.setOnloadApprove(false);
          })
          .on("error", function () {
            vm.setIsApprove(false);
            vm.setOnloadApprove(false);
          });
      });
    },
    setOnloadConfirm(condition) {
      this.onLoadConfirm = condition;
    },
    setOnloadApprove(condition) {
      this.onloadApprove = condition;
    },
    setIsApprove(condition) {
      this.isApprove = condition;
    },

    async createSale() {
      this.loadConnect().then(() => {
        var vm = this;
        let busdRequire = vm.card.price + vm.card.price * (this.feeRate / 100);
        console.log("Required > " + busdRequire);
        console.log("Balanced > " + this.busdBalance);
        if (busdRequire > this.busdBalance) {
          this.requiredBusd = Math.ceil(busdRequire);
          this.$modal.show("balance");
        } else {
          let order = vm.card.orders[vm.card.orders.length - 1];
          console.log(vm.card.orders);
          this.marketPlaceContract.methods
            .createSale(order.order_id)
            .send({ from: window.ethereum.selectedAddress })
            .on("receipt", function () {
              vm.setProcessing(true);
            })
            .on("sent", function () {
              vm.setProcessing(true);
            })
            .on("transactionHash", function () {})
            .on("confirmation", function () {
              vm.setProcessing(false);
              window.location.href = "/my-collection";
            })
            .on("error", function () {
              vm.setProcessing(false);
            });
        }
      });
    },
    setProcessing(condition) {
      this.processingBuy = condition;
    },

    emitTransferred() {
      window.location.href = "/my-collection";
    },
    weiCurrency(price) {
      var value = Web3.utils.fromWei(
        Web3.utils.toBN(price).toString(),
        "ether"
      );
      return value.toLocaleString("us-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      });
    },
    usdCurrency(price) {
      let usd = +price || 0;
      return usd.toLocaleString("us-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      });
    },
    async getCardInfo(tokenId) {
      const { data } = await axios.get(
        `${process.env.VUE_APP_NFT_METADATA_ENDPOINT}/items/${tokenId}`
      );
      return data;
    },
    async getCard(tokenId) {
      const APIURL = process.env.VUE_APP_THE_GRAPH;
      const tokensQuery = `{
        nfts(where:{token_id:{_eq:${tokenId}}}) {
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
          is_active_order
          code_weapon
          contract_address
          orders(order_by: {order_id: asc}) {
            id
            order_id
            price
            status
            buy_with_erc20_address
            buyer
            updated_at
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

      var nft;
      if (data.nfts.length == 1) {
        nft = data.nfts[0];
        nft.orders.filter((order) => {
          if (order.status === "OPEN") {
            nft.isSelling = true;
            nft.orderId = order.order_id;
            nft.price = order.price;
            nft.buyWith = order.buy_with_erc20_address;
          }
          if (order.status === "SOLD") {
            var soldTrans = {};
            soldTrans.orderId = order.order_id;
            soldTrans.price = order.price;
            soldTrans.buyWith = order.buy_with_erc20_address;
            soldTrans.owner = order.owner;
            soldTrans.buyer = order.buyer;
            soldTrans.soldTimestamp = order.updated_at;
          }
        });
      }
      return nft;
    },

    async getHistory(tokenId) {
      const APIURL = process.env.VUE_APP_THE_GRAPH;
      const tokensQuery = `{
        nfts(where:{token_id:{_eq:${tokenId}}}) {
          name
          image
          token_id
          orders {
            id
            order_id
            price
            status
            buy_with_erc20_address
            buyer
            updated_at
            token_id
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

      var nft;
      var transHistory = [];
      if (data.nfts.length == 1) {
        nft = data.nfts[0];
        nft.orders.filter((order) => {
          if (order.status === "SOLD") {
            var soldTrans = {};
            soldTrans.name = nft.name;
            soldTrans.orderId = order.order_id;
            soldTrans.price = order.price;
            soldTrans.buyWith = order.buy_with_erc20_address;
            soldTrans.owner = order.owner;
            soldTrans.buyer = order.buyer;
            soldTrans.soldTimestamp = order.updated_at;
            soldTrans.tokenId = order.token_id;
            soldTrans.soldDate = new Date(order.updated_at);
            // console.log(soldTrans.soldDate.getDate());
            transHistory.push(soldTrans);
          }
        });
        console.log(transHistory);
      }
      return transHistory;
    },
  },
};
</script>

<style>
.market.dropdown-nft-content {
  top: 100%;
  border-radius: 20px;
}
</style>
