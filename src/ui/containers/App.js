import React from 'react';
import {
    HashRouter as Router,
    Route,
    Switch,
    NavLink
} from 'react-router-dom';
import Setup from '../components/Setup';
import Scan from '../components/Scan';
import Header from '../components/Header';
import Data from '../components/Data';

export default class App extends React.Component {
    render() {
        return (
            <Router>
                <div className="ken-id">
                    <Header>
                        <NavLink className="__header-item" to="/scan">Scan</NavLink>
                        <NavLink className="__header-item" to="/setup">Setup</NavLink>
                        <NavLink className="__header-item" to="/data">Data</NavLink>
                    </Header>
                    <div className="__content">
                        <Switch>
                            <Route path="/scan" component={Scan} />
                            <Route path="/setup" component={Setup} />
                            <Route path="/data" component={Data} />
                        </Switch>
                    </div>
                </div>
            </Router>
        );
    }
}
