const hre = require("hardhat");

async function main() {
    const Wallet = await hre.ethers.getContractFactory("AfricoinWallet");
    const wallet = await Wallet.deploy();
    await wallet.deployed();
    console.log("AfricoinWallet deployed to:", wallet.address);

    const Loans = await hre.ethers.getContractFactory("AfricoinLoans");
    const loans = await Loans.deploy();
    await loans.deployed();
    console.log("AfricoinLoans deployed to:", loans.address);

    const Remittance = await hre.ethers.getContractFactory("AfricoinRemittance");
    const remittance = await Remittance.deploy();
    await remittance.deployed();
    console.log("AfricoinRemittance deployed to:", remittance.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
