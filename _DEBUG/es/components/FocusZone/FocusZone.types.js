export const FocusZoneTabbableElements = {
    none: 0,
    all: 1,
    inputOnly: 2
};
export var FocusZoneDirection;
(function (FocusZoneDirection) {
    FocusZoneDirection[FocusZoneDirection["vertical"] = 0] = "vertical";
    FocusZoneDirection[FocusZoneDirection["horizontal"] = 1] = "horizontal";
    FocusZoneDirection[FocusZoneDirection["bidirectional"] = 2] = "bidirectional";
})(FocusZoneDirection || (FocusZoneDirection = {}));
