// import dotenv from 'dotenv';
// dotenv.config(); // 💥 가장 먼저 호출해야 함!

// import sequelize from './config/database.js';

// console.log('[DEBUG] USER:', process.env.DB_USER);
// console.log('[DEBUG] PASS:', process.env.DB_PASS);

// (async () => {
//   try {
//     await sequelize.authenticate();
//     console.log('✅ DB 연결 성공!');
//   } catch (error) {
//     console.error('❌ DB 연결 실패:', error);
//   }
// })();

import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { handleUserSignUp } from "./controllers/user.controller.js";
import { handlePatchStore } from "./controllers/store.controller.js";
import { handlePostStore } from "./controllers/store.controller.js";
import { handlePostReview } from "./controllers/review.controller.js";
import { handlePostMission } from "./controllers/mission.controller.js";
import {handlePostMemberMission} from "./controllers/memberMission.controller.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors()); // cors 방식 허용
app.use(express.static("public")); // 정적 파일 접근
app.use(express.json()); // request의 본문을 json으로 해석할 수 있도록 함 (JSON 형태의 요청 body를 파싱하기 위함)
app.use(express.urlencoded({ extended: false })); // 단순 객체 문자열 형태로 본문 데이터 해석

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/user", handleUserSignUp);
app.patch("/store/:storeId", handlePatchStore);
app.post("/store", handlePostStore);
app.post("/review", handlePostReview);
app.post("/mission", handlePostMission);
app.post("/member_mission", handlePostMemberMission);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});