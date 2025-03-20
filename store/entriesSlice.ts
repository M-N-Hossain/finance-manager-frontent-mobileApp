import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  createEntry as createEntryAPI,
  deleteEntry as deleteEntryAPI,
  getEntries as getEntriesAPI,
  updateEntry as updateEntryAPI,
} from '../api/entries';
import { EntryCreate, EntryState } from '../utils/types';

const initialState: EntryState = {
  entries: [],
  isLoading: false,
  error: null,
};

export const fetchEntries = createAsyncThunk(
  'entries/fetchEntries',
  async (_, { rejectWithValue }) => {
    try {
      return await getEntriesAPI();
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch entries');
    }
  }
);

export const createEntry = createAsyncThunk(
  'entries/createEntry',
  async (entry: EntryCreate, { rejectWithValue }) => {
    try {
      return await createEntryAPI(entry);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create entry');
    }
  }
);

export const updateEntry = createAsyncThunk(
  'entries/updateEntry',
  async ({ id, entry }: { id: string; entry: EntryCreate }, { rejectWithValue }) => {
    try {
      return await updateEntryAPI(id, entry);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update entry');
    }
  }
);

export const deleteEntry = createAsyncThunk(
  'entries/deleteEntry',
  async (id: string, { rejectWithValue }) => {
    try {
      await deleteEntryAPI(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete entry');
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
      .addCase(createEntry.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createEntry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.entries.push(action.payload);
      })
      .addCase(createEntry.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(updateEntry.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateEntry.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.entries.findIndex(entry => entry.id === action.payload.id);
        if (index !== -1) {
          state.entries[index] = action.payload;
        }
      })
      .addCase(updateEntry.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteEntry.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteEntry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.entries = state.entries.filter(entry => entry.id !== action.payload);
      })
      .addCase(deleteEntry.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default entriesSlice.reducer;