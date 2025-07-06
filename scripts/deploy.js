async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying from:", deployer.address);

  const USDT = await ethers.getContractFactory("USDT");
  const usdt = await USDT.deploy();
  await usdt.deployed();
  console.log("USDT:", usdt.address);

  const USDC = await ethers.getContractFactory("USDC");
  const usdc = await USDC.deploy();
  await usdc.deployed();
  console.log("USDC:", usdc.address);

  // Save addresses to file
  const fs = require('fs');
  fs.writeFileSync('deployed.json', JSON.stringify({
    USDT: usdt.address,
    USDC: usdc.address
  }, null, 2));
}

main();
