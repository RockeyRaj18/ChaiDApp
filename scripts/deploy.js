const {ethers} = require("hardhat");

async function getBalances(address) {
  const balanceBigInt = await hre.ethers.provider.getBalance(address);
  return hre.ethers.formatEther(balanceBigInt);
}

async function consoleBalances(addresses) {
  let counter = 0;
  for (const address of addresses) {
    console.log(`Address ${counter} balance:`, await getBalances(address));
    counter++;
  }
}

async function consoleMemos(memos) {
  for (const memo of memos) {
    const timestamp = memo.timestamp;
    const name = memo.name;
    const from = memo.from;
    const message = memo.message;
    console.log(
      `At ${timestamp}, name: ${name}, address: ${from}, message: ${message}`
    );
  }
}

async function main() {
  const [owner, from1, from2, from3] = await hre.ethers.getSigners();
  const Chai = await hre.ethers.getContractFactory("Chai");
const contract = await Chai.deploy(); // Deploy contract instance

await contract.waitForDeployment(); // Use this instead of contract.deployed()
console.log("Address of contract:", contract.target); // Use target instead of address


  const addresses = [owner.address, from1.address, from2.address, from3.address];
  
  console.log("Before buying chai");
  await consoleBalances(addresses); // Fixed function name

  const amount = { value: ethers.parseEther("1") };
  
  await contract.connect(from1).buyChai("from1", "Very nice chai", amount);
  await contract.connect(from2).buyChai("from2", "Very nice course", amount);
  await contract.connect(from3).buyChai("from3", "Very nice information", amount);

  console.log("After buying chai");
  await consoleBalances(addresses); // Fixed function name

  const memos = await contract.getMemos();
  await consoleMemos(memos);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
