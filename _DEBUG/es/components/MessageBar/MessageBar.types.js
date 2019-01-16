export var MessageBarType;
(function (MessageBarType) {
    MessageBarType[MessageBarType["info"] = 0] = "info";
    MessageBarType[MessageBarType["error"] = 1] = "error";
    MessageBarType[MessageBarType["blocked"] = 2] = "blocked";
    MessageBarType[MessageBarType["severeWarning"] = 3] = "severeWarning";
    MessageBarType[MessageBarType["success"] = 4] = "success";
    MessageBarType[MessageBarType["warning"] = 5] = "warning";
    MessageBarType[MessageBarType["remove"] = 90000] = "remove";
})(MessageBarType || (MessageBarType = {}));
