import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  createEntity as createEntityAPI,
  deleteEntity as deleteEntityAPI,
  getEntities as getEntitiesAPI,
  updateEntity as updateEntityAPI,
} from '../api/entities';
import { EntityCreate, EntityState } from '../utils/types';

const initialState: EntityState = {
  entries: [],
  isLoading: false,
  error: null,
};

export const fetchEntries = createAsyncThunk(
  'entries/fetchEntries',
  async (_, { rejectWithValue }) => {
    try {
      return await getEntitiesAPI();
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch entries');
    }
  }
);

export const createEntity = createAsyncThunk(
  'entries/createEntity',
  async (entity: EntityCreate, { rejectWithValue }) => {
    try {
      return await createEntityAPI(entity);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create entity');
    }
  }
);

export const updateEntity = createAsyncThunk(
  'entries/updateEntity',
  async ({ id, entity }: { id: string; entity: EntityCreate }, { rejectWithValue }) => {
    try {
      return await updateEntityAPI(id, entity);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update entity');
    }
  }
);

export const deleteEntity = createAsyncThunk(
  'entries/deleteEntity',
  async (id: string, { rejectWithValue }) => {
    try {
      await deleteEntityAPI(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete entity');
    }
  }
);

const entriesSlice = createSlice({
  name: 'entries',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEntries.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchEntries.fulfilled, (state, action) => {
        state.isLoading = false;
        state.entries = action.payload;
      })
      .addCase(fetchEntries.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(createEntity.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createEntity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.entries.push(action.payload);
      })
      .addCase(createEntity.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(updateEntity.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateEntity.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.entries.findIndex(entity => entity.id === action.payload.id);
        if (index !== -1) {
          state.entries[index] = action.payload;
        }
      })
      .addCase(updateEntity.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteEntity.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteEntity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.entries = state.entries.filter(entity => entity.id !== action.payload);
      })
      .addCase(deleteEntity.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default entriesSlice.reducer;