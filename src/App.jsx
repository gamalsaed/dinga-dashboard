import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "./components/ErrorFallback.jsx";
import { lazy, Suspense } from "react";
import AccordianTableProvider from "./Contexts/AccordianTableCtx.jsx";
import ThemeProvider from "./Contexts/ThemeContext.jsx";
import "./App.css";
import { queryClient } from "./utilities.js";
import Root from "./Pages/Root";
import Loading from "./UI/Loading.jsx";
import Home from "./Pages/Home.jsx";
// Product
// import ProductPage from "./Pages/ProductPages/ProductPage.jsx";
import Products from "./components/Products/Products.jsx";
import NewProduct from "./Pages/ProductPages/NewProduct.jsx";
import EditProduct from "./Pages/ProductPages/EditProduct.jsx";
import ShowProductPage from "./Pages/ProductPages/ShowProductPage.jsx";
// Customer
// import CustomersPage from "./Pages/CustomersPages/CustomersPage.jsx";
import Customers from "./components/CustomerLayouts/Customers.jsx";
import NewCustomer from "./Pages/CustomersPages/NewCustomer.jsx";
import EditCustomer from "./Pages/CustomersPages/EditCustomer.jsx";
import ShowCustomer from "./Pages/CustomersPages/ShowCustomer.jsx";
// Transaction
// import TransactionPage from "./Pages/TransactionPage.jsx";
import Transactions from "./Pages/Transactions/Transactions.jsx";
import TransactionEdit from "./Pages/Transactions/TransactionEdit.jsx";
import TransactionNew from "./Pages/Transactions/TransactionNew.jsx";
import ShowTransaction from "./Pages/Transactions/ShowTransaction.jsx";

import SalesReport from "./Pages/SalesReport.jsx";
import AccountSettings from "./Pages/AccountSettings.jsx";
import Help from "./Pages/Help.jsx";
import MapPage from "./Pages/MapPage.jsx";

const ProductPage = lazy(() => import("./Pages/ProductPages/ProductPage.jsx"));
const TransactionPage = lazy(() => import("./Pages/TransactionPage.jsx"));
const CustomersPage = lazy(() =>
  import("./Pages/CustomersPages/CustomersPage.jsx")
);

const fallback = (
  <div className="flex justify-center items-center h-screen ">
    <Loading />
  </div>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorFallback />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "products",
        element: (
          <Suspense fallback={fallback}>
            <ProductPage />
          </Suspense>
        ),
        children: [
          { index: true, element: <Products /> },
          { path: "new", element: <NewProduct /> },
          { path: "edit/:productId", element: <EditProduct /> },
          { path: ":productId", element: <ShowProductPage /> },
        ],
      },
      {
        path: "transactions",
        element: (
          <Suspense fallback={fallback}>
            <TransactionPage />
          </Suspense>
        ),
        children: [
          { index: true, element: <Transactions /> },
          { path: "new", element: <TransactionNew /> },
          { path: "edit/:transactionId", element: <TransactionEdit /> },
          { path: ":transactionId", element: <ShowTransaction /> },
        ],
      },
      {
        path: "customers",
        element: (
          <Suspense fallback={fallback}>
            <CustomersPage />
          </Suspense>
        ),
        children: [
          { index: true, element: <Customers /> },
          { path: "new", element: <NewCustomer /> },
          { path: "edit/:customerId", element: <EditCustomer /> },
          { path: ":customerId", element: <ShowCustomer /> },
        ],
      },
      { path: "sales-report", element: <SalesReport /> },
      { path: "account-settings", element: <AccountSettings /> },
      { path: "help", element: <Help /> },
      { path: "map", element: <MapPage /> },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AccordianTableProvider>
        <ThemeProvider>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense fallback={fallback}>
              <div className="h-full">
                <RouterProvider router={router} />
              </div>
            </Suspense>
          </ErrorBoundary>
        </ThemeProvider>
      </AccordianTableProvider>
    </QueryClientProvider>
  );
}

export default App;
