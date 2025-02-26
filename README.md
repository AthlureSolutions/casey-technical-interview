# Casey Technical Interview

## Overview

This is a modern web application built with Next.js that implements a blog post management system. The application allows users to create, view, and edit posts, with a responsive and accessible user interface built using Material UI and styled with Tailwind CSS.

## Features

- View list of posts with infinite scrolling
- Create new posts with title and content
- Edit existing posts
- View comments on posts
- Responsive Material UI design with dark mode
- Form validation with error handling
- Success/error notifications using Snackbars
- Accessible UI components

## Tech Stack

- **Next.js 15** (with App Router)
- **React 19**
- **Material UI v6**
- **Tailwind CSS**
- **TypeScript**
- **Vitest** for testing
- **React Testing Library** for component testing
- **JSONPlaceholder API** for backend data

## Getting Started

### Prerequisites

- Node.js (v12 or higher)
- npm (comes with Node.js)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/casey-technical-interview.git
   cd casey-technical-interview
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Testing

Run the test suite:
```bash
npm test
```

The project uses Vitest and React Testing Library for:
- Component rendering tests
- User interaction tests
- Async operation tests
- Form validation tests

## Project Structure

```
casey-technical-interview/
├── app/                    # Next.js app directory
│   ├── components/        # React components
│   ├── providers/         # Context providers
│   └── services/         # API services
├── tests/                # Test files
└── public/              # Static assets
```

## API Integration

The application uses the JSONPlaceholder API for demonstration purposes. The API endpoints include:
- GET /posts - Fetch all posts
- GET /comments - Fetch all comments
- POST /posts - Create a new post
- PUT /posts/:id - Update an existing post

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
