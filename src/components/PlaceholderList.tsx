import Placeholder from "@/components/Placeholder";
import {ScrollArea} from "@/components/ui/scroll-area";
import {cn} from "@/lib/utils";

type Props = {
    className?: string; // Make className optional
};

export default function PlaceholderList({className}: Props) {
    const data = [
        {
            id: 1,
            label: "First Name"
        },
        {
            id: 2,
            label: "Last Name"
        },
        {
            id: 3,
            label: "Email"
        },
        {
            id: 4,
            label: "Phone"
        },
        {
            id: 5,
            label: "Address"
        },
        {
            id: 6,
            label: "SSN"
        }
    ]
    return (

        <ScrollArea className={cn("rounded-md border w-56 h-72", className)}>
            <h1 className="text-2xl font-bold ml-3 mt-3">Tags</h1>
            {data.map(item => (
                <Placeholder className="my-3 mx-3" key={item.id} label={item.label}/>
            ))}
        </ScrollArea>
    )
}