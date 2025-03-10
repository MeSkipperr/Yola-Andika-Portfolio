type FilterType = {
    title: string;
    value: string
}
export const FILTER: FilterType[] = [
    {
        title: "Normal",
        value: "none",
    },
    {
        title: "Black & White",
        value: "grayscale(100%)",
    },
    {
        title: "Sepia",
        value: "sepia(100%)",
    },
    {
        title: "Blur",
        value: "blur(5px)",
    },
    {
        title: "Brightness",
        value: "brightness(150%)",
    },
    {
        title: "Contrast",
        value: "contrast(200%)",
    },
    {
        title: "Invert",
        value: "invert(100%)",
    },
    {
        title: "Saturate",
        value: "saturate(200%)",
    },
    {
        title: "Soft Pink",
        value: "hue-rotate(320deg) saturate(150%) brightness(110%)",
    },
];

type LayoutType = {
    content : number,
    layout : string;
}
export const LAYOUT : LayoutType[] = [
    {
        content:4,
        layout:"grid grid-cols-2"
    }
]

type BorderColor = {
        name:string;
        hexCode:string;
    }

export const BORDER_COLOR : BorderColor[] = [
    {
        name:"White",
        hexCode:"#ffffff"
    },
    {
        name:"White",
        hexCode:"#ffffff"
    },
]