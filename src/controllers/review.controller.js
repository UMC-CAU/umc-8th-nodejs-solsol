import { StatusCodes } from "http-status-codes";
import { bodyToReview } from "../dtos/review.dto.js";
import { createReview } from "../services/review.service.js";
import { listReviewsByMember } from "../services/review.service.js";

export const handlePostReview = async (req, res) => {
  console.log("📥 리뷰 생성 요청:", req.body);

  const reviewData = bodyToReview(req.body);
  const newReview = await createReview(reviewData);

  res.status(StatusCodes.CREATED).success(newReview);
   
};

export const handleGetReviews = async (req, res, next) => {
  const memberId = parseInt(req.params.memberId);
  const cursor =
    typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0;

  const reviews = await listReviewsByMember(memberId, cursor);
  res.status(StatusCodes.OK).success(reviews); // or .success() if custom middleware
};