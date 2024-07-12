"use client";
import { Button } from "@repo/ui";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Transaction } from "@solana/web3.js";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import {
  UpdateVoterVotingStatus,
  VerifyVotingCert,
} from "../../actions/database";
import { SendTokenTransaction } from "@aaraz/solhelper";

function SendToken({ toPublicKey }: { toPublicKey: string }) {
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();

  const [loading, setLoading] = useState(false);
  const [txsignature, setTxsignature] = useState("");
  const [verified, setVerified] = useState(false);
  const [certLoading, setCertLoading] = useState(false);
  const [verificationError, setVerificationError] = useState("");
  const [txError, setTxError] = useState("");

  async function configureAndSendCurrentTransaction(transaction: Transaction) {
    try {
      const txsignature = await sendTransaction(transaction, connection);
      return {
        success: true,
        signature: txsignature,
        msg: "Transection Successful",
      };
    } catch (error) {
      return {
        success: false,
        signature: "",
        msg: "Transection Failed try again",
      };
    }
  }

  async function send() {
    setTxsignature("");
    setLoading(true);
    const transaction = await SendTokenTransaction({
      SendFrom: publicKey?.toBase58() as string,
      SendTo: toPublicKey,
      MintAddress: "J7PEVpHoy8ZM4kaXtHFwAHb8mwQWKZyM8UHHZUrFJ1u9",
      amount: 1,
    });
    const res = await configureAndSendCurrentTransaction(transaction);
    if (res.success) {
      await UpdateVoterVotingStatus({
        txsignature: res.signature,
        walletaddress: publicKey?.toBase58() as string,
      });
      setTxsignature(res.signature);
      alert(res.msg);
    } else {
      setTxError(res.msg);
    }
    setLoading(false);
  }

  function fileChange(e: any) {
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
  }

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
            <Button variant={"ghost"}>View vote Tx</Button>
          </a>
        </div>
      )}
      {txError && (
        <div className="text-red-500 mt-3 break-words">{txError}</div>
      )}
    </div>
  );
}

export default SendToken;
