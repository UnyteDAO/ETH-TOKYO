// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Unyte {
    mapping(address => mapping(address => bytes32)) internal ipfsStorage;
    mapping(address => mapping(address => bytes32)) internal keyStorage;
    
    function setIpfs(address target, bytes32 iphsHash, bytes32 key) public {
        ipfsStorage[target][msg.sender] = iphsHash;
        keyStorage[target][msg.sender] = key;
    }

    function ping() public pure returns(string memory) {
        return "hello";
    }
}
