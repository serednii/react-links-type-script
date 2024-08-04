import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DataState {
    dataMain:  any;
    listLinkData: any;
    sluice: any;
    idArticle: string;
    update: boolean;
}

const initialState: DataState = {
    dataMain: {},
    listLinkData: {},
    sluice: {},
    idArticle: '',
    update: false,
};

const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setDataMain(state, action: PayloadAction<any>) {
            state.dataMain = action.payload;
        },
        setListLinkData(state, action: PayloadAction<any>) {
            state.listLinkData = action.payload;
        },
        setSluice(state, action: PayloadAction<any>) {
            state.sluice = action.payload;
        },
        setIdArticle(state, action: PayloadAction<string>) {
            state.idArticle = action.payload;
        },
        setUpdate(state) {
            state.update = !state.update;
        },
    },
});

export const {
    setDataMain,
    setListLinkData,
    setSluice,
    setIdArticle,
    setUpdate,
} = dataSlice.actions;

export default dataSlice.reducer;
