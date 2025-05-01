//user.dto.js

export const bodyToUser = (body) => {
    const birth = new Date(body.birth);
    const now = new Date();

    return {
      gender: body.gender, //ok
      birth, //ok
      address: body.address || "", //ok
      point: 0, //ok
      state: 0,//ok
      deactivate_date : null,//ok
      role: body.role,
      phoneNumber: body.phoneNumber, //ok
      email: body.email,//ok
      password: body.password,
      isPhoneVerified : body.isPhoneVerified,
      created_at: now,
      updated_at: now,
      name: body.name, //ok
    };
  };


export const responseFromUser = ({ user }) => {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      gender: user.gender,
      birth: user.birth,
      address: user.address, 
      phoneNumber: user.phone_number,     // DB 컬럼명이 snake_case일 수도 있음
      createdAt: user.created_at,
      updatedAt: user.updated_at,
    };
  };
  