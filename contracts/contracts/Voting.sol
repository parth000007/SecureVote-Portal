// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Voting {
    address public admin;

    struct Candidate {
        uint256 id;
        string name;
        string party;
        uint256 voteCount;
    }

    mapping(uint256 => Candidate) public candidates;
    uint256 public candidatesCount;

    // We store a hash of the voter ID to maintain anonymity while preventing double voting
    mapping(bytes32 => bool) public hasVoted;

    bool public electionStarted;
    string public electionName;

    event ElectionStarted(string electionName);
    event ElectionEnded();
    event CandidateAdded(uint256 candidateId, string name, string party);
    event VoteCasted(bytes32 voterHash, uint256 candidateId);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    modifier electionIsActive() {
        require(electionStarted, "Election is not currently active");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    function startElection(string memory _electionName) public onlyAdmin {
        require(!electionStarted, "Election already in progress");
        electionName = _electionName;
        electionStarted = true;
        emit ElectionStarted(_electionName);
    }

    function endElection() public onlyAdmin electionIsActive {
        electionStarted = false;
        emit ElectionEnded();
    }

    function addCandidate(string memory _name, string memory _party) public onlyAdmin {
        require(!electionStarted, "Cannot add candidates after election has started");
        candidatesCount++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, _party, 0);
        emit CandidateAdded(candidatesCount, _name, _party);
    }

    function vote(bytes32 _voterHash, uint256 _candidateId) public electionIsActive {
        // Require that the voter hasn't voted before
        require(!hasVoted[_voterHash], "Voter has already cast a vote");
        
        // Require a valid candidate
        require(_candidateId > 0 && _candidateId <= candidatesCount, "Invalid candidate ID");

        // Record the vote
        hasVoted[_voterHash] = true;
        candidates[_candidateId].voteCount++;

        emit VoteCasted(_voterHash, _candidateId);
    }

    function getCandidate(uint256 _candidateId) public view returns (uint256, string memory, string memory, uint256) {
        require(_candidateId > 0 && _candidateId <= candidatesCount, "Invalid candidate ID");
        Candidate memory c = candidates[_candidateId];
        return (c.id, c.name, c.party, c.voteCount);
    }

    function getAllCandidates() public view returns (Candidate[] memory) {
        Candidate[] memory allCandidates = new Candidate[](candidatesCount);
        for (uint256 i = 1; i <= candidatesCount; i++) {
            allCandidates[i - 1] = candidates[i];
        }
        return allCandidates;
    }
}
