import {
    updateStoreRegion,
    getStoreById,
    insertStore,
  } from "../repositories/store.repository.js";
  
  export const patchStore = async (storeData) => {
    const { id, region_id } = storeData;
  
    const store = await getStoreById(id);
    if (!store) {
      throw new Error("존재하지 않는 store입니다.");
    }
  
    await updateStoreRegion(id, region_id);
    const updatedStore = await getStoreById(id);
    return updatedStore;
  };
  
  export const createStore = async (storeData) => {
    // DB에 삽입하고 새로 생성된 store의 ID를 받아옴
    const storeId = await insertStore(storeData);
  
    if (!storeId) {
      throw new Error("store 생성 실패");
    }
  
    // 생성된 store 다시 조회해서 반환
    const newStore = await getStoreById(storeId);
    return newStore;
  };
  