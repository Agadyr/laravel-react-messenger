import {usePage} from "@inertiajs/react";
import UserAvatar from "@/Components/App/UserAvatar.jsx";
import ReactMarkdown from "react-markdown";
import React from "react";
import { formatMessageDateLong } from "@/helpers"
const MessageItem = ( {message, attachmentClick} ) => {
    const currentUser = usePage().props.auth.user

    return (
        <div className={"chat " + (message.sender.id === currentUser.id ? "chat-end" : "chat-start")}>
            {<UserAvatar user={message.sender}/>}
            <div className="chat-header">
                {message.sender_id !== currentUser.id ? message.sender.name : ""}
                <time className="text-xs opacity-50 ml-2">
                    {formatMessageDateLong(message.created_at)}
                </time>
            </div>

            <div className={"chat-bubble relative" +
                (message.sender.id === currentUser.id ? "chat-bubble-info" : "")}>
                    <div className="chat-message">
                        <div className="chat-message-content">
                            <ReactMarkdown>{message.message}</ReactMarkdown>
                        </div>
                    </div>
            </div>
        </div>
    )
}

export default MessageItem
