export var ValidationState;
(function (ValidationState) {
    ValidationState[ValidationState["valid"] = 0] = "valid";
    ValidationState[ValidationState["warning"] = 1] = "warning";
    ValidationState[ValidationState["invalid"] = 2] = "invalid";
})(ValidationState || (ValidationState = {}));