# Next.js Portfolio with Automated Content Sync

A modern, responsive portfolio website built with Next.js that automatically syncs content from various platforms including Medium, Substack, and GitHub. It also includes features for managing LinkedIn articles and media content.

## Features

- 🚀 Built with Next.js 14 and TypeScript
- 🎨 Styled with Tailwind CSS
- 📱 Fully responsive design
- 📝 Automatic content sync from:
  - Medium blog posts
  - Substack newsletters
  - GitHub repositories
- 📊 Manual LinkedIn article management
- 🖼️ Media section for images and videos
- ⚡ Optimized performance

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- A GitHub account and personal access token
- RSS feeds for your Medium and Substack content

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd nextjs-portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   Then edit `.env.local` with your actual values.

4. Start the development server:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) to view your portfolio.

## Content Management

### RSS Feeds
The portfolio automatically fetches and displays your latest posts from Medium and Substack using their RSS feeds. Update the feed URLs in your `.env.local` file.

### GitHub Projects
Your GitHub repositories are automatically fetched and displayed in the Projects section. Make sure to set up your GitHub token in the environment variables.

### LinkedIn Articles
LinkedIn articles can be manually added through the admin interface. These are stored locally and can be archived when needed.

### Media Content
The media section supports both images and videos. You can either host them directly in the project or link to external sources.

## Deployment

This project is optimized for deployment on Vercel:

1. Push your code to GitHub
2. Import your repository to Vercel
3. Set up your environment variables in the Vercel dashboard
4. Deploy!

## Troubleshooting

### Common Issues

1. **RSS Feed Issues**
   - Verify your feed URLs are correct and publicly accessible
   - Check the console for any CORS-related errors

2. **GitHub API Rate Limiting**
   - Ensure your GitHub token has the necessary permissions
   - Consider implementing caching if you hit rate limits

3. **Media Loading**
   - Check file permissions for self-hosted media
   - Verify external media URLs are accessible

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
