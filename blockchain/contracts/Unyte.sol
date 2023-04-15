// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Unyte {
    mapping(address => mapping(address => string)) internal ipfsHashStorage;
    // 誰のアドレスを指定したか→その人をレビューした人のリスト
    mapping(address => address[]) ipfsKeys;

    // 誰からの評価を受け入れるかのリスト
    mapping(address => address[]) internal allowedUsers;

    function setIpfsHash(address target, string memory ipfsHash) public {
        mapping(address => mapping(address => string))
            storage _ipfsHashStorage = ipfsHashStorage;
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

    function getIpfsHashList(
        address target
    ) public view returns (address[] memory, string[] memory) {
        address[] memory keys = ipfsKeys[target];
        string[] memory ipfsHashList = new string[](keys.length);
        for (uint256 i = 0; i < keys.length; i++) {
            ipfsHashList[i] = ipfsHashStorage[target][keys[i]];
        }
        return (keys, ipfsHashList);
    }

    function addAllowedUser(address target) external {
        require(target != address(0));
        allowedUsers[msg.sender].push(target);
    }

    function getAllowedUsers() external view returns (address[] memory) {
        return allowedUsers[msg.sender];
    }

    function removeAllowedUser(address target) external {
        address[] memory users = allowedUsers[msg.sender];
        uint256 length = users.length;
        for (uint256 i = 0; i < length; i++) {
            if (users[i] == target) {
                delete users[i];
            }
        }
        allowedUsers[msg.sender] = users;
    }

    function ping() public pure returns (string memory) {
        return "hello";
    }
}
