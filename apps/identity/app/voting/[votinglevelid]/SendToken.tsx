"use client";

import { Button } from "@repo/ui";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  Connection,
  PublicKey,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";
import { conn } from "../../lib/solana";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import {
  createAssociatedTokenAccountInstruction,
  createTransferInstruction,
  getAccount,
  getAssociatedTokenAddress,
} from "@solana/spl-token";
import {
  SignerWalletAdapterProps,
  WalletNotConnectedError,
} from "@solana/wallet-adapter-base";
function SendToken({ toPublicKey }: { toPublicKey: string }) {
  const { publicKey, signTransaction } = useWallet();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const configureAndSendCurrentTransaction = async (
    transaction: Transaction,
    connection: Connection,
    feePayer: PublicKey,
    signTransaction: SignerWalletAdapterProps["signTransaction"]
  ) => {
    const blockHash = await connection.getLatestBlockhash();
    transaction.feePayer = feePayer;
    transaction.recentBlockhash = blockHash.blockhash;
    const signed = await signTransaction(transaction);
    const signature = await connection.sendRawTransaction(signed.serialize());
    await connection.confirmTransaction({
      blockhash: blockHash.blockhash,
      lastValidBlockHeight: blockHash.lastValidBlockHeight,
      signature,
    });
    return signature;
  };
  const send = async () => {
    setError("");
    setLoading(true);
    if (!publicKey || !signTransaction) {
      throw new WalletNotConnectedError();
    }
    const mintToken = new PublicKey(
      "J7PEVpHoy8ZM4kaXtHFwAHb8mwQWKZyM8UHHZUrFJ1u9"
    );
    const recipientAddress = new PublicKey(toPublicKey);

    const transactionInstructions: TransactionInstruction[] = [];
    const associatedTokenFrom = await getAssociatedTokenAddress(
      mintToken,
      publicKey
    );
    const fromAccount = await getAccount(conn, associatedTokenFrom);
    const associatedTokenTo = await getAssociatedTokenAddress(
      mintToken,
      recipientAddress
    );
    if (!(await conn.getAccountInfo(associatedTokenTo))) {
      transactionInstructions.push(
        createAssociatedTokenAccountInstruction(
          publicKey,
          associatedTokenTo,
          recipientAddress,
          mintToken
        )
      );
    }
    transactionInstructions.push(
      createTransferInstruction(
        fromAccount.address, // source
        associatedTokenTo, // dest
        publicKey,
        1000000000
      )
    );
    const transaction = new Transaction().add(...transactionInstructions);
    const signature = await configureAndSendCurrentTransaction(
      transaction,
      conn,
      publicKey,
      signTransaction
    );
    alert("Voted Successful");
    setError(signature);
    setLoading(false);
  };

  return (
    <div>
      {loading ? (
        <Button disabled>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please wait..
        </Button>
      ) : (
        <Button onClick={send}>
          Vote me{" "}
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </Button>
      )}
      {error && (
        <div className="text-green-500 mt-3 break-words">
          <a
            href={`https://explorer.solana.com/tx/${error}?cluster=devnet`}
            target="_blank"
          >
            <Button variant={"ghost"}>View Tx</Button>
          </a>
        </div>
      )}
    </div>
  );
}

export default SendToken;
