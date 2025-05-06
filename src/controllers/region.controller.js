import { StatusCodes } from "http-status-codes";
import { bodyToRegion } from "../dtos/region.dto.js";
import { createRegion } from "../services/region.service.js";

export const handlePostRegion = async (req, res) => {
  console.log("📥 지역 생성 요청:", req.body);

  try {
    const regionData = bodyToRegion(req.body);
    const newRegion = await createRegion(regionData);

    res.status(StatusCodes.CREATED).json({ result: newRegion });
  } catch (error) {
    console.error("❌ 지역 생성 실패:", error.message);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};
