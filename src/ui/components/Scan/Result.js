import React from 'react';
import ScanResultCard from './ScanResultCard';
import AddToMailingList from './AddToMailingList';
import Dismiss from './Dismiss';

export default function Result(props) {
    const {
        scan: {
            current: {
                underage,
            },
        },
    } = props;

    return (
        <div className="__scan-info">
            <ScanResultCard {...props} />
            {underage ? <Dismiss {...props} /> : <AddToMailingList {...props} />}
        </div>
    );
}
