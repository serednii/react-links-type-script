import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export interface UIState {
    isLoading: boolean;
    isButtonPlus: boolean;
    isChangeLinks: boolean;
    isAddCategoryOther: boolean;
    isModal: boolean;
    openAddCategory: boolean;
    error: string;
    info: string;
}

const initialState: UIState = {
    isLoading: false,
    isButtonPlus: false,
    isChangeLinks: false,
    isAddCategoryOther: false,
    isModal: false,
    openAddCategory: false,
    error: '',
    info: '',
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload;
        },
        setButtonPlus(state, action: PayloadAction<boolean>) {
            state.isButtonPlus = action.payload;
        },
        setChangeLinks(state, action: PayloadAction<boolean>) {
            state.isChangeLinks = action.payload;
        },
        setAddCategoryOther(state, action: PayloadAction<boolean>) {
            state.isAddCategoryOther = action.payload;
        },
        setModal(state, action: PayloadAction<boolean>) {
            state.isModal = action.payload;
        },
        setOpenAddCategory(state, action: PayloadAction<boolean>) {
            state.openAddCategory = action.payload;
        },
        setError(state, action: PayloadAction<string>) {
            state.error = action.payload;
        },
        setInfo(state, action: PayloadAction<string>) {
            state.info = action.payload;
        },
    },
});

export const {
    setLoading,
    setButtonPlus,
    setChangeLinks,
    setAddCategoryOther,
    setModal,
    setOpenAddCategory,
    setError,
    setInfo,
} = uiSlice.actions;

export default uiSlice.reducer;
