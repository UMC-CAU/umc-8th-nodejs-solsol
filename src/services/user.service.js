//user.service.js
import { responseFromUser } from "../dtos/user.dto.js";
import {
  addUser,
  getUser,
  getUserPreferencesByUserId,
  setPreference,
} from "../repositories/user.repository.js";

export const userSignUp = async (data) => {
  const joinUserId = await addUser({
    gender: data.gender,
    birth: data.birth,
    address: data.address,
    point: data.point,
    state: data.state,
    deactivate_date: data.deactivate_date,
    role: data.role,
    phoneNumber: data.phoneNumber,
    email: data.email,
    password: data.password,
    isPhoneVerified: data.isPhoneVerified,
    created_at: data.created_at,
    updated_at: data.updated_at,
    name: data.name,
  });

  if (joinUserId === null) {
    throw new Error("이미 존재하는 이메일입니다.");
  }

  // for (const preference of data.preferences) {
  //   await setPreference(joinUserId, preference);
  // }

   const user = await getUser(joinUserId);
  // const preferences = await getUserPreferencesByUserId(joinUserId);

  return responseFromUser({ user });
};