export const bodyToReview = (body) => {
    const now = new Date();
  
    return {
      store_id: body.storeId,
      mem_id: body.memId,
      content: body.content,
      rate: body.rate,
      created_at: now,
      updated_at: now,
    };
  };
  
  export const responseFromReviews = (reviews) => {
    return {
      data: reviews,
      pagination: {
        cursor: reviews.length ? reviews[reviews.length - 1].id : null,
      },
    };
  };