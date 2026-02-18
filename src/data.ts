export const content = {
    site: {
        title: 'Jani Aelterman',
        logo: 'AJ',
        description: 'Portfolio of Jani Aelterman - Developer & 3D Printing Enthusiast',
        copyrightName: 'Jani Aelterman',
    },
    hero: {
        title: "Hi, I'm",
        name: 'Jani Aelterman',
        tagline: "Passionate developer, 3D printing enthusiast, and chronic tinkerer. I love building .NET applications, tinkering with Voron printers, and creating custom 3D solutions.",
        skills: [
            'C#',
            '.NET MAUI',
            'Java',
            'React',
            'TypeScript',
            'Python',
            'Linux',
            'Klipper',
            'Voron',
            'Shapr3D',
            'Git',
        ],
    },
    navigation: [
        { label: 'Projects', href: '#projects' },
        { label: '3D Printing', href: '#printing' },
        { label: 'About', href: '#about' },
    ],
    social: {
        github: 'https://github.com/Jani-Aelterman',
        linkedin: 'https://www.linkedin.com/in/jani-aelterman/', // Zorg dat je deze update als je een echte link hebt!
        printables: 'https://www.printables.com/@JaniAelterma_1233809',
    },
    // Optional: Map specific repositories to custom images.
    projectImages: {
        'Number-Match-App': '/images/NumberMatch_Screenshot.png',
    },
    printables: [
        { id: '1605165', title: 'Kona Satori Rear Brake Guide Fix' }, // Je nieuwe model bovenaan
        { id: '1428287', title: 'Bicycle Handlebar Extension' },
    ],
    // Nieuwe sectie voor je uitgebreide bio
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
    features: {
        enableNewsletter: false
    }
};