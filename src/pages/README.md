# Pages Directory Structure

This directory contains all the page components organized by functionality.

## Directory Structure

```
src/pages/
├── articles/           # Article-related pages
│   ├── ArticlesPage.tsx
│   ├── ArticlesPage.css
│   ├── ArticleDetailPage.tsx
│   ├── ArticleDetailPage.css
│   └── index.ts
├── projects/           # Project-related pages
│   ├── ProjectsPage.tsx
│   ├── ProjectsPage.css
│   ├── ProjectDetailPage.tsx
│   ├── ProjectDetailPage.css
│   └── index.ts
├── crafts/             # Craft-related pages
│   ├── CraftsPage.tsx
│   ├── CraftsPage.css
│   ├── CraftDetailPage.tsx
│   ├── CraftDetailPage.css
│   └── index.ts
├── index.ts            # Main export file
└── README.md           # This file
```

## Organization

- **articles/**: Contains all article-related pages and their styles
- **projects/**: Contains all project-related pages and their styles  
- **crafts/**: Contains all craft-related pages and their styles

Each subdirectory contains:
- React component files (`.tsx`)
- Corresponding CSS files (`.css`)
- An `index.ts` file for clean exports

## Usage

Import pages from the main index file:

```typescript
import { ArticlesPage, ProjectsPage, CraftsPage } from '../pages';
```

Or import from specific subdirectories:

```typescript
import { ArticlesPage } from '../pages/articles';
``` 