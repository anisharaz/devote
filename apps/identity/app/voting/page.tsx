import WalletConnectPipe from "../pipes/WalletConnectionPipe";
function Voting() {
  return (
    <WalletConnectPipe title="Connect Wallet to Vote">
      <div className="main-body">Voting</div>
    </WalletConnectPipe>
  );
}

export default Voting;
