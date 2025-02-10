"use client";

import { useEffect, useState, ReactNode } from "react";
import { motion, Variants } from "framer-motion";
import { text, curve, translate } from "./anim.js";
import "./transition.css";
import { useCurrentRouteName } from "./useCurrentRouteName";

interface CurveProps {
    children: ReactNode;
}

const Curve = ({ children }: CurveProps) => {
    const [isClient, setIsClient] = useState(false);
    const [dimensions, setDimensions] = useState<{
        width: number | null;
        height: number | null;
    }>({
        width: null,
        height: null,
    });

    useEffect(() => {
        setIsClient(true); // Menandakan bahwa komponen telah dirender di klien
        function resize() {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }
        resize();
        window.addEventListener("resize", resize);
        return () => {
            window.removeEventListener("resize", resize);
        };
    }, []);

    const currentRoute = useCurrentRouteName();

    if (!isClient || !currentRoute) return null; 

    return (
        <div className="page curve z-10" style={{ backgroundColor: "#000" }}>
            <div
                style={{ opacity: dimensions.width == null ? 1 : 0 }}
                className="background"
            />
            <motion.p className="route" {...anim(text)}>
                {currentRoute}
            </motion.p>
            {dimensions.width != null && (
                <SVG height={dimensions.height} width={dimensions.width} />
            )}
            {children}
        </div>
    );
};

interface SVGProps {
    height: number | null;
    width: number | null;
}

const SVG = ({ height, width }: SVGProps) => {
    if (height === null || width === null) {
        return null;
    }

    const initialPath = `
        M0 300 
        Q${width / 2} 0 ${width} 300
        L${width} ${height + 300}
        Q${width / 2} ${height + 600} 0 ${height + 300}
        L0 0
    `;

    const targetPath = `
        M0 300
        Q${width / 2} 0 ${width} 300
        L${width} ${height}
        Q${width / 2} ${height} 0 ${height}
        L0 0
    `;

    return (
        <motion.svg className="svg-class z-[100]" {...anim(translate)}>
            <motion.path
                className="z-[102]"
                {...anim(curve(initialPath, targetPath))}
            />
        </motion.svg>
    );
};

const anim = (variants: Variants) => ({
    variants,
    initial: "initial",
    animate: "enter",
    exit: "exit",
});

export default Curve;
