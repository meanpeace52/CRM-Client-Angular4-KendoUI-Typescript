import { Directive, HostListener, HostBinding, Inject } from '@angular/core';
import { EditService } from './edit.service';
import { CELL_CONTEXT } from '../rendering/common/cell-context';
/**
 * Represents the `save` command of the Grid.
 *
 * You can apply this directive to any `button` element inside a
 * [`CommandColumnComponent`]({% slug api_grid_commandcolumncomponent_kendouiforangular %}).
 *
 * When an associated button with the directive is clicked, the
 * [`save`]({% slug api_grid_gridcomponent_kendouiforangular %}#toc-save) event
 * is triggered. For more information, refer to the [editing example]({% slug editing_grid_kendouiforangular %}).
 *
 * @example
 * ```ts-no-run
 * <kendo-grid>
 *   <kendo-grid-command-column title="command">
 *     <ng-template kendoGridCellTemplate>
 *       <button kendoGridSaveCommand>Save changes</button>
 *     </ng-template>
 *   </kendo-grid-command-column>
 * </kendo-grid>
 * ```
 * > When the row is not in the edit mode, the button with `kendoGridSaveCommand` is automatically hidden.
 *
 * You can control the content of the button based on the state of the row.
 * @example
 * ```ts-no-run
 * <kendo-grid>
 *   <kendo-grid-command-column title="command">
 *     <ng-template kendoGridCellTemplate let-isNew="isNew">
 *       <button kendoGridSaveCommand>{{isNew ? 'Add' : 'Update'}}</button>
 *     </ng-template>
 *   </kendo-grid-command-column>
 * </kendo-grid>
 * ```
 */
var SaveCommandDirective = (function () {
    function SaveCommandDirective(editService, cellContext) {
        this.editService = editService;
        this.rowIndex = cellContext.rowIndex;
    }
    /**
     * @hidden
     */
    SaveCommandDirective.prototype.click = function () {
        this.editService.save(this.rowIndex);
    };
    Object.defineProperty(SaveCommandDirective.prototype, "visible", {
        /**
         * @hidden
         */
        get: function () {
            return !this.editService.isEdited(this.rowIndex) ? 'none' : '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SaveCommandDirective.prototype, "buttonClass", {
        /**
         * @hidden
         */
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SaveCommandDirective.prototype, "commandClass", {
        /**
         * @hidden
         */
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    return SaveCommandDirective;
}());
export { SaveCommandDirective };
SaveCommandDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoGridSaveCommand]'
            },] },
];
/** @nocollapse */
SaveCommandDirective.ctorParameters = function () { return [
    { type: EditService, },
    { type: undefined, decorators: [{ type: Inject, args: [CELL_CONTEXT,] },] },
]; };
SaveCommandDirective.propDecorators = {
    'click': [{ type: HostListener, args: ['click',] },],
    'visible': [{ type: HostBinding, args: ['style.display',] },],
    'buttonClass': [{ type: HostBinding, args: ['class.k-button',] },],
    'commandClass': [{ type: HostBinding, args: ['class.k-grid-save-command',] },],
};
