# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/644f873e-e854-42e0-8f9b-35215df0829a

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/644f873e-e854-42e0-8f9b-35215df0829a) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## Project Structure

```
📁 CertExcellence/
├── 📁 public/                    # Static assets
│   ├── favicon.ico              # Site favicon
│   ├── robots.txt               # Search engine crawling rules
│   └── placeholder.svg          # Placeholder images
│
├── 📁 src/                      # Source code
│   ├── 📁 components/           # Reusable UI components
│   │   ├── 📁 ui/               # shadcn-ui components (buttons, forms, etc.)
│   │   ├── AppNav.tsx           # Application navigation bar
│   │   └── LandingNav.tsx       # Landing page navigation
│   │
│   ├── 📁 pages/                # Application routes/pages
│   │   ├── Index.tsx            # Landing/home page
│   │   ├── Dashboard.tsx        # User dashboard
│   │   ├── ExamInterface.tsx    # Exam taking interface
│   │   ├── Results.tsx          # Exam results page
│   │   └── NotFound.tsx         # 404 error page
│   │
│   ├── 📁 services/             # API calls and external services
│   │   └── api.ts               # Backend API integration layer
│   │
│   ├── 📁 hooks/                # Custom React hooks
│   │   ├── useAuth.ts           # Authentication state management
│   │   ├── use-toast.ts         # Toast notification hook
│   │   └── use-mobile.tsx       # Mobile device detection
│   │
│   ├── 📁 utils/                # Helper functions and utilities
│   │   ├── constants.ts         # Application constants and configs
│   │   └── helpers.ts           # Utility functions (formatting, validation)
│   │
│   ├── 📁 types/                # TypeScript type definitions
│   │   └── index.ts             # Core application types
│   │
│   ├── 📁 lib/                  # Third-party library configurations
│   │   └── utils.ts             # Utility functions (cn helper)
│   │
│   ├── App.tsx                  # Root React component with routing
│   ├── main.tsx                 # Application entry point
│   ├── index.css                # Global styles and design tokens
│   └── vite-env.d.ts           # Vite environment type definitions
│
├── 📁 Configuration Files
│   ├── tailwind.config.ts       # Tailwind CSS configuration
│   ├── vite.config.ts           # Vite build tool configuration
│   ├── tsconfig.json            # TypeScript configuration
│   ├── components.json          # shadcn-ui component configuration
│   └── package.json             # Dependencies and scripts
│
└── README.md                    # Project documentation
```

### Folder Descriptions

- **`/src/components/`** - Contains all reusable React components, including the complete shadcn-ui component library and custom navigation components
- **`/src/pages/`** - Houses all application pages/routes corresponding to different screens in the certification exam platform
- **`/src/services/`** - API service layer ready for backend integration, handling all external data operations
- **`/src/hooks/`** - Custom React hooks for state management, authentication, and UI utilities
- **`/src/utils/`** - Utility functions, constants, and helper methods used throughout the application
- **`/src/types/`** - TypeScript type definitions for maintaining type safety across the application
- **`/src/lib/`** - Configuration and utility functions for third-party libraries

### Key Features

This is a certification exam platform (CertExcellence) that supports PMP and CAPM certification preparation with multi-stage exams, progress tracking, and detailed performance analytics.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/644f873e-e854-42e0-8f9b-35215df0829a) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
