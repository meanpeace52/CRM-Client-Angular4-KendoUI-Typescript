"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable:no-input-rename */
var core_1 = require("@angular/core");
var selection_service_1 = require("./selection.service");
/**
 * Represents the row selection checkbox of the Grid.
 * The directive expects the index of the current row as an input parameter. For more information, refer to the example below.
 *
 * Apply the directive to an `input` element inside the
 * [`CheckboxColumnComponent`]({% slug api_grid_checkboxcolumncomponent_kendouiforangular %}).
 *
 * When the user clicks the checkbox that is associated with the directive,
 * a [`selectionChange`]({% slug api_grid_gridcomponent_kendouiforangular %}#toc-selectionChange) event is triggered.
 *
 * @example
 * ```ts-no-run
 * <kendo-grid>
 *   <kendo-grid-checkbox-column title="Custom checkbox">
 *     <ng-template kendoGridCellTemplate let-idx="rowIndex">
 *       <input [kendoGridSelectionCheckbox]="idx" />
 *     </ng-template>
 *   </kendo-grid-checkbox-column>
 * </kendo-grid>
 * ```
 */
var SelectionCheckboxDirective = (function () {
    function SelectionCheckboxDirective(selectionService, el, renderer) {
        this.selectionService = selectionService;
        this.el = el;
        this.renderer = renderer;
        this.type = "checkbox";
        this.destroyClick = this.renderer.listen(this.el.nativeElement, "click", this.onClick.bind(this));
    }
    SelectionCheckboxDirective.prototype.ngAfterContentChecked = function () {
        this.setCheckedState();
    };
    SelectionCheckboxDirective.prototype.ngOnDestroy = function () {
        if (this.destroyClick) {
            this.destroyClick();
        }
    };
    /**
     * @hidden
     */
    SelectionCheckboxDirective.prototype.onClick = function () {
        if (this.selectionService.options.enabled) {
            var ev = this.selectionService.toggleByIndex(this.itemIndex);
            ev.ctrlKey = false;
            //Setting the deprecated `index` and `selected` properties
            ev.index = this.itemIndex;
            ev.selected = ev.selectedRows.length > ev.deselectedRows.length;
            this.selectionService.changes.emit(ev);
        }
    };
    /*
     * @hidden
     */
    SelectionCheckboxDirective.prototype.setCheckedState = function () {
        this.renderer.setProperty(this.el.nativeElement, "checked", this.selectionService.isSelected(this.itemIndex));
    };
    return SelectionCheckboxDirective;
}());
SelectionCheckboxDirective.decorators = [
    { type: core_1.Directive, args: [{
                selector: '[kendoGridSelectionCheckbox]'
            },] },
];
/** @nocollapse */
SelectionCheckboxDirective.ctorParameters = function () { return [
    { type: selection_service_1.SelectionService, },
    { type: core_1.ElementRef, },
    { type: core_1.Renderer2, },
]; };
SelectionCheckboxDirective.propDecorators = {
    'itemIndex': [{ type: core_1.Input, args: ["kendoGridSelectionCheckbox",] },],
    'type': [{ type: core_1.HostBinding, args: ['attr.type',] },],
};
exports.SelectionCheckboxDirective = SelectionCheckboxDirective;
