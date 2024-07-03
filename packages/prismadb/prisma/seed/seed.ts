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
  const activevoting = await prisma.activeVotingLevels.createMany({
    data: [
      {
        LevelName: "National",
        status: "APPROVED",
      },
      {
        LevelName: "State",
        status: "APPROVED",
      },
      {
        LevelName: "Ward",
        status: "APPROVED",
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
