// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AfricoinRemittance {
    event Transfer(address indexed sender, address indexed receiver, uint256 amount);

    function sendFunds(address payable _receiver, uint256 _amount) external payable {
        require(msg.value == _amount, "Incorrect amount sent");
        _receiver.transfer(_amount);
        emit Transfer(msg.sender, _receiver, _amount);
    }
}
