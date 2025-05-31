import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// INSERT
export const insertReview = async (reviewData) => {
  const created = await prisma.review.create({
    data: {
      store_id: reviewData.store_id,
      mem_id: reviewData.mem_id,
      content: reviewData.content,
      rate: reviewData.rate,
      created_at: reviewData.created_at,
      updated_at: reviewData.updated_at,
    },
  });
  return created.id;
};

// SELECT
export const getReviewById = async (id) => {
  const review = await prisma.review.findUnique({
    where: { id },
  });
  return review || null;
};

export const getReviewsByMemberId = async (memberId, cursor) => {
  const reviews = await prisma.review.findMany({
    select: {
      id: true,
      content: true,
      rate: true,
      created_at: true,
      store_id: true,
      store: true,
    },
    where: {
      mem_id: memberId,
      id: { gt: cursor },
    },
    orderBy: { id: "asc" },
    take: 5,
  });

  return reviews;
};