import { StatusCodes } from "http-status-codes";
import { bodyToRegion } from "../dtos/region.dto.js";
import { createRegion } from "../services/region.service.js";

export const handlePostRegion = async (req, res) => {
  /*
    #swagger.summary = '지역 생성 API'
    #swagger.description = '신규 지역 정보를 등록합니다.'
    #swagger.tags = ['Region']

    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            required: ["name"],
            properties: {
              name: { type: "string", example: "서울 강남구" }
            }
          }
        }
      }
    }

    #swagger.responses[201] = {
      description: '지역 생성 성공',
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              error: { type: "object", nullable: true, example: null },
              success: {
                type: "object",
                properties: {
                  id: { type: "integer", example: 1 },
                  name: { type: "string", example: "서울 강남구" }
                }
              }
            }
          }
        }
      }
    }

    #swagger.responses[500] = {
      description: '서버 오류로 지역 생성 실패',
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              error: { type: "string", example: "데이터베이스 오류 발생" }
            }
          }
        }
      }
    }
  */
  console.log("📥 지역 생성 요청:", req.body);

  try {
    const regionData = bodyToRegion(req.body);
    const newRegion = await createRegion(regionData);

    res.status(StatusCodes.CREATED).success(newRegion);
  } catch (error) {
    console.error("❌ 지역 생성 실패:", error.message);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};
