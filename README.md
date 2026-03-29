# 100xprompt - 3D Flipbook Marketing Website

An interactive 3D flipbook marketing website for 100xprompt, an enterprise AI infrastructure company focused on data sovereignty.

## Features

- **5 View Modes**: Executive, Millennial (3D Flipbook), AI (Terminal), Contact, Login
- **Interactive 3D Flipbook**: Scroll-to-flip navigation with 16 pages
- **Cinematic Overlays**: Animated data visualization sequences
- **Premium Design**: Glassmorphism, smooth animations, responsive layout

## Tech Stack

- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite 8
- **Styling**: Tailwind CSS 4
- **Animation**: Framer Motion
- **Flipbook**: react-pageflip
- **Icons**: Lucide React

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── book/          # Flipbook pages and layers
│   │   └── layers/    # Layer1-5 (pipeline stages)
│   ├── icons/         # Logo component
│   ├── sections/      # ContactSection
│   └── views/         # View modes (Executive, Millennial, AI, etc.)
├── hooks/             # Custom hooks
├── lib/               # Utilities
├── styles/            # Additional CSS
├── types/             # TypeScript declarations
├── App.tsx            # Main app with view routing
└── main.tsx           # Entry point
```

## Views

| View | Description |
|------|-------------|
| Executive | Premium landing page with glassmorphism design |
| Millennial | Interactive 3D flipbook with scroll navigation |
| AI | Terminal-style developer view |
| Contact | Contact form (UI only) |
| Login | Authentication page (UI only) |

## Customization

- Colors defined in `src/index.css` CSS variables
- Page content in `src/components/book/layers/`
- View modes in `src/components/views/`

## License

Private - 100xprompt
