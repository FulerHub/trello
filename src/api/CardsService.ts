import instance from "./api";
import {AxiosResponse} from 'axios';


export default class CardsService {
    //list
    static async findAll(): Promise<AxiosResponse<any>> {
        return instance.get<any[]>('cards')
    }

    static async createList(title:string): Promise<AxiosResponse<any>> {
        return instance.post<any>(`cards/list`,{title})
    }

    static async updateList(listID:number,title:string): Promise<AxiosResponse<any>> {
        return instance.put<any>(`cards/list/${listID}`,{title})
    }
    static async updateCardSort(listID:number,type:string): Promise<AxiosResponse<any>> {
        return instance.put<any>(`cards/list/${listID}/sort`,{type})
    }

    static async updateListOrder(list:any[]): Promise<AxiosResponse<any>> {
        return instance.patch<any>(`cards/listOrder`,{list})
    }

    static async deleteList(listID:number): Promise<AxiosResponse<any>> {
        return instance.delete<any>(`cards/list/${listID}`)
    }

    // card
    static async createCard(listID:number,title:string): Promise<AxiosResponse<any>> {
        return instance.post<any>(`cards/card/${listID}`,{title})
    }

    static async updateCard(listID:number,cardID:number,content:string): Promise<AxiosResponse<any>> {
        return instance.put<any>(`cards/card/${listID}`,{content,cardID})
    }

    static async updateCardOrder(oldList:any,newList:any,currentItem:any): Promise<AxiosResponse<any>> {
        return instance.patch<any>(`cards/cardOrder`,{oldList,newList,currentItem})
    }
    static async deleteCard(listID:number,cardID:number): Promise<AxiosResponse<any>> {
        return instance.delete<any>(`cards/card/${listID}/${cardID}`,)
    }
}