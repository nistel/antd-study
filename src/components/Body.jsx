import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Layout, Menu } from 'antd';
import {Route} from "react-router-dom";
import Board from "./Board";
import Users from "./Users";
const { Header, Content, Footer } = Layout;

const Body = () => {
    return (
        <Layout>
            <Header className="site-layout-sub-header-background" style={{ padding: 0 }} />
            <Content style={{ margin: '24px 16px 0' }}>
                <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                    {/*<Route path="/" exact={true} component={Home}/>*/}
                    <Route path="/boards" component={Board}/>
                    <Route path="/users" component={Users}/>
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>COPYRIGHT (c) DRX Academy ALL RIGHTS RESERVED. Created by Ty</Footer>
        </Layout>
    )
}

export default Body