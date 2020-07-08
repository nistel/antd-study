import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Layout } from 'antd';
import {Route} from "react-router-dom";
import Main from "../containers/Main";
import Keyword from "../containers/Keyword";
const { Header, Content, Footer } = Layout;

const Body = () => {
    return (
        <Layout>
            <Header className="site-layout-sub-header-background" style={{ padding: 0 }} />
            <Content style={{ margin: '24px 16px 0' }}>
                <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                    {/*<Route path="/" exact={true} component={Home}/>*/}
                    <Route path="/boards" component={Main}/>
                    <Route path="/keyword" component={Keyword}/>
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>COPYRIGHT (c) DRX ALL RIGHTS RESERVED. Created by Taeyoung</Footer>
        </Layout>
    )
}

export default Body