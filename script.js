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
    // Set up event listeners
    setupTerminalEventListeners();
    
    // Show initial welcome message
    if (terminalOutput.innerHTML === '') {
        showWelcomeMessage();
    }
    
    console.log('✅ Terminal initialized successfully');
}

function setupTerminalEventListeners() {
    // Enhanced event listeners
    terminalInput.addEventListener('keydown', function(e) {        switch(e.key) {
            case 'Enter':
                const input = terminalInput.value;
                executeCommand(input);
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

// Global terminal toggle function - accessible from HTML onclick
window.toggleTerminal = function() {
    // Ensure terminal elements are available
    if (!terminal) {
        terminal = document.getElementById('terminal');
        terminalOutput = document.getElementById('terminal-output');
        terminalInput = document.getElementById('terminal-input');
    }
    
    if (!terminal || !terminalOutput || !terminalInput) {
        console.error('Terminal elements not found');
        return;
    }
    
    isTerminalActive = !isTerminalActive;
    terminal.classList.toggle('active', isTerminalActive);
    
    if (isTerminalActive) {
        terminalInput.focus();
        if (terminalOutput.innerHTML === '') {
            showWelcomeMessage();
        }
    }
};

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
            let output = `<span class="command-success">Portfolio Terminal - Available Commands</span>\n\n`;
            
            // Core Portfolio Commands
            output += `<span style="color: #7ce38b;">📋 Portfolio:</span>\n\n`;
            output += `  <span class="command-success">about</span>          - About me and my background\n`;
            output += `  <span class="command-success">skills</span>         - Technical skills and expertise\n`;
            output += `  <span class="command-success">experience</span>     - Work experience and roles\n`;
            output += `  <span class="command-success">education</span>      - Educational background\n`;
            output += `  <span class="command-success">projects</span>       - Portfolio projects\n`;
            output += `  <span class="command-success">certifications</span> - Professional certifications\n`;
            output += `  <span class="command-success">publications</span>   - Research publications\n`;
            output += `  <span class="command-success">contact</span>        - Contact information\n\n`;
            
            // Essential Terminal Commands
            output += `<span style="color: #7ce38b;">🖥️ Terminal:</span>\n\n`;
            output += `  <span class="command-success">ls</span>             - List directory contents\n`;
            output += `  <span class="command-success">cat [file]</span>     - Display file contents\n`;
            output += `  <span class="command-success">clear</span>          - Clear terminal screen\n`;
            output += `  <span class="command-success">whoami</span>         - Current user info\n`;
            output += `  <span class="command-success">pwd</span>            - Current directory\n`;
            output += `  <span class="command-success">date</span>           - Current date and time\n\n`;
            
            // Useful Features
            output += `<span style="color: #7ce38b;">⚙️ Features:</span>\n\n`;
            output += `  <span class="command-success">theme [color]</span>  - Change terminal theme\n`;
            output += `  <span class="command-success">history</span>        - Show command history\n`;
            output += `  <span class="command-success">exit</span>           - Close terminal\n\n`;
            
            // Tips
            output += `<span style="color: #8b949e;">💡 Tips:</span>\n\n`;
            output += `• Use <span style="color: #7ce38b;">↑ ↓</span> arrows for command history\n`;
            output += `• Press <span style="color: #7ce38b;">Tab</span> for auto-completion\n`;
            output += `• Try: <span class="command-success">about</span> → <span class="command-success">skills</span> → <span class="command-success">projects</span> → <span class="command-success">contact</span>`;
            
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
                return `<span class="command-error">Usage: theme [green|blue|red|purple|orange]</span>`;
            }
            
            const colors = {
                green: '#00d4aa',
                blue: '#007acc',
                red: '#ff6b6b',
                purple: '#9c88ff',
                orange: '#ff9500'
            };
            
            if (colors[color]) {
                document.documentElement.style.setProperty('--primary-color', colors[color]);
                return `<span class="command-success">Theme changed to ${color}</span>`;
            } else {
                return `<span class="command-error">Unknown theme: ${color}. Available: green, blue, red, purple, orange</span>`;
            }
        }
    },
    
    history: {
        description: "Show command history",
        execute: () => {
            if (typeof commandHistory !== 'undefined' && commandHistory.length > 0) {
                let output = `<span class="command-success">Command History:</span>\n\n`;
                commandHistory.slice(-10).forEach((cmd, index) => {
                    output += `${commandHistory.length - 10 + index + 1}  ${cmd}\n`;
                });
                return output;
            } else {
                return `<span class="command-success">No command history available</span>`;
            }
        }
    },
    
    exit: {
        description: "Close terminal",
        execute: () => {
            toggleTerminal();
            return '';
        }
    }
};

// Command aliases for convenience
const commandAliases = {
    'h': 'help',
    'c': 'clear',
    'p': 'projects',
    's': 'skills',
    'e': 'experience',
    'a': 'about',
    'q': 'exit',
    'll': 'ls'
};

// Simple execute command function
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
    
    // Check for aliases first
    const aliasedCommand = commandAliases[command];
    const finalCommand = aliasedCommand || command;
    
    // Add command to terminal
    addToTerminal(`<span class="terminal-prompt">${terminalState.user}@${terminalState.hostname}:${terminalState.currentPath}$</span> <span style="color: #e6edf3;">${input}</span>`);
    
    if (commands[finalCommand]) {
        const output = commands[finalCommand].execute(args);
        if (output) {
            addToTerminal(output, 'command-output');
        }
    } else {
        addToTerminal(`<span style="color: #f85149;">bash: ${command}: command not found</span>\n\n<span style="color: #8b949e;">Type '<span class="command-success">help</span>' for available commands.</span>`, 'command-error');
    }
    
    // Keep input focused
    setTimeout(() => {
        if (isTerminalActive && terminalInput) {
            terminalInput.focus();
        }
    }, 50);
}

// Simple terminal functions
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

function addToTerminal(content, className = '') {
    const div = document.createElement('div');
    div.className = className;
    div.innerHTML = content;
    terminalOutput.appendChild(div);
    
    // Scroll to bottom
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

// Auto-completion function for terminal commands
function autoComplete() {
    const input = terminalInput.value;
    const commandNames = Object.keys(commands);
    const matches = commandNames.filter(cmd => cmd.startsWith(input.toLowerCase()));
    
    if (matches.length === 1) {
        terminalInput.value = matches[0];
    } else if (matches.length > 1) {
        addToTerminal(`<span style="color: #8b949e;">Possible completions:</span>`);
        matches.forEach(match => {
            const description = commands[match].description || '';
            addToTerminal(`  <span style="color: #7ce38b;">${match}</span> <span style="color: #484f58;">- ${description}</span>`);
        });
        addToTerminal('');
    }
}
