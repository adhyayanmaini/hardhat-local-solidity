const { ethers } = require("hardhat");
const fs = require("fs");

async function main() {
  const deployed = JSON.parse(fs.readFileSync("deployed.json"));
  const [sender] = await ethers.getSigners();

  const recipient = "0xYourAddressHere"; // Replace with your MetaMask or test addr
  const tokenType = "USDC"; // ETH | USDT | USDC

  if (tokenType === "ETH") {
    const tx = await sender.sendTransaction({
      to: recipient,
      value: ethers.utils.parseEther("100")
    });
    await tx.wait();
    console.log("Dripped 100 ETH to", recipient);
  } else {
    const token = await ethers.getContractAt("ERC20", deployed[tokenType]);
    const tx = await token.transfer(recipient, ethers.utils.parseUnits("1000", 6));
    await tx.wait();
    console.log(`Dripped 1000 ${tokenType} to`, recipient);
  }
}

main();
