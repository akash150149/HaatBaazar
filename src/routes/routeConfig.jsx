import { lazy } from "react";

const HomePage = lazy(() => import("../features/home/pages/HomePage"));
const ProductsPage = lazy(() => import("../features/products/pages/ProductsPage"));
const ProductDetailsPage = lazy(() => import("../features/products/pages/ProductDetailsPage"));
const CartPage = lazy(() => import("../features/cart/pages/CartPage"));
const CheckoutPage = lazy(() => import("../features/checkout/pages/CheckoutPage"));
const OrderConfirmationPage = lazy(() => import("../features/checkout/pages/OrderConfirmationPage"));
const LoginPage = lazy(() => import("../features/auth/pages/LoginPage"));
const RegisterPage = lazy(() => import("../features/auth/pages/RegisterPage"));
const ForgotPasswordPage = lazy(() => import("../features/auth/pages/ForgotPasswordPage"));
const AdminDashboardPage = lazy(() => import("../features/admin/pages/AdminDashboardPage"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));

export const routes = {
  HomePage,
  ProductsPage,
  ProductDetailsPage,
  CartPage,
  CheckoutPage,
  OrderConfirmationPage,
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  AdminDashboardPage,
  NotFoundPage
};
