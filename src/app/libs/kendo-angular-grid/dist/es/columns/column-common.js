import { isSpanColumnComponent } from "./span-column.component";
import { isNullOrEmptyString, isTruthy } from "../utils";
/**
 * @hidden
 */
export var expandColumns = function (columns) { return (columns.reduce(function (acc, column) { return acc.concat(isSpanColumnComponent(column) ? column.childColumns.toArray() : [column]); }, []) // tslint:disable-line:align
); };
/**
 * @hidden
 */
export var columnsToRender = function (columns) { return (expandColumns(columns).filter(function (x) { return !x.hidden; })); };
/**
 * @hidden
 */
export var columnsSpan = function (columns) {
    return (columns || []).reduce(function (acc, col) { return acc + col.colspan; }, 0);
};
// tslint:disable-next-line:max-line-length
var validField = new RegExp("^[$A-Z_a-z][$A-Z_a-z0-9\\.]*$");
/**
 * @hidden
 */
export var isValidFieldName = function (fieldName) {
    return !isNullOrEmptyString(fieldName) && validField.test(fieldName) &&
        fieldName[0] !== "." && fieldName[fieldName.length - 1] !== ".";
};
/**
 * @hidden
 */
export var children = function (column) { return column.children.filter(function (child) { return child !== column; }); };
/**
 * @hidden
 */
export var leafColumns = function (columns) {
    return columns.reduce(function (acc, column) {
        if (column.isColumnGroup) {
            acc = acc.concat(leafColumns(children(column)));
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
export var resizableColumns = function (columns) { return columns.filter(function (column) { return isTruthy(column.resizable); }); };
