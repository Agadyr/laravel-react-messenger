import ChatLayout from '@/Layouts/ChatLayout';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";

function Home() {
    return (
            Messages
    );
}

Home.layout = (page) => {
    return (
        <AuthenticatedLayout>
            <ChatLayout children={page}>
                Messages
            </ChatLayout>
        </AuthenticatedLayout>
    )
}

export default Home
