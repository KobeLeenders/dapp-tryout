import { AccountLayout, MintLayout, Token, u64 as U64 } from "@solana/spl-token";
import {
    Account,
    Connection,
    PublicKey,
    SystemProgram,
    TransactionInstruction,
} from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from "../utils/ids";
import { TokenAccount } from "../models";
import { ASSOCIATED_TOKEN_PROGRAM_ID, cache, TokenAccountParser } from "../contexts/accounts";
import { createUninitializedAccount } from "./account";
import { calculateBalances } from "../utils/utils";

export async function createDuplicateTokenAccount(
    instructions: TransactionInstruction[],
    payer: PublicKey,
    connection: Connection,
    mint: PublicKey,
    owner: PublicKey,
    signers: Account[]
) {

    const accountRentExempt = await Token.getMinBalanceRentForExemptAccount(connection);

    const account1 = createUninitializedAccount(
        instructions,
        payer,
        accountRentExempt,
        signers
    );

    const account2 = createUninitializedAccount(
        instructions,
        payer,
        accountRentExempt,
        signers
    );

    instructions.push(
        Token.createInitAccountInstruction(TOKEN_PROGRAM_ID, mint, account1, owner)
    );
    instructions.push(
        Token.createInitAccountInstruction(TOKEN_PROGRAM_ID, mint, account2, owner)
    );

    return [account1, account2];
}

export function migrateTokens(
    instructions: TransactionInstruction[],
    groupedTokenAccounts: Map<string, TokenAccount[]>,
    ataMap: Map<string, TokenAccount>,
    owner: PublicKey,
    signers: Account[],
    mint?: PublicKey,
) {
    const mergeableList = mint ? [mint.toString()] : Array.from( groupedTokenAccounts.keys() );

    mergeableList.forEach((key) => {
        const ataInfo = ataMap.get(key);
        const auxAccts = groupedTokenAccounts.get(key);

        if (!auxAccts || !ataInfo) {
            return
        }

        if (!ataInfo.info) {
            console.log('creating ata');
            instructions.push(
                Token.createAssociatedTokenAccountInstruction(ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID, new PublicKey(key), ataInfo.pubkey, owner, owner)
            );
        }

        auxAccts.forEach(auxAcct => {
            instructions.push(
                Token.createTransferInstruction(TOKEN_PROGRAM_ID, auxAcct.pubkey, ataInfo.pubkey, owner, signers, auxAcct.info.amount)
            );


            instructions.push(
                Token.createCloseAccountInstruction(TOKEN_PROGRAM_ID, auxAcct.pubkey, ataInfo.pubkey, owner, signers)
            );
                        
        });
    })
    return;

}

