// Terminal functionality - Initialize after DOM loads
document.addEventListener('DOMContentLoaded', function() {
    // Get terminal elements
    terminal = document.getElementById('terminal');
    terminalOutput = document.getElementById('terminal-output');
    terminalInput = document.getElementById('terminal-input');
    
    if (!terminal || !terminalOutput || !terminalInput) {
        console.error('Terminal elements not found in DOM');
        return;
    }
    
    // Initialize terminal functionality
    initializeTerminal();
});

function initializeTerminal() {
    // Load saved preferences
    loadCommandHistory();
    loadSavedTheme();
    
    // Set up event listeners
    setupTerminalEventListeners();
    
    // Show initial welcome message
    if (terminalOutput.innerHTML === '') {
        showWelcomeMessage();
    }
    
    console.log('✅ Terminal initialized successfully');
}

function setupTerminalEventListeners() {
    function setupTerminalEventListeners() {
    // Enhanced event listeners
    terminalInput.addEventListener('keydown', function(e) {
        switch(e.key) {
            case 'Enter':
                const input = terminalInput.value;
                executeCommandWithAlias(input);
                terminalInput.value = '';
                break;
                
            case 'ArrowUp':
                e.preventDefault();
                if (historyIndex < commandHistory.length - 1) {
                    historyIndex++;
                    terminalInput.value = commandHistory[historyIndex] || '';
                }
                break;
                
            case 'ArrowDown':
                e.preventDefault();
                if (historyIndex > 0) {
                    historyIndex--;
                    terminalInput.value = commandHistory[historyIndex] || '';
                } else if (historyIndex === 0) {
                    historyIndex = -1;
                    terminalInput.value = '';
                }
                break;
                
            case 'Tab':
                e.preventDefault();
                autoComplete();
                break;
                
            case 'l':
                if (e.ctrlKey) {
                    e.preventDefault();
                    commands.clear.execute();
                }
                break;
                
            case 'c':
                if (e.ctrlKey) {
                    e.preventDefault();
                    addToTerminal(`^C`, 'command-error');
                    terminalInput.value = '';
                }
                break;
        }
    });

    // Terminal focus management
    document.addEventListener('click', function(e) {
        if (isTerminalActive && terminal.contains(e.target)) {
            terminalInput.focus();
        }
    });

    // Prevent terminal from losing focus when clicking inside
    terminal.addEventListener('click', function(e) {
        if (isTerminalActive) {
            terminalInput.focus();
        }
    });

    // Global keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl + ` to toggle terminal
        if (e.ctrlKey && e.key === '`') {
            e.preventDefault();
            toggleTerminal();
        }
        
        // Ctrl + Shift + T for terminal
        if (e.ctrlKey && e.shiftKey && e.key === 'T') {
            e.preventDefault();
            if (!isTerminalActive) {
                toggleTerminal();
            }
        }
        
        // Escape to close terminal
        if (e.key === 'Escape' && isTerminalActive) {
            toggleTerminal();
        }
        
        // Ctrl + K to clear terminal (like in VS Code)
        if (e.ctrlKey && e.key === 'k' && isTerminalActive) {
            e.preventDefault();
            commands.clear.execute();
        }
    });
}

// Terminal functionality - Variables declared globally
let terminal, terminalOutput, terminalInput;
let isTerminalActive = false;
let commandHistory = [];
let historyIndex = -1;
let currentDirectory = '/home/brahim/portfolio';

// Terminal state
const terminalState = {
    user: 'brahim',
    hostname: 'portfolio',
    currentPath: '/home/brahim/portfolio',
    theme: 'default',
    shortcuts: true
};

// Portfolio data structure for easy updates
const portfolioData = {
    personal: {
        name: "Brahim SAADI",
        title: "MVA Student & AI Research Engineer",
        email: "brahim.saadi342@gmail.com",
        phone: "+33 (0) 745 439 657",
        location: "Paris, France",
        bio: "Passionate AI researcher and data scientist with expertise in machine learning, deep learning, NLP, and computer vision. Currently pursuing M2 MVA at ENS Paris-Saclay with hands-on experience in building AI pipelines and research projects."
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
        ]
    },
    
    projects: [
        {
            title: "FactCheckBureau Platform",
            description: "Interactive platform for designing and evaluating fact-checking analysis pipelines using BM25 retrieval and SBERT re-ranking with LLM fine-tuning.",
            technologies: ["Python", "PyTorch", "SBERT", "BM25", "LLMs", "NLP"],
            githubUrl: "#",
            liveUrl: "#",
            featured: true,
            publication: "CIKM '24: 33rd ACM International Conference on Information and Knowledge Management"
        },
        {
            title: "5G Network Self-Configuration",
            description: "Deep Q-Learning solution for self-configuration of 5G NSA sites with PCI configuration tool, reducing manual configuration time significantly.",
            technologies: ["Python", "Deep Q-Learning", "Reinforcement Learning", "5G Networks"],
            githubUrl: "#",
            liveUrl: "#",
            featured: true
        },
        {
            title: "IoT Device Classification System",
            description: "Machine learning pipeline for IoT device classification using network traffic analysis with Wireshark data capture and multiple ML models.",
            technologies: ["Python", "Scikit-Learn", "Wireshark", "Random Forest", "SVM", "KNN"],
            githubUrl: "#",
            liveUrl: "#",
            featured: true
        },
        {
            title: "Personal Portfolio Website",
            description: "Modern, responsive portfolio website with terminal functionality and interactive features.",
            technologies: ["HTML", "CSS", "JavaScript"],
            githubUrl: "#",
            liveUrl: "#",
            featured: false
        }
    ],
    
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
        },
        {
            title: "Data Science Intern - IoT Device Classification",
            company: "ERICSSON",
            period: "Feb 2023 - Jun 2023",
            description: [
                "Captured IoT device network traffic using Wireshark and performed data analysis to create a dataset",
                "Prepared the dataset through cleaning, normalization, and encoding for machine learning model training",
                "Trained and evaluated machine learning models (Random Forest, SVM, KNN) to classify IoT devices"
            ],
            technologies: ["Python", "Wireshark", "Scikit-Learn", "Data Analysis", "Random Forest", "SVM", "KNN"]
        }
    ],
    
    education: [
        {
            degree: "M2 MVA (Mathématique Vision Apprentissage)",
            institution: "ENS Paris-Saclay",
            period: "2024 - Present",
            description: "Key Courses: Convex Optimization, Object Recognition and Computer Vision, Deep Learning & Signal Processing, Time Series Analysis, Altegrad (NLP & graphs), Reinforcement Learning."
        },
        {
            degree: "Data Science & Intelligence Artificielle",
            institution: "École nationale polytechnique",
            period: "2021 - 2024",
            description: "Developed expertise in machine learning, data analysis, databases, computer vision, natural language processing, industrial engineering, communication, entrepreneurship, and project management."
        },
        {
            degree: "Classes Préparatoires",
            institution: "École nationale polytechnique",
            period: "2019 - 2021",
            description: "Successfully passed (Concours d'Accès au Grandes Écoles): ranking top 7%."
        },
        {
            degree: "Baccalaureate - Mathematics and Electrical Engineering",
            institution: "Lycée Khatab Ibrahim | Skikda, Algérie",
            period: "2019",
            description: "Mathematics and Electrical Engineering (17.68/20)"
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

// Terminal commands with enhanced functionality
const commands = {    help: {
        description: "Show available commands",
        execute: () => {
            let output = `<span class="command-success">Available Commands:</span>\n\n`;
            
            // Portfolio Commands
            output += `<span style="color: #7ce38b;">📋 Portfolio Commands:</span>\n`;
            output += `  <span class="command-success">about</span>          - Show information about me\n`;
            output += `  <span class="command-success">skills</span>         - List my technical skills\n`;
            output += `  <span class="command-success">experience</span>     - Show my work experience\n`;
            output += `  <span class="command-success">education</span>      - Show my educational background\n`;
            output += `  <span class="command-success">projects</span>       - List my projects\n`;
            output += `  <span class="command-success">certifications</span> - Show my certifications\n`;
            output += `  <span class="command-success">publications</span>   - Show my publications\n`;
            output += `  <span class="command-success">contact</span>        - Show contact information\n\n`;
            
            // Interactive & Fun Commands
            output += `<span style="color: #7ce38b;">🎮 Interactive & Fun:</span>\n`;
            output += `  <span class="command-success">game</span>           - Play number guessing game\n`;
            output += `  <span class="command-success">timer [min]</span>    - Start a countdown timer\n`;
            output += `  <span class="command-success">calc [expr]</span>    - Calculator for quick math\n`;
            output += `  <span class="command-success">weather [city]</span> - Show weather information\n`;
            output += `  <span class="command-success">joke</span>           - Tell a programming joke\n`;
            output += `  <span class="command-success">quote</span>          - Get an inspiring tech quote\n`;
            output += `  <span class="command-success">fortune</span>        - Get a random fortune\n`;
            output += `  <span class="command-success">ascii [art]</span>    - Display ASCII art\n`;
            output += `  <span class="command-success">matrix</span>         - Enter the matrix\n\n`;
            
            // System & File Commands
            output += `<span style="color: #7ce38b;">🗂️ System & Files:</span>\n`;
            output += `  <span class="command-success">ls</span>             - List directory contents\n`;
            output += `  <span class="command-success">cat [file]</span>     - Display file contents\n`;
            output += `  <span class="command-success">pwd</span>            - Show current directory\n`;
            output += `  <span class="command-success">whoami</span>         - Show current user\n`;
            output += `  <span class="command-success">date</span>           - Show current date and time\n`;
            output += `  <span class="command-success">sysinfo</span>        - Show system information\n\n`;
            
            // Customization & Tools
            output += `<span style="color: #7ce38b;">🎨 Customization & Tools:</span>\n`;
            output += `  <span class="command-success">theme [name]</span>   - Change terminal theme\n`;
            output += `  <span class="command-success">stats</span>          - Show usage statistics\n`;
            output += `  <span class="command-success">history [n]</span>    - Show command history\n`;
            output += `  <span class="command-success">search [term]</span>  - Search through commands\n`;
            output += `  <span class="command-success">random</span>         - Execute random command\n`;
            output += `  <span class="command-success">clear</span>          - Clear the terminal\n`;
            output += `  <span class="command-success">exit</span>           - Close terminal\n\n`;
            
            // Easter Eggs
            output += `<span style="color: #7ce38b;">🎭 Easter Eggs:</span>\n`;
            output += `  <span class="command-success">sudo [cmd]</span>     - Try to run as superuser\n`;
            output += `  <span class="command-success">hack</span>           - Initiate hacking sequence\n\n`;
            
            // Tips
            output += `<span style="color: #8b949e;">💡 Tips:</span>\n`;
            output += `• Use <span style="color: #7ce38b;">↑ ↓</span> arrows for command history\n`;
            output += `• Press <span style="color: #7ce38b;">Tab</span> for auto-completion\n`;
            output += `• Try aliases: h=help, c=clear, p=projects, s=skills\n`;
            output += `• Type '<span class="command-success">theme matrix</span>' for a cool effect!\n`;
            output += `• Try '<span class="command-success">random</span>' to discover new commands`;
            
            return output;
        }
    },
    
    about: {
        description: "Show information about me",
        execute: () => {
            return `<span class="command-success">About ${portfolioData.personal.name}</span>
            
${portfolioData.personal.bio}

Title: ${portfolioData.personal.title}
Location: ${portfolioData.personal.location}

Type '<span class="command-success">skills</span>' to see my technical abilities
Type '<span class="command-success">experience</span>' to see my work history
Type '<span class="command-success">projects</span>' to see my portfolio`;
        }
    },
    
    skills: {
        description: "List technical skills",
        execute: () => {
            let output = `<span class="command-success">Technical Skills</span>\n\n`;
            
            Object.keys(portfolioData.skills).forEach(category => {
                output += `<span class="command-success">${category.toUpperCase()}:</span>\n`;
                portfolioData.skills[category].forEach(skill => {
                    const bars = '█'.repeat(Math.floor(skill.level / 10)) + '░'.repeat(10 - Math.floor(skill.level / 10));
                    output += `  ${skill.name.padEnd(15)} ${bars} ${skill.level}%\n`;
                });
                output += '\n';
            });
            
            return output;
        }
    },
    
    experience: {
        description: "Show work experience",
        execute: () => {
            let output = `<span class="command-success">Work Experience</span>\n\n`;
            
            portfolioData.experience.forEach(exp => {
                output += `<span class="command-success">${exp.title}</span> at ${exp.company}\n`;
                output += `Period: ${exp.period}\n`;
                if (Array.isArray(exp.description)) {
                    exp.description.forEach(desc => {
                        output += `• ${desc}\n`;
                    });
                } else {
                    output += `${exp.description}\n`;
                }
                output += `Technologies: ${exp.technologies.join(', ')}\n\n`;
            });
            
            return output;
        }
    },
    
    education: {
        description: "Show educational background",
        execute: () => {
            let output = `<span class="command-success">Education</span>\n\n`;
            
            portfolioData.education.forEach(edu => {
                output += `<span class="command-success">${edu.degree}</span>\n`;
                output += `Institution: ${edu.institution}\n`;
                output += `Period: ${edu.period}\n`;
                output += `${edu.description}\n\n`;
            });
            
            return output;
        }
    },
    
    projects: {
        description: "List projects",
        execute: () => {
            let output = `<span class="command-success">Projects</span>\n\n`;
            
            portfolioData.projects.forEach((project, index) => {
                output += `${index + 1}. <span class="command-success">${project.title}</span>\n`;
                output += `   ${project.description}\n`;
                output += `   Tech: ${project.technologies.join(', ')}\n`;
                if (project.githubUrl && project.githubUrl !== '#') {
                    output += `   GitHub: ${project.githubUrl}\n`;
                }
                if (project.liveUrl && project.liveUrl !== '#') {
                    output += `   Live: ${project.liveUrl}\n`;
                }
                output += '\n';
            });
            
            return output;
        }
    },
    
    contact: {
        description: "Show contact information",
        execute: () => {
            return `<span class="command-success">Contact Information</span>

📧 Email: ${portfolioData.personal.email}
📱 Phone: ${portfolioData.personal.phone}
📍 Location: ${portfolioData.personal.location}

Feel free to reach out for collaboration opportunities!`;
        }
    },
    
    certifications: {
        description: "Show certifications",
        execute: () => {
            let output = `<span class="command-success">Certifications</span>\n\n`;
            
            portfolioData.certifications.forEach((cert, index) => {
                output += `${index + 1}. ${cert}\n`;
            });
            
            return output;
        }
    },
    
    publications: {
        description: "Show publications",
        execute: () => {
            let output = `<span class="command-success">Publications</span>\n\n`;
            
            portfolioData.publications.forEach(pub => {
                output += `<span class="command-success">${pub.title}</span>\n`;
                output += `Conference: ${pub.conference}\n`;
                output += `Date: ${pub.date}\n`;
                output += `Contribution: ${pub.contribution}\n\n`;
            });
            
            return output;
        }
    },
    
    clear: {
        description: "Clear terminal",
        execute: () => {
            terminalOutput.innerHTML = '';
            return '';
        }
    },
    
    ls: {
        description: "List directory contents",
        execute: () => {
            return `<span class="command-success">Directory Contents:</span>

drwxr-xr-x  about.txt
drwxr-xr-x  skills.json
drwxr-xr-x  experience.md
drwxr-xr-x  education.md
drwxr-xr-x  projects/
drwxr-xr-x  certifications.txt
drwxr-xr-x  publications.md
drwxr-xr-x  contact.info
-rw-r--r--  resume.pdf
-rw-r--r--  portfolio.html`;
        }
    },
    
    cat: {
        description: "Display file contents",
        execute: (args) => {
            const file = args[0];
            if (!file) {
                return `<span class="command-error">Usage: cat [filename]</span>`;
            }
            
            switch (file) {
                case 'about.txt':
                    return commands.about.execute();
                case 'skills.json':
                    return commands.skills.execute();
                case 'experience.md':
                    return commands.experience.execute();
                case 'education.md':
                    return commands.education.execute();
                case 'certifications.txt':
                    return commands.certifications.execute();
                case 'publications.md':
                    return commands.publications.execute();
                case 'contact.info':
                    return commands.contact.execute();
                case 'resume.pdf':
                    return `<span class="command-error">Cannot display binary file. Use 'about' command instead.</span>`;
                default:
                    return `<span class="command-error">File not found: ${file}</span>`;
            }
        }
    },
    
    whoami: {
        description: "Show current user",
        execute: () => {
            return `brahim`;
        }
    },
    
    pwd: {
        description: "Show current directory",
        execute: () => {
            return `/home/brahim/portfolio`;
        }
    },
    
    date: {
        description: "Show current date and time",
        execute: () => {
            return new Date().toString();
        }
    },
    
    theme: {
        description: "Change terminal theme",
        execute: (args) => {
            const color = args[0];
            if (!color) {
                return `<span class="command-error">Usage: theme [green|blue|red|purple]</span>`;
            }
            
            const colors = {
                green: '#00d4aa',
                blue: '#007acc',
                red: '#ff6b6b',
                purple: '#9c88ff'
            };
            
            if (colors[color]) {
                document.documentElement.style.setProperty('--primary-color', colors[color]);
                return `<span class="command-success">Theme changed to ${color}</span>`;
            } else {
                return `<span class="command-error">Unknown theme: ${color}</span>`;
            }
        }
    },
    
    exit: {
        description: "Close terminal",
        execute: () => {
            toggleTerminal();
            return '';
        }
    },
    
    // File system commands
    cd: {
        description: "Change directory",
        execute: (args) => {
            if (!args[0]) {
                terminalState.currentPath = '/home/brahim/portfolio';
                return `<span class="command-success">Changed to home directory</span>`;
            }
            
            const path = args[0];
            const validPaths = {
                '..': '/home/brahim',
                '../': '/home/brahim',
                '/': '/',
                '~': '/home/brahim/portfolio',
                'projects': '/home/brahim/portfolio/projects',
                'documents': '/home/brahim/portfolio/documents',
                'skills': '/home/brahim/portfolio/skills'
            };
            
            if (validPaths[path]) {
                terminalState.currentPath = validPaths[path];
                return `<span class="command-success">Changed directory to ${terminalState.currentPath}</span>`;
            } else {
                return `<span class="command-error">bash: cd: ${path}: No such file or directory</span>`;
            }
        }
    },
    
    tree: {
        description: "Display directory tree structure",
        execute: () => {
            return `<span class="command-success">Portfolio Directory Structure:</span>

📁 /home/brahim/portfolio/
├── 📄 about.txt
├── 📄 contact.info
├── 📄 resume.pdf
├── 📁 projects/
│   ├── 📄 factcheck-bureau.md
│   ├── 📄 5g-network-config.md
│   ├── 📄 iot-classification.md
│   └── 📄 portfolio-website.md
├── 📁 skills/
│   ├── 📄 programming.json
│   ├── 📄 ai-ml.json
│   ├── 📄 frameworks.json
│   └── 📄 languages.json
├── 📁 experience/
│   ├── 📄 inria-factcheck.md
│   ├── 📄 inria-5g.md
│   └── 📄 ericsson.md
├── 📁 education/
│   ├── 📄 mva-ens.md
│   ├── 📄 data-science.md
│   └── 📄 preparatory.md
└── 📁 documents/
    ├── 📄 certifications.txt
    ├── 📄 publications.md
    └── 📄 achievements.log`;
        }
    },
    
    // System information commands
    uname: {
        description: "Show system information",
        execute: (args) => {
            const flag = args[0];
            switch(flag) {
                case '-a':
                    return `Portfolio-Linux 5.15.0-portfolio #1 SMP x86_64 GNU/Linux`;
                case '-r':
                    return `5.15.0-portfolio`;
                case '-m':
                    return `x86_64`;
                default:
                    return `Portfolio-Linux`;
            }
        }
    },
    
    ps: {
        description: "Show running processes",
        execute: () => {
            return `<span class="command-success">PID  TTY      TIME     CMD</span>
1001 pts/1    00:00:01 portfolio-server
1002 pts/1    00:00:00 skill-monitor
1003 pts/1    00:00:02 project-indexer
1004 pts/1    00:00:00 terminal-shell
1005 pts/1    00:00:01 contact-listener`;
        }
    },
    
    uptime: {
        description: "Show system uptime",
        execute: () => {
            const now = new Date();
            const uptime = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
            return `${uptime} up 42 days, 13:37, 1 user, load average: 0.42, 0.38, 0.41`;
        }
    },
    
    // Network tools
    ping: {
        description: "Send ICMP ping packets",
        execute: (args) => {
            const host = args[0] || 'github.com';
            return `<span class="command-success">PING ${host} (140.82.121.4): 56 data bytes</span>
64 bytes from ${host}: icmp_seq=0 ttl=64 time=12.4 ms
64 bytes from ${host}: icmp_seq=1 ttl=64 time=11.8 ms
64 bytes from ${host}: icmp_seq=2 ttl=64 time=13.2 ms

--- ${host} ping statistics ---
3 packets transmitted, 3 packets received, 0.0% packet loss
round-trip min/avg/max/stddev = 11.8/12.5/13.2/0.7 ms`;
        }
    },
    
    curl: {
        description: "Transfer data from servers",
        execute: (args) => {
            const url = args[0];
            if (!url) {
                return `<span class="command-error">curl: try 'curl --help' for more information</span>`;
            }
            
            if (url.includes('api') || url.includes('github')) {
                return `<span class="command-success">HTTP/1.1 200 OK</span>
Content-Type: application/json
{
  "message": "API endpoint simulated successfully",
  "status": "active",
  "developer": "${portfolioData.personal.name}"
}`;
            }
            
            return `<span class="command-success">Successfully connected to ${url}</span>
<span class="command-success">Data transfer completed ✓</span>`;
        }
    },
    
    // Development tools
    git: {
        description: "Git version control",
        execute: (args) => {
            const subcommand = args[0];
            
            switch(subcommand) {
                case 'status':
                    return `<span class="command-success">On branch main</span>
Your branch is up to date with 'origin/main'.

Changes not staged for commit:
  modified:   experience/new-role.md
  modified:   skills/ai-ml.json

Untracked files:
  projects/new-project.md

no changes added to commit (use "git add" to track)`;
                    
                case 'log':
                    return `<span class="command-success">commit a1b2c3d4e5f6</span> (HEAD -> main, origin/main)
Author: ${portfolioData.personal.name} <${portfolioData.personal.email}>
Date:   ${new Date().toDateString()}

    feat: Enhanced terminal with advanced features
    
<span class="command-success">commit 9f8e7d6c5b4a</span>
Author: ${portfolioData.personal.name} <${portfolioData.personal.email}>
Date:   ${new Date(Date.now() - 86400000).toDateString()}

    docs: Updated portfolio with latest projects`;
                    
                case 'branch':
                    return `* <span class="command-success">main</span>
  feature/terminal-enhancements
  feature/new-projects`;
                    
                default:
                    return `<span class="command-success">git version 2.34.1</span>
usage: git [--version] [--help] [-C <path>] [-c <name>=<value>]
           [--exec-path[=<path>]] [--html-path] [--man-path] [--info-path]
           [-p | --paginate | -P | --no-pager] [--no-replace-objects] [--bare]
           [--git-dir=<path>] [--work-tree=<path>] [--namespace=<name>]
           <command> [<args>]

Most commonly used git commands:
   status    Show the working tree status
   log       Show commit logs
   branch    List, create, or delete branches`;
            }
        }
    },
    
    npm: {
        description: "Node package manager",
        execute: (args) => {
            const command = args[0];
            
            switch(command) {
                case 'version':
                case '-v':
                    return `npm: 9.5.1
node: v18.16.0
portfolio-terminal: 1.0.0`;
                    
                case 'list':
                case 'ls':
                    return `portfolio-website@1.0.0 /home/brahim/portfolio
├── animations@1.2.0
├── responsive-design@2.1.0
├── terminal-emulator@1.0.0
└── modern-ui@3.0.1`;
                    
                default:
                    return `<span class="command-success">npm <command></span>

Usage:
npm <command>

where <command> is one of:
    install, i, list, ls, version

npm <command> -h  quick help on <command>`;
            }
        }
    },
    
    // Fun commands and easter eggs
    fortune: {
        description: "Display a random fortune",
        execute: () => {
            const fortunes = [
                "The best way to predict the future is to invent it. - Alan Kay",
                "Code is like humor. When you have to explain it, it's bad. - Cory House",
                "First, solve the problem. Then, write the code. - John Johnson",
                "The only way to learn a new programming language is by writing programs in it. - Dennis Ritchie",
                "Talk is cheap. Show me the code. - Linus Torvalds",
                "Programs must be written for people to read, and only incidentally for machines to execute. - Harold Abelson",
                "Any fool can write code that a computer can understand. Good programmers write code that humans can understand. - Martin Fowler",
                "Debugging is twice as hard as writing the code in the first place. - Brian Kernighan"
            ];
            
            const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
            return `<span style="color: #7ce38b; font-style: italic;">💫 ${randomFortune}</span>`;
        }
    },
    
    cowsay: {
        description: "Make a cow say something",
        execute: (args) => {
            const message = args.join(' ') || 'Hello from my portfolio!';
            const messageLength = message.length;
            const border = '-'.repeat(messageLength + 2);
            
            return `<pre style="color: #7ce38b;">
 ${border}
< ${message} >
 ${border}
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||
</pre>`;
        }
    },
    
    lolcat: {
        description: "Make text rainbow colored",
        execute: (args) => {
            const text = args.join(' ') || 'Welcome to my colorful portfolio!';
            const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff'];
            
            let coloredText = '';
            for (let i = 0; i < text.length; i++) {
                const color = colors[i % colors.length];
                coloredText += `<span style="color: ${color};">${text[i]}</span>`;
            }
            
            return coloredText;
        }
    },
    
    figlet: {
        description: "Create ASCII art text",
        execute: (args) => {
            const text = args.join(' ') || 'BRAHIM';
            
            if (text.toUpperCase() === 'BRAHIM') {
                return `<pre style="color: #00d4aa; font-weight: bold;">
██████  ██████   █████  ██   ██ ██ ███    ███ 
██   ██ ██   ██ ██   ██ ██   ██ ██ ████  ████ 
██████  ██████  ███████ ███████ ██ ██ ████ ██ 
██   ██ ██   ██ ██   ██ ██   ██ ██ ██  ██  ██ 
██████  ██   ██ ██   ██ ██   ██ ██ ██      ██ 
</pre>`;
            }
            
            return `<pre style="color: #00d4aa;">
ASCII Art for: ${text}
(Simulated figlet output)
</pre>`;
        }
    },
    
    // System monitoring
    top: {
        description: "Display running processes",
        execute: () => {
            return `<span class="command-success">top - ${new Date().toTimeString().split(' ')[0]} up 42 days, 13:37, 1 user, load average: 0.42, 0.38, 0.41</span>
Tasks: 156 total, 1 running, 155 sleeping
%Cpu(s): 2.3 us, 1.2 sy, 0.0 ni, 96.1 id, 0.4 wa

  PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND
 1001 brahim    20   0  234156  45232  12456 S   5.3   2.1   0:32.12 portfolio
 1002 brahim    20   0  123456  23456   8432 S   2.1   1.1   0:15.43 terminal
 1003 brahim    20   0   98432  18234   6543 S   1.2   0.8   0:08.21 skills
 1004 brahim    20   0   87654  16789   5432 S   0.8   0.7   0:05.67 projects`;
        }
    },
    
    df: {
        description: "Display filesystem disk space usage",
        execute: () => {
            return `<span class="command-success">Filesystem     1K-blocks    Used Available Use% Mounted on</span>
/dev/portfolio    976762020  234567  742194453  24% /
/dev/skills        52428800  12345    52416455   1% /skills
/dev/projects     104857600  45678   104811922  43% /projects
/dev/experience    20971520   8901    20962619  42% /experience
tmpfs               8388608      0     8388608   0% /tmp`;
        }
    },
    
    // Terminal customization
    colors: {
        description: "Test terminal colors",
        execute: () => {
            return `<span class="command-success">Terminal Color Test:</span>

<span style="color: #ff6b6b;">🔴 Red</span>    <span style="color: #4ecdc4;">🟢 Green</span>  <span style="color: #45b7d1;">🔵 Blue</span>   <span style="color: #feca57;">🟡 Yellow</span>
<span style="color: #ff9ff3;">🟣 Purple</span> <span style="color: #96ceb4;">🟢 Mint</span>   <span style="color: #f8b500;">🟠 Orange</span> <span style="color: #e056fd;">💜 Violet</span>

<span style="background: #ff6b6b; color: white; padding: 2px 8px;">Background Colors</span> <span style="background: #4ecdc4; color: white; padding: 2px 8px;">Work</span> <span style="background: #45b7d1; color: white; padding: 2px 8px;">Too!</span>`;
        }
    },
    
    alias: {
        description: "Create command aliases",
        execute: (args) => {
            if (args.length === 0) {
                return `<span class="command-success">Current aliases:</span>
ll='ls -la'
la='ls -A'
l='ls -CF'
..='cd ..'
...='cd ../..'
grep='grep --color=auto'
projects='cat projects.md'
resume='cat about.txt && echo && cat experience.md'`;
            }
            
            return `<span class="command-success">Alias created: ${args.join(' ')}</span>
<span style="color: #8b949e;">Note: Aliases are simulated in this terminal demo</span>`;
        }
    },
    
    // Network and system
    netstat: {
        description: "Display network connections",
        execute: () => {
            return `<span class="command-success">Active Internet connections (servers and established)</span>
Proto Recv-Q Send-Q Local Address           Foreign Address         State
tcp        0      0 0.0.0.0:80              0.0.0.0:*               LISTEN
tcp        0      0 0.0.0.0:443             0.0.0.0:*               LISTEN
tcp        0      0 127.0.0.1:3000          0.0.0.0:*               LISTEN
tcp        0      0 portfolio.dev:80        client.github.com:443   ESTABLISHED`;
        }
    },
    
    which: {
        description: "Locate a command",
        execute: (args) => {
            const command = args[0];
            if (!command) {
                return `<span class="command-error">which: missing operand</span>`;
            }
            
            if (commands[command]) {
                return `/usr/local/bin/${command}`;
            } else {
                return `<span class="command-error">${command} not found</span>`;
            }
        }
    },
    
    // Enhanced terminal commands with fun features
    weather: {
        description: "Show weather information",
        execute: (args) => {
            const city = args[0] || 'Paris';
            // Simulated weather data
            const weather = {
                'paris': { temp: '22°C', condition: '☀️ Sunny', humidity: '65%' },
                'london': { temp: '18°C', condition: '🌧️ Rainy', humidity: '80%' },
                'new york': { temp: '25°C', condition: '⛅ Partly Cloudy', humidity: '70%' },
                'tokyo': { temp: '28°C', condition: '🌤️ Partly Sunny', humidity: '75%' }
            };
            
            const cityData = weather[city.toLowerCase()] || weather['paris'];
            
            return `<span class="command-success">Weather for ${city.charAt(0).toUpperCase() + city.slice(1)}</span>

🌡️  Temperature: ${cityData.temp}
☁️  Condition: ${cityData.condition}
💧 Humidity: ${cityData.humidity}
🕐 Updated: ${new Date().toLocaleTimeString()}

<span style="color: #8b949e;">Note: This is simulated weather data for demo purposes</span>`;
        }
    },
    
    joke: {
        description: "Tell a programming joke",
        execute: () => {
            const jokes = [
                "Why do programmers prefer dark mode? Because light attracts bugs! 🐛",
                "How many programmers does it take to change a light bulb? None, that's a hardware problem! 💡",
                "Why do Python programmers prefer snake_case? Because they can't C the point of camelCase! 🐍",
                "What's the object-oriented way to become wealthy? Inheritance! 💰",
                "Why don't programmers like nature? It has too many bugs! 🌲🐞",
                "How do you comfort a JavaScript bug? You console it! 😄",
                "Why did the developer go broke? Because he used up all his cache! 💸",
                "What do you call a programmer from Finland? Nerdic! 🇫🇮"
            ];
            
            const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
            return `<span class="command-success">Programming Joke</span>

${randomJoke}

<span style="color: #8b949e;">Type 'joke' again for another one! 😊</span>`;
        }
    },
    
    sysinfo: {
        description: "Show system information",
        execute: () => {
            const userAgent = navigator.userAgent;
            const platform = navigator.platform;
            const language = navigator.language;
            const cookieEnabled = navigator.cookieEnabled;
            const onlineStatus = navigator.onLine ? 'Online' : 'Offline';
            
            return `<span class="command-success">System Information</span>

🖥️  Platform: ${platform}
🌐 Browser: ${userAgent.split(' ').pop()}
🗣️  Language: ${language}
🍪 Cookies: ${cookieEnabled ? 'Enabled' : 'Disabled'}
📡 Status: ${onlineStatus}
⏰ Timezone: ${Intl.DateTimeFormat().resolvedOptions().timeZone}
📱 Screen: ${screen.width}x${screen.height}
🎨 Color Depth: ${screen.colorDepth}-bit

<span style="color: #8b949e;">Portfolio Terminal v2.1.0</span>`;
        }
    },
    
    ascii: {
        description: "Display ASCII art",
        execute: (args) => {
            const art = args[0] || 'portfolio';
            
            const artCollection = {
                portfolio: `
<span style="color: #00d4aa;">
    ██████╗  ██████╗ ██████╗ ████████╗███████╗ ██████╗ ██╗     ██╗ ██████╗ 
    ██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝██╔════╝██╔═══██╗██║     ██║██╔═══██╗
    ██████╔╝██║   ██║██████╔╝   ██║   █████╗  ██║   ██║██║     ██║██║   ██║
    ██╔═══╝ ██║   ██║██╔══██╗   ██║   ██╔══╝  ██║   ██║██║     ██║██║   ██║
    ██║     ╚██████╔╝██║  ██║   ██║   ██║     ╚██████╔╝███████╗██║╚██████╔╝
    ╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝      ╚═════╝ ╚══════╝╚═╝ ╚═════╝ 
</span>`,
                computer: `
<span style="color: #7ce38b;">
    ┌─────────────────────────────────┐
    │  ████████████████████████████   │
    │  ██                        ██   │
    │  ██  > Terminal Ready      ██   │
    │  ██  > System Online       ██   │
    │  ██  > Welcome Brahim!     ██   │
    │  ██                        ██   │
    │  ████████████████████████████   │
    └─────────────────────────────────┘
         ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
</span>`,
                rocket: `
<span style="color: #ff6b6b;">
           /\\
          /  \\
         |    |
        /| ❤️ |\\
       / |____| \\
      /  ██████  \\
     /   ██████   \\
    /    ██████    \\
   /     ██████     \\
  /      ██████      \\
 /                    \\
/_____________________\\
     \\             /
      \\___________/
         🔥🔥🔥
</span>`
            };
            
            if (artCollection[art]) {
                return artCollection[art];
            } else {
                return `<span class="command-error">ASCII art '${art}' not found</span>

Available art: ${Object.keys(artCollection).join(', ')}`;
            }
        }
    },
    
    matrix: {
        description: "Enter the matrix",
        execute: () => {
            // Add matrix effect to terminal
            setTimeout(() => {
                const matrixChars = '01アイウエオカキクケコサシスセソタチツテト';
                let matrixOutput = '';
                
                for (let i = 0; i < 10; i++) {
                    let line = '';
                    for (let j = 0; j < 50; j++) {
                        line += matrixChars[Math.floor(Math.random() * matrixChars.length)];
                    }
                    matrixOutput += `<span style="color: #00ff00; font-family: monospace;">${line}</span>\n`;
                }
                
                addToTerminal(matrixOutput);
            }, 1000);
            
            return `<span style="color: #00ff00;">Wake up, ${portfolioData.personal.name}...</span>
<span style="color: #00ff00;">The Matrix has you...</span>
<span style="color: #00ff00;">Follow the white rabbit...</span>

<span style="color: #ff0000;">💊 RED PILL</span> or <span style="color: #0000ff;">💊 BLUE PILL</span>?

<span style="color: #8b949e;">Matrix code incoming...</span>`;
        }
    },
    
    game: {
        description: "Play a guessing game",
        execute: (args) => {
            if (!window.currentGame) {
                window.currentGame = {
                    number: Math.floor(Math.random() * 100) + 1,
                    attempts: 0,
                    maxAttempts: 7
                };
                
                return `<span class="command-success">🎮 Number Guessing Game Started!</span>

I'm thinking of a number between 1 and 100.
You have ${window.currentGame.maxAttempts} attempts to guess it!

Usage: game [number] to make a guess
Example: game 50

Good luck! 🍀`;
            }
            
            const guess = parseInt(args[0]);
            if (isNaN(guess)) {
                return `<span class="command-error">Please enter a valid number!</span>

Usage: game [number]
Example: game 50`;
            }
            
            window.currentGame.attempts++;
            const attemptsLeft = window.currentGame.maxAttempts - window.currentGame.attempts;
            
            if (guess === window.currentGame.number) {
                const score = Math.max(0, 100 - (window.currentGame.attempts - 1) * 15);
                const result = `<span class="command-success">🎉 CONGRATULATIONS!</span>

You guessed it! The number was ${window.currentGame.number}
Attempts: ${window.currentGame.attempts}/${window.currentGame.maxAttempts}
Score: ${score}/100

<span style="color: #7ce38b;">Excellent work! 🏆</span>

Type 'game' to start a new game!`;
                
                delete window.currentGame;
                return result;
            }
            
            if (attemptsLeft === 0) {
                const result = `<span class="command-error">💥 Game Over!</span>

You ran out of attempts! The number was ${window.currentGame.number}

Better luck next time! 🎯
Type 'game' to start a new game!`;
                
                delete window.currentGame;
                return result;
            }
            
            const hint = guess < window.currentGame.number ? '📈 Too low!' : '📉 Too high!';
            
            return `${hint}

Attempts left: ${attemptsLeft}
Keep trying! You can do it! 💪`;
        }
    },
    
    fortune: {
        description: "Get a random fortune/quote",
        execute: () => {
            const fortunes = [
                "\"The best time to plant a tree was 20 years ago. The second best time is now.\" - Chinese Proverb 🌳",
                "\"Your limitation—it's only your imagination.\" 💭",
                "\"The future belongs to those who believe in the beauty of their dreams.\" - Eleanor Roosevelt ✨",
                "\"It is during our darkest moments that we must focus to see the light.\" - Aristotle 🕯️",
                "\"Success is not final, failure is not fatal: it is the courage to continue that counts.\" - Winston Churchill 💪",
                "\"The only impossible journey is the one you never begin.\" - Tony Robbins 🚀",
                "\"In the middle of difficulty lies opportunity.\" - Albert Einstein 🌟",
                "\"Code is poetry written for machines to understand and humans to admire.\" 💻",
                "\"The expert in anything was once a beginner.\" - Helen Hayes 🎯",
                "\"Innovation distinguishes between a leader and a follower.\" - Steve Jobs 🍎"
            ];
            
            const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
            
            return `<span class="command-success">🔮 Fortune Cookie</span>

"${randomFortune.text}"

<span style="color: #8b949e;">— ${randomFortune.author}</span>

<span style="color: #7ce38b;">Keep coding! 🚀</span>`;
        }
    },
    
    timer: {
        description: "Start a countdown timer",
        execute: (args) => {
            const minutes = parseInt(args[0]);
            if (isNaN(minutes) || minutes <= 0) {
                return `<span class="command-error">Usage: timer [minutes]</span>

Example: timer 25 (for a 25-minute pomodoro session)`;
            }
            
            const totalSeconds = minutes * 60;
            let remainingSeconds = totalSeconds;
            
            const updateTimer = () => {
                const mins = Math.floor(remainingSeconds / 60);
                const secs = remainingSeconds % 60;
                const timeStr = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
                
                // Update the last timer display in terminal
                const timerElements = document.querySelectorAll('.timer-display');
                if (timerElements.length > 0) {
                    const lastTimer = timerElements[timerElements.length - 1];
                    if (remainingSeconds > 0) {
                        lastTimer.innerHTML = `⏰ Timer: ${timeStr} remaining...`;
                    } else {
                        lastTimer.innerHTML = `<span style="color: #00d4aa;">🎉 Timer finished! Time for a break! 🎉</span>`;
                        // Optional: Play a sound or show notification
                        return;
                    }
                }
                
                remainingSeconds--;
                if (remainingSeconds >= 0) {
                    setTimeout(updateTimer, 1000);
                }
            };
            
            setTimeout(updateTimer, 1000);
            
            return `<span class="command-success">⏰ Timer Started!</span>

<div class="timer-display">⏰ Timer: ${minutes}:00 remaining...</div>

Focus time! 🎯 I'll let you know when time's up!

<span style="color: #8b949e;">Tip: Try a 25-minute pomodoro session for maximum productivity!</span>`;
        }
    },
    
    calc: {
        description: "Simple calculator",
        execute: (args) => {
            const expression = args.join(' ');
            if (!expression) {
                return `<span class="command-error">Usage: calc [expression]</span>

Examples:
  calc 2 + 2
  calc 10 * 5
  calc 100 / 4
  calc 2 ** 8`;
            }
            
            try {
                // Simple safety check for basic math operations
                const safeExpression = expression.replace(/[^0-9+\-*/.() ]/g, '');
                if (safeExpression !== expression) {
                    throw new Error('Invalid characters in expression');
                }
                
                const result = eval(safeExpression);
                
                return `<span class="command-success">🧮 Calculator</span>

${expression} = <span style="color: #00d4aa; font-size: 1.2em; font-weight: bold;">${result}</span>`;
                
            } catch (error) {
                return `<span class="command-error">Invalid expression: ${expression}</span>

Please use basic math operations: +, -, *, /, (), **`;
            }
        }
    },
    
    quote: {
        description: "Get an inspiring tech quote",
        execute: () => {
            const quotes = [
                {
                    text: "Talk is cheap. Show me the code.",
                    author: "Linus Torvalds"
                },
                {
                    text: "The best error message is the one that never shows up.",
                    author: "Thomas Fuchs"
                },
                {
                    text: "First, solve the problem. Then, write the code.",
                    author: "John Johnson"
                },
                {
                    text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
                    author: "Martin Fowler"
                },
                {
                    text: "Experience is the name everyone gives to their mistakes.",
                    author: "Oscar Wilde"
                },
                {
                    text: "The most important property of a program is whether it accomplishes the intention of its user.",
                    author: "C.A.R. Hoare"
                },
                {
                    text: "Simplicity is the ultimate sophistication.",
                    author: "Leonardo da Vinci"
                }
            ];
            
            const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
            
            return `<span class="command-success">💡 Inspirational Quote</span>

"${randomQuote.text}"

<span style="color: #8b949e;">— ${randomQuote.author}</span>

<span style="color: #7ce38b;">Keep coding! 🚀</span>`;
        }
    }
};

// Command aliases for better user experience
const commandAliases = {
    'h': 'help',
    'c': 'clear',
    'cls': 'clear',
    'p': 'projects',
    's': 'skills',
    'e': 'experience',
    'ed': 'education',
    'w': 'whoami',
    'info': 'about',
    'resume': 'about',
    'cv': 'about',
    'contact-info': 'contact',
    'certificates': 'certifications',
    'pubs': 'publications',
    'weather-paris': 'weather paris',
    'sysinfo': 'sysinfo',
    'system': 'sysinfo',
    'tell-joke': 'joke',
    'random-quote': 'quote',
    'inspire': 'fortune'
};

// Enhanced execute command function with aliases
function executeCommandWithAlias(input) {
    function executeCommandWithAlias(input) {
    if (input.trim() === '') return;
    
    // Check for aliases
    const parts = input.trim().split(' ');
    const command = parts[0].toLowerCase();
    
    if (commandAliases[command]) {
        const aliasedCommand = commandAliases[command];
        const remainingArgs = parts.slice(1);
        input = aliasedCommand + (remainingArgs.length > 0 ? ' ' + remainingArgs.join(' ') : '');
    }
    
    executeCommand(input);
}

// Command similarity checking functions
function findSimilarCommands(input) {
    const commandNames = Object.keys(commands);
    return commandNames.filter(cmd => {
        return cmd.includes(input) || input.includes(cmd) || levenshteinDistance(cmd, input) <= 2;
    }).slice(0, 3);
}

function levenshteinDistance(str1, str2) {
    const matrix = [];
    for (let i = 0; i <= str2.length; i++) {
        matrix[i] = [i];
    }
    for (let j = 0; j <= str1.length; j++) {
        matrix[0][j] = j;
    }
    for (let i = 1; i <= str2.length; i++) {
        for (let j = 1; j <= str1.length; j++) {
            if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1,
                    matrix[i][j - 1] + 1,
                    matrix[i - 1][j] + 1
                );
            }
        }
    }
    return matrix[str2.length][str1.length];
}

// Terminal statistics tracking
let terminalStats = {
    commandsExecuted: 0,
    sessionStart: new Date(),
    favoriteCommands: {},
    lastCommand: null
};

// Enhanced command tracking
function trackCommand(command) {
    terminalStats.commandsExecuted++;
    terminalStats.lastCommand = command;
    
    if (terminalStats.favoriteCommands[command]) {
        terminalStats.favoriteCommands[command]++;
    } else {
        terminalStats.favoriteCommands[command] = 1;
    }
}

// Add stats command
commands['stats'] = {
    description: "Show terminal usage statistics",
    execute: () => {
        const sessionDuration = Math.floor((new Date() - terminalStats.sessionStart) / 1000);
        const hours = Math.floor(sessionDuration / 3600);
        const minutes = Math.floor((sessionDuration % 3600) / 60);
        const seconds = sessionDuration % 60;
        
        const topCommands = Object.entries(terminalStats.favoriteCommands)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 5);
            
        let output = `<span class="command-success">📊 Terminal Statistics</span>

Session started: ${terminalStats.sessionStart.toLocaleString()}
Duration: ${hours}h ${minutes}m ${seconds}s
Commands executed: ${terminalStats.commandsExecuted}
Last command: ${terminalStats.lastCommand || 'none'}

<span class="command-success">Top Commands:</span>`;

        topCommands.forEach(([cmd, count], index) => {
            const bar = '█'.repeat(Math.min(count, 20));
            output += `\n${index + 1}. ${cmd.padEnd(12)} ${bar} ${count}`;
        });
        
        output += `\n\n<span style="color: #8b949e;">Keep exploring! Type 'help' to see all commands.</span>`;
        
        return output;
    }
};

// Enhanced help command with search functionality
commands['search'] = {
    description: "Search through available commands",
    execute: (args) => {
        const searchTerm = args.join(' ').toLowerCase();
        if (!searchTerm) {
            return `<span class="command-error">Usage: search [term]</span>

Example: search project
Example: search skill`;
        }
        
        const matchingCommands = Object.entries(commands)
            .filter(([cmd, obj]) => 
                cmd.includes(searchTerm) || 
                obj.description.toLowerCase().includes(searchTerm)
            );
            
        if (matchingCommands.length === 0) {
            return `<span class="command-error">No commands found matching '${searchTerm}'</span>

Try: search help, search info, search game`;
        }
        
        let output = `<span class="command-success">🔍 Search Results for '${searchTerm}'</span>\n\n`;
        
        matchingCommands.forEach(([cmd, obj]) => {
            output += `<span style="color: #7ce38b;">${cmd}</span> - ${obj.description}\n`;
        });
        
        return output;
    }
};

// Add random command
commands['random'] = {
    description: "Execute a random command",
    execute: () => {
        const availableCommands = Object.keys(commands).filter(cmd => 
            !['random', 'clear', 'exit'].includes(cmd)
        );
        const randomCmd = availableCommands[Math.floor(Math.random() * availableCommands.length)];
        
        addToTerminal(`<span style="color: #8b949e;">🎲 Executing random command: <span class="command-success">${randomCmd}</span></span>`);
        
        setTimeout(() => {
            executeCommand(randomCmd);
        }, 500);
        
        return '';
    }
};

// Easter egg commands for fun
commands['sudo'] = {
    description: "Execute commands as superuser",
    execute: (args) => {
        if (args.length === 0) {
            return `<span class="command-error">sudo: a command is required</span>`;
        }
        
        const command = args.join(' ');
        
        if (command === 'rm -rf /') {
            return `<span class="command-error">[sudo] password for brahim: </span>
<span class="command-error">sudo: rm: Permission denied</span>
<span class="command-success">Nice try! But this portfolio is protected! 🛡️</span>

<span style="color: #8b949e;">Fun fact: This command would delete everything on a Unix system!</span>`;
        }
        
        return `<span class="command-error">[sudo] password for brahim: </span>
<span class="command-error">Sorry, user brahim is not in the sudoers file. This incident will be reported.</span>
<span class="command-success">Just kidding! You can't break my portfolio that easily 😄</span>

<span style="color: #8b949e;">Try: sudo rm -rf / for a special message!</span>`;
    }
};

commands['hack'] = {
    description: "Initiate hacking sequence (just for fun)",
    execute: () => {
        const hackingSteps = [
            "🔍 Scanning network for vulnerabilities...",
            "🎯 Target acquired: portfolio.brahim.dev",
            "🔓 Attempting to bypass firewall...",
            "⚠️  FIREWALL DETECTED!",
            "🛡️  Security protocols activated!",
            "❌ ACCESS DENIED",
            "😎 Nice try! This portfolio is hack-proof!"
        ];
        
        let output = `<span style="color: #ff0000;">🚨 HACKING INITIATED 🚨</span>\n\n`;
        
        hackingSteps.forEach((step, index) => {
            setTimeout(() => {
                addToTerminal(`<span style="color: ${index < 6 ? '#00ff00' : '#ff6b6b'};">${step}</span>`);
                if (index === hackingSteps.length - 1) {
                    addToTerminal(`\n<span style="color: #8b949e;">Just kidding! This is a harmless easter egg 🥚</span>`);
                }
            }, index * 800);
        });
        
        return output;
    }
};

// Persistent command history using localStorage
function saveCommandHistory() {
    try {
        localStorage.setItem('terminal_history', JSON.stringify(commandHistory));
        localStorage.setItem('terminal_stats', JSON.stringify(terminalStats));
    } catch (e) {
        // Handle localStorage errors gracefully
        console.log('Could not save terminal history');
    }
}

function loadCommandHistory() {
    try {
        const savedHistory = localStorage.getItem('terminal_history');
        const savedStats = localStorage.getItem('terminal_stats');
        
        if (savedHistory) {
            commandHistory = JSON.parse(savedHistory);
        }
        
        if (savedStats) {
            terminalStats = { ...terminalStats, ...JSON.parse(savedStats) };
            terminalStats.sessionStart = new Date(); // Reset session start
        }
    } catch (e) {
        console.log('Could not load terminal history');
    }
}

// Enhanced theme system
const terminalThemes = {
    default: {
        primary: '#00d4aa',
        background: 'rgba(13, 17, 23, 0.95)',
        text: '#e6edf3',
        success: '#00d4aa',
        error: '#f85149',
        warning: '#ffa500'
    },
    matrix: {
        primary: '#00ff00',
        background: 'rgba(0, 0, 0, 0.95)',
        text: '#00ff00',
        success: '#00ff00',
        error: '#ff0000',
        warning: '#ffff00'
    },
    cyberpunk: {
        primary: '#ff0080',
        background: 'rgba(16, 0, 32, 0.95)',
        text: '#ff00ff',
        success: '#00ffff',
        error: '#ff0040',
        warning: '#ffff00'
    },
    ocean: {
        primary: '#00bfff',
        background: 'rgba(0, 30, 60, 0.95)',
        text: '#87ceeb',
        success: '#00ffff',
        error: '#ff6b6b',
        warning: '#ffd700'
    },
    sunset: {
        primary: '#ff6b35',
        background: 'rgba(30, 15, 0, 0.95)',
        text: '#ffd4a3',
        success: '#ffab00',
        error: '#ff3030',
        warning: '#ffc107'
    }
};

// Enhanced theme command
commands['theme'] = {
    description: "Change terminal theme [default|matrix|cyberpunk|ocean|sunset]",
    execute: (args) => {
        const themeName = args[0];
        
        if (!themeName) {
            let output = `<span class="command-success">🎨 Available Themes:</span>\n\n`;
            Object.keys(terminalThemes).forEach(theme => {
                output += `<span style="color: ${terminalThemes[theme].primary};">● ${theme}</span> - ${theme.charAt(0).toUpperCase() + theme.slice(1)} theme\n`;
            });
            output += `\nUsage: theme [theme-name]`;
            return output;
        }
        
        if (terminalThemes[themeName]) {
            applyTerminalTheme(themeName);
            localStorage.setItem('terminal_theme', themeName);
            return `<span class="command-success">🎨 Theme changed to '${themeName}'</span>

Theme colors updated! ✨`;
        } else {
            return `<span class="command-error">Unknown theme: ${themeName}</span>

Available themes: ${Object.keys(terminalThemes).join(', ')}`;
        }
    }
};

function applyTerminalTheme(themeName) {
    const theme = terminalThemes[themeName];
    const terminal = document.getElementById('terminal');
    
    // Apply theme colors
    terminal.style.setProperty('--terminal-bg', theme.background);
    terminal.style.setProperty('--terminal-text', theme.text);
    terminal.style.setProperty('--terminal-primary', theme.primary);
    terminal.style.setProperty('--terminal-success', theme.success);
    terminal.style.setProperty('--terminal-error', theme.error);
    terminal.style.setProperty('--terminal-warning', theme.warning);
    
    // Update CSS custom properties
    document.documentElement.style.setProperty('--primary-color', theme.primary);
}

// Load saved theme on startup
function loadSavedTheme() {
    const savedTheme = localStorage.getItem('terminal_theme');
    if (savedTheme && terminalThemes[savedTheme]) {
        applyTerminalTheme(savedTheme);
    }
}

// Enhanced history command
commands['history'] = {
    description: "Show command history",
    execute: (args) => {
        const limit = parseInt(args[0]) || 20;
        const recentHistory = commandHistory.slice(0, limit);
        
        if (recentHistory.length === 0) {
            return `<span style="color: #8b949e;">No command history available</span>`;
        }
        
        let output = `<span class="command-success">📜 Command History (last ${recentHistory.length})</span>\n\n`;
          recentHistory.reverse().forEach((cmd, index) => {
            const lineNumber = (recentHistory.length - index).toString().padStart(3, ' ');
            output += `<span style="color: #484f58;">${lineNumber}</span>  ${cmd}\n`;
        });
        
        output += `\n<span style="color: #8b949e;">Tip: Use ↑↓ arrows to navigate history</span>`;
        return output;
    }
};

// Initialize terminal enhancements
function initializeTerminalEnhancements() {
    loadCommandHistory();
    loadSavedTheme();
    
    // Override the executeCommand function to include tracking
    const originalExecuteCommand = window.executeCommand;
    window.executeCommand = function(input) {
        if (input.trim() !== '') {
            const command = input.trim().split(' ')[0].toLowerCase();
            trackCommand(command);
            saveCommandHistory();
        }
        
        // Use alias-aware execution
        executeCommandWithAlias(input);
    };
    
    // Override auto-completion
    window.autoComplete = enhancedAutoComplete;
}

// Call initialization when script loads
document.addEventListener('DOMContentLoaded', initializeTerminalEnhancements);

// Add keyboard shortcut for quick access
document.addEventListener('keydown', function(e) {
    // Ctrl + Shift + T for terminal
    if (e.ctrlKey && e.shiftKey && e.key === 'T') {
        e.preventDefault();
        if (!isTerminalActive) {
            toggleTerminal();
        }
    }
    
    // Ctrl + K to clear terminal (like in VS Code)
    if (e.ctrlKey && e.key === 'k' && isTerminalActive) {
        e.preventDefault();
        commands.clear.execute();
    }
});

// Enhanced terminal ready message
console.log(`
🚀 Enhanced Terminal System Loaded!

New Features:
• Command aliases (h = help, c = clear, etc.)
• Persistent command history
• Terminal themes (try 'theme matrix')
• Usage statistics ('stats' command)
• Interactive games and tools
• Search functionality ('search [term]')
• And much more!

Press Ctrl + \` to open terminal
Press Ctrl + Shift + T as alternative
Press Ctrl + K to clear terminal
`);

// Terminal functions
function toggleTerminal() {
    function toggleTerminal() {
    isTerminalActive = !isTerminalActive;
    terminal.classList.toggle('active', isTerminalActive);
    
    if (isTerminalActive) {
        terminalInput.focus();
        if (terminalOutput.innerHTML === '') {
            showWelcomeMessage();
        }
    }
}

function showWelcomeMessage() {
    const welcomeText = `
<span style="color: #00d4aa; font-weight: bold;">╔══════════════════════════════════════════════════════════════╗</span>
<span style="color: #00d4aa; font-weight: bold;">║</span>                                                              <span style="color: #00d4aa; font-weight: bold;">║</span>
<span style="color: #00d4aa; font-weight: bold;">║</span>    Welcome to <span class="command-success">Brahim SAADI's</span> Portfolio Terminal! 🚀        <span style="color: #00d4aa; font-weight: bold;">║</span>
<span style="color: #00d4aa; font-weight: bold;">║</span>                                                              <span style="color: #00d4aa; font-weight: bold;">║</span>
<span style="color: #00d4aa; font-weight: bold;">║</span>    <span style="color: #8b949e;">Type</span> '<span class="command-success">help</span>' <span style="color: #8b949e;">to see available commands</span>                  <span style="color: #00d4aa; font-weight: bold;">║</span>
<span style="color: #00d4aa; font-weight: bold;">║</span>    <span style="color: #8b949e;">Use</span> <span style="color: #7ce38b;">↑ ↓</span> <span style="color: #8b949e;">arrows for command history</span>                    <span style="color: #00d4aa; font-weight: bold;">║</span>
<span style="color: #00d4aa; font-weight: bold;">║</span>    <span style="color: #8b949e;">Press</span> <span style="color: #7ce38b;">Tab</span> <span style="color: #8b949e;">for auto-completion</span>                          <span style="color: #00d4aa; font-weight: bold;">║</span>
<span style="color: #00d4aa; font-weight: bold;">║</span>                                                              <span style="color: #00d4aa; font-weight: bold;">║</span>
<span style="color: #00d4aa; font-weight: bold;">╚══════════════════════════════════════════════════════════════╝</span>

<span style="color: #484f58; font-size: 12px;">Last login: ${new Date().toLocaleString()} on terminal</span>
`;
    addToTerminal(welcomeText, 'command-output');
}

function addToTerminal(content, className = '', typewriter = false) {
    const div = document.createElement('div');
    div.className = className;
    
    if (typewriter) {
        terminalOutput.appendChild(div);
        typeWriterEffect(div, content);
    } else {
        div.innerHTML = content;
        terminalOutput.appendChild(div);
    }
    
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

function typeWriterEffect(element, text, speed = 30) {
    let i = 0;
    const timer = setInterval(() => {
        element.innerHTML = text.slice(0, i + 1);
        i++;
        if (i >= text.length) {
            clearInterval(timer);
        }
    }, speed);
}

function executeCommand(input) {
    if (input.trim() === '') return;
    
    // Add to history
    commandHistory.unshift(input);
    if (commandHistory.length > 50) {
        commandHistory.pop();
    }
    historyIndex = -1;
    
    const parts = input.trim().split(' ');
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);
    
    // Add command to terminal with enhanced styling
    const timestamp = new Date().toLocaleTimeString('en-US', { 
        hour12: false, 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
    });
    
    addToTerminal(`
        <div style="display: flex; align-items: center; margin: 8px 0;">
            <span style="color: #484f58; font-size: 11px; margin-right: 12px;">[${timestamp}]</span>
            <span class="terminal-prompt">${terminalState.user}@${terminalState.hostname}:${terminalState.currentPath}$</span>
            <span style="margin-left: 8px; color: #e6edf3;">${input}</span>
        </div>
    `);
    
    if (commands[command]) {
        const output = commands[command].execute(args);
        if (output) {
            addToTerminal(output, 'command-output');
        }
    } else {
        // Check for similar commands
        const similarCommands = findSimilarCommands(command);
        let errorMsg = `<span style="color: #f85149;">bash: ${command}: command not found</span>`;
        
        if (similarCommands.length > 0) {
            errorMsg += `\n\n<span style="color: #8b949e;">Did you mean:</span>`;
            similarCommands.forEach(cmd => {
                errorMsg += `\n  <span style="color: #7ce38b;">${cmd}</span>`;
            });
        }
        
        errorMsg += `\n\n<span style="color: #8b949e;">Type '<span class="command-success">help</span>' for available commands.</span>`;
        addToTerminal(errorMsg, 'command-error');
    }
}

// Auto-completion function for terminal commands
function autoComplete() {
    const input = terminalInput.value;
    const commandNames = Object.keys(commands);
    const matches = commandNames.filter(cmd => cmd.startsWith(input.toLowerCase()));
    
    if (matches.length === 1) {
        terminalInput.value = matches[0];
    } else if (matches.length > 1) {
        addToTerminal(`\n<span style="color: #8b949e;">Possible completions:</span>`);
        matches.forEach(match => {
            const description = commands[match].description || '';
            addToTerminal(`  <span style="color: #7ce38b;">${match}</span> <span style="color: #484f58;">- ${description}</span>`);
        });
        addToTerminal('');
    }
}

// Handle input on Enter key
// Enhanced event listeners
terminalInput.addEventListener('keydown', function(e) {
    switch(e.key) {        case 'Enter':
            const input = terminalInput.value;
            executeCommandWithAlias(input);
            terminalInput.value = '';
            break;
            
        case 'ArrowUp':
            e.preventDefault();
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                terminalInput.value = commandHistory[historyIndex] || '';
            }
            break;
            
        case 'ArrowDown':
            e.preventDefault();
            if (historyIndex > 0) {
                historyIndex--;
                terminalInput.value = commandHistory[historyIndex] || '';
            } else if (historyIndex === 0) {
                historyIndex = -1;
                terminalInput.value = '';
            }
            break;
            
        case 'Tab':
            e.preventDefault();
            autoComplete();
            break;
            
        case 'l':
            if (e.ctrlKey) {
                e.preventDefault();
                commands.clear.execute();
            }
            break;
            
        case 'c':
            if (e.ctrlKey) {
                e.preventDefault();
                addToTerminal(`^C`, 'command-error');
                terminalInput.value = '';
            }            break;
    }
});

console.log('🚀 Terminal script loaded successfully!');
