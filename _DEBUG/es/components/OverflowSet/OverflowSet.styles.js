const overflowItemStyle = {
    flexShrink: 0,
    display: 'inherit'
};
export const getStyles = props => {
    const { className, vertical } = props;
    return {
        root: [
            'ms-OverflowSet',
            {
                position: 'relative',
                display: 'flex',
                flexWrap: 'nowrap'
            },
            vertical && { flexDirection: 'column' },
            className
        ],
        item: ['ms-OverflowSet-item', overflowItemStyle],
        overflowButton: ['ms-OverflowSet-overflowButton', overflowItemStyle]
    };
};
