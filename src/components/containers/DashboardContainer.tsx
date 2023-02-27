import React, {FC, useEffect, useRef, useState} from 'react';
import {useDispatchEx, useSelectorEx} from "../../hooks/redux";
import {
    asyncCreateCardAction,
    asyncCreateCardListAction, asyncDeleteCardAction, asyncDeleteCardListAction,
    asyncGetCardsAction, asyncUpdateCardAction,
    asyncUpdateCardListOrderAction, asyncUpdateCardOrderAction, asyncUpdateCardSortAction, asyncUpdateListAction
} from "../../redux/slices/cards/cardsAction";
import Dashboard from "../Dashboard";

const DashboardContainer:FC = () => {
    const refTimer = useRef<any>(null);
    const dispatch = useDispatchEx();
    const onAddHandle = (name:string)=>{
        dispatch(asyncCreateCardListAction(name));
    };
    const onAddCardHandle = (id:number,title:string)=>{
        dispatch(asyncCreateCardAction({id,title}));
    };

    const onChangeList = (data:any)=>{
        if(refTimer.current){
            clearTimeout(refTimer.current)
        }
        refTimer.current = setTimeout(()=>{
            dispatch(asyncUpdateCardListOrderAction(data));
        },2000)
    };
    const onChangeCard = (dataFrom:any,dataTo:any,item:any)=>{
        dispatch(asyncUpdateCardOrderAction({
            oldList:dataFrom,
            newList:dataTo,
            currentItem:item
        }))
    };

    const onChangeTitleList = (title:string,listID:number)=>{
        dispatch(asyncUpdateListAction({title,listID}))
    };

    const onChangeContentCard = (content:string,listID:number,cardID:number)=>{
       dispatch(asyncUpdateCardAction({content,listID,cardID}))
    };

    const onSortCards = (type:"DESC"|"ASC",listID:number)=>{
        dispatch(asyncUpdateCardSortAction({type,listID}))
    };

    const onDeleteHandle = (id:number)=>{
        dispatch(asyncDeleteCardListAction(id))
    };

    const onDeleteCardHandle = (listID:number,cardID:number)=>{
        dispatch(asyncDeleteCardAction({
            listID,
            cardID
        }))
    };

    useEffect(()=>{
        dispatch(asyncGetCardsAction());
    },[]);

    const [data, setData] = useState<any[]>([]);
    const {cardsList} = useSelectorEx(state => state.cards);

    useEffect(() => {
        setData(cardsList);
    }, [cardsList]);

    return (<Dashboard data={data}
                       setData={setData}
                       onAddList={onAddHandle}
                       onDeleteCard={onDeleteCardHandle}
                       onDeleteList={onDeleteHandle}
                       onChange={onChangeList}
                       onChangeCard={onChangeCard}
                       onAddCard={onAddCardHandle}
                       onChangeTitleList={onChangeTitleList}
                       onChangeCardContent={onChangeContentCard}
                       onSortCards={onSortCards}
    />);
};

export default DashboardContainer;