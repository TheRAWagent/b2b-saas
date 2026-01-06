import { SignUp } from '@clerk/clerk-react'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/sign-up')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div className={"auth-container"}>
    <SignUp routing={"path"} path={"/sign-up"} signInUrl={"/sign-in"} />
  </div>
}
