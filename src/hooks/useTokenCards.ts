import { calculateBalances, fromLamports, getTokenName } from "../utils/utils";
import { useConnection, useConnectionConfig } from "../contexts/connection";
import { useGroupedAuxTokenAccounts } from "./useGroupedAuxTokenAccounts";
import { PublicKey } from "@solana/web3.js";
import { useMarkets } from "../contexts/market";
import { useAssociatedTokenAccounts } from ".";


export interface TokenCard {
    tokenName: string;
    mint: string;
    balance: number;
    balanceUSD: number;
    decimals: number;
}

export function useTokenCards() {
    const groupedAuxTokenAccounts = useGroupedAuxTokenAccounts();
    const { tokenMap } = useConnectionConfig();
    const { marketEmitter, midPriceInUSD } = useMarkets();
    const { ataMap } = useAssociatedTokenAccounts();

    var tokenCards: TokenCard[] = [];

    groupedAuxTokenAccounts.forEach((value, mint) => {
        const ata = ataMap.get(mint);

        var tokenCard = <TokenCard>{};
        tokenCard.mint = mint;
        tokenCard.tokenName = getTokenName(tokenMap, mint);
        tokenCard.balance = calculateBalances(value, ata)
        tokenCard.balanceUSD = tokenCard.balance * midPriceInUSD(mint || "");
        //tokenCard.decimals = value[0]
        tokenCards.push(tokenCard);
    });
    

    return tokenCards;
}