"use client";

import { usePathname, useRouter, useParams } from "next/navigation";
import {  getSpecificConnectionByPath } from "@/components/cardTableConnection/connectionData"
import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "@/context/Language";
import Image from "next/image";
import ConnectionList from "@/components/landing/connection/connectionList";


const ProjectPage = () => {
  const { language } = useLanguage();
  const router = useRouter();
  const pathName = usePathname();
  const pageData = getSpecificConnectionByPath(pathName, language);

  const { category } = useParams();

  const [activeTab, setActiveTab] = useState(0);

  const listCategory = useMemo(() => ["website", "network", "experience"], []);

  useEffect(() => {
    // Pastikan category berupa string
    const categoryString = Array.isArray(category) ? category[0] : category || "website";

    // Cek apakah category ada di dalam listCategory
    const index = listCategory.indexOf(categoryString);
    if (index !== -1) {
      setActiveTab(index);
    }
  }, [category, listCategory]);

  useEffect(() => {
    if (!pageData) {
      router.push("/connection");
    }
  }, [pageData, router]);

  if (!pageData) return null; // Hindari error saat redirect
  const projectData = pageData.description



  return (
    <div className="flex flex-col items-center w-full min-h-screen px-4 py-8 lg:w-3/4 dark:text-white">
      {/* Spacing untuk header */}
      <div className="h-[10dvh] lg:h-[20dvh]"></div>
      {/* Konten utama */}
      <div className={` w-full   gap-2 ${pageData.content[0].imageUrl?"lg:flex":""}`}>
        {/* Gambar */}
        {pageData.content[0].imageUrl?
        <div className="relative w-full lg:w-auto flex-1 aspect-square  ">
          <div className="relative w-full  aspect-square">
            <Image
              src={pageData.content[0]?.imageUrl || ""}
              alt={pageData.content[1]?.text || ""}
              fill
              className="rounded-2xl shadow-lg object-cover"
            />
          </div>
        </div>
        :""
      }


        {/* Judul */}
        <div className={`${pageData.content[0].imageUrl? "lg:w-3/6" : "w-full"} `}>
        {pageData.content[0]?.text &&
          <h1 className="mt-6 text-3xl font-bold text-center lg:text-5xl py-4">{pageData.content[0]?.text}</h1>
        }
        <h1 className="mt-6 text-3xl font-bold text-center lg:text-5xl py-4">{pageData.content[1]?.text}</h1>
        <div className="w-full  px-2 rounded-2xl">
          <p className=" text-lg mb-6 text-justify lg:text-xl">{projectData?.description}</p>

          {/* <h2 className="text-2xl font-semibold mt-6 lg:text-3xl">{language?"Teknologi :" : "Tech :"}</h2> */}
          <ul className="list-disc list-inside mt-2">
            {projectData?.technologies.map((tech, index) => (
              <li key={index} className="text-lg lg:text-xl">{tech}</li>
            ))}
          </ul>

          {/* <h2 className="text-2xl font-semibold mt-6 lg:text-3xl">{language?"Fitur":"Feature"}</h2> */}
          <div className="mt-2">
            {projectData?.features.map((feature, index) => (
              <div key={index} className="mb-4">
                <h3 className="text-lg font-bold lg:text-xl">{feature.title}</h3>
                <p className="text-sm lg:text-xl text-gray-600 dark:text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>

        </div>
        </div>

      </div>
      <div className="w-full">
        <h2 className="text-2xl font-semibold lg:text-3xl mt-6 pb-4">Timeline :</h2>
        <div className="mt-2 lg:flex gap-8">
          {Object.entries(projectData?.timeline || {}).map(([week, tasks], index) => (
            <div key={index} className="mb-4">
              <h3 className="text-lg font-bold lg:text-2xl">{week}</h3>
              <ul className="list-disc list-inside text-sm lg:text-lg text-gray-600 dark:text-gray-400">
                {tasks.map((task, idx) => (
                  <li key={idx}>{task}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <ConnectionList language={language} validTab={activeTab}/>
    </div>
  );
};

export default ProjectPage;
