import { prisma } from "@repo/prismadb";
import WalletConnectPipe from "../pipes/WalletConnectionPipe";
import Link from "next/link";
async function Voting() {
  const ActiveVotingLevels = await prisma.activeVotingLevels.findMany();
  return (
    <WalletConnectPipe title="Connect Wallet to Vote">
      <div className="main-body flex flex-col gap-8 items-center pt-10 p-4">
        <div className="text-white text-4xl underline underline-offset-4">
          Select Voting Level
        </div>
        <div className="flex gap-4 flex-wrap">
          {ActiveVotingLevels.map((votingLevel) => {
            return (
              <Link
                href={"/voting/" + votingLevel.id}
                key={votingLevel.id}
                className="text-2xl border border-black rounded-lg bg-sky-500 h-24 w-64 flex items-center justify-center hover:border-white hover:bg-sky-400"
              >
                {votingLevel.LevelName}
              </Link>
            );
          })}
        </div>
      </div>
    </WalletConnectPipe>
  );
}

export default Voting;
