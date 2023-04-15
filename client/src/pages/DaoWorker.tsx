import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
  Avatar,
  Button,
  Checkbox,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import {
  ListWrapper,
  ListContent,
  DaoWorkerWrapper,
  DaoWorkerTabWrapper,
  DaoWorkerTab,
} from "../styled/styledComps";
import FolderIcon from "@mui/icons-material/Folder";
import * as LitJsSdk from "@lit-protocol/lit-node-client";
import { useNavigate } from "react-router-dom";
import { loginToLitNode } from "../components/litTest";
import { ethers } from "ethers";
import { Contract } from "web3-eth-contract";
import Unyte from "../artifacts/Unyte.json";
import Web3 from "web3";
import { AbiItem } from "web3-utils";
import eth_1 from "../assets/eth_1.png";
import eth_2 from "../assets/eth_2.jpeg";
import eth_3 from "../assets/eth_3.jpg";
import eth_4 from "../assets/eth_4.jpeg";

const label = { inputProps: { "aria-label": "Checkbox demo" } };
const CONTRACT_ADDRESS = "0xf6954262a428ecC83c72E22A1a8E357f5DdaDAD6";
const images = [eth_1, eth_2, eth_3, eth_4];
const getRandomImage = () => {
  const randomIndex = Math.floor(Math.random() * images.length);
  return images[randomIndex];
};

const DaoWorker = () => {
  const [content, setContent] = useState([
    {
      id: 0,
      name: `name`,
      value: 10,
    },
  ]);
  const [myWA, setMyWA] = useState<string | null>(null);
  const [contract, setContract] = useState<Contract>();
  const [fetchedKeyList, setFetchedKeyList] = useState<string[]>([]);
  const [fetchedHashList, setFetchedHashList] = useState<string[]>([]);

  const connectMetamask = async () => {
    const web3 = new Web3(Web3.givenProvider);
    const accounts = await web3.eth.requestAccounts();
    const account = accounts[0];
    const contract = new web3.eth.Contract(
      Unyte.abi as AbiItem[],
      CONTRACT_ADDRESS
    );
    return contract;
  };
  const initializeWA = async () => {
    if (window.ethereum) {
      const res = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log(res[0]);
      return res[0];
    }
  };
  const fetchHashFromContract = async (
    walletAddress: string,
    contract: any
  ) => {
    if (contract) {
      const res = await contract.methods.getIpfsHashList(walletAddress).call();
      console.log("fetchHashFromContract");
      console.log(res);
      return res;
    }
  };

  useEffect(() => {
    (async () => {
      const contract = await connectMetamask();
      setContract(contract);
      const tmpWA = await initializeWA();
      setMyWA(tmpWA);
      const hashKeyKV = await fetchHashFromContract(tmpWA, contract);
      const hashList = hashKeyKV[1];
      setFetchedHashList(hashList);
      const keyList = hashKeyKV[0];
      setFetchedKeyList(keyList);
    })();
  }, []);

  const [tips, setTips] = useState<number[]>(Array(content.length).fill(10));
  const tipItems = [{ value: 10 }, { value: 5 }, { value: 3 }, { value: 0 }];

  const navigate = useNavigate();

  const handleSearch = () => {
    console.log("Search clicked");
  };
  const handleButtonClick = (itemId: number) => {
    navigate(`/recruiter/${itemId}`);
  };
  const handleTipChange = (index: number, value: number) => {
    const updatedTips = [...tips];
    updatedTips[index] = value;
    setTips(updatedTips);
  };
  const [selectedIndex, setSelectedIndex] = useState(0);
  const handleBarClick = (index: number) => {
    setSelectedIndex(index);
  };

  return (
    <DaoWorkerWrapper>
      <DaoWorkerTabWrapper>
        <DaoWorkerTab
          onClick={() => handleBarClick(0)}
          sx={{
            backgroundColor: selectedIndex === 0 ? "primary.main" : "grey.300",
          }}>
          <Typography>Sender</Typography>
        </DaoWorkerTab>
        <DaoWorkerTab
          onClick={() => handleBarClick(1)}
          sx={{
            backgroundColor: selectedIndex === 1 ? "primary.main" : "grey.300",
            marginLeft: "5px",
          }}>
          <Typography>Recipient</Typography>
        </DaoWorkerTab>
      </DaoWorkerTabWrapper>
      <List>
        {fetchedKeyList.map((item, index) => (
          <ListItem key={item}>
            <ListItemAvatar>
              <Avatar>
                <img src={getRandomImage()} alt="Random Avatar" />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={item} />
            <ListItemSecondaryAction>
              <Button variant="contained" color="primary">
                100 UNYT
              </Button>
              <Checkbox {...label} defaultChecked />
              <Button variant="contained" color="primary">
                Distribution ratio
              </Button>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </DaoWorkerWrapper>
  );
};

export default DaoWorker;
