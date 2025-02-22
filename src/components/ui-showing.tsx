"use client"
const UIShowing = ({ children }: { children: React.ReactNode })  => {
    return ( 
        <div className="w-full p-2 bg-slate-100 dark:bg-gray-900">
            {children}
        </div>
    );
}

export default UIShowing;