import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import ABI from "../../../blockchain/artifacts/contracts/Unyte.sol/Unyte.json";

const CONTRACT_ADDRESS = "0x23BA45ED0FFE9617d133630c4bd655131c175093";
const UNYTE_ABI: any = ABI;

export const fetchTokenInfo = async () => {
  // detectEthereumProvider provider
  const provider: any = await detectEthereumProvider();
  if (provider) {
    // new instance of web3
    const web3 = new Web3(Web3.givenProvider);
    // connect with metamask wallet
    const accounts = await web3.eth.requestAccounts();
    const account = accounts[0];
    console.log("Account: ", account);
    // setup instance to call contract with JSON RPC
    const contract = new web3.eth.Contract(UNYTE_ABI, CONTRACT_ADDRESS);

    // コントラクトから情報を取得する例
    const name = await contract.methods.name().call();
    const symbol = await contract.methods.symbol().call();
    const decimals = await contract.methods.decimals().call();

    console.log("Token Decimals:", decimals);
  } else {
    console.error("Please install MetaMask!");
  }
};

const provider = async () => {
  // const web3 = new Web3(Web3.givenProvider);
  // connect with metamask wallet
  // const accounts = await web3.eth.requestAccounts();
  // const account = accounts[0];

  // setup instance to call contract with JSON RPC
  const contract = new web3.eth.Contract(
    UNYTE_ABI.abi as any[],
    CONTRACT_ADDRESS
  );
};
