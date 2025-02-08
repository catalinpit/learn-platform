import { CourseTag, PrismaClient } from "@prisma/client";

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
          tags: [CourseTag.HTML, CourseTag.CSS, CourseTag.JAVASCRIPT],
          coverImage:
            "https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?w=1200&auto=format&fit=crop&q=60",
          price: 59.99,
          isPublished: true,
        },
        {
          title: "Database Design Fundamentals",
          description: "Master the basics of database design and SQL",
          tags: [CourseTag.DATABASE],
          coverImage:
            "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=1200&auto=format&fit=crop&q=60",
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
          tags: [CourseTag.REACT, CourseTag.JAVASCRIPT, CourseTag.TYPESCRIPT],
          coverImage:
            "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&auto=format&fit=crop&q=60",
          price: 79.99,
          isPublished: true,
        },
        {
          title: "TypeScript Deep Dive",
          description: "Everything you need to know about TypeScript",
          tags: [CourseTag.TYPESCRIPT, CourseTag.JAVASCRIPT],
          coverImage:
            "https://images.unsplash.com/photo-1629904853893-c2c8981a1dc5?w=1200&auto=format&fit=crop&q=60",
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
          tags: [CourseTag.DEVOPS],
          coverImage:
            "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=1200&auto=format&fit=crop&q=60",
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
          tags: [CourseTag.DESIGN],
          coverImage:
            "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&auto=format&fit=crop&q=60",
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
          tags: [CourseTag.PYTHON],
          coverImage:
            "https://images.unsplash.com/photo-1527474305487-b87b222841cc?w=1200&auto=format&fit=crop&q=60",
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
