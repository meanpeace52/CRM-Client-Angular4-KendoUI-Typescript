"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Observable_1 = require("rxjs/Observable");
var kendo_file_saver_1 = require("@progress/kendo-file-saver");
var kendo_angular_excel_export_1 = require("@progress/kendo-angular-excel-export");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
var excel_service_1 = require("./excel.service");
var excel_export_event_1 = require("./excel-export-event");
/* tslint:disable object-literal-sort-keys */
var fetchComponentData = function (component) {
    return {
        data: component.view.map(function (item) { return item; }),
        group: component.group
    };
};
/**
 * Configures the Excel export settings of the Kendo UI Grid.
 */
var ExcelComponent = (function () {
    function ExcelComponent(excelService, rtl) {
        this.rtl = rtl;
        /**
         * Specifies the file name of the exported Excel file.
         * @default "Export.xlsx"
         */
        this.fileName = 'Export.xlsx';
        /**
         * @hidden
         */
        this.columns = new core_1.QueryList();
        this.saveSubscription = excelService.saveToExcel.subscribe(this.save.bind(this));
        this.saveFile = this.saveFile.bind(this);
    }
    ExcelComponent.prototype.ngOnDestroy = function () {
        this.saveSubscription.unsubscribe();
        if (this.dataSubscription) {
            this.dataSubscription.unsubscribe();
        }
    };
    ExcelComponent.prototype.save = function (component) {
        var _this = this;
        var data = (this.fetchData || fetchComponentData)(component);
        var exportData = function (result) {
            delete _this.dataSubscription;
            _this.exportData(component, result);
        };
        if (data instanceof Promise) {
            data.then(exportData);
        }
        else if (data instanceof Observable_1.Observable) {
            this.dataSubscription = data.take(1).subscribe(exportData);
        }
        else {
            exportData(data);
        }
    };
    ExcelComponent.prototype.exportData = function (component, result) {
        var options = kendo_angular_excel_export_1.workbookOptions({
            columns: this.columns.length ? this.columns : component.columns,
            data: result.data,
            group: result.group,
            filterable: this.filterable,
            creator: this.creator,
            date: this.date,
            paddingCellOptions: this.paddingCellOptions,
            headerPaddingCellOptions: this.headerPaddingCellOptions,
            rtl: this.rtl
        });
        var args = new excel_export_event_1.ExcelExportEvent(options);
        component.excelExport.emit(args);
        if (!args.isDefaultPrevented()) {
            kendo_angular_excel_export_1.toDataURL(options).then(this.saveFile);
        }
    };
    ExcelComponent.prototype.saveFile = function (dataURL) {
        kendo_file_saver_1.saveAs(dataURL, this.fileName, {
            forceProxy: this.forceProxy,
            proxyURL: this.proxyURL
        });
    };
    return ExcelComponent;
}());
ExcelComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'kendo-grid-excel',
                template: ""
            },] },
];
/** @nocollapse */
ExcelComponent.ctorParameters = function () { return [
    { type: excel_service_1.ExcelService, },
    { type: undefined, decorators: [{ type: core_1.Optional }, { type: core_1.Inject, args: [kendo_angular_l10n_1.RTL,] },] },
]; };
ExcelComponent.propDecorators = {
    'fileName': [{ type: core_1.Input },],
    'filterable': [{ type: core_1.Input },],
    'creator': [{ type: core_1.Input },],
    'date': [{ type: core_1.Input },],
    'forceProxy': [{ type: core_1.Input },],
    'proxyURL': [{ type: core_1.Input },],
    'fetchData': [{ type: core_1.Input },],
    'paddingCellOptions': [{ type: core_1.Input },],
    'headerPaddingCellOptions': [{ type: core_1.Input },],
    'columns': [{ type: core_1.ContentChildren, args: [kendo_angular_excel_export_1.ColumnBase, { descendants: true },] },],
};
exports.ExcelComponent = ExcelComponent;
