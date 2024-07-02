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
        image: "img_url",
        levelId: activevoting.id,
      },
      {
        name: "CAN_2",
        statement: "bbbbbbblaaaaaa...",
        image: "img_url",
        levelId: activevoting.id,
      },
      {
        name: "CAN_3",
        statement: "3rd candidate statement",
        image: "img_url",
        levelId: activevoting.id,
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
