import React from 'react';

export default function Dismiss(props) {
    const {
        reset,
    } = props;

    return (
        <div className="card">
            <button className="no-button --full" onClick={reset}>Done</button>
        </div>
    );
}
