import { api } from "./axios";

// Function to create a new property
export const CreateProperty = async (propertyData) => {
  try {
    const res = await api.post("/property/create", propertyData);
    return res;
  } catch (error) {
    return { error: error.message };
  }
};

export const GetAllProperties = async () => {
  try {
    const res = await api.get("/property");
    return res;
  } catch (error) {
    return { error: error.message };
  }
};

// Function to get a property by ID
export const GetPropertyById = async (propertyId) => {
  try {
    const res = await api.get(`/property/${propertyId}`);
    return res;
  } catch (error) {
    return { error: error.message };
  }
};

// Function to get a property by user ID
export const GetPropertyByUserId = async (userId) => {
  try {
    const res = await api.get(`/property/user/${userId}`);
    return res;
  } catch (error) {
    return { error: error.message };
  }
};

// Function to update a property by ID
export const UpdatePropertyById = async (propertyId, updatedData) => {
  try {
    const res = await api.put(`/property/update/${propertyId}`, updatedData);
    return res;
  } catch (error) {
    return { error: error.message };
  }
};

// Function to update a property by ID
export const UpdatePropertyStatus = async (propertyId, updatedData) => {
  try {
    const res = await api.put(
      `/property/update-status/${propertyId}`,
      updatedData
    );
    return res;
  } catch (error) {
    return { error: error.message };
  }
};

// Function to delete a property by ID
export const DeletePropertyById = async (propertyId) => {
  try {
    const res = await api.delete(`/property/delete/${propertyId}`);
    return res;
  } catch (error) {
    return { error: error.message };
  }
};
