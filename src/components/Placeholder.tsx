"use client"
import {DragEvent, useRef} from 'react';
import {Button} from "@/components/ui/button";
import {GripVertical} from "lucide-react";
import {cn} from "@/lib/utils"; // Assuming you're using shadcn/ui's cn utility

type Props = {
    label: string;
    className?: string; // Make className optional
};

export default function Placeholder({label, className}: Props) {
    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleDragStart = (e: DragEvent<HTMLButtonElement>) => {
        e.dataTransfer.setData('text/plain', label);
    };

    return (
        <Button
            ref={buttonRef}
            draggable
            onDragStart={handleDragStart}
            className={cn(
                `cursor-grab 
                w-48 
                whitespace-normal 
                break-words 
                h-auto 
                min-h-[40px] 
                py-2 
                flex 
                items-center 
                justify-between`,
                className // Pass in any additional classNames
            )}
        >
            <span className="flex-grow pr-2">{label}</span>
            <GripVertical className="flex-shrink-0"/>
        </Button>
    );
}