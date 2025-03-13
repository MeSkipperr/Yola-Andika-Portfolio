type FilterType = {
    title: string;
    value: string;
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

export type LayoutType = {
    content : number,
    layout : {
        parent:string;
        child:string;
    }
}
export const LAYOUT : LayoutType[] = [
    {
        content:1,
        layout:{
            parent:"grid ",
            child:""
        },
    },
    {
        content:2,
        layout:{
            parent:"grid grid-cols-2",
            child:""
        },
    },
    {
        content:4,
        layout:{
            parent:"grid grid-cols-2",
            child:""
        },
    },
    {
        content:6,
        layout:{
            parent:"grid grid-cols-2",
            child:""
        },
    },
    {
        content:8,
        layout:{
            parent:"grid  grid-cols-2",
            child:""
        },
    },
    {
        content:3,
        layout:{
            parent:"grid grid-cols-2 grid-rows-2 ",
            child:"col-span-2"
        },
    },
    {
        content:3,
        layout:{
            parent:" grid grid-cols-1",
            child:""
        },
    },
    {
        content:4,
        layout:{
            parent:" grid grid-cols-1",
            child:""
        },
    },
]

export const BORDER_COLOR : string[] = [
    "#ffffff",
    "#B7B1F2",
    "#FDB7EA",
    "#FFDCCC",
    "#f991cc",
    "#ffdafc",
]

export const TEXT_COLOR : string[] = [
    "#000",
    "#ffffff",
    "#B7B1F2",
    "#FDB7EA",
    "#FFDCCC",
    "#f991cc",
    "#ffdafc",
]