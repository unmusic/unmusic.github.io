import { Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PlayerProvider from "../contexts/Player";
import Header from "../components/header";
import Footer from "../components/footer";

const queryClient = new QueryClient();

function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="app-container">
        <PlayerProvider>
          <Header />
          <main className="main">
            <Outlet />
          </main>
          <Footer />
        </PlayerProvider>
      </div>
    </QueryClientProvider>
  );
}

export default Home;
