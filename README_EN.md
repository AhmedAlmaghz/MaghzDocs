### Maghz Docs: Comprehensive Documentation

**Maghz Docs** is a fully open-source application built with **React** and **TailwindCSS** that allows you to quickly create a sleek, fast, and responsive website, perfect for blogging or documentation purposes. It automatically generates web pages from Markdown files, providing a simple yet powerful solution for managing content. 

The application is optimized for deployment on free hosting platforms such as **Firebase**, **Netlify**, **Vercel**, **GitHub Pages**, and others, ensuring flexibility and ease of use.

### Key Features:
- **Automated Page Generation**: Reads content from Markdown files and builds a structured website.
- **Lightweight & Fast**: Optimized for performance and user experience.
- **Elegant Design**: Utilizes TailwindCSS for modern, customizable styling.
- **Flexible Hosting**: Easily deploy on various free platforms like Firebase, Netlify, and GitHub Pages.

---

## How It Works:
Follow these simple steps to create your own website using Maghz Docs:

1. Copy your Markdown (`*.md`) files into the `public/markdown/` folder inside the application directory.
2. Build the application by running the following command:
   ```bash
   npm run build
   ```
3. Deploy the generated files to your preferred hosting service.

   **Congratulations! Your website is live!**

---

## Getting Started

### 1. Clone the Repository
Begin by cloning the Maghz Docs repository to your local machine:

```bash
git clone https://github.com/AhmedAlmaghz/MaghzDocs.git
cd MaghzDocs
```

### 2. Install Dependencies
After cloning, install the necessary dependencies by running:

```bash
npm install
```

### 3. Add Your Markdown Files
Place your Markdown (`*.md`) files in the `public/markdown` folder. These files will be used to generate your site pages.

### 4. Run the Application in Development Mode
To preview your changes and work in development mode, use:

```bash
npm run dev
```
Then, open [http://localhost:3000](http://localhost:3000) in your browser to see the application running locally.

---

## Building the Application for Production

When you're ready to deploy your site, build the production version using:

```bash
npm run build
```

This will generate optimized static files that can be uploaded to your hosting platform.

---

## Customizing the Site's Structure

When you run the build command, the application automatically creates a `structure.json` file in `public/markdown/`. This file defines the structure of your site based on the folder and file layout in the `public/markdown` directory.

To manually generate the `structure.json` without building the entire application, run:

```bash
npm run generate-index
```

You can also edit the `structure.json` file manually to customize the site's navigation, folder hierarchy, and link names without modifying the actual file structure.

### Flexibility of Structure.json:
- **Customizable Links**: Modify page links and their displayed names without changing the underlying file names.
- **Dynamic Hierarchy**: Organize your site’s layout by editing folder categories and sub-pages within `structure.json`, giving you full control over how your content is presented.

---

## Live Demo

Curious to see Maghz Docs in action? Check out the live demo:

[Live Demo of MaghzDocs](https://transformers.web.app)

---

## Screenshots
Here are some screenshots that showcase the elegance and functionality of Maghz Docs:

![Maghz Docs Overview](./public/images/maghz-docs.png)
![Maghz Docs Structure](./public/images/maghz-docs-index.png)
![Maghz Docs Footer](./public/images/maghz-docs-footer.png)

With **Maghz Docs**, creating a beautifully designed, content-rich website has never been easier. Start building your site today!