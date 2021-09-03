import { useAccountsContext } from "../contexts/accounts";
import { TokenAccount } from "../models";

export function useAssociatedTokenAccounts() {
  const context = useAccountsContext();;
    return {
      ataMap: context.ataMap as Map<string, TokenAccount>,
    };
}
