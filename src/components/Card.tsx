import React, {FC, DragEvent, useState, useEffect} from 'react';
import {CloseOutlined} from "@ant-design/icons/lib";
import {useInput} from "../hooks/useInput";
import {Button, Input} from "antd";

interface ICard {
    className?:string;
    content:React.ReactNode;
    time: React.ReactNode;
    draggable?: boolean;
    onDragStart?: (e:DragEvent<HTMLDivElement>)=>void;
    onDragEnter?: (e:DragEvent<HTMLDivElement>)=>void;
    onDrop?: (e:DragEvent<HTMLDivElement>)=>void;
    onDelete?: ()=>void
    onChangeContent?:(content:string)=>void
}

const Card:FC<ICard> = ({className,content,time,draggable=true,onChangeContent=()=>{},onDragStart,onDragEnter,onDelete}) => {
    const {bind:bindTitle,value:titleList,reset:resetTitle,setValue} = useInput(content);
    const [isEditCard,setIsEditCard] = useState(false);
    const onEditCardEx = ()=>{
        setIsEditCard(!isEditCard);
        if(isEditCard){
            onChangeContent(titleList);
        }
    };
    const onKeyDown = (e:any) =>{
        if (e.keyCode == 13) {
            setIsEditCard(!isEditCard);
            onChangeContent(titleList);
        }
    };

    useEffect(()=>{
        setValue(content);
        setIsEditCard(false);
    },[content]);

    return (
        <div draggable={draggable}
             onDragStart={onDragStart}
             onDragEnter={onDragEnter}
             onClick={onEditCardEx}
             className={`card${className ? ` ${className}` : ""}`}>

            {isEditCard ?
                <>
                    <Input.TextArea onKeyDown={onKeyDown} {...bindTitle} className={'dashboard__input'} placeholder="Title list" />
                    <Button onClick={onEditCardEx} type="primary">Update</Button>
                    <Button danger style={{margin:"0 10px"}} onClick={()=>setIsEditCard(!isEditCard)} type="primary">Cancel</Button>
                </>
                :
                <>
                    <div className="card__time">{time}</div>
                    <div className={'card__content'} >{content}</div>
                    <div onClick={onDelete} className="card__close"><CloseOutlined /></div>
                </>
            }

        </div>
    );
};

export default Card;