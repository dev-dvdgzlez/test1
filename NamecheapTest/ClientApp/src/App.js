import React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import List from './components/List';

const App = () => {
    return (
        <Layout>
            <Route exact path='/' component={Home} />
            <Route path='/list' component={List} />
        </Layout>
    );
};

export default App;
