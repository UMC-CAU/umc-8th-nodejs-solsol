import { insertReview, getReviewById, getReviewsByMemberId } from "../repositories/review.repository.js";
import { getStoreById } from "../repositories/store.repository.js";
import { responseFromReviews } from "../dtos/review.dto.js";

export const createReview = async (reviewData) => {
    const store = await getStoreById(reviewData.store_id);
    if (!store) {
      throw new Error("존재하지 않는 store_id입니다.");
    }
  
    const reviewId = await insertReview(reviewData);
    if (!reviewId) {
      throw new Error("리뷰 생성 실패");
    }
  
    const newReview = await getReviewById(reviewId);
    return newReview;
  };

  export const listReviewsByMember = async (memberId, cursor) => {
    const reviews = await getReviewsByMemberId(memberId, cursor);
    return responseFromReviews(reviews);
  };