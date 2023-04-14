require('dotenv').config();
require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks: {
    scrollAlpha: {
      url: "https://alpha-rpc.scroll.io/l2",
      accounts: [process.env.PRIVATE_KEY]
    }
  },
};
