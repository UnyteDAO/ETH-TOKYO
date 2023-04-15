// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Unyte {
    mapping(address => mapping(address => string)) internal ipfsHashStorage;
    mapping(address => address[]) ipfsKeys;
    
    function setIpfsHash(address target, string memory ipfsHash) public {
        mapping(address => mapping(address => string)) storage _ipfsHashStorage = ipfsHashStorage;
        _ipfsHashStorage[target][msg.sender] = ipfsHash;
        for (uint256 i = 0; i < ipfsKeys[target].length; i++) {
            if (ipfsKeys[target][i] == msg.sender) {
                return;
            }
        }
        address[] storage keys = ipfsKeys[target];
        keys.push(msg.sender);
        return;
    }

    function getIpfsHashList(address target) public view returns(address[] memory, string[] memory) {
        address[] memory keys = ipfsKeys[target];
        string[] memory ipfsHashList = new string[](keys.length);
        for(uint256 i = 0; i < keys.length; i++){
            ipfsHashList[i] = ipfsHashStorage[target][keys[i]];
        }
        return (keys, ipfsHashList);
    }

    function ping() public pure returns(string memory) {
        return "hello";
    }
}
