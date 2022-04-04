<template>
  <div>
    <div class="main-container">
      <section
        class="cover cover-features  imagebg  videobg   height-100 text-center  "
        data-overlay="6"
      >
        <video autoplay loop muted>
          <source
            src="https://ecio.sgp1.digitaloceanspaces.com/Ecio_Cover_MP4.mp4"
            type="video/mp4"
          />
          <source
            src="https://ecio.sgp1.digitaloceanspaces.com/Ecio_Cover_MP4.mp4"
            type="video/webm"
          />
        </video>

        <!-- If you want to add content here, a slot is waiting! -->

        <!-- <div class="background-image-holder">
          <img alt="background" src="../../assets/images/bg.jpg" />
        </div>
        <div class="background-image-holder">
          <img alt="background" src="../../assets/images/bg-video.png" />
        </div> -->
        <div class="container">
          <div class="row">
            <div class="col-md-9 col-lg-7" style="margin-top:50px">
              <img
                src="../../assets/images/logo-ecio.png"
                width="300"
                class="m-auto mobile-logo mb-10 m-logo"
              />

              <!-- <a href="/presale-terms">
                <img
                  class="m-auto mt-5 pt-5"
                  src="../../assets/images/presale-button.png"
                  width="250"
                />
              </a>     -->

              <a href="http://ecio.azurewebsites.net/" target="_blank">
                <img
                  class="m-auto pt-5 mt-5"
                  src="../../assets/images/play-demo-button.png"
                  width="250"
                />
              </a>
              <img
                src="../../assets/webv3/banner/certik.png"
                class="m-auto mobile-logo mb-10 m-logo"
                style=""
              />
              <img
                v-clipboard:copy="address"
                src="../../assets/webv3/banner/ecioaddress.png"
                class="m-auto mobile-logo mb-10 m-logo"
              />
              <img
                class="textcenter"
                v-clipboard:copy="address"
                content="Copied!"
                v-tippy="{
                  trigger: 'click',
                  placement: 'right',
                  delay: [0, 500],
                }"
                src="../../assets/webv3/banner/copybutton.png"
                style="cursor : pointer; padding-top : 10px;"
              />
              <!-- <a
                style="color: black; width : 200px; margin: -8px 0px 20px 10px;"
                class="btn btn-ecio-partner"
                v-clipboard:copy="address"
              >
                COPY ADDRESS
              </a> -->

              <!-- <a class="btn btn--primary type--uppercase" href="#">
                <span class="btn__text">
                  View The Demos
                </span>
              </a> -->
            </div>
          </div>
        </div>
      </section>
      <section class="text-center imagebg ">
        <div class="background-image-holder">
          <img alt="background" src="../../assets/images/bg-game-trailer.jpg" />
        </div>

        <div class="background-image-holder" style="opacity: 0.5">
          <img
            alt="background"
            src="../../assets/images/bg-game-trailer-2.png"
          />
        </div>

        <div style="top:-20px">
          <img
            class="imgbox"
            src="../../assets/images/box-market-1.png"
            style="position: absolute;z-index:200"
          />

          <img
            class="imgbox"
            src="../../assets/images/box-market-2.png"
            style="position: absolute;right:0;z-index:200"
          />

          <a href="/marketplace">
            <h1 class="title-market-now">
              <div class="max-marketplace-text">MARKETPLACE NOW LIVE!!</div>
            </h1>
          </a>
        </div>

        <img
          alt="background"
          src="../../assets/images/avatar-space.png"
          class="avatar-space "
        />

        <img
          alt="background"
          src="../../assets/images/rock-space.png"
          style="position: absolute;
          top: 20%;
          left: 5%;"
          width="200"
        />

        <div class="container">
          <!-- <div class="row " style="margin-top:0px;z-index: 200;">
            <div class="col-md-12">
             
            </div>
          </div> -->

          <div class="row" style="margin-top:100px">
            <div class="col-md-12">
              <h1 class="title-ecio">“Create, Conquer and Earn”</h1>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12 col-lg-12 my-5">
              <h1 class="title-h1 mb-0">Game Trailer</h1>
              <p class="mb-10">
                The First NFT Space Adventure-Fighting Game
              </p>
            </div>
            <div class="col-md-8 col-lg-7 m-auto">
              <div class="   modal-instance">
                <a class="   modal-trigger " href="#">
                  <img
                    alt="image"
                    src="../../assets/images/game-trailer-video.png"
                  />
                </a>

                <!-- <div class="video-play-icon"></div> -->
                <!-- <a class="video-play-icon   modal-trigger " href="#">
                  <img
                    src="../../assets/images/play-button.png"
                    width="150px"
                  />
                </a> -->

                <div class="modal-container">
                  <div
                    class="modal-content bg-dark"
                    data-width="60%"
                    data-height="60%"
                  >
                    <iframe
                      data-src="https://www.youtube.com/embed/0shA0Ece9zE?autoplay=1"
                      allowfullscreen="allowfullscreen"
                      style="padding: 0px"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="imagebg game-feature bg--dark">
        <div class="background-image-holder">
          <img alt="background" src="../../assets/images/bg-game-feature.jpg" />
        </div>

        <img
          alt="background"
          src="../../assets/images/bg-line.png"
          style="opacity: 0.4;
          position: absolute;
          z-index: 1;
          width: 100%;"
        />

        <img
          alt="background"
          src="../../assets/images/rock-space2.png"
          style=" right:0;opacity: 0.8;
          position: absolute;
          z-index: 1;
          width: 100;"
        />

        <div class="container">
          <div class="row">
            <div class="col">
              <div class="slider" data-paging="true" data-timing="6000">
                <ul class="slides">
                  <li class="col-md-12 col-12">
                    <div class="project-thumb border--round hover--active">
                      <a href="#">
                        <div class="__initial">
                          <div class="row">
                            <div class="col-md-6">
                              <img
                                alt="background"
                                src="../../assets/images/game-feature-1.jpg"
                              />
                            </div>
                            <div class="col-md-6">
                              <h1 class="title-h1">Truely Multiplayer</h1>
                              <p class="justify">
                                Ecio.space is not just a single-player game with
                                PVP. We also prepare the most addiction
                                multiplayer mode to play with your friends, you
                                can survive a hundred alien wave invasions
                                together, co-operation plays to defeat the
                                strongest enemy, or even compete with another
                                guild.
                              </p>
                            </div>
                          </div>
                        </div>
                      </a>
                    </div>
                  </li>
                  <li class="col-md-12 col-12">
                    <div class="project-thumb border--round hover--active">
                      <a href="#">
                        <div class="__initial">
                          <div class="row">
                            <div class="col-md-6">
                              <img
                                alt="background"
                                src="../../assets/images/game-feature-2.jpg"
                              />
                            </div>
                            <div class="col-md-6">
                              <h1 class="title-h1">Million Unique Warrior</h1>
                              <p class="justify">
                                In Ecio you can create over 41 million unique
                                space warriors in single Kingdom. The difference
                                in 7 parts of equipment will generate a lot of
                                possibilities of warrior fighting styles and
                                team battle strategies. This unique feature will
                                help players adding more value to their NFT
                                assets even it is not a rare type of character.
                              </p>
                            </div>
                          </div>
                        </div>
                      </a>
                    </div>
                  </li>

                  <li class="col-md-12 col-12">
                    <div class="project-thumb border--round hover--active">
                      <a href="#">
                        <div class="__initial">
                          <div class="row">
                            <div class="col-md-6">
                              <img
                                alt="background"
                                src="../../assets/images/game-feature-3.jpg"
                              />
                            </div>
                            <div class="col-md-6">
                              <h1 class="title-h1">Set Your Skill</h1>
                              <p>
                                Change your strategy in each fight with a lot of
                                battle skills, before the fight you can choose
                                and arrange your battle skills base on the types
                                of equipment you have. The most powerful skill
                                often comes from your weapon parts.
                              </p>
                            </div>
                          </div>
                        </div>
                      </a>
                    </div>
                  </li>

                  <li class="col-md-12 col-12">
                    <div class="project-thumb border--round hover--active">
                      <a href="#">
                        <div class="__initial">
                          <div class="row">
                            <div class="col-md-6">
                              <img
                                alt="background"
                                src="../../assets/images/marketplace.jpg"
                              />
                            </div>
                            <div class="col-md-6">
                              <h1 class="title-h1">Marketplace</h1>
                              <p>
                                Every NFT asset you get from the game can trade
                                in our marketplace. Here you can sell everything
                                or find the space warriors that fit your
                                strategy and even the pieces of equipment you
                                need to upgrade to your warrior.
                              </p>
                            </div>
                          </div>
                        </div>
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="switchable imagebg switchable--switch ">
        <div class="background-image-holder">
          <img alt="background" src="../../assets/images/bg-charactor.jpg" />
        </div>
        <img
          alt="background"
          src="../../assets/images/star-space.png"
          style="  opacity: 0.6; position: absolute;width: 100%;top: 30% "
        />

        <div class="container">
          <div class="row">
            <div class="col">
              <div class="slider" data-paging="true" data-timing="8000">
                <ul class="slides">
                  <li class="col-md-12 col-12">
                    <div class="project-thumb border--round hover--active">
                      <div class="__initial">
                        <div class="row">
                          <div class="col-md-6 col-lg-5 p-10">
                            <div class="switchable__text">
                              <h1 class="title-h1 mb-0">Team Solarian</h1>
                              <h3 class="sub-title">Specification</h3>
                              <p class="justify">
                                Human species from the Solar system. The
                                Solarian is the strongest race in “Milky Way
                                Galaxy” they have a powerful weapon and battle
                                equipment but the weakness of Solarian is they
                                are so slow and lack defensive ability.
                              </p>
                              <div class="d-flex flex-row mt-5">
                                <div class="p-2">
                                  <a
                                    class="type--uppercase"
                                    href="javascript:void(0)"
                                  >
                                    <img
                                      src="../../assets/images/skill1-active.png"
                                      width="80px"
                                    />
                                  </a>
                                </div>
                                <div class="p-2">
                                  <a
                                    class="type--uppercase"
                                    href="javascript:void(0)"
                                  >
                                    <img
                                      src="../../assets/images/skill2.png"
                                      width="80px"
                                    />
                                  </a>
                                </div>

                                <div class="p-2">
                                  <a
                                    class="type--uppercase"
                                    href="javascript:void(0)"
                                  >
                                    <img
                                      src="../../assets/images/skill3.png"
                                      width="80px"
                                    />
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div class="col-md-6">
                            <div class="d-flex flex-row">
                              <div class="p-3">
                                <img src="../../assets/images/character1.png" />
                              </div>
                              <div class="p-3">
                                <img src="../../assets/images/character2.png" />
                              </div>
                              <div class="p-3">
                                <img src="../../assets/images/character3.png" />
                              </div>
                            </div>

                            <div class="d-flex flex-row">
                              <div class="p-3">
                                <img src="../../assets/images/character4.png" />
                              </div>
                              <div class="p-3">
                                <img src="../../assets/images/character5.png" />
                              </div>
                              <div class="p-3">
                                <img src="../../assets/images/character6.png" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>

                  <li class="col-md-12 col-12">
                    <div class="project-thumb border--round hover--active">
                      <div class="__initial">
                        <div class="row">
                          <div class="col-md-6 col-lg-5 p-10">
                            <div class="switchable__text">
                              <h1 class="title-h1 mb-0">Team Andromedian</h1>
                              <h3 class="sub-title">Specification</h3>
                              <p class="justify">
                                Savage species from the Xoon system. The
                                Andromedian is the strongest race in “Andromeda
                                Galaxy”, The Andromedian like to decorate their
                                body with skulls and bone to threaten their
                                enemies because they are not good at offensive
                                ability.
                              </p>
                              <div class="d-flex flex-row mt-5">
                                <div class="p-2">
                                  <a
                                    class="type--uppercase"
                                    href="javascript:void(0)"
                                  >
                                    <img
                                      src="../../assets/images/skill1.png"
                                      width="80px"
                                    />
                                  </a>
                                </div>
                                <div class="p-2">
                                  <a
                                    class="type--uppercase"
                                    href="javascript:void(0)"
                                  >
                                    <img
                                      src="../../assets/images/skill2-active.png"
                                      width="80px"
                                    />
                                  </a>
                                </div>

                                <div class="p-2">
                                  <a
                                    class="type--uppercase"
                                    href="javascript:void(0)"
                                  >
                                    <img
                                      src="../../assets/images/skill3.png"
                                      width="80px"
                                    />
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div class="col-md-6 p-10">
                            <div class="d-flex flex-row">
                              <div class="p-3">
                                <img src="../../assets/images/character7.png" />
                              </div>
                              <div class="p-3">
                                <img src="../../assets/images/character8.png" />
                              </div>
                              <div class="p-3">
                                <img src="../../assets/images/character9.png" />
                              </div>
                            </div>

                            <div class="d-flex flex-row">
                              <div class="p-3">
                                <img
                                  src="../../assets/images/character10.png"
                                />
                              </div>
                              <div class="p-3">
                                <img
                                  src="../../assets/images/character11.png"
                                />
                              </div>
                              <div class="p-3">
                                <img
                                  src="../../assets/images/character12.png"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>

                  <li class="col-md-12 col-12">
                    <div class="project-thumb border--round hover--active">
                      <div class="__initial">
                        <div class="row">
                          <div class="col-md-6 col-lg-5 p-10">
                            <div class="switchable__text">
                              <h1 class="title-h1 mb-0">Team Sculpian</h1>
                              <h3 class="sub-title">Specification</h3>
                              <p class="justify">
                                Unidentified species. The only thing we know is
                                they may are “Undying”
                              </p>
                              <div class="d-flex flex-row mt-5">
                                <div class="p-2">
                                  <a
                                    class="type--uppercase"
                                    href="javascript:void(0)"
                                  >
                                    <img
                                      src="../../assets/images/skill1.png"
                                      width="80px"
                                    />
                                  </a>
                                </div>
                                <div class="p-2">
                                  <a
                                    class="type--uppercase"
                                    href="javascript:void(0)"
                                  >
                                    <img
                                      src="../../assets/images/skill2.png"
                                      width="80px"
                                    />
                                  </a>
                                </div>

                                <div class="p-2">
                                  <a
                                    class="type--uppercase"
                                    href="javascript:void(0)"
                                  >
                                    <img
                                      src="../../assets/images/skill3-active.png"
                                      width="80px"
                                    />
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div class="col-md-6 p-10">
                            <div class="d-flex flex-row">
                              <div class="p-3">
                                <img src="../../assets/images/undefined.png" />
                              </div>
                              <div class="p-3">
                                <img src="../../assets/images/undefined.png" />
                              </div>
                              <div class="p-3">
                                <img src="../../assets/images/undefined.png" />
                              </div>
                            </div>

                            <div class="d-flex flex-row">
                              <div class="p-3">
                                <img src="../../assets/images/undefined.png" />
                              </div>
                              <div class="p-3">
                                <img src="../../assets/images/undefined.png" />
                              </div>
                              <div class="p-3">
                                <img src="../../assets/images/undefined.png" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        class="
          switchable
          imagebg
          switchable--switch
          
          feature-large
          bg--dark
        "
      >
        <div class="background-image-holder">
          <img alt="background" src="../../assets/images/bg-nft-to-earn.jpg" />
        </div>

        <img
          alt="background"
          src="../../assets/images/star-space.png"
          style="opacity: 0.6; position: absolute;width: 100%;top: 30% "
        />

        <img
          alt="background"
          src="../../assets/images/rock2.png"
          style="position: absolute; opacity: 0.5;
          right: 0;
          bottom: 0;"
          width="200"
        />

        <div class="container">
          <div class="row">
            <div class="col-md-12 mt-0">
              <h1 class="title-h1 m-auto pb-5 text-center">
                NFT TO EARN
              </h1>
            </div>
          </div>
          <div class="row justify-content-between mobile-max-400">
            <div
              class="col-xs-12 
              visible-mobile-only
              col-md-4 col-lg-5   "
            >
              <img
                alt="Image"
                style="max-width: 400px; margin: auto"
                class="border--round card-nft-earn text-center"
                src="../../assets/images/marcus.png"
              />
            </div>

            <div class="col-md-4 col-lg-3">
              <div class="">
                <div class="">
                  <img src="../../assets/images/c1.png" />
                </div>
              </div>

              <div class=" mt-5">
                <div class="">
                  <img src="../../assets/images/c2.png" />
                </div>
              </div>

              <div class=" mt-5">
                <div class="">
                  <img src="../../assets/images/c3.png" />
                </div>
              </div>
              <div class=" mt-5">
                <div class="">
                  <img src="../../assets/images/c4.png" />
                </div>
              </div>
            </div>
            <div class="col-md-4 col-lg-5  visible-desktop-only">
              <img
                alt="Image"
                class="border--round card-nft-earn text-center"
                src="../../assets/images/marcus.png"
              />
            </div>
            <div class="col-md-4 col-lg-3">
              <div class="">
                <div class="">
                  <img src="../../assets/images/c5.png" />
                </div>
              </div>

              <div class=" mt-5">
                <div class="">
                  <img src="../../assets/images/c6.png" />
                </div>
              </div>

              <div class=" mt-5">
                <div class="">
                  <img src="../../assets/images/c7.png" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="text-center imagebg">
        <div class="background-image-holder">
          <img alt="background" src="../../assets/images/bg-partner.jpg" />
        </div>

        <img
          alt="background"
          src="../../assets/images/star-space3.png"
          style="position: absolute; opacity: 0.7;
        
          left: 0%;   bottom: 0"
          width="300"
        />

        <img
          alt="background"
          src="../../assets/images/rock5.png"
          style="position: absolute; opacity: 0.7;
        
          right: 0%;   bottom: 0"
          width="300"
        />

        <div class="container partner">
          <div class="row text-center  mb-3">
            <div class="col-md-12 col-lg-12">
              <h1 class="title-h1">PARTNERS</h1>
            </div>
          </div>

          <div class="grid grid-cols-2 md:gap-1- md:grid-cols-5">
            <div class="p-4 logo-partner">
              <img src="../../assets/logo/seedify.png" />
            </div>

            <div class="p-4 logo-partner">
              <img src="../../assets/logo/poolz-logo.png" />
            </div>

            <div class="p-4 logo-partner">
              <img src="../../assets/logo/enjinstarter.png" />
            </div>

            <div class="p-4 logo-partner">
              <img src="../../assets/logo/pools-venture.png" />
            </div>

            <div class="p-4 logo-partner">
              <img src="../../assets/logo/chronos-vc-logo.png" />
            </div>
            <div class="p-4 logo-partner">
              <img src="../../assets/logo/basics-capital.png" />
            </div>

            <div class="p-4 logo-partner">
              <img src="../../assets/logo/good-game-guild.png" />
            </div>

            <div class="p-4 logo-partner">
              <img src="../../assets/logo/moonwhale.png" />
            </div>

            <div class="p-4 logo-partner">
              <img src="../../assets/logo/av-star.png" />
            </div>

            <div class="p-4 logo-partner">
              <img src="../../assets/logo/iconium.png" />
            </div>

            <div class="p-4 logo-partner">
              <img src="../../assets/logo/tk-venture.png" />
            </div>

            <div class="p-4 logo-partner">
              <img src="../../assets/logo/magnus.png" />
            </div>

            <div class="p-4 logo-partner">
              <img src="../../assets/logo/zbs.png" />
            </div>

            <div class="p-4 logo-partner">
              <img src="../../assets/logo/asteroid.png" />
            </div>

            <div class="p-4 logo-partner">
              <img src="../../assets/logo/smo.png" />
            </div>

            <div class="p-4 logo-partner">
              <img src="../../assets/logo/golden.png" />
            </div>

            <div class="p-4 logo-partner">
              <img src="../../assets/logo/mochi-logo.png" />
            </div>

            <div class="p-4 logo-partner">
              <img src="../../assets/logo/moondot.png" />
            </div>

            <div class="p-4 logo-partner">
              <img src="../../assets/logo/xtream-capital.png" />
            </div>

            <div class="p-4 logo-partner">
              <img src="../../assets/logo/baselayer-capital.png" />
            </div>

            <div class="p-4 logo-partner">
              <img src="../../assets/logo/bitcoin-addict.png" />
            </div>

            <div class="p-4 logo-partner">
              <img src="../../assets/logo/babylons-logo.png" />
            </div>

            <div class="p-4 logo-partner">
              <img src="../../assets/logo/galaxy.png" />
            </div>

            <div class="p-4 logo-partner">
              <img src="../../assets/logo/coinmarketcap.png" />
            </div>

            <div class="p-4 logo-partner">
              <img src="../../assets/logo/warden.png" />
            </div>

            <div class="p-4 logo-partner">
              <img src="../../assets/logo/meta-gaming-guild.png" />
            </div>

            <div class="p-4 logo-partner">
              <img src="../../assets/logo/certik-logo.png" />
            </div>

            <div class="p-4 logo-partner">
              <img src="../../assets/logo/chainlink.png" />
            </div>
          </div>
        </div>
      </section>

      <section class="text-center imagebg">
        <div class="background-image-holder">
          <img alt="background" src="../../assets/images/bg-team.jpg" />
        </div>

        <img
          alt="background"
          src="../../assets/images/rock3.png"
          style="position: absolute; opacity: 0.7;
        
          top: 40%;"
          width="200"
        />

        <img
          alt="background"
          src="../../assets/images/star-space3.png"
          style="position: absolute; opacity: 0.7;
        
          left: 0%;   bottom: 0"
          width="300"
        />

        <img
          alt="background"
          src="../../assets/images/rock5.png"
          style="position: absolute; opacity: 0.7;
          right: 0%;   bottom: 0"
          width="300"
        />

        <div class="container">
          <div class="row text-center mb-10">
            <div class="col-md-12 col-lg-12">
              <h1 class="title-h1">TEAM</h1>
            </div>
          </div>

          <div class="team grid grid-cols-3 gap-2 md:gap-4 md:grid-cols-8">
            <div class="text-block">
              <img
                src="../../assets/team/team1.png"
                width="100px"
                class="m-auto pb-3"
              />
              <h3>Sittikorn</h3>

              <p>
                CEO
              </p>
            </div>

            <div class="text-block">
              <img
                src="../../assets/team/team2.png"
                width="100px"
                class="m-auto pb-3"
              />
              <h3>Natalie</h3>

              <p>
                CCO
              </p>
            </div>

            <div class="text-block">
              <img
                src="../../assets/team/team3.png"
                width="100px"
                class="m-auto pb-3"
              />
              <h3>THEE</h3>

              <p>
                CMO
              </p>
            </div>

            <div class="text-block">
              <img
                src="../../assets/team/team4.png"
                width="100px"
                class="m-auto pb-3"
              />
              <h3>Nattapon</h3>

              <p>
                Blockchain Developer
              </p>
            </div>

            <div class="text-block">
              <img
                src="../../assets/team/team6.png"
                width="100px"
                class="m-auto pb-3"
              />
              <h3>Kanit</h3>

              <p>
                Storyline Arrangment Player Experience Design
              </p>
            </div>

            <div class="text-block">
              <img
                src="../../assets/team/team7.png"
                width="100px"
                class="m-auto pb-3"
              />
              <h3>NAPATSAWAN</h3>

              <p>
                Head of Design
              </p>
            </div>

            <div class="text-block">
              <img
                src="../../assets/team/team8.png"
                width="100px"
                class="m-auto pb-3"
              />
              <h3>phat</h3>

              <p>
                Music Scoring & Storyline Arrangement
              </p>
            </div>

            <div class="text-block">
              <img
                src="../../assets/team/team9.png"
                width="100px"
                class="m-auto pb-3"
              />
              <h3>robert</h3>

              <p>
                Marketing Manager
              </p>
            </div>

            <div class="text-block">
              <img
                src="../../assets/team/team10.png"
                width="100px"
                class="m-auto pb-3"
              />
              <h3>siriwut</h3>

              <p>
                Marketing Support
              </p>
            </div>

            <div class="text-block">
              <img
                src="../../assets/team/team11.png"
                width="100px"
                class="m-auto pb-3"
              />
              <h3>daniel</h3>

              <p>
                Marketing Support
              </p>
            </div>

            <div class="text-block">
              <img
                src="../../assets/team/team12.png"
                width="100px"
                class="m-auto pb-3"
              />
              <h3>shinji</h3>

              <p>
                Front-End Developer
              </p>
            </div>

            <div class="text-block">
              <img
                src="../../assets/team/team13.png"
                width="100px"
                class="m-auto pb-3"
              />
              <h3>Jirayu</h3>

              <p>
                Blockchain Developer
              </p>
            </div>

            <div class="text-block">
              <img
                src="../../assets/team/team14.png"
                width="100px"
                class="m-auto pb-3"
              />
              <h3>janewit</h3>

              <p>
                Marketing Content Graphic Designer
              </p>
            </div>

            <div class="text-block">
              <img
                src="../../assets/team/team15.png"
                width="100px"
                class="m-auto pb-3"
              />
              <h3>saharath</h3>

              <p>
                Graphic Designer
              </p>
            </div>

            <div class="text-block">
              <img
                src="../../assets/team/team16.png"
                width="100px"
                class="m-auto pb-3"
              />
              <h3>Eakkanut</h3>

              <p>
                Graphic Designer
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer class="text-center space--sm footer-5 bg--primary">
        <div class="container">
          <div class="row">
            <div class="col-sm-12">
              <svg
                style="margin: auto; width: 150px; margin-bottom: 40px"
                width="120"
                height="46"
                viewBox="0 0 183 46"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M113.862 45.5704V0H125.254V45.5704H113.862Z"
                  fill="white"
                />
                <path
                  d="M56.9316 0V17.0883L85.4114 45.5704H102.5L68.3231 11.3915H91.1083V16.1886H102.5V11.3915V9.77099V0H56.9316Z"
                  fill="white"
                />
                <path d="M45.5888 0H0V11.3915H45.5888V0Z" fill="white" />
                <path
                  d="M45.5888 28.4804V17.089H11.3915V11.3921L0 18.9045V35.8758L11.3915 45.571H45.5888V34.1773H11.3915V28.4804H45.5888Z"
                  fill="white"
                />
                <path
                  d="M136.622 0V45.5704H170.798L182.19 34.179V0.00229752H136.622V0ZM148.016 11.3915H170.801V31.0872L167.711 34.1767H148.016V11.3915Z"
                  fill="white"
                />
              </svg>

              <div>
                <ul class="social-list list-inline">
                  <li>
                    <a href="https://t.me/eciospace">
                      <svg
                        width="40"
                        height="51"
                        viewBox="0 0 50 51"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M23.3203 0.570312H26.436C26.5658 0.59757 26.6839 0.62872 26.8098 0.650786C28.3521 0.91038 29.9254 1.06743 31.4339 1.46332C40.638 3.87494 47.8402 11.8081 49.3785 21.1548C49.5278 22.0634 49.6382 22.9719 49.7576 23.8883V27.0034C49.6849 27.5953 49.6278 28.1898 49.5382 28.7791C48.697 34.6303 46.1824 39.6469 41.8167 43.633C35.5193 49.3817 28.0937 51.439 19.7478 49.7633C13.2712 48.4653 8.13563 44.9517 4.39041 39.5197C0.586763 34.0047 -0.714005 27.8783 0.366074 21.2742C1.2021 16.1732 3.48169 11.7731 7.08801 8.08165C10.8215 4.26693 15.3262 1.87737 20.589 0.957106C21.4938 0.793562 22.4103 0.694917 23.3203 0.570312ZM24.538 33.3245C24.7029 33.4401 24.8353 33.5309 24.9651 33.627C26.8033 34.9803 28.6411 36.3341 30.4785 37.6883C31.7766 38.6436 32.7022 38.2958 33.0359 36.7252C34.3834 30.3833 35.7274 24.0406 37.068 17.697C37.1429 17.3329 37.1605 16.9593 37.1199 16.5898C37.0342 15.8227 36.4085 15.41 35.6517 15.5826C35.4482 15.6336 35.2486 15.6991 35.0545 15.7786C29.2768 18.0042 23.4999 20.2311 17.7239 22.4593C15.5066 23.3146 13.2894 24.1687 11.0812 25.0461C10.6346 25.2239 10.1166 25.4731 10.1452 26.0403C10.1738 26.6076 10.7346 26.7555 11.1967 26.9022C13.0453 27.4876 14.9004 28.0522 16.7464 28.6493C16.9022 28.7074 17.0699 28.726 17.2346 28.7033C17.3994 28.6807 17.5559 28.6175 17.6902 28.5195C21.4228 26.1572 25.1599 23.8018 28.9012 21.4533C29.7632 20.9108 30.6226 20.3604 31.491 19.827C31.774 19.6543 32.0791 19.4713 32.5205 19.7906C32.1674 20.1281 31.8441 20.45 31.5066 20.755C28.0223 23.9039 24.5393 27.0536 21.0576 30.2042C20.8802 30.3571 20.7602 30.5659 20.7175 30.7961C20.5968 32.1499 20.5124 33.5076 20.4189 34.8639C20.3761 35.5038 20.341 36.145 20.3021 36.7849L20.4319 36.9147C20.7759 36.7058 21.1654 36.5461 21.4562 36.2787C22.4908 35.3221 23.493 34.3318 24.538 33.3245Z"
                          fill="white"
                        />
                      </svg>
                    </a>
                  </li>

                  <li>
                    <a href="https://facebook.com/eciospace">
                      <svg
                        width="40"
                        height="51"
                        viewBox="0 0 51 51"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M25.0668 0.570312C11.2605 0.570312 0.0667725 11.7641 0.0667725 25.5703C0.0667725 38.1036 9.30011 48.4536 21.3293 50.262V32.1953H15.1439V25.6245H21.3293V21.2516C21.3293 14.012 24.8564 10.8349 30.873 10.8349C33.7543 10.8349 35.2793 11.0495 36.0001 11.1453V16.8807H31.8959C29.3418 16.8807 28.4501 19.3036 28.4501 22.0328V25.6245H35.9355L34.9209 32.1953H28.4501V50.3141C40.6522 48.6599 50.0668 38.2266 50.0668 25.5703C50.0668 11.7641 38.873 0.570312 25.0668 0.570312Z"
                          fill="white"
                        />
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a href="https://twitter.com/ECIOspace">
                      <svg
                        width="40"
                        height="51"
                        viewBox="0 0 51 51"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M23.5048 0.570312C24.5469 0.570312 25.588 0.570312 26.6301 0.570312C26.7554 0.59771 26.8796 0.640764 27.0058 0.650548C30.7975 0.937245 34.322 2.05957 37.6214 3.94903C46.2908 8.91387 51.2664 19.0197 49.8466 28.9073C48.875 35.6794 45.693 41.2157 40.2751 45.3869C34.8063 49.5983 28.5763 51.2099 21.7406 50.344C17.083 49.7539 12.9137 47.9359 9.28839 44.9456C4.52708 41.018 1.56031 36.013 0.455598 29.9288C0.288277 29.0032 0.19532 28.0658 0.0671387 27.1333C0.0671387 26.0912 0.0671387 25.0501 0.0671387 24.008C0.138568 23.4131 0.200213 22.8172 0.284363 22.2232C0.986916 17.2457 2.96248 12.8396 6.29814 9.07532C10.1857 4.68778 15.0213 1.95585 20.8091 0.94703C21.7024 0.79145 22.6066 0.69458 23.5048 0.570312ZM14.4949 28.1891C15.4597 30.6539 17.2092 31.9376 19.8326 32.2097C17.3061 34.0864 14.5889 34.8349 11.4929 34.5756C11.6602 34.7009 11.7512 34.786 11.8559 34.8447C16.9734 37.7185 22.2866 38.0512 27.5068 35.425C33.4824 32.4191 36.277 27.2517 36.4815 20.6342C36.4942 20.2252 36.5833 19.96 36.9248 19.7036C37.8348 19.0197 38.596 18.185 39.2448 17.2173C38.2369 17.4903 37.2692 17.7525 36.3015 18.0148C36.2819 17.9707 36.2633 17.9267 36.2437 17.8836C37.3034 17.1351 38.0989 16.1909 38.5412 14.867C38.322 14.9756 38.186 15.0578 38.0402 15.1126C37.1459 15.4502 36.2467 15.775 35.3543 16.1175C35.0549 16.232 34.8592 16.1468 34.6224 15.9355C32.9061 14.4032 30.9178 13.9824 28.771 14.7691C26.6047 15.5637 25.3512 17.1879 25.0577 19.4893C24.9774 20.1205 25.0459 20.7702 25.0459 21.4444C20.312 21.1097 16.4176 19.096 13.2826 15.4335C11.9146 18.4717 12.491 20.9786 15.0497 23.1538C14.5086 23.0501 14.1035 23.0011 13.716 22.8915C13.3158 22.779 12.9323 22.6078 12.535 22.46C12.3501 24.8436 13.9313 26.8818 16.8766 28.19C16.1143 28.1891 15.3491 28.1891 14.4949 28.1891Z"
                          fill="white"
                        />
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a href="https://medium.com/@EcioOfficial">
                      <svg
                        width="40"
                        height="51"
                        viewBox="0 0 51 51"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M25.0865 0.570312C11.2799 0.570312 0.0865479 11.7627 0.0865479 25.5703C0.0865479 39.377 11.2799 50.5703 25.0865 50.5703C38.8932 50.5703 50.0865 39.377 50.0865 25.5703C50.0865 11.7627 38.8932 0.570312 25.0865 0.570312ZM39.192 14.9023C38.4205 15.6357 37.6412 16.3613 36.8844 17.1104C36.7633 17.2295 36.6871 17.4521 36.6871 17.626C36.6774 22.9336 36.6764 28.2412 36.6901 33.5488C36.691 33.7441 36.8004 33.9824 36.9381 34.125C37.5699 34.7783 38.2213 35.4131 38.8844 36.0352C39.0953 36.2334 39.1871 36.4346 39.11 36.7334C35.4528 36.7334 31.7867 36.7334 28.1041 36.7334C28.0524 36.4912 28.0573 36.2939 28.2692 36.0967C28.9615 35.4531 29.6295 34.7822 30.3141 34.1299C30.5074 33.9453 30.5905 33.7373 30.5905 33.4707C30.5865 29.3018 30.5875 25.1318 30.5875 20.9629C30.5875 20.9121 30.5826 20.8604 30.5319 20.7959C30.4967 20.873 30.4586 20.9482 30.4274 21.0264C28.4039 26.1514 26.3795 31.2754 24.3639 36.4033C24.2682 36.6455 24.1461 36.707 23.8922 36.7275C23.5006 36.7598 23.3209 36.6191 23.1647 36.2627C22.5817 34.9268 21.9586 33.6084 21.3492 32.2832C19.6237 28.5244 17.8971 24.7666 16.1715 21.0078C16.1334 20.9258 16.0934 20.8447 15.9967 20.7676C15.9967 20.8604 15.9967 20.9531 15.9967 21.0459C15.9967 24.4258 16.0123 27.8047 15.983 31.1846C15.9772 31.877 16.1715 32.4141 16.6207 32.9287C17.4957 33.9316 18.318 34.9795 19.1774 35.9961C19.359 36.2109 19.3971 36.4219 19.3395 36.6924C16.5592 36.6924 13.7828 36.6924 11.0055 36.6924C10.9391 36.4219 10.9977 36.2139 11.1754 36.0029C12.1149 34.8857 13.0377 33.7539 13.9694 32.6309C14.2067 32.3447 14.3434 32.0264 14.3424 31.6504C14.3365 30.0342 14.3307 28.418 14.3297 26.8018C14.3278 24.1846 14.3287 21.5674 14.3307 18.9502C14.3307 18.623 14.2213 18.3486 14.0094 18.0977C13.152 17.0791 12.2975 16.0576 11.4606 15.0225C11.3512 14.8877 11.3522 14.6631 11.2858 14.4248C11.4596 14.4248 11.5485 14.4248 11.6373 14.4248C14.1715 14.4248 16.7067 14.4277 19.2408 14.4189C19.4528 14.418 19.5416 14.498 19.6237 14.6777C21.6393 19.0996 23.6608 23.5195 25.6813 27.9395C25.7233 28.0303 25.7672 28.1201 25.8297 28.25C25.8864 28.1172 25.9303 28.0205 25.9694 27.9219C27.733 23.5322 29.4996 19.1436 31.2545 14.75C31.3561 14.4951 31.4781 14.416 31.7506 14.417C34.1198 14.4297 36.4889 14.4248 38.858 14.4229C38.9674 14.4229 39.0768 14.4102 39.1862 14.4033C39.192 14.5713 39.192 14.7363 39.192 14.9023Z"
                          fill="white"
                        />
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a href="https://discord.gg/erTeN54MHf">
                      <svg
                        width="40"
                        height="51"
                        viewBox="0 0 51 51"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M50.1534 25.4491C50.1534 39.1893 39.0147 50.3279 25.2746 50.3279C11.5344 50.3279 0.395752 39.1893 0.395752 25.4491C0.395752 11.7089 11.5344 0.570312 25.2746 0.570312C39.0147 0.570312 50.1534 11.7089 50.1534 25.4491ZM28.9699 15.1606C30.8658 15.4884 32.7112 16.0607 34.4597 16.8634C34.4749 16.8695 34.4873 16.8809 34.4948 16.8955C37.5406 21.3754 39.0449 26.429 38.4825 32.2468C38.4814 32.259 38.4777 32.2709 38.4716 32.2816C38.4656 32.2923 38.4573 32.3016 38.4474 32.3088C36.4091 33.8192 34.1279 34.9705 31.7021 35.7132C31.6849 35.7185 31.6666 35.7182 31.6496 35.7124C31.6326 35.7067 31.6179 35.6957 31.6074 35.6811C31.0944 34.9691 30.6343 34.2204 30.2308 33.4411C30.2252 33.4304 30.222 33.4186 30.2213 33.4065C30.2206 33.3944 30.2225 33.3823 30.2268 33.371C30.2311 33.3597 30.2378 33.3494 30.2463 33.3408C30.2549 33.3323 30.2651 33.3256 30.2765 33.3213C31.0051 33.0472 31.7092 32.7121 32.3814 32.3196C32.3936 32.3123 32.4038 32.3021 32.4111 32.2899C32.4184 32.2778 32.4226 32.264 32.4234 32.2498C32.4241 32.2356 32.4214 32.2215 32.4153 32.2087C32.4093 32.1958 32.4002 32.1846 32.3888 32.1761C32.2464 32.0702 32.105 31.9589 31.97 31.8476C31.9578 31.8376 31.943 31.8313 31.9274 31.8294C31.9118 31.8275 31.8959 31.8301 31.8817 31.8369C27.5198 33.8521 22.7412 33.8521 18.3273 31.8369C18.3131 31.8305 18.2974 31.8282 18.282 31.8303C18.2666 31.8324 18.2521 31.8387 18.2401 31.8486C18.1051 31.9599 17.9637 32.0702 17.8223 32.1761C17.811 32.1847 17.8019 32.196 17.796 32.2089C17.7901 32.2218 17.7874 32.2359 17.7883 32.2501C17.7891 32.2643 17.7934 32.278 17.8008 32.2901C17.8083 32.3023 17.8185 32.3124 17.8308 32.3196C18.5045 32.7089 19.208 33.0442 19.9347 33.3223C19.946 33.3265 19.9563 33.333 19.9649 33.3414C19.9735 33.3498 19.9803 33.36 19.9847 33.3712C19.9891 33.3825 19.9911 33.3945 19.9906 33.4065C19.99 33.4186 19.9869 33.4304 19.9814 33.4411C19.5845 34.2247 19.1237 34.9743 18.6036 35.6822C18.5929 35.6964 18.5781 35.707 18.5612 35.7125C18.5443 35.7181 18.5261 35.7183 18.509 35.7132C16.0875 34.9681 13.8102 33.8169 11.7743 32.3088C11.7645 32.3012 11.7564 32.2917 11.7503 32.2808C11.7443 32.27 11.7405 32.258 11.7392 32.2457C11.2693 27.2135 12.2272 22.1182 15.7237 16.8944C15.7323 16.8806 15.7449 16.8697 15.7599 16.8634C17.5082 16.0601 19.3536 15.4877 21.2497 15.1606C21.2669 15.1579 21.2845 15.1604 21.3002 15.1679C21.316 15.1753 21.3291 15.1873 21.3379 15.2024C21.595 15.6573 21.8267 16.126 22.0321 16.6065C24.0757 16.2961 26.1545 16.2961 28.1981 16.6065C28.4022 16.1273 28.6304 15.6586 28.8817 15.2024C28.8901 15.187 28.9032 15.1747 28.919 15.1672C28.9349 15.1597 28.9527 15.1574 28.9699 15.1606ZM18.2167 26.4633C18.2167 27.9616 19.3117 29.1816 20.6406 29.1816C21.9907 29.1816 23.0644 27.9616 23.0644 26.4633C23.0857 24.9757 22.0013 23.7449 20.6406 23.7449C19.2904 23.7449 18.2167 24.9649 18.2167 26.4633ZM27.1786 26.4633C27.1786 27.9616 28.2736 29.1816 29.6024 29.1816C30.9632 29.1816 32.0263 27.9616 32.0263 26.4633C32.0476 24.9757 30.9632 23.7449 29.6024 23.7449C28.2523 23.7449 27.1786 24.9649 27.1786 26.4633Z"
                          fill="white"
                        />
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.youtube.com/watch?v=0shA0Ece9zE">
                      <svg
                        width="40"
                        height="51"
                        viewBox="0 0 51 51"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M25.3413 0.570313C20.4207 0.570318 15.6107 2.02944 11.5194 4.76316C7.42806 7.49689 4.23931 11.3824 2.3563 15.9284C0.473289 20.4744 -0.0193757 25.4767 0.940583 30.3027C1.90054 35.1288 4.26997 39.5617 7.74933 43.0411C11.2287 46.5205 15.6617 48.8899 20.4877 49.8499C25.3138 50.8098 30.3161 50.3171 34.8621 48.4341C39.4081 46.5511 43.2936 43.3623 46.0273 39.271C48.761 35.1797 50.2201 30.3696 50.2201 25.4491C50.2201 22.182 49.5766 18.9468 48.3263 15.9284C47.076 12.9099 45.2435 10.1673 42.9333 7.85712C40.6231 5.54691 37.8804 3.71436 34.862 2.46409C31.8436 1.21381 28.6084 0.570306 25.3413 0.570313ZM36.9701 26.4821C36.9599 27.749 36.8819 29.0144 36.7363 30.2729C36.7363 30.2729 36.507 31.8869 35.805 32.598C35.1838 33.2246 34.3406 33.5811 33.4583 33.5902C30.1802 33.8272 25.2585 33.8345 25.2585 33.8345C25.2585 33.8345 19.169 33.7788 17.2946 33.599C16.7734 33.5015 15.603 33.5305 14.7121 32.598C14.01 31.8869 13.7815 30.2729 13.7815 30.2729C13.6355 29.0144 13.5571 27.749 13.5469 26.4821V24.7048C13.5571 23.438 13.6355 22.1726 13.7815 20.9142C13.7815 20.9142 14.01 19.3002 14.7121 18.5895C15.3331 17.9625 16.1764 17.606 17.0588 17.5972C20.3368 17.3603 25.2536 17.3603 25.2536 17.3603H25.2635C25.2635 17.3603 30.1802 17.3603 33.4583 17.5972C34.3407 17.606 35.184 17.9625 35.805 18.5895C36.507 19.3002 36.7363 20.9142 36.7363 20.9142C36.8819 22.1726 36.9599 23.438 36.9701 24.7048V26.4821Z"
                          fill="white"
                        />
                        <path
                          d="M22.8027 29.0032L29.911 25.462L22.8027 21.895V29.0032Z"
                          fill="white"
                        />
                      </svg>
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <div
                  id="mauticform_wrapper_newsletter"
                  class="mauticform_wrapper"
                >
                  <form
                    autocomplete="false"
                    role="form"
                    method="post"
                    action="https://mt.ecio.space/form/submit?formId=1"
                    id="mauticform_newsletter"
                    data-mautic-form="newsletter"
                    enctype="multipart/form-data"
                  >
                    <div
                      class="mauticform-error"
                      id="mauticform_newsletter_error"
                    ></div>
                    <div
                      class="mauticform-message"
                      id="mauticform_newsletter_message"
                    ></div>
                    <div class="mauticform-innerform">
                      <div
                        class="mauticform-page-wrapper mauticform-page-1"
                        data-mautic-form-page="1"
                      >
                        <div
                          id="mauticform_newsletter_email"
                          style="  margin-right: 20px;"
                          class="mauticform-row mauticform-email mauticform-field-1"
                        >
                          <input
                            id="mauticform_input_newsletter_email"
                            name="mauticform[email]"
                            value=""
                            placeholder="EMAIL..."
                            class="mauticform-input"
                            type="email"
                          />
                          <span
                            class="mauticform-errormsg"
                            style="display: none;"
                          ></span>
                        </div>

                        <div
                          id="mauticform_newsletter_submit"
                          class="mauticform-row mauticform-button-wrapper mauticform-field-2"
                        >
                          <button
                            type="submit"
                            name="mauticform[submit]"
                            id="mauticform_input_newsletter_submit"
                            value=""
                            class="mauticform-button btn btn-default"
                          >
                            SUBSCRIBE
                          </button>

                          <a href="/partnership" class="btn btn-ecio-partner">
                            CONTACT US
                          </a>
                        </div>
                      </div>
                    </div>

                    <input
                      type="hidden"
                      name="mauticform[formId]"
                      id="mauticform_newsletter_id"
                      value="1"
                    />
                    <input
                      type="hidden"
                      name="mauticform[return]"
                      id="mauticform_newsletter_return"
                      value=""
                    />
                    <input
                      type="hidden"
                      name="mauticform[formName]"
                      id="mauticform_newsletter_name"
                      value="newsletter"
                    />
                  </form>
                </div>

                <form
                  class="row justify-content-center form--active mt-0 pt-0"
                  style="max-width: 900px; margin: auto"
                >
                  <div class="col-md-12">
                    <div class="input-checkbox">
                      <input
                        class="validate-required"
                        type="checkbox"
                        name="group[13737][1]"
                        id="input-assigned-0"
                      /><label for="input-assigned-0"></label>
                    </div>
                    <span class="text-white break-space"
                      >Join Ecio newsletter to receive news & updates
                    </span>
                  </div>
                  <div
                    style="position: absolute; left: -5000px"
                    aria-hidden="true"
                  >
                    <input
                      type="text"
                      name="b_77142ece814d3cff52058a51f_f300c9cce8"
                      tabindex="-1"
                      value=""
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      videoId: "0shA0Ece9zE",
      address: "0x327a3e880bf2674ee40b6f872be2050ed406b021",
    };
  },
  created() {
    const ref = this.$route.query.ref;
    if (ref != undefined) {
      const encryptedText = decodeURIComponent(ref);
      const decryptedText = this.CryptoJS.AES.decrypt(
        encryptedText,
        "mzHfUfUyyuFK9kJwxr9Qv"
      ).toString(this.CryptoJS.enc.Utf8);
      localStorage.setItem("ref", decryptedText);
    }
  },
};
</script>

<style scoped>
.title-ecio {
  font-size: 4rem;
}
.m-logo {
  /* padding-top: 60px !important; */
}
.bg--purple {
  background: #410b53;
  padding-bottom: 0;
}

.bg--purple [data-overlay]:before {
  background: #410b53 !important;
}
.slider.roadmap {
  margin-bottom: 0;
}
.bg--team {
  background-image: linear-gradient(
    to top,
    #000000 100%,
    #120457 100%,
    #44124e 100%
  );
}
/deep/ .roadmap .flickity-page-dots {
  bottom: 50px !important;
}
/deep/ .roadmap .flickity-page-dots .dot {
  background: #ffffff !important;
}
.project-thumb:not(.hover-element) > a {
  margin-bottom: 0px;
}

@media (max-width: 767.98px) {
  /deep/ .roadmap .flickity-page-dots {
    bottom: 10px !important;
  }
  .videobg {
    height: 100vh !important;
  }
}
section,
footer {
  padding-top: 5em;
  padding-bottom: 5em;
}

/deep/ .flickity-page-dots .dot {
  width: 12px;
  height: 12px;
}

.carousel {
  background: #fafafa;
}

.carousel-cell {
  width: 66%;
  height: 200px;
  margin-right: 10px;
  background: #8c8;
  border-radius: 5px;
  counter-increment: carousel-cell;
}

/* cell number */
.carousel-cell:before {
  display: block;
  text-align: center;
  content: counter(carousel-cell);
  line-height: 200px;
  font-size: 80px;
  color: white;
}

.button {
  font-size: 22px;
}

.button-group {
  margin-bottom: 20px;
}
.mauticform-page-1 {
  display: flex !important;
  justify-content: center;
}
.btn-ecio-partner {
  background: #e0fb16;
  color: #000000;
  border-radius: 0;
  margin-left: 20px;
  white-space: nowrap;
  padding: 6px 12px;
  position: relative;
  font-weight: 500;
  width: 100%;
  display: flex;
  align-items: center;
  font-family: "Quantico";
  justify-content: center;
}
.mauticform-button.btn-default {
  border-radius: 0;
  color: #000000 !important;
  font-family: "Quantico";
  font-size: 14px !important;
  font-weight: 500 !important;
}
.break-space {
  white-space: break-spaces;
}
.mauticform-input {
  height: 100%;
  padding: 14px;
}
.logo-partner img {
}
.container.partner {
  background: rgb(0 0 0 / 20%);
  padding: 30px;
}
.imgbox {
  width: 200px;
  top: -20px;
}

@media (max-width: 800px) {
  .max-marketplace-text {
    font-size: 2.2rem !important;
  }
  img.imgbox {
    width: 150px;
  }
}
@media (max-width: 600px) {
  .container {
    max-width: 100%;
  }
  .max-marketplace-text {
    font-size: 2rem !important;
    line-height: 1.3;
  }
  .title-market-now {
    padding: 20px 0px !important;
  }
  img.imgbox {
    display: none;
  }
}
.max-marketplace-text {
  font-size: 3rem;
  color: #e0fb16;
}
.title-market-now {
  z-index: 500;
  top: -70px;
  background: #4e2de2;
  padding: 40px;
  z-index: 100;
}
</style>
