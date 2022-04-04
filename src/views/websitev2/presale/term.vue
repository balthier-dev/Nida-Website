<template>
  <div class="">
    <div class="main-container">
      <section
        class="cover cover-features  imagebg   text-center  "
        data-overlay="4"
      >
        <div class="background-image-holder background-top ">
          <img alt="background" src="../../../assets/images/bg-whitelist.jpg" />
        </div>

        <div class="container mt-20">
          <div class="row justify-content-center">
            <img
              src="../../../assets/images/progress1.png"
              style="max-width: 600px; width: 100%;padding: 20px;"
            />
            <div class="col-md-10 col-lg-8">
              <h1 class="title-whitelist mt-10">Term and Conditions</h1>
              <p class="lead"></p>
            </div>
          </div>

          <div class="justify-start text-left container-max">
            <p>
              Please read this instruction carefully before process
            </p>

            <ul class=" ">
              <li>1. Token name : ECIO</li>
              <li>2. Maximum Supply : 10 Billion Tokens</li>
              <li>
                3. TOKENOMIC DISTRIBUTION AND CIRCULATION >>
                <a
                  href="https://ecio-space.gitbook.io/ecio-white-paper/tokenomic"
                >
                  READ
                </a>
              </li>
              <li>4. IDO SUPPLY : 925 MILLION TOKENs</li>
              <li>5. IDO PRICE : 0.006 BUSD PER TOKENS</li>
              <li>6. Presale Supply : 75 Million TOKENs</li>
              <li>7. PRESALE PRICE : 0.004 BUSD per TOKENs</li>
              <li>
                8. PRESALE MINIMUM PURCHASE : 250 ECIO TOKENs = 1 BUSD
              </li>
              <li>
                9. PRESALE Maximum purchase : 50,000 ECIO TOKENs = 200 BUSD
              </li>
              <li>
                10. Presale eligibility = Whitelist qualified users
              </li>
              <li>
                11. Presale qualification check: Click here >>
                <a
                  href="https://medium.com/@EcioOfficial/pre-sale-community-round-whitelist-winners-announcement-f7fc924c1957"
                >
                  here
                </a>
              </li>
              <li>
                12. Purchase date
                <span> LOT 1 (First 500) and Lot 2 (Top 500) </span>= 2 OCT 2021
                | 14.00-22.00 UTC
              </li>
              <li>
                13. Purchase date
                <span> LOT 3 ( FCFS 1,000 Lucky draw) </span> = 3 OCT 2021 |
                14.00-20.00 UTC
              </li>
              <li>14. CLAIMING CONDITIONs : VESTed</li>
              <li>
                15. Buying 50,000 ECIO TOKENS get free 1 Common box (Trade after
                event)
              </li>
            </ul>
          </div>

          <div class="row mt-5 content-condition">
            <div class="col-md-12">
              <h1 class="title-whitelist mb-10">Presale UNLOCK CONDITION</h1>
            </div>
            <div class="col-md-3">
              <div class="feature feature-1 boxed boxed--border">
                <div class="feature__body condition">
                  <h1>4 DEC 2021</h1>
                  <span>25%</span>
                </div>
              </div>
              <!--end feature-->
            </div>
            <div class="col-md-3">
              <div class="feature feature-1 boxed boxed--border">
                <div class="feature__body condition">
                  <h1>1 JAN 2022</h1>
                  <span>25%</span>
                </div>
              </div>
              <!--end feature-->
            </div>
            <div class="col-md-3">
              <div class="feature feature-1 boxed boxed--border">
                <div class="feature__body condition ">
                  <h1>5 FEB 2022</h1>
                  <span>25%</span>
                </div>
              </div>
            </div>

            <div class="col-md-3">
              <div class="feature feature-1 boxed boxed--border">
                <div class="feature__body condition ">
                  <h1>5 MAR 2022</h1>
                  <span>25%</span>
                </div>
              </div>
            </div>
          </div>

          <div class="row mt-4">
            <div class="col-md-12">
              <div class="d-flex m-auto justify-center">
                <div class="input-checkbox">
                  <input
                    v-model="accept"
                    type="checkbox"
                    id="input-assigned-0"
                  /><label for="input-assigned-0"></label>
                </div>
                <span class="text-white break-space">
                  i have read and agreed with the terms and conditions.
                </span>
              </div>
              <p v-if="errMsg" class="err-msg">
                *Please indicate that you have read and agree to the Terms and
                conditions
              </p>

              <div class="mt-3">
                <button
                  class="btn btn-ecio d-flex flex-row m-auto"
                  @click="next"
                >
                  <!-- <div class="lds-ring ml-2 mt-0">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div> -->
                  <div class=" m-auto" style="margin: auto">CONTINUE</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      accept: false,
      errMsg: false
    };
  },
  components: {},

  methods: {
    next() {
      if (!this.accept) {
        console.log("xxxx");
        this.errMsg = true;
        return;
      }
      this.errMsg = false;
      window.location = "/pre-sale";
    }
  }
};
</script>

<style>
.container-max {
  max-width: 650px;
  margin: auto;
  text-transform: uppercase;
}
.container-max p {
  font-weight: bold;
  font-size: 1.2rem !important;
}
.feature__body.condition h1 {
  font-size: 1.3rem;
  color: #e0fb16;
}
.feature__body.condition span {
  font-size: 2rem;
}
.input-checkbox + span {
  bottom: 10px;
  margin-left: 10px;
  font-size: 1.3rem;
}

.err-msg {
  font-size: 0.875rem !important;
  padding: 0 0 10px 0;
  color: #e91e63 !important;
}
.break-space {
  white-space: break-spaces !important;
}
li span {
  color: #e0fb16 !important;
}
</style>
