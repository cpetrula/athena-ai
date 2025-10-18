# Athena AI

A modern Workers' Compensation application built with Vue.js, featuring an AI-driven component layout system for dynamic, role-based UI rendering.

## 🚀 Tech Stack

- **Vue.js 3.5** - The Progressive JavaScript Framework
- **Vue Router 4** - Official router for Vue.js
- **PrimeVue 4.4** - Rich UI Component Library with Aura theme
- **Tailwind CSS 4.1** - Utility-First CSS Framework
- **Vite 7.1** - Next Generation Frontend Tooling
- **PrimeIcons 7.0** - Icon library

## 📋 Features

### Core Application Features
- ✅ **AI-Driven Layout System** - Components are dynamically positioned based on metadata
- ✅ **Role-Based Access** - Different users see different components based on their role
- ✅ **Context-Aware Display** - Components adapt to the current context (claim, policy, dashboard)
- ✅ **Dynamic Routing** - Direct navigation to specific views (e.g., `/claim/77707`, `/policy/54678`)
- ✅ **Three-Column Layout** - Responsive layout that collapses on mobile
- ✅ **Global Search** - Context-aware search functionality in header
- ✅ **User Management** - User menu with profile and preferences access

### Component Widgets
- ✅ **Claim Summary** - Display key claim information
- ✅ **Claim Timeline** - Chronological view of claim events
- ✅ **AI Insights** - AI-generated recommendations and patterns
- ✅ **Notifications** - Important alerts and updates
- ✅ **Policy List** - Table of recent policies
- ✅ **Policy Details** - Comprehensive policy information

## 📦 Installation

```bash
# Install dependencies
npm install
```

## 🛠️ Development

```bash
# Start development server
npm run dev
```

The application will be available at `http://localhost:5173/`

## 🏗️ Build

```bash
# Build for production
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## 👀 Preview

```bash
# Preview production build locally
npm run preview
```

## 📁 Project Structure

```
athena-ai/
├── docs/
│   └── LAYOUT_SYSTEM.md    # AI-driven layout system documentation
├── public/                  # Static assets
├── src/
│   ├── assets/             # Dynamic assets (images, etc.)
│   ├── components/
│   │   ├── layout/         # Layout components
│   │   │   ├── AppHeader.vue
│   │   │   └── ThreeColumnLayout.vue
│   │   └── widgets/        # Reusable widget components
│   │       ├── AIInsightsWidget.vue
│   │       ├── ClaimSummaryWidget.vue
│   │       ├── ClaimTimelineWidget.vue
│   │       ├── NotificationsWidget.vue
│   │       ├── PolicyDetailsWidget.vue
│   │       └── PolicyListWidget.vue
│   ├── router/
│   │   └── index.js        # Vue Router configuration
│   ├── views/              # Page-level components
│   │   ├── DashboardView.vue
│   │   ├── ClaimView.vue
│   │   └── PolicyView.vue
│   ├── App.vue             # Root component
│   ├── main.js             # Application entry point
│   └── style.css           # Global styles with Tailwind directives
├── index.html              # HTML entry point
├── vite.config.js          # Vite configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── postcss.config.js       # PostCSS configuration
└── package.json            # Project dependencies
```

## 🎯 Application Architecture

### AI-Driven Component Layout

Athena AI uses a metadata-driven system where each component exports metadata describing:
- **Roles** - Which user roles should see the component
- **Contexts** - Which views the component is relevant for
- **Column Span** - How much space the component should occupy (1-3 columns)
- **Priority** - Relative importance for AI decision-making

Example metadata:
```javascript
export const metadata = {
  name: 'ClaimSummaryWidget',
  description: 'Displays claim information',
  roles: ['claims_adjuster', 'manager'],
  contexts: ['claim', 'dashboard'],
  columnSpan: 1,
  priority: 10
}
```

The `ThreeColumnLayout` component reads this metadata and automatically:
1. Filters components based on user role and context
2. Positions components in the three-column grid
3. Handles responsive layout for mobile devices

See [docs/LAYOUT_SYSTEM.md](docs/LAYOUT_SYSTEM.md) for detailed documentation.

### Routing

The application uses Vue Router with dynamic routes:
- `/` - Dashboard view
- `/claim/:id` - Claim detail view
- `/policy/:id` - Policy detail view

Each route has associated metadata for title and context, which is used by the header to display contextual information.

### Header Component

The `AppHeader` component provides:
- **Logo** - Links back to dashboard
- **Context Display** - Shows current context (e.g., "Claim #77707")
- **Global Search** - Search across claims, policies, and other entities
- **User Menu** - Access to profile, preferences, and logout

## 🎨 Design Patterns

- **Composition API** - Using `<script setup>` syntax for cleaner code
- **PrimeVue Components** - Consistent UI components throughout
- **Tailwind Utility Classes** - Rapid styling with utility-first CSS
- **Responsive Design** - Mobile-first approach with responsive breakpoints
- **Component Metadata** - Declarative approach to layout decisions

## 📚 Documentation

- [AI-Driven Layout System](docs/LAYOUT_SYSTEM.md) - Detailed guide on the metadata system
- [Vue.js Documentation](https://vuejs.org/)
- [Vue Router Documentation](https://router.vuejs.org/)
- [PrimeVue Documentation](https://primevue.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Vite Documentation](https://vitejs.dev/)

## 🔮 Future Enhancements

- Integration with OpenAI for real AI insights and summaries
- Backend API integration for real data
- User authentication and authorization
- Enhanced search functionality
- Real-time notifications
- Claim and policy CRUD operations
- Document management
- Reporting and analytics

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📝 License

This project is open source and available under the MIT License.

