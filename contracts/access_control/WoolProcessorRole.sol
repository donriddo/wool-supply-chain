// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <=0.7.0;

// Import the library 'Roles'
import "./Roles.sol";

// Define a contract 'WoolProcessorRole' to manage this role - add, remove, check
contract WoolProcessorRole {
    using Roles for Roles.Role;

    // Define 2 events, one for Adding, and other for Removing
    event WoolProcessorAdded(address indexed account);
    event WoolProcessorRemoved(address indexed account);

    // Define a struct 'woolProcessors' by inheriting from 'Roles' library, struct Role
    Roles.Role private woolProcessors;

    // In the constructor make the address that deploys this contract the 1st woolProcessor
    constructor() public {
        _addWoolProcessor(msg.sender);
    }

    // Define a modifier that checks to see if msg.sender has the appropriate role
    modifier onlyWoolProcessor() {
        require(isWoolProcessor(msg.sender), "Not a wool processor");
        _;
    }

    // Define a function 'isWoolProcessor' to check this role
    function isWoolProcessor(address account) public view returns (bool) {
        return woolProcessors.has(account);
    }

    // Define a function 'addWoolProcessor' that adds this role
    function addWoolProcessor(address account) public onlyWoolProcessor {
        _addWoolProcessor(account);
    }

    // Define a function 'renounceWoolProcessor' to renounce this role
    function renounceWoolProcessor() public {
        _removeWoolProcessor(msg.sender);
    }

    // Define an internal function '_addWoolProcessor' to add this role, called by 'addWoolProcessor'
    function _addWoolProcessor(address account) internal {
        woolProcessors.add(account);
        emit WoolProcessorAdded(account);
    }

    // Define an internal function '_removeWoolProcessor' to remove this role, called by 'removeWoolProcessor'
    function _removeWoolProcessor(address account) internal {
        woolProcessors.remove(account);
        emit WoolProcessorRemoved(account);
    }
}
