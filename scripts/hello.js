const { expect } = require("chai");

describe("🔥 Hello Contract Full Test Suite", function () {
  let Hello, hello;

  beforeEach(async () => {
    Hello = await ethers.getContractFactory("Hello");
    hello = await Hello.deploy();
    await hello.deployed();
  });

  it("✅ Should deploy the contract", async function () {
    expect(hello.address).to.not.equal(0);
  });

  it("✅ Should return default greeting", async function () {
    const greet = await hello.greeting();
    expect(greet).to.equal("Hello, World!");
  });

  it("✅ Should update the greeting", async function () {
    await hello.setGreeting("GM Adhyayan");
    const updated = await hello.greeting();
    expect(updated).to.equal("GM Adhyayan");
  });

  it("✅ Should not return empty string initially", async function () {
    const greet = await hello.greeting();
    expect(greet).to.not.equal("");
  });

  it("✅ Should be able to overwrite multiple times", async function () {
    await hello.setGreeting("Hello V1");
    await hello.setGreeting("Hello V2");
    const greet = await hello.greeting();
    expect(greet).to.equal("Hello V2");
  });

  it("✅ Should handle special characters", async function () {
    const special = "Namaste 🌟👋!";
    await hello.setGreeting(special);
    const greet = await hello.greeting();
    expect(greet).to.equal(special);
  });

  it("✅ Should handle long greetings", async function () {
    const longGreeting = "A".repeat(100);
    await hello.setGreeting(longGreeting);
    const greet = await hello.greeting();
    expect(greet).to.equal(longGreeting);
  });

  it("✅ Should work with lowercase + symbols", async function () {
    const custom = "yo_bro!@123";
    await hello.setGreeting(custom);
    const greet = await hello.greeting();
    expect(greet).to.equal(custom);
  });
});
