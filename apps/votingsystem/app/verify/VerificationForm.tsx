"use client";

import { Button } from "@repo/ui";
import { useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";
import WalletButton from "../components/Walletbutton";
import { VerifyVoter } from "../actions/database";
import { Loader2 } from "lucide-react";

function VerificationForm() {
  const { publicKey, connected, signMessage } = useWallet();
  const [fileContent, setFileContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [aadhar, setAadhar] = useState("");
  const [error, setError] = useState("");
  const [VotingCertificate, setVotingCertificate] = useState("");
  const fileChange = (e: any) => {
    const fileReader = new FileReader();
    const { files } = e.target;

    fileReader.readAsText(files[0], "UTF-8");
    fileReader.onload = (e) => {
      // @ts-ignore
      const content = e.target.result;
      // @ts-ignore
      setFileContent(content);
    };
  };
  const submitHandler = async (e: any) => {
    e.preventDefault();
    setError("");
    if (fileContent && aadhar && publicKey) {
      setLoading(true);
      const signedmsg = await signMessage?.(
        new TextEncoder().encode(fileContent)
      );
      const res = await VerifyVoter({
        Certificate: fileContent,
        publicKey: publicKey?.toString() as string,
        Aadhar: aadhar,
        signature: signedmsg as Uint8Array,
      });
      if (res.success) {
        setVotingCertificate(res.VotingCertificate);
        setLoading(false);
        alert(
          "Voter Verified Successfully & token has been sent to your wallet"
        );
      } else {
        setError(res.msg);
        setLoading(false);
      }
    } else {
      alert("Please fill all the fields");
    }
  };
  return (
    <div>
      <form onSubmit={submitHandler}>
        <div className="text-2xl rounded-lg border text-white bg-zinc-800/10 min-h-56 min-w-80 max-w-prose py-10 px-4">
          <label
            htmlFor="certificate"
            className="block mb-2 text-2xl font-medium"
          >
            Identity Certificate
          </label>
          <input
            type="file"
            id="certificate"
            onChange={fileChange}
            accept=".cer"
            className="block w-full mt-5 text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          />
          <label
            htmlFor="aadhar"
            className="block mb-2 mt-4 text-2xl font-medium"
          >
            Aadhar Number
          </label>
          <input
            type="text"
            id="aadhar"
            onChange={(e) => {
              setAadhar(e.target.value);
            }}
            accept=".cer"
            className="block w-full p-3 text-lg border rounded-lg cursor-pointer text-white focus:outline-none bg-gray-700 border-gray-600 placeholder-gray-400"
          />

          {connected ? (
            <div className="flex flex-col gap-4 mt-4">
              {loading ? (
                <Button disabled>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </Button>
              ) : (
                <Button type="submit" disabled={!aadhar ? true : false}>
                  Verify
                </Button>
              )}
              {VotingCertificate && (
                <Button variant={"secondary"}>
                  <a
                    href={`data:text/plain;charset=utf-8,${VotingCertificate}`}
                    download={`${aadhar}_voting_certtificate.cer`}
                  >
                    Download Voting Certificate
                  </a>
                </Button>
              )}
            </div>
          ) : (
            <div className="mt-4">
              <WalletButton />
            </div>
          )}
          {error && (
            <div className="mt-2 text-red-500 bg-white p-2 rounded-xl underline underline-offset-8">
              {error}
            </div>
          )}
          <div className="text-lg mt-4 underline underline-offset-8">
            Note:Verification involves sending your wallet address along with
            certificate to add your voting wallet to system. Connect wallet
            wisely
          </div>
        </div>
      </form>
    </div>
  );
}

export default VerificationForm;
