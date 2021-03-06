"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var span_column_component_1 = require("./span-column.component");
var utils_1 = require("../utils");
/**
 * @hidden
 */
exports.expandColumns = function (columns) { return (columns.reduce(function (acc, column) { return acc.concat(span_column_component_1.isSpanColumnComponent(column) ? column.childColumns.toArray() : [column]); }, []) // tslint:disable-line:align
); };
/**
 * @hidden
 */
exports.columnsToRender = function (columns) { return (exports.expandColumns(columns).filter(function (x) { return !x.hidden; })); };
/**
 * @hidden
 */
exports.columnsSpan = function (columns) {
    return (columns || []).reduce(function (acc, col) { return acc + col.colspan; }, 0);
};
// tslint:disable-next-line:max-line-length
var validField = new RegExp("^[$A-Z_a-z][$A-Z_a-z0-9\\.]*$");
/**
 * @hidden
 */
exports.isValidFieldName = function (fieldName) {
    return !utils_1.isNullOrEmptyString(fieldName) && validField.test(fieldName) &&
        fieldName[0] !== "." && fieldName[fieldName.length - 1] !== ".";
};
/**
 * @hidden
 */
exports.children = function (column) { return column.children.filter(function (child) { return child !== column; }); };
/**
 * @hidden
 */
exports.leafColumns = function (columns) {
    return columns.reduce(function (acc, column) {
        if (column.isColumnGroup) {
            acc = acc.concat(exports.leafColumns(exports.children(column)));
        }
        else if (column.isSpanColumn) {
            acc = acc.concat(column.childColumns.toArray());
        }
        else {
            acc.push(column);
        }
        return acc;
    }, []); // tslint:disable-line:align
};
/**
 * @hidden
 */
exports.resizableColumns = function (columns) { return columns.filter(function (column) { return utils_1.isTruthy(column.resizable); }); };
