//store.dto.js

export const bodyToStore = (body, storeId) => {
    const now = new Date();
    const store = {};
    
    if (storeId !== undefined) {
      store.id = Number(storeId);
    }
  
    if ('regionId' in body) store.region_id = body.regionId;
    if ('name' in body) store.name = body.name;
    if ('rate' in body) store.rate = body.rate;
    if ('category' in body) store.category = body.category;
    if ('ownerId' in body) store.owner_id = body.ownerId;
    if ('createdAt' in body) store.created_at = now;
    if ('updatedAt' in body) store.updated_at = now;
  
    return store;
  };
  
  