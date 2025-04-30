export const bodyToMemberMission = (body) => {
    return {
      member_id: body.member_id,
      mission_id: body.mission_id,
      state: body.state || "IN_PROGRESS",
      completed_at: body.completed_at || null,
    };
  };
  