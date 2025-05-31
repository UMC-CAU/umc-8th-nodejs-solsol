import { StatusCodes } from "http-status-codes";
import { bodyToMemberMission } from "../dtos/memberMission.dto.js";
import { createMemberMission, listMemberMissionsByState } from "../services/memberMission.service.js";

export const handlePostMemberMission = async (req, res) => {
  /*
    #swagger.summary = '회원 미션 참여 등록 API'
    #swagger.description = '회원이 특정 미션에 참여한 내역을 등록합니다.'
    #swagger.tags = ['MemberMission']

    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            required: ["member_id", "mission_id", "state"],
            properties: {
              member_id: { type: "integer", example: 1 },
              mission_id: { type: "integer", example: 10 },
              state: {
                type: "string",
                enum: ["IN_PROGRESS", "COMPLETED", "FAILED"],
                example: "IN_PROGRESS"
              },
              completed_at: {
                type: "string",
                format: "date-time",
                example: "2024-05-19T15:30:00Z",
                nullable: true
              }
            }
          }
        }
      }
    }

    #swagger.responses[201] = {
      description: '회원 미션 참여 등록 성공',
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
                  id: { type: "integer", example: 15 },
                  member_id: { type: "integer", example: 1 },
                  mission_id: { type: "integer", example: 10 },
                  state: { type: "string", example: "IN_PROGRESS" },
                  completed_at: { type: "string", format: "date-time", example: null }
                }
              }
            }
          }
        }
      }
    }

    #swagger.responses[500] = {
      description: '서버 오류로 회원 미션 참여 등록 실패',
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              error: { type: "string", example: "member_mission 생성 중 서버 오류 발생" }
            }
          }
        }
      }
    }
  */
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
  /*
    #swagger.summary = '회원 미션 목록 조회 API'
    #swagger.description = '회원이 참여 중인 또는 완료한 미션 목록을 상태별로 커서 기반 조회합니다.'
    #swagger.tags = ['MemberMission']

    #swagger.parameters['memberId'] = {
      in: 'path',
      required: true,
      description: '조회할 회원 ID',
      type: 'integer',
       example: 1 
    }

    #swagger.parameters['cursor'] = {
      in: 'query',
      required: false,
      description: '마지막으로 조회한 member_mission ID (커서 페이징)',
      type: 'integer',
      example: 5 
    }

    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            required: ["state"],
            properties: {
              state: {
                type: "string",
                enum: ["IN_PROGRESS", "DONE"],
                example: "IN_PROGRESS"
              }
            }
          }
        }
      }
    }

    #swagger.responses[200] = {
      description: '회원 미션 목록 조회 성공',
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
                    id: { type: "integer", example: 6 },
                    state: { type: "string", example: "IN_PROGRESS" },
                    completed_at: { type: "string", format: "date-time", nullable: true, example: null },
                    mission_id: { type: "integer", example: 10 },
                    member_id: { type: "integer", example: 1 },
                    mission: {
                      type: "object",
                      properties: {
                        id: { type: "integer", example: 10 },
                        name: { type: "string", example: "만원 이상 주문하기" },
                        deadline: { type: "string", format: "date-time", example: "2024-12-31T23:59:59Z" },
                        reward: { type: "string", example: "음료 쿠폰" }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

    #swagger.responses[500] = {
      description: '서버 오류로 인해 회원 미션 목록 조회 실패',
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              error: { type: "string", example: "회원 미션 조회 중 서버 오류 발생" }
            }
          }
        }
      }
    }
  */

  const memberId = parseInt(req.params.memberId);
  const cursor =
    typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0;
  const { state } = req.body;

  const result = await listMemberMissionsByState(memberId, state, cursor);
  res.status(StatusCodes.OK).success(result);
};