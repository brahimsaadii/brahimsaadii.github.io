// Portfolio data structure for easy updates
const portfolioData = {    personal: {
        name: "Brahim SAADI",
        title: "MVA Student & AI Research Engineer",
        email: "brahim.saadi342@gmail.com",
        phone: "+33 (0) 745 439 657",
        location: "Paris, France",
        profileImage: "profile.jpg", // Add your profile picture filename here
        bio: "Passionate AI researcher and data scientist with expertise in machine learning, deep learning, NLP, and computer vision. Currently pursuing M2 MVA at ENS Paris-Saclay with hands-on experience in building AI pipelines and research projects.",
        aboutText: [
            "I'm a dedicated AI researcher and data scientist currently pursuing M2 MVA (Mathématique Vision Apprentissage) at ENS Paris-Saclay. My journey in AI spans machine learning, deep learning, computer vision, and natural language processing.",
            "With hands-on experience at INRIA and ERICSSON, I've worked on cutting-edge projects involving fact-checking AI pipelines, 5G network optimization, and IoT device classification. I believe in pushing the boundaries of AI research while delivering practical solutions that make a real impact."
        ],
        stats: {
            experience: "3+",
            projects: "15+",
            publications: "1"
        },
        availability: "Available for opportunities",
        publicationPrefix: "Published at"
    },
    
    // Terminal configuration for portfolio terminal
    terminal: {
        user: "brahim",
        hostname: "portfolio",
        currentPath: "/home/brahim/portfolio",
        theme: "default"
    },
    
    skills: {
        programming: [
            { name: "Python", level: 95 },
            { name: "C/C++", level: 80 },
            { name: "SQL", level: 85 }
        ],
        "ai-ml": [
            { name: "Machine Learning Algorithms", level: 90 },
            { name: "Deep Learning", level: 85 },
            { name: "Natural Language Processing", level: 80 },
            { name: "Computer Vision", level: 75 },
            { name: "LLMs", level: 80 },
            { name: "Data Analysis", level: 85 }
        ],
        frameworks: [
            { name: "PyTorch", level: 85 },
            { name: "TensorFlow", level: 80 },
            { name: "Keras", level: 80 },
            { name: "Scikit-Learn", level: 90 },
            { name: "Pandas", level: 90 },
            { name: "Seaborn", level: 85 },
            { name: "NLTK", level: 80 },
            { name: "OpenCV", level: 75 }
        ],
        tools: [
            { name: "Git/GitHub", level: 85 },
            { name: "Jupyter", level: 95 },
            { name: "VS Code", level: 90 },
            { name: "Power BI", level: 70 }
        ],
        languages: [
            { name: "Arabic", level: 100 },
            { name: "English", level: 90 },
            { name: "French", level: 85 }
        ]    },
    
    // Projects section
    // Available icon options (FontAwesome classes):
    // - "fas fa-search" (magnifying glass - for search/analysis projects)
    // - "fas fa-network-wired" (network - for networking/infrastructure projects)
    // - "fas fa-wifi" (wifi - for IoT/wireless projects)
    // - "fas fa-code" (code brackets - for general coding projects)
    // - "fas fa-brain" (brain - for AI/ML projects)
    // - "fas fa-robot" (robot - for robotics/automation projects)
    // - "fas fa-database" (database - for data management projects)
    // - "fas fa-chart-line" (chart - for analytics/visualization projects)
    // - "fas fa-mobile-alt" (mobile - for mobile app projects)
    // - "fas fa-globe" (globe - for web projects)
    // - "fas fa-cog" (gear - for configuration/tools projects)
    // - "fas fa-shield-alt" (shield - for security projects)
    // - "fas fa-gamepad" (gamepad - for game projects)
    // - "fas fa-camera" (camera - for image processing projects)
    // - "fas fa-microchip" (microchip - for hardware/embedded projects)
    projects: [
        {
            title: "FactCheckBureau Platform",
            description: "Interactive platform for designing and evaluating fact-checking analysis pipelines using BM25 retrieval and SBERT re-ranking with LLM fine-tuning.",
            technologies: ["Python", "PyTorch", "SBERT", "BM25", "LLMs", "NLP"],
            githubUrl: "https://github.com/brahimsaadii/test-project",
            liveUrl: "https://github.com/brahimsaadii/test-project",
            featured: true,
            publication: "CIKM '24: 33rd ACM International Conference on Information and Knowledge Management",
            icon: "fas fa-search"
        },
        {
            title: "5G Network Self-Configuration",
            description: "Deep Q-Learning solution for self-configuration of 5G NSA sites with PCI configuration tool, reducing manual configuration time significantly.",
            technologies: ["Python", "Deep Q-Learning", "Reinforcement Learning", "5G Networks"],
            githubUrl: "#",
            liveUrl: "#",
            featured: true,
            icon: "fas fa-network-wired"
        },        {
            title: "IoT Device Classification System",
            description: "Machine learning pipeline for IoT device classification using network traffic analysis with Wireshark data capture and multiple ML models.",
            technologies: ["Python", "Scikit-Learn", "Wireshark", "Random Forest", "SVM", "KNN"],
            githubUrl: "#",
            liveUrl: "#",
            featured: true,
            icon: "fas fa-wifi"
        },
        {
            title: "Personal Portfolio Website",
            description: "Modern, responsive portfolio website with terminal functionality and interactive features.",
            technologies: ["HTML", "CSS", "JavaScript"],
            githubUrl: "https://github.com/brahimsaadii/test-project",
            liveUrl: "https://github.com/brahimsaadii/test-project",
            featured: false,
            icon: "fas fa-code"
        },
        {
            title: "Test Project",
            description: "This is a test project to verify that adding new projects works correctly.",
            technologies: ["JavaScript", "HTML", "CSS"],
            githubUrl: "https://github.com/brahimsaadii/test-project",
            liveUrl: "https://test-project-demo.com",
            featured: false,
            icon: "fas fa-cog"        }
    ],
    
    // Experience section (no icons needed - uses timeline format)
    experience: [
        {
            title: "Research Intern - Building AI Pipelines for Fact-Check Analysis",
            company: "INRIA - Laboratoire d'informatique de l'X (LIX)",
            period: "Feb 2024 - Aug 2024",
            description: [
                "Collected and organized datasets of claims and fact-checking articles",
                "Developed and implemented a retrieval solution using BM25, followed by re-ranking with the SBERT model (LLM)",
                "Fine-tuned LLMs on collected data for improved accuracy",
                "Deployed an interactive platform, FactCheckBureau, enabling researchers to design and evaluate fact-checking analysis pipelines in production"
            ],
            technologies: ["Python", "LLMs", "SBERT", "BM25", "PyTorch", "NLP", "Data Collection"]
        },
        {
            title: "Research Intern - 5G Network Self-Configuration",
            company: "ERICSSON",
            period: "Oct 2023 - Jan 2024",
            description: [
                "Developed a solution for the self-configuration of 5G NSA sites using Deep Q-Learning",
                "Deployed the solution with the PCI configuration tool, significantly reducing manual configuration time"
            ],
            technologies: ["Deep Q-Learning", "Python", "5G Networks", "Reinforcement Learning"]
        },        {
            title: "Data Science Intern - IoT Device Classification",
            company: "ERICSSON",
            period: "Feb 2023 - Jun 2023",
            description: [
                "Captured IoT device network traffic using Wireshark and performed data analysis to create a dataset",
                "Prepared the dataset through cleaning, normalization, and encoding for machine learning model training",
                "Trained and evaluated machine learning models (Random Forest, SVM, KNN) to classify IoT devices"
            ],
            technologies: ["Python", "Wireshark", "Scikit-Learn", "Data Analysis", "Random Forest", "SVM", "KNN"]
        },
        {
            title: "Test Intern - Machine Learning Research",
            company: "Test AI Company",
            period: "Jan 2025 - Present",
            description: [
                "This is a test experience entry to verify dynamic loading",
                "Working on cutting-edge AI research projects",
                "Implementing state-of-the-art machine learning algorithms"
            ],
            technologies: ["Python", "PyTorch", "Machine Learning", "Research"]        }
    ],
    
    // Education section
    // Available icon options (FontAwesome classes):
    // - "fas fa-brain" (brain - for AI/ML/advanced research programs like MVA, data science)
    // - "fas fa-graduation-cap" (graduation cap - general higher education, bachelor's, master's)
    // - "fas fa-book" (book - for preparatory classes, intensive academic programs)
    // - "fas fa-award" (award - for achievements like baccalaureate, honors)
    // - "fas fa-certificate" (certificate - for certifications, professional credentials)
    // - "fas fa-university" (university building - for university degrees)
    // - "fas fa-microscope" (microscope - for scientific/research programs)
    // - "fas fa-calculator" (calculator - for mathematics/engineering programs)
    // - "fas fa-laptop-code" (laptop with code - for computer science programs)
    // - "fas fa-flask" (flask - for chemistry/laboratory sciences)
    // - "fas fa-stethoscope" (stethoscope - for medical programs)
    // - "fas fa-palette" (palette - for arts/design programs)
    // - "fas fa-briefcase" (briefcase - for business/management programs)
    education: [
        {
            degree: "M2 MVA (Mathématique Vision Apprentissage)",
            institution: "ENS Paris-Saclay",
            period: "2024 - Present",
            description: "Key Courses: Convex Optimization, Object Recognition and Computer Vision, Deep Learning & Signal Processing, Time Series Analysis, Altegrad (NLP & graphs), Reinforcement Learning.",
            icon: "fas fa-brain"
        },
        {
            degree: "Data Science & Intelligence Artificielle",
            institution: "École nationale polytechnique",
            period: "2021 - 2024",
            description: "Developed expertise in machine learning, data analysis, databases, computer vision, natural language processing, industrial engineering, communication, entrepreneurship, and project management.",
            icon: "fas fa-brain"
        },
        {
            degree: "Classes Préparatoires",
            institution: "École nationale polytechnique",
            period: "2019 - 2021",
            description: "Successfully passed (Concours d'Accès au Grandes Écoles): ranking top 7%.",
            icon: "fas fa-book"
        },
        {
            degree: "Baccalaureate - Mathematics and Electrical Engineering",
            institution: "Lycée Khatab Ibrahim | Skikda, Algérie",
            period: "2019",
            description: "Mathematics and Electrical Engineering (17.68/20)",
            icon: "fas fa-award"
        },
        {
            degree: "Test Certificate - Advanced AI Studies",
            institution: "Test University | Online",
            period: "2024",
            description: "This is a test education entry to verify that adding new education works correctly in both terminal and webpage.",
            icon: "fas fa-certificate"
        }
    ],
    
    certifications: [
        "Deep Learning with TensorFlow 2 (365 Data Science)",
        "Machine Learning in Python (365 Data Science)",
        "Fundamentals of Deep Learning (NVIDIA)",
        "Tools for Data Science (IBM | Coursera)",
        "Introduction to Data and Data Science (365 Data Science)",
        "Git and GitHub (365 Data Science)"
    ],
    
    publications: [
        {
            title: "FactCheckBureau: Build Your Own Fact-Check Analysis Pipeline",
            conference: "CIKM '24: 33rd ACM International Conference on Information and Knowledge Management",
            date: "Oct 2024",
            contribution: "Collected claim data and implemented a retrieval approach based on BM25, followed by re-ranking using SBERT (LLM). Developed and deployed the FactCheckBureau platform for pipeline matching and analysis in fact-checking."
        }
    ]
};
