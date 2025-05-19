import { StatusCodes } from "http-status-codes";
import { bodyToReview } from "../dtos/review.dto.js";
import { createReview } from "../services/review.service.js";
import { listReviewsByMember } from "../services/review.service.js";

export const handlePostReview = async (req, res) => {
  /*
    #swagger.summary = '리뷰 생성 API'
    #swagger.description = '특정 상점에 대한 리뷰를 작성합니다.'
    #swagger.tags = ['Review']

    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            required: ["store_id", "mem_id", "content", "rate"],
            properties: {
              storeId: { type: "integer", example: 5 },
              memId: { type: "integer", example: 3 },
              content: { type: "string", example: "맛있어요. 재방문 의사 있습니다!" },
              rate: { type: "number", format: "float", example: 4.8 },
              createdAt: { type: "string", format: "date-time", example: "2024-01-01T12:00:00Z" },
              updatedAt: { type: "string", format: "date-time", example: "2024-01-01T12:00:00Z" }
            }
          }
        }
      }
    }

    #swagger.responses[201] = {
      description: '리뷰 생성 성공',
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
                  id: { type: "integer", example: 12 },
                  store_id: { type: "integer", example: 5 },
                  mem_id: { type: "integer", example: 3 },
                  content: { type: "string", example: "맛있어요. 재방문 의사 있습니다!" },
                  rate: { type: "number", format: "float", example: 4.8 },
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
      description: '서버 오류로 리뷰 생성 실패',
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              error: { type: "string", example: "리뷰 생성 중 서버 오류 발생" }
            }
          }
        }
      }
    }
  */
  console.log("📥 리뷰 생성 요청:", req.body);

  const reviewData = bodyToReview(req.body);
  const newReview = await createReview(reviewData);

  res.status(StatusCodes.CREATED).success(newReview);
};


export const handleGetReviews = async (req, res, next) => {
  /*
    #swagger.summary = '회원 리뷰 목록 조회 API'
    #swagger.description = '특정 회원이 작성한 리뷰 목록을 5개씩 커서 기반으로 조회합니다.'
    #swagger.tags = ['Review']

    #swagger.parameters['memberId'] = {
      in: 'path',
      required: true,
      description: '회원 ID',
      type: 'integer', 
      example: 1 
    }

    #swagger.parameters['cursor'] = {
      in: 'query',
      required: false,
      description: '마지막으로 조회한 리뷰 ID (cursor paging)',
      type: 'integer',
      example: 10 
       }
    }

    #swagger.responses[200] = {
      description: '회원 리뷰 목록 조회 성공',
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
                    id: { type: "integer", example: 11 },
                    content: { type: "string", example: "음식이 정말 맛있어요!" },
                    rate: { type: "number", format: "float", example: 4.5 },
                    created_at: { type: "string", format: "date-time", example: "2024-01-01T12:00:00Z" },
                    store_id: { type: "integer", example: 5 },
                    store: {
                      type: "object",
                      properties: {
                        id: { type: "integer", example: 5 },
                        name: { type: "string", example: "피자헛 강남점" }
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
      description: '서버 오류로 인한 리뷰 목록 조회 실패',
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              error: { type: "string", example: "리뷰 조회 중 서버 오류 발생" }
            }
          }
        }
      }
    }
  */

  const memberId = parseInt(req.params.memberId);
  const cursor =
    typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0;

  const reviews = await listReviewsByMember(memberId, cursor);
  res.status(StatusCodes.OK).success(reviews);
};
