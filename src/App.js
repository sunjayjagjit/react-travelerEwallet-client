import React, { useEffect } from "react";
import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register";
import Home from "./pages/Home";
import Header from './components/nav/Header';
import RegisterCustomer from './pages/auth/RegisterCustomer';
import ForgotPassword from './pages/auth/ForgotPassword';
import { auth } from './firebase';
import { useDispatch } from 'react-redux';
import { currentUser } from './functions/auth';
import History from './pages/user/History';
import UserPrivateRoutes from './components/routes/UserPrivateRoutes';
import AdminRoute from './components/routes/AdminRoute';
import Password from './pages/user/Password';
import PackageWishlist from './pages/user/PackageWishlist';
import AdminDashBoard from './pages/admin/AdminDashBoard';
import CategoryCreate from "./pages/admin/category/CategoryCreate";
import CategoryUpdate from "./pages/admin/category/CategoryUpdate";
import SubCreate from "./pages/admin/sub/SubCreate";
import SubUpdate from "./pages/admin/sub/SubUpdate";
import PackageCreate from "./pages/admin/packageprod/PackageCreate";
import AllPackages from "./pages/admin/packageprod/AllPackages";
import PackageUpdate from "./pages/admin/packageprod/PackageUpdate";
import PackageVacation from "./pages/PackageVacation";
import CategoryHome from "./pages/category/CategoryHome";
import SubHome from "./pages/sub/SubHome";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import SideCartDrawer from "./components/drawer/SideCartDrawer";
import PackagesCheckout from "./pages/PackagesCheckout";
import CreateRewardPage from "./pages/admin/reward/CreateRewardPage";
import PackagesPayment from "./pages/PackagesPayment"



const App = () => {

  const dispatch = useDispatch()

  //authorization checking with firebase
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult()
        console.log("user", user);

        currentUser(idTokenResult.token)
          .then((res) => {
            //to verify the email and token to redux
            dispatch({
              type: 'LOGGED_IN_USER',
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
          })
          .catch(err => console.log(err));
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <>
      <Header />
      <SideCartDrawer />
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/register/complete" component={RegisterCustomer} />
        <Route exact path="/forget/password" component={ForgotPassword} />

        <UserPrivateRoutes exact path="/user/history" component={History} />
        <UserPrivateRoutes exact path="/user/password" component={Password} />
        <UserPrivateRoutes exact path="/user/wishlist" component={PackageWishlist} />

        <AdminRoute exact path="/admin/dashboard" component={AdminDashBoard} />
        <AdminRoute exact path="/admin/category" component={CategoryCreate} />
        <AdminRoute exact path="/admin/category/:slug" component={CategoryUpdate} />
        <AdminRoute exact path="/admin/sub" component={SubCreate} />
        <AdminRoute exact path="/admin/sub/:slug" component={SubUpdate} />
        <AdminRoute exact path="/admin/package" component={PackageCreate} />
        <AdminRoute exact path="/admin/packages" component={AllPackages} />
        <AdminRoute exact path="/admin/package/:slug" component={PackageUpdate} />
        <AdminRoute exact path="/admin/reward" component={CreateRewardPage} />


        <Route exact path="/package/:slug" component={PackageVacation} />
        <Route exact path="/category/:slug" component={CategoryHome} />
        <Route exact path="/sub/:slug" component={SubHome} />
        <Route exact path="/shop" component={Shop} />
        <Route exact path="/cart" component={Cart} />
        <UserPrivateRoutes exact path="/checkout" component={PackagesCheckout} />
        <UserPrivateRoutes exact path="/payment" component={PackagesPayment} />

      </Switch >

    </>



  )

}

export default App;
