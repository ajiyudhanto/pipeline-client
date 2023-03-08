import FullLayout from "../layouts/FullLayout";
import Head from "next/head";
import "../styles/style.scss";
import "../styles/global.css";
import { RouteGuard } from "../../RouteGuard";
import { useRouter } from "next/router";
import React from "react";

function MyApp({ Component, pageProps }) {
  let router = useRouter();

  let token = null;
  if (typeof window !== "undefined") {
    // Perform localStorage action
    token = localStorage.getItem("token");
  }
  console.log(token, "props");
  function componentDidMount() {
    renderPosts();
  }

  const renderPosts = async () => {
    try {
      router.push("/login");
    } catch (err) {
      console.log(err);
    }
  };
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
          {token ? <Component {...pageProps} /> : componentDidMount()}
          {/* </RouteGuard> */}
        </FullLayout>
      ) : (
        <Component {...pageProps} />
      )}
    </>
  );
}

export default MyApp;
