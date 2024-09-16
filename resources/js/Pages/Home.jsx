import ChatLayout from '@/Layouts/ChatLayout';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";

function Home() {
    return (
            Messages
    );
}

Home.layout = (page) => {
    return (
        <>
            <ChatLayout children={page}>
                Messages
            </ChatLayout>
        </>
    )
}

export default Home;
