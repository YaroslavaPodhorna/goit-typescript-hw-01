import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://connections-api.goit.global/";
export const fetchContacts = createAsyncThunk(
  "contacts/fetchAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;

      const response = await axios.get("/contacts");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
//POST

export const addContact = createAsyncThunk(
  "contacts/addContact",
  async (contact, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;

    if (!token) return thunkAPI.rejectWithValue("No token");

    axios.defaults.headers.common.Authorization = `Bearer ${token}`;

    try {
      const response = await axios.post("/contacts", contact);
      return response.data;
    } catch (error) {
      console.error("Add contact error:", error.response);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

//DELETE
export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (contactId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;

      const response = await axios.delete(`/contacts/${contactId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const updateContact = createAsyncThunk(
  "contacts/updateContact",
  async ({ id, name, number }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;

      const response = await axios.patch(`/contacts/${id}`, {
        name,
        number,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);