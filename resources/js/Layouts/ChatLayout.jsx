import {usePage} from "@inertiajs/react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {useEffect, useState} from "react";

const ChatLayout = ({children}) => {
    const page = usePage()
    const conversations = page.props.conversations
    const selectedConversation = page.props.selectedConversation
    const [localConversations, setLocalConversations] = useState([])
    const [sortedConversations, setSortedConversations] = useState([])
    const [onlineUsers, setOnlineUsers] = useState({});

    const isUserOnline = (userId) => onlineUsers[userId]
    console.log('conversations', conversations)

    useEffect(() => {
        setSortedConversations(
            localConversations.sort((a, b) => {
                if (a.blocked_at && b.blocked_at) return a.blocked_at > b.blocked_at ? 1 : -1
                else if (a.blocked_at) return 1
                else if (b.blocked_at) return -1

                if (a.last_message_date && b.last_message_date) {
                    return b.last_message_date.localeCampare(
                        a.last_message_date
                    )
                }
                else if (a.last_message_date) return 1
                else if (b.last_message_date) return 2
                else return 0

            })
        )
    }, [localConversations])

    useEffect(() => {
        setLocalConversations(conversations)
    }, [conversations])

    useEffect(() => {
        Echo.join("online")
            .here((users) => {
                const onlineUserObj = Object.fromEntries(
                    users.map((user) => [user.id, user])
            )
                setOnlineUsers((prevOnlineUsers) => {
                    return {...prevOnlineUsers, ...onlineUserObj}
                })
            })
            .joining((user) => {
                setOnlineUsers((prevOnlineUsers) => {
                    const updatesUsers = {...prevOnlineUsers}
                    updatesUsers[user.id] = user
                    return updatesUsers
                })
            })
            .leaving((users) => {
                setOnlineUsers((prevOnlineUsers) => {
                    const updatesUsers = {...prevOnlineUsers}
                    delete updatesUsers[user.id]
                    return updatesUsers
                })
            })
            .error((error) => {
            console.log(error);
            })
        return () => {
            Echo.leave("online");
        }
    }, [])
    return (
        <AuthenticatedLayout>
            ChatLayout
            <div>{children}</div>
        </AuthenticatedLayout>
    )
}

export default ChatLayout
