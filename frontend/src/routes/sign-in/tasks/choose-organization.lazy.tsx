import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/sign-in/tasks/choose-organization')({
  component: RouteComponent,
})

function RouteComponent() {
  return <></>
}
