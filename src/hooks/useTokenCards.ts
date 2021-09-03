import { calculateBalances, numberWithCommas, getTokenIcon, getTokenName } from "../utils/utils";
import { useConnectionConfig } from "../contexts/connection";
import { useGroupedAuxTokenAccounts } from "./useGroupedAuxTokenAccounts";
import { useMarkets } from "../contexts/market";
import { useAssociatedTokenAccounts } from ".";


export interface TokenCard {
    tokenName: string;
    mint: string;
    balance: string;
    balanceUSD: string;
    icon?: string;
}

export function useTokenCards() {
    const groupedAuxTokenAccounts = useGroupedAuxTokenAccounts();
    const { tokenMap } = useConnectionConfig();
    const { marketEmitter, midPriceInUSD } = useMarkets();
    const { ataMap } = useAssociatedTokenAccounts();

    var tokenCards: TokenCard[] = [];

    groupedAuxTokenAccounts.forEach((value, mint) => {
        const ata = ataMap.get(mint);
        const mintInfo = tokenMap.get(mint.toString()); 
        const balance = calculateBalances(value, ata, mintInfo?.decimals);   
        const balanceUSD = (balance * midPriceInUSD(mint || ""));    

        var tokenCard = <TokenCard>{};
        tokenCard.mint = mint;
        tokenCard.tokenName = getTokenName(tokenMap, mint);
        tokenCard.balance = numberWithCommas(balance.toString());
        tokenCard.balanceUSD = balanceUSD.toFixed(2); 
        tokenCard.icon = getTokenIcon(tokenMap, mint);
        tokenCards.push(tokenCard);
    });
    
    return tokenCards;
}