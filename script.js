// Terminal functionality - Initialize after DOM loads
document.addEventListener('DOMContentLoaded', function() {
    // Get terminal elements
    terminal = document.getElementById('terminal');
    terminalOutput = document.getElementById('terminal-output');
    terminalInput = document.getElementById('terminal-input');
    
    if (!terminal || !terminalOutput || !terminalInput) {
        console.error('Terminal elements not found in DOM');
        return;
    }      // Initialize terminal functionality
    initializeTerminal();
    
    // Initialize contact form
    initializeContactForm();
    
    // Load dynamic content
    loadHeroSection();
    loadAboutSection();
    loadContactSection();
    loadProjects();
    loadExperience();
    loadEducation();
});

// Function to dynamically load projects from portfolioData
function loadProjects() {
    const projectsGrid = document.querySelector('.projects-grid');
    if (!projectsGrid || !portfolioData || !portfolioData.projects) {
        console.log('Projects grid or portfolio data not found');
        return;
    }
    
    // Clear existing projects
    projectsGrid.innerHTML = '';
      // Generate project cards from portfolioData
    portfolioData.projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        
        // Use icon from data, fallback to code icon if not specified
        const icon = project.icon || 'fas fa-code';
        
        // Generate technology tags
        const techTags = project.technologies.map(tech => 
            `<span class="tag">${tech}</span>`
        ).join('');
        
        // Generate project links
        const githubLink = project.githubUrl && project.githubUrl !== '#' ? 
            `<a href="${project.githubUrl}" class="project-link" target="_blank">
                <i class="fab fa-github"></i>
            </a>` : '';
            
        const liveLink = project.liveUrl && project.liveUrl !== '#' ? 
            `<a href="${project.liveUrl}" class="project-link" target="_blank">
                <i class="fas fa-external-link-alt"></i>
            </a>` : '';
          // Generate publication badge if exists
        const publicationBadge = project.publication ? 
            `<div class="project-publication">
                <i class="fas fa-award"></i>
                <span>${portfolioData.personal.publicationPrefix} ${project.publication.replace('CIKM \'24: 33rd ACM International Conference on Information and Knowledge Management', 'CIKM \'24')}</span>
            </div>` : '';
        
        projectCard.innerHTML = `
            <div class="project-image">
                <i class="${icon}"></i>
            </div>
            <div class="project-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-tech">
                    ${techTags}
                </div>
                <div class="project-links">
                    ${githubLink}
                    ${liveLink}
                </div>
                ${publicationBadge}
            </div>
        `;
        
        projectsGrid.appendChild(projectCard);
    });
    
    console.log(`✅ Loaded ${portfolioData.projects.length} projects dynamically`);
}

// Function to dynamically load experience from portfolioData
function loadExperience() {
    const timeline = document.querySelector('.timeline');
    if (!timeline || !portfolioData || !portfolioData.experience) {
        console.log('Timeline or portfolio experience data not found');
        return;
    }
    
    // Clear existing experience
    timeline.innerHTML = '';
    
    // Sort experience by start year (most recent first)
    const sortedExperience = [...portfolioData.experience].sort((a, b) => {
        // Extract start year from period (handles formats like "Feb 2024 - Aug 2024", "Jan 2025 - Present")
        const getStartYear = (period) => {
            if (period.includes('Present')) {
                // For "Present", extract the start year from the beginning
                const match = period.match(/(\d{4})/);
                return match ? parseInt(match[1]) : 0;
            }
            // Extract the first year mentioned in the period
            const match = period.match(/(\d{4})/);
            return match ? parseInt(match[1]) : 0;
        };
        
        return getStartYear(b.period) - getStartYear(a.period);
    });
    
    // Generate timeline items from sorted portfolioData
    sortedExperience.forEach(exp => {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';
        
        // Generate description list
        const descriptionList = Array.isArray(exp.description) 
            ? exp.description.map(desc => `<li>${desc}</li>`).join('')
            : `<li>${exp.description}</li>`;
        
        // Generate technology tags
        const techTags = exp.technologies.map(tech => 
            `<span class="tag">${tech}</span>`
        ).join('');
        
        timelineItem.innerHTML = `
            <div class="timeline-date">${exp.period}</div>
            <div class="timeline-content">
                <h3>${exp.title}</h3>
                <p class="company">${exp.company}</p>
                <div class="description">
                    <ul>
                        ${descriptionList}
                    </ul>
                </div>
                <div class="tech-tags">
                    ${techTags}
                </div>
            </div>
        `;
        
        timeline.appendChild(timelineItem);
    });
      console.log(`✅ Loaded ${sortedExperience.length} experience items dynamically (sorted chronologically)`);
}

// Function to dynamically load education from portfolioData
function loadEducation() {
    const educationGrid = document.querySelector('.education-grid');
    if (!educationGrid || !portfolioData || !portfolioData.education) {
        console.log('Education grid or portfolio education data not found');
        return;
    }
    
    // Clear existing education
    educationGrid.innerHTML = '';
    
    // Sort education by start year (most recent first)
    const sortedEducation = [...portfolioData.education].sort((a, b) => {
        // Extract start year from period (handles formats like "2024 - Present", "2021 - 2024", "2019")
        const getStartYear = (period) => {
            if (period.includes('Present')) {
                // For "Present", extract the start year from the beginning
                const match = period.match(/(\d{4})/);
                return match ? parseInt(match[1]) : 0;
            }
            // Extract the first year mentioned in the period
            const match = period.match(/(\d{4})/);
            return match ? parseInt(match[1]) : 0;
        };
        
        return getStartYear(b.period) - getStartYear(a.period);
    });
      // Generate education cards from sorted portfolioData
    sortedEducation.forEach(edu => {
        const educationCard = document.createElement('div');
        educationCard.className = 'education-card';
        
        // Use icon from data, fallback to graduation cap if not specified
        const icon = edu.icon || 'fas fa-graduation-cap';
        
        educationCard.innerHTML = `
            <div class="education-icon">
                <i class="${icon}"></i>
            </div>
            <div class="education-content">
                <h3>${edu.degree}</h3>
                <p class="institution">${edu.institution}</p>
                <p class="year">${edu.period}</p>
                <p class="description">
                    ${edu.description}
                </p>
            </div>
        `;
        
        educationGrid.appendChild(educationCard);
    });
      console.log(`✅ Loaded ${sortedEducation.length} education items dynamically (sorted chronologically)`);
}

// Function to dynamically load hero section from portfolioData
function loadHeroSection() {
    if (!portfolioData || !portfolioData.personal) {
        console.log('Portfolio personal data not found');
        return;
    }
    
    const personal = portfolioData.personal;
    
    // Update title
    document.title = `${personal.name} - ${personal.title}`;
      // Update nav brand
    const navName = document.querySelector('.nav-brand .name');
    if (navName) navName.textContent = personal.name;
      // Update logo with dedicated logo image or keep initials
    const logo = document.querySelector('.nav-brand .logo');
    if (logo && personal.logoImage) {
        logo.innerHTML = `<img src="${personal.logoImage}" alt="${personal.name}" class="nav-logo-img">`;
    } else if (logo) {
        // Keep the initials as fallback
        const initials = personal.name.split(' ').map(n => n[0]).join('');
        logo.textContent = initials;
    }
    
    // Update hero content
    const heroTitle = document.querySelector('.hero-title .highlight');
    if (heroTitle) heroTitle.textContent = personal.name;
    
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) heroSubtitle.textContent = personal.title;
    
    const heroDescription = document.querySelector('.hero-description');
    if (heroDescription) heroDescription.textContent = personal.bio;
      // Update profile card
    const profileName = document.querySelector('.profile-card h3');
    if (profileName) profileName.textContent = personal.name;
    
    const profileTitle = document.querySelector('.profile-card p');
    if (profileTitle) profileTitle.textContent = personal.title;
    
    const profileStatus = document.querySelector('.profile-status');
    if (profileStatus) {
        profileStatus.innerHTML = `
            <span class="status-dot"></span>
            ${personal.availability}
        `;
    }
    
    // Update profile avatar with image or fallback to icon
    const profileAvatar = document.querySelector('.profile-avatar');
    if (profileAvatar && personal.profileImage) {
        profileAvatar.innerHTML = `<img src="${personal.profileImage}" alt="${personal.name}" class="profile-img">`;
    } else if (profileAvatar) {
        // Fallback to icon if no image is provided
        profileAvatar.innerHTML = `<i class="fas fa-user"></i>`;
    }
    
    console.log('✅ Loaded hero section dynamically');
}

// Function to dynamically load about section from portfolioData
function loadAboutSection() {
    if (!portfolioData || !portfolioData.personal) {
        console.log('Portfolio personal data not found');
        return;
    }
    
    const personal = portfolioData.personal;
    
    // Update about text
    const aboutTextDiv = document.querySelector('.about-text');
    if (aboutTextDiv && personal.aboutText) {
        aboutTextDiv.innerHTML = personal.aboutText.map(text => `<p>${text}</p>`).join('');
    }
    
    // Update stats
    if (personal.stats) {
        const statElements = document.querySelectorAll('.about-stats .stat');
        const statMapping = [
            { key: 'experience', label: 'Years Experience' },
            { key: 'projects', label: 'Projects Completed' },
            { key: 'publications', label: 'Published Papers' }
        ];
        
        statElements.forEach((statElement, index) => {
            if (statMapping[index] && personal.stats[statMapping[index].key]) {
                const h3 = statElement.querySelector('h3');
                const p = statElement.querySelector('p');
                if (h3) h3.textContent = personal.stats[statMapping[index].key];
                if (p) p.textContent = statMapping[index].label;
            }
        });
    }
    
    console.log('✅ Loaded about section dynamically');
}

// Function to dynamically load contact section from portfolioData
function loadContactSection() {
    if (!portfolioData || !portfolioData.personal) {
        console.log('Portfolio personal data not found');
        return;
    }
    
    const personal = portfolioData.personal;
      // Update contact items
    const contactItems = document.querySelectorAll('.contact-item');
    const contactMapping = [
        { key: 'email', icon: 'fas fa-envelope', label: 'Email' },
        { key: 'phone', icon: 'fas fa-phone', label: 'Phone' },
        { key: 'linkedin', icon: 'fab fa-linkedin', label: 'LinkedIn', isLink: true },
        { key: 'location', icon: 'fas fa-map-marker-alt', label: 'Location' }
    ];
    
    contactItems.forEach((item, index) => {
        if (contactMapping[index] && personal[contactMapping[index].key]) {
            const mapping = contactMapping[index];
            const value = personal[mapping.key];
            
            // Handle LinkedIn as clickable link
            const displayValue = mapping.isLink ? 
                `<a href="${value}" target="_blank" style="color: var(--primary-color); text-decoration: none;">View Profile</a>` : 
                value;
            
            item.innerHTML = `
                <i class="${mapping.icon}"></i>
                <div>
                    <h4>${mapping.label}</h4>
                    <p>${displayValue}</p>
                </div>
            `;
        }
    });
    
    console.log('✅ Loaded contact section dynamically');
}

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
        }    }
};

// Portfolio data is now loaded from external file

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
            output += `  <span class="command-success">clear</span>          - Clear terminal screen\n`;
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
    'q': 'exit'
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
    const terminalConfig = portfolioData?.terminal || { user: 'user', hostname: 'terminal', currentPath: '~' };
    addToTerminal(`<span class="terminal-prompt">${terminalConfig.user}@${terminalConfig.hostname}:${terminalConfig.currentPath}$</span> <span style="color: #e6edf3;">${input}</span>`);
    
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
    const name = portfolioData?.personal?.name || 'Developer';
    const welcomeText = `
<span style="color: #00d4aa; font-weight: bold;">╔══════════════════════════════════════════════════════════════╗</span>
<span style="color: #00d4aa; font-weight: bold;">║</span>                                                              <span style="color: #00d4aa; font-weight: bold;">║</span>
<span style="color: #00d4aa; font-weight: bold;">║</span>    Welcome to <span class="command-success">${name}'s</span> Portfolio Terminal! 🚀        <span style="color: #00d4aa; font-weight: bold;">║</span>
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

// Contact form handling
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('form-status');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        // Show loading state
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        formStatus.innerHTML = '';
        
        try {
            const formData = new FormData(contactForm);
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                formStatus.innerHTML = '<div class="alert alert-success"><i class="fas fa-check-circle"></i> Thank you! Your message has been sent successfully.</div>';
                contactForm.reset();
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            formStatus.innerHTML = '<div class="alert alert-error"><i class="fas fa-exclamation-circle"></i> Sorry, there was an error sending your message. Please try again.</div>';
        }
        
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    });
}

// Initialize contact form handling on DOMContentLoaded
document.addEventListener('DOMContentLoaded', initializeContactForm);
