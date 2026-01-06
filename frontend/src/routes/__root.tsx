import { createRootRoute } from "@tanstack/react-router";
import { ClerkProvider } from "@clerk/clerk-react";
import Layout from "../components/layout.tsx";

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Add your Clerk Publishable Key to the .env file')
}

import React from 'react';

const TanStackRouterDevtools =
  import.meta.env.PROD
    ? () => null // Render nothing in production
    : React.lazy(() =>
      // Lazy load in development
      import('@tanstack/react-router-devtools').then((res) => ({
        default: res.TanStackRouterDevtools,
      })),
    )

const RootLayout = () => (
  <>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <Layout />
      <React.Suspense>
        <TanStackRouterDevtools />
      </React.Suspense>
    </ClerkProvider>
  </>
)

export const Route = createRootRoute({ component: RootLayout })
