import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { GoogleOAuthProvider } from "@react-oauth/google";
import router from "./router";
import Spinner from "../components/layout/Spinner";
import { AuthProvider, CartProvider, ProductProvider } from "../context";

function AppProviders({ children }) {
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  
  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <HelmetProvider>
        <AuthProvider>
          <ProductProvider>
            <CartProvider>{children}</CartProvider>
          </ProductProvider>
        </AuthProvider>
      </HelmetProvider>
    </GoogleOAuthProvider>
  );
}

export default function App() {
  return (
    <AppProviders>
      <Suspense fallback={<Spinner />}>
        <RouterProvider router={router} />
      </Suspense>
    </AppProviders>
  );
}
