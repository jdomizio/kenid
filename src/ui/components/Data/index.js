import React from 'react';
import { connect } from 'react-redux';
import * as dataActions from '../../reducers/data';

import './style.scss';

@connect(state => ({
    data: state.data,
}), {
    ...dataActions,
})
export default class Data extends React.Component {
    componentWillMount() {
        this.props.fetchDatabaseStatus();
    }

    render() {
        const {
            data,
            exportDatabase,
        } = this.props;

        if (!data.value || data.loading) {
            return (
                <div className="ken-id-data">
                    <div className="__main">
                        Loading...
                    </div>
                </div>
            );
        }

        return (
            <div className="ken-id-data">
                <div className="card">
                    <button className="yes-button --full" onClick={() => exportDatabase('export.csv')}>Export Data</button>
                </div>
                <div className="card">
                    <div className="db-status">
                        <span>Database Status</span>
                        <pre>{data.value.status}</pre>
                    </div>
                </div>

            </div>
        );
    }
}
