import { insertRegion, getRegionById } from "../repositories/region.repository.js";

export const createRegion = async (regionData) => {
  
    const regionId = await insertRegion(regionData);
    if (!regionId) {
      throw new Error("지역 생성 실패");
    }
  
    const newRegion = await getRegionById(regionId);
    return newRegion;
  };
