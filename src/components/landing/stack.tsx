"use client"
import Marquee from 'react-fast-marquee';
import { useMemo } from 'react'; 
import { useLanguage } from '@/context/Language';
import Image from 'next/image';

const stackImages = [
  { src: "/logos/html.svg", alt: 'html', title: 'HTML' },
  { src: "/logos/css.svg", alt: 'css', title: 'CSS' },
  { src: "/logos/js.svg", alt: 'js', title: 'JavaScript' },
  { src: "/logos/php.svg", alt: 'php', title: 'PHP' },
  { src: "/logos/NodeJS.svg", alt: 'nodejs', title: 'Node.js' },
  { src: "/logos/sql.svg", alt: 'sql', title: 'SQL' },
  { src: "/logos/react.svg", alt: 'react', title: 'React' },
  { src: "/logos/tailwind.svg", alt: 'tailwind', title: 'Tailwind CSS' },
  { src: "/logos/mongodb.svg", alt: 'mongodb', title: 'MongoDB' },
  { src: "/logos/nextjs.png", alt: 'next js', title: 'Next Js' },
  { src: "/logos/typescript.png", alt: 'typescript', title: 'Typescript' },
];

const otherImages = [
  { src: "/logos/git.svg", alt: 'Git Logo', title: 'Git' },
  { src: "/logos/powerpoint.svg", alt: 'PowerPoint Logo', title: 'Microsoft PowerPoint' },
  { src: "/logos/word.svg", alt: 'Word Logo', title: 'Microsoft Word' },
  { src: "/logos/excel.svg", alt: 'Excel Logo', title: 'Microsoft Excel' },
  { src: "/logos/mikrotik.png", alt: 'Mikrotik Logo', title: 'Mikrotik' },
  { src: "/logos/cisco.png", alt: 'Cisco Pocket Tracer Logo', title: 'Cisco Pocket Tracer' },
];

const Stack = () => {
  const { language } = useLanguage();    
  

    const stackImagesMemo = useMemo(() => stackImages, []); // Memoize the stack images array
    const otherImagesMemo = useMemo(() => otherImages, []); 
    return ( 
        <div className="flex flex-col px-8 lg:w-3/4 w-full  justify-center">
        <h1 className='text-2xl sm:text-4xl dark:text-white'>Skill</h1>
        <h2 className='text-lg sm:text-3xl dark:text-white'>
          {language ? 'Ini adalah teknologi yang pernah saya gunakan' : "These are the technologies I've worked with"}
        </h2>
        <div className=" flex flex-col w-full  overflow-auto gap-6 mt-8">
          <Marquee autoFill>
            {stackImagesMemo.map((image, index) => (
              <Image
                key={index}
                className='mx-6 sm:h-[100px] h-[50px] w-auto cursor-pointer' 
                loading="lazy" 
                src={image.src} 
                alt={image.alt} 
                title={image.title}
                width={1000}
                height={1000}
              />
            ))}
          </Marquee>
          <h2 className=' text-3xl dark:text-white'>{language ? 'Lainnya' : "Other"}</h2>
          <Marquee direction='right' autoFill>
            {otherImagesMemo.map((image, index) => (
                <Image
                  key={index}
                  className='mx-6 sm:h-[100px] h-[50px] w-auto cursor-pointer' 
                  loading="lazy" 
                  src={image.src} 
                  alt={image.alt} 
                  title={image.title}
                  width={1000}
                  height={1000}
                />
            ))}
          </Marquee>
        </div>
      </div>

     );
}
 
export default Stack;