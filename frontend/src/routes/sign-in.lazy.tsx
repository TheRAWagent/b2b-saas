import { SignIn } from '@clerk/clerk-react'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/sign-in')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div className={"auth-container"}>
    <SignIn routing={"path"} path={"/sign-in"} signUpUrl={"/sign-up"} />
  </div>
}
