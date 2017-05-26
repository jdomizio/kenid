import React from 'react';

export default function ScanResultCard(props) {
    const {
        scan: {
            current: {
                age,
                gender,
                issuer,
                name,
                underage,
            },
        },
    } = props;

    return (
        <div className={`card ${underage ? '--bad-result' : '--good-result'}`}>
            <div className="__section-group">
                <div className="__section">
                    <div>Name</div>
                    <div>{name}</div>
                </div>
                <div className="__section">
                    <div>Age OK?</div>
                    <div className={underage ? '--bad' : '--good'}>{!underage ? 'Yes' : 'NO'}</div>
                </div>
                <div className="__section">
                    <div>Age</div>
                    <div>{age}</div>
                </div>
                <div className="__section">
                    <div>Gender</div>
                    <div>{gender}</div>
                </div>
                <div className="__section">
                    <div>Issuer</div>
                    <div>{issuer}</div>
                </div>
            </div>
        </div>
    );
}
