export const bodyToMission = (body) => {
    const now = new Date();
  
    return {
      store_id: body.storeId,
      name: body.name,
      deadline: new Date(body.deadline),
      min_cost: body.minCost,
      reward: body.reward,
      created_at: now,
      updated_at: now,
    };
  };
  
  export const responseFromMissions = (missions) => {
    return {
      data: missions,
      pagination: {
        cursor: missions.length ? missions[missions.length - 1].id : null,
      },
    };
  };