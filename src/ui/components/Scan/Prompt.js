import React from 'react';

const cancelEvents = n => e => {
    e.stopPropagation();
    e.preventDefault();
    return n(e);
};

export default function Prompt(props) {
    if (process.env.NODE_ENV !== 'production') {
        const {
            simulateScan,
        } = props;

        return (
            <div className="__main card">
                <p>Scan an ID to continue</p>
                <div className="action-group">
                    <button className="yes-button" onClick={cancelEvents(() => simulateScan('good'))}>Good Scan</button>
                    <button className="no-button" onClick={cancelEvents(() => simulateScan('bad'))}>Bad Scan</button>
                </div>
            </div>
        );
    }

    return (
        <div className="__main card">
            <p>Scan an ID to continue</p>
        </div>
    );
}

Prompt.defaultProps = {
    simulateScan: () => {},
};
