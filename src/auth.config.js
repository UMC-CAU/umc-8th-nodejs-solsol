//auth.config.js

import dotenv from "dotenv";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { prisma } from "./db.config.js";

dotenv.config();
export const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.PASSPORT_GOOGLE_CLIENT_ID,
    clientSecret: process.env.PASSPORT_GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/oauth2/callback/google",
    scope: ["email", "profile"],
    state: true,
  },
  (accessToken, refreshToken, profile, cb) => {
    return googleVerify(profile)
      .then((user) => cb(null, user))
      .catch((err) => cb(err));
  }
);


const googleVerify = async (profile) => {
  const email = profile.emails?.[0]?.value;
  if (!email) {
    throw new Error(`profile.email was not found: ${profile}`);
  }
  console.log(`Google profile email: ${email}`);
  const user = await prisma.member.findFirst({ where: { email } });
  if (user !== null) {
    return { id: user.id, email: user.email, name: user.name };
  }
  const now = new Date();
 
  const created = await prisma.member.create({
    data: {
      gender: "UNCHOSEN",
      birth: new Date(1970, 0, 1),
      address: "추후 수정",
      point: 0,
      state: 0,
      deactivate_date: null,
      role: "USER",
      phone_number: "추후 수정",
      email,
      password: "추후 수정",
      is_phone_verified: true,
      created_at: now,
      updated_at: now,
      name: profile.displayName,
    },
  });

  return { id: created.id, email: created.email, name: created.name };
};





import passport from 'passport'
import { Strategy as NaverStrategy } from 'passport-naver-v2'


  export const naverStrategy = new NaverStrategy(
    {
      clientID: process.env.PASSPORT_NAVER_CLIENT_ID,
      clientSecret: process.env.PASSPORT_NAVER_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/oauth2/callback/naver", // 네이버에 등록한 콜백 URL과 일치해야 함
    },
    function (accessToken, refreshToken, profile, done) {
      console.log("Naver profile:", profile);
      return naverVerify(profile)
      .then((user) => done(null, user))
      .catch((err) => done(err));
    }
  );


const naverVerify = async (profile) => {
  const email = profile.email || profile.response?.email; // 네이버 프로필에서 이메일을 가져옵니다.
  const name = profile.name || profile.response?.name; // 네이버 프로필에서 이름을 가져옵니다.

  console.log("Naver email:", email);
  if (!email) {
    throw new Error(`profile.email was not found: ${profile}`);
  }
  console.log(`Naver profile email: ${email}`);
  const user = await prisma.member.findFirst({ where: { email } });
  if (user !== null) {
    return { id: user.id, email: user.email, name: user.name };
  }
  const now = new Date();
 
  const created = await prisma.member.create({
    data: {
      gender: "UNCHOSEN",
      birth: new Date(1970, 0, 1),
      address: "추후 수정",
      point: 0,
      state: 0,
      deactivate_date: null,
      role: "USER",
      phone_number: "추후 수정",
      email,
      password: "추후 수정",
      is_phone_verified: true,
      created_at: now,
      updated_at: now,
      name: name,
    },
  });

  return { id: created.id, email: created.email, name: created.name };
};
