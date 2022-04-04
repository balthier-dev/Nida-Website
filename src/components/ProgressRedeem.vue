<template>
  <div>
    <div class="bg-card-redeem p-10">
      <h1 style="font-size: 1.8rem">PENDING TRANSACTION {{ onProgress }}</h1>

      <div class="one-element">
        <img src="../assets/cards/bg-mystery-box.jpg" alt="Image" />
        <div class="overlay">
          <span class="description flex gap-5">
            <div class="lds-ring-progress" v-if="onProgress === 1">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>

            <svg
              v-else-if="onProgress > 1"
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 0C6.72909 0 0 6.72909 0 15C0 23.2709 6.72909 30 15 30C23.2709 30 30 23.2709 30 15C30 6.72909 23.2709 0 15 0ZM22.8065 9.97284L13.1142 21.5113C13.0079 21.6379 12.8756 21.7402 12.7263 21.8113C12.577 21.8823 12.4141 21.9205 12.2488 21.9231H12.2293C12.0676 21.923 11.9077 21.889 11.76 21.8231C11.6123 21.7573 11.48 21.6611 11.3719 21.5409L7.21803 16.9255C7.11254 16.8136 7.03047 16.6817 6.97666 16.5377C6.92285 16.3936 6.89838 16.2403 6.90469 16.0866C6.911 15.933 6.94795 15.7821 7.01339 15.643C7.07882 15.5038 7.17142 15.3791 7.28572 15.2763C7.40003 15.1734 7.53375 15.0944 7.67902 15.044C7.82429 14.9935 7.97817 14.9726 8.13163 14.9825C8.2851 14.9923 8.43504 15.0328 8.57264 15.1014C8.71025 15.1701 8.83275 15.2655 8.93293 15.3822L12.199 19.0111L21.0397 8.4887C21.238 8.25943 21.5185 8.11741 21.8207 8.09333C22.1229 8.06925 22.4224 8.16505 22.6545 8.36002C22.8866 8.555 23.0327 8.83348 23.0611 9.13527C23.0896 9.43707 22.9981 9.73793 22.8065 9.97284Z"
                fill="#E0FB16"
              />
            </svg>

            <svg
              v-else-if="onProgress < 1"
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="15" cy="15" r="15" fill="white" />
            </svg>

            <div>Confirming Transaction</div>
          </span>
          <span class="description flex gap-5">
            <div class="lds-ring-progress" v-if="onProgress === 2">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>

            <svg
              v-else-if="onProgress > 2"
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 0C6.72909 0 0 6.72909 0 15C0 23.2709 6.72909 30 15 30C23.2709 30 30 23.2709 30 15C30 6.72909 23.2709 0 15 0ZM22.8065 9.97284L13.1142 21.5113C13.0079 21.6379 12.8756 21.7402 12.7263 21.8113C12.577 21.8823 12.4141 21.9205 12.2488 21.9231H12.2293C12.0676 21.923 11.9077 21.889 11.76 21.8231C11.6123 21.7573 11.48 21.6611 11.3719 21.5409L7.21803 16.9255C7.11254 16.8136 7.03047 16.6817 6.97666 16.5377C6.92285 16.3936 6.89838 16.2403 6.90469 16.0866C6.911 15.933 6.94795 15.7821 7.01339 15.643C7.07882 15.5038 7.17142 15.3791 7.28572 15.2763C7.40003 15.1734 7.53375 15.0944 7.67902 15.044C7.82429 14.9935 7.97817 14.9726 8.13163 14.9825C8.2851 14.9923 8.43504 15.0328 8.57264 15.1014C8.71025 15.1701 8.83275 15.2655 8.93293 15.3822L12.199 19.0111L21.0397 8.4887C21.238 8.25943 21.5185 8.11741 21.8207 8.09333C22.1229 8.06925 22.4224 8.16505 22.6545 8.36002C22.8866 8.555 23.0327 8.83348 23.0611 9.13527C23.0896 9.43707 22.9981 9.73793 22.8065 9.97284Z"
                fill="#E0FB16"
              />
            </svg>

            <svg
              v-else-if="onProgress < 2"
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="15" cy="15" r="15" fill="white" />
            </svg>

            <div>Waiting for Block Confirmation</div>
          </span>
          <span class="description flex gap-5">
            <div>
              <div class="lds-ring-progress" v-if="onProgress === 3">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>

              <svg
                v-else-if="onProgress > 3"
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 0C6.72909 0 0 6.72909 0 15C0 23.2709 6.72909 30 15 30C23.2709 30 30 23.2709 30 15C30 6.72909 23.2709 0 15 0ZM22.8065 9.97284L13.1142 21.5113C13.0079 21.6379 12.8756 21.7402 12.7263 21.8113C12.577 21.8823 12.4141 21.9205 12.2488 21.9231H12.2293C12.0676 21.923 11.9077 21.889 11.76 21.8231C11.6123 21.7573 11.48 21.6611 11.3719 21.5409L7.21803 16.9255C7.11254 16.8136 7.03047 16.6817 6.97666 16.5377C6.92285 16.3936 6.89838 16.2403 6.90469 16.0866C6.911 15.933 6.94795 15.7821 7.01339 15.643C7.07882 15.5038 7.17142 15.3791 7.28572 15.2763C7.40003 15.1734 7.53375 15.0944 7.67902 15.044C7.82429 14.9935 7.97817 14.9726 8.13163 14.9825C8.2851 14.9923 8.43504 15.0328 8.57264 15.1014C8.71025 15.1701 8.83275 15.2655 8.93293 15.3822L12.199 19.0111L21.0397 8.4887C21.238 8.25943 21.5185 8.11741 21.8207 8.09333C22.1229 8.06925 22.4224 8.16505 22.6545 8.36002C22.8866 8.555 23.0327 8.83348 23.0611 9.13527C23.0896 9.43707 22.9981 9.73793 22.8065 9.97284Z"
                  fill="#E0FB16"
                />
              </svg>

              <svg
                v-else-if="onProgress < 3"
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="15" cy="15" r="15" fill="white" />
              </svg>
            </div>
            <div>Generating Random Numbers with Chainlink</div>
          </span>

          <span class="description flex gap-5">
            <div>
              <div class="lds-ring-progress" v-if="onProgress === 4">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>

              <svg
                v-else-if="onProgress > 4"
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 0C6.72909 0 0 6.72909 0 15C0 23.2709 6.72909 30 15 30C23.2709 30 30 23.2709 30 15C30 6.72909 23.2709 0 15 0ZM22.8065 9.97284L13.1142 21.5113C13.0079 21.6379 12.8756 21.7402 12.7263 21.8113C12.577 21.8823 12.4141 21.9205 12.2488 21.9231H12.2293C12.0676 21.923 11.9077 21.889 11.76 21.8231C11.6123 21.7573 11.48 21.6611 11.3719 21.5409L7.21803 16.9255C7.11254 16.8136 7.03047 16.6817 6.97666 16.5377C6.92285 16.3936 6.89838 16.2403 6.90469 16.0866C6.911 15.933 6.94795 15.7821 7.01339 15.643C7.07882 15.5038 7.17142 15.3791 7.28572 15.2763C7.40003 15.1734 7.53375 15.0944 7.67902 15.044C7.82429 14.9935 7.97817 14.9726 8.13163 14.9825C8.2851 14.9923 8.43504 15.0328 8.57264 15.1014C8.71025 15.1701 8.83275 15.2655 8.93293 15.3822L12.199 19.0111L21.0397 8.4887C21.238 8.25943 21.5185 8.11741 21.8207 8.09333C22.1229 8.06925 22.4224 8.16505 22.6545 8.36002C22.8866 8.555 23.0327 8.83348 23.0611 9.13527C23.0896 9.43707 22.9981 9.73793 22.8065 9.97284Z"
                  fill="#E0FB16"
                />
              </svg>

              <svg
                v-else-if="onProgress < 4"
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="15" cy="15" r="15" fill="white" />
              </svg>
            </div>
            <div>Generating Meta Data</div>
          </span>
        </div>
      </div>

      <div class="grid grid-cols-1">
        <div>
          <button v-if="onProgress < 5" class="btn btn-approve" disabled>
            WAITING...
          </button>
          <button
            :disabled="loading"
            v-else
            @click="openBox"
            class="btn btn-approve"
          >
            OPEN BOX
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MysteryBox",
  props: {
    onProgress: {
      typeof: Number,
      default: 0,
    },
  },
  data() {
    return {
      loading: false,
    };
  },
  created() {
    //  this.getEvents();
  },

  methods: {
    openBox() {
      this.$emit("openBox", true);
      this.loading = true;
    },

    // async getEvents() {
    // let latest_block = await web3.eth.getBlockNumber();
    // let historical_block = latest_block - 10000; // you can also change the value to 'latest' if you have a upgraded rpc
    // console.log("latest: ", latest_block, "historical block: ", historical_block);
    // const events = await contract.getPastEvents(
    //     'Transfer', // change if your looking for a different event
    //     { fromBlock: historical_block, toBlock: 'latest' }
    // );
    // console.log('events', events);
    // }
  },
};
</script>

<style>
@media (max-width: 400px) {
  .one-element .overlay {
    top: 10%;
  }
}

.progress-transaction {
  position: absolute;
  color: #fff;
}
.one-element {
  position: relative;
  min-height: 350px;
}
.one-element img {
  width: 100%;
  height: auto;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px 20px;

  text-align: left;
  display: block;
  width: 100%;
  top: 25%;
}
.overlay .headline {
  margin-bottom: 10px;
}
.overlay .description {
  display: flex;
  margin-bottom: 20px;
  font-size: 1.4rem;
}
.overlay .button {
  border: 1px solid #fff;
  font-weight: bold;
  color: #000;
  background: rgba(2, 85, 219, 0.3);
  padding: 10px;
  text-decoration: none;
  display: inline-block;
  border-radius: 5px;
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
}
.overlay .button:hover {
  background: rgba(2, 85, 219, 0.6);
}
.lds-ring-progress {
  position: relative;
  /* width: 80px;
  height: 80px; */
  margin-right: 30px;
}

.lds-ring-progress div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 34px;
  height: 34px;
  margin: 0;
  border: 4px solid #e0fb18;
  border-radius: 50%;
  -webkit-animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #e0fb18 transparent transparent transparent;
}
.lds-ring-progress div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring-progress div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring-progress div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring-progress {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
