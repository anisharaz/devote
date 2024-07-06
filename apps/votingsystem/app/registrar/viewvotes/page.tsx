import {
  LoginLink,
  getKindeServerSession,
} from "@kinde-oss/kinde-auth-nextjs/server";
import { prisma } from "@repo/prismadb";
import { Button } from "@repo/ui";
import Link from "next/link";
export const dynamic = "force-dynamic";
async function ViewVotes() {
  const { isAuthenticated } = getKindeServerSession();
  const votinglevels = await prisma.activeVotingLevels.findMany();
  const isAuthenticatedStatus = await isAuthenticated();
  return (
    <div className="main-body flex flex-col p-6 gap-4 items-center">
      <div className="text-2xl text-white underline underline-offset-4">
        Voting Levels
      </div>
      {isAuthenticatedStatus ? (
        <div className="flex gap-4 flex-wrap">
          {votinglevels.map((votinglevel) => (
            <Link
              href={"viewvotes/" + votinglevel.id}
              key={votinglevel.id}
              className="text-2xl border border-black rounded-lg bg-sky-500 h-24 w-64 flex items-center justify-center hover:border-white hover:bg-sky-400"
            >
              {votinglevel.LevelName}
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-4 justify-center items-center">
          <div className="text-xl bg-blue-300 p-4 rounded-3xl text-black underline underline-offset-8">
            Your Are not Logged in
          </div>
          <Button size={"lg"}>
            <LoginLink>Sign in</LoginLink>
          </Button>
        </div>
      )}
    </div>
  );
}

export default ViewVotes;
