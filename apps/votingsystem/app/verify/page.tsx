import WalletConnectPipe from "../pipes/WalletConnectionPipe";
import VerificationForm from "./VerificationForm";

function verify() {
  return (
    <div className="main-body flex justify-center pt-11">
      <WalletConnectPipe title="Connect wallet to get get Voting token">
        <VerificationForm />
      </WalletConnectPipe>
    </div>
  );
}

export default verify;
