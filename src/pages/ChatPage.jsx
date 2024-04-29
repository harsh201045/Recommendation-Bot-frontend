import React, { useEffect, useRef, useState } from "react";
import ChatInput from "../components/ChatInput";
import ChatItem from "../components/ChatItem";
import Loader from "../components/Loader";
import 'regenerator-runtime'
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { ask } from "../api/chat";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router";
import Navbar from "../components/Navbar";



const ChatPage = () => {
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const bottomRef = useRef(null);
    const navigate = useNavigate();
    const user = useUser()
    const [chats, setChats] = useState([
        // {
        //     message: "Hello",
        //     products: [],
        //     type: "sent"
        // },
        // {
        //     message: "Hi there",
        //     products: [
        //         {
        //             title: "Product 1",
        //             description: "Description of Product 1",
        //             imageURL: "https://example.com/product1.jpg"
        //         },
        //         {
        //             title: "Product 2",
        //             description: "Description of Product 2",
        //             imageURL: "https://example.com/product2.jpg"
        //         }
        //     ],
        //     type: "recieved"
        // }
    ]);
    
    useEffect(()=>{
        if(user.isLoaded && !user.isSignedIn){
            navigate("/");
        }
        else{
            return;
        }
    }, [user.isLoaded])
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition,
    } = useSpeechRecognition();
    const micControl = () => {
        if (listening === true) {
            
            SpeechRecognition.stopListening();
        } else {
            SpeechRecognition.startListening();
        }
    };
    useEffect(() => {
        setMessage(transcript);
    }, [transcript]);


    const onSubmit = async (event) => {
        event.preventDefault();
        setMessage("");
        let temp = {
            message: message,
            products: [],
            type: "sent"
        };
        setChats([...chats, temp]);
        bottomRef.current.scrollIntoView();
        setLoading(true);
        const response = await ask(message);
        setTimeout(() => {
            if (response.success) {
                console.log(response)
                setLoading(false);
                temp = {
                    message: response.data.message,
                    products: response.data.products,
                    type: "received"
                };
            } else {
                temp = {
                    message: "Error occurred",
                    products: [],
                    type: "received"
                };
            }
            setChats(prevChats => [...prevChats, temp]);
            bottomRef.current.scrollIntoView();
        }, 100);
    };
    
    return (
        <div className="px-[1rem]">
            <Navbar/>
            <div className="flex flex-col justify-between  h-[90vh] ">
                <div className="chat-area w-full overflow-y-scroll noscrollbar">
                    {chats.map((chat, index) => (
                        <ChatItem key={index} chat={chat} type={chat.type} products={chat.products} />
                    ))}
                    <div className="bottom-ref" ref={bottomRef}></div>
                </div>
                <div className="chat-input py-[1rem] relative">
                    {loading && <div className="absolute top-[-2rem] left-[2rem]"><Loader /></div>}
                    <ChatInput message={message} setMessage={setMessage} onSubmit={onSubmit} loading={loading} micControl={micControl}/>
                </div>
            </div>
        </div>
    );
};

export default ChatPage;
