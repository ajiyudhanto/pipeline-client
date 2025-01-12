import FullLayout from "../layouts/FullLayout";
import Head from "next/head";
import "../styles/style.scss";
import "../styles/global.css";
import { RouteGuard } from "../../RouteGuard";
import { useRouter } from "next/router";
import { useEffect, useState } from "react"

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [token, setToken] = useState("")

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Perform localStorage action
      setToken(localStorage.getItem("token"));
    }
    console.log(token, "props");

    if (!token) router.push("/login");
  }, [token]);

  return (
    <>
      <Head>
        <title>Pipeline Management</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {Component.name !== "Login" ? (
        <FullLayout>
          {/* <RouteGuard> */}
          <Component {...pageProps} />
          {/* </RouteGuard> */}
        </FullLayout>
      ) : (
        <Component {...pageProps} />
      )}
    </>
  );
}

export default MyApp;
