const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("AfricoinWallet", function () {
    let wallet;

    beforeEach(async function () {
        const Wallet = await ethers.getContractFactory("AfricoinWallet");
        wallet = await Wallet.deploy();
        await wallet.deployed();
    });

    it("Should allow deposits", async function () {
        const [owner] = await ethers.getSigners();
        await owner.sendTransaction({ to: wallet.address, value: ethers.utils.parseEther("1") });
        expect(await wallet.getBalance()).to.equal(ethers.utils.parseEther("1"));
    });

    it("Should allow withdrawals", async function () {
        const [owner] = await ethers.getSigners();
        await owner.sendTransaction({ to: wallet.address, value: ethers.utils.parseEther("1") });
        await wallet.withdraw(ethers.utils.parseEther("0.5"));
        expect(await wallet.getBalance()).to.equal(ethers.utils.parseEther("0.5"));
    });
});
