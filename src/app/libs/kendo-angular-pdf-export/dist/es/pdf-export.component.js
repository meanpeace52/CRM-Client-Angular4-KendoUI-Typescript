import { Component, ContentChild, ElementRef, Input } from '@angular/core';
import { drawDOM, exportPDF } from '@progress/kendo-drawing';
import { saveAs } from '@progress/kendo-file-saver';
import { PDFTemplateDirective } from './pdf-template.directive';
import { PDFMarginComponent } from './pdf-margin.component';
import { compileTemplate } from './compile-template';
/**
 * Represents the Kendo UI PDF Export component for Angular.
 *
 * @example
 * <kendo-pdf-export fileName="Report.pdf" paperSize="A4" [landscape]="true" avoidLinks >
 *   <kendo-pdf-export-margin top="2cm" left="1cm" right="1cm" bottom="2cm"></kendo-pdf-export-margin>
 *   <ng-template kendoPDFTemplate let-pageNum="pageNum" let-totalPages="totalPages">
 *     <div class="page-template">
 *       <div class="header">
 *         <div style="float: right">Page {{ pageNum }} of {{ totalPages }}</div>
 *         Multi-page export with automatic page breaking
 *       </div>
 *       <div class="footer">
 *         Page {{ pageNum }} of {{ totalPages }}
 *       </div>
 *     </div>
 *   </ng-template>
 * </kendo-pdf-export>
 */
var PDFExportComponent = (function () {
    function PDFExportComponent(element) {
        this.element = element;
        /**
         * The creator of the PDF document.
         * @default "Kendo UI PDF Generator"
         */
        this.creator = 'Kendo UI PDF Generator';
        /**
         * Specifies the file name of the exported PDF file.
         * @default "Export.pdf"
         */
        this.fileName = 'export.pdf';
    }
    Object.defineProperty(PDFExportComponent.prototype, "drawMargin", {
        get: function () {
            var marginComponent = this.marginComponent;
            var margin = this.margin;
            if (marginComponent) {
                margin = Object.assign(margin || {}, marginComponent.options);
            }
            return margin;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Saves the content as a PDF file with the specified name
     * @param fileName The name of the exported file name
     */
    PDFExportComponent.prototype.saveAs = function (fileName) {
        if (fileName === void 0) { fileName = this.fileName; }
        this.save(this.element.nativeElement, fileName);
    };
    /**
     * Exports the content as a Group for further processing
     *
     * @return The root group of the exported scene
     */
    PDFExportComponent.prototype.export = function () {
        console.log(element, 'pdf-export-component export');
        return this.exportElement(this.element.nativeElement);
    };
    PDFExportComponent.prototype.save = function (element, fileName) {
        var _this = this;
        return this.exportElement(element)
            .then(function (group) { return _this.exportGroup(group, _this.pdfOptions()); })
            .then(function (dataUri) { return _this.saveDataUri(dataUri, fileName, _this.saveOptions()); });
    };
    PDFExportComponent.prototype.exportAsString = function (element) {
        var _this = this;
        return this.exportElement(element)
            .then(function (group) { return _this.exportGroup(group, _this.pdfOptions()); })
    };
    PDFExportComponent.prototype.exportElement = function (element) {
        var promise = this.drawElement(element, this.drawOptions());
        var cleanup = this.cleanup.bind(this);
        promise.then(cleanup, cleanup);
        return promise;
    };
    PDFExportComponent.prototype.cleanup = function () {
        if (this.pageTemplate) {
            this.pageTemplate.destroy();
            delete this.pageTemplate;
        }
    };
    PDFExportComponent.prototype.drawOptions = function () {
        if (this.pageTemplateDirective) {
            this.pageTemplate = compileTemplate(this.pageTemplateDirective.templateRef);
            console.log(this.pageTemplateDirective.templateRef.elementRef, 'pdf-export.component.js drawoptions page template')
        }
        return {
            avoidLinks: this.avoidLinks,
            forcePageBreak: this.forcePageBreak,
            keepTogether: this.keepTogether,
            margin: this.drawMargin,
            paperSize: this.paperSize,
            landscape: this.landscape,
            repeatHeaders: this.repeatHeaders,
            scale: this.scale,
            template: this.pageTemplate
        };
    };
    PDFExportComponent.prototype.pdfOptions = function () {
        return {
            author: this.author,
            creator: this.creator,
            date: this.date,
            imgDPI: this.imageResolution,
            keywords: this.keywords,
            landscape: this.landscape,
            margin: this.drawMargin,
            multiPage: true,
            paperSize: this.paperSize,
            producer: this.producer,
            subject: this.subject,
            title: this.title
        };
    };
    PDFExportComponent.prototype.saveOptions = function () {
        return {
            forceProxy: this.forceProxy,
            proxyData: this.proxyData,
            proxyTarget: this.proxyTarget,
            proxyURL: this.proxyURL
        };
    };
    PDFExportComponent.prototype.drawElement = function (element, options) {
        return drawDOM(element, options);
    };
    PDFExportComponent.prototype.exportGroup = function (group, options) {
        return exportPDF(group, options);
    };
    PDFExportComponent.prototype.saveDataUri = function (dataUri, fileName, options) {
        saveAs(dataUri, fileName, options);
    };
    return PDFExportComponent;
}());
export { PDFExportComponent };
PDFExportComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-pdf-export',
                template: "<div><ng-content></ng-content></div>"
            },] },
];
/** @nocollapse */
PDFExportComponent.ctorParameters = function () { return [
    { type: ElementRef, },
]; };
PDFExportComponent.propDecorators = {
    'author': [{ type: Input },],
    'avoidLinks': [{ type: Input },],
    'forcePageBreak': [{ type: Input },],
    'keepTogether': [{ type: Input },],
    'creator': [{ type: Input },],
    'date': [{ type: Input },],
    'imageResolution': [{ type: Input },],
    'fileName': [{ type: Input },],
    'forceProxy': [{ type: Input },],
    'keywords': [{ type: Input },],
    'landscape': [{ type: Input },],
    'margin': [{ type: Input },],
    'paperSize': [{ type: Input },],
    'repeatHeaders': [{ type: Input },],
    'scale': [{ type: Input },],
    'proxyData': [{ type: Input },],
    'proxyURL': [{ type: Input },],
    'proxyTarget': [{ type: Input },],
    'producer': [{ type: Input },],
    'subject': [{ type: Input },],
    'title': [{ type: Input },],
    'pageTemplateDirective': [{ type: ContentChild, args: [PDFTemplateDirective,] },],
    'marginComponent': [{ type: ContentChild, args: [PDFMarginComponent,] },],
};
