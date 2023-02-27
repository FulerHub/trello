import React, {DragEvent, FC, useCallback, useEffect, useMemo, useRef, useState} from 'react'
import CardsList from './CardsList';
import {Button, Input} from "antd";
import { useInput } from '../hooks/useInput';

interface IDashboard {
    data: any
    setData: (prev:any)=>void
    onAddList:(name:string)=>void;
    onAddCard:(listID:number,title:string)=>void;
    onChange?:(data:any)=>void;
    onChangeCard?:(from:any,to:any,item:any)=>void;
    onDeleteList?:(id:number)=>void;
    onDeleteCard?:(listID:number,cardID:number)=>void;
    onChangeTitleList?: (title:string,listID:number)=>void
    onChangeCardContent?: (content:string,listID:number,cardID:number)=>void
    onSortCards: (type:"ASC"|"DESC",listID:number)=>void
}

const Dashboard:FC<IDashboard> = ({data,setData,onAddList,onAddCard,onSortCards=()=>{},onChange=()=>{},onChangeTitleList=()=>{},onChangeCardContent=()=>{},onChangeCard=()=>{},onDeleteList=()=>{},onDeleteCard=()=>{}}) => {
        const [isDragging, setIsDragging] = useState(false);
        const [isDraggingList, setIsDraggingList] = useState(false);

        const dragItem = useRef<any>();
        const dragItemNode = useRef<any>();

        const ListItem = useRef<any>();
        const ListItemNode = useRef<any>();

        const handleDragStartList = (e:DragEvent<HTMLDivElement>, item:any) => {
            e.stopPropagation();

            ListItemNode.current = e.target;
            ListItemNode.current.addEventListener('dragend', handleDragEndList);
            ListItem.current = item;
            setTimeout(() => {
                setIsDraggingList(true);
            },0);
        };

        const handleDragStart = (e:DragEvent<HTMLDivElement>, item:any) => {
            e.stopPropagation();

            dragItemNode.current = e.target;
            dragItemNode.current.addEventListener('dragend', handleDragEnd);
            dragItem.current = item;

            setTimeout(() => {
                setIsDragging(true);
            },0)
        };

        const handleDragEnter = (e:any, targetItem:any) => {
            if(isDraggingList){
                if(targetItem.indexList !== ListItem.current){
                    setData((oldList:any) => {
                        let newList = JSON.parse(JSON.stringify(oldList));
                        let temp = newList[targetItem.indexList];
                        newList[targetItem.indexList] = newList[ListItem.current];
                        newList[ListItem.current] = temp;
                        ListItem.current = targetItem.indexList;
                        onChange(newList);
                        return newList
                    })
                }
            }
            if(isDragging){
                e.stopPropagation();
                if (dragItemNode.current !== e.target) {
                    if(dragItem.current.indexList !== targetItem.indexList || dragItem.current.indexItem !== targetItem.indexItem){
                        setData((oldList:any) => {
                            let newList = JSON.parse(JSON.stringify(oldList));
                            newList[targetItem.indexList].cardsItems.splice(targetItem.indexItem, 0, newList[dragItem.current.indexList].cardsItems.splice(dragItem.current.indexItem,1)[0]);
                            onChangeCard(newList[dragItem.current.indexList],newList[targetItem.indexList],{listID:newList[targetItem.indexList].id,card:targetItem.indexItem});
                            dragItem.current = targetItem;
                            return newList
                        })
                    }
                }
            }
        };
        const handleDragEndList = (e:DragEvent<HTMLDivElement>) => {
            setIsDraggingList(false);
            ListItem.current = null;
            ListItemNode.current.removeEventListener('dragend', handleDragEndList);
            ListItemNode.current = null;
        };
        const handleDragEnd = (e:DragEvent<HTMLDivElement>) => {
            setIsDragging(false);
            dragItem.current = null;
            dragItemNode.current.removeEventListener('dragend', handleDragEnd);
            dragItemNode.current = null;
        };
        const currentStylesList = (id:number) => ListItem.current === id ? "card current" : "card";
        const currentStyles = (item:any) => {
            if (dragItem.current.indexList === item.indexList && dragItem.current.indexItem === item.indexItem) {
                return "card current"
            }
            return "card"
        };
        const [isAddList,setIsAddList] = useState(false);
        const {bind:bindList,value:nameList,reset:resetList} = useInput('')
        const onAddListEx = ()=>{
            setIsAddList(!isAddList);
            if(isAddList){
                onAddList(nameList);
                resetList();
            }
        };
        return (
            <div className="dashboard">
                {data.length > 0 &&
                 data.map((list:any, indexList:number) => (<CardsList key={indexList}
                               title={list.title}
                               dragging={isDragging}
                               listIndex ={indexList}
                               onDelete={()=>onDeleteList(list.id)}
                               onDeleteCard={(id)=>onDeleteCard(list.id,id)}
                               currentStyles={currentStyles}
                               onDragStart={handleDragStartList}
                               onChangeTitle={(title)=>onChangeTitleList(title,list.id)}
                               onChangeCardContent={(content,cardID)=>onChangeCardContent(content,list.id,cardID)}
                               onSortCards={(type:any)=>onSortCards(type,list.id)}
                               // @ts-ignore
                               onDragEnter={isDragging && !list.cardsItems.length || isDraggingList ? (e) => handleDragEnter(e,{indexList, indexItem: 0}) : null}
                               // @ts-ignore
                               onDragEnterItem={isDragging ? (e,id) => {handleDragEnter(e, {indexList, indexItem:id})} : null}
                               onDragStartItem={(e,id) => handleDragStart(e, {indexList, indexItem:id})}
                               onAddCard={(title)=>onAddCard(list.id,title)}
                     list={list}/>
                ))}
                <div className="dashboard__button">
                    {isAddList && <Input {...bindList} className={'dashboard__input'} placeholder="Name list" />}

                    <Button onClick={onAddListEx} type="primary">Add another list</Button>
                </div>
            </div>
        )
}

export default Dashboard;