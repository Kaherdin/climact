import Layout from "@/components/Layout";
import client from "@/context/Apollo";
import { ApolloProvider } from "@apollo/client";
import "@/styles/css/nucleo-svg.css";
import "@/styles/css/nucleo-icons.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../node_modules/bootstrap/scss/bootstrap.scss";
import "@/styles/now/scss/now-design-system-pro.scss";
import PlausibleProvider from "next-plausible";
import { SSRProvider } from "react-bootstrap";

function MyApp({ Component, pageProps }) {
  return (
    <SSRProvider>
      <PlausibleProvider domain="climact.ch">
        <ApolloProvider client={client}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ApolloProvider>
      </PlausibleProvider>
    </SSRProvider>
  );
}

export default MyApp;
