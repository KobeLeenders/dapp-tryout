import { TokenAccount } from "../models";
import { useWallet } from "@solana/wallet-adapter-react";
import { useUserAccounts } from "./useUserAccounts";
import { useAssociatedTokenAccounts } from "./useAssociatedTokenAccounts";

export function useGroupedAuxTokenAccounts() {
  const { userAccounts } = useUserAccounts();
  const { ataMap } = useAssociatedTokenAccounts();
  const groupedTokenAccounts = new Map<string, TokenAccount[]>();
  const { publicKey } = useWallet();

  for (const account of userAccounts) {
    const mint = account.info.mint;
    const ata = ataMap.get(mint.toString());
    if (account.pubkey == publicKey) {
      continue;
    }
    if (mint && (account.pubkey.toString()) !== ata?.pubkey.toString()) {
      var fetchedAccounts = groupedTokenAccounts.get(mint.toString()) ?? [];
      fetchedAccounts.push(account);
      groupedTokenAccounts.set(mint.toString(), fetchedAccounts);
    }
  }

  return groupedTokenAccounts;
}