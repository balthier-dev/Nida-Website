<template>
  <div>
    <div class="nav-container">
      <div>
        <div class="bar bar--sm visible-xs visible-sm visible-md imagebg">
          <div class="container">
            <div class="row">
              <div class="col-3">
                <a href="/">
                  <svg
                    width="80px"
                    height="46"
                    viewBox="0 0 183 46"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M113.862 45.5704V3.05176e-05H125.253V45.5704H113.862Z"
                      fill="white"
                    />
                    <path
                      d="M56.9316 3.05176e-05V17.0884L85.4114 45.5704H102.5L68.3231 11.3915H91.1083V16.1886H102.5V11.3915V9.77102V3.05176e-05H56.9316Z"
                      fill="white"
                    />
                    <path d="M45.5888 0H0V11.3915H45.5888V0Z" fill="white" />
                    <path
                      d="M45.5888 28.4802V17.0887H11.3915V11.3918L0 18.9043V35.8755L11.3915 45.5708H45.5888V34.177H11.3915V28.4802H45.5888Z"
                      fill="white"
                    />
                    <path
                      d="M136.622 3.05176e-05V45.5704H170.799L182.19 34.179V0.00232803H136.622V3.05176e-05ZM148.016 11.3915H170.801V31.0872L167.712 34.1767H148.016V11.3915Z"
                      fill="white"
                    /></svg
                ></a>
              </div>
              <div class="col-9 col-sm-9 col-md-9 text-right">
                <a
                  href="#"
                  class="hamburger-toggle"
                  data-toggle-class="#menu1;hidden-xs hidden-sm hidden-md"
                >
                  <i class="icon icon--sm stack-interface stack-menu"></i>
                </a>
              </div>
            </div>
          </div>
        </div>

        <nav
          id="menu1"
          class="
            bar bar-2
            hidden-xs hidden-sm hidden-md hidden-lg
            bar--absolute
            bg--dark
          "
        >
          <div class="container">
            <div class="row">
              <div class="col-lg-1 order-lg-1">
                <a href="/">
                  <svg
                    class="hidden-xs hidden-sm hidden-md"
                    width="100px"
                    height="46"
                    viewBox="0 0 183 46"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M113.862 45.5704V3.05176e-05H125.253V45.5704H113.862Z"
                      fill="white"
                    />
                    <path
                      d="M56.9316 3.05176e-05V17.0884L85.4114 45.5704H102.5L68.3231 11.3915H91.1083V16.1886H102.5V11.3915V9.77102V3.05176e-05H56.9316Z"
                      fill="white"
                    />
                    <path d="M45.5888 0H0V11.3915H45.5888V0Z" fill="white" />
                    <path
                      d="M45.5888 28.4802V17.0887H11.3915V11.3918L0 18.9043V35.8755L11.3915 45.5708H45.5888V34.177H11.3915V28.4802H45.5888Z"
                      fill="white"
                    />
                    <path
                      d="M136.622 3.05176e-05V45.5704H170.799L182.19 34.179V0.00232803H136.622V3.05176e-05ZM148.016 11.3915H170.801V31.0872L167.712 34.1767H148.016V11.3915Z"
                      fill="white"
                    />
                  </svg>
                </a>
              </div>

              <div class="col-xs-12 col-sm-12 col-lg-12 order-lg-2 m-mt-50px">
                <div class="bar__module mb-0 text-center">
                  <ul class="menu-horizontal text-center menu1">
                    <li class="dropdown">
                      <a
                        class="header-menu"
                        href="https://ecio-space.gitbook.io/ecio-white-paper/"
                      >
                        WHITEPAPER
                      </a>
                    </li>

                    <li class="dropdown">
                      <a class="header-menu" href="/alpha-pass"> ALPHA PASS </a>
                    </li>
                    <!-- <li class="dropdown">
                      <a class="header-menu" href="/claim-token">
                        CLAIM PRESALE
                      </a>
                    </li>
                    <li class="dropdown">
                      <a class="header-menu" href="/marketplace">
                        MARKETPLACE
                      </a>
                    </li>
                    <li class="dropdown">
                      <a class="header-menu" href="/staking"> STAKING </a>
                    </li> -->
                    <li class="dropdown">
                      <a
                        v-on:click="tokenHidden = !tokenHidden"
                        class="header-menu"
                      >
                        TOKEN APP ▼
                      </a>
                    </li>
                    <li class="dropdown" v-if="!tokenHidden">
                      <a
                        href="https://pancakeswap.finance/swap?outputCurrency=0x327a3e880bf2674ee40b6f872be2050ed406b021"
                        target="_blank"
                        >BUY $ECIO</a
                      >
                    </li>
                    <li class="dropdown" v-if="!tokenHidden">
                      <a href="/staking">STAKE TOKEN</a>
                    </li>
                    <li class="dropdown" v-if="!tokenHidden">
                      <a href="/claim-token">CLAIM PRESALE</a>
                    </li>
                    <!-- <li class="dropdown" v-if="!tokenHidden">
                      <a href="/wl-staking">ACCESS POOL STAKING</a>
                    </li> -->
                    <li class="dropdown">
                      <a
                        v-on:click="nftsHidden = !nftsHidden"
                        class="header-menu"
                      >
                        NFTS APP ▼
                      </a>
                    </li>
                    <li class="dropdown" v-if="!nftsHidden">
                      <a href="/gachapon">Experimental cloning pod</a>
                    </li>
                    <li class="dropdown" v-if="!nftsHidden">
                      <a href="/nft-staking">NFTs Collect to earn</a>
                    </li>
                    <li class="dropdown" v-if="!nftsHidden">
                      <a href="/marketplace">NFTs Marketplace</a>
                    </li>
                    <li class="dropdown" v-if="!nftsHidden">
                      <a href="/my-collection">My NFTs COLLECTION</a>
                    </li>
                    <li class="dropdown" v-if="!nftsHidden">
                      <a href="/my-mystery-boxs">My Mystery Box</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div
                class="
                  col-xs-12 col-sm-12
                  text-right text-left-xs text-left-sm
                  order-lg-3
                "
              >
                <ul class="menu-horizontal center-menu">
                  <li class="dropdown">
                    <a v-if="hasRegisterActivity" href="/registered">
                      WHITELIST SCORE
                    </a>
                  </li>
                  <li class="dropdown">
                    <a href="/my-mystery-boxs"> Mystery Box </a>
                  </li>
                  <!-- <li class="dropdown">
                    <a href="/my-mystery-boxs"> My Mystery Box </a>
                  </li> -->
                  <li class="dropdown">
                    <div
                      class="w-100"
                      :class="{
                        'show-dropdown': !connectStatus.success,
                        'dropdown-nft': walletAccount,
                      }"
                    >
                      <div class="header-dropdown" style="cursor: pointer">
                        <a
                          href="#"
                          v-if="!walletAccount"
                          @click="connectWallet"
                        >
                          Connect wallet
                        </a>
                        <a
                          v-if="walletAccount"
                          href="#"
                          style="
                            color: #c6fc0e;
                            z-index: 1;
                            position: relative;
                            font-size: 16px;
                          "
                        >
                          {{ shortAddress }}
                        </a>
                      </div>
                      <div class="dropdown-nft-content profile">
                        <!-- <Profile
                          :profile="connectStatus.obj[0]"
                          @disconnect="disconnectWallet"
                          v-if="
                            connectStatus.success &&
                            typeof connectStatus.obj != 'undefined' &&
                            connectStatus.obj[0].email !=
                              walletAccount + '@ecio.space'
                          "
                        /> -->

                        <Sidebar
                          :lkmBalance="inGameLkm"
                          :ecioBalance="inGameEcio"
                          :lkmBalanceUsd="inGameLkmUsd"
                          :ecioBalanceUsd="inGameEcioUsd"
                          :walletAddress="shortAddress"
                          :displayName="displayName"
                          :account="account"
                          style="
                            right: 0;
                            width: 350px;
                            height: 650px;
                            position: absolute;
                            border-radius: 10px;
                          "
                          v-if="
                            connectStatus.success &&
                            typeof connectStatus.obj != 'undefined' &&
                            connectStatus.obj[0].email !=
                              walletAccount + '@ecio.space'
                          "
                        />

                        <CreateAccount
                          :walletAddress="shortAddress"
                          :accessPass="chainId == '0x61' ? accessPass : true"
                          @createAccount="$modal.show('modal-agree')"
                          v-else
                        />
                      </div>
                    </div>
                  </li>

                  <li class="dropdown d-flex flex-row justify-center mt-3">
                    <a href="https://t.me/eciospace" class="mr-3">
                      <svg
                        class="m-auto"
                        width="30"
                        height="40"
                        viewBox="0 0 40 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M18.6563 0H21.1488C21.2526 0.0218059 21.3471 0.0467263 21.4479 0.0643787C22.6816 0.272054 23.9403 0.397698 25.1471 0.714402C32.5104 2.6437 38.2722 8.99025 39.5028 16.4676C39.6223 17.1944 39.7105 17.9213 39.8061 18.6544V21.1465C39.7479 21.62 39.7022 22.0956 39.6306 22.567C38.9576 27.248 36.946 31.2613 33.4534 34.4501C28.4154 39.0491 22.475 40.6949 15.7982 39.3544C10.617 38.316 6.5085 35.5051 3.51232 31.1595C0.46941 26.7475 -0.571204 21.8464 0.292859 16.5631C0.961677 12.4823 2.78535 8.96221 5.6704 6.00907C8.65724 2.95729 12.261 1.04564 16.4712 0.309435C17.1951 0.1786 17.9283 0.099684 18.6563 0ZM19.6304 26.2034C19.7623 26.2958 19.8682 26.3685 19.9721 26.4453C21.4427 27.528 22.9129 28.611 24.3828 29.6944C25.4213 30.4586 26.1618 30.1804 26.4287 28.9239C27.5067 23.8504 28.5819 18.7762 29.6544 13.7014C29.7144 13.4101 29.7284 13.1112 29.6959 12.8156C29.6274 12.2019 29.1268 11.8717 28.5213 12.0098C28.3586 12.0507 28.1989 12.103 28.0436 12.1666C23.4214 13.9471 18.7999 15.7286 14.1791 17.5111C12.4053 18.1954 10.6315 18.8787 8.86494 19.5806C8.50769 19.7229 8.09331 19.9223 8.11616 20.376C8.13901 20.8298 8.58766 20.9482 8.95738 21.0655C10.4363 21.5338 11.9203 21.9855 13.3971 22.4632C13.5217 22.5097 13.6559 22.5245 13.7877 22.5064C13.9195 22.4883 14.0447 22.4377 14.1521 22.3593C17.1383 20.4695 20.1279 18.5852 23.1209 16.7064C23.8105 16.2724 24.498 15.8321 25.1928 15.4053C25.4192 15.2672 25.6633 15.1208 26.0164 15.3763C25.7339 15.6462 25.4753 15.9037 25.2053 16.1478C22.4179 18.6669 19.6315 21.1866 16.8461 23.7071C16.7042 23.8294 16.6082 23.9964 16.574 24.1806C16.4774 25.2637 16.4099 26.3498 16.3351 27.4349C16.3009 27.9468 16.2728 28.4598 16.2417 28.9717L16.3455 29.0755C16.6207 28.9083 16.9323 28.7806 17.1649 28.5667C17.9926 27.8014 18.7944 27.0092 19.6304 26.2034Z"
                          fill="white"
                        />
                      </svg>
                    </a>

                    <a href="https://facebook.com/eciospace" class="mr-3">
                      <svg
                        width="30"
                        height="40"
                        viewBox="0 0 41 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M20.0533 0C9.00835 0 0.0533447 8.955 0.0533447 20C0.0533447 30.0267 7.44001 38.3067 17.0633 39.7533V25.3H12.115V20.0433H17.0633V16.545C17.0633 10.7533 19.885 8.21167 24.6983 8.21167C27.0033 8.21167 28.2233 8.38333 28.8 8.46V13.0483H25.5167C23.4733 13.0483 22.76 14.9867 22.76 17.17V20.0433H28.7483L27.9367 25.3H22.76V39.795C32.5217 38.4717 40.0533 30.125 40.0533 20C40.0533 8.955 31.0983 0 20.0533 0Z"
                          fill="white"
                        />
                      </svg>
                    </a>

                    <a href="https://twitter.com/ECIOspace" class="mr-3">
                      <svg
                        class="m-auto"
                        width="30"
                        height="40"
                        viewBox="0 0 41 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M18.7501 0C19.5838 0 20.4167 0 21.2504 0C21.3506 0.0219181 21.45 0.0563608 21.551 0.0641887C24.5843 0.293546 27.4039 1.1914 30.0434 2.70297C36.9789 6.67484 40.9594 14.7595 39.8236 22.6696C39.0463 28.0873 36.5007 32.5163 32.1664 35.8533C27.7914 39.2224 22.8073 40.5117 17.3388 39.8189C13.6127 39.3469 10.2772 37.8925 7.377 35.5003C3.56795 32.3582 1.19454 28.3542 0.310767 23.4868C0.17691 22.7463 0.102545 21.9964 0 21.2504C0 20.4167 0 19.5838 0 18.7501C0.0571436 18.2742 0.106459 17.7975 0.173779 17.3223C0.735822 13.3403 2.31627 9.81539 4.9848 6.804C8.09482 3.29398 11.9634 1.10843 16.5936 0.301374C17.3082 0.17691 18.0315 0.0994142 18.7501 0ZM11.5422 22.095C12.3141 24.0669 13.7137 25.0939 15.8123 25.3115C13.7912 26.8129 11.6174 27.4117 9.14063 27.2043C9.27448 27.3045 9.34728 27.3726 9.43104 27.4195C13.525 29.7186 17.7756 29.9847 21.9517 27.8837C26.7322 25.479 28.9679 21.3451 29.1315 16.0511C29.1417 15.7239 29.2129 15.5117 29.4861 15.3067C30.2141 14.7595 30.8231 14.0918 31.3421 13.3176C30.5358 13.536 29.7616 13.7458 28.9875 13.9556C28.9718 13.9203 28.9569 13.8851 28.9413 13.8507C29.789 13.2518 30.4254 12.4964 30.7793 11.4373C30.6039 11.5242 30.4951 11.59 30.3785 11.6338C29.663 11.9039 28.9436 12.1638 28.2297 12.4377C27.9902 12.5293 27.8336 12.4612 27.6442 12.2921C26.2712 11.0663 24.6806 10.7297 22.9631 11.3591C21.23 11.9947 20.2273 13.2941 19.9924 15.1352C19.9282 15.6401 19.983 16.1599 19.983 16.6992C16.1959 16.4315 13.0804 14.8205 10.5723 11.8906C9.47801 14.3211 9.93907 16.3266 11.9861 18.0668C11.5532 17.9838 11.2291 17.9447 10.9191 17.857C10.599 17.767 10.2921 17.63 9.9743 17.5118C9.82635 19.4186 11.0913 21.0492 13.4475 22.0958C12.8377 22.095 12.2256 22.095 11.5422 22.095Z"
                          fill="white"
                        />
                      </svg>
                    </a>

                    <a href="https://medium.com/@EcioOfficial" class="mr-3">
                      <svg
                        class="m-auto"
                        width="30"
                        height="40"
                        viewBox="0 0 40 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M20 0C8.95469 0 0 8.95391 0 20C0 31.0453 8.95469 40 20 40C31.0453 40 40 31.0453 40 20C40 8.95391 31.0453 0 20 0ZM31.2844 11.4656C30.6672 12.0523 30.0438 12.6328 29.4383 13.232C29.3414 13.3273 29.2805 13.5055 29.2805 13.6445C29.2727 17.8906 29.2719 22.1367 29.2828 26.3828C29.2836 26.5391 29.3711 26.7297 29.4812 26.8438C29.9867 27.3664 30.5078 27.8742 31.0383 28.3719C31.207 28.5305 31.2805 28.6914 31.2188 28.9305C28.293 28.9305 25.3602 28.9305 22.4141 28.9305C22.3727 28.7367 22.3766 28.5789 22.5461 28.4211C23.1 27.9063 23.6344 27.3695 24.182 26.8477C24.3367 26.7 24.4031 26.5336 24.4031 26.3203C24.4 22.9852 24.4008 19.6492 24.4008 16.3141C24.4008 16.2734 24.3969 16.232 24.3563 16.1805C24.3281 16.2422 24.2977 16.3023 24.2727 16.3648C22.6539 20.4648 21.0344 24.5641 19.4219 28.6664C19.3453 28.8602 19.2477 28.9094 19.0445 28.9258C18.7312 28.9516 18.5875 28.8391 18.4625 28.5539C17.9961 27.4852 17.4977 26.4305 17.0102 25.3703C15.6297 22.3633 14.2484 19.357 12.868 16.35C12.8375 16.2844 12.8055 16.2195 12.7281 16.1578C12.7281 16.232 12.7281 16.3062 12.7281 16.3805C12.7281 19.0844 12.7406 21.7875 12.7172 24.4914C12.7125 25.0453 12.868 25.475 13.2273 25.8867C13.9273 26.6891 14.5852 27.5273 15.2727 28.3406C15.418 28.5125 15.4484 28.6813 15.4023 28.8977C13.1781 28.8977 10.957 28.8977 8.73516 28.8977C8.68203 28.6813 8.72891 28.5148 8.87109 28.3461C9.62266 27.4523 10.3609 26.5469 11.1063 25.6484C11.2961 25.4195 11.4055 25.1648 11.4047 24.8641C11.4 23.5711 11.3953 22.2781 11.3945 20.9852C11.393 18.8914 11.3937 16.7977 11.3953 14.7039C11.3953 14.4422 11.3078 14.2227 11.1383 14.0219C10.4523 13.207 9.76875 12.3898 9.09922 11.5617C9.01172 11.4539 9.0125 11.2742 8.95938 11.0836C9.09844 11.0836 9.16953 11.0836 9.24063 11.0836C11.268 11.0836 13.2961 11.0859 15.3234 11.0789C15.493 11.0781 15.5641 11.1422 15.6297 11.2859C17.2422 14.8234 18.8594 18.3594 20.4758 21.8953C20.5094 21.968 20.5445 22.0398 20.5945 22.1437C20.6398 22.0375 20.675 21.9602 20.7063 21.8812C22.1172 18.3695 23.5305 14.8586 24.9344 11.3438C25.0156 11.1398 25.1133 11.0766 25.3312 11.0773C27.2266 11.0875 29.1219 11.0836 31.0172 11.082C31.1047 11.082 31.1922 11.0719 31.2797 11.0664C31.2844 11.2008 31.2844 11.3328 31.2844 11.4656Z"
                          fill="white"
                        />
                      </svg>
                    </a>

                    <a
                      href="https://discord.com/invite/erTeN54MHf"
                      class="mr-3"
                    >
                      <svg
                        width="30"
                        height="40"
                        viewBox="0 0 41 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M40.1227 19.903C40.1227 30.8952 31.2118 39.8061 20.2197 39.8061C9.22755 39.8061 0.31665 30.8952 0.31665 19.903C0.31665 8.9109 9.22755 0 20.2197 0C31.2118 0 40.1227 8.9109 40.1227 19.903ZM23.1759 11.6722C24.6926 11.9344 26.1689 12.3923 27.5677 13.0344C27.5798 13.0394 27.5898 13.0485 27.5958 13.0601C30.0324 16.6441 31.2358 20.6869 30.7859 25.3412C30.7851 25.351 30.7821 25.3604 30.7773 25.369C30.7724 25.3776 30.7658 25.385 30.7579 25.3908C29.1272 26.5991 27.3022 27.5202 25.3616 28.1143C25.3479 28.1185 25.3332 28.1183 25.3196 28.1137C25.306 28.1091 25.2942 28.1003 25.2859 28.0886C24.8755 27.519 24.5074 26.9201 24.1845 26.2966C24.1801 26.288 24.1775 26.2786 24.177 26.2689C24.1764 26.2593 24.1779 26.2496 24.1814 26.2405C24.1848 26.2315 24.1902 26.2233 24.197 26.2164C24.2038 26.2096 24.2121 26.2042 24.2211 26.2008C24.804 25.9815 25.3673 25.7135 25.9051 25.3994C25.9148 25.3936 25.923 25.3854 25.9288 25.3757C25.9347 25.366 25.9381 25.3549 25.9386 25.3436C25.9392 25.3323 25.937 25.3209 25.9322 25.3107C25.9274 25.3004 25.9201 25.2914 25.911 25.2846C25.7971 25.1999 25.6839 25.1108 25.5759 25.0218C25.5662 25.0138 25.5543 25.0088 25.5418 25.0073C25.5294 25.0058 25.5167 25.0078 25.5053 25.0132C22.0158 26.6254 18.1929 26.6254 14.6617 25.0132C14.6504 25.0081 14.6379 25.0063 14.6255 25.008C14.6132 25.0097 14.6016 25.0147 14.592 25.0226C14.484 25.1117 14.3709 25.1999 14.2577 25.2846C14.2487 25.2915 14.2415 25.3005 14.2368 25.3108C14.232 25.3212 14.2299 25.3325 14.2306 25.3438C14.2312 25.3552 14.2347 25.3662 14.2406 25.3759C14.2465 25.3855 14.2548 25.3936 14.2646 25.3994C14.8035 25.7108 15.3663 25.9791 15.9477 26.2016C15.9567 26.2049 15.965 26.2101 15.9719 26.2169C15.9788 26.2236 15.9842 26.2317 15.9877 26.2407C15.9912 26.2497 15.9928 26.2593 15.9924 26.269C15.9919 26.2786 15.9894 26.288 15.9851 26.2966C15.6675 26.9235 15.2989 27.5232 14.8829 28.0895C14.8743 28.1009 14.8624 28.1093 14.8489 28.1138C14.8354 28.1182 14.8208 28.1184 14.8072 28.1143C12.8699 27.5182 11.0481 26.5973 9.41938 25.3908C9.41156 25.3847 9.40504 25.3771 9.40022 25.3684C9.3954 25.3597 9.39237 25.3502 9.39131 25.3403C9.01541 21.3146 9.78169 17.2383 12.5789 13.0593C12.5858 13.0482 12.5958 13.0395 12.6078 13.0344C14.0065 12.3918 15.4828 11.9339 16.9997 11.6722C17.0134 11.6701 17.0275 11.6721 17.0401 11.678C17.0527 11.684 17.0632 11.6936 17.0703 11.7056C17.2759 12.0696 17.4613 12.4446 17.6257 12.8289C19.2605 12.5806 20.9235 12.5806 22.5584 12.8289C22.7217 12.4455 22.9042 12.0706 23.1053 11.7056C23.112 11.6933 23.1225 11.6835 23.1352 11.6775C23.1478 11.6715 23.1621 11.6697 23.1759 11.6722ZM14.5733 20.7144C14.5733 21.913 15.4493 22.889 16.5124 22.889C17.5925 22.889 18.4515 21.913 18.4515 20.7144C18.4685 19.5243 17.601 18.5397 16.5124 18.5397C15.4323 18.5397 14.5733 19.5157 14.5733 20.7144ZM21.7428 20.7144C21.7428 21.913 22.6188 22.889 23.6819 22.889C24.7705 22.889 25.621 21.913 25.621 20.7144C25.638 19.5243 24.7705 18.5397 23.6819 18.5397C22.6018 18.5397 21.7428 19.5157 21.7428 20.7144Z"
                          fill="white"
                        />
                      </svg>
                    </a>

                    <a href="https://youtu.be/Y1YxWJ8DWDA" class="mr-3">
                      <svg
                        class="m-auto"
                        width="30"
                        height="40"
                        viewBox="0 0 40 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M19.903 0C15.9666 4.28528e-06 12.1185 1.1673 8.84546 3.35428C5.57243 5.54126 3.02143 8.64969 1.51502 12.2865C0.00861144 15.9233 -0.38552 19.9251 0.382447 23.7859C1.15041 27.6468 3.04595 31.1931 5.82945 33.9766C8.61294 36.7601 12.1594 38.6557 16.0202 39.4237C19.881 40.1916 23.8828 39.7975 27.5196 38.291C31.1564 36.7846 34.2648 34.2336 36.4518 30.9606C38.6388 27.6875 39.8061 23.8395 39.8061 19.903C39.8061 17.2893 39.2912 14.7012 38.291 12.2865C37.2908 9.87171 35.8248 7.67761 33.9766 5.82944C32.1284 3.98128 29.9343 2.51524 27.5196 1.51502C25.1048 0.5148 22.5167 -5.12149e-06 19.903 0ZM29.2061 20.7295C29.1979 21.743 29.1355 22.7553 29.019 23.7621C29.019 23.7621 28.8355 25.0532 28.274 25.6221C27.777 26.1234 27.1025 26.4087 26.3966 26.4159C23.7741 26.6055 19.8368 26.6113 19.8368 26.6113C19.8368 26.6113 14.9652 26.5668 13.4657 26.4229C13.0487 26.3449 12.1124 26.3681 11.3996 25.6221C10.838 25.0532 10.6552 23.7621 10.6552 23.7621C10.5383 22.7553 10.4757 21.743 10.4675 20.7295V19.3076C10.4757 18.2941 10.5383 17.2818 10.6552 16.2751C10.6552 16.2751 10.838 14.9839 11.3996 14.4153C11.8965 13.9138 12.5711 13.6285 13.2771 13.6215C15.8994 13.432 19.8329 13.432 19.8329 13.432H19.8408C19.8408 13.432 23.7741 13.432 26.3966 13.6215C27.1025 13.6285 27.7772 13.9138 28.274 14.4153C28.8355 14.9839 29.019 16.2751 29.019 16.2751C29.1355 17.2819 29.1979 18.2942 29.2061 19.3076V20.7295Z"
                          fill="white"
                        />
                        <path
                          d="M17.8718 22.7463L23.5584 19.9133L17.8718 17.0597V22.7463Z"
                          fill="white"
                        />
                      </svg>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>

        <nav
          id="menu2"
          class="
            bar bar-2
            hidden-xs hidden-sm hidden-md
            bar--transparent bar--absolute
            bg--dark
          "
        >
          <div class="container">
            <!-- <div class="background-image-holder center" style="border-radius: 15px; width : 91%; margin: 15px 35px 0px 60px; height: 70px; z-index: -1;" >
              <img alt="background" src="../../assets/webv3/tab/Vector2.png" />
            </div> -->
            <div style="width: 104%; margin-left: -3%">
              <img alt="background" src="../../assets/webv3/tab/header.png" />
            </div>
            <div class="row" style="margin-top: -4.3%">
              <div class="col-lg-1 order-lg-1" style="padding-left: 0px">
                <a href="/">
                  <svg
                    class="hidden-xs hidden-sm hidden-md"
                    width="100px"
                    height="46"
                    viewBox="0 0 183 46"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M113.862 45.5704V3.05176e-05H125.253V45.5704H113.862Z"
                      fill="white"
                    />
                    <path
                      d="M56.9316 3.05176e-05V17.0884L85.4114 45.5704H102.5L68.3231 11.3915H91.1083V16.1886H102.5V11.3915V9.77102V3.05176e-05H56.9316Z"
                      fill="white"
                    />
                    <path d="M45.5888 0H0V11.3915H45.5888V0Z" fill="white" />
                    <path
                      d="M45.5888 28.4802V17.0887H11.3915V11.3918L0 18.9043V35.8755L11.3915 45.5708H45.5888V34.177H11.3915V28.4802H45.5888Z"
                      fill="white"
                    />
                    <path
                      d="M136.622 3.05176e-05V45.5704H170.799L182.19 34.179V0.00232803H136.622V3.05176e-05ZM148.016 11.3915H170.801V31.0872L167.712 34.1767H148.016V11.3915Z"
                      fill="white"
                    />
                  </svg>
                </a>
              </div>

              <div class="col-xs-12 col-sm-12 col-lg-8 col-xl-11 order-lg-2">
                <div class="bar__module ml-3 mt-1">
                  <ul class="menu-horizontal text-center">
                    <li class="dropdown">
                      <a
                        class="header-menu"
                        href="https://ecio-space.gitbook.io/ecio-white-paper/"
                      >
                        WHITEPAPER
                      </a>
                    </li>
                    <!-- <li class="dropdown">
                      <a class="header-menu" href="/claim-token">
                        CLAIM PRESALE
                      </a>
                    </li> -->
                    <li class="dropdown">
                      <a class="header-menu" href="/alpha-pass"> ALPHA PASS </a>
                    </li>
                    <li class="dropdown">
                      <div class="dropdown-nft">
                        <span class="header-dropdown" style="cursor: pointer">
                          TOKEN APP ▼
                        </span>
                        <div class="dropdown-nft-content">
                          <ul style="background-color: #5100ff">
                            <li align="left">
                              <a
                                href="https://pancakeswap.finance/swap?outputCurrency=0x327a3e880bf2674ee40b6f872be2050ed406b021"
                                target="_blank"
                                >BUY $ECIO</a
                              >
                            </li>
                            <li align="left">
                              <a href="/staking">STAKE TOKEN</a>
                            </li>
                            <li align="left">
                              <a href="/claim-token">CLAIM PRESALE</a>
                            </li>
                            <!-- <li class="left">
                      <a href="/wl-staking">ACCESS POOL STAKING</a>
                    </li> -->
                          </ul>
                        </div>
                      </div>
                    </li>

                    <li class="dropdown">
                      <div class="dropdown-nft right-margin">
                        <span class="header-dropdown" style="cursor: pointer">
                          NFTS APP ▼
                        </span>
                        <div class="dropdown-nft-content">
                          <ul style="background-color: #5100ff">
                            <li align="left">
                              <a href="/gachapon">Experimental cloning pod</a>
                            </li>
                            <li align="left">
                              <a href="/nft-staking">NFTs Collect to earn</a>
                            </li>
                            <li align="left">
                              <a href="/marketplace">NFTs Marketplace</a>
                            </li>
                            <li align="left">
                              <a href="/my-collection">My NFTs COLLECTION</a>
                            </li>
                            <li align="left">
                              <a href="/my-mystery-boxs">My Mystery Box</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </li>

                    <!-- <li class="dropdown">
                      <a class="header-menu" href="/marketplace">MARKETPLACE</a>
                    </li>
                    <li class="dropdown">
                      <a class="header-menu" href="/staking">STAKING</a>
                    </li>

                    <li class="dropdown" style="margin-right : 55px;">
                      <a class="header-menu" href="/my-mystery-boxs"
                        >My Mystery Box</a
                      >
                    </li> -->

                    <li
                      class="dropdown justify-center header-wallet"
                      style="margin-right: 65px"
                    >
                      <div
                        class="background-image-holder"
                        style="
                          margin-left: -14%;
                          margin-top: -4%;
                          z-index: 0;
                          height: 35px;
                          width: 118px;
                        "
                      >
                        <img
                          alt="background"
                          src="../../assets/webv3/tab/playbutton.png"
                        />
                      </div>
                      <a
                        href="http://ecio.azurewebsites.net/"
                        class="mr-3"
                        style="
                          z-index: 1;
                          color: #ff00b1;
                          font-size: 16px;
                          position: relative;
                        "
                      >
                        PLAY DEMO
                      </a>
                    </li>

                    <li class="dropdown justify-center header-wallet">
                      <div
                        class=""
                        :class="{
                          'dropdown-nft': walletAccount,
                        }"
                      >
                        <div class="header-dropdown" style="cursor: pointer">
                          <div
                            class="background-image-holder"
                            style="
                              margin-left: -38%;
                              margin-top: -4%;
                              z-index: 0;
                              height: 35px;
                              width: 185px;
                            "
                          >
                            <img
                              alt="background"
                              src="@/assets/webv3/tab/connectbutton.png"
                            />
                          </div>
                          <a
                            href="#"
                            v-if="!walletAccount"
                            @click="connectWallet"
                            style="
                              color: #c6fc0e;
                              z-index: 1;
                              position: relative;
                              right: 10px;
                              font-size: 14px;
                            "
                          >
                            Connect wallet
                          </a>
                          <a
                            v-if="walletAccount"
                            href="#"
                            style="
                              color: #c6fc0e;
                              z-index: 1;
                              position: relative;
                              font-size: 16px;
                            "
                          >
                            {{ shortAddress }}
                          </a>
                        </div>
                        <div class="dropdown-nft-content head profile">
                          <div
                            class="d-flex justify-content-center"
                            style="margin: 0 auto; min-height: 150px"
                          >
                            <span
                              v-if="loading"
                              class="spinner-border"
                              style="position: relative; top: 50%; z-index: 9"
                              role="status"
                            ></span>
                            <div v-else>
                              <!-- <Profile
                                :profile="connectStatus.obj[0]"
                                @disconnect="disconnectWallet"
                                v-if="
                                  connectStatus.success &&
                                  typeof connectStatus.obj != 'undefined' &&
                                  connectStatus.obj[0].email !=
                                    walletAccount + '@ecio.space'
                                "
                              /> -->
                              <Sidebar
                                :lkmBalance="inGameLkm"
                                :ecioBalance="inGameEcio"
                                :lkmBalanceUsd="inGameLkmUsd"
                                :ecioBalanceUsd="inGameEcioUsd"
                                :walletAddress="shortAddress"
                                :displayName="displayName"
                                :account="account"
                                style="
                                  right: 0;
                                  width: 350px;
                                  height: 650px;
                                  position: absolute;
                                  border-radius: 10px;
                                "
                                v-if="
                                  connectStatus.success &&
                                  typeof connectStatus.obj != 'undefined' &&
                                  connectStatus.obj[0].email !=
                                    walletAccount + '@ecio.space'
                                "
                              />

                              <CreateAccount
                                :walletAddress="shortAddress"
                                :accessPass="
                                  chainId == '0x61' ? accessPass : true
                                "
                                @createAccount="$modal.show('modal-signup')"
                                v-else
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <!-- <div
                class="
                  col-xs-12 col-sm-12 col-lg-6
                  text-right text-left-xs text-left-sm
                  order-lg-3
                "
              >
                <ul class="menu-horizontal right-menu mt-1">
                  <li class="dropdown">
                    <a v-if="hasRegisterActivity" href="/registered">
                      WHITELIST SCORE
                    </a>
                  </li>

                  <li class="dropdown">
                    <a class="header-menu" href="/staking">STAKING</a>
                  </li>

                  <li class="dropdown">
                    <a class="header-menu" href="/my-mystery-boxs"
                      >My Mystery Box</a
                    >
                  </li>

                  <li class="dropdown d-flex flex-row justify-center">
                    <div
                      class="background-image-holder"
                      style="
                        margin-left: -14%;
                        margin-top: -4%;
                        z-index: 0;
                        height: 35px;
                        width: 118px;
                      "
                    >
                      <img
                        alt="background"
                        src="../../assets/webv3/tab/playbutton.png"
                      />
                    </div>
                    <a
                      href="http://ecio.azurewebsites.net/"
                      class="mr-3"
                      style="z-index: 1; color: #ff00b1; font-size: 16px"
                    >
                      PLAY DEMO
                    </a>
                  </li>

                  <li class="dropdown d-flex flex-row justify-center">
                    <div
                      class=""
                      :class="{
                        'show-dropdown': !connectStatus.success,
                        'dropdown-nft': walletAccount,
                      }"
                    >
                      <div class="header-dropdown" style="cursor: pointer">
                        <div
                          class="background-image-holder"
                          style="
                            margin-left: -38%;
                            margin-top: -4%;
                            z-index: 0;
                            height: 35px;
                            width: 185px;
                          "
                        >
                          <img
                            alt="background"
                            src="@/assets/webv3/tab/connectbutton.png"
                          />
                        </div>
                        <a
                          href="#"
                          v-if="!walletAccount"
                          @click="connectWallet"
                          style="
                            color: #c6fc0e;
                            z-index: 1;
                            position: relative;
                            right: 10px;
                          "
                        >
                          Connect wallet
                        </a>
                        <a
                          v-if="walletAccount"
                          href="#"
                          style="
                            color: #c6fc0e;
                            z-index: 1;
                            position: relative;
                            font-size: 16px;
                          "
                        >
                          {{ shortAddress }}
                        </a>
                      </div>
                      <div class="dropdown-nft-content">
                        <Profile
                          :profile="connectStatus.obj[0]"
                          @disconnect="disconnectWallet"
                          v-if="connectStatus.status"
                        />
                        <CreateAccount
                          :walletAddress="shortAddress"
                          @createAccount="$modal.show('modal-agree')"
                          v-else
                        />
                      </div>
                    </div>
                  </li>
                </ul>
              </div> -->
            </div>
          </div>
        </nav>
      </div>
    </div>
    <modalSignUp
      :walletAddress="walletAccount"
      :referCode="refer.code"
      :referName="refer.name"
      :accept="accept"
      :userId="
        typeof connectStatus.obj != 'undefined'
          ? connectStatus.obj[0].id.toString()
          : ''
      "
      @connectWallet="connectWallet"
      @setAgree="(e) => (accept = e)"
      @switchModal="switchModal"
      @setEmail="(e) => (emailModal = e)"
    />
    <modalVerify
      type="create"
      :email="emailModal"
      :address="walletAccount"
      @switchModal="switchModal"
      @setType="(e) => (type = e)"
      @resetEmail="(e) => $store.commit('setEmail', '')"
      @verifyEmail="verifyFunc"
    />
    <modalAgree
      :accept="accept"
      @switchModal="switchModal"
      @setAgree="(e) => (accept = e)"
    />
    <modalSuccess
      :address="walletAccount"
      @switchModal="switchModal"
      @LinkDone="connectWallet"
    />
    <modalRefer
      :profile="
        typeof connectStatus.obj != 'undefined' ? connectStatus.obj[0] : {}
      "
    />
    <modalForgotPassword />
    <modalResetPassword />
  </div>
</template>

<script>
import mautic from "mautic-tracking";
mautic.initialize("https://mt.ecio.space/mtc.js");
// import Profile from "@/components/NavProfile";
import Sidebar from "@/components/Sidebar/SidebarProfile";
import CreateAccount from "@/components/NavCreateAccount";
import modalSignUp from "@/components/Modal/ModalSignup";
import modalAgree from "@/components/Modal/ModalAgreement";
import modalSuccess from "@/components/Modal/ModalLinkSuccess";
import modalVerify from "@/components/Modal/ModalVerify";
import modalRefer from "@/components/Modal/ModalReferalLink";
import modalForgotPassword from "@/components/Modal/ModalForgotPassword";
import modalResetPassword from "@/components/Modal/ModalResetPassword";
import axios from "axios";
import Web3 from "web3";
export default {
  components: {
    Sidebar,
    CreateAccount,
    modalSignUp,
    modalAgree,
    modalSuccess,
    modalVerify,
    modalRefer,
    modalForgotPassword,
    modalResetPassword,
  },
  computed: {
    emailModal() {
      return this.$store.state.emailSignup;
    },
    //ตัด address ให้เป็นรูปแบบสั้น
    shortAddress() {
      return "".concat(
        this.walletAccount.substring(0, 5),
        "...",
        this.walletAccount.slice(-4)
      );
    },
  },
  data() {
    return {
      type: "link",
      currentActivityId: 1,
      hasRegisterActivity: false,
      walletAccount: "",
      accept: false,
      contract: undefined,
      connectStatus: {
        success: true,
      },
      refer: {
        name: "",
        code: "",
      },
      dropdown: true,
      baseUrl: process.env.VUE_APP_API_GATEWAY,
      chainId: process.env.VUE_APP_CHAIN_ID,
      nftsHidden: true,
      tokenHidden: true,
      loading: true,
      goldAccount: false,
      silverAccount: false,
      bronzeAccount: false,
      specialAccount: false,
      accessPass: false,
      account: ""
    };
  },
  // name: "Navbar",
  async mounted() {
    var that = this;
    window.web3 = new Web3(window.ethereum);
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
      // this.checkSpecialPass();
    });

    window.ethereum.on("connected", () => {
      that.$emit("connected", window.ethereum.selectedAddress);
      // this.checkSpecialPass();
    });

    if (window.ethereum.selectedAddress != "") {
      that.connectWallet();
      // that.checkSpecialPass();
    }
  },
  methods: {
    async checkConnectWallet() {
      console.log(this.walletAccount);
      this.loading = true;
      let res = await axios
        .post(`${this.baseUrl}check/wallet`, { wallet: this.walletAccount })
        .then((res) => {
          return res.data;
        })
        .catch((e) => {
          console.log("wallet error: ", e);
          return {
            success: false,
          };
        });
      this.dropdown = res.success;
      this.connectStatus = res;
      if (typeof this.$route.query.refer != "undefined" && !res.success) {
        this.$modal.show("modal-signup");
      }
    },
    async switchModal(open, close) {
      this.$modal.hide(close);
      this.$modal.show(open);
    },

    async verifyFunc(email, code) {
      console.log("verifyEmail", email, code);
      this.$modal.hide("modal-verify");
      this.$modal.show("modal-success");
    },
    async connectWallet() {
      if (this.validated()) {
        this.switchNetwork();

        await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        console.log(
          "window.ethereum.selectedAddress",
          window.ethereum.selectedAddress
        );
        let accounts = await window.web3.eth.getAccounts();
        if (accounts.length > 0) {
          console.log("accounts", accounts);
          this.walletAccount = accounts[0];
          this.acoount = accounts[0];
          // this.checkSpecialPass();
        } else {
          this.walletAccount = window.ethereum.selectedAddress;
          // this.checkSpecialPass();
        }
        mautic.pageView({
          walletaddress: window.ethereum.selectedAddress,
          firstname: window.ethereum.selectedAddress,
        });
        await this.checkConnectWallet().then(() => this.checkSpecialPass());
      }
    },
    async disconnectWallet() {
      if (this.validated()) {
        await window.ethereum.request({
          method: "wallet_requestPermissions",
          params: [
            {
              eth_accounts: {},
            },
          ],
        });

        this.walletAccount = "";

        mautic.pageView({
          walletaddress: "",
          firstname: "",
        });
      }
    },
    validated() {
      if (typeof window.ethereum !== "undefined") {
        //console.log("MetaMask is installed!");
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
    async checkSpecialPass() {
      if (this.chainId == "0x61") {
        axios
          .get(
            process.env.VUE_APP_API_ALPHA_ENDPOINT +
              "/api/alphaplay/" +
              this.walletAccount
          )
          .then((response) => {
            if (response.data.rank) {
              this.specialAccount = true;
              this.accessPass = true;
            }
            if (response.data.gold) {
              this.goldAccount = true;
              this.accessPass = true;
            }
            if (response.data.silver) {
              this.silverAccpint = true;
              this.accessPass = true;
            }
            if (response.data.bronze) {
              this.bronzeAccount = true;
              this.accessPass = true;
            }
            this.loading = false;
          });
      } else {
        this.loading = false;
      }
    },
  },
};
</script>

<style>
.dropdown {
  vertical-align: middle;
}
.menu-horizontal.right-menu {
  display: flex;
  justify-content: flex-end;
}

.menu-horizontal.center-menu {
  display: block;
  justify-content: center;
  text-align: center;
}

.menu-horizontal.menu1 {
  margin-top: 30px;
}

.my-dropdown-toggle {
  border-radius: 5px;
}
::v-deep .dropdown-toggle {
  color: tomato;
  font-size: 25px;
  font-weight: 800;
}

::v-deep .dropdown-toggle-placeholder {
  color: #c4c4c4;
}

.nav-container {
  background: white;
}

.dropdown-nft {
  position: relative;
  display: inline-block;
}

.dropdown-nft-content {
  display: none;
  position: absolute;
  background-color: #222326;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  /* padding: 12px 16px; */
  z-index: 1;
  border-radius: 5px;
}
.dropdown-nft-content ul {
  z-index: 1000;
  min-width: 10rem;
  padding: 0.5rem 0;
  margin: 0;
  font-size: 1rem;
  color: #212529;
  text-align: left;
  list-style: none;
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 0.25rem;
}
.dropdown-nft-content li {
  display: block;
  width: 100%;
  padding: 0.5rem 1rem;
  clear: both;
  font-weight: 400;
  color: #212529;
  text-align: inherit;
  text-decoration: none;
  white-space: nowrap;
  background-color: transparent;
  border: 0;
}
.dropdown-nft-content li:hover {
  cursor: pointer;
  background-color: #222326;
}

.dropdown-nft:hover .dropdown-nft-content,
.dropdown-nft.show-dropdown .dropdown-nft-content {
  display: flex;
}

.header-dropdown {
  color: white !important;
}

.header-menu {
  color: white !important;
  font-size: 17px;
}

.header-wallet {
  display: inherit !important;
}
.header-small {
  display: none !important;
}

@media (max-width: 500px) {
  .dropdown-nft-content {
    min-width: 100%;
    left: 0;
    right: 0;
  }
}
.right-margin {
  margin-right: 215px;
}

@media (max-width: 1280px) {
  .header-menu {
    font-size: 13px;
  }
  .header-wallet {
    display: none !important;
  }
  .header-small {
    display: inherit !important;
  }
  .right-margin {
    margin-right: 170px;
  }
}

.header-menu:hover {
  color: #e0fb16 !important;
}
</style>
