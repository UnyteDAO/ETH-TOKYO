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
import { ListWrapper, ListContent } from "../styled/styledComps";
import FolderIcon from "@mui/icons-material/Folder";
import * as LitJsSdk from "@lit-protocol/lit-node-client";
import { useNavigate } from "react-router-dom";
import { loginToLitNode } from "../components/litTest";
import { ethers } from "ethers";
import { Contract } from "web3-eth-contract";
import Unyte from "../artifacts/Unyte.json";
import Web3 from "web3";
import { AbiItem } from "web3-utils";

interface Data {
  id: number;
  name: string;
  value: number;
}
const data: Data[] = Array(10)
  .fill(0)
  .map((_, index) => ({
    id: index,
    name: `Item ${index + 1}`,
    value: 30,
  }));
const label = { inputProps: { "aria-label": "Checkbox demo" } };
const CONTRACT_ADDRESS = "0xf6954262a428ecC83c72E22A1a8E357f5DdaDAD6";

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
    <ListWrapper>
      <ListContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 2,
          }}>
          <Box
            onClick={() => handleBarClick(0)}
            sx={{
              width: "400px",
              height: "25px",
              backgroundColor:
                selectedIndex === 0 ? "primary.main" : "grey.300",
              borderRadius: "5px",
              cursor: "pointer",
            }}>
            Bar 1
          </Box>
          <Box
            onClick={() => handleBarClick(1)}
            sx={{
              width: "400px",
              height: "25px",
              backgroundColor:
                selectedIndex === 1 ? "primary.main" : "grey.300",
              borderRadius: "5px",
              cursor: "pointer",
              marginLeft: "5px",
            }}>
            Bar 2
          </Box>
        </Box>
        <Box sx={{ width: "100%" }}>
          <List>
            {data.map((item, index) => (
              <ListItem key={item.id}>
                <ListItemAvatar>
                  <Avatar>
                    <FolderIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={item.name} />
                <ListItemSecondaryAction>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 50,
                        height: 50,
                        borderRadius: "50%",
                        backgroundColor: "primary.main",
                        marginRight: 2,
                      }}>
                      <Typography variant="h6" sx={{ color: "common.white" }}>
                        {item.value}
                      </Typography>
                    </Box>
                    {/* <Checkbox
                      {...label}
                      defaultChecked
                      sx={{ "& .MuiSvgIcon-root": { fontSize: 28, marginRight: 5 } }}
                    /> */}
                  </Box>
                  <Checkbox
                    {...label}
                    defaultChecked
                    sx={{
                      "& .MuiSvgIcon-root": { fontSize: 28, marginRight: 5 },
                    }}
                  />
                  {/* <Select
                      value={tips[index]}
                      onChange={(e) => handleTipChange(index, Number(e.target.value))}
                      sx={{ marginRight: 5, backgroundColor: "orange" }}
                    >
                      {tipItems.map((tipItem, i) => (
                        <MenuItem key={i} value={tipItem.value}>
                          {tipItem.value}
                        </MenuItem>
                      ))}
                    </Select> */}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleButtonClick(item.id)}>
                    Tips
                  </Button>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Box>
      </ListContent>
    </ListWrapper>
  );
};

export default DaoWorker;
