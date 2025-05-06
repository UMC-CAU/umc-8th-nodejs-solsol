import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const addUser = async (data) => {
  console.log('[DEBUG] INSERT DATA:', data);

  // 1. 중복 이메일 체크
  const existing = await prisma.member.findUnique({
    where: { email: data.email },
  });

  if (existing) return null;

  // 2. 유저 생성
  const created = await prisma.member.create({
    data: {
      gender: data.gender,
      birth: data.birth,
      address: data.address,
      point: data.point,
      state: data.state,
      deactivate_date: data.deactivate_date,
      role: data.role,
      phone_number: data.phoneNumber,
      email: data.email,
      password: data.password,
      is_phone_verified: data.isPhoneVerified,
      created_at: data.created_at,
      updated_at: data.updated_at,
      name: data.name,
    },
  });

  return created.id;
};

export const getUser = async (userId) => {
  const user = await prisma.member.findUnique({
    where: { id: userId },
  });

  if (!user) return null;
  return user;
};

export const setPreference = async (userId, foodCategoryId) => {
  await prisma.userFavorCategory.create({
    data: {
      user_id: userId,
      food_category_id: foodCategoryId,
    },
  });
};

export const getUserPreferencesByUserId = async (userId) => {
  const preferences = await prisma.userFavorCategory.findMany({
    where: { user_id: userId },
    orderBy: { food_category_id: 'asc' },
    include: {
      food_category: true, // 관계 필드 이름: schema에서 relation 명시돼 있어야 함
    },
  });

  return preferences;
};


