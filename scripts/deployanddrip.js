async function main() {
  const [deployer] = await ethers.getSigners();
  const recipient = "0xC3b204f79D2049066766825244dE89E8505BF687"; // <-- change this to your real wallet

  console.log("🚀 Deploying contracts with:", deployer.address);

  // Deploy USDC
  const USDC = await ethers.getContractFactory("USDC");
  const usdcInstance = await USDC.deploy();
  await usdcInstance.waitForDeployment();
  const usdcAddress = await usdcInstance.getAddress();
  console.log("✅ USDC deployed at:", usdcAddress);

  // Deploy USDT
  const USDT = await ethers.getContractFactory("USDT");
  const usdtInstance = await USDT.deploy();
  await usdtInstance.waitForDeployment();
  const usdtAddress = await usdtInstance.getAddress();
  console.log("✅ USDT deployed at:", usdtAddress);

  // Send 1000 USDC
  const tx1 = await usdcInstance.transfer(recipient, ethers.parseUnits("1000", 6));
  await tx1.wait();
  console.log("✅ Sent 1000 USDC to", recipient);

  // Send 1000 USDT
  const tx2 = await usdtInstance.transfer(recipient, ethers.parseUnits("1000", 6));
  await tx2.wait();
  console.log("✅ Sent 1000 USDT to", recipient);

  // Send 10 ETH
  const tx3 = await deployer.sendTransaction({
    to: recipient,
    value: ethers.parseEther("10"),
  });
  await tx3.wait();
  console.log("✅ Sent 10 ETH to", recipient);
}

main().catch((error) => {
  console.error("❌ Error:", error);
  process.exit(1);
});
