import React from 'react';
import {Layout} from 'antd';
import Nav from './components/Nav';
import Body from './components/Body';



function App() {
    return (
        <div className="App">
            <Layout>
                <Nav />
                <Body />
            </Layout>
        </div>
    );
}

export default App;
