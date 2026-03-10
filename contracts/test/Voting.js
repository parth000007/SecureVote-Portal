const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Voting Contract", function () {
  let Voting;
  let voting;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    Voting = await ethers.getContractFactory("Voting");
    [owner, addr1, addr2] = await ethers.getSigners();
    voting = await Voting.deploy();
  });

  describe("Deployment", function () {
    it("Should set the right admin", async function () {
      expect(await voting.admin()).to.equal(owner.address);
    });

    it("Should start with 0 candidates", async function () {
      expect(await voting.candidatesCount()).to.equal(0);
    });
  });

  describe("Admin Functions", function () {
    it("Should allow admin to add candidates", async function () {
      await voting.addCandidate("Alice", "Party A");
      expect(await voting.candidatesCount()).to.equal(1);
      
      const candidate = await voting.getCandidate(1);
      expect(candidate[1]).to.equal("Alice");
      expect(candidate[2]).to.equal("Party A");
    });

    it("Should allow admin to start and end elections", async function () {
      await voting.startElection("Presidential Election");
      expect(await voting.electionStarted()).to.equal(true);
      expect(await voting.electionName()).to.equal("Presidential Election");

      await voting.endElection();
      expect(await voting.electionStarted()).to.equal(false);
    });

    it("Should prevent non-admins from adding candidates", async function () {
      await expect(voting.connect(addr1).addCandidate("Bob", "Party B"))
        .to.be.revertedWith("Only admin can perform this action");
    });
  });

  describe("Voting Process", function () {
    let voterHash;

    beforeEach(async function () {
      await voting.addCandidate("Alice", "Party A");
      await voting.startElection("Test Election");
      voterHash = ethers.id("voter123"); 
    });

    it("Should allow a vote with a valid hash", async function () {
      await voting.vote(voterHash, 1);
      const candidate = await voting.getCandidate(1);
      expect(candidate[3]).to.equal(1n); // 1 vote
    });

    it("Should prevent a voter from voting twice", async function () {
      await voting.vote(voterHash, 1);
      await expect(voting.vote(voterHash, 1)).to.be.revertedWith("Voter has already cast a vote");
    });

    it("Should prevent voting when election is not started", async function () {
      await voting.endElection();
      await expect(voting.vote(ethers.id("voter456"), 1)).to.be.revertedWith("Election is not currently active");
    });
  });
});
