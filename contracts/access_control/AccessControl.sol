// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <=0.7.0;

import "./BuyerRole.sol";
import "./FabricDesignerRole.sol";
import "./FarmerRole.sol";
import "./WoolProcessorRole.sol";

contract AccessControl is
    BuyerRole,
    FabricDesignerRole,
    FarmerRole,
    WoolProcessorRole
{}
