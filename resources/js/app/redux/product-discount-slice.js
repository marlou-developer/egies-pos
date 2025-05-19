import { createSlice } from '@reduxjs/toolkit'

export const finalRateSlice = createSlice({
  name: 'final_rate',
  initialState: {
    applicant: {},
    finalRate:{
      guideqss:[]
    }
  },
  reducers: {
    setApplicant: (state, action) => {
      state.applicant = action.payload
    },
    setFinalRate: (state, action) => {
      state.finalRate = action.payload
    }
  },
})
export const { setApplicant,setFinalRate } = finalRateSlice.actions

export default finalRateSlice.reducer
