import { ethers } from "hardhat";

async function main() {
 
  const Lock = await ethers.getContractFactory("HealthCareSystem");
  const lock = await Lock.deploy();

  await lock.deployed();

  console.log(`Health Care DApp deployed to ${lock.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.


//new
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
