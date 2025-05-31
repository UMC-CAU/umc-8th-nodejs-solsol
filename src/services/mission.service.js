import { insertMission, getMissionById, getMissionsByStoreId } from "../repositories/mission.repository.js";
import { getStoreById } from "../repositories/store.repository.js"; // store 존재 확인
import { responseFromMissions } from "../dtos/mission.dto.js";

export const createMission = async (missionData) => {
  // 가게 존재 확인
  const store = await getStoreById(missionData.store_id);
  if (!store) {
    throw new Error("존재하지 않는 store_id입니다.");
  }

  // 미션 삽입
  const missionId = await insertMission(missionData);
  if (!missionId) {
    throw new Error("미션 생성 실패");
  }

  // 생성된 미션 조회
  const newMission = await getMissionById(missionId);
  return newMission;
};

export const listMissionsByStore = async (storeId, cursor) => {
  const missions = await getMissionsByStoreId(storeId, cursor);
  return responseFromMissions(missions);
};