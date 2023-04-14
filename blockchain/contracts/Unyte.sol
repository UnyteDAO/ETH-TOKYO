// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Unyte {
    mapping(address => mapping(address => bytes32)) internal ipfsHashStorage;
    address[] ipfsKeys;
    
    function setIpfsHash(address target, bytes32 ipfsHash) public {
        ipfsHashStorage[target][msg.sender] = ipfsHash;
        for (uint256 i = 0; i < ipfsKeys.length; i++) {
            if (ipfsKeys[i] == target) {
                return;
            }
        }
        ipfsKeys.push(address);
    }

    function getIpfsHashList() public view returns(address[] memory, bytes32[] memory) {
        bytes32[] memory ipfsHashList;
        for(uint256 i = 0; i < ipfsKeys.length; i++){
            ipfsHashList.push(ipfsHashStorage[ipfsKeys[i]]);
        }
        return (ipfsKeys, ipfsHashList);
    }

    function ping() public pure returns(string memory) {
        return "hello";
    }
}
