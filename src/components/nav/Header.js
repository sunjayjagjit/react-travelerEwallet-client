import React, { useState } from 'react';
import { Menu, Badge } from 'antd';
import { HomeOutlined, SettingOutlined, UserOutlined, LockOutlined, ShopOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import firebase from 'firebase';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import "../../index.css";
import Search from "../forms/Search";



//need this for menu
const { SubMenu, Item } = Menu;


const Header = () => {

    const [current, setCurrent] = useState('home')
    const dispatch = useDispatch();
    const { user, cart } = useSelector((state) => ({ ...state }));
    const history = useHistory();

    const handleClick = (e) => {
        //to trigger the menu item
        // console.log(e.key);
        setCurrent(e.key);
    }

    //logout
    const logout = () => {
        firebase.auth().signOut()
        dispatch({
            type: "LOGOUT",
            payload: null,
        });
        history.push("/login");
    };


    return (

        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
            <Item key="home" icon={<HomeOutlined />}>
                {/* <Link to="/">Home - {JSON.stringify(user)}</Link> */}
                <Link to="/">Home</Link>
            </Item>

            <Item key="shop" icon={<ShopOutlined />} className="float-right">
                <Link to="/shop">Packages View</Link>
            </Item>

            <Item key="cart" icon={<ShoppingCartOutlined />} className="float-right">
                <Link to="/cart">
                    {/* Packages Cart{cart.length} */}
                    <Badge count={cart.length} offset={[9, 0]}>
                        Packages Cart
                    </Badge>
                </Link>
            </Item>


            {!user && (

                <Item key="register" icon={<LockOutlined />} className="float-right">
                    <Link to="/register">Register</Link>
                </Item>

            )}

            {!user && (<Item key="login" icon={<UserOutlined />} className="float-right">
                <Link to="/login">Login</Link>
            </Item>
            )}


            {
                user && (
                    <SubMenu
                        className="float-right"
                        key="SubMenu"
                        icon={<SettingOutlined />}
                        title={user.email && user.email.split("@")[0]}>
                        {user && user.role === 'subscriber' && (
                            <Item>
                                <Link to="user/history">My Account</Link>
                            </Item>

                        )}

                        {user && user.role === 'admin' && (
                            <Item>
                                <Link to="admin/dashboard">Dashboard</Link>
                            </Item>
                        )}

                        <Menu.ItemGroup theme="dark" title="">
                            <Item key="setting:3">My Wallet</Item>
                            <Item key="setting:4">Location History</Item>
                            <Item key="setting:5">Purchase History</Item>
                            <Item key="setting:6">Forum</Item>
                            <Item icon={<UserOutlined />} onClick={logout}>Logout</Item>
                        </Menu.ItemGroup>
                    </SubMenu>
                )
            }
            <span className="search">
                <Search />
            </span>
        </Menu>

    );
};

export default Header;