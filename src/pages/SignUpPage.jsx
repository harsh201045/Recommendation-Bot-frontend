import { SignUp } from '@clerk/clerk-react'

const SignUpPage = () => {
    return (
        <div className='w-full flex justify-center'>
            <SignUp forceRedirectUrl="http://localhost:5173/chat"/>
        </div>
    )
}

export default SignUpPage