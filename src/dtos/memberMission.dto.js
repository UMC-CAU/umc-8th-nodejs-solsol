export const bodyToMemberMission = (body) => {
    return {
      member_id: body.member_id,
      mission_id: body.mission_id,
      state: body.state || "IN_PROGRESS",
      completed_at: body.completed_at || null,
    };
  };
  
  export const responseFromMemberMissions = (missions) => {
    return {
      data: missions,
      pagination: {
        cursor: missions.length ? missions[missions.length - 1].id : null,
      },
    };
  };