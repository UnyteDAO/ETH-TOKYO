// scripts/deploy.js
const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();

    // Superfluidのアドレスを指定します（この例ではGoerli Testnetを使用）
    // const SUPERFLUID_HOST_ADDRESS = "0x22ff293e14F1EC3A09B137e9e06084AFd63adDF9";
    // const SUPERFLUID_CFA_ADDRESS = "0xEd6BcbF6907D4feEEe8a8875543249bEa9D308E8";
    // const SUPERFLUID_TOKEN_ADDRESS = "0x5943F705aBb6834Cad767e6E4bB258Bc48D9C947"; // この例ではfDAIを使用

    // mumbaiの場合
    const SUPERFLUID_HOST_ADDRESS = "0xEB796bdb90fFA0f28255275e16936D25d3418603";
    const SUPERFLUID_CFA_ADDRESS = "0x49e565Ed1bdc17F3d220f72DF0857C26FA83F873";
    const SUPERFLUID_TOKEN_ADDRESS = "0x96B82B65ACF7072eFEb00502F45757F254c2a0D4";
    

    // スマートコントラクトをデプロイします
    const ContinuousTokenStream = await hre.ethers.getContractFactory("ContinuousTokenStream");
    const continuousTokenStream = await ContinuousTokenStream.deploy(
        SUPERFLUID_HOST_ADDRESS,
        SUPERFLUID_CFA_ADDRESS,
        SUPERFLUID_TOKEN_ADDRESS
    );

    await continuousTokenStream.deployed();

    console.log("ContinuousTokenStream deployed to:", continuousTokenStream.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
