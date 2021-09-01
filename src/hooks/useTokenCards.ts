import { TokenAccount } from "../models";
import { useEffect, useState } from "react";
import { cache, useAccountsContext } from "../contexts/accounts";
import { fromLamports, getTokenName } from "../utils/utils";
import { useConnection, useConnectionConfig } from "../contexts/connection";
import { useWallet } from "@solana/wallet-adapter-react";
import { groupTokens } from "../utils/token";
import { useUserAccounts } from "./useUserAccounts";
import { useGroupedTokenAccounts } from "./useGroupedTokenAccounts";
import { PublicKey } from "@solana/web3.js";
import { useMarkets } from "../contexts/market";


export interface TokenCard {
    tokenName: string;
    mint: string;
    balance: number;
    balanceUSD: number;
}


export function useTokenCards() {
    const groupedTokenAccounts = useGroupedTokenAccounts();
    const { tokenMap } = useConnectionConfig();
    const { marketEmitter, midPriceInUSD } = useMarkets();

    var tokenCards: TokenCard[] = [];

    groupedTokenAccounts.forEach((value, mint) => {
        var tokenCard = <TokenCard>{};
        tokenCard.mint = mint;
        tokenCard.tokenName = getTokenName(tokenMap, mint);
        tokenCard.balance = value.reduce((a: any, b: any) => a + b.info.amount.toNumber(), 0) ?? 0;
        tokenCard.balanceUSD = tokenCard.balance * midPriceInUSD(mint || "");
        tokenCards.push(tokenCard);
    });
    

    return tokenCards;
}