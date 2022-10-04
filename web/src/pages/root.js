import { Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PlayerProvider from "../contexts/Player";
import Header from "../components/header";
import Main from "../components/main";
import Footer from "../components/footer";

const queryClient = new QueryClient();

function Root() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="app-container">
        <PlayerProvider>
          <Header />
          <Main>
            <Outlet />
          </Main>
          <Footer />
        </PlayerProvider>
      </div>
    </QueryClientProvider>
  );
}

export default Root;
