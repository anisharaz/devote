"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";

export function useVoter() {
  const { connected, publicKey } = useWallet();
  const [voterDataState, setVoter] = useState({
    name: "",
  });
  useEffect(() => {
    if (publicKey != null) {
      const fetchData = async () => {
        const voter = await fetch("/api/voterinfo", {
          method: "POST",
          body: JSON.stringify({ publickey: publicKey }),
        });
        const voterData = await voter.json();
        return voterData;
      };
      fetchData().then((data) => {
        setVoter(data);
      });
    }
  }, [connected, publicKey]);
  return voterDataState;
}
