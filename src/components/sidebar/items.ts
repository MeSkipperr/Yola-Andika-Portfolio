interface SidebarItem {
    content: string;
    path: string;
}

export interface SidebarSection {
    title: string;
    path: string;
    items: SidebarItem[];
}

export const SidebarContent: SidebarSection[] = [
    {
        title:"Components",
        path:"/library/components",
        items:[
            {
                content:"Code Block",
                path:"/library/components/code-block"
            },
        ]
    },
    {
        title:"Functions",
        path:"/library/functions",
        items:[
        ]
    },
    {
        title:"Contexts",
        path:"/library/contexts",
        items:[
            {
                content:"Dark Mode",
                path:"/library/contexts/dark-mode"
            },
        ]
    },
    {
        title:"Hooks",
        path:"/library/hooks",
        items:[
            {
                content:"useCopy",
                path:"/library/hooks/use-copy"
            },
            {
                content:"useIsDevice",
                path:"/library/hooks/use-is-device"
            },
        ]
    },
    {
        title:"Utils",
        path:"/library/utils",
        items:[
            {
                content:"Local Storage",
                path:"/library/utils/local-storage"
            },
            {
                content:"Validator",
                path:"/library/utils/validator"
            },
            {
                content:"Cookies",
                path:"/library/utils/cookies"
            },
        ]
    },
]