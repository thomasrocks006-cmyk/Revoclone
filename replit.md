# Overview

This is a Revolut-inspired mobile banking application built as a full-stack web application. The project mimics the core functionality and user interface of the popular digital banking app, featuring account management, transaction tracking, card management, and cryptocurrency portfolio viewing. It's designed as a Progressive Web App (PWA) with mobile-first responsive design.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

The client-side application is built with React and TypeScript, using modern web technologies for a native app-like experience:

- **Framework**: React 18 with TypeScript for type-safe component development
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management and caching
- **Styling**: Tailwind CSS with a custom design system implementing Revolut's visual identity
- **UI Components**: Radix UI primitives with custom shadcn/ui components for consistent, accessible interface elements
- **Build Tool**: Vite for fast development and optimized production builds
- **PWA Features**: Service worker configuration, app manifest, and mobile-optimized meta tags

The application follows a component-based architecture with clear separation of concerns. Pages are organized by feature (Home, Transactions, Cards, Crypto, etc.) and leverage reusable UI components. The design system uses CSS custom properties for theming and supports both light and dark modes.

## Backend Architecture

The server-side is built with Node.js and Express, providing a RESTful API for the frontend:

- **Framework**: Express.js with TypeScript for type-safe server development
- **Architecture Pattern**: Simple REST API with route-based organization
- **Data Storage**: In-memory storage implementation with interface-based design for future database integration
- **Development Setup**: Development server with Vite middleware integration for seamless full-stack development

The API follows RESTful conventions with endpoints for user management, transactions, cards, and cryptocurrency data. The storage layer uses an interface pattern that allows for easy migration from in-memory storage to a persistent database solution.

## Data Storage Solutions

Currently implements an in-memory storage system with plans for database integration:

- **Current**: MemStorage class implementing the IStorage interface with seeded mock data
- **Schema Definition**: Drizzle ORM schema definitions in shared directory for future PostgreSQL integration
- **Planned Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Migration Strategy**: Drizzle Kit configured for schema management and migrations

The schema includes tables for users, transactions, cards, and crypto assets with proper relationships and constraints. The interface-based storage design allows for seamless transition from mock data to persistent storage.

## Authentication and Authorization

The current implementation focuses on demo functionality with a default user:

- **Demo User**: Thomas Francis user seeded in memory storage
- **Session Management**: Basic session handling prepared for future authentication
- **Security**: Express middleware configured for JSON parsing and URL encoding

The architecture is prepared for implementing proper authentication with session management and user registration flows.

# External Dependencies

## Core Framework Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL driver for database connectivity
- **drizzle-orm**: Type-safe ORM for database operations with PostgreSQL support
- **drizzle-kit**: CLI tool for database schema management and migrations

## Frontend UI Libraries
- **@radix-ui/***: Comprehensive set of accessible UI primitives for components like dialogs, dropdowns, navigation menus, and form controls
- **@tanstack/react-query**: Server state management with caching, synchronization, and background updates
- **tailwindcss**: Utility-first CSS framework for responsive design
- **class-variance-authority**: Utility for managing CSS class variants
- **cmdk**: Command palette component for search functionality

## Development and Build Tools
- **vite**: Fast build tool and development server
- **@vitejs/plugin-react**: React plugin for Vite
- **@replit/vite-plugin-runtime-error-modal**: Replit-specific error handling
- **@replit/vite-plugin-cartographer**: Development tooling for Replit environment

## Utility Libraries
- **wouter**: Lightweight React router (2.8kb alternative to React Router)
- **date-fns**: Modern JavaScript date utility library
- **clsx**: Utility for constructing className strings conditionally
- **nanoid**: Secure URL-friendly unique string ID generator

The project is configured to work seamlessly in the Replit development environment while maintaining compatibility with standard deployment platforms.