import { TokenAccount } from "../models";
import { useEffect, useState } from "react";
import { cache, useAccountsContext } from "../contexts/accounts";
import { fromLamports, getTokenName } from "../utils/utils";
import { useConnection } from "../contexts/connection";
import { useWallet } from "@solana/wallet-adapter-react";
import { groupTokens } from "../utils/token";
import { useUserAccounts } from "./useUserAccounts";

export function useGroupedTokenAccounts() {
  const context = useAccountsContext();
  const { userAccounts } = useUserAccounts();
  const groupedTokenAccounts = new Map<string, TokenAccount[]>();

  for (const account of userAccounts) {
    const mint = account.info.mint;
    if (mint) {
      var fetchedAccounts = groupedTokenAccounts.get(mint.toString()) ?? [];
      fetchedAccounts.push(account);
      groupedTokenAccounts.set(mint.toString(), fetchedAccounts);
    }
  }

  return groupedTokenAccounts;
}