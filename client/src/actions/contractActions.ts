import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import ABI from "../../../blockchain/artifacts/contracts/Unyte.sol/Unyte.json";

const CONTRACT_ADDRESS = "0x23BA45ED0FFE9617d133630c4bd655131c175093";
const UNYTE_ABI: any = ABI;

export const setIpfsHash = async () => {
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

    const res = await contract.methods.setIpfsHash().send();
    console.log("res: ", res);
  } else {
    console.error("Please install MetaMask!");
  }
};

export const getIpfsHashList = async () => {
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

    const list = await contract.methods.getIpfsHashList().call();
    console.log("list: ", list);
  } else {
    console.error("Please install MetaMask!");
  }
};
