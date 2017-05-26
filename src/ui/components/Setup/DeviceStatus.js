import React from 'react';

export default function DeviceStatus(props) {
    const {
        deviceStatus
    } = props;

    if (!deviceStatus) {
        return (
            <div className="__device-status">
                <span className="__device-status__heading">Device Status</span>
                <span className="__device-status__detail">Loading...</span>
            </div>
        );
    }

    return (
        <div className="__device-status">
            <span className="__device-status__heading">Device Status</span>
            <span className="__device-status__detail">{deviceStatus.status}</span>
            <span className="__device-status__error">{deviceStatus.error ? deviceStatus.details : ''}</span>
        </div>
    );
}
