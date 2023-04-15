import React, { useState , useEffect, useCallback} from "react";
import {
  TextField,
  InputAdornment,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
  IconButton,
  Avatar,
  Button,
} from "@mui/material";
import { ListWrapper, ListContent } from "../styled/styledComps";
import SearchIcon from "@mui/icons-material/Search";
import FolderIcon from "@mui/icons-material/Folder";
import { useNavigate } from "react-router-dom";
import DecryptoPopup from "../components/DecryptoPopup";
import MyTokenContract from '../artifacts/MyToken.json';
import MyTokenFactoryContract from '../artifacts/MyTokenFactory.json';
import Unyte from "../artifacts/Unyte.json";
import { ethers } from "ethers";
import { AbiItem } from "web3-utils";
import Web3 from "web3";

// interface Data {
//   id: number;
//   name: string;
// }


// const data: Data[] = Array(10)
//   .fill(0)
//   .map((_, index) => ({
//     id: index,
//     name: `Item ${index + 1}`,
//   }));

const Recruiter = () => {
  const navigate = useNavigate();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
const [searchWord, setSearchWord] = useState("")


  const handleOpenPopup = (address: string) => {
    setIsPopupOpen(true);
    
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleSearch = () => {
    console.log("Search clicked");
    fetchHashFromContract(searchWord);
  };

  // ABIの参照
  const ContractABI = MyTokenFactoryContract.abi;
  // アドレス（Unyte：CELO）
  const contractAddress = "0x396955CB5Eb4EdF050e0D2A19424c7E4Cb14bCEE";
  // 引数からMyTokenアドレスを取得する。
  const token = "0xffA3396D19c93017FfC175532E175F80496fe5C3";

  const [contract, setContract] = useState<any>([]);
  const [unyteContract, setUnyteContract] = useState<any>([]);
  const [accounts, setAccounts] = useState([]);

  const [fetchedKeyList, setFetchedKeyList] = useState<string[]>([]);
  const [fetchedHashList, setFetchedHashList] = useState<string[]>([]);

  const [reviewerList, setReviewerList] = useState<any>([{id: 0, name: "name"}]);
  /**
   * useEffect関数
   */
  useEffect(() => {
    /**
     * init関数
     * @param token MyTokenコントラクトアドレス
     */
    const init = async () => {
      try {
        const { ethereum } = window;
        if (ethereum) {
          // MyTokenコントラクトの情報を取得する。
          const MyToken = '0xffA3396D19c93017FfC175532E175F80496fe5C3';
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          // ウォレットアドレスに対してアクセスをリクエストしています。
          const web3Accounts = await ethereum.request({
            method: "eth_requestAccounts",
          });
          const instance = new ethers.Contract(
            MyToken,
            MyTokenContract.abi,
            signer
          );
          // const instance = new web3.eth.Contract(MyTokenContract.abi, MyToken);
          // コントラクトより名前、シンボル、所有者、総発行数、残高、pause状態を取得する。
          // const name = await instance.methods.name().call();
          const name = await instance.name();
          const symbol = await instance.symbol();
          const owner = await instance.owner();
          // const balanceOf = await instance.methods.balanceOf(web3Accounts[0]).call();
          // const balanceOf = await instance.balanceOf(web3Accounts[0]);
          // const nonces = await instance.nonces(web3Accounts[0]);
          // const paused = await instance.paused();
          // Ownerかどうかチェックする。
          // ステート変数に値を詰める。
          // eslint-disable-next-line 
          setContract(instance);
          setAccounts(web3Accounts);

          // setup instance to call contract with JSON RPC
          const web3 = new Web3(Web3.givenProvider);
          const contract = new web3.eth.Contract(
            Unyte.abi as AbiItem[],
            "0x396955CB5Eb4EdF050e0D2A19424c7E4Cb14bCEE"
          );
          setUnyteContract(contract);
        }
      } catch (error) {
        alert(`Failed to load web3, accounts, or contract. Check console for details.`,);
        console.error(error);
      }
    }
    init();
  }, []);

    /**
   * 「移転」ボタンを押した時の関数
   */
  const buttonTransfer = async (to:any,amount:any) => {
    try {
      // pause関数の呼び出し。
      await contract.transfer(to, amount).send({
        from: accounts[0],
        gas: 6500000
      });
      alert("送金成功！");
    } catch (error) {
      alert(`送金に失敗しました。`);
      console.error(error);
    }
  };

  // コントラクトの読み込み
  const fetchHashFromContract = useCallback(async (address:any) => {
    if (contract) {
      // TODO: 取得の向け先を変更できるように
      const resp = await unyteContract.methods
        .getIpfsHashList(address)
        .call();
      console.log(resp);
      setFetchedHashList(resp[1]);
      setFetchedKeyList(resp[0]);
      console.log(resp[0])
    }
  }, [contract]);

  return (
    <ListWrapper>
      <ListContent>
        <Box>
          <TextField
            fullWidth
            label="Search"
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleSearch} edge="end">
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
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
            value={searchWord}
            onChange={(e) => {
              setSearchWord(e.target.value);
            }}
          />
        </Box>
        <Box>
          <List>
            {reviewerList.map((item:any) => (
              <>
              <ListItem key={item.id}>
                <ListItemAvatar>
                  <Avatar>
                    <FolderIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={item.name} />
                <ListItemSecondaryAction>

                </ListItemSecondaryAction>
              </ListItem>
              <DecryptoPopup
                isOpen={isPopupOpen}
                onClose={handleClosePopup}
                title="Sample Popup">
                <p>購入して詳細画面に進みますか？</p>
                <Button onClick={() => {navigate(`/recruiter/${searchWord}`)}}>はい</Button>
                <Button onClick={() => {setIsPopupOpen(false)}}>いいえ</Button>
              </DecryptoPopup>
              </>
            ))}
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleOpenPopup(token)}
                sx={{ marginTop: 5 }}
              >
                Purchase
              </Button>
          </List>
        </Box>
      </ListContent>
    </ListWrapper>
  );
};

export default Recruiter;
