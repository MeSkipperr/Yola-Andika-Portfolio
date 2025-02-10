"use client"
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import Image from 'next/image';
import { useLanguage } from '@/context/Language';

const Hero = () => {
    const { language } = useLanguage();    

    const text = ' I Kadek Yola Andika -';

    const firstText = useRef(null);
    const secondText = useRef(null);
    const slider = useRef(null);
    const image = useRef(null);

    let xPercent = 0;
    let direction = -1;

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        // Parallax effect for the slider
        gsap.to(slider.current, {
            scrollTrigger: {
                trigger: document.documentElement,
                scrub: 0.060,
                start: 'top top',
                end: 'bottom top',
                onUpdate: (e) => (direction = e.direction * -1),
            },
            x: '-50%',
        });

        // Parallax effect for the image
        gsap.to(image.current, {
            scrollTrigger: {
                trigger: document.documentElement,
                scrub: 0.3,
                start: 'top top',
                end: 'bottom top',
            },
            y: '60%',
        });
        // Move the buttons upward when scrolling down
        gsap.to('.button-container', {
            scrollTrigger: {
                trigger: document.documentElement,
                start: 'top top',
                end: 'bottom top',
                scrub: 0.060,
            },
            y: '-300%',
        });

        // Animation loop for the text
        requestAnimationFrame(() => animate());
    }, []);

    const animate = () => {
        if (xPercent < -100) {
            xPercent = 0;
        } else if (xPercent > 0) {
            xPercent = -100;
        }
        gsap.set(firstText.current, { xPercent: xPercent });
        gsap.set(secondText.current, { xPercent: xPercent });
        requestAnimationFrame(animate);
        xPercent += 0.060 * direction;
    };

    return (
        <div id='home' className="h-[100dvh] bg-[#ececec] dark:bg-[#101012] w-full relative flex items-end overflow-hidden">
            <Image
                ref={image}
                src="/assets/picture.png"
                className="w-72 mx-auto sm:w-7/12 lg:w-3/12 z-10"
                alt="Profile"
                width={1000}
                height={1000}
            />
            <div
                ref={slider}
                className="absolute h-screen flex justify-center"
            >
                <div className="flex whitespace-nowrap m-auto">
                    <h1
                        ref={firstText}
                        className="slider-Text text-dark dark:text-white text-8xl sm:text-9xl lg:text-[16rem] pr-4"
                    >
                        {text}
                    </h1>
                    <h1
                        ref={secondText}
                        className="slider-Text text-dark dark:text-white text-8xl sm:text-9xl lg:text-[16rem] pr-4 absolute left-full"
                    >
                        {text}
                    </h1>
                </div>
            </div>
            <div className="button-container absolute w-full flex justify-center z-20 mb-20 sm:mb-28 gap-6 sm:gap-10 lg:gap-16">
                <a href="/contact">
                    <button className="btnHero px-7 rounded-md py-2 sm:px-10 sm:py-4 text-lg sm:text-2xl bg-third text-white">
                        {language ? 'Kontak' : 'Contact'}
                    </button>
                </a>
                <a href="#about">
                    <button className="btnHero px-7 rounded-md py-2 sm:px-10 sm:py-4 text-lg sm:text-2xl bg-third text-white">
                        {language ? 'Jelajahi' : 'Explore'}
                    </button>
                </a>
            </div>
        </div>
    );
}

export default Hero;