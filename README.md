# Akeesha Shaini – Personal Portfolio

A responsive, dark futuristic portfolio website for a Computer Science undergraduate and aspiring Cloud Engineer. It includes a working contact form that saves messages to a MySQL database.



## Features

- Fixed glassmorphism navigation with active-section highlighting and a mobile menu
- Hero section with typing animation, floating elements and a particle background
- About, Education timeline, Technical Skills, Projects, Experience and Contact sections
- Projects and skills are edited in one place (`js/script.js`), no HTML changes needed
- Contact form with JavaScript validation and PHP server-side validation
- Messages stored in MySQL using PDO prepared statements (protects against SQL injection)
- Honeypot field to reduce spam, and database credentials kept on the server only
- Scroll reveal animations, back-to-top button, and support for reduced-motion settings
- Fully responsive for desktop, tablet and mobile

## Built With

HTML5, CSS3, Vanilla JavaScript, PHP (PDO), MySQL. No frameworks or libraries.

## Project Structure

```
akeesha-portfolio/
├── index.html
├── css/style.css
├── js/script.js
├── images/
│   ├── profile.png
│   └── projects/
├── backend/
│   ├── db.php
│   └── contact.php
└── database/portfolio.sql
```

## Run Locally with XAMPP

1. Install [XAMPP](https://www.apachefriends.org/) and start **Apache** and **MySQL** in the Control Panel.
2. Download this repository (**Code** > **Download ZIP**) or clone it:
   ```
   git clone https://github.com/akeesha123/akeesha-portfolio.git
   ```
3. Copy the folder into `C:\xampp\htdocs\` and rename it to `portfolio`.
4. Open `http://localhost/phpmyadmin`, go to **Import**, choose `database/portfolio.sql`, and click **Go**. This creates the `akeesha_portfolio` database and the `contact_messages` table. You may see a "No database selected" message; it is harmless.
5. Open `http://localhost/portfolio/` in your browser.
6. If your MySQL username or password is not the XAMPP default (`root`, empty), update `backend/db.php`.

> Open the site through `http://localhost`, not by double-clicking `index.html`. The contact form needs PHP to run.

## Customize

Edit the `CONFIG` object at the top of `js/script.js`:

- `links`: your email, GitHub, LinkedIn and CV file path
- `skills`: add a number such as `['Python', 70]` to show a progress bar
- `projects`: title, description, technologies, `repo` (GitHub URL) and `image`

Education and Experience cards can be edited directly in `index.html`.

## Database

Table `contact_messages`: `id`, `full_name`, `email`, `subject`, `message`, `created_at`.

## Deployment Note

GitHub Pages only serves static files, so the PHP contact form will not work there. To publish the full site, use a host that supports PHP and MySQL, and set that host's database details in `backend/db.php`. Never commit real production passwords to a public repository.

## Author

**Akeesha Shaini**, Computer Science undergraduate, Faculty of Computing, University of Sri Jayewardenepura.
