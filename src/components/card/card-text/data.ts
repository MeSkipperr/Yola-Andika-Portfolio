interface CardInterface {
    title: string;
    text: string;
    url: string;
}

export const applicationData = (language: boolean): CardInterface[] => {
    return [
        // {
        //     title: language ? "Pemendek URL" : "Short URL",
        //     text: language
        //         ? "Aplikasi untuk mempersingkat tautan agar lebih ringkas dan mudah dibagikan."
        //         : "An application to shorten URLs, making them more concise and easier to share.",
        //     url: "/apps/short-url"
        // },
        // {
        //     title: language ? "Bunga Valentine" : "Flower Valentine",
        //     text: language
        //         ? "Aplikasi untuk memilih dan mengirim bunga digital spesial di Hari Valentine."
        //         : "An application to select and send special digital flowers on Valentine's Day.",
        //     url: "/apps/flower"
        // },
        {
            title: language ? "Photobooth Digital" : "Photobooth Digital",
            text: language
                ? "Aplikasi untuk mengambil foto dengan efek khusus dan membagikannya dengan mudah."
                : "An application to capture photos with special effects and share them easily.",
            url: "/apps/photobooth"
        }
        
    ];
};
