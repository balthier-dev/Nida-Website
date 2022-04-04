<template>
  <div class="">
    <div class="main-container">
      <section
        class="cover cover-features  imagebg   text-center "
        style="height: 100vh"
        data-overlay="4"
      >
        <div class="background-image-holder background-top ">
          <img alt="background" src="../../../assets/images/bg-whitelist.jpg" />
        </div>

        <div class="container mt-20">
          <div class="row justify-content-center">
            <div class="col-md-10 col-lg-8">
              <h1 class="title-whitelist mt-10">Access Denied</h1>
              <p class="lead"></p>
            </div>
          </div>

          <div class="justify-start text-left container-max">
            <ul class=" ">
              <li>PResale eligibility = Whitelist qualified users</li>
              <li>
                Presale qualification check: Click
                <a
                  href="https://medium.com/@EcioOfficial/pre-sale-community-round-whitelist-winners-announcement-f7fc924c1957"
                >
                  here
                </a>
              </li>
              <li>
                1. Purchase date
                <span> LOT 1 (First 500) and Lot 2 (Top 500)</span> = 2 OCT 2021
                | 14.00-22.00 UTC
              </li>
              <li>
                2. Purchase date <span> LOT 3 ( FCFS 1,000 Lucky draw)</span> =
                3 OCT 2021 | 14.00-20.00 UTC
              </li>
            </ul>

            <div class="text-center">
              <a href="/" class="text-dark">
                <button class="btn btn-ecio mt-4">HOME</button></a
              >
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
    return {};
  },
  components: {},

  methods: {}
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
