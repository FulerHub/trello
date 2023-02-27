import {createSlice} from "@reduxjs/toolkit";
import {PayloadAction} from "@reduxjs/toolkit/dist/createAction";

import {message} from "antd";
import {
    asyncCreateCardAction,
    asyncCreateCardListAction, asyncDeleteCardAction,
    asyncDeleteCardListAction,
    asyncGetCardsAction, asyncUpdateCardAction,
    asyncUpdateCardListOrderAction, asyncUpdateCardOrderAction, asyncUpdateCardSortAction, asyncUpdateListAction
} from "./cardsAction";


interface cardsState {
    cardsList: any[];
    isLoading: boolean;
    error: string
}

const initialState: cardsState = {
    cardsList: [],
    isLoading: false,
    error: ''
};


const cardsSlice = createSlice({
    name:'cardsSlice',
    initialState,
    reducers:{
        resetCards(state){
            state = initialState;
        },
/*        sortCards(state,action){
            state.cardsList = state.cardsList.map(item=>{
                if(item.id === action.payload.listID){
                    return {
                        ...item,
                        cardsItems: item.cardsItems.sort((a:any,b:any)=>{
                            return action.payload.type === "DESC" ?  a.lastModified - b.lastModified : b.lastModified - a.lastModified
                        })
                    }
                }
                return item;
            });
        }*/
    },
    extraReducers: {
        [asyncGetCardsAction.fulfilled.type]: (state, action: PayloadAction<any>) => {
            state.isLoading = false;
            state.error = '';
            state.cardsList =action.payload;
            message.success('Cards received');
        },
        [asyncGetCardsAction.pending.type]: (state) => {
            state.isLoading = true;
        },
        [asyncGetCardsAction.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload
        },

        [asyncCreateCardListAction.fulfilled.type]: (state, action: PayloadAction<any>) => {
            state.isLoading = false;
            state.error = '';
            state.cardsList.push(action.payload);
            message.success('Card list created');
        },
        [asyncCreateCardListAction.pending.type]: (state) => {
            state.isLoading = true;
        },
        [asyncCreateCardListAction.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
            message.error(action.payload);
        },


        [asyncUpdateCardListOrderAction.fulfilled.type]: (state, action: PayloadAction<any>) => {
            state.isLoading = false;
            state.error = '';
            state.cardsList =action.payload;
            message.success('Card list order updated');
        },
        [asyncUpdateCardListOrderAction.pending.type]: (state) => {
            state.isLoading = true;
        },
        [asyncUpdateCardListOrderAction.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload
        },

        [asyncUpdateListAction.fulfilled.type]: (state, action: PayloadAction<any>) => {
            state.isLoading = false;
            state.error = '';
            state.cardsList = state.cardsList.map(item=>{
                if(item.id === action.payload.id){
                    return {
                        ...item,
                        title: action.payload.title
                    }
                }
                return item
            })
            message.success('Card list updated');
        },
        [asyncUpdateListAction.pending.type]: (state) => {
            state.isLoading = true;
        },
        [asyncUpdateListAction.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload
        },


        [asyncDeleteCardListAction.fulfilled.type]: (state, action: PayloadAction<any>) => {
            state.isLoading = false;
            state.error = '';
            state.cardsList = state.cardsList.filter(item=>item.id !== action.payload.id);
            message.success('Card list deleted');
        },
        [asyncDeleteCardListAction.pending.type]: (state) => {
            state.isLoading = true;
        },
        [asyncDeleteCardListAction.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
            message.error(action.payload);
        },


        [asyncCreateCardAction.fulfilled.type]: (state, action: PayloadAction<any>) => {
            state.isLoading = false;
            state.error = '';
            state.cardsList = state.cardsList.map(item=>{
                if(item.id === action.payload.listID){
                    return {
                        ...item,
                        cardsItems: [
                            ...item.cardsItems,
                            action.payload.card
                        ]
                    }
                }
                return item
            });
            message.success('Card created');
        },
        [asyncCreateCardAction.pending.type]: (state) => {
            state.isLoading = true;
        },
        [asyncCreateCardAction.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
            message.error(action.payload);
        },


        [asyncUpdateCardOrderAction.fulfilled.type]: (state, action: PayloadAction<any>) => {
            state.isLoading = false;
            state.error = '';
            state.cardsList = state.cardsList.map(item=>{
                if(item.id === action.payload.oldList?.listID){
                    return {
                        ...item,
                        cardsItems: JSON.parse(action.payload.oldList?.cardsList)
                    }
                }
                if(item.id === action.payload.newList?.listID){
                    return {
                        ...item,
                        cardsItems: JSON.parse(action.payload.newList?.cardsList)
                    }
                }
                return item
            })
            message.success('Cards order updated');
        },
        [asyncUpdateCardOrderAction.pending.type]: (state) => {
            state.isLoading = true;
        },
        [asyncUpdateCardOrderAction.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
            message.error(action.payload);
        },


        [asyncUpdateCardSortAction.fulfilled.type]: (state, action: PayloadAction<any>) => {
            state.isLoading = false;
            state.error = '';
            state.cardsList = state.cardsList.map(item=>{
                if(item.id === action.payload.listID){
                    return {
                        ...item,
                        cardsItems: JSON.parse(action.payload.cardsList)
                    }
                }
                return item;
            });
        },
        [asyncUpdateCardSortAction.pending.type]: (state) => {
            state.isLoading = true;
        },
        [asyncUpdateCardSortAction.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
            message.error(action.payload);
        },



        [asyncUpdateCardAction.fulfilled.type]: (state, action: PayloadAction<any>) => {
            state.isLoading = false;
            state.error = '';
            state.cardsList = state.cardsList.map(item=>{
                if(item.id === action.payload.listID){
                    return {
                        ...item,
                        cardsItems: item.cardsItems.map((card:any,index:any)=>{
                            if(index === action.payload.cardID){
                                return action.payload.card
                            }
                            return card
                        })
                    }
                }
                return item
            })
            message.success('Card list updated');
        },
        [asyncUpdateCardAction.pending.type]: (state) => {
            state.isLoading = true;
        },
        [asyncUpdateCardAction.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload
        },

        [asyncDeleteCardAction.fulfilled.type]: (state, action: PayloadAction<any>) => {
            state.isLoading = false;
            state.error = '';
            state.cardsList = state.cardsList.map(item=>{
                if(item.id === action.payload.listID){
                    return {
                        ...item,
                        cardsItems: JSON.parse(action.payload.cardsList)
                    }
                }
                return item
            })
            message.success('Cards order deleted');
        },
        [asyncDeleteCardAction.pending.type]: (state) => {
            state.isLoading = true;
        },
        [asyncDeleteCardAction.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
            message.error(action.payload);
        },
    }
});

export const {} = cardsSlice.actions;
export default cardsSlice.reducer;