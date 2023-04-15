import React from "react";
import {
  TextField,
  Box,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import { useState , useEffect, useCallback} from "react";
import { useParams } from "react-router-dom";
import { ethers } from "ethers";
import Unyte from "../artifacts/Unyte.json";
import { AbiItem } from "web3-utils";
import Web3 from "web3"
import { Contract } from 'web3-eth-contract';
import { getTokenBalance } from "../actions/contractActions";
import MyTokenContract from '../artifacts/MyToken.json';
import MyTokenFactoryContract from '../artifacts/MyTokenFactory.json';
import * as LitJsSdk from "@lit-protocol/lit-node-client";
import { loginToLitNode } from "../components/litTest";
import { Console } from "console";

interface Data {
  id: number;
  name: string;
  good: string;
  more: string;
}

const data: Data[] = Array(10)
  .fill(0)
  .map((_, index) => ({
    id: index,
    name: `Item ${index + 1}`,
    good: "good",
    more: "more",
  }));

const Recruiter = () => {
  const { address } = useParams();

  const [litNodeClient, setLitNodeClient] =
    useState<LitJsSdk.LitNodeClient | null>(null);

  const lit = async (contract:any,signer:any) => {
    // Execute steps
    const litNodeClient = await loginToLitNode(signer);
    setLitNodeClient(litNodeClient);
    // lit復号化のための処理
    // celoテストトークン
    console.log(ethers.utils.parseEther("100").toString())
    const accessControlConditions = [
      {
        contractAddress: "0xffA3396D19c93017FfC175532E175F80496fe5C3",
        standardContractType: "ERC20",
        chain: "alfajores",
        method: "balanceOf",
        parameters: [":userAddress"],
        returnValueTest: {
          comparator: ">",
          value: "100000000000",
        },
      },
    ];

    let fetchedHashList: string[] = [];
    let fetchedKeyList: string[] = [];
    let fetchedEncryptedDataList: string[] = [];
    let textList:any = [];

    const fetchHashFromContract = async () => {
      if (contract) {
        // TODO: 取得の向け先を変更できるように
        const resp = await contract.methods
          .getIpfsHashList(address)
          .call();
        console.log(resp);
        fetchedHashList=resp[1];
        fetchedKeyList=resp[0];
      }
      console.log("1");
    };

    const fetchIpfsData = async () => {
      const promises = fetchedHashList.map(async (cid) => {
        const response = await fetch(`https://ipfs.io/ipfs/${cid}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.text(); // Use response.json() if the data is in JSON format
        return data;
      });
      fetchedEncryptedDataList = await Promise.all(promises);
      console.log(fetchedEncryptedDataList);
      console.log("2");
    }

    const decrypt2 = async () => {
      console.log("3");
      console.log(litNodeClient)
      if (litNodeClient && fetchedEncryptedDataList) {
        console.log("4");
        const authSig = await LitJsSdk.checkAndSignAuthMessage({
          chain: "ethereum",
        });

        const promises = fetchedEncryptedDataList.map(async (dataStr) => {
          const data = JSON.parse(dataStr);
          console.log(Object.values(data.encryptedKey));
          const symmetricKeyFromNodes = await litNodeClient.getEncryptionKey({
            accessControlConditions,
            toDecrypt: LitJsSdk.uint8arrayToString(
              new Uint8Array(Object.values(data.encryptedKey)),
              "base16"
            ),
            chain: "ethereum", // nothing actually lives on ethereum here, but we need to pass a chain
            authSig,
          });

          const decryptedString = await LitJsSdk.decryptString(
            new Blob([new Uint8Array(Object.values(data.encryptedText))]),
            symmetricKeyFromNodes
          );

          const result = JSON.parse(decryptedString);
          return result;
        });

        textList = await Promise.all(promises);
        console.log(textList);
        console.log("5");
        setReviewList(textList);
      }
    }
    await fetchHashFromContract();
    await fetchIpfsData();
    await decrypt2();
}

  const [reviewList, setReviewList] = useState<any>([{id: 0, name: "name", good: "good", more: "more"}, {id: 1, name: "name", good: "good", more: "more"}, {id: 2, name: "name", good: "good", more: "more"}]);
  const [fetchedKeyList, setFetchedKeyList] = useState<string[]>([]);
  const [fetchedHashList, setFetchedHashList] = useState<string[]>([]);

  const [balance, setBalance] = useState<any>(null);
  const connect = async () => {
    const { ethereum } = window;
    // setup instance to call contract with JSON RPC
    const web3 = new Web3(Web3.givenProvider);
    const unyteContract:any = new web3.eth.Contract(
      Unyte.abi as AbiItem[],
      "0xf6954262a428ecC83c72E22A1a8E357f5DdaDAD6"
    );

    console.log(address)
    // コントラクトの読み込み
    if (unyteContract) {
      // TODO: 取得の向け先を変更できるように
      const resp = await unyteContract.methods
        .getIpfsHashList(address)
        .call();
      console.log(resp);
      setFetchedHashList(resp[1]);
      setFetchedKeyList(resp[0]);
      console.log(resp[0])
    }
    // ユーザーのウォレットにUnytトークンがあるか確認する
    const result = await getTokenBalance();
    setBalance(result);
    console.log(result);
  
    if (ethereum) {
      // MyTokenコントラクトの情報を取得する。
      const MyToken = '0xffA3396D19c93017FfC175532E175F80496fe5C3';
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      // ウォレットアドレスに対してアクセスをリクエストしています。
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      const contract = new ethers.Contract(
        MyToken,
        MyTokenContract.abi,
        signer
      );
      const transfer = async (to:any,amount:any) => {
        try {
          // pause関数の呼び出し。
          await contract.transfer(to, amount)
          console.log("送金成功！");
          lit(unyteContract,signer)
        } catch (error) {
          console.log(`送金に失敗しました。`);
          console.error(error);
        }
      };
      transfer(address, ethers.utils.parseEther("100"))
    }
  }

  // Litを参照してデータを復号化


  useEffect(() => {
    connect();
  }, []);

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Address: {address}
        </Typography>
        <Grid container spacing={2}>
          {reviewList.map((item:any, index:number) => (
            <Grid item xs={12} sm={6} md={6} key={item.id}>
              <Paper elevation={2} sx={{ p: 2 }}>
                <ListItem>
                  <ListItemAvatar sx={{ mr: 2 }}>
                    <Avatar>
                      <FolderIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <Typography sx={{ color: "black"}}>{item.name}</Typography>
                </ListItem>
                <Box>
                  <TextField
                    fullWidth
                    disabled
                    label="Good"
                    value={item.good}
                    sx={{ my: 2 }}
                    multiline rows={3}
                  />
                  <TextField
                    fullWidth
                    disabled
                    label="More"
                    value={item.more}
                    sx={{ my: 1 }}
                    multiline rows={3}
                  />
                </Box>
                <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
                  {/* <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleButtonClick(item.id)}
                  >
                    View Details
                  </Button> */}
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Recruiter;
