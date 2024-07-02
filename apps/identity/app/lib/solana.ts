import { Connection, clusterApiUrl } from "@solana/web3.js";

export const conn = new Connection(clusterApiUrl("devnet"));
