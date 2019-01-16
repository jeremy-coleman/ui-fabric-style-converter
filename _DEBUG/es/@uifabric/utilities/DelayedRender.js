import * as React from 'react';
export class DelayedRender extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isRendered: false
        };
    }
    componentDidMount() {
        let { delay } = this.props;
        this._timeoutId = window.setTimeout(() => {
            this.setState({
                isRendered: true
            });
        }, delay);
    }
    componentWillUnmount() {
        if (this._timeoutId) {
            clearTimeout(this._timeoutId);
        }
    }
    render() {
        return this.state.isRendered ? React.Children.only(this.props.children) : null;
    }
}
DelayedRender.defaultProps = {
    delay: 0
};
