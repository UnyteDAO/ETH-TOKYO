import * as LitJsSdk from "@lit-protocol/lit-node-client";
import { ethers } from 'ethers';
import { useCallback, useEffect, useState } from "react";
import { loginToLitNode } from "../components/litTest";

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

const LitTest = () => {
    const [litNodeClient, setLitNodeClient] = useState<LitJsSdk.LitNodeClient | null>(null);
    const [text, setText] = useState("")
    const [key, setKey] = useState<Uint8Array>()
    const [encryptedData, setEncryptedData] = useState<Blob | undefined>()
    const [encryptedText, setEncryptedText] = useState<string | undefined>()
    const [decryptedString, setDecryptedString] = useState<string | undefined>()

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
            setKey(encryptedSymmetricKey)
            setEncryptedData(encryptedData)
            const resultText = await encryptedData?.text()
            setEncryptedText(resultText)
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

    return (
        <>
            <h1>lit test</h1>
            <input type="text" value={text} onChange={(event) => {
                setText(event.target.value)
            }} />
            <br />
            <button onClick={encrypt}>encrypt</button>
            <br />
            <input type="text" value={encryptedText} />
            <br />
            <button onClick={decrypt}>decrypt</button>
            <br />
            <input type="text" value={decryptedString} />
        </>
    )
}

export default LitTest