import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { DataContext } from "@/Provider/DataContext"; // Import the context provider
import Layout from "@/Components/Layouts/defaultLayout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <DataContext> {/* Wrap the entire app with DataContext */}
    <Layout>
      <Component {...pageProps} />
      </Layout>
    </DataContext>
  );
}
