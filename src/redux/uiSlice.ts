import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export interface UIState {
    isLoading: boolean;//
    isLoadingMenu: boolean;
    isButtonPlus: boolean;//
    isChangeLinks: boolean;//
    isAddCategoryOther: boolean;//
    isModal: boolean;//
    isOpenAddCategory: boolean;//
    error: string;//
    info: string;//
}

const initialState: UIState = {
    isLoading: false,
    isLoadingMenu: false,
    isButtonPlus: false,
    isChangeLinks: false,
    isAddCategoryOther: false,
    isModal: false,
    isOpenAddCategory: false,
    error: '',
    info: '',
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setLoading(state, action: PayloadAction<boolean>) {//
            state.isLoading = action.payload;
        },
        setLoadingMenu(state, action: PayloadAction<boolean>){
            state.isLoadingMenu = action.payload
        },
        setButtonPlus(state, action: PayloadAction<boolean>) {//
            state.isButtonPlus = action.payload;
        },
        setChangeLinks(state, action: PayloadAction<boolean>) {//
            state.isChangeLinks = action.payload;
        },
        setAddCategoryOther(state, action: PayloadAction<boolean>) {
            state.isAddCategoryOther = action.payload;
        },
        setModal(state, action: PayloadAction<boolean>) {
            state.isModal = action.payload;
        },
        setOpenAddCategory(state, action: PayloadAction<boolean>) {
            state.isOpenAddCategory = action.payload;
        },
        setError(state, action: PayloadAction<string>) {//
            state.error = action.payload;
        },
        setInfo(state, action: PayloadAction<string>) {//
            state.info = action.payload;
        },
    },
});

export const {
    setLoading,
    setLoadingMenu,
    setButtonPlus,
    setChangeLinks,
    setAddCategoryOther,
    setModal,
    setOpenAddCategory,
    setError,
    setInfo,
} = uiSlice.actions;

export default uiSlice.reducer;
