import * as React from 'react';
export class ListPage extends React.PureComponent {
    constructor(props) {
        super(props);
        this._rootElement = React.createRef();
        this.state = {
            hiddenStyle: undefined,
            backgroundColor: `rgba(` + Math.floor(255 * Math.random()) + `,` + Math.floor(255 * Math.random()) + `,` + Math.floor(255 * Math.random()) + `1)`
        };
    }
    componentWillReceiveProps(newProps) {
        if (this.props.visible !== newProps.visible) {
            let hiddenStyle = undefined;
            if (!newProps.visible) {
                const rootRect = this._rootElement.current.getBoundingClientRect();
                hiddenStyle = {
                    height: rootRect.height
                };
            }
            this.setState({ hiddenStyle });
        }
    }
    render() {
        const { hiddenStyle } = this.state;
        return (React.createElement("div", { ref: this._rootElement, style: hiddenStyle }, hiddenStyle ? undefined : this._renderItems()));
    }
    _renderItems() {
        const cells = [];
        let { startIndex } = this.props;
        const { endIndex, items, onRenderCell = () => React.createElement("div", null) } = this.props;
        for (; startIndex <= endIndex; startIndex++) {
            const item = items[startIndex];
            const key = item.key || String(startIndex);
            cells.push(React.createElement("div", { key: key }, onRenderCell(items[startIndex], startIndex)));
        }
        return cells;
    }
}
