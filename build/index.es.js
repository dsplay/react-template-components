import React, { createElement, useState, useRef, useEffect, useMemo } from 'react';

var MyComponent = function (_a) {
    var name = _a.name;
    return (createElement("div", { role: 'heading', "aria-level": 1 },
        "My First Component: ",
        name));
};

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}

function makeId(length) {
    if (length === void 0) { length = 16; }
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i += 1) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
function convertImages(images) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, Promise.all(images.map(function (imageOrSrc) {
                    if (typeof imageOrSrc === 'string') {
                        return new Promise(function (resolve, reject) {
                            var image = new Image();
                            image.src = imageOrSrc;
                            image.onload = function (e) {
                                if (e.target instanceof HTMLImageElement) {
                                    var img = e.target;
                                    var src = img.src, width = img.width, height = img.height;
                                    resolve({
                                        src: src,
                                        width: width,
                                        height: height,
                                    });
                                }
                                else {
                                    reject();
                                }
                            };
                            image.onerror = function (e) {
                                reject(e);
                            };
                        });
                    }
                    return Promise.resolve(imageOrSrc);
                }))];
        });
    });
}
/* eslint-disable no-console */
var GridGallery = function (_a) {
    var images = _a.images, _b = _a.margin, margin = _b === void 0 ? 2 : _b, _c = _a.containerClassName, containerClassName = _c === void 0 ? '' : _c, _d = _a.imageClassName, imageClassName = _d === void 0 ? '' : _d;
    var _e = useState(), containerWidth = _e[0], setContainerWidth = _e[1];
    var _f = useState(), containerHeight = _f[0], setContainerHeight = _f[1];
    var _g = useState(), convertedImages = _g[0], setProcessedImages = _g[1];
    var element = useRef(null);
    useEffect(function () {
        (function () { return __awaiter(void 0, void 0, void 0, function () {
            var processed;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, convertImages(images)];
                    case 1:
                        processed = _a.sent();
                        console.log('converted', processed);
                        setProcessedImages(processed);
                        return [2 /*return*/];
                }
            });
        }); })();
    }, []);
    useEffect(function () {
        var _a;
        if (element && element.current) {
            console.log('element:', (_a = element.current) === null || _a === void 0 ? void 0 : _a.offsetWidth, element.current.offsetHeight);
            setContainerWidth(element.current.offsetWidth);
            setContainerHeight(element.current.offsetHeight);
        }
    }, []);
    var finalImages = useMemo(function () {
        if (!containerWidth || !containerHeight || !convertedImages)
            return null;
        var maxRatio = 0.5;
        var unit = Math.sqrt((containerWidth * containerHeight) / convertedImages.length);
        console.log('unit', unit);
        var rowCount = Math.min(Math.round(containerHeight / unit), convertedImages.length);
        console.log('rowCount', rowCount);
        var maxColumnCount = Math.ceil(convertedImages.length / rowCount);
        var minColumnCount = Math.floor(convertedImages.length / rowCount);
        console.log('max col count', maxColumnCount);
        var rowHeight = Math.floor((containerHeight - ((rowCount + 1) * margin)) / rowCount);
        console.log('rowHeight', rowHeight);
        var currentRowWidths = [];
        var finalData = [];
        var currentRowTotalWidth = margin;
        var currentRowCount = 1;
        var maxWidth = Math.floor(rowHeight * (1 + maxRatio));
        var minWidth = Math.floor(rowHeight * (1 - maxRatio));
        console.log('minWidth', minWidth, 'maxWidth', maxWidth);
        function finishRow(row) {
            if (!containerWidth)
                return [];
            // console.log('resizing current row', row);
            var currentSum = row.reduce(function (sum, _a) {
                var colWidth = _a.width;
                return sum + colWidth;
            }, 0);
            // console.log('currentSum', currentSum);
            var colCount = row.length;
            var availableWidth = containerWidth - (colCount * margin) - margin;
            // console.log('availableWidth', availableWidth);
            var resized = row.map(function (_a) {
                var colWidth = _a.width, image = __rest(_a, ["width"]);
                return (__assign(__assign({}, image), { width: Math.min(Math.floor((colWidth / currentSum) * availableWidth), containerWidth - 2 * margin) }));
            });
            var resizedSum = resized.reduce(function (sum, _a) {
                var colWidth = _a.width;
                return sum + colWidth;
            }, 0);
            // console.log('resizedSum', resizedSum);
            // console.log('resized', resized);
            var remainingItemSpace = availableWidth - (resizedSum);
            // console.log('remainingItemSpace', remainingItemSpace)
            var lastItem = resized.slice(-1)[0];
            var result = __spreadArrays(resized.slice(0, -1), [
                __assign(__assign({}, lastItem), { width: lastItem.width + remainingItemSpace })
            ]);
            // console.log('result', result);
            return result;
        }
        convertedImages.forEach(function (image, i) {
            // console.log('current row', currentRowCount);
            var w = Math.floor((image.width * rowHeight) / image.height);
            w = Math.max(w, minWidth);
            w = Math.min(w, maxWidth);
            // console.log('width', w);
            currentRowWidths.push({
                src: image.src,
                height: rowHeight,
                width: w,
                marginTop: currentRowCount === 1 ? margin : 0,
                marginBottom: margin,
                marginLeft: currentRowWidths.length === 0 ? margin : 0,
                marginRight: margin,
                id: makeId(),
            });
            currentRowTotalWidth += w + margin;
            var remainingSpace = containerWidth - currentRowTotalWidth;
            // console.log('remainingSpace', remainingSpace - margin);
            var rowWidthReached = remainingSpace - margin < minWidth;
            var minColumnCountSatisfied = currentRowWidths.length >= minColumnCount;
            var maxColumnCountReached = currentRowWidths.length === maxColumnCount;
            var noRowSpace = rowWidthReached && minColumnCountSatisfied;
            var isLastRow = currentRowCount === rowCount;
            var itemsToProcess = convertedImages.length - (i + 1);
            var remainingRows = rowCount - currentRowCount;
            var hasItemsToFillRows = itemsToProcess > remainingRows;
            var enoughRowsForNextItems = itemsToProcess / maxColumnCount < remainingRows;
            // console.log('enoughRowsForNextItems', enoughRowsForNextItems);
            if (!hasItemsToFillRows || !isLastRow && (noRowSpace || maxColumnCountReached) && enoughRowsForNextItems) {
                finalData = __spreadArrays(finalData, finishRow(currentRowWidths));
                currentRowWidths = [];
                currentRowTotalWidth = margin;
                currentRowCount += 1;
            }
        });
        if (currentRowWidths.length > 0) {
            finalData = __spreadArrays(finalData, finishRow(currentRowWidths));
        }
        return finalData;
    }, [containerWidth, containerHeight, convertedImages, margin]);
    if (!finalImages) {
        return (React.createElement("div", { className: "" + containerClassName, ref: element, style: {
                width: '100%',
                height: '100%',
            } }));
    }
    return (React.createElement("div", { className: "grid-gallery " + containerClassName, style: {
            width: '100%',
            height: '100%',
        } }, finalImages.map(function (image) { return (React.createElement("div", { key: image.id, className: imageClassName + " gallery-item", style: __assign(__assign({}, image), { backgroundImage: "url('" + image.src + "')" }) })); })));
};

export { GridGallery, MyComponent };
//# sourceMappingURL=index.es.js.map
