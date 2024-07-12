import { SendToken } from "@aaraz/solhelper";
import { Connection } from "@solana/web3.js";
import axios from "axios";

export const conn = new Connection(process.env.RPC_URL as string);

export async function SendVotingToken({ publicKey }: { publicKey: string }) {
  const { txsignature } = await SendToken({
    FromSecretKey: process.env.MAIN_PRIV as string,
    SendFrom: process.env.MAIN_PUB as string,
    SendTo: publicKey,
    amount: 1,
    MintAddress: process.env.TOKEN_MINT as string,
  });
  return Promise.resolve({
    success: true,
    txsignature: txsignature,
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
