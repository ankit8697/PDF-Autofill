import PdfContainer from "@/components/NoSSRComponent";
import PlaceholderList from "@/components/PlaceholderList";

export default function Home() {
    return (
        <div className="flex flex-row gap-8 mb-5">
            <PlaceholderList className="mt-5 ml-10 fixed"/>
            <PdfContainer className="mt-5"/>
        </div>
    );
}
