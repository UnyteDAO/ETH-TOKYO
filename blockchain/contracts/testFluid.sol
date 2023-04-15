// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol";
import "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperToken.sol";
import "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperApp.sol";
import "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperAgreement.sol";
import "@superfluid-finance/ethereum-contracts/contracts/interfaces/agreements/IConstantFlowAgreementV1.sol";
import "@superfluid-finance/ethereum-contracts/contracts/apps/SuperAppBase.sol";

contract ContinuousTokenStream is SuperAppBase {
    ISuperfluid private host;
    IConstantFlowAgreementV1 private cfa;
    ISuperToken private token;

    constructor(
        ISuperfluid _host,
        IConstantFlowAgreementV1 _cfa,
        ISuperToken _token
    ) {
        host = _host;
        cfa = _cfa;
        token = _token;

        uint256 configWord = SuperAppDefinitions.APP_LEVEL_FINAL |
            SuperAppDefinitions.BEFORE_AGREEMENT_CREATED_NOOP |
            SuperAppDefinitions.BEFORE_AGREEMENT_UPDATED_NOOP |
            SuperAppDefinitions.BEFORE_AGREEMENT_TERMINATED_NOOP;

        host.registerApp(configWord);
    }

    function startContinuousStream(address recipient, int96 flowRate) external {
        host.callAgreement(
            cfa,
            abi.encodeWithSelector(
                cfa.createFlow.selector,
                token,
                recipient,
                flowRate,
                new bytes(0)
            ),
            "0x"
        );
    }

    function stopContinuousStream() external {
        host.callAgreement(
            cfa,
            abi.encodeWithSelector(
                cfa.deleteFlow.selector,
                token,
                address(this),
                msg.sender,
                new bytes(0)
            ),
            "0x"
        );
    }

    function isUserStreaming(address user) external view returns (bool) {
        (, int96 flowRate, , ) = cfa.getFlow(token, user, address(this));
        return flowRate > 0;
    }
}
