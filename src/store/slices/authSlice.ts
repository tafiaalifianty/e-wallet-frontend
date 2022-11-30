import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axiosInstance from '../../api/axios'
import User from '../../types/User'

interface AuthState {
  user?: User
  loading: boolean
  loginLoading: boolean
  error: string
}

const initialState: AuthState = {
  user: undefined,
  loading: true,
  loginLoading: true,
  error: '',
}

export const login = createAsyncThunk('profile/login', async (_, thunkAPI) => {
  const loginResponse = await axiosInstance.post('/login', {
    email: process.env.REACT_APP_DEFAULT_EMAIL,
    password: process.env.REACT_APP_DEFAULT_PASSWORD,
  })
  localStorage.setItem('auth-token', loginResponse.data.data.id_token)

  thunkAPI.dispatch(getProfile())
})

export const getProfile = createAsyncThunk('profile/getProfile', async (_, thunkAPI) => {
  const getProfileResponse = await axiosInstance.get('/profiles')

  return getProfileResponse.data.data as User
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.loading = false
      state.user = action.payload
    })
    builder.addCase(getProfile.pending, (state) => {
      state.loading = true
      state.error = ''
    })
    builder.addCase(getProfile.rejected, (state) => {
      state.loading = false
      state.error = 'Failed to get profile data. Please try again later'
    })
    builder.addCase(login.fulfilled, (state) => {
      state.loginLoading = false
      state.error = ''
    })
    builder.addCase(login.pending, (state) => {
      state.loginLoading = true
      state.error = ''
    })
    builder.addCase(login.rejected, (state) => {
      state.loginLoading = false
      state.error = 'Failed to Log in. Please try again later'
    })
  },
})

export default authSlice.reducer
