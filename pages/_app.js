import Layout from "../components/Layout";
import EditUserDetailsProvider from "../contextProvider/EditUserDetailsContext";
import SelectedDateProvider from "../contextProvider/SelectedDateContext";
import SignInProvider from "../contextProvider/SignInContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <SignInProvider>
      <SelectedDateProvider>
        <EditUserDetailsProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </EditUserDetailsProvider>
      </SelectedDateProvider>
    </SignInProvider>
  );
}

export default MyApp;
