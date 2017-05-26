import React from 'react';

export default function AddToMailingList(props) {
    const {
        reset,
        addToMailingList,
        scan: {
            current,
        },
    } = props;

    const addHandler = () => addToMailingList(current);

    return (
        <div className="card">
            <div className="__label">Join the Mailing List?</div>
            <div className="__actions">
                <button className="yes-button" onClick={addHandler}>Yes</button>
                <button className="no-button" onClick={reset}>No</button>
            </div>
        </div>
    );
}
