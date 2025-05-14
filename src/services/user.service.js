//user.service.js
import { responseFromUser } from "../dtos/user.dto.js";
import { 
  DuplicateUserEmailError,
  DuplicateUserEmailPhoneNumberError,
  DuplicateUserPhoneNumberError,
  PhoneNumberNotVerifiedError
 } from "../errors.js";
import {
  addUser,
  getUser,
  getUserPreferencesByUserId,
  setPreference,
} from "../repositories/user.repository.js";

export const userSignUp = async (data) => {
  if(!data.isPhoneVerified) {
    throw new PhoneNumberNotVerifiedError("번호 인증이 완료되지 않았습니다.", data);
  }
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

  if (joinUserId === "DUPLICATE_EMAIL_PHONENUMBER") {
    throw new DuplicateUserEmailPhoneNumberError("이미 존재하는 이메일, 전화번호입니다.", data);
  }
  if (joinUserId === "DUPLICATE_EMAIL") {
    throw new DuplicateUserEmailError("이미 존재하는 이메일입니다.", data);
  }
  if (joinUserId === "DUPLICATE_PHONENUMBER") {
    throw new DuplicateUserPhoneNumberError("이미 존재하는 전화번호입니다.", data);
  }

  // for (const preference of data.preferences) {
  //   await setPreference(joinUserId, preference);
  // }

   const user = await getUser(joinUserId);
  // const preferences = await getUserPreferencesByUserId(joinUserId);

  return responseFromUser({ user });
};