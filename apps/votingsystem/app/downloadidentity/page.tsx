import WalletConnectPipe from "../pipes/WalletConnectionPipe";
import CertDownloadForm from "./CertDownloadForm";

function DownloadIdentity() {
  return (
    <WalletConnectPipe title="Connect Same Wallet As During Verification">
      <div className="main-body flex flex-col items-center pt-10 gap-10">
        <div className="p-10 border-2 min-h-60 bg-purple-600 rounded-xl">
          <div className="text-2xl text-white pb-4">
            Enter the Aadhar number to download your certificate
          </div>
          <CertDownloadForm />
        </div>
      </div>
    </WalletConnectPipe>
  );
}

export default DownloadIdentity;
