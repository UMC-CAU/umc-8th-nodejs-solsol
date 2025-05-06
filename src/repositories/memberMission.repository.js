import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const insertMemberMission = async (data) => {
  const created = await prisma.memberMission.create({
    data: {
      member_id: data.member_id,
      mission_id: data.mission_id,
      state: data.state,
      completed_at: data.completed_at,
    },
  });
  return created.id;
};

export const getMemberMissionById = async (id) => {
  const result = await prisma.memberMission.findUnique({
    where: { id: id },
  });
  return result || null;
};

export const getMemberMissionsByState = async (memberId, state, cursor) => {
  const missions = await prisma.memberMission.findMany({
    where: {
      member_id: memberId,
      state: state, // "IN_PROGRESS" or "DONE"
      id: { gt: cursor },
    },
    orderBy: { id: "asc" },
    take: 5,
    select: {
      id: true,
      state: true,
      completed_at: true,
      mission_id: true,
      member_id: true,
      mission: true,
    },
  });

  return missions;
};