import { prisma } from "@repo/prismadb";
export async function POST(req: Request) {
  const { publickey } = await req.json();
  const voter = await prisma.voters.findUnique({
    where: {
      walletaddress: publickey,
    },
  });
  if (voter) {
    if (voter.verification == "PENDING") {
      return Response.json({ name: `${voter.name} Not Verified` });
    }
    return Response.json({ name: voter?.name });
  }
  return Response.json({ name: "No Information" });
}
