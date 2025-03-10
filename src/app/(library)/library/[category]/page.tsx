"use client"
import CodeBlock from "@/components/code-block";
import { useParams } from "next/navigation";
import { FaArrowRight } from "react-icons/fa6";
import { SidebarContent } from "@/components/sidebar/items";

const LibraryCategory = () => {
    const params = useParams();
    const category = params.category as string;

    const categoryContent = SidebarContent.find(section => section.path === `/library/${category}`);
    console.log(categoryContent)
    return ( 
        <div className="min-h-[80dvh] w-full px-4 py-6 space-y-4 dark:text-white">
            <h1 className="text-4xl capitalize">{category}</h1>
            <code>{category}/</code>    
            <CodeBlock content={
                [
                    {
                        code:`import {} from '@yola-andika/${category}'`,
                        language:"typescript"
                    }
                ]
            }/>
            <div className="w-full border"></div>
            <ul className="list-disc">
                {categoryContent?.items.map((data,index) => (
                    <li key={"TypeContent_"+index} className="underline  ">
                        <code className="flex gap-4 items-center">
                            {data.content}
                            <FaArrowRight />
                            {data.path}
                        </code>
                    </li>
                ))}
            </ul>
        </div>

    );
}

export default LibraryCategory;