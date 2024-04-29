import { UserButton } from "@clerk/clerk-react"

const Navbar = () => {
  return (
    <div className="flex justify-end items-center w-full h-[7vh] backdrop-blur-sm border-b-[1px] relative">
      <div className="absolute">
        <UserButton/>
      </div>
    </div>
  )
}

export default Navbar