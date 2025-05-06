//store.controller.js
import { StatusCodes } from "http-status-codes";
import { bodyToStore } from "../dtos/store.dto.js";
import { patchStore } from "../services/store.service.js";

export const handlePatchStore = async (req, res, next) => {
  console.log("store patch를 요청했습니다. ");
  console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용

  const storeId = req.params.storeId;
  const store = await patchStore(bodyToStore(req.body, storeId));
  res.status(StatusCodes.OK).json({ result: store });
};


import { createStore } from "../services/store.service.js"; 

export const handlePostStore = async (req, res, next) => {
  console.log("store 생성을 요청했습니다.");
  console.log("body:", req.body);

  try {
    const storeData = bodyToStore(req.body); // dto 변환
    console.log("data: ", storeData);
    const newStore = await createStore(storeData); // 실제 생성
    res.status(StatusCodes.CREATED).json({ result: newStore });
  } catch (error) {
    console.error("❌ Store 생성 실패:", error.message);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};