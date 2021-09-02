import { PublicKey } from "@solana/web3.js";
import { useAccountsContext } from "../contexts/accounts";
import { useConnectionConfig } from "../contexts/connection";
import { TokenAccount } from "../models";
import { getTokenName } from "../utils/utils";

export function useAssociatedTokenAccounts() {
  const context = useAccountsContext();;
    return {
      ataMap: context.ataMap as Map<string, TokenAccount>,
    };
}
