export const config = {
    site: {
        title: 'Jani Aelterman',
        logo: 'AJ',
        copyrightName: 'Jani Aelterman',
    },
    social: {
        github: 'https://github.com/Jani-Aelterman',
        linkedin: 'https://www.linkedin.com/in/jani-aelterman/',
        printables: 'https://www.printables.com/@JaniAelterma_1233809',
    },
    projectImages: {
        'Number-Match-App': '/images/NumberMatch_Screenshot.png',
        'WLED-Expressive-App': '/images/Screenshot_DevicePage.png',
        'Jani-Aelterman.github.io': '/images/Jani-Aelterman.github.io.png',
        'project-valley': '/images/Project-Valley_Screenshot.png'
    },
    github: {
        featuredRepos: [
            'Razer-Chroma-WLED-Connect-App-WinUI3',
            'Number-Match-App',
            'WLED-Expressive-App',
            'Jani-Aelterman.github.io',
            'project-valley'
        ],
        excludeRepos: ['WSA', 'MagiskOnWSA']
    },
    latestRelease: {
        show: true,
        fallbackRepo: 'Number-Match-App'
    },
    features: {
        enableNewsletter: false
    }
};

export const translations = {
    en: {
        site: {
            description: 'Portfolio of Jani Aelterman - Developer & 3D Printing Enthusiast',
        },
        hero: {
            title: "Hi, I'm",
            tagline: "Passionate developer, 3D printing enthusiast, and chronic tinkerer. I love building .NET applications, tinkering with Voron printers, and creating custom 3D solutions.",
            skills: [
                'C#', '.NET MAUI', 'Java', 'React', 'TypeScript', 'Python', 'Linux', 'Klipper', 'Voron', 'Shapr3D', 'Git',
            ],
        },
        navigation: [
            { label: 'Projects', href: '#projects' },
            { label: '3D Printing', href: '#printing' },
            { label: 'About', href: '#about' },
        ],
        about: {
            sections: [
                {
                    icon: 'Code',
                    title: 'Engineering Journey',
                    text: "My journey in IT started in high school (Industrial ICT), where I discovered my passion for C# and .NET MAUI after exploring C++, Arduino, and MicroPython. While I've touched on low-level languages like Assembly, I prefer building robust applications and working with modern frameworks. Currently, I am refining my skills in React and C# APIs in the Graduate Programming course."
                },
                {
                    icon: 'Build',
                    title: 'Maker at Heart',
                    text: "Beyond code, I am deeply fascinated by 3D printing. What started with an Ender 3 V2 running Klipper quickly escalated into building a Voron 2.4 kit from scratch. I love the hardware aspect of tinkering—I'm even planning a Virtu 3 conversion soon. For design, I've moved from Fusion 360 to Shapr3D to create my own functional parts."
                },
                {
                    icon: 'DirectionsBike',
                    title: 'Life Outside Tech',
                    text: "In my free time, I'm an avid mountain biker and I enjoy combining my hobbies, like writing Bash/Python automation scripts for my printers or modernizing WPF applications."
                }
            ]
        },
        printables: [
            { id: '1697502', title: 'Compact Saddle Rail Mount for Rockbros Tail Light (Twist-Lock)' },
            { id: '1635631', title: 'Gridfinity Module for Xiaomi Mijia Electric Precision Screwdriver' },
            { id: '1605165', title: 'Kona Satori Rear Brake Guide Fix' },
            { id: '1428287', title: 'Bicycle Handlebar Extension' },
        ],
        labels: {
            latestRelease: 'LATEST RELEASE',
            publishedOn: 'Published on',
            featuredProjects: 'Featured Projects',
            featuredProjectsDesc: 'Some of my recent code repositories on GitHub.',
            noDescription: 'No description available.',
            printingHeading: '3D Printing & Design',
            printingDesc: 'My latest designs from Printables.',
        }
    },
    nl: {
        site: {
            description: 'Portfolio van Jani Aelterman - Developer & 3D Printing enthousiast',
        },
        hero: {
            title: "Hoi, ik ben",
            tagline: "Gepassioneerde developer, 3D printing liefhebber en chronische knutselaar. Ik hou van het bouwen van .NET applicaties, prutsen aan Voron printers en het maken van custom 3D oplossingen.",
            skills: [
                'C#', '.NET MAUI', 'Java', 'React', 'TypeScript', 'Python', 'Linux', 'Klipper', 'Voron', 'Shapr3D', 'Git',
            ],
        },
        navigation: [
            { label: 'Projecten', href: '#projects' },
            { label: '3D Printen', href: '#printing' },
            { label: 'Over', href: '#about' },
        ],
        about: {
            sections: [
                {
                    icon: 'Code',
                    title: 'Mijn weg in de Engineering',
                    text: "Mijn reis in de IT begon op de middelbare school (Industriële ICT), waar ik mijn passie voor C# en .NET MAUI ontdekte na het verkennen van C++, Arduino en MicroPython. Hoewel ik met low-level talen zoals Assembly heb gewerkt, geef ik de voorkeur aan het bouwen van robuuste applicaties en het werken met moderne frameworks. Momenteel verfijn ik mijn vaardigheden in React en C# API's in de opleiding Graduaat Programmeren."
                },
                {
                    icon: 'Build',
                    title: 'Maker in hart en nieren',
                    text: "Naast code ben ik diep gefascineerd door 3D printen. Wat begon met een Ender 3 V2 met Klipper escaleerde snel in het vanaf nul opbouwen van een Voron 2.4 kit. Ik hou van het hardware aspect van het knutselen—ik plan binnenkort zelfs een Virtu 3 conversie. Voor het ontwerpen ben ik overgestapt van Fusion 360 naar Shapr3D om mijn eigen functionele onderdelen te maken."
                },
                {
                    icon: 'DirectionsBike',
                    title: 'Leven buiten de techniek',
                    text: "In mijn vrije tijd ben ik een fervent mountainbiker en ik combineer graag mijn hobby's, zoals het schrijven van Bash/Python automatiseringsscripts voor mijn printers of het moderniseren van WPF-applicaties."
                }
            ]
        },
        printables: [
            { id: '1697502', title: 'Compacte zadelrailhouder voor Rockbros achterlicht (Twist-Lock)' },
            //{ id: '1635631', title: 'Gridfinity Module for Xiaomi Mijia Electric Precision Screwdriver' },
            { id: '1635631', title: 'Gridfinity Module voor Xiaomi Mijia Elektrische Precisie Schroevendraaier'},
            //{ id: '1605165', title: 'Kona Satori Rear Brake Guide Fix' },
            { id: '1605165', title: 'Kona Satori Achter remgeleider'},
            //{ id: '1428287', title: 'Bicycle Handlebar Extension' },
            { id: '1428287', title: 'Fietsstuur verbreder'},
        ],
        labels: {
            latestRelease: 'LAATSTE RELEASE',
            publishedOn: 'Gepubliceerd op',
            featuredProjects: 'Uitgelichte Projecten',
            featuredProjectsDesc: 'Een overzicht van mijn recente code repositories op GitHub.',
            noDescription: 'Geen beschrijving beschikbaar.',
            printingHeading: '3D Printen & Ontwerpen',
            printingDesc: 'Mijn meest recente ontwerpen van op Printables.',
        }
    }
};

// For backward compatibility during migration
export const content = {
    ...config,
    ...translations.en
};