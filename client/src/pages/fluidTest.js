import React, { useState, useEffect } from "react";
import Web3 from "web3";
// abi is the ABI of the contract
import abi from "../abi/ContinuousTokenStream.json";

const ContinuousTokenStream = () => {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [recipient, setRecipient] = useState("");
  const [flowRate, setFlowRate] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);

  // const contractAddress = "0x897970Dac366DF78A8C611ee4d17aD3cd2067Fd5";
  // mumbai
  const contractAddress = "0xF303a33528bF350183091569fA17FdEfA34D4A15"
  // const abi = "../abi/ContinuousTokenStream.json";

  useEffect(() => {
    const init = async () => {
      console.log(abi)
      if (window.ethereum) {
        const _web3 = new Web3(window.ethereum);
        const _accounts = await _web3.eth.getAccounts();
        const _contract = new _web3.eth.Contract(abi.abi, contractAddress);

        setWeb3(_web3);
        setAccount(_accounts[0]);
        setContract(_contract);
      }
    };

    init();
  }, []);

  const startStream = async () => {
    if (contract) {
      await contract.methods.startContinuousStream(recipient, web3.utils.toWei(flowRate, "gwei")).send({ from: account });
    }
  };

  const stopStream = async () => {
    if (contract) {
      await contract.methods.stopContinuousStream().send({ from: account });
    }
  };

  const checkStream = async () => {
    if (contract) {
      const streaming = await contract.methods.isUserStreaming(account).call();
      setIsStreaming(streaming);
    }
  };

  return (
    <div>
      <h1>Continuous Token Stream</h1>
      <input
        type="text"
        placeholder="Recipient Address"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
      />
      <input
        type="text"
        placeholder="Flow Rate (Gwei)"
        value={flowRate}
        onChange={(e) => setFlowRate(e.target.value)}
      />
      <button onClick={startStream}>Start Stream</button>
      <button onClick={stopStream}>Stop Stream</button>
      <button onClick={checkStream}>Check Streaming Status</button>
      {isStreaming ? <p>User is streaming tokens</p> : <p>User is not streaming tokens</p>}
    </div>
  );
};

export default ContinuousTokenStream;
