import { prisma } from "@repo/prismadb";
import Image from "next/image";
import SendToken from "./SendToken";
import WalletConnectPipe from "../../pipes/WalletConnectionPipe";

async function CandidateList({
  params,
}: {
  params: {
    votinglevelid: string;
  };
}) {
  const candidates = await prisma.candidates.findMany({
    where: {
      levelId: params.votinglevelid,
    },
  });
  return (
    <WalletConnectPipe title="Connect Wallet first">
      {candidates.length === 0 ? (
        <div className="main-body flex justify-center items-center">
          <div className="text-2xl text-white">
            No Candidates for voting level
          </div>
        </div>
      ) : (
        <div className="main-body p-6">
          <div className="text-center mb-4 text-3xl text-white underline underline-offset-4">
            Candidates
          </div>
          <div className="flex flex-wrap gap-6">
            {candidates.map((candidate) => {
              return (
                <div key={candidate.id}>
                  <div className="bg-white border w-80 h-auto border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <div>
                      <Image
                        className="rounded-t-lg object-cover w-full h-48"
                        src={candidate.image}
                        alt="CandiateImage"
                        width={800}
                        height={600}
                        priority
                      />
                    </div>
                    <div className="p-5">
                      <p className="mb-2 text-2xl font-bold tracking-tight text-black">
                        {candidate.name}
                      </p>
                      <p className="mb-3 font-normal text-black dark:text-gray-600">
                        {candidate.statement}
                      </p>
                      <SendToken toPublicKey={candidate.WalletAddress} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </WalletConnectPipe>
  );
}

export default CandidateList;
