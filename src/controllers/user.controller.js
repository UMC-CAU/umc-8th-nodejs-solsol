//user.controller.js
import { StatusCodes } from "http-status-codes";
import { bodyToUser } from "../dtos/user.dto.js";
import { userSignUp } from "../services/user.service.js";

export const handleUserSignUp = async (req, res, next) => {
  /*
    #swagger.summary = '회원 가입 API'
    #swagger.description = '사용자로부터 회원 정보를 받아 회원 가입을 처리합니다.'
    #swagger.tags = ['User']
    
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            required: ["email", "password", "name", "gender", "birth", "phoneNumber", "role", "isPhoneVerified"],
            properties: {
              email: { type: "string", example: "test@example.com" },
              password: { type: "string", example: "1234pass" },
              name: { type: "string", example: "홍길동" },
              gender: { type: "string", example: "MALE" },
              birth: { type: "string", format: "date", example: "1990-01-01" },
              address: { type: "string", example: "서울시 강남구" },
              detailAddress: { type: "string", example: "101동 202호" },
              phoneNumber: { type: "string", example: "01012345678" },
              role: {
                type: "string",
                enum: ["USER", "STORE"],
                example: "USER"
              },
              isPhoneVerified: {
                type: "boolean",
                example: true
              }
            }
          }
        }
      }
    }

    #swagger.responses[200] = {
      description: '회원 가입 성공',
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
                  email: { type: "string", example: "test@example.com" },
                  name: { type: "string", example: "홍길동" }
                }
              }
            }
          }
        }
      }
    }

    #swagger.responses[400] = {
      description: '회원 가입 실패 (중복/미인증 등)',
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "U001" },
                  reason: { type: "string", example: "이미 존재하는 이메일입니다." },
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
  console.log("회원가입을 요청했습니다!");
  console.log("body:", req.body);

  const user = await userSignUp(bodyToUser(req.body));
  res.status(StatusCodes.OK).success(user);
};
