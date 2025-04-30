export const bodyToReview = (body) => {
    const now = new Date();
  
    return {
      store_id: body.store_id,
      mem_id: body.mem_id,
      content: body.content,
      rate: body.rate,
      created_at: now,
      updated_at: now,
    };
  };
  