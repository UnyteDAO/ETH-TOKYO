import React, { useCallback, useEffect, useState } from "react";
import * as LitJsSdk from "@lit-protocol/lit-node-client";
import { loginToLitNode } from "../components/litTest";
import Web3 from "web3";
import { AbiItem } from "web3-utils";
import { Contract } from "web3-eth-contract";
import detectEthereumProvider from "@metamask/detect-provider";
import Unyte from "../artifacts/Unyte.json";
import { ethers } from "ethers";
import { create } from "ipfs-http-client";
import { Typography, Button, Box, Grid, TextField } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";

import {
  TextForm,
  CenterWrapperNoP,
  Grid2With960W,
  ReviewerInput,
  Grid2With960W2,
} from "../styled/styledComps";

interface FormValues {
  rating: string;
  good: string;
  more: string;
}

// InfuraのプロジェクトIDを設定
const projectId = "2OEyixJ9bhNc8ilnjG7qyV7IXwL"; // <---------- your Infura Project ID
const projectSecret = "1b8c0b6c542ea6beab46de4b4a7f69ca"; // <---------- your Infura Secret
// (for security concerns, consider saving these values in .env files)
const auth =
  "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");
const CONTRACT_ADDRESS = "0xf6954262a428ecC83c72E22A1a8E357f5DdaDAD6";

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

const ipfs = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
});

const uploadToIPFS = async (encryptedData: String) => {
  const { cid } = await ipfs.add(encryptedData);
  return cid.toString();
};

const Reviewer = () => {
  const [litNodeClient, setLitNodeClient] =
    useState<LitJsSdk.LitNodeClient | null>(null);
  const [targetWA, setTargetWA] = useState("");
  const [formValues, setFormValues] = useState<FormValues | any>({
    rating: "",
    good: "",
    more: "",
  });
  const [key, setKey] = useState<Uint8Array>();
  const [encryptedData, setEncryptedData] = useState<Blob | undefined>();
  const [encryptedBinary, setEncryptedBinary] = useState<
    Uint8Array | undefined
  >();
  const [decryptedString, setDecryptedString] = useState<string | undefined>();
  const [contract, setContract] = useState<Contract>();
  const [account, setAccount] = useState("");
  const [cid, setCid] = useState<string | undefined>();
  const [fetchedKeyList, setFetchedKeyList] = useState<string[]>([]);
  const [fetchedHashList, setFetchedHashList] = useState<string[]>([]);
  const [fetchedEncryptedDataList, setFetchedEncryptedDataList] = useState<
    string[]
  >([]);
  const [decryptedStringList, setDecryptedStringList] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      // Execute steps
      const litNodeClient = await loginToLitNode(signer);
      setLitNodeClient(litNodeClient);
    })();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "walletAddress") {
      setTargetWA(value);
    } else {
      setFormValues((prevValues: any) => ({ ...prevValues, [name]: value }));
    }
  };

  const upload = useCallback(async (encryptedBinary: any, key: Uint8Array) => {
    if (encryptedBinary && key) {
      const data = {
        encryptedText: encryptedBinary,
        encryptedKey: key,
      };
      const cid = await uploadToIPFS(JSON.stringify(data));
      console.log(cid);
      setCid(cid);
      return cid;
    }
  }, []);

  const saveOnContract = useCallback(
    async (cidresult: any) => {
      if (contract && cidresult) {
        // TODO: 評価の向け先を入力したwallet addressに変更できるように
        await contract.methods
          .setIpfsHash(targetWA, cidresult)
          .send({ from: account });
      }
    },
    [account, targetWA, contract]
  );

  const submitReview = useCallback(async () => {
    if (litNodeClient) {
      const { encryptedData, symmetricKey } = await LitJsSdk.encryptString(
        JSON.stringify(formValues)
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
      if (encryptedData) {
        const result = new Uint8Array(await encryptedData.arrayBuffer());
        console.log(result);
        setEncryptedBinary(result);
        const cidresult = await upload(result, encryptedSymmetricKey);
        await saveOnContract(cidresult);
      }
    }
  }, [litNodeClient, formValues, saveOnContract, upload]);

  const connectMetamask = useCallback(async () => {
    console.log("Welcome to MetaMask User🎉");
    const web3 = new Web3(Web3.givenProvider);
    // connect with metamask wallet
    const accounts = await web3.eth.requestAccounts();
    const account = accounts[0];
    // setup instance to call contract with JSON RPC
    const contract = new web3.eth.Contract(
      Unyte.abi as AbiItem[],
      CONTRACT_ADDRESS
    );
    setContract(contract);
    setAccount(account);
  }, []);

  // Initialize connection with contract and wallet
  useEffect(() => {
    (async () => {
      const provider = await detectEthereumProvider({ mustBeMetaMask: true });
      if (provider && window.ethereum?.isMetaMask) {
        // Connect to Metamask
        connectMetamask();
        // Reload when account is changed
        window.ethereum.on("accountsChanged", () => {
          // Handle the new accounts, or lack thereof.
          window.location.reload();
        });
        // Reload when chain is changed
        window.ethereum.on("chainChanged", () => {
          // Handle the new chain.
          window.location.reload();
        });
      } else {
        console.log("Please Install MetaMask🙇‍♂️");
      }
    })();
  }, [connectMetamask]);

  return (
    <CenterWrapperNoP>
      <Grid2 container spacing={2}>
        <Grid2With960W2 xs={12}>
          <Typography variant="h5">To</Typography>
        </Grid2With960W2>
        <Grid2With960W xs={12}>
          <ReviewerInput
            sx={{
              "& .MuiInputBase-input": {
                color: "white",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white",
                },
              },
            }}
            name="walletAddress"
            label="Wallet Address"
            value={targetWA}
            onChange={handleChange}
          />
        </Grid2With960W>
        <Grid2With960W2 xs={12}>
          <Typography variant="h5">Score</Typography>
        </Grid2With960W2>
        <Grid2With960W2 xs={12}>
          <TextField
            sx={{
              "& .MuiInputBase-input": {
                color: "white",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white",
                },
              },
              minWidth: "100px",
            }}
            name="rating"
            label="Rating"
            type="number"
            inputProps={{ min: 1, max: 5 }}
            value={formValues.rating}
            onChange={handleChange}
          />
        </Grid2With960W2>
        <Grid2With960W2 xs={12}>
          <Typography variant="h5">Good</Typography>
        </Grid2With960W2>
        <Grid2With960W xs={12}>
          <ReviewerInput
            sx={{
              "& .MuiInputBase-input": {
                color: "white",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white",
                },
              },
            }}
            name="good"
            label="Good"
            multiline
            rows={4}
            value={formValues.good}
            onChange={handleChange}
          />
        </Grid2With960W>
        <Grid2With960W2 xs={12}>
          <Typography variant="h5">More</Typography>
        </Grid2With960W2>
        <Grid2With960W xs={12}>
          <ReviewerInput
            sx={{
              "& .MuiInputBase-input": {
                color: "white",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white",
                },
              },
            }}
            name="more"
            label="More"
            multiline
            rows={4}
            value={formValues.more}
            onChange={handleChange}
          />
        </Grid2With960W>
        <Grid2With960W xs={12}>
          <Button onClick={submitReview} variant="contained" size="large">
            Submit
          </Button>
        </Grid2With960W>
      </Grid2>
    </CenterWrapperNoP>
  );
};

export default Reviewer;
