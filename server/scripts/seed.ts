import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const users = [
  {
    email: "john.doe@example.com",
    name: "John Doe",
    emailVerified: true,
    ownedCourses: {
      create: [
        {
          title: "Introduction to Web Development",
          description: "Learn the basics of HTML, CSS, and JavaScript",
          tags: ["web", "frontend", "beginner"],
          coverImage: "https://example.com/covers/web-dev-101.jpg",
          price: 59.99,
          isPublished: true,
        },
        {
          title: "Database Design Fundamentals",
          description: "Master the basics of database design and SQL",
          tags: ["database", "sql", "backend"],
          coverImage: "https://example.com/covers/database-101.jpg",
          price: 59.99,
          isPublished: true,
        },
      ],
    },
  },
  {
    email: "jane.smith@example.com",
    name: "Jane Smith",
    emailVerified: true,
    ownedCourses: {
      create: [
        {
          title: "Advanced React Patterns",
          description: "Master advanced React concepts and patterns",
          tags: ["react", "frontend", "advanced"],
          coverImage: "https://example.com/covers/react-advanced.jpg",
          price: 79.99,
          isPublished: true,
        },
        {
          title: "TypeScript Deep Dive",
          description: "Everything you need to know about TypeScript",
          tags: ["typescript", "javascript", "advanced"],
          coverImage: "https://example.com/covers/typescript.jpg",
          price: 79.99,
          isPublished: true,
        },
      ],
    },
  },
  {
    email: "bob.wilson@example.com",
    name: "Bob Wilson",
    emailVerified: true,
    ownedCourses: {
      create: [
        {
          title: "DevOps Essentials",
          description: "Learn the fundamentals of DevOps practices",
          tags: ["devops", "ci-cd", "automation"],
          coverImage: "https://example.com/covers/devops.jpg",
          price: 69.99,
          isPublished: true,
        },
      ],
    },
  },
  {
    email: "sarah.johnson@example.com",
    name: "Sarah Johnson",
    emailVerified: true,
    ownedCourses: {
      create: [
        {
          title: "UI/UX Design Principles",
          description: "Create better user experiences with design thinking",
          tags: ["design", "ui-ux", "user-experience"],
          coverImage: "https://example.com/covers/ui-ux.jpg",
          price: 69.99,
          isPublished: true,
        },
      ],
    },
  },
  {
    email: "mike.brown@example.com",
    name: "Mike Brown",
    emailVerified: true,
    ownedCourses: {
      create: [
        {
          title: "Machine Learning Basics",
          description: "Introduction to ML concepts and applications",
          tags: ["ml", "ai", "python"],
          coverImage: "https://example.com/covers/ml.jpg",
          price: 79.99,
          isPublished: true,
        },
      ],
    },
  },
];

async function seed() {
  await prisma.user.deleteMany({});
  await prisma.course.deleteMany({});

  // Create users and their owned courses
  const createdUsers = [];
  for (const user of users) {
    const created = await prisma.user.create({
      data: user,
      include: {
        ownedCourses: true,
      },
    });
    createdUsers.push(created);
  }

  for (const user of createdUsers) {
    for (const course of user.ownedCourses) {
      const numChapters = Math.floor(Math.random() * 3) + 3;
      for (let i = 0; i < numChapters; i++) {
        await prisma.chapter.create({
          data: {
            title: `Chapter ${i + 1}`,
            description: `Description for Chapter ${i + 1}`,
            courseId: course.id,
            isPublished: true,
            isFree: i === 0,
            lessons: {
              create: Array.from({ length: 3 }, (_, j) => ({
                title: `Lesson ${j + 1}`,
                content: `Content for Lesson ${j + 1} of Chapter ${i + 1}`,
                position: j + 1,
                isPublished: true,
                isFree: i === 0,
              })),
            },
          },
        });
      }
    }
  }

  // Create some course enrollments
  // John enrolls in Jane's and Sarah's courses
  await prisma.course.update({
    where: { id: createdUsers[1].ownedCourses[0].id },
    data: {
      students: {
        connect: { id: createdUsers[0].id },
      },
    },
  });
  await prisma.course.update({
    where: { id: createdUsers[3].ownedCourses[0].id },
    data: {
      students: {
        connect: { id: createdUsers[0].id },
      },
    },
  });

  // Bob enrolls in Jane's and Mike's courses
  await prisma.course.update({
    where: { id: createdUsers[1].ownedCourses[0].id },
    data: {
      students: {
        connect: { id: createdUsers[2].id },
      },
    },
  });
  await prisma.course.update({
    where: { id: createdUsers[4].ownedCourses[0].id },
    data: {
      students: {
        connect: { id: createdUsers[2].id },
      },
    },
  });

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
