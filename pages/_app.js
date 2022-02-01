import EditUserDetailsProvider from "../contextProvider/EditUserDetailsContext";
import SelectedDateProvider from "../contextProvider/SelectedDateContext";
import SignInProvider from "../contextProvider/SignInContext";
import "../styles/globals.css";
import Footer from "../components/Footer";

function MyApp({ Component, pageProps }) {
  return (
    <SignInProvider>
      <SelectedDateProvider>
        <EditUserDetailsProvider>
          <Component {...pageProps} />
          <Footer />
        </EditUserDetailsProvider>
      </SelectedDateProvider>
    </SignInProvider>
  );
}

export default MyApp;
