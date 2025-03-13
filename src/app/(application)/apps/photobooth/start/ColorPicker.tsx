"use client";
import { useState, useRef } from "react";
import { IoIosColorPalette } from "react-icons/io";

const ColorPicker = ({ setColorOutline }: { setColorOutline: (color: string) => void }) => {
    const [color, setColor] = useState("#ffffff");
    const colorInputRef = useRef<HTMLInputElement>(null);

    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedColor = e.target.value;
        setColor(selectedColor);
        setColorOutline(selectedColor);
    };

    const handleClick = () => {
        if (colorInputRef.current) {
            colorInputRef.current.click(); 
        }
    };

    return (
        <li
            key="Custom Color"
            className="relative h-full aspect-square rounded-full border cursor-pointer flex items-center justify-center"
            style={{ backgroundColor: color }}
            onClick={handleClick} 
        >
            <IoIosColorPalette className="text-xl text-black-70" />
            
            <input
                ref={colorInputRef}
                type="color"
                value={color}
                onChange={handleColorChange}
                className="hidden" 
            />
        </li>
    );
};

export default ColorPicker;
