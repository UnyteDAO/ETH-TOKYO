require('dotenv').config();
require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks: {
    goerli: {
      url: "https://eth-goerli.blastapi.io/b06e91ea-565c-4829-96ee-5c00e3804e71",
      accounts: ["0cb8aa4ff203eee33fd894bbc29a7cdbe56f2fd77eae7352ef5dc0b85b71290a"],
    },
    rinkeby: {
      url: "https://eth-rinkeby.alchemyapi.io/v2/9VRqHHhTAZ_Yw_GM-JpeVQrU_A5pkrvr",
      accounts: ["0cb8aa4ff203eee33fd894bbc29a7cdbe56f2fd77eae7352ef5dc0b85b71290a"],
    },
    mumbai: {
      url: "https://polygon-mumbai.g.alchemy.com/v2/OYM4nSdwayU_AlLiq50U7TFXnKqXXcuL",
      accounts: ["0cb8aa4ff203eee33fd894bbc29a7cdbe56f2fd77eae7352ef5dc0b85b71290a"],
    },
    celo: {
      url: "https://alfajores-forno.celo-testnet.org",
      accounts: ["0cb8aa4ff203eee33fd894bbc29a7cdbe56f2fd77eae7352ef5dc0b85b71290a"],
    }
  },
};
