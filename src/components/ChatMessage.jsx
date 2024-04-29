import Loader from "./Loader"

const ChatMessage = ({message}) => {
  return (message==="loading101#")?(
    <Loader/>
  ):(
    <div className='p-[1rem] shadow-md rounded-md rounded-ss-none max-w-[50%]'>
        <p>
            {message || " placeholder . . . "}
        </p>
    </div>
  )
}

export default ChatMessage