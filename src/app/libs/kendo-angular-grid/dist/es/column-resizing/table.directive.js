import { Directive, ElementRef, Input, HostBinding, Renderer2 } from '@angular/core';
import 'rxjs/add/operator/bufferCount';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { resizableColumns } from '../columns/column-common';
import { ColumnResizingService } from './column-resizing.service';
/**
 * @hidden
 */
var columnsToResize = function (_a) {
    var columns = _a.columns;
    return Math.max(1, resizableColumns(columns).length - 1);
};
/**
 * @hidden
 */
var TableDirective = (function () {
    function TableDirective(element, renderer, service) {
        this.element = element;
        this.renderer = renderer;
        this.service = service;
        this.locked = false;
        this.firstResize = false;
    }
    Object.defineProperty(TableDirective.prototype, "minWidth", {
        get: function () {
            return this.firstResize ? 0 : null;
        },
        enumerable: true,
        configurable: true
    });
    TableDirective.prototype.ngOnInit = function () {
        var _this = this;
        var obs = this.service
            .changes
            .filter(function (e) { return _this.locked === e.locked; });
        this.subscription = obs
            .filter(function (e) { return e.type === 'start'; })
            .do(this.initState.bind(this))
            .map(columnsToResize)
            .switchMap(function (take) {
            return obs
                .filter(function (e) { return e.type === 'resizeTable'; })
                .map(function (e) { return e.delta; })
                .bufferCount(take);
        })
            .subscribe(this.resize.bind(this));
    };
    TableDirective.prototype.ngOnDestroy = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    TableDirective.prototype.initState = function () {
        this.firstResize = true;
        this.originalWidth = this.element.nativeElement.clientWidth;
    };
    TableDirective.prototype.resize = function (deltas) {
        var delta = deltas.reduce(function (sum, item) { return sum + item; }, 0);
        this.updateWidth(this.originalWidth + delta);
    };
    TableDirective.prototype.updateWidth = function (width) {
        this.renderer.setStyle(this.element.nativeElement, 'width', width + 'px');
    };
    return TableDirective;
}());
export { TableDirective };
TableDirective.decorators = [
    { type: Directive, args: [{
                selector: 'table' // tslint:disable-line:directive-selector
            },] },
];
/** @nocollapse */
TableDirective.ctorParameters = function () { return [
    { type: ElementRef, },
    { type: Renderer2, },
    { type: ColumnResizingService, },
]; };
TableDirective.propDecorators = {
    'locked': [{ type: Input },],
    'minWidth': [{ type: HostBinding, args: ['style.min-width',] },],
};
