import {
    insertMemberMission,
    getMemberMissionById,
    getMemberMissionsByState
  } from "../repositories/memberMission.repository.js";
  import { getMissionById } from "../repositories/mission.repository.js";
  import { responseFromMemberMissions } from "../dtos/memberMission.dto.js";

  export const createMemberMission = async (data) => {
    const mission = await getMissionById(data.mission_id);
    if (!mission) {
      throw new Error("존재하지 않는 mission_id입니다.");
    }
  
    const id = await insertMemberMission(data);
    const newEntry = await getMemberMissionById(id);
    return newEntry;
  };

  export const listMemberMissionsByState = async (memberId, state, cursor) => {
    const missions = await getMemberMissionsByState(memberId, state, cursor);
    return responseFromMemberMissions(missions);
  };
  