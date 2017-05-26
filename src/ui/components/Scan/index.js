import React from 'react';
import { connect } from 'react-redux';
import { ipcRenderer } from 'electron';
import * as scanActions from '../../reducers/scan';
import Prompt from './Prompt';
import Result from './Result';

import './style.scss';

@connect(state => ({
    scan: state.scan,
}), {
    ...scanActions,
})
export default class Scan extends React.Component {
    componentDidMount() {
        this.props.listenToScans();
    }

    componentWillUnmount() {
        this.props.silenceScans();
    }

    render() {
        const {
            scan: {
                current,
            },
        } = this.props;

        let content = <Prompt {...this.props} />;

        if (current) {
            content = <Result {...this.props} />;
        }

        return (
            <div className="ken-id-scan">
                {content}
            </div>
        );
    }
}
