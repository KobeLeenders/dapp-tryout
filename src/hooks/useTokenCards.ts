import { TokenAccount } from "../models";
import { useEffect, useState } from "react";
import { cache, useAccountsContext } from "../contexts/accounts";
import { fromLamports, getTokenName } from "../utils/utils";
import { useConnection, useConnectionConfig } from "../contexts/connection";
import { useWallet } from "@solana/wallet-adapter-react";
import { groupTokens } from "../utils/token";
import { useUserAccounts } from "./useUserAccounts";
import { useGroupedAuxTokenAccounts } from "./useGroupedAuxTokenAccounts";
import { PublicKey } from "@solana/web3.js";
import { useMarkets } from "../contexts/market";
import { useAssociatedTokenAccounts } from ".";


export interface TokenCard {
    tokenName: string;
    mint: string;
    balance: number;
    balanceUSD: number;
}

export function useTokenCards() {
    const groupedAuxTokenAccounts = useGroupedAuxTokenAccounts();
    const { tokenMap } = useConnectionConfig();
    const { marketEmitter, midPriceInUSD } = useMarkets();
    const { ataMap } = useAssociatedTokenAccounts();

    var tokenCards: TokenCard[] = [];

    groupedAuxTokenAccounts.forEach((value, mint) => {
        const ata = ataMap.get(mint);
        const ataBalance = ata?.info.amount ? ata?.info.amount : 0;
        var tokenCard = <TokenCard>{};
        tokenCard.mint = mint;
        tokenCard.tokenName = getTokenName(tokenMap, mint);
        tokenCard.balance = Number(value.reduce((a: any, b: any) => a + b.info.amount.toNumber(), 0) ?? 0) + Number(ataBalance);
        tokenCard.balanceUSD = tokenCard.balance * midPriceInUSD(mint || "");
        tokenCards.push(tokenCard);
    });
    

    return tokenCards;
}