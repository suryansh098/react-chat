import { ChatContextProvider } from "../context/chat-context";
// import components
import Chat from "../components/Chat/Chat";
import Layout from "../components/Layout/Layout";
import Sidebar from "../components/Sidebar/Sidebar";

const Home = () => {
  return (
    <ChatContextProvider>
      <Layout>
        <Sidebar />
        <Chat />
      </Layout>
    </ChatContextProvider>
  );
};

export default Home;
