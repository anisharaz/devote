import { prisma } from "@repo/prismadb";
import axios from "axios";
import Image from "next/image";
import AuthonticationPipe from "../../../pipes/AuthonticationPipe";

async function NumberOfVotes({
  params,
}: {
  params: { votinglevelid: string };
}) {
  const candidates = await prisma.candidates.findMany({
    where: {
      levelId: params.votinglevelid,
    },
  });
  return (
    <div className="main-body flex flex-col justify-center items-center">
      <AuthonticationPipe AdminCheck={true}>
        {candidates.length === 0 ? (
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-3xl font-bold">No candidates found</h1>
            <p className="text-lg">
              Please add candidates to this voting level
            </p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-6">
            {candidates.map(async (candidate) => {
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
                      candidate.WalletAddress,
                      {
                        mint: "J7PEVpHoy8ZM4kaXtHFwAHb8mwQWKZyM8UHHZUrFJ1u9",
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

              return (
                <div key={candidate.id}>
                  <div className="bg-white border w-80 h-auto border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <Image
                      className="rounded-t-lg object-cover w-full h-48"
                      src={candidate.image}
                      alt="CandiateImage"
                      width={800}
                      height={600}
                      priority
                    />
                    <div className="p-5">
                      <p className="mb-2 text-2xl font-bold tracking-tight text-black">
                        {candidate.name}
                      </p>
                      <p className="mb-3 font-normal text-black dark:text-gray-600">
                        {candidate.statement}
                      </p>
                      <div className="text-4xl text-blue-600">
                        {balance.data[0].result?.value?.amount
                          ? balance.data[0].result?.value?.amount / 1000000000
                          : 0}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </AuthonticationPipe>
    </div>
  );
}

export default NumberOfVotes;
