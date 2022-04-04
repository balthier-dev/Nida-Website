const axios = require("axios");
const base_API = process.env.VUE_APP_NFT_METADATA_ENDPOINT;
export async function getNFTs(address) {
  const url = `https://deep-index.moralis.io/api/v2/${address}/nft?chain=bsc&format=decimal`;

  const options = {
    headers: {
      "Content-Type": "application/json",
      "x-api-key":
        "hkbxNZvvi7nz58Jzq5qivwfVFZNSf3MThUj9lsDNntg7acO4qZ0qy0BzWH83zruw",
    },
  };

  return axios.get(url, options);
}

export async function getCardRedeem(id) {
  const url = base_API + `/items/${id}`;

  const options = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  return axios.get(url, options);
}
