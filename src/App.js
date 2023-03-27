import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  PATH_LOGIN,
  PATH_ROOT,
  ADD_CUSTOMER,
  CUSTOMERS,
  // CUSTOMERS_ID,
  ADD_PRODUCT,
  PRODUCTS,
  ADD_INVOICE,
  INVOICES,
  // INVOIC_ID,
  CATEGORY,
  ADD_CATEGORY,
} from "./component/constants";
import AddCustomer from "./component/customer/AddCustomer";
import CustomerList from "./component/customer/CustomerList";
import CategoryList from "./component/category/CategoryList";
import AddCategory from "./component/category/AddCategory";
// import Topmenu from "./component/Topmenu";
import AddProduct from "./component/product/AddProduct";
import ProductList from "./component/product/ProductList";
import InvoiceList from "./component/invoice/InvoiceList";
import AddInvoice from "./component/invoice/AddInvoice";
import ViewInvoice from "./component/invoice/ViewInvoice";
import EditCustomer from "./component/customer/EditCustomer";
import { Login } from "./component/authentication/Login";
import ProtectedRoutes from "./component/authentication/ProtectedRoutes";
import { AuthProvider } from "./context/AuthProvider";

function App() {
  return (
    <>
      <body className="hold-transition skin-blue layout-top-nav">
        <div className="wrapper">
          <Router>
            {/* <Topmenu></Topmenu> */}
            <AuthProvider>
              <Routes>
                <Route path={PATH_LOGIN} element={<Login />} />
                <Route element={<ProtectedRoutes />}>
                  <Route path={PATH_ROOT} exact element={<CustomerList />} />
                  <Route path={ADD_CUSTOMER} exact element={<AddCustomer />} />
                  <Route path={CUSTOMERS} element={<CustomerList />} />
                  <Route path="/customers/:id" element={<EditCustomer />} />
                  <Route path={ADD_PRODUCT} exact element={<AddProduct />} />
                  <Route path={PRODUCTS} element={<ProductList />} />
                  <Route path={ADD_INVOICE} exact element={<AddInvoice />} />
                  <Route path={INVOICES} element={<InvoiceList />} />
                  <Route path="/invoices/:id" element={<ViewInvoice />} />
                  <Route path={CATEGORY} element={<CategoryList />} />
                  <Route path={ADD_CATEGORY} exact element={<AddCategory />} />
                </Route>
              </Routes>
            </AuthProvider>
          </Router>
        </div>
      </body>
    </>
  );
}

export default App;
