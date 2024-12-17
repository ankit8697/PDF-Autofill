"use client"
import {DragEvent, useRef, useState} from 'react';
import {Button} from "@/components/ui/button";
import {GripVertical} from "lucide-react";

type Props = {
    label: string;
};

export default function Placeholder({label}: Props) {
    const [isDragging, setIsDragging] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleDragStart = (e: DragEvent<HTMLButtonElement>) => {
        e.dataTransfer.setData('text/plain', label);
        setIsDragging(true);
    };

    const handleDragEnd = () => {
        setIsDragging(false);
    };

    return (
        <Button
            ref={buttonRef}
            draggable
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            className={`
                cursor-grab 
                ${isDragging ? 'opacity-50' : ''} 
                w-48 
                whitespace-normal 
                break-words 
                h-auto 
                min-h-[40px] 
                py-2 
                flex 
                items-center 
                justify-between
            `}
        >
            <GripVertical className="flex-shrink-0"/>
            <span className="flex-grow pr-2">{label}</span>
        </Button>
    );
}