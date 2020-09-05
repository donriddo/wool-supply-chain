// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <=0.7.0;

// Import the library 'Roles'
import "./Roles.sol";

// Define a contract 'FabricDesignerRole' to manage this role - add, remove, check
contract FabricDesignerRole {
    using Roles for Roles.Role;

    // Define 2 events, one for Adding, and other for Removing
    event FabricDesignerAdded(address indexed account);
    event FabricDesignerRemoved(address indexed account);

    // Define a struct 'fabricDesigners' by inheriting from 'Roles' library, struct Role
    Roles.Role private fabricDesigners;

    // In the constructor make the address that deploys this contract the 1st fabricDesigner
    constructor() public {
        _addFabricDesigner(msg.sender);
    }

    // Define a modifier that checks to see if msg.sender has the appropriate role
    modifier onlyFabricDesigner() {
        require(isFabricDesigner(msg.sender), "Not a fabric designer");
        _;
    }

    // Define a function 'isFabricDesigner' to check this role
    function isFabricDesigner(address account) public view returns (bool) {
        return fabricDesigners.has(account);
    }

    // Define a function 'addFabricDesigner' that adds this role
    function addFabricDesigner(address account) public onlyFabricDesigner {
        _addFabricDesigner(account);
    }

    // Define a function 'renounceFabricDesigner' to renounce this role
    function renounceFabricDesigner() public {
        _removeFabricDesigner(msg.sender);
    }

    // Define an internal function '_addFabricDesigner' to add this role, called by 'addFabricDesigner'
    function _addFabricDesigner(address account) internal {
        fabricDesigners.add(account);
        emit FabricDesignerAdded(account);
    }

    // Define an internal function '_removeFabricDesigner' to remove this role, called by 'removeFabricDesigner'
    function _removeFabricDesigner(address account) internal {
        fabricDesigners.remove(account);
        emit FabricDesignerRemoved(account);
    }
}
