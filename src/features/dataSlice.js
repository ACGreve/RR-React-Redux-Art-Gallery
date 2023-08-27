import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    objectId: 10245,
    apiData: {}
}

export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        //different functions for the buttons
        //sets the states and links to API
        setData: (state, action) => {
            return {...state, apiData : action.payload}
        },
        //sets to inital state of 10245 and blank API
        clearData: () => {
            return initialState
        },
        //changes state to custom input #
        inputId: (state, action) => {
            return { ...state, objectId: action.payload }
        },
        //increments current state by 1
        incrementId: (state) => {
            return { ...state, objectId: state.objectId + 1 }
        },
        //decrements current state by 1
        decrementId: (state) => {
            return { ...state, objectId: state.objectId - 1 }
        }
    }
})

export const { setData, clearData, incrementId, decrementId, inputId } = dataSlice.actions

export const fetchData = () => {
    //function linking to API and pushing to setData to be set as state
    const fetchDataThunk = async (dispatch, getState) => {
        let state = getState()
        const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${state.data.objectId}`)
        const rData = await response.json()
        dispatch(setData(rData))
    }
    return fetchDataThunk
}

export default dataSlice.reducer