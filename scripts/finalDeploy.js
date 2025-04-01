const {ethers} = require("hardhat");
async function main() {
    const Chai = await hre.ethers.getContractFactory("Chai");
  const contract = await Chai.deploy(); // Deploy contract instance

  await contract.waitForDeployment(); // Use this instead of contract.deployed()
  console.log("Address of contract:", contract.target); // Use target instead of address
}
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});