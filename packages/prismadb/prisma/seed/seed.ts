import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const ADMIN = await prisma.admin.create({
    data: {
      email: "anisharaz919@gmail.com",
      name: "Anish Araz",
      password: "test@123",
      role: "ADMIN",
    },
  });
  const activevoting = await prisma.activeVotingLevels.create({
    data: {
      LevelName: "National",
      status: "APPROVED",
    },
  });
  const candidates = await prisma.candidates.createMany({
    data: [
      {
        name: "CAN_1",
        statement: "lorem ipsum...",
        image: "https://dalrhzyq3imlu.cloudfront.net/devote/candidates/me.jpg",
        levelId: activevoting.id,
        WalletAddress: "7mpcxFG5CURhM266pWQvqoof55fc3vdRjGheXAW7P3D2",
      },
      {
        name: "CAN_2",
        statement: "bbbbbbblaaaaaa...",
        image: "https://dalrhzyq3imlu.cloudfront.net/devote/candidates/me.jpg",
        levelId: activevoting.id,
        WalletAddress: "3XY4miR949BxoCrfxueidiF3pTEqcY5NyBV49NPZWrqz",
      },
      {
        name: "CAN_3",
        statement: "3rd candidate statement",
        image: "https://dalrhzyq3imlu.cloudfront.net/devote/candidates/me.jpg",
        levelId: activevoting.id,
        WalletAddress: "9RCMoa6J6jCqVEiZTgW3HMQH2QoUPVLxfUwx7fk1cNya",
      },
    ],
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
