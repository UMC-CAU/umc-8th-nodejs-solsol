import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const insertMission = async (missionData) => {
  const created = await prisma.mission.create({
    data: {
      store_id: missionData.store_id,
      name: missionData.name,
      deadline: missionData.deadline,
      min_cost: missionData.min_cost,
      reward: missionData.reward,
      created_at: missionData.created_at,
      updated_at: missionData.updated_at,
    },
  });
  return created.id;
};

export const getMissionById = async (id) => {
  const mission = await prisma.mission.findUnique({
    where: { id },
  });
  return mission || null;
};


export const getMissionsByStoreId = async (storeId, cursor) => {
  const missions = await prisma.mission.findMany({
    where: {
      store_id: storeId,
      id: { gt: cursor },
    },
    orderBy: { id: "asc" },
    take: 5,
    select: {
      id: true,
      name: true,
      deadline: true,
      min_cost: true,
      reward: true,
      created_at: true,
      updated_at: true,
      store_id: true,
    },
  });

  return missions;
};