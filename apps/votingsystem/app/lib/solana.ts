import { getOrCreateAssociatedTokenAccount, mintTo } from "@solana/spl-token";
import { Connection, Keypair, PublicKey, clusterApiUrl } from "@solana/web3.js";
import axios from "axios";
export const conn = new Connection(
  "https://devnet.helius-rpc.com/?api-key=6f1ddb75-3936-4f0d-b122-63c6ab6de5d7"
);
import bs58 from "bs58";
export async function SendVotingToken({
  publicKey,
  amount,
}: {
  publicKey: string;
  amount: string;
}) {
  const tokenMintAccount = new PublicKey(process.env.TOKEN_MINT as string);
  const recipient = new PublicKey(publicKey);
  const SecretKeyByteArray = bs58.decode(process.env.MAIN_PRIV as string);
  const signer = Keypair.fromSecretKey(SecretKeyByteArray);
  const tokenAccount = await getOrCreateAssociatedTokenAccount(
    conn,
    signer,
    tokenMintAccount,
    recipient
  );
  const recipientAssociatedTokenAccount = new PublicKey(tokenAccount.address);
  const transactionSignature = await mintTo(
    conn,
    signer,
    tokenMintAccount,
    recipientAssociatedTokenAccount,
    signer,
    Number(amount) * 1000000000
  );
  return Promise.resolve({
    success: true,
    txsignature: transactionSignature,
  });
}

export async function GetTokenBalance({
  publickey,
  MintAddress,
  decimals,
}: {
  publickey: string;
  MintAddress: string;
  decimals: string;
}) {
  try {
    const tokenaccount = await axios({
      url: process.env.RPC_URL,
      method: "post",
      headers: { "Content-Type": "application/json" },
      data: [
        {
          jsonrpc: "2.0",
          id: 1,
          method: "getTokenAccountsByOwner",
          params: [
            publickey,
            {
              mint: MintAddress,
            },
            {
              encoding: "jsonParsed",
            },
          ],
        },
      ],
    });
    const balance = await axios({
      url: process.env.RPC_URL,
      method: "post",
      headers: { "Content-Type": "application/json" },
      data: [
        {
          jsonrpc: "2.0",
          id: 1,
          method: "getTokenAccountBalance",
          params: [tokenaccount.data[0]?.result?.value[0]?.pubkey],
        },
      ],
    });
    return Promise.resolve(
      balance.data[0].result?.value?.amount / Number(decimals)
    );
  } catch (error) {
    return Promise.reject("Something Went Wrong try Again");
  }
}
