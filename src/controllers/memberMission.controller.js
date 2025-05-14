import { StatusCodes } from "http-status-codes";
import { bodyToMemberMission } from "../dtos/memberMission.dto.js";
import { createMemberMission, listMemberMissionsByState } from "../services/memberMission.service.js";

export const handlePostMemberMission = async (req, res) => {
  console.log("📥 회원-미션 참여 등록 요청:", req.body);

  try {
    const data = bodyToMemberMission(req.body);
    const newMemberMission = await createMemberMission(data);

    res.status(StatusCodes.CREATED).success(newMemberMission);
  } catch (error) {
    console.error("❌ member_mission 생성 실패:", error.message);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};


export const handleGetMemberMissions = async (req, res, next) => {
  const memberId = parseInt(req.params.memberId);
  const cursor =
    typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0;
  const { state } = req.body;

  const result = await listMemberMissionsByState(memberId, state, cursor);
  res.status(StatusCodes.OK).success(result);
};