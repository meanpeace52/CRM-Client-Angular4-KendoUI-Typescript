"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var edit_service_1 = require("./edit.service");
var cell_context_1 = require("../rendering/common/cell-context");
/**
 * Represents the `cancel` command of the Grid.
 *
 * You can apply this directive to any `button` element inside a
 * [`CommandColumnComponent`]({% slug api_grid_commandcolumncomponent_kendouiforangular %}).
 *
 * When an associated button with the directive is clicked, the
 * [`cancel`]({% slug api_grid_gridcomponent_kendouiforangular %}#toc-cancel) event
 * is triggered. For more information, refer to the [editing example]({% slug editing_grid_kendouiforangular %}).
 *
 * @example
 * ```ts-no-run
 * <kendo-grid>
 *   <kendo-grid-command-column title="command">
 *     <ng-template kendoGridCellTemplate>
 *       <button kendoGridCancelCommand>Cancel changes</button>
 *     </ng-template>
 *   </kendo-grid-command-column>
 * </kendo-grid>
 * ```
 * > When the row is not in the edit mode, the button with the `kendoGridCancelCommand` is automatically hidden.
 *
 * You can control the content of the button based on the state of the row.
 * @example
 * ```ts-no-run
 * <kendo-grid>
 *   <kendo-grid-command-column title="command">
 *     <ng-template kendoGridCellTemplate let-isNew="isNew">
 *       <button kendoGridCancelCommand>{{isNew ? 'Discard' : 'Cancel changes'}}</button>
 *     </ng-template>
 *   </kendo-grid-command-column>
 * </kendo-grid>
 * ```
 */
var CancelCommandDirective = (function () {
    function CancelCommandDirective(editService, cellContext) {
        this.editService = editService;
        this.rowIndex = cellContext.rowIndex;
    }
    /**
     * @hidden
     */
    CancelCommandDirective.prototype.click = function () {
        this.editService.endEdit(this.rowIndex);
    };
    Object.defineProperty(CancelCommandDirective.prototype, "visible", {
        /**
         * @hidden
         */
        get: function () {
            return !this.editService.isEdited(this.rowIndex) ? 'none' : '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CancelCommandDirective.prototype, "buttonClass", {
        /**
         * @hidden
         */
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CancelCommandDirective.prototype, "commandClass", {
        /**
         * @hidden
         */
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    return CancelCommandDirective;
}());
CancelCommandDirective.decorators = [
    { type: core_1.Directive, args: [{
                selector: '[kendoGridCancelCommand]'
            },] },
];
/** @nocollapse */
CancelCommandDirective.ctorParameters = function () { return [
    { type: edit_service_1.EditService, },
    { type: undefined, decorators: [{ type: core_1.Inject, args: [cell_context_1.CELL_CONTEXT,] },] },
]; };
CancelCommandDirective.propDecorators = {
    'click': [{ type: core_1.HostListener, args: ['click',] },],
    'visible': [{ type: core_1.HostBinding, args: ['style.display',] },],
    'buttonClass': [{ type: core_1.HostBinding, args: ['class.k-button',] },],
    'commandClass': [{ type: core_1.HostBinding, args: ['class.k-grid-cancel-command',] },],
};
exports.CancelCommandDirective = CancelCommandDirective;
