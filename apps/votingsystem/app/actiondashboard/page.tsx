import { Button } from "@repo/ui";
import Link from "next/link";

function ActionsDashboard() {
  return (
    <div className="main-body flex flex-col items-center pt-10 gap-6">
      <div className="flex flex-col gap-6 border p-6 bg-zinc-800/50 rounded-lg">
        <div className="text-3xl text-white">Actions</div>
        <div className="flex gap-3 text-white font-bold">
          <Link href={"/getverificationemail"}>
            <Button size={"lg"}>Get Verification Email</Button>
          </Link>
          <Link href={"/voting"}>
            <Button size={"lg"} variant={"secondary"}>
              Vote A Candidate
            </Button>
          </Link>
          <Link href={"/verify"}>
            <Button size={"lg"}>Get Voting Token</Button>
          </Link>
          <Link href={"/downloadidentity"}>
            <Button size={"lg"} variant={"secondary"}>
              Download ID Certificate
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ActionsDashboard;
