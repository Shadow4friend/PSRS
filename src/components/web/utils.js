export const PSRS_TOKEN = "TFXX6gSzYFhy1wEbvZhS75G2g3JM1pgc8t";

export function getTronWeb() {
  if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
    return window.tronWeb;
  }
  return null;
}
export const EXCHANGE_ABI = {
  entrys: [
    {
      outputs: [{ name: "balance_trc20", type: "uint256" }],
      constant: true,
      inputs: [{ name: "token_address", type: "address" }],
      name: "TRC20Balance",
      stateMutability: "View",
      type: "Function"
    },
    {
      outputs: [{ type: "address" }],
      constant: true,
      name: "PooledAddress",
      stateMutability: "View",
      type: "Function"
    },
    {
      outputs: [{ type: "bool" }],
      constant: true,
      name: "StakeStatus",
      stateMutability: "View",
      type: "Function"
    },
    {
      outputs: [{ name: "status", type: "bool" }],
      name: "StartUnFreeze",
      stateMutability: "Nonpayable",
      type: "Function"
    },
    {
      outputs: [{ type: "bool" }],
      inputs: [
        { name: "_staker", type: "address" },
        { name: "_amount", type: "uint256" },
        { name: "_seconds", type: "uint256" }
      ],
      name: "AddStaker",
      stateMutability: "Nonpayable",
      type: "Function"
    },
    {
      outputs: [{ name: "amount_withdraw", type: "uint256" }],
      inputs: [{ name: "receiver", type: "address" }],
      name: "WithdrawAllTRX",
      stateMutability: "Nonpayable",
      type: "Function"
    },
    {
      outputs: [{ type: "uint256" }],
      constant: true,
      name: "MinFreeze",
      stateMutability: "View",
      type: "Function"
    },
    {
      outputs: [{ type: "bool" }],
      name: "SetUnavailable",
      stateMutability: "Nonpayable",
      type: "Function"
    },
    {
      outputs: [{ type: "bool" }],
      inputs: [{ name: "_minfreeze", type: "uint256" }],
      name: "UpdateConfig",
      stateMutability: "Nonpayable",
      type: "Function"
    },
    {
      outputs: [{ type: "bool" }],
      name: "SetActive",
      stateMutability: "Nonpayable",
      type: "Function"
    },
    { name: "ClaimReward", stateMutability: "Nonpayable", type: "Function" },
    {
      outputs: [{ type: "uint256" }],
      constant: true,
      name: "UnavailableAt",
      stateMutability: "View",
      type: "Function"
    },
    {
      outputs: [
        { name: "FreezeBalance", type: "uint256" },
        { name: "FreezeStart", type: "uint256" }
      ],
      constant: true,
      inputs: [{ type: "address" }],
      name: "StakersInfo",
      stateMutability: "View",
      type: "Function"
    },
    { name: "StartFreeze", stateMutability: "Nonpayable", type: "Function" },
    {
      outputs: [{ name: "amount_trc20_withdraw", type: "uint256" }],
      inputs: [
        { name: "receiver", type: "address" },
        { name: "token_address", type: "address" },
        { name: "token_decimal", type: "uint256" },
        { name: "amount_withdraw", type: "uint256" }
      ],
      name: "WithdrawTokenTRC20",
      stateMutability: "Nonpayable",
      type: "Function"
    },
    {
      outputs: [{ name: "balance_trx", type: "uint256" }],
      constant: true,
      name: "TRXBalance",
      stateMutability: "View",
      type: "Function"
    },
    {
      outputs: [{ name: "_amount", type: "uint256" }],
      constant: true,
      name: "GetTotalReward",
      stateMutability: "View",
      type: "Function"
    },
    {
      inputs: [{ name: "token", type: "address" }],
      stateMutability: "Nonpayable",
      type: "Constructor"
    },
    {
      inputs: [
        { name: "staker", type: "address" },
        { name: "amount", type: "uint256" },
        { name: "timeFreeze", type: "uint256" }
      ],
      name: "Freeze",
      type: "Event"
    },
    {
      inputs: [
        { name: "staker", type: "address" },
        { name: "amount", type: "uint256" },
        { name: "timeClaim", type: "uint256" }
      ],
      name: "Claim",
      type: "Event"
    },
    {
      inputs: [
        { name: "staker", type: "address" },
        { name: "amount", type: "uint256" }
      ],
      name: "Unfreeze",
      type: "Event"
    }
  ]
};
