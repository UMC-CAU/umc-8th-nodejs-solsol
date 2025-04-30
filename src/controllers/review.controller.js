import { StatusCodes } from "http-status-codes";
import { bodyToReview } from "../dtos/review.dto.js";
import { createReview } from "../services/review.service.js";

export const handlePostReview = async (req, res) => {
  console.log("📥 리뷰 생성 요청:", req.body);

  try {
    const reviewData = bodyToReview(req.body);
    const newReview = await createReview(reviewData);

    res.status(StatusCodes.CREATED).json({ result: newReview });
  } catch (error) {
    console.error("❌ 리뷰 생성 실패:", error.message);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};
