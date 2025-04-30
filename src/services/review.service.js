import { insertReview, getReviewById } from "../repositories/review.repository.js";
import { getStoreById } from "../repositories/store.repository.js";

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
