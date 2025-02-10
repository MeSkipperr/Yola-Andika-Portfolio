interface TabelContent {
  className?: string;
  content: TableItem[][];
  itemsClassName?: string;
}

interface TableItem {
  urlPath: string;
  content: TableCell[];
  description?: ProjectDescription;
}

interface TableCell {
  text?: string;
  imageUrl?: string;
  bulletList?: boolean;
  itemsPosition?: "start" | "center" | "end";
  justifyPosition?: "start" | "center" | "end";
  className?: string;
}

interface ProjectDescription {
  title: string;
  description: string;
  technologies: string[];
  features: Feature[];
  timeline: Record<string, string[]>;
}

interface Feature {
  title: string;
  description: string;
}
export const listWebsite = (language: boolean): TabelContent["content"] => {
  return [
    [
      {
        urlPath: "/connection/website/plants",
        content: [
          {
            imageUrl: "/connection/website/plants.png",
            bulletList: true,
            itemsPosition: "center",
            justifyPosition: "center",
            text: undefined,
            className: undefined,
          },
          {
            text: language ? "Toko Tanaman" : "Plants Store",
            bulletList: false,
            itemsPosition: "center",
            justifyPosition: "center",
            className: "text-2xl",
            imageUrl: undefined,
          },
          {
            text: language
              ? "Next.js \n Tailwind CSS \n MySQL"
              : "Next.js \n Tailwind CSS \n MySQL",
            bulletList: true,
            itemsPosition: "center",
            justifyPosition: "start",
            imageUrl: undefined,
            className: undefined,
          },
          {
            text: language
              ? "Pencarian Tanaman\nKeranjang Belanja\nAkun Pengguna"
              : "Plant Search\nShopping Cart\nUser Account",
            bulletList: true,
            itemsPosition: "center",
            justifyPosition: "start",
            imageUrl: undefined,
            className: undefined,
          },
        ],
        description: {
          title: language ? "Toko Tanaman" : "Plants Store",
          description: language
            ? "Toko Tanaman adalah platform e-commerce yang menyediakan berbagai macam tanaman dengan harga terjangkau dan pengalaman pengguna yang sederhana. Dibangun menggunakan Next.js untuk performa optimal, Tailwind CSS untuk desain responsif, dan MySQL sebagai basis data utama, proyek ini menawarkan solusi lengkap bagi pecinta tanaman yang ingin berbelanja dengan mudah dan nyaman."
            : "Plants Store is an e-commerce platform that provides a wide variety of plants at affordable prices with a simple user experience. Built using Next.js for optimal performance, Tailwind CSS for responsive design, and MySQL as the main database, this project offers a complete solution for plant lovers who want to shop easily and comfortably.",
          technologies: ["Next.js", "Tailwind CSS", "MySQL"],
          features: [
            {
              title: language ? "Pencarian Tanaman" : "Plant Search",
              description: language
                ? "Memungkinkan pengguna mencari tanaman berdasarkan nama, kategori, atau harga dengan pencarian real-time."
                : "Allows users to search for plants based on name, category, or price with real-time search."
            },
            {
              title: language ? "Keranjang Belanja" : "Shopping Cart",
              description: language
                ? "Pengguna dapat menambahkan tanaman ke keranjang, melihat total harga, dan melanjutkan ke pembayaran dengan mudah."
                : "Users can add plants to the cart, view the total price, and proceed to checkout easily."
            },
            {
              title: language ? "Akun Pengguna" : "User Account",
              description: language
                ? "Sistem autentikasi yang memungkinkan pengguna membuat akun, mengelola pesanan, serta menyimpan daftar favorit."
                : "Authentication system that allows users to create accounts, manage orders, and save favorite lists."
            }
          ],
          timeline: {
            [language ? "Minggu 1" : "Week 1"]: [
              language
                ? "Perencanaan proyek dan pembuatan sketsa UI/UX"
                : "Project planning and UI/UX sketch creation",
              language
                ? "Persiapan environment pengembangan (Next.js, Tailwind CSS, MySQL)"
                : "Setting up the development environment (Next.js, Tailwind CSS, MySQL)",
              language
                ? "Pembuatan struktur database dan integrasi awal"
                : "Database structure creation and initial integration"
            ],
            [language ? "Minggu 2" : "Week 2"]: [
              language
                ? "Pengembangan halaman utama dan fitur pencarian tanaman"
                : "Development of the main page and plant search feature",
              language
                ? "Implementasi sistem autentikasi pengguna"
                : "Implementation of user authentication system",
              language
                ? "Integrasi API untuk menampilkan data tanaman secara dinamis"
                : "API integration to dynamically display plant data"
            ],
            [language ? "Minggu 3" : "Week 3"]: [
              language
                ? "Pembuatan fitur Keranjang Belanja dan mekanisme penyimpanan sesi"
                : "Development of Shopping Cart feature and session storage mechanism",
              language
                ? "Pengembangan halaman checkout dan sistem pembayaran"
                : "Development of the checkout page and payment system",
              language
                ? "Pengujian dan debugging fitur utama"
                : "Testing and debugging of main features"
            ],
            [language ? "Minggu 4" : "Week 4"]: [
              language
                ? "Penyempurnaan UI/UX dengan Tailwind CSS"
                : "UI/UX refinement with Tailwind CSS",
              language
                ? "Optimasi performa dan SEO dengan Next.js"
                : "Performance optimization and SEO with Next.js",
              language
                ? "Deployment ke server dan monitoring awal"
                : "Deployment to server and initial monitoring"
            ]
          }
        }
      },
      {
        urlPath: "/connection/website/cloud-file",
        content: [
          {
            imageUrl: "/connection/website/sharingFile.png",
            bulletList: true,
            itemsPosition: "center",
            justifyPosition: "center",
            text: undefined,
            className: undefined,
          },
          {
            text: "Cloud File",
            bulletList: false,
            itemsPosition: "center",
            justifyPosition: "center",
            className: "text-2xl",
            imageUrl: undefined,
          },
          {
            text:"Node JS\nExpress \n HTML \nCSS",
            bulletList: true,
            itemsPosition: "center",
            justifyPosition: "start",
            imageUrl: undefined,
            className: undefined,
          },
          {
            text: language
              ? "Menyimpan file secara online\nMembagikan file secara online"
              : "Save files online\nShare files online",
            bulletList: true,
            itemsPosition: "center",
            justifyPosition: "start",
            imageUrl: undefined,
            className: undefined,
          },
        ],
        description: {
          title: "Cloud File",
          description: language
            ? "Website untuk menyimpan file secara online, di mana file dapat dibagikan dan ditemukan menggunakan URL"
            : "A website for storing files online, where files can be shared and accessed using a URL",
          technologies: ["Node JS" , "Express" , "HTML" ,"CSS"],
          features: [
            {
              title: language ? "Menyimpan File Secara Online" : "Storing Files Online",
              description: language
                ? "Pengguna dapat menyimpan file secara online dan mengaksesnya kapan saja dan di mana saja"
                : "Users can store files online and access them anytime, anywhere"
            },
            {
              title: language ? "Pembagian File" : "File Sharing",
              description: language
                ? "File dapat dibagikan menggunakan URL yang dapat diakses oleh orang lain"
                : "Files can be shared using a URL that others can access"
            }            
          ],
          timeline: {
            [language ? "Minggu 1-2" : "Week 1-2"]: [
              language
                ? "Perencanaan proyek dan pembuatan sketsa UI/UX"
                : "Project planning and UI/UX sketch creation",
              language
                ? "Persiapan environment pengembangan (Node JS, Express,)"
                : "Setting up the development environment (Node JS, Express)",
            ],
          }
        }
      },


    ],

  ];
};


export const listNetwork = (language: boolean): TabelContent["content"] => {
  return [
    [
      {
        urlPath: "/connection/network/monitoring-network",
        content: [
          {
            imageUrl: "/connection/network/monitoringNetwork.png",
            bulletList: true,
            itemsPosition: "start",
            justifyPosition: "center",
            text: undefined,
            className: undefined
          },
          {
            text: language ? "Pemantauan Jaringan" : "Network Monitoring",
            bulletList: false,
            itemsPosition: "center",
            justifyPosition: "center",
            className: "text-2xl",
            imageUrl: undefined,
          },
          {
            text: "Node.js\nWindows\nSSH" ,
            bulletList: true,
            itemsPosition: "center",
            justifyPosition: "start",
            imageUrl: undefined,
            className: undefined
          },
          {
            text: language
              ? "Ping Setiap Perangkat\nKirim Status ke Email\nKirim Kesehatan Perangkat ke Email"
              : "Ping Every Device\nSend Status to Email\nSend Device Health to Email",
            bulletList: true,
            itemsPosition: "center",
            justifyPosition: "start",
            imageUrl: undefined,
            className: undefined
          },
        ],
        description: {
          title: language ? "Pemantauan Jaringan" : "Network Monitoring",
          description: language
            ? "Sistem pemantauan jaringan yang berfungsi untuk memantau status perangkat jaringan secara real-time. Dibangun dengan Node.js sebagai backend dan berjalan di lingkungan Windows, sistem ini akan mengirimkan notifikasi email jika terdeteksi masalah pada perangkat jaringan. Selain itu, sistem juga mengirimkan laporan kesehatan perangkat setiap minggu melalui email."
            : "A network monitoring system designed to track the status of network devices in real-time. Built with Node.js for the backend and running in a Windows environment, this system sends email notifications if any issues are detected in network devices. Additionally, it sends a weekly health report of the devices via email.",
          technologies: ["Node.js", "Windows","SSH"],
          features: [
            {
              title: language ? "Ping Setiap Perangkat" : "Ping Every Device",
              description: language
                ? "Melakukan ping ke setiap perangkat jaringan untuk memeriksa ketersediaan dan respons."
                : "Pings every network device to check availability and response."
            },
            {
              title: language ? "Kirim Status ke Email" : "Send Status to Email",
              description: language
                ? "Mengirimkan laporan status perangkat jaringan ke email administrator secara berkala."
                : "Sends network device status reports to the administrator's email periodically."
            },
            {
              title: language ? "Kirim Kesehatan Perangkat ke Email" : "Send Device Health to Email",
              description: language
                ? "Mengirimkan laporan kesehatan perangkat jaringan ke email administrator jika terdeteksi masalah."
                : "Sends network device health reports to the administrator's email if issues are detected."
            }
          ],
          timeline: {
            [language ? "Hari 1-2" : "Day 1-2"]: [
              language
                ? "Perencanaan proyek dan analisis kebutuhan"
                : "Project planning and requirement analysis",
              language
                ? "Persiapan environment pengembangan (Node.js, Windows)"
                : "Setting up the development environment (Node.js, Windows)",
              language
                ? "Pengembangan fitur ping dan pemantauan status perangkat"
                : "Development of ping and device status monitoring feature",
              language
                ? "Implementasi sistem notifikasi email"
                : "Implementation of email notification system"
            ],
            [language ? "Hari 3-4" : "Day 3-4"]: [
              language
              ? "Mendapatkan data IP Address & nama perangkat"
              : "Retrieving IP Address data & device name",            
            ],
            [language ? "Hari 5-7" : "Day 5-7 "]: [
              language
                ? "Pengujian dan debugging fitur utama"
                : "Testing and debugging of main features",
              language
                ? "Optimasi performa dan keandalan sistem"
                : "Performance and reliability optimization"
            ],
          }
        }
      },
      {
        urlPath: "/connection/network/local-network-topology",
        content: [
          {
            text: undefined,
            bulletList: false,
            itemsPosition: "center",
            justifyPosition: "center",
            className: "text-2xl",
            imageUrl: "/connection/network/network-topology.jpg"
          },
          {
            text: "Network Topology",
            bulletList: false,
            itemsPosition: "center",
            justifyPosition: "center",
            imageUrl: undefined,
            className: undefined
          },
          {
            text: "Server\nRouter\nSwitch\nPC",
            bulletList: true,
            itemsPosition: "center",
            justifyPosition: "start",
            imageUrl: undefined,
            className: undefined
          },
          {
            text: language
              ? "Konfigurasi VLAN\nKonfigurasi VLSM\nLocal Server"
              : "VLAN Configuration\nVLSM Configuration\nLocal Server",
            itemsPosition: "center",
            justifyPosition: "start",
            bulletList: true,
            imageUrl: undefined,
            className: undefined
          },
        ],
        description: {
          title: "Local Network Topology",
          description: language
            ? "Topologi jaringan lokal yang dirancang untuk menghubungkan perangkat seperti server, router, switch, dan PC dalam satu jaringan. Topologi ini mendukung konfigurasi VLAN dan VLSM untuk manajemen jaringan yang lebih efisien."
            : "A local network topology designed to connect devices such as servers, routers, switches, and PCs within a single network. This topology supports VLAN and VLSM configurations for more efficient network management.",
          technologies: ["Server", "Router", "Switch", "PC"],
          features: [
            {
              title: language ? "Konfigurasi VLAN" : "VLAN Configuration",
              description: language
                ? "Mengatur segmentasi jaringan dengan VLAN untuk meningkatkan keamanan dan efisiensi."
                : "Configuring network segmentation with VLANs to enhance security and efficiency."
            },
            {
              title: language ? "Konfigurasi VLSM" : "VLSM Configuration",
              description: language
                ? "Menggunakan VLSM untuk alokasi IP address yang lebih efisien."
                : "Using VLSM for more efficient IP address allocation."
            },
            {
              title: language ? "Local Server" : "Local Server",
              description: language
                ? "Mengelola server lokal untuk layanan jaringan seperti DHCP, DNS, dan file sharing."
                : "Managing local servers for network services such as DHCP, DNS, and file sharing."
            }
          ],
          timeline: {
            ["1"]: [
              language
                ? "Perencanaan topologi jaringan dan analisis kebutuhan"
                : "Network topology planning and requirement analysis",
              language
                ? "Persiapan perangkat keras (server, router, switch, PC)"
                : "Hardware preparation (server, router, switch, PC)"
            ],
            ["2"]: [
              language
                ? "Konfigurasi dasar jaringan (IP addressing, subnetting)"
                : "Basic network configuration (IP addressing, subnetting)",
              language
                ? "Implementasi VLAN dan VLSM"
                : "VLAN and VLSM implementation"
            ],
            ["3"]: [
              language
                ? "Pengujian konektivitas dan kinerja jaringan"
                : "Testing network connectivity and performance",
              language
                ? "Optimasi konfigurasi dan dokumentasi"
                : "Configuration optimization and documentation"
            ],
          }
        }
      }
    ],
  ];
};
export const listExperience = (language: boolean): TabelContent["content"] => {
  return [
    [
      {
        urlPath: "/connection/experience/courtyard-nusa-dua",
        content: [
          {
            text: "Courtyard By Marriott Bali Nusa Dua Resort",
            bulletList: false,
            itemsPosition: "center",
            justifyPosition: "center",
            className: "text-2xl",
            imageUrl: undefined
          },
          {
            text: "IT Support",
            bulletList: false,
            itemsPosition: "center",
            justifyPosition: "center",
            imageUrl: undefined,
            className: undefined
          },
          {
            text: language
              ? "6 Bulan"
              : "6 Months",
            bulletList: false,
            itemsPosition: "center",
            justifyPosition: "start",
            imageUrl: undefined,
            className: undefined
          },
          {
            text: language
              ? "Pemeliharaan Jaringan\nPemantauan Marriott GPNS\nInstalasi UPS Server"
              : "Network Maintenance\nMarriott GPNS Monitoring\nUPS Server Installation",
            itemsPosition: "center",
            justifyPosition: "start",
            bulletList: true,
            imageUrl: undefined,
            className: undefined
          },
        ],
        description: {
          title: "Courtyard By Marriott Bali Nusa Dua Resort",
          description: language
          ? "Pengalaman kerja sebagai IT Support di Courtyard By Marriott Bali Nusa Dua Resort. Bertanggung jawab atas pemeliharaan dan pemantauan jaringan serta infrastruktur IT yang mendukung operasional hotel. Tugas mencakup pemantauan sistem Marriott GPNS untuk memastikan kelancaran proses bisnis, serta instalasi dan pemeliharaan UPS server untuk menjamin ketersediaan daya dan keandalan infrastruktur IT, khususnya dalam kondisi darurat. Selain itu, terlibat dalam perbaikan perangkat keras dan perangkat lunak, serta memberikan dukungan teknis kepada staf untuk memastikan produktivitas yang optimal."
          : "Work experience as IT Support at Courtyard By Marriott Bali Nusa Dua Resort. Responsible for the maintenance and monitoring of networks and IT infrastructure supporting hotel operations. Duties include monitoring the Marriott GPNS system to ensure smooth business processes, as well as installation and maintenance of UPS servers to ensure power availability and the reliability of IT infrastructure, particularly in emergency situations. Additionally, involved in hardware and software repairs and providing technical support to staff to ensure optimal productivity.",
          technologies: ["Network Maintenance", "Marriott GPNS", "UPS Installation","Windows Server"],
          features: [
            {
              title: language ? "Pemeliharaan Jaringan" : "Network Maintenance",
              description: language
                ? "Memastikan jaringan berfungsi dengan baik dan tersedia 24/7 untuk mendukung operasional hotel."
                : "Ensuring the network functions properly and is available 24/7 to support hotel operations."
            },
            {
              title: language ? "Pemantauan Marriott GPNS" : "Marriott GPNS Monitoring",
              description: language
                ? "Memantau sistem GPNS Marriott untuk memastikan konektivitas dan keamanan jaringan global."
                : "Monitoring the Marriott GPNS system to ensure global network connectivity and security."
            },
            {
              title: language ? "Instalasi UPS Server" : "UPS Server Installation",
              description: language
                ? "Melakukan instalasi dan konfigurasi UPS server untuk memastikan ketersediaan daya yang stabil."
                : "Installing and configuring UPS servers to ensure stable power availability."
            }
          ],
          timeline: {
            [language ? "Bulan 1" : "Month 1"]: [
              language
                ? "Pengenalan hotel dan struktur jaringan"
                : "Introduction to the hotel and network structure",
              language
                ? "Melakukan perbaikan masalah terutama pada jaringan"
                : "Troubleshooting and resolving network-related issues"
            ],
            [language ? "Bulan 2-4" : "Month 2-4"]: [
              language
                ? "Memantau proyek GPNS agar sesuai dengan standar"
                : "Monitoring the GPNS project to ensure compliance with standards",
              language
                ? "Belajar tentang implementasi Windows server"
                : "Learning about Windows Server implementation",
              language
                ? "Heatmap untuk memastikan standar sinyal sesuai"
                : "Creating a heatmap to ensure signal standards are met"
            ],
            [language ? "Bulan 5-6" : "Month 5-6"]: [
              language
                ? "Install ulang Windows Marriott"
                : "Reinstalling Marriott Windows OS",
              language
                ? "Konfigurasi Switch"
                : "Configuring switches",
              language
                ? "Instalasi dan konfigurasi UPS server"
                : "Installation and configuration of UPS servers"
            ]
          }          
        }
      }
    ],
  ];
};
export const allProject = (language: boolean): TabelContent["content"] => {
  return [
    listNetwork(language)[0],
    listWebsite(language)[0],
    listExperience(language)[0]
  ]
}

export const lastProject = (language: boolean): TabelContent["content"] => {
  return [
    [
      listWebsite(language)[0][0],
      listNetwork(language)[0][0],
      listExperience(language)[0][0],
    ],
  ];
};

export const getSpecificConnectionByPath = (urlPath: string, language: boolean) => {
  const project = allProject(language);

  return project.flat().find((website) => website.urlPath === urlPath);
};

