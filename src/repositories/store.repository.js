import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// 1. 특정 store 조회
export const getStoreById = async (storeId) => {
  const store = await prisma.store.findUnique({
    where: { id: storeId },
  });
  return store || null;
};

// 2. region_id 업데이트
export const updateStoreRegion = async (storeId, regionId) => {
  await prisma.store.update({
    where: { id: storeId },
    data: { region_id: regionId },
  });
};

// 3. store 등록
export const insertStore = async (storeData) => {
  const created = await prisma.store.create({
    data: {
      region_id: storeData.region_id,
      name: storeData.name,
      rate: storeData.rate,
      category: storeData.category,
      owner_id: storeData.owner_id,
      created_at: storeData.created_at,
      updated_at: storeData.updated_at,
    },
  });
  return created.id;
};
