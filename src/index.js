//index.js
BigInt.prototype.toJSON = function () {
  return this.toString();
};
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { handleUserSignUp } from "./controllers/user.controller.js";
import { handlePatchStore } from "./controllers/store.controller.js";
import { handlePostStore } from "./controllers/store.controller.js";
import { handlePostReview, handleGetReviews } from "./controllers/review.controller.js";
import { handlePostMission, handleGetMissions } from "./controllers/mission.controller.js";
import {handlePostMemberMission, handleGetMemberMissions} from "./controllers/memberMission.controller.js";
import {handlePostRegion} from "./controllers/region.controller.js";
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

app.post("/user", handleUserSignUp); //USER 생성
app.patch("/store/:storeId", handlePatchStore); // 가게 정보 수정(region만 구현 되어 있었나..?)
app.post("/store", handlePostStore); // 가게 생성
app.post("/region", handlePostRegion);
app.post("/review", handlePostReview); // 리뷰 생성
app.post("/mission", handlePostMission); // 미션 추가
app.post("/member_mission", handlePostMemberMission); //진행 중인 미션 추가
app.get("/reviews/:memberId", handleGetReviews);
app.get("/missions/store/:storeId", handleGetMissions);
app.get("/member_missions/member/:memberId", handleGetMemberMissions);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});