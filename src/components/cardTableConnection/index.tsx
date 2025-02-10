"use client";
import Image from "next/image";

interface TabelContent {
    className?: string;
    content: Array<Array<{
        urlPath: string;
        content: TableCell[];
    }>>; // Array 2D berisi objek dengan properti sesuai TableCell
    itemsClassName?: string;
}

interface TableCell {
    text?: string;
    imageUrl?: string;
    bulletList?: boolean;
    itemsPosition?: "start" | "center" | "end";
    justifyPosition?: "start" | "center" | "end";
    className?: string;
}

const CardTableProject: React.FC<TabelContent> = ({ className, content, itemsClassName }) => {
    return (
        <div className={`flex flex-col w-full justify-center ${className || ""}`}>
            {content.map((row, rowIndex) => (
                row.map((cell, cellIndex) => (
                    <a href={cell.urlPath || "#"} key={`${rowIndex}-${cellIndex}`} className="w-full">
                        <div className="flex flex-row justify-between shadow-[0_3px_10px_rgb(0,0,0,0.2)] ">
                            {cell.content.map((cellContent, colIndex) => {
                                const verticalAlignment = {
                                    start: "items-start",
                                    center: "items-center",
                                    end: "items-end",
                                };

                                const horizontalAlignment = {
                                    start: "justify-start",
                                    center: "justify-center",
                                    end: "justify-end",
                                };

                                return (
                                    <div
                                        key={colIndex}
                                        className={`flex-1 flex flex-col p-2 dark:text-white ${horizontalAlignment[cellContent.itemsPosition || "center"]} ${verticalAlignment[cellContent.justifyPosition || "center"]} ${itemsClassName || ""}`}
                                    >
                                        {cellContent.imageUrl ? (
                                            <Image
                                                src={cellContent.imageUrl}
                                                className={`w-full lg:w-60 rounded m-auto sm:w-80 ${cellContent.className}`}
                                                alt={cellContent.text || "Image"}
                                                width={1000}
                                                height={1000}
                                            />
                                        ) : cellContent.text ? (
                                            cellContent.bulletList ? (
                                                <ul className="list-disc pl-5 dark:text-white">
                                                    {cellContent.text.split("\n").map((item, index) => (
                                                        <li key={index} className={`mb-1 ${cellContent.className}`}>
                                                            {item}
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <p className={`mb-1 ${cellContent.className}`}>{cellContent.text}</p>
                                            )
                                        ) : null}
                                    </div>
                                );
                            })}
                        </div>
                    </a>
                ))
            ))}

        </div>
    );
};

export default CardTableProject;
