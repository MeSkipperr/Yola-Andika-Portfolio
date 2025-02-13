"use client"

const TextCard = () => {
    return ( 
        <div className=" flex justify-center items-start flex-col w-full shadow-[0_3px_10px_rgb(0,0,0,0.2)] dark:shadow-neutral-900 px-4 py-2 rounded-md my-4">
            <p className="text-xl dark:text-softGray">Project 1</p>
            <span className="border w-full my-1 border-softGray"></span>
            <p className="w-full text-justify line-clamp-2 dark:text-softGray">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <ul className="w-full flex  py-4 dark:text-softGray">
                <li className="hover:underline cursor-pointer">Details</li>
                <li className="h-full border-softGray border mx-4"></li>
                <li className="hover:underline cursor-pointer">Try Now</li>
            </ul>   
        </div>
    );
}

export default TextCard;