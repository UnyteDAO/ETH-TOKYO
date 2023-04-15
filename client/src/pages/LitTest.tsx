import * as LitJsSdk from "@lit-protocol/lit-node-client";
import { ethers } from 'ethers';
import { useCallback, useEffect, useState } from "react";
import { loginToLitNode } from "../components/litTest";
import Web3 from "web3";
import { AbiItem } from "web3-utils";
import { Contract } from "web3-eth-contract";
import detectEthereumProvider from "@metamask/detect-provider";
import Unyte from "../artifacts/Unyte.json";

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

async function uploadToIPFS(encryptedData: String) {
    const { cid } = await ipfs.add(encryptedData);
    return cid.toString();

}

// celoテストトークン
const accessControlConditions = [
  {
    contractAddress: '0xffA3396D19c93017FfC175532E175F80496fe5C3',
    standardContractType: 'ERC20',
    chain: "alfajores", 
    method: 'balanceOf',
    parameters: [
      ':userAddress'
    ],
    returnValueTest: {
      comparator: '>',
      value: '0'
    }
  }
]

const LitTest = () => {
    const [litNodeClient, setLitNodeClient] = useState<LitJsSdk.LitNodeClient | null>(null);
    const [text, setText] = useState("")
    const [key, setKey] = useState<Uint8Array>()
    const [encryptedData, setEncryptedData] = useState<Blob | undefined>()
    const [encryptedBinary, setEncryptedBinary] = useState<Uint8Array | undefined>()
    const [decryptedString, setDecryptedString] = useState<string | undefined>()
    const [contract, setContract] = useState<Contract>()
    const [account, setAccount] = useState("")
    const [cid, setCid] = useState<string | undefined>()
    const [fetchedKeyList, setFetchedKeyList] = useState<string[]>([])
    const [fetchedHashList, setFetchedHashList] = useState<string[]>([])
    const [fetchedEncryptedDataList, setFetchedEncryptedDataList] = useState<string[]>([])
    const [decryptedStringList, setDecryptedStringList] = useState<string[]>([])

    useEffect(() => {
        (async () => {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();

            // Execute steps
            const litNodeClient = await loginToLitNode(signer);
            setLitNodeClient(litNodeClient);
        })()
    }, [])

    const encrypt = useCallback(async () => {
        if (litNodeClient) {
            const { encryptedData, symmetricKey } = await LitJsSdk.encryptString(text);
            // store the access control conditions
            const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain: "ethereum" });
            const encryptedSymmetricKey = await litNodeClient.saveEncryptionKey({
                accessControlConditions,
                symmetricKey,
                authSig,
                chain: "ethereum", // nothing actually lives on ethereum here, but we need to pass a chain
            }
            );
            console.log("encryptedSymmetricKey", encryptedSymmetricKey)
            setKey(encryptedSymmetricKey)
            setEncryptedData(encryptedData)
            if (encryptedData) {
                const result = new Uint8Array(await encryptedData.arrayBuffer())
                setEncryptedBinary(result)
            }
            // Decode the Uint8Array to a string
            // const decoder = new TextDecoder("utf-16");
            // const decodedString = decoder.decode(encryptedSymmetricKey);
            // console.log(decodedString)

        }
    }, [litNodeClient, text])

    const decrypt = useCallback(async () => {
        if (litNodeClient && encryptedData) {
            const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain: "ethereum" });

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

            setDecryptedString(decryptedString)
        }
    }, [encryptedData, key, litNodeClient])

    const upload = useCallback(async () => {
        if (encryptedBinary && key) {
            const data = {
                encryptedText: encryptedBinary,
                encryptedKey: key
            }
            const cid = await uploadToIPFS(JSON.stringify(data))
            console.log(cid)
            setCid(cid)
        }
    }, [encryptedBinary, key])

    const saveOnContract = useCallback(async () => {
        if (contract && cid) {
            // TODO: 評価の向け先を入力したwallet addressに変更できるように
            await contract.methods.setIpfsHash("0x24fA019F419811Dd5e62e4e0EFc62abCfb703494", cid).send({ from: account })
        }
    }, [account, cid, contract])

    const fetchHashFromContract = useCallback(async () => {
        if (contract) {
            // TODO: 取得の向け先を変更できるように
            const resp = await contract.methods.getIpfsHashList("0x24fA019F419811Dd5e62e4e0EFc62abCfb703494").call()
            console.log(resp)
            setFetchedHashList(resp[1])
            setFetchedKeyList(resp[0])
        }
    }, [contract])

    const fetchIpfsData = useCallback(async () => {
        const promises = fetchedHashList.map(async (cid) => {
            const response = await fetch(`https://ipfs.io/ipfs/${cid}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.text(); // Use response.json() if the data is in JSON format
            return data
        })
        const fetchedEncryptedDataList = await Promise.all(promises)
        setFetchedEncryptedDataList(fetchedEncryptedDataList)
    }, [fetchedHashList])

    const decrypt2 = useCallback(async () => {
        if (litNodeClient && fetchedEncryptedDataList) {
            const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain: "ethereum" });

            const promises = fetchedEncryptedDataList.map(async (dataStr) => {
                const data = JSON.parse(dataStr)
                console.log(Object.values(data.encryptedKey))
                const symmetricKeyFromNodes = await litNodeClient.getEncryptionKey({
                    accessControlConditions,
                    toDecrypt: LitJsSdk.uint8arrayToString(new Uint8Array(Object.values(data.encryptedKey)), "base16"),
                    chain: "ethereum", // nothing actually lives on ethereum here, but we need to pass a chain
                    authSig,
                });

                const decryptedString = await LitJsSdk.decryptString(
                    new Blob([new Uint8Array(Object.values(data.encryptedText))]),
                    symmetricKeyFromNodes
                );

                return decryptedString
            })

            const textList = await Promise.all(promises)
            setDecryptedStringList(textList)
        }
    }, [fetchedEncryptedDataList, litNodeClient])

    const connectMetamask = useCallback(async () => {
        console.log("Welcome to MetaMask User🎉");
        const web3 = new Web3(Web3.givenProvider);
        // connect with metamask wallet
        const accounts = await web3.eth.requestAccounts();
        const account = accounts[0];

        // setup instance to call contract with JSON RPC
        const contract = new web3.eth.Contract(
            Unyte.abi as AbiItem[],
            "0x8745C780Ee53339A0c4A5fB97B6CDbE23ae9925c"
        );

        setContract(contract)
        setAccount(account)

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
        <>
            <h1>lit test</h1>
            <div>connected wallet: {account}</div>
            <input type="text" value={text} onChange={(event) => {
                setText(event.target.value)
            }} />
            <br />
            <button onClick={encrypt}>encrypt</button>
            <br />
            <input type="text" value={encryptedBinary?.toString()} />
            <br />
            <button onClick={decrypt}>decrypt</button>
            <br />
            <input type="text" value={decryptedString} />
            <br />
            <button onClick={upload}>upload to ipfs</button>
            <br />
            <input type="text" value={cid} />
            <br />
            <button onClick={saveOnContract}>save on contract</button>
            <br />
            <button onClick={fetchHashFromContract}>get hash from contract</button>
            <br />
            <input type="text" value={fetchedHashList?.join(",")} />
            <br />
            <button onClick={fetchIpfsData}>fetch data from ipfs</button>
            <br />
            <textarea value={fetchedEncryptedDataList} rows={10} cols={100} ></textarea>
            <br />
            <button onClick={decrypt2}>decrypt2</button>
            <br />
            <textarea value={decryptedStringList.join(",")} rows={10} cols={100} ></textarea>
        </>
    )
}

export default LitTest