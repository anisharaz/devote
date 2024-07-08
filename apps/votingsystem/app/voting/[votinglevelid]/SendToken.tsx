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
import { SignerWalletAdapterProps } from "@solana/wallet-adapter-base";
import { VerifyVotingCert } from "../../actions/database";
function SendToken({ toPublicKey }: { toPublicKey: string }) {
  const { publicKey, signTransaction } = useWallet();
  const [loading, setLoading] = useState(false);
  const [txsignature, setTxsignature] = useState("");
  const [verified, setVerified] = useState(false);
  const [certLoading, setCertLoading] = useState(false);
  const [verificationError, setVerificationError] = useState("");
  const [tsError, setTsError] = useState("");
  const configureAndSendCurrentTransaction = async (
    transaction: Transaction,
    connection: Connection,
    feePayer: PublicKey,
    signTransaction: SignerWalletAdapterProps["signTransaction"]
  ) => {
    try {
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
      return {
        success: true,
        signature: signature,
        msg: "Transection Successful",
      };
    } catch (error) {
      return {
        success: false,
        signature: "",
        msg: "Transection Failed",
      };
    }
  };
  const send = async () => {
    setTxsignature("");
    setLoading(true);
    const mintToken = new PublicKey(
      "J7PEVpHoy8ZM4kaXtHFwAHb8mwQWKZyM8UHHZUrFJ1u9"
    );
    const recipientAddress = new PublicKey(toPublicKey);

    const transactionInstructions: TransactionInstruction[] = [];
    const associatedTokenFrom = await getAssociatedTokenAddress(
      mintToken,
      publicKey as PublicKey
    );
    const fromAccount = await getAccount(conn, associatedTokenFrom);
    const associatedTokenTo = await getAssociatedTokenAddress(
      mintToken,
      recipientAddress
    );
    if (!(await conn.getAccountInfo(associatedTokenTo))) {
      transactionInstructions.push(
        createAssociatedTokenAccountInstruction(
          publicKey as PublicKey,
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
        publicKey as PublicKey,
        1000000000
      )
    );
    const transaction = new Transaction().add(...transactionInstructions);
    const res = await configureAndSendCurrentTransaction(
      transaction,
      conn,
      publicKey as PublicKey,
      signTransaction as SignerWalletAdapterProps["signTransaction"]
    );
    if (res.success) {
      setTxsignature(res.signature);
      alert(res.msg);
    } else {
      setTsError(res.msg);
    }
    setLoading(false);
  };

  const fileChange = (e: any) => {
    setCertLoading(true);
    const fileReader = new FileReader();
    const { files } = e.target;

    fileReader.readAsText(files[0], "UTF-8");
    fileReader.onload = async (e) => {
      // @ts-ignore
      const content = e.target.result;
      const verifyStatus = await VerifyVotingCert(
        content as string,
        publicKey?.toString() as string
      );
      if (verifyStatus.success) {
        setVerified(true);
        alert(verifyStatus.msg);
      } else {
        setVerified(false);
        setVerificationError(verifyStatus.msg);
      }
    };
    setCertLoading(false);
  };
  return (
    <div>
      {verified ? (
        loading ? (
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
        )
      ) : (
        <div>
          {certLoading ? (
            <Button disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait..
            </Button>
          ) : (
            <form>
              <label
                htmlFor="certificate"
                className="block text-lg font-medium text-black"
              >
                Enter Voting Certificate
              </label>
              <input
                type="file"
                id="certificate"
                onChange={fileChange}
                accept=".cer"
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              />
            </form>
          )}

          {verificationError && (
            <div className="border border-black mt-2 text-red-500 rounded-lg p-1">
              {verificationError}
            </div>
          )}
        </div>
      )}
      {txsignature && (
        <div className="text-green-500 mt-3 break-words">
          <a
            href={`https://explorer.solana.com/tx/${txsignature}?cluster=devnet`}
            target="_blank"
          >
            <Button variant={"ghost"}>View Tx</Button>
          </a>
        </div>
      )}
      {tsError && (
        <div className="text-red-500 mt-3 break-words">{tsError}</div>
      )}
    </div>
  );
}

export default SendToken;
