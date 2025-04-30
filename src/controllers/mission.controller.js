import { StatusCodes } from "http-status-codes";
import { bodyToMission } from "../dtos/mission.dto.js";
import { createMission } from "../services/mission.service.js";

export const handlePostMission = async (req, res) => {
  console.log("📥 미션 생성 요청:", req.body);

  try {
    const missionData = bodyToMission(req.body);
    const newMission = await createMission(missionData);

    res.status(StatusCodes.CREATED).json({ result: newMission });
  } catch (error) {
    console.error("❌ 미션 생성 실패:", error.message);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};
