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
