import { PublicKey } from "@solana/web3.js";
import { useConnectionConfig } from "../contexts/connection";
import { getTokenName } from "../utils/utils";

export function useAssociatedTokenAccounts() {
  const { tokens } = useConnectionConfig();
  //const address =
    //typeof mintAddress === "string" ? mintAddress : mintAddress?.toBase58();
  return tokens;
}
