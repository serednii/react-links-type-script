import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DataState {

    // idArticle: string;//
    updateListLink: boolean;//
    updateDataMain: boolean;//
}

const initialState: DataState = {

    // idArticle: '',//
    updateListLink: false,
    updateDataMain: false,
};

const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        // setIdArticle(state, action: PayloadAction<string>) {
        //     state.idArticle = action.payload;
        // },
        toggleUpdateListLink(state) {//
            state.updateListLink = !state.updateListLink;
        },
        toggleUpdateDataMain(state) {//
            state.updateDataMain = !state.updateDataMain;
        },
    },
});

export const {
    // setIdArticle,
    toggleUpdateListLink,
    toggleUpdateDataMain,
} = dataSlice.actions;

export default dataSlice.reducer;
