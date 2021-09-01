import {
  Account,
  AccountInfo,
  PublicKey,
  TokenAccountBalancePair,
  TransactionInstruction,
} from "@solana/web3.js";

import { AccountInfo as TokenAccountInfo, Token } from "@solana/spl-token";
import { TOKEN_PROGRAM_ID } from "../utils/ids";

export interface GroupedTokenAccounts {
  [key: string]: {auxAccounts: [string], balances: [number], ata: string, ataInfo: any, totalBalance: number};
}

export interface GroupedTokenAccounts2 {
  key: PublicKey;
  auxAccounts: TokenAccountBalancePair[];
  totalBalance: number;
  ata: PublicKey;
  ataInfo?: AccountInfo<any>;
}

export interface TokenAccount {
  pubkey: PublicKey;
  account: AccountInfo<Buffer>;
  info: TokenAccountInfo;
}

export function approve(
  instructions: TransactionInstruction[],
  cleanupInstructions: TransactionInstruction[],
  account: PublicKey,
  owner: PublicKey,
  amount: number,
  autoRevoke = true,

  // if delegate is not passed ephemeral transfer authority is used
  delegate?: PublicKey
): Account {
  const tokenProgram = TOKEN_PROGRAM_ID;
  const transferAuthority = new Account();

  instructions.push(
    Token.createApproveInstruction(
      tokenProgram,
      account,
      delegate ?? transferAuthority.publicKey,
      owner,
      [],
      amount
    )
  );

  if (autoRevoke) {
    cleanupInstructions.push(
      Token.createRevokeInstruction(tokenProgram, account, owner, [])
    );
  }

  return transferAuthority;
}
