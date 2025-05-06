import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// INSERT
export const insertRegion = async (regionData) => {
  const created = await prisma.region.create({
    data: {
      name: regionData.name
    },
  });
  return created.id;
};

// SELECT
export const getRegionById = async (id) => {
  const region = await prisma.region.findUnique({
    where: { id },
  });
  return region || null;
};
