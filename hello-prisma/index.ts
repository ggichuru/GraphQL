import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const updatePost = async () => {
  const post = await prisma.post.update({
    where: { id: 1 },
    data: { published: true },
  });

  console.log(post);
};

const main = async () => {
  await prisma.user.create({
    data: {
      name: "GG",
      email: "gg@mail.com",
      posts: {
        create: {
          title: "hello human",
        },
      },
      profile: {
        create: {
          bio: "I love eating",
        },
      },
    },
  });

  const allUsers = await prisma.user.findMany({
    include: {
      posts: true,
      profile: true,
    },
  });
  console.dir(allUsers, { depth: null });
};

updatePost()
  .catch((e) => {
    throw e;
  })
  .finally(async () => await prisma.$disconnect());
