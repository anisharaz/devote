import { Button } from "@repo/ui";
import { GetVoter } from "../../actions/database";
import Link from "next/link";

async function MyIdentity({ params }: { params: { PublicKey: string } }) {
  const voter = await GetVoter(params.PublicKey);
  if (!voter)
    return (
      <div className="main-body flex flex-col items-center p-4 gap-10">
        <div className="flex flex-col gap-10 p-6 border-2 border-red-400 bg-red-200 rounded-lg">
          <div className="text-3xl">Your are not registered or Verified !</div>
          <div>
            <div className="text-2xl py-4 underline underline-offset-8">
              If already registered Verify here
            </div>
            <Button size={"lg"} variant={"default"} className="w-full">
              <Link href={"/verify"}>Verify Here</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  return <div>{params.PublicKey}</div>;
}

export default MyIdentity;
