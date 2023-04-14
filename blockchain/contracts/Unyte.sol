// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Unyte {
    mapping(address => mapping(address => bytes32)) internal ipfsHashStorage;
    mapping(address => address[]) ipfsKeys;
    
    function setIpfsHash(address target, bytes32 ipfsHash) public {
        ipfsHashStorage[target][msg.sender] = ipfsHash;
        for (uint256 i = 0; i < ipfsKeys[target].length; i++) {
            if (ipfsKeys[target][i] == target) {
                return;
            }
        }
        address[] storage keys = ipfsKeys[target];
        keys.push(target);
        return;
    }

    function getIpfsHashList(address target) public view returns(address[] memory, bytes32[] memory) {
        address[] memory keys = ipfsKeys[target];
        bytes32[] memory ipfsHashList = new bytes32[](keys.length);
        for(uint256 i = 0; i < keys.length; i++){
            ipfsHashList[i] = ipfsHashStorage[target][keys[i]];
        }
        return (keys, ipfsHashList);
    }

    function ping() public pure returns(string memory) {
        return "hello";
    }
}
