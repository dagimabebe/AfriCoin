// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AfricoinLoans {
    struct Loan {
        address borrower;
        uint256 amount;
        uint256 interestRate; // in percentage
        uint256 repaymentDate;
        bool repaid;
    }

    mapping(uint256 => Loan) public loans;
    uint256 public loanCount;

    event LoanCreated(uint256 indexed id, address indexed borrower, uint256 amount);
    event LoanRepaid(uint256 indexed id);

    function createLoan(uint256 _amount, uint256 _interestRate, uint256 _durationInDays) external {
        uint256 repaymentDate = block.timestamp + (_durationInDays * 1 days);
        loans[loanCount] = Loan({
            borrower: msg.sender,
            amount: _amount,
            interestRate: _interestRate,
            repaymentDate: repaymentDate,
            repaid: false
        });
        emit LoanCreated(loanCount, msg.sender, _amount);
        loanCount++;
    }

    function repayLoan(uint256 _id) external payable {
        Loan storage loan = loans[_id];
        require(!loan.repaid, "Loan already repaid");
        require(msg.sender == loan.borrower, "Only borrower can repay");
        require(msg.value >= loan.amount + (loan.amount * loan.interestRate / 100), "Insufficient repayment");

        loan.repaid = true;
        emit LoanRepaid(_id);
    }
}
