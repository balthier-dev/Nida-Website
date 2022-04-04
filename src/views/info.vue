<template>
  <div>
    <div class="main-container">
      <section
        class="cover cover-features imagebg text-center backgound-color-info"
        style="min-height:100vh"
        data-overlay="0"
      >
        <div class="nav-bar   ">
          <div class="container flex p-3">
            <a href="/marketplace" class="nav-menu active flex-initial mr-5">
              MY COLLECTIONS
            </a>
            <!-- <a href="/redeem" class="nav-menu flex-initial">REDEEM</a> -->
          </div>
        </div>

        <div
          class="container container-m mt-5"
          v-if="item.image && attributes.nftStory"
        >
          <div class="row  ">
            <a href="/marketplace"> <div class="btn-back ml-5">BACK</div></a>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div class="col-span-1 md:col-span-1 gap-5 px-5 pb-5">
                <div class="nft-id">{{ attributes.cardId }}</div>
                <img :src="item.image" />
              </div>
              <!-- ... -->
              <div class="col-span-1 md:col-span-2 p-3">
                <div class="section-info">
                  <h1>Information</h1>
                  <div class="section-detail">
                    {{ attributes.nftStory }}
                  </div>
                </div>

                <div class="section-info">
                  <h1 v-if="attributes.nftType === 'SW'">Weapon Ability</h1>
                  <h1 v-else>Ability</h1>
                  <div class="flex gap-5">
                    <!-- <div class="" v-if="attributes.nftType === 'SW'">
                      <img src="../assets/images/skill-demo.png" width="100" />
                    </div> -->
                    <div class="section-detail">
                      {{ attributes.nftSkill }}
                    </div>
                  </div>
                </div>

                <div class="section-info" v-if="attributes.nftType === 'SW'">
                  <h1>Stats</h1>
                  <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div class="flex ">
                      <div class="flex-grow state">
                        <img src="../assets/images/skill/hp.png" width="40" />
                      </div>
                      <div class="flex-grow">
                        <div>HP</div>
                        <div style="color:#D666B9">{{ attributes.hp }}</div>
                      </div>
                    </div>
                    <div class="flex">
                      <div class="flex-grow state">
                        <img src="../assets/images/skill/def.png" width="40" />
                      </div>
                      <div class="flex-grow">
                        <div>DEF</div>
                        <div>{{ attributes.def }}</div>
                      </div>
                    </div>
                    <div class="flex">
                      <div class="flex-grow state">
                        <img src="../assets/images/skill/atk.png" width="40" />
                      </div>
                      <div class="flex-grow">
                        <div>ATK</div>
                        <div style="color:#96EC6E">{{ attributes.atk }}</div>
                      </div>
                    </div>
                    <div class="flex">
                      <div class="flex-grow state">
                        <img src="../assets/images/skill/aspd.png" width="40" />
                      </div>
                      <div class="flex-grow">
                        <div title="Attack Cooldown">ACD</div>
                        <div style="color:#84DAFF">{{ attributes.aspd }}</div>
                      </div>
                    </div>

                    <div class="flex">
                      <div class="flex-grow state">
                        <img
                          src="../assets/images/skill/range.png"
                          width="40"
                        />
                      </div>
                      <div class="flex-grow">
                        <div>RANGE</div>
                        <div style="color:#84DAFF">{{ attributes.range }}</div>
                      </div>
                    </div>

                    <div class="flex">
                      <div class="flex-grow state">
                        <img
                          src="../assets/images/skill/critical.png"
                          width="40"
                        />
                      </div>
                      <div class="flex-grow">
                        <div>CRITICAL</div>
                        <div style="color:#84DAFF">
                          {{ attributes.critical }}%
                        </div>
                      </div>
                    </div>

                    <div class="flex">
                      <div class="flex-grow state">
                        <img
                          src="../assets/images/skill/dodge.png"
                          width="40"
                        />
                      </div>
                      <div class="flex-grow">
                        <div>DODGE</div>
                        <div style="color:#BF9EFF">{{ attributes.dodge }}%</div>
                      </div>
                    </div>

                    <div class="flex">
                      <div class="flex-grow state">
                        <img src="../assets/images/skill/life.png" width="40" />
                      </div>
                      <div class="flex-grow">
                        <div>LIFE STEAL</div>
                        <div style="color:#FF5B5B">
                          {{ attributes.lift_steal }}%
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { getCardRedeem } from "../api/nft";
export default {
  data() {
    return {
      item: {},
      attributes: {},
    };
  },
  async created() {
    const result = await getCardRedeem(this.$route.query.id);

    const nftType = result.data.attributes.find((res) => {
      return res.trait_type === "nft_type";
    });
    const nftStory = result.data.attributes.find((res) => {
      return res.trait_type === "story";
    });

    const nftSkill = result.data.attributes.find((res) => {
      return res.trait_type === "skill";
    });

    result.data.attributes.filter((res) => {
      if (res.trait_type === "hp") {
        this.attributes.hp = Number(res.value).toFixed(0);
      }
      if (res.trait_type === "def") {
        this.attributes.def = Number(res.value).toFixed(0);
      }
      if (res.trait_type === "atk") {
        this.attributes.atk = Number(res.value).toFixed(2);
      }
      if (res.trait_type === "aspd") {
        this.attributes.aspd = Number(res.value).toFixed(2);
      }
      if (res.trait_type === "range") {
        this.attributes.range = Number(res.value).toFixed(0);
      }
      if (res.trait_type === "critical") {
        this.attributes.critical = Number(res.value).toFixed(0);
      }
      if (res.trait_type === "dodge") {
        this.attributes.dodge = Number(res.value).toFixed(0);
      }
      if (res.trait_type === "lift_steal") {
        this.attributes.lift_steal = Number(res.value).toFixed(0);
      }
      if (res.trait_type === "skill") {
        this.attributes.skill = res.value;
      }
    });

    this.attributes.nftType = nftType.value;
    this.attributes.cardId = result.data.nft_id_str.toString();
    this.attributes.nftSkill = nftSkill.value;
    this.attributes.nftStory = nftStory.value;

    this.item = result.data;
  },
  mounted() {},
  methods: {
    replaceName(name) {
      if (name) {
        const result = name.replace("ECIO NFT ", "");
        return result;
      }
    },
  },

  components: {},
};
</script>

<style>
.section-info {
  font-family: "Quantico";
  background: rgb(0 0 0 / 30%);
  color: #fff;
  padding: 30px;
  font-size: 1.2rem;
  text-align: left;
  border-radius: 10px;
}
.section-info:not(:first-child) {
  margin-top: 20px;
}
.section-info h1 {
  color: #e0fb16;
  font-size: 2rem;
  font-weight: bold;
}
.backgound-color-info {
  background-color: #330a75;
}
.nft-id {
  padding: 15px;
  background: rgb(0 0 0 / 30%);
  border-radius: 10px;
}
.flex-grow.state {
  max-width: 50px;
  margin: auto;
}
.section-detail {
  font-family: "Amiko";
}
.btn-back {
  padding: 10px 40px;
  background: #000;
  font-size: 1.1rem;
  color: #fff;
  border-radius: 10px;
  margin-bottom: 30px;
  cursor: pointer;
}
</style>
