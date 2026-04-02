import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RenderProps } from './types'


const initialState: RenderProps= {
    modelId: '',
    wsUrl: '',
    height: undefined,
}

// add actions  
export const {name, reducer} = createSlice({
    name: 'streamRender',
    initialState,
    reducers:{
        fetchWsUrlRequest(state, _action: PayloadAction<{ wsUrl: string }>){
            
        },
        fetchWsUrlSuccess(state, action: PayloadAction<{ wsUrl: string }>){
            state.wsUrl = action.payload.wsUrl
        }
    }
})