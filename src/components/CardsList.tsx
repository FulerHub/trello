import React, {DragEvent, FC, useEffect, useState} from 'react';
import Card from "./Card";
import {Button, Input} from "antd";
import {CloseOutlined, SortAscendingOutlined, SortDescendingOutlined} from "@ant-design/icons/lib";
import {useInput} from "../hooks/useInput";
import {getTimeAgoText} from "../helpers/scripts";


interface ICardsList {
    className?:string;
    classNameItem?:string;
    title: string;
    list: any;
    listIndex: number;
    dragging: boolean;
    onDragStartItem: (e:DragEvent<HTMLDivElement>,itemID:number)=>void;
    onDragEnter: (e:DragEvent<HTMLDivElement>)=>void;
    onDragEnterList: (e:DragEvent<HTMLDivElement>)=>void;
    onDragStart: (e:DragEvent<HTMLDivElement>,itemID:number)=>void;
    onDragEnterItem: (e:DragEvent<HTMLDivElement>,itemID:number)=>void;
    currentStyles: (item:any)=>string
    onAddCard: (title:string)=>void;
    onChangeTitle: (title:string)=>void;
    onChangeCardContent: (content:string,cardID:number)=>void;
    onDelete: ()=>void;
    onDeleteCard:(id:number)=>void
    onSortCards: (type:"ASC"|"DESC")=>void
}

const CardsList:FC<ICardsList> = ({list,title, listIndex,onSortCards=()=>{}, dragging,onChangeTitle, onDragStart,onDelete,onDeleteCard,onChangeCardContent, onDragStartItem, onDragEnter=()=>{},onDragEnterList=()=>{},onDragEnterItem,currentStyles,onAddCard}) => {
    const [isAddCard,setIsAddCard] = useState(false);
    const [isEditList,setIsEditList] = useState(false);
    const {bind:bindCard,value:titleCard,reset:resetCard} = useInput('');
    const {bind:bindTitle,value:titleList,reset:resetTitle,setValue:setValueList} = useInput(title);
    const onAddCardEx = ()=>{
        setIsAddCard(!isAddCard);
        if(isAddCard){
            if(titleCard.length){
                onAddCard(titleCard);
                resetCard();
            }

        }
    };
    const onKeyDownList = (e:any) =>{
        if (e.keyCode == 13) {
            if(titleCard.length){
                onAddCard(titleCard);
                resetCard();
            }
        }
    };
    const onEditListEx = ()=>{
        setIsEditList(!isEditList);
    };
    const onKeyDown = (e:any) =>{
        if (e.keyCode == 13) {
            setIsEditList(!isEditList);
            onChangeTitle(titleList);
        }
    };

    useEffect(()=>{
        setValueList(title);
        setIsEditList(false);
        setIsAddCard(false);
    },[title]);

    return (
        <div draggable={true} onDragEnter={onDragEnter} onDragStart={(e) => onDragStart(e, listIndex)} className="card-list">

            <div className="card-list__wrap">
                {isEditList ?
                    <>
                        <Input onKeyDown={onKeyDown} {...bindTitle} className={'dashboard__input'} placeholder="Title list" />
                    </>
                :
                    <>
                        <div className="card-list__sort"><SortAscendingOutlined onClick={()=>onSortCards("DESC")} /><SortDescendingOutlined onClick={()=>onSortCards("ASC")} /></div>
                        <div className="card-list__close" onClick={onDelete}><CloseOutlined /></div>
                        <h2 onClick={onEditListEx}>{title}</h2>
                    </>
                }

               {list.cardsItems.map((item:any, index:number) => (
                   <Card key={index} className={dragging ? currentStyles({indexList:listIndex, indexItem:index}) : ""}
                         content={item.title}
                         time={getTimeAgoText(item.lastModified)}
                         onDelete={()=>onDeleteCard(index)}
                         onDragStart={(e) => onDragStartItem(e, index)}
                         onDragEnter={dragging ? (e) => {onDragEnterItem(e, index)} : undefined}
                         onChangeContent={(content)=>onChangeCardContent(content,index)}
                   />
               ))}

               <div className="card-list__button">
                   {isAddCard && <Input onKeyDown={onKeyDownList} {...bindCard} className={'dashboard__input'} placeholder="Title card" />}
                   <Button onClick={onAddCardEx} type="primary">Add a card</Button>
               </div>
           </div>

        </div>
    );
};

export default CardsList;