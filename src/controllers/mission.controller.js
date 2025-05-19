import { StatusCodes } from "http-status-codes";
import { bodyToMission } from "../dtos/mission.dto.js";
import { createMission } from "../services/mission.service.js";
import { listMissionsByStore } from "../services/mission.service.js";

export const handlePostMission = async (req, res) => {
  /*
    #swagger.summary = '미션 생성 API'
    #swagger.description = '지정된 상점에 새로운 미션을 등록합니다.'
    #swagger.tags = ['Mission']

    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            required: ["store_id", "name", "deadline", "min_cost", "reward"],
            properties: {
              storeId: { type: "integer", example: 3 },
              name: { type: "string", example: "10,000원 이상 주문하고 인증샷 찍기" },
              deadline: { type: "string", format: "date-time", example: "2024-12-31T23:59:59Z" },
              minCost: { type: "number", example: 10000 },
              reward: { type: "integer", example: 1000 },
            }
          }
        }
      }
    }

    #swagger.responses[201] = {
      description: '미션 생성 성공',
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
                  id: { type: "integer", example: 10 },
                  store_id: { type: "integer", example: 1 },
                  name: { type: "string", example: "10,000원 이상 주문하고 인증샷 찍기" },
                  deadline: { type: "string", format: "date-time", example: "2024-12-31T23:59:59Z" },
                  min_cost: { type: "number", example: 10000 },
                  reward: { type: "string", example: "음료 쿠폰 지급" },
                  created_at: { type: "string", format: "date-time", example: "2024-01-01T00:00:00Z" },
                  updated_at: { type: "string", format: "date-time", example: "2024-01-01T00:00:00Z" }
                }
              }
            }
          }
        }
      }
    }

    #swagger.responses[500] = {
      description: '서버 오류로 미션 생성 실패',
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              error: { type: "string", example: "미션 생성 중 서버 오류 발생" }
            }
          }
        }
      }
    }
  */
  console.log("📥 미션 생성 요청:", req.body);

  try {
    const missionData = bodyToMission(req.body);
    const newMission = await createMission(missionData);

    res.status(StatusCodes.CREATED).success(newMission);
  } catch (error) {
    console.error("❌ 미션 생성 실패:", error.message);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};


export const handleGetMissions = async (req, res, next) => {
  /*
    #swagger.summary = '상점 미션 목록 조회 API'
    #swagger.description = '특정 상점에서 진행 중인 미션을 커서 기반으로 5개씩 조회합니다.'
    #swagger.tags = ['Mission']

    #swagger.parameters['storeId'] = {
      in: 'path',
      required: true,
      description: '미션을 조회할 상점 ID',
      type: 'integer',
      example: 2 
    }

    #swagger.parameters['cursor'] = {
      in: 'query',
      required: false,
      description: '마지막으로 조회한 미션 ID (커서 페이징)',
      type: 'integer',
      example: 20 
    }

    #swagger.responses[200] = {
      description: '상점 미션 목록 조회 성공',
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              error: { type: "object", nullable: true, example: null },
              success: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: { type: "integer", example: 21 },
                    name: { type: "string", example: "1만원 이상 주문 시 음료 제공" },
                    deadline: { type: "string", format: "date-time", example: "2024-12-31T23:59:59Z" },
                    min_cost: { type: "number", example: 10000 },
                    reward: { type: "string", example: "콜라 1병" },
                    created_at: { type: "string", format: "date-time", example: "2024-01-01T10:00:00Z" },
                    updated_at: { type: "string", format: "date-time", example: "2024-01-01T10:00:00Z" },
                    store_id: { type: "integer", example: 2 }
                  }
                }
              }
            }
          }
        }
      }
    }

    #swagger.responses[500] = {
      description: '서버 오류로 인해 미션 목록 조회 실패',
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              error: { type: "string", example: "미션 조회 중 서버 오류 발생" }
            }
          }
        }
      }
    }
  */

  const storeId = parseInt(req.params.storeId);
  const cursor =
    typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0;

  const missions = await listMissionsByStore(storeId, cursor);
  res.status(StatusCodes.OK).success(missions);
};
