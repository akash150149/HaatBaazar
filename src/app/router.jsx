import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import ErrorPage from "../pages/ErrorPage";
import ProtectedRoute from "../routes/ProtectedRoute";
import AdminRoute from "../routes/AdminRoute";
import { routes } from "../routes/routeConfig";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <routes.HomePage /> },
      { path: "products", element: <routes.ProductsPage /> },
      { path: "products/:productId", element: <routes.ProductDetailsPage /> },
      { path: "cart", element: <routes.CartPage /> },
      {
        element: <ProtectedRoute />,
        children: [
          { path: "checkout", element: <routes.CheckoutPage /> },
          { path: "order-confirmation", element: <routes.OrderConfirmationPage /> }
        ]
      },
      {
        path: "auth",
        children: [
          { path: "login", element: <routes.LoginPage /> },
          { path: "register", element: <routes.RegisterPage /> },
          { path: "forgot-password", element: <routes.ForgotPasswordPage /> }
        ]
      },
      {
        element: <AdminRoute />,
        children: [{ path: "admin", element: <routes.AdminDashboardPage /> }]
      },
      { path: "*", element: <routes.NotFoundPage /> }
    ]
  }
]);

export default router;
