export var ImageFit;
(function (ImageFit) {
    ImageFit[ImageFit["center"] = 0] = "center";
    ImageFit[ImageFit["contain"] = 1] = "contain";
    ImageFit[ImageFit["cover"] = 2] = "cover";
    ImageFit[ImageFit["none"] = 3] = "none";
    ImageFit[ImageFit["centerCover"] = 4] = "centerCover";
})(ImageFit || (ImageFit = {}));
export var ImageCoverStyle;
(function (ImageCoverStyle) {
    ImageCoverStyle[ImageCoverStyle["landscape"] = 0] = "landscape";
    ImageCoverStyle[ImageCoverStyle["portrait"] = 1] = "portrait";
})(ImageCoverStyle || (ImageCoverStyle = {}));
export var ImageLoadState;
(function (ImageLoadState) {
    ImageLoadState[ImageLoadState["notLoaded"] = 0] = "notLoaded";
    ImageLoadState[ImageLoadState["loaded"] = 1] = "loaded";
    ImageLoadState[ImageLoadState["error"] = 2] = "error";
    ImageLoadState[ImageLoadState["errorLoaded"] = 3] = "errorLoaded";
})(ImageLoadState || (ImageLoadState = {}));
