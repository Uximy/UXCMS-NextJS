'use client';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


// Асинхронный action для получения данных о текущем онлайне игроков
export const fetchPlayersOnline = createAsyncThunk('players/fetchPlayersOnline', async () => {
  const response = await axios.post('/api/servers/', 
    {
      headers: {
        'Content-Type': 'application/json',
      }
    }
  );
  const totalPlayers = response.data.reduce((total, item) => total + item.players, 0);
  return totalPlayers;
});

const playerSlice = createSlice({
  name: 'players',
  initialState: { online: 0, status: 'idle' },
  extraReducers: builder => {
    builder
      .addCase(fetchPlayersOnline.pending, state => { state.status = 'loading'; })
      .addCase(fetchPlayersOnline.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.online = action.payload;
      })
      .addCase(fetchPlayersOnline.rejected, state => { state.status = 'failed'; });
  },
});

export default playerSlice.reducer;
