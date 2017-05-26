import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import * as configurationActions from '../../reducers/configuration';
import * as scanActions from '../../reducers/scan';
import DeviceStatus from './DeviceStatus';

import './style.scss';

@connect(state => ({
    initialValues: state.configuration.value,
    deviceStatus: state.scan.deviceStatus,
}), dispatch => ({
    configurationActions: bindActionCreators(configurationActions, dispatch),
    scanActions: bindActionCreators(scanActions, dispatch),
}))
@reduxForm({
    form: 'setup',
    enableReinitialize: true,
    keepDirtyOnReinitialize: false,
})
export default class Setup extends React.Component {
    componentWillMount() {
        this.props.configurationActions.fetchConfiguration();
        this.props.scanActions.fetchScannerStatus();
    }

    doSubmit = (form) => {
        return this.props.configurationActions.updateConfiguration(form);
    };

    doDeviceReload = () => {
        return this.props.scanActions.reloadDevice();
    };

    render() {
        const {
            handleSubmit,
            submitting,
            pristine,
            deviceStatus,
        } = this.props;

        return (
            <div className="ken-id-setup">
                <div className="card">
                    <DeviceStatus deviceStatus={deviceStatus} />
                    <div>
                        <button className="yes-button" disabled={submitting} onClick={this.doDeviceReload}>Reload Device</button>
                    </div>
                </div>
                <form onSubmit={handleSubmit(this.doSubmit)} className="__setup-form">
                    <div className="card">
                        <div className="__form-group">
                            <label>Scanner Port</label>
                            <Field name="scannerPort" component="input" disabled={submitting} />
                        </div>
                    </div>
                    <div className="__actions">
                        <button type="submit" disabled={pristine || submitting}>Save</button>
                    </div>
                </form>
            </div>
        );
    }
}
