# Personal Portfolio Website

A modern, responsive portfolio website with terminal functionality, built with HTML, CSS, and JavaScript.

## Features

- 🎨 Modern and clean design
- 📱 Fully responsive
- 💻 Interactive terminal interface
- 🚀 Easy to customize and extend
- 📊 Skills visualization
- 📝 Project showcase
- 📬 Contact form
- 🎯 Smooth scrolling navigation
- 🎨 Theme customization via terminal

## Getting Started

1. **Setup**: Simply open `index.html` in your web browser
2. **Customize**: Edit the `portfolioData` object in `script.js` to add your information
3. **Deploy**: Upload files to any web hosting service

## Customization Guide

### 1. Personal Information

Edit the `portfolioData` object in `script.js`:

```javascript
const portfolioData = {
    personal: {
        name: "Your Name",
        title: "Your Title",
        email: "your.email@example.com",
        phone: "+1 (555) 123-4567",
        location: "Your City, Country",
        bio: "Your bio description..."
    },
    // ...
};
```

### 2. Adding Skills

Add new skills to the skills object:

```javascript
skills: {
    frontend: [
        { name: "JavaScript", level: 90 },
        { name: "React", level: 85 },
        // Add more skills here
    ],
    // Add new categories as needed
}
```

### 3. Adding Projects

Add new projects to the projects array:

```javascript
projects: [
    {
        title: "Project Name",
        description: "Project description",
        technologies: ["Tech1", "Tech2", "Tech3"],
        githubUrl: "https://github.com/username/repo",
        liveUrl: "https://your-project.com",
        featured: true
    },
    // Add more projects here
]
```

### 4. Adding Experience

Add work experience entries:

```javascript
experience: [
    {
        title: "Job Title",
        company: "Company Name",
        period: "2023 - Present",
        description: "Job description and achievements...",
        technologies: ["Tech1", "Tech2"]
    },
    // Add more experience entries
]
```

### 5. Adding Education

Add educational background:

```javascript
education: [
    {
        degree: "Degree Name",
        institution: "University/School Name",
        period: "2020 - 2024",
        description: "Description of studies, achievements, etc."
    },
    // Add more education entries
]
```

## Terminal Features

The website includes a powerful terminal interface accessible by:
- Clicking the terminal icon in the navigation
- Pressing `Ctrl + \`` (backtick)
- Pressing `Escape` to close

### Available Commands

- `help` - Show all available commands
- `about` - Display personal information
- `skills` - Show technical skills with progress bars
- `experience` - Display work experience
- `education` - Show educational background
- `projects` - List all projects
- `contact` - Show contact information
- `clear` - Clear terminal output
- `ls` - List directory contents
- `cat [file]` - Display file contents
- `theme [color]` - Change color theme (green, blue, red, purple)
- `whoami` - Show current user
- `pwd` - Show current directory
- `date` - Show current date and time
- `exit` - Close terminal

### Easter Eggs

Try these fun commands:
- `matrix` - Enter the Matrix
- `sudo [command]` - Attempt superuser access

## Styling Customization

### Color Scheme

Edit CSS custom properties in `styles.css`:

```css
:root {
    --primary-color: #00d4aa;
    --secondary-color: #1a1a2e;
    --accent-color: #16213e;
    /* ... other variables */
}
```

### Typography

The website uses:
- **Inter** for general text
- **JetBrains Mono** for terminal interface

You can change fonts by updating the Google Fonts link in `index.html` and the CSS font-family declarations.

## Adding New Sections

To add a new section:

1. **HTML**: Add the section markup in `index.html`
2. **CSS**: Add corresponding styles in `styles.css`
3. **Navigation**: Add a link in the navbar
4. **JavaScript**: Add any interactive functionality

Example new section:

```html
<section id="blog" class="section">
    <div class="section-header">
        <h2 class="section-title">Blog</h2>
        <p class="section-subtitle">My latest thoughts and tutorials</p>
    </div>
    <!-- Section content -->
</section>
```

## Interactive Features

### Adding Projects Dynamically

Users can add projects through the terminal or by clicking the "Add Project" card. The system accepts JSON input:

```json
{
  "title": "New Project",
  "description": "Project description",
  "technologies": ["HTML", "CSS", "JavaScript"],
  "githubUrl": "https://github.com/username/repo",
  "liveUrl": "https://project-url.com"
}
```

### Contact Form

The contact form is ready for integration with backend services. Currently, it shows an alert. To integrate with a backend:

1. Replace the form submission handler in `script.js`
2. Add your backend endpoint
3. Handle form data as needed

## Deployment

### Static Hosting

Upload files to any static hosting service:
- **GitHub Pages**: Push to a GitHub repository and enable Pages
- **Netlify**: Drag and drop the folder to Netlify
- **Vercel**: Connect your repository or upload files
- **AWS S3**: Upload to an S3 bucket with static hosting enabled

### Custom Domain

Most hosting services allow custom domain configuration. Update the domain in your hosting platform's settings.

## Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)

## Performance Tips

1. **Images**: Add optimized images for projects and profile
2. **Lazy Loading**: Implement lazy loading for project images
3. **Minification**: Minify CSS and JavaScript for production
4. **CDN**: Use a CDN for faster loading times

## Contributing

Feel free to fork this project and customize it for your own use! If you have suggestions for improvements, please create an issue or submit a pull request.

## License

This project is open source and available under the [MIT License](LICENSE).

## Credits

- Icons: Font Awesome
- Fonts: Google Fonts (Inter, JetBrains Mono)
- Design: Custom modern portfolio design

---

**Happy coding!** 🚀

Made with ❤️ by Brahim SAADI
