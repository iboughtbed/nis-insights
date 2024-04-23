# [NIS Insights](https://nis-insights.org)

This is an open source school magazine website build with everything new in Next.js 14. It is bootstrapped with `create-t3-app`.

[![NIS Insights](./public/og.png)](https://nis-insights.org/)

> **Warning**
> This project is still in development and is not ready for production use.

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org)
- **Styling:** [Tailwind CSS](https://tailwindcss.com)
- **User Management:** [NextAuth](https://next-auth.js.org)
- **ORM:** [Drizzle ORM](https://orm.drizzle.team)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com)
- **File Uploads:** [uploadthing](https://uploadthing.com)

## Features to be implemented

- [x] Authentication with **NextAuth**
- [x] ORM using **Drizzle ORM**
- [x] Database on **Supabase**
- [x] Validation with **Zod**
- [x] File uploads with **uploadthing**
- [x] Blog using **MDX** and **Contentlayer**
- [ ] Admin dashboard with articles and releases

## Running Locally

1. Clone the repository

   ```bash
   git clone https://github.com/iboughtbed/web-course.git
   ```

2. Install dependencies using pnpm

   ```bash
   pnpm install
   ```

3. Copy the `.env.example` to `.env` and update the variables.

   ```bash
   cp .env.example .env
   ```

4. Start the development server

   ```bash
   pnpm run dev
   ```

5. Push the database schema

   ```bash
   pnpm run db:push
   ```

## Introduction

NIS Insights is the digital home of our school magazine club. Explore our latest releases, read engaging articles, and discover talented authors on our platform. We're dedicated to sharing knowledge, creativity, and unique perspectives.

## Getting Started

Get started with NIS Insights and become a part of our community.

## Usage

Visit our website to:

- Read the latest releases and articles.
- Learn more about our featured authors.
- Join us as a member to contribute your own articles.

## Contributing

We welcome new members and contributors to enhance our platform. To contribute:

1. Fork the repository.
2. Create a new branch.
3. Make your changes and commit them.
4. Open a pull request.

Please note that we are selective about contributors to maintain the quality of our content.

## License

This project is licensed under the [MIT License](LICENSE). See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thank you to our dedicated team of writers and contributors.
- Inspired by the passion for sharing knowledge within our school community.
