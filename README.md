![image](https://github.com/user-attachments/assets/7950be1f-faef-454e-b4ec-2c06778d5c9b)


# Hardhat Local Solidity Project
# by Adhyayan Maini

# Overview:
This is a simple and beginner-friendly Solidity project using the Hardhat framework. It allows local development, testing, and deployment of smart contracts on a local Ethereum environment.

![image](https://github.com/user-attachments/assets/10a841c1-54dd-4a71-b617-53d3a2434d74)


# Project Purpose:
To provide a clean and modular setup for anyone learning or building on Ethereum using Solidity and Hardhat. Includes basic contract, test, and deploy scripts.

# Directory Structure:

contracts/Hello.sol – A basic "Hello World" smart contract

scripts/deploy.js – Script to deploy the contract

test/test.js – Test file using Hardhat's Mocha framework

hardhat.config.js – Project configuration for Hardhat

package.json – Dependency and script definitions

Smart Contract – Hello.sol:
This smart contract initializes with a default greeting and allows the greeting to be updated by calling setGreeting.

Solidity Version: 0.8.20

# Contract Code:

"solidity
Copy code
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Hello {
    string public greeting = "Hello, World!";

    function setGreeting(string memory _greeting) public {
        greeting = _greeting;
    }
}"
# How to Run:

Install dependencies:
# npm install

Compile the contract:
# npx hardhat compile

Run tests:
# npx hardhat test

Deploy to local network:
# npx hardhat run scripts/deploy.js --network hardhat

Optional – Start a local Hardhat node:
# npx hardhat node

Then deploy with:
# npx hardhat run scripts/deploy.js --network localhost

Author:
# Adhyayan Maini

License:
MIT License
