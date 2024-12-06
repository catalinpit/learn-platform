const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const users = [
  {
    email: "john.doe@example.com",
    name: "John Doe",
  },
  {
    email: "jane.smith@example.com",
    name: "Jane Smith",
  },
  {
    email: "bob.wilson@example.com",
    name: "Bob Wilson",
  },
];

async function seed() {
  await prisma.user.deleteMany({});

  for (const user of users) {
    await prisma.user.create({
      data: user,
    });
  }

  // eslint-disable-next-line no-console
  console.log("Seed data created successfully");
}

seed()
  .then(() => {
    // eslint-disable-next-line no-console
    console.log("Seed data created successfully");
  })
  .catch((error) => {
    console.error("Error seeding data:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
