import { Input, ContentChild, ContentChildren, QueryList } from '@angular/core';
import { HeaderTemplateDirective } from '../rendering/header/header-template.directive';
import { FooterTemplateDirective } from '../rendering/footer/footer-template.directive';
/**
 * @hidden
 */
export var isSpanColumn = function (column) { return column.isSpanColumn; };
/**
 * @hidden
 */
export var isCheckboxColumn = function (column) { return column.isCheckboxColumn; };
var isColumnContainer = function (column) { return column.isColumnGroup || isSpanColumn(column); };
/**
 * @hidden
 */
var ColumnBase = (function () {
    function ColumnBase(parent) {
        this.parent = parent;
        /**
         * @hidden
         */
        this.isColumnGroup = false;
        /**
         * Indicates whether the column is resizable or not.
         * @default true
         */
        this.resizable = true;
        /**
         * The width (in pixels) below which the user is not able to resize the column by using the UI.
         */
        this.minResizableWidth = 10;
        /**
         * @hidden
         */
        this.headerTemplates = new QueryList();
        if (parent && !isColumnContainer(parent)) {
            throw new Error('Columns can be nested only inside ColumnGroupComponent');
        }
    }
    Object.defineProperty(ColumnBase.prototype, "width", {
        get: function () { return this._width; },
        /**
         * The width of the column (in pixels).
         */
        set: function (value) {
            this._width = parseInt(value, 10);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColumnBase.prototype, "level", {
        /**
         * @hidden
         */
        get: function () {
            if (this.parent && isSpanColumn(this.parent)) {
                return this.parent.level;
            }
            return this.parent ? this.parent.level + 1 : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColumnBase.prototype, "isLocked", {
        /**
         * @hidden
         */
        get: function () {
            return this.parent ? this.parent.isLocked : this.locked;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColumnBase.prototype, "colspan", {
        /**
         * @hidden
         */
        get: function () {
            return 1;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    ColumnBase.prototype.rowspan = function (totalColumnLevels) {
        return this.level < totalColumnLevels ? (totalColumnLevels - this.level) + 1 : 1;
    };
    Object.defineProperty(ColumnBase.prototype, "headerTemplateRef", {
        /**
         * @hidden
         */
        get: function () {
            var template = this.headerTemplates.first;
            return template ? template.templateRef : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColumnBase.prototype, "footerTemplateRef", {
        /**
         * @hidden
         */
        get: function () {
            return this.footerTemplate ? this.footerTemplate.templateRef : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColumnBase.prototype, "displayTitle", {
        get: function () {
            return this.title;
        },
        enumerable: true,
        configurable: true
    });
    return ColumnBase;
}());
export { ColumnBase };
ColumnBase.propDecorators = {
    'resizable': [{ type: Input },],
    'minResizableWidth': [{ type: Input },],
    'title': [{ type: Input },],
    'width': [{ type: Input },],
    'locked': [{ type: Input },],
    'hidden': [{ type: Input },],
    'media': [{ type: Input },],
    'style': [{ type: Input },],
    'headerStyle': [{ type: Input },],
    'footerStyle': [{ type: Input },],
    'cssClass': [{ type: Input, args: ['class',] },],
    'headerClass': [{ type: Input },],
    'footerClass': [{ type: Input },],
    'headerTemplates': [{ type: ContentChildren, args: [HeaderTemplateDirective, { descendants: false },] },],
    'footerTemplate': [{ type: ContentChild, args: [FooterTemplateDirective,] },],
};
