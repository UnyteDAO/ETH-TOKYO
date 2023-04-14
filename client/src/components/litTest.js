import React, { useState, useEffect } from 'react';
import * as LitJsSdk from "@lit-protocol/lit-node-client";
import { ethers } from 'ethers';
import { create } from 'ipfs-http-client';

// InfuraのプロジェクトIDを設定
const projectId = '2OEyixJ9bhNc8ilnjG7qyV7IXwL';   // <---------- your Infura Project ID

const projectSecret = '1b8c0b6c542ea6beab46de4b4a7f69ca';  // <---------- your Infura Secret
// (for security concerns, consider saving these values in .env files)

const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

const ipfs = create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
        authorization: auth,
    },
});

async function uploadToIPFS(encryptedData) {
  const { path } = await ipfs.add(encryptedData);
  return path;
}

async function loginToLitNode(signer) {
  const litNodeClient = new LitJsSdk.LitNodeClient({
    alertWhenUnauthorized: false,
    litNetwork: "serrano",
    debug: true,
  });
  await litNodeClient.connect(signer);
  console.log('Logged in to Lit Node');
  return litNodeClient;
}

async function encryptAndUploadToIPFS(litNodeClient, data) {
  const { encryptedData, symmetricKey } = await LitJsSdk.encryptString(data);
    console.log('Encrypted data:', encryptedData);
    console.log('Symmetric key:', symmetricKey);
  const ipfsHash = await uploadToIPFS(encryptedData);
    
  console.log('Encrypted data uploaded to IPFS:', ipfsHash);

  const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain: "ethereum" });
  console.log("authSig: ", authSig)

  // var accessControlConditions = [
  //   {
  //     contractAddress: "ipfs://QmcgbVu2sJSPpTeFhBd174FnmYmoVYvUFJeDkS7eYtwoFY",
  //     standardContractType: "LitAction",
  //     chain: "ethereum", // nothing actually lives on ethereum here, but we need to pass a chain
  //     method: "go",
  //     parameters: ["40"],
  //     returnValueTest: {
  //       comparator: "=",
  //       value: "true",
  //     },
  //   },
  // ];

  const accessControlConditions = [
  {
    contractAddress: '',
    standardContractType: '',
    chain: "ethereum", // nothing actually lives on ethereum here, but we need to pass a chain
    method: 'eth_getBalance',
    parameters: [
      ':userAddress',
      'latest'
    ],
    returnValueTest: {
      comparator: '>=',
      value: '0'
    }
  }
]

  // store the access control conditions
  const encryptedSymmetricKey = await litNodeClient.saveEncryptionKey({
    accessControlConditions,
    symmetricKey,
    authSig,
    chain: "ethereum", // nothing actually lives on ethereum here, but we need to pass a chain
  });

  console.log("Condition stored.  Now to retrieve the key and decrypt it.");

   const symmetricKeyFromNodes = await litNodeClient.getEncryptionKey({
    accessControlConditions,
    toDecrypt: LitJsSdk.uint8arrayToString(encryptedSymmetricKey, "base16"),
    chain: "ethereum", // nothing actually lives on ethereum here, but we need to pass a chain
    authSig,
  });

  const decryptedString = await LitJsSdk.decryptString(
    encryptedData,
    symmetricKeyFromNodes
  );
  console.log("decryptedString: ", decryptedString);

  return ipfsHash;
}

// async function grantAccessToEncryptedData(litNodeClient, ipfsHash, userAddress) {
//   const permissions = [
//     {
//       ethAddress: userAddress,
//       paths: [ipfsHash],
//     },
//   ];

//   await litNodeClient.grantAccessBulk(permissions);
//   console.log(`Access granted to user ${userAddress} for encrypted data on IPFS: ${ipfsHash}`);
// }

// this code will be run on the node
const litActionCode = `
const go = async () => {  
  // this requests a signature share from the Lit Node
  // the signature share will be automatically returned in the HTTP response from the node
  // all the params (toSign, publicKey, sigName) are passed in from the LitJsSdk.executeJs() function
  const sigShare = await Lit.Actions.signEcdsa({ toSign, publicKey , sigName });
};

go();
`;


const runLitAction = async () => {
  // you need an AuthSig to auth with the nodes
  // this will get it from MetaMask or any browser wallet
  const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain: "ethereum" });

  const litNodeClient = new LitJsSdk.LitNodeClient({
    alertWhenUnauthorized: false,
    litNetwork: "serrano",
    debug: true,
  });
  await litNodeClient.connect();
  const signatures = await litNodeClient.executeJs({
    code: litActionCode,
    authSig,
    // all jsParams can be used anywhere in your litActionCode
    jsParams: {
      // this is the string "Hello World" for testing
      toSign: [72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100],
      publicKey:
        "0x04956b38f34f71f5e8cf0afaef20b44ed8202a7605e47d48c713499ca29342d93dcf968b4fe315aa443bd5b5e845db601ac7b012d88c747b2397f62457dbe77207",
      sigName: "sig1",
    },
  });
  console.log("signatures: ", signatures);
};

function App() {
  const [litNodeClient, setLitNodeClient] = useState(null);
  console.log("litNodeClient: ", litNodeClient);

  const test = async () => {
    // Connect to Ethereum wallet (e.g. MetaMask)
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    // Execute steps
    const litNodeClient = await loginToLitNode(signer);
    setLitNodeClient(litNodeClient);

    const data = 'Secret data to be encrypted and stored on IPFS';
    const ipfsHash = await encryptAndUploadToIPFS(litNodeClient, data);
    const userAddress = '0x3a0bE810754f7f7D04fCA10E2C11E93ebb5BF19e';
    // await grantAccessToEncryptedData(litNodeClient, ipfsHash, userAddress);
  };

  useEffect(() => {
    const init = async () => {
      // Connect to Ethereum wallet (e.g. MetaMask)
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      // Execute steps
      const litNodeClient = await loginToLitNode(signer);
      setLitNodeClient(litNodeClient);

      const data = 'Secret data to be encrypted and stored on IPFS';
      // const ipfsHash = await encryptAndUploadToIPFS(litNodeClient, data);
      const userAddress = '0x3a0bE810754f7f7D04fCA10E2C11E93ebb5BF19e';
      // await grantAccessToEncryptedData(litNodeClient, ipfsHash, userAddress);
    };

    if (window.ethereum) {
      init();
    } else {
      console.error('Ethereum provider not found. Please install MetaMask or another provider.');
    }
  }, []);

  return (
    <div className="App">
      <h1>Lit Protocol Integration Example</h1>
      {litNodeClient ? <p>Logged in to Lit Node</p> : <p>Connecting to Lit Node...</p>}
      {/* runLitaction()関数を動かすためのボタン */}
      <button onClick={()=>{runLitAction()}}>Run Lit Action</button>

      <button onClick={()=>{test()}}>Degree</button>
    </div>
  );
}

export default App;