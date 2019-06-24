import React from 'react';
import { Route } from 'react-router';
import Layout from './containers/Layout/Layout';
import Home from './containers/Home/Home';
import List from './containers/List/List';

const App = () => {
    return (
        <Layout>
            <Route exact path='/' component={Home} />
            <Route path='/list' component={List} />
        </Layout>
    );
};

export default App;
