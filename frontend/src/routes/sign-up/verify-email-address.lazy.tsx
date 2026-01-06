import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/sign-up/verify-email-address')({
  component: RouteComponent,
})

// Need not add any UI here, Clerk will handle it
function RouteComponent() {
  return <></>
}
