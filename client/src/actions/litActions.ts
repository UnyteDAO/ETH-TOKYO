import * as LitJsSdk from "@lit-protocol/lit-node-client";
import { ethers } from "ethers";
import { useCallback, useEffect, useState } from "react";
import { loginToLitNode } from "../components/litTest";
import { create } from "ipfs-http-client";

// InfuraのプロジェクトIDを設定
const projectId = "2OEyixJ9bhNc8ilnjG7qyV7IXwL"; // <---------- your Infura Project ID
const projectSecret = "1b8c0b6c542ea6beab46de4b4a7f69ca"; // <---------- your Infura Secret
// (for security concerns, consider saving these values in .env files)

const auth =
  "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");

const ipfs = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
});

export const uploadToIPFS = async (encryptedData: any) => {
  const { path } = await ipfs.add(encryptedData);
  return path;
};

// celoテストトークン
const accessControlConditions = [
  {
    contractAddress: "0xffA3396D19c93017FfC175532E175F80496fe5C3",
    standardContractType: "ERC20",
    chain: "alfajores",
    method: "balanceOf",
    parameters: [":userAddress"],
    returnValueTest: {
      comparator: ">",
      value: "0",
    },
  },
];

export const LitTest = () => {
  const [litNodeClient, setLitNodeClient] =
    useState<LitJsSdk.LitNodeClient | null>(null);
  const [text, setText] = useState("");
  const [key, setKey] = useState<Uint8Array>();
  const [encryptedData, setEncryptedData] = useState<Blob | undefined>();
  const [encryptedText, setEncryptedText] = useState<string | undefined>();
  const [decryptedString, setDecryptedString] = useState<string | undefined>();

  useEffect(() => {
    (async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      // Execute steps
      const litNodeClient = await loginToLitNode(signer);
      setLitNodeClient(litNodeClient);
    })();
  }, []);

  const encrypt = useCallback(async () => {
    if (litNodeClient) {
      const { encryptedData, symmetricKey } = await LitJsSdk.encryptString(
        text
      );
      // store the access control conditions
      const authSig = await LitJsSdk.checkAndSignAuthMessage({
        chain: "ethereum",
      });
      const encryptedSymmetricKey = await litNodeClient.saveEncryptionKey({
        accessControlConditions,
        symmetricKey,
        authSig,
        chain: "ethereum", // nothing actually lives on ethereum here, but we need to pass a chain
      });
      setKey(encryptedSymmetricKey);
      setEncryptedData(encryptedData);
      const resultText = await encryptedData?.text();
      setEncryptedText(resultText);
    }
  }, [litNodeClient, text]);

  const decrypt = useCallback(async () => {
    if (litNodeClient && encryptedData) {
      const authSig = await LitJsSdk.checkAndSignAuthMessage({
        chain: "ethereum",
      });

      const symmetricKeyFromNodes = await litNodeClient.getEncryptionKey({
        accessControlConditions,
        toDecrypt: LitJsSdk.uint8arrayToString(key, "base16"),
        chain: "ethereum", // nothing actually lives on ethereum here, but we need to pass a chain
        authSig,
      });

      const decryptedString = await LitJsSdk.decryptString(
        encryptedData,
        symmetricKeyFromNodes
      );

      setDecryptedString(decryptedString);
    }
  }, [encryptedData, key, litNodeClient]);
};

// const encrypt = useCallback(async () => {
//   if (litNodeClient) {
//     const { encryptedData, symmetricKey } = await LitJsSdk.encryptString(
//       JSON.stringify(formValues)
//     );
//     // store the access control conditions
//     const authSig = await LitJsSdk.checkAndSignAuthMessage({
//       chain: "ethereum",
//     });
//     const encryptedSymmetricKey = await litNodeClient.saveEncryptionKey({
//       accessControlConditions,
//       symmetricKey,
//       authSig,
//       chain: "ethereum", // nothing actually lives on ethereum here, but we need to pass a chain
//     });
//     console.log("encryptedSymmetricKey", encryptedSymmetricKey);
//     setKey(encryptedSymmetricKey);
//     setEncryptedData(encryptedData);
//     if (encryptedData) {
//       const result = new Uint8Array(await encryptedData.arrayBuffer());
//       setEncryptedBinary(result);
//     }
//     // Decode the Uint8Array to a string
//     // const decoder = new TextDecoder("utf-16");
//     // const decodedString = decoder.decode(encryptedSymmetricKey);
//     // console.log(decodedString)
//   }
// }, [litNodeClient, formValues]);
// const decrypt = useCallback(async () => {
//   if (litNodeClient && encryptedData) {
//     const authSig = await LitJsSdk.checkAndSignAuthMessage({
//       chain: "ethereum",
//     });
//     const symmetricKeyFromNodes = await litNodeClient.getEncryptionKey({
//       accessControlConditions,
//       toDecrypt: LitJsSdk.uint8arrayToString(key, "base16"),
//       chain: "ethereum", // nothing actually lives on ethereum here, but we need to pass a chain
//       authSig,
//     });
//     const decryptedString = await LitJsSdk.decryptString(
//       encryptedData,
//       symmetricKeyFromNodes
//     );
//     setDecryptedString(decryptedString);
//   }
// }, [encryptedData, key, litNodeClient]);
// const fetchHashFromContract = useCallback(async () => {
//   if (contract) {
//     // TODO: 取得の向け先を変更できるように
//     const resp = await contract.methods
//       .getIpfsHashList("0x24fA019F419811Dd5e62e4e0EFc62abCfb703494")
//       .call();
//     console.log(resp);
//     setFetchedHashList(resp[1]);
//     setFetchedKeyList(resp[0]);
//   }
// }, [contract]);
// const fetchIpfsData = useCallback(async () => {
//   const promises = fetchedHashList.map(async (cid) => {
//     const response = await fetch(`https://ipfs.io/ipfs/${cid}`);
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
//     const data = await response.text(); // Use response.json() if the data is in JSON format
//     return data;
//   });
//   const fetchedEncryptedDataList = await Promise.all(promises);
//   setFetchedEncryptedDataList(fetchedEncryptedDataList);
// }, [fetchedHashList]);
// const decrypt2 = useCallback(async () => {
//   if (litNodeClient && fetchedEncryptedDataList) {
//     const authSig = await LitJsSdk.checkAndSignAuthMessage({
//       chain: "ethereum",
//     });

//     const promises = fetchedEncryptedDataList.map(async (dataStr) => {
//       const data = JSON.parse(dataStr);
//       console.log(Object.values(data.encryptedKey));
//       const symmetricKeyFromNodes = await litNodeClient.getEncryptionKey({
//         accessControlConditions,
//         toDecrypt: LitJsSdk.uint8arrayToString(
//           new Uint8Array(Object.values(data.encryptedKey)),
//           "base16"
//         ),
//         chain: "ethereum", // nothing actually lives on ethereum here, but we need to pass a chain
//         authSig,
//       });

//       const decryptedString = await LitJsSdk.decryptString(
//         new Blob([new Uint8Array(Object.values(data.encryptedText))]),
//         symmetricKeyFromNodes
//       );

//       return decryptedString;
//     });

//     const textList = await Promise.all(promises);
//     setDecryptedStringList(textList);
//   }
// }, [fetchedEncryptedDataList, litNodeClient]);
