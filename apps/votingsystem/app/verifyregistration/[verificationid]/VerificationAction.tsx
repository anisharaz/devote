"use client";
import { Button } from "@repo/ui";
import { VerifyRegistration } from "../../actions/database";
import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { Loader2 } from "lucide-react";
import WalletConnectPipe from "../../pipes/WalletConnectionPipe";

function VerificationAction({ verificationId }: { verificationId: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { publicKey } = useWallet();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const res = await VerifyRegistration({
      verificationID: verificationId,
      publicKey: publicKey?.toBase58() as string,
    });
    if (res.success) {
      alert(res.msg);
    } else {
      setError(res.msg);
    }
    setLoading(false);
    window.location.reload();
  };
  return (
    <WalletConnectPipe title="connect wallet to verify your registration">
      <form onSubmit={handleSubmit}>
        {loading ? (
          <Button disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait..
          </Button>
        ) : (
          <Button variant={"secondary"} className="w-full" type="submit">
            Verify Now
          </Button>
        )}
        {error && (
          <div className="mt-2 p-1 bg-white text-red-500 rounded-xl">
            {error}
          </div>
        )}
      </form>
    </WalletConnectPipe>
  );
}

export default VerificationAction;
