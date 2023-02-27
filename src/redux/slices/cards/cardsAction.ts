import {createAsyncThunk} from "@reduxjs/toolkit";
import CardsService from "../../../api/CardsService";

export const asyncGetCardsAction = createAsyncThunk(
    'cards/all',
    async (_, thunkAPI)=>{
        try {
            let response = await CardsService.findAll();
            const cards = response.data.sort((a:any,b:any)=>a.order > b.order ? 1 : -1);
            const cardsListEx = cards.map((item:any)=>{
                const cardsList = item.cardsItems![0]?.cardsList ? JSON.parse(item.cardsItems![0]?.cardsList) : [];
                return {
                    ...item,
                    cardsItems: cardsList
                }
            });
            return cardsListEx;
        } catch (e:any) {
            return thunkAPI.rejectWithValue(e.response?.data?.message)
        }
    }
);

export const asyncCreateCardListAction = createAsyncThunk(
    'cards/createList',
    async (title:string, thunkAPI)=>{
        try {
            let response = await CardsService.createList(title);
            return response.data;
        } catch (e:any) {
            return thunkAPI.rejectWithValue(e.response?.data?.message)
        }
    }
);

export const asyncUpdateListAction = createAsyncThunk(
    'cards/updateList',
    async (list:any, thunkAPI)=>{
        try {
            const {title,listID} = list;
            let response = await CardsService.updateList(listID,title);
            return response.data;
        } catch (e:any) {
            return thunkAPI.rejectWithValue(e.response?.data?.message)
        }
    }
);

export const asyncUpdateCardListOrderAction = createAsyncThunk(
    'cards/updateListOrder',
    async (list:any[], thunkAPI)=>{
        try {
            const orderedList = list.map((item,index)=>{
                return {
                    ...item,
                    order: index+1
                }
            });

            let response = await CardsService.updateListOrder(orderedList);
            const cards = response.data.sort((a:any,b:any)=>a.order > b.order ? 1 : -1);
            const cardsListEx = cards.map((item:any)=>{
                const cardsList = item.cardsItems![0]?.cardsList ? JSON.parse(item.cardsItems![0]?.cardsList) : [];
                return {
                    ...item,
                    cardsItems: cardsList
                }
            });

            return cardsListEx;
        } catch (e:any) {
            return thunkAPI.rejectWithValue(e.response?.data?.message)
        }
    }
);
export const asyncDeleteCardListAction = createAsyncThunk(
    'cards/deleteList',
    async (id:number, thunkAPI)=>{
        try {
            let response = await CardsService.deleteList(id);
            return response.data;
        } catch (e:any) {
            return thunkAPI.rejectWithValue(e.response?.data?.message)
        }
    }
);





export const asyncCreateCardAction = createAsyncThunk(
    'cards/createCard',
    async (card:any, thunkAPI)=>{
        try {
            const {id,title} = card;
            let response = await CardsService.createCard(id,title);
            return response.data;
        } catch (e:any) {
            return thunkAPI.rejectWithValue(e.response?.data?.message)
        }
    }
);


export const asyncUpdateCardAction = createAsyncThunk(
    'cards/updateCard',
    async (card:any, thunkAPI)=>{
        try {
            const {content,listID,cardID} = card;
            let response = await CardsService.updateCard(listID,cardID,content);
            return response.data;
        } catch (e:any) {
            return thunkAPI.rejectWithValue(e.response?.data?.message)
        }
    }
);

export const asyncUpdateCardOrderAction = createAsyncThunk(
    'cards/updateOrder',
    async (cards:any, thunkAPI)=>{
        try {
            const {oldList,newList,currentItem} = cards;
            let response = await CardsService.updateCardOrder(oldList,newList,currentItem);
            return response.data;
        } catch (e:any) {
            return thunkAPI.rejectWithValue(e.response?.data?.message)
        }
    }
);

export const asyncUpdateCardSortAction = createAsyncThunk(
    'cards/updateSort',
    async (cards:any, thunkAPI)=>{
        try {
            const {type,listID} = cards;
            let response = await CardsService.updateCardSort(listID,type);
            return response.data;
        } catch (e:any) {
            return thunkAPI.rejectWithValue(e.response?.data?.message)
        }
    }
);

export const asyncDeleteCardAction = createAsyncThunk(
    'cards/deleteCard',
    async (item:any, thunkAPI)=>{
        try {
            const {listID,cardID} = item;
            let response = await CardsService.deleteCard(listID,cardID);
            return response.data;
        } catch (e:any) {
            return thunkAPI.rejectWithValue(e.response?.data?.message)
        }
    }
);