import { Outlet, Link } from "@tanstack/react-router"
import { SignedIn, SignedOut, useOrganization } from "@clerk/clerk-react";
import React, { Suspense } from "react";

const UserButton = React.lazy(() => import("@clerk/clerk-react").then(module => ({ default: module.UserButton })));
const OrganizationSwitcher = React.lazy(() => import("@clerk/clerk-react").then(module => ({ default: module.OrganizationSwitcher })));

function Layout() {
  const { organization } = useOrganization();

  return <div className={"layout"}>
    <div className={"nav"}>
      <div className={"nav-container"}>
        <Link to={"/"} className={"nav-logo"}>
          TaskBoard
        </Link>

        <div className={"nav-links"}>
          <Link to={"/pricing"} className={"nav-link"}>
            Pricing
          </Link>
          <SignedOut>
            <Link to={"/sign-in"} className={"nav-link"}>
              Sign In
            </Link>
            <Link to={"/sign-up"} className={"btn btn-primary"}>
              Sign Up
            </Link>
          </SignedOut>
          <SignedIn>
            <Suspense fallback={null}>
              <OrganizationSwitcher
                hidePersonal
                afterCreateOrganizationUrl={"dashboard"}
                afterSelectOrganizationUrl={"dashboard"}
                createOrganizationMode={"modal"}
                appearance={{
                  elements: {
                    userPreviewMainIdentifierText__personalWorkspace: {
                      color: "white"
                    },
                    organizationPreviewMainIdentifier__organizationSwitcherTrigger: {
                      color: "white"
                    }
                  }
                }}
              />
            </Suspense>
            {organization &&
              <Link to={"/dashboard"} className={"nav-link"}>
                Dashboard
              </Link>}
            <Suspense fallback={null}>
              <UserButton />
            </Suspense>
          </SignedIn>
        </div>
      </div>
    </div>
    <main>
      <Outlet />
    </main>
  </div>
}

export default Layout