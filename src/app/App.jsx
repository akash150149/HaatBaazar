import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import router from "./router";
import Spinner from "../components/layout/Spinner";
import { AuthProvider, CartProvider, ProductProvider } from "../context";

function AppProviders({ children }) {
  return (
    <HelmetProvider>
      <AuthProvider>
        <ProductProvider>
          <CartProvider>{children}</CartProvider>
        </ProductProvider>
      </AuthProvider>
    </HelmetProvider>
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
