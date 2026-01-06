import { createLazyFileRoute, Link } from '@tanstack/react-router'
import { SignedIn, SignedOut, useOrganization } from '@clerk/clerk-react'
import React, { Suspense } from 'react'

const CreateOrganization = React.lazy(() => import('@clerk/clerk-react').then(m => ({ default: m.CreateOrganization })))

export const Route = createLazyFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { organization } = useOrganization();

  return <div className={"home-container"}>
    <h1 className={"home-title"}>
      Team Task Management <br />
      <span className={"home-title-accent"}>Made Simple</span>
    </h1>
    <p className={"home-subtitle"}>
      Organize your team's work with powerful task boards.
      Create, assign, and track tasks across your organization.
    </p>

    <SignedOut>
      <div className={"home-buttons"}>
        <Link to={"/sign-up"} className={"btn btn-primary btn-lg"}>
          Get Started for Free
        </Link>
        <Link to={"/sign-in"} className={"btn btn-outline btn-lg"}>
          Sign In
        </Link>
      </div>
    </SignedOut>
    <SignedIn>
      {organization ? (
        <Link to={"/dashboard"} className={"btn btn-primary btn-lg"}>
          Go to Dashboard
        </Link>
      ) : <div className={"home-create-org"}>
        <Suspense fallback="Loading...">
          <CreateOrganization afterCreateOrganizationUrl={"/dashboard"} />
        </Suspense>
      </div>}
    </SignedIn>
  </div>
}
