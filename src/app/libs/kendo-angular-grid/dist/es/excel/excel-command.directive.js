import { Directive, HostListener, HostBinding } from '@angular/core';
import { ExcelService } from './excel.service';
/**
 * Represents the **Export to Excel** command of the Grid.
 *
 * You can apply this directive to any `button` element inside a
 * [`ToolbarTemplate`]({% slug api_grid_commandcolumncomponent_kendouiforangular %}).
 *
 * When the user clicks a button associated with the directive, the
 * [`excelExport`]({% slug api_grid_gridcomponent_kendouiforangular %}#toc-excelexport) event
 * fires. For more information, refer to article on [exporting the Grid to Excel]({% slug excelexport_grid_kendouiforangular %}).
 *
 * @example
 * ```ts-no-run
 * <kendo-grid>
 *      <ng-template kendoGridToolbarTemplate>
 *          <button kendoGridExcelCommand>Export to PDF</button>
 *      </ng-template>
 *      <kendo-grid-excel fileName="Grid.xlsx">
 *      </kendo-grid-excel>
 * </kendo-grid>
 * ```
 */
var ExcelCommandDirective = (function () {
    function ExcelCommandDirective(excelService) {
        this.excelService = excelService;
    }
    /**
     * @hidden
     */
    ExcelCommandDirective.prototype.click = function () {
        this.excelService.exportClick.emit();
    };
    Object.defineProperty(ExcelCommandDirective.prototype, "buttonClass", {
        /**
         * @hidden
         */
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ExcelCommandDirective.prototype, "excelClass", {
        /**
         * @hidden
         */
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    return ExcelCommandDirective;
}());
export { ExcelCommandDirective };
ExcelCommandDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoGridExcelCommand]'
            },] },
];
/** @nocollapse */
ExcelCommandDirective.ctorParameters = function () { return [
    { type: ExcelService, },
]; };
ExcelCommandDirective.propDecorators = {
    'click': [{ type: HostListener, args: ['click',] },],
    'buttonClass': [{ type: HostBinding, args: ['class.k-button',] },],
    'excelClass': [{ type: HostBinding, args: ['class.k-grid-excel',] },],
};
