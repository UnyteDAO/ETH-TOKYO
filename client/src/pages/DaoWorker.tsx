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
  Typography
} from "@mui/material";
import { ListWrapper, ListContent } from "../styled/styledComps";
import FolderIcon from "@mui/icons-material/Folder";
import * as LitJsSdk from "@lit-protocol/lit-node-client";
import { useNavigate } from "react-router-dom";
import { loginToLitNode } from "../components/litTest";
import { ethers } from "ethers";
import { Contract } from "web3-eth-contract";

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

const DaoWorker = () => {
  const [content, setContent] = useState([
    {
      id: 0,
      name: `name`,
      value: 10
    },
  ]);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [contract, setContract] = useState<Contract>();
  const [litNodeClient, setLitNodeClient] =
  useState<LitJsSdk.LitNodeClient | null>(null);
  const [fetchedKeyList, setFetchedKeyList] = useState<string[]>([]);
  const [fetchedHashList, setFetchedHashList] = useState<string[]>([]);
  const [fetchedEncryptedDataList, setFetchedEncryptedDataList] = useState<
  string[]
  >([]);
  const [decryptedStringList, setDecryptedStringList] = useState<string[]>([]);
  const [encryptedData, setEncryptedData] = useState<Blob | undefined>();
  const [decryptedString, setDecryptedString] = useState<string | undefined>();
  const [key, setKey] = useState<Uint8Array>();



  const fetchHashFromContract = useCallback(async () => {
    if (contract) {
      // TODO: 取得の向け先を変更できるように
      const resp = await contract.methods
        .getIpfsHashList(walletAddress)
        .call();
      console.log(resp);
      setFetchedHashList(resp[1]);
      setFetchedKeyList(resp[0]);
    }
  }, [contract]);

  const accessControlConditions: any = [
    {
      contractAddress: "0x431D5dfF03120AFA4bDf332c61A6e1766eF37BDB",
      standardContractType: "",
      chain: 137, // nothing actually lives on ethereum here, but we need to pass a chain
      method: "eth_getBalance",
      parameters: [":userAddress", "latest"],
      returnValueTest: {
        comparator: ">=",
        value: "0",
      },
    },
  ];

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

  const fetchIpfsData = useCallback(async () => {
    const promises = fetchedHashList.map(async (cid) => {
      const response = await fetch(`https://ipfs.io/ipfs/${cid}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.text(); // Use response.json() if the data is in JSON format
      return data;
    });
    const fetchedEncryptedDataList = await Promise.all(promises);
    setFetchedEncryptedDataList(fetchedEncryptedDataList);
  }, [fetchedHashList]);


  useEffect(() => {
    const getAccount = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          setWalletAddress(accounts[0]);
        } catch (error) {
          console.error("Error requesting accounts:", error);
        }
      } else {
        alert("Metamaskがインストールされていません");
      }
    };

    getAccount();
  }, []);
  useEffect(() => {
    (async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      // Execute steps
      const litNodeClient = await loginToLitNode(signer);
      setLitNodeClient(litNodeClient);
    })();
  }, []);

  // useEffect(() => {
  //   fetchHashFromContract()
  //   fetchIpfsData()
  //   decrypt()
  //   console.log(decryptedString)
  // })

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
        <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
          <Box
            onClick={() => handleBarClick(0)}
            sx={{
              width: "400px",
              height: "25px",
              backgroundColor: selectedIndex === 0 ? "primary.main" : "grey.300",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Bar 1
          </Box>
          <Box
            onClick={() => handleBarClick(1)}
            sx={{
              width: "400px",
              height: "25px",
              backgroundColor: selectedIndex === 1 ? "primary.main" : "grey.300",
              borderRadius: "5px",
              cursor: "pointer",
              marginLeft: "5px",
            }}
          >
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
                      }}
                    >
                      <Typography variant="h6" sx={{ color: "common.white" }}>
                        {item.value}
                      </Typography>
                    </Box>
                    <Checkbox
                      {...label}
                      defaultChecked
                      sx={{ "& .MuiSvgIcon-root": { fontSize: 28, marginRight: 5 } }}
                    />
                  </Box>
                  <Checkbox
                    {...label}
                    defaultChecked
                    sx={{ "& .MuiSvgIcon-root": { fontSize:28, marginRight: 5 } }}
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
                      onClick={() => handleButtonClick(item.id)}
                    >
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
  
