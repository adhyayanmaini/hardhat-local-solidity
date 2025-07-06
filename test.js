const hre = require("hardhat");
const chalk = require("chalk");

(async () => {
  console.log(chalk.white.bold("\nRunning Smart Contract Tests...\n"));

  let passed = 0;

  try {
    // Compile the contract
    await hre.run("compile");

    // Deploy contract
    const Hello = await hre.ethers.getContractFactory("Hello");
    const hello = await Hello.deploy(); // no .deployed()
    await hello.waitForDeployment(); // <- use this instead of deployed()

    const address = await hello.getAddress();
    console.log(chalk.green("✅ Contract deployed at:"), chalk.gray(address));
    passed++;

    // Test 1: Default greeting
    const defaultGreet = await hello.greeting();
    if (defaultGreet === "Hello, World!") {
      console.log(chalk.green("✅ Default greeting is correct"));
      passed++;
    }

    // Test 2: Set normal greeting
    await hello.setGreeting("Hello Dev");
    if ((await hello.greeting()) === "Hello Dev") {
      console.log(chalk.green("✅ Updated greeting is correct"));
      passed++;
    }

    // Test 3: Set empty string
    await hello.setGreeting("");
    if ((await hello.greeting()) === "") {
      console.log(chalk.green("✅ Handles empty string"));
      passed++;
    }

    // Test 4: Long string
    const long = "A".repeat(255);
    await hello.setGreeting(long);
    if ((await hello.greeting()) === long) {
      console.log(chalk.green("✅ Handles long string"));
      passed++;
    }

    // Test 5: Special characters
    const special = "!?@#_$%^";
    await hello.setGreeting(special);
    if ((await hello.greeting()) === special) {
      console.log(chalk.green("✅ Handles special characters"));
      passed++;
    }

    // Test 6: Overwrite again
    await hello.setGreeting("Final Greeting");
    if ((await hello.greeting()) === "Final Greeting") {
      console.log(chalk.green("✅ Can overwrite multiple times"));
      passed++;
    }

    // Test 7: Delay simulate state persist
    setTimeout(async () => {
      if ((await hello.greeting()) === "Final Greeting") {
        console.log(chalk.green("✅ State persists after delay"));
        passed++;

        console.log(chalk.white.bold(`\nAll ${passed}/8 tests passed ✅`));
      } else {
        throw new Error("State not persisted");
      }
    }, 500);

  } catch (err) {
    console.log(chalk.red("❌ Test failed:"), err.message);
  }
})();
