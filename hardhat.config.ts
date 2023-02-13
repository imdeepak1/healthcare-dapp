import { HardhatUserConfig } from "hardhat/config";
import 'solidity-coverage'
import "@nomicfoundation/hardhat-toolbox";


const config: HardhatUserConfig = {
  solidity: "0.8.17",
  defaultNetwork: `hardhat`,
  networks: {
    goerli: {
      url: `https://eth-goerli.g.alchemy.com/v2/{YOUR-API-KEY}`,
      accounts:[`{ACCOUNT-PRIVATE-KEY}`],
    },
    
    arbitrum: {
      url:"https://arb-goerli.g.alchemy.com/v2/{YOUR-API-KEY}",
      accounts: ["{ACCOUNT-PRIVATE-KEY}"],
    },
  },
};

export default config;


// Goerli Test - 0x396775A338CACE8665338EFDA34458f018AacD05
 
// Arbitrum Test - 0xacaB57893f3167258AdAFA8A2376ae648FAFa91D
