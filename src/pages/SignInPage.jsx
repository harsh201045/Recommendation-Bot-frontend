import { SignIn } from "@clerk/clerk-react"

const SignInPage = () => {
  return (
    <div className="w-full flex justify-center">
        <SignIn forceRedirectUrl="http://localhost:5173/"/>
    </div>
  )
}

export default SignInPage