import { ethers } from "hardhat";

async function main() {
 
  const Lock = await ethers.getContractFactory("HealthCareSystem");
  const lock = await Lock.deploy();

  await lock.deployed();

  console.log(`Health Care DApp deployed to ${lock.address}`);
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
