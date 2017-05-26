import React from 'react';
import classNames from 'classnames';

export default class Header extends React.Component {
    render() {
        const { children } = this.props;

        return (
            <div className="__header">
                {children}
            </div>
        );
    }
}
