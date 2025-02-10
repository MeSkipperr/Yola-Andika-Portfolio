// components/CardProject.tsx
import Image from 'next/image'

interface CardProjectProps {
    image?: string | null;
    text?: string;
    urlPath: string;
    title: string;
    list: string[] | string;
}

const CardProject: React.FC<CardProjectProps> = ({ image, text, urlPath, title, list }) => {
    const listArray: string[] = typeof list === "string" ? list.split("\n") : (list as string[]);

    return (
        <div
            className="rounded w-3/4 sm:w-80   lg:w-60 m-auto bg-white dark:bg-darkBg p-4 pt-4 relative shadow-[0_3px_10px_rgb(0,0,0,0.2)] flex justify-center items-center flex-col gap-4"
        >
            <a href={urlPath}>
                <div className="absolute inset-0 transition-all opacity-0 hover:opacity-100 hover:bg-[#ecececcc] dark:hover:bg-transDark dark:text-white text-base cursor-pointer flex justify-center items-center flex-col">
                    <h3 className="font-bold text-xl lg:text-3xl">{title}</h3>
                    (Click to Detail)
                </div>
            </a>

            {/* Gambar atau Teks jika image null */}
            <div className="aspect-square w-full flex   justify-center items-center  rounded">
                {image ? (
                    <Image
                        src={image}
                        className="w-full rounded "
                        alt={title}
                        width={1000}
                        height={1000}
                    />
                ) : (
                    <span className="text-center text-2xl font-bold dark:text-white  break-words   sm:w-80   lg:w-60 ">
                        {text || "No Image Available"}
                    </span>
                )}
            </div>

            {/* List Teknologi */}
            <div className="w-full flex justify-start items-start gap-1 lg:gap-2">
                {listArray.map((item, index) => (
                    <span
                        key={index}
                        className="px-2 py-2 bg-third rounded-xl text-white font-semibold text-xs lg:text-sm"
                    >
                        {item}
                    </span>
                ))}
            </div>

            {/* Judul */}
            <h3 className="place-content-start w-full font-bold text-xl lg:text-2xl dark:text-white">{title}</h3>
        </div>
    );
};

export default CardProject;
