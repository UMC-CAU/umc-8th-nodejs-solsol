//store.controller.js
import { StatusCodes } from "http-status-codes";
import { bodyToStore } from "../dtos/store.dto.js";
import { patchStore } from "../services/store.service.js";

export const handlePatchStore = async (req, res, next) => {
  /*
    #swagger.summary = '상점 지역 수정 API'
    #swagger.description = 'storeId에 해당하는 상점의 지역(region_id)을 수정합니다.'
    #swagger.tags = ['Store']
    
    #swagger.parameters['storeId'] = {
      in: 'path',
      description: '수정할 상점의 ID',
      required: true,
      name: 'storeId',
      
        type: 'integer', 
        minimum: 1
      
    }

    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            required: ["regionId"],
            properties: {
              regionId: { type: "integer", example: 3 }
            }
          }
        }
      }
    }

    #swagger.responses[200] = {
      description: '상점 지역 수정 성공',
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
                  region_id: { type: "integer", example: 3 },
                  
                }
              }
            }
          }
        }
      }
    }

    #swagger.responses[400] = {
      description: '잘못된 요청 또는 존재하지 않는 상점',
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "S001" },
                  reason: { type: "string", example: "존재하지 않는 상점입니다." },
                  data: { type: "object", example: {} }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    }
  */
  console.log("store patch를 요청했습니다. ");
  console.log("body:", req.body);

  const storeId = req.params.storeId;
  const store = await patchStore(bodyToStore(req.body, storeId));
  res.status(StatusCodes.OK).success(store);
};



import { createStore } from "../services/store.service.js"; 

export const handlePostStore = async (req, res, next) => {
  /*
    #swagger.summary = '상점 생성 API'
    #swagger.description = '새로운 상점 정보를 등록합니다.'
    #swagger.tags = ['Store']

    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            required: ["region_id", "name", "rate", "category", "owner_id"],
            properties: {
              regionId: { type: "integer", example: 2 },
              name: { type: "string", example: "피자헛 강남점" },
              rate: { type: "number", format: "float", example: 4.5 },
              category: { type: "string",
              enum: ["CHINESE", "JAPANESE", "FRENCH", "ITALIAN", "AMERICAN", "MEXICAN", "KOREAN", "VIETNAMESE", "ETC"],
              example: "ITALIAN" 
              },
              ownerId: { type: "integer", example: 1 },
              createdAt: { type: "string", format: "date-time", example: "2024-01-01T12:00:00Z" },
              updatedAt: { type: "string", format: "date-time", example: "2024-01-01T12:00:00Z" }
            }
          }
        }
      }
    }

    #swagger.responses[201] = {
      description: '상점 생성 성공',
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
                  region_id: { type: "integer", example: 2 },
                  name: { type: "string", example: "피자헛 강남점" },
                  rate: { type: "number", format: "float", example: 4.5 },
                  category: { type: "string", example: "음식점" },
                  owner_id: { type: "integer", example: 1 },
                  created_at: { type: "string", format: "date-time", example: "2024-01-01T12:00:00Z" },
                  updated_at: { type: "string", format: "date-time", example: "2024-01-01T12:00:00Z" }
                }
              }
            }
          }
        }
      }
    }

    #swagger.responses[500] = {
      description: '서버 내부 오류로 인한 상점 생성 실패',
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
  console.log("store 생성을 요청했습니다.");
  console.log("body:", req.body);

  try {
    const storeData = bodyToStore(req.body); // dto 변환
    console.log("data: ", storeData);
    const newStore = await createStore(storeData); // 실제 생성
    res.status(StatusCodes.CREATED).success(newStore);
  } catch (error) {
    console.error("❌ Store 생성 실패:", error.message);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};