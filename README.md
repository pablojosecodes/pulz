# Pulz: Minimalistic One-Click Analytics

## Introduction to Pulz
Pulz is a self-hosted, real-time analytics dashboard, created with a focus on simplicity, privacy, and user autonomy. It's designed for small to medium traffic websites, offering an alternative to those who seek to understand their web traffic without the complexities and intrusiveness of traditional analytics solutions. Pulz is inspired by the principles of minimalism and respect for user privacy, aligning with the preferences of a community that values intellectual rigor and thoughtful innovation.

## Core Features
- **Real-Time Data**: Access immediate insights with a streamlined interface.
- **Customizable Event Tracking**: Collect data that is relevant to your specific context.
- **Privacy-First Design**: Built to respect user data and privacy.
- **Self-Hosted Solution**: Maintain full control over your data and its storage.
- **Simple Implementation**: Easy to integrate, requiring minimal code changes.
- **Support for Various Databases**: Utilizes Prisma for flexible database integration.
- **Open Source**: Available for modification and use at no cost.

## Getting Started with Pulz

### Setting Up
1. **Configuration**: Begin by updating settings in `./src/config`.
2. **Database Integration**: Select and configure your SQL database in `./prisma/schema.prisma`, consulting Prisma's documentation for supported options.
3. **Enabling Event Tracking**: Integrate this script in the `<head>` of your site:
   ```html
   <script async src="https://your-app-domain.com/api/stats.js"></script>
   ```
   Include your domain in the `CORS_ALLOWED_ORIGIN` in `./config` for proper functionality.

### Event Collection
- Standard: `collect('event_name');`

> Note: by default, Pulz tracks link clicks, page loads, exits, and sessions.


## Some notes
Pulz is built for those who appreciate a balance between functionality and simplicity, encouraging developers to adapt and extend its capabilities. It's a humble contribution to the community of developers who value thoughtful, efficient, and privacy-aware tools. Pulz is open for exploration, adaptation, and growth, reflecting a commitment to the ideals of a community that values not just tools, but the philosophy behind them.