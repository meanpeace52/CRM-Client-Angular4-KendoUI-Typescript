/* tslint:disable:no-input-rename */
import { Input, EventEmitter, Output } from '@angular/core';
import { isPresent } from "../utils";
/**
 * @hidden
 */
var Selection = (function () {
    function Selection(grid) {
        this.grid = grid;
        /**
         * Defines the collection that will store the selected item keys.
         */
        this.selectedKeys = [];
        /**
         * Fires when the `selectedKeys` collection has been updated.
         */
        this.selectedKeysChange = new EventEmitter();
        this.init();
    }
    Selection.prototype.init = function () {
        var _this = this;
        if (!isPresent(this.grid.rowSelected)) {
            this.grid.rowSelected = function (row) {
                return _this.selectedKeys.indexOf(_this.getItemKey(row)) >= 0;
            };
        }
        this.selectionChangeSubscription = this.grid
            .selectionChange
            .subscribe(this.onSelectionChange.bind(this));
    };
    /**
     * @hidden
     */
    Selection.prototype.destroy = function () {
        this.selectionChangeSubscription.unsubscribe();
    };
    /**
     * @hidden
     */
    Selection.prototype.reset = function () {
        this.selectedKeys.splice(0, this.selectedKeys.length);
    };
    Selection.prototype.getItemKey = function (row) {
        if (this.selectionKey) {
            if (typeof this.selectionKey === "string") {
                return row.dataItem[this.selectionKey];
            }
            if (typeof this.selectionKey === "function") {
                return this.selectionKey(row);
            }
        }
        return row.index;
    };
    Selection.prototype.onSelectionChange = function (selection) {
        var _this = this;
        selection.deselectedRows.forEach(function (item) {
            var itemKey = _this.getItemKey(item);
            var itemIndex = _this.selectedKeys.indexOf(itemKey);
            if (itemIndex >= 0) {
                _this.selectedKeys.splice(itemIndex, 1);
            }
        });
        if (this.grid.selectableSettings.mode === "single" && this.selectedKeys.length > 0) {
            this.reset();
        }
        selection.selectedRows.forEach(function (item) {
            var itemKey = _this.getItemKey(item);
            if (_this.selectedKeys.indexOf(itemKey) < 0) {
                _this.selectedKeys.push(itemKey);
            }
        });
        this.selectedKeysChange.emit(this.selectedKeys);
    };
    return Selection;
}());
export { Selection };
Selection.propDecorators = {
    'selectedKeys': [{ type: Input },],
    'selectionKey': [{ type: Input, args: ["kendoGridSelectBy",] },],
    'selectedKeysChange': [{ type: Output },],
};
