import { OnInit, EventEmitter, ElementRef, OnDestroy, AfterViewInit, SimpleChange, OnChanges, InjectionToken, QueryList, NgZone, Renderer2 } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMapTo';
import { ScrollerService, Action } from '../scrolling/scroller.service';
import { ColumnBase } from '../columns/column-base';
import { DetailTemplateDirective } from './details/detail-template.directive';
import { DetailsService } from './details/details.service';
import { ColumnsContainer } from '../columns/columns-container';
import { GroupDescriptor } from '@progress/kendo-data-query';
import { GroupableSettings } from '../grouping/group-settings';
import { ChangeNotificationService } from '../data/change-notification.service';
import { NoRecordsTemplateDirective } from './no-records-template.directive';
import { SuspendService } from '../scrolling/suspend.service';
import { GroupsService } from "../grouping/groups.service";
import { RowClassFn } from './common/row-class';
import { ScrollSyncService } from "../scrolling/scroll-sync.service";
import { ResizeService } from "../layout/resize.service";
import { ResizeSensorComponent } from "@progress/kendo-angular-resize-sensor";
import { BrowserSupportService } from "../layout/browser-support.service";
import { SelectableSettings } from '../selection/selectable-settings';
/**
 * @hidden
 */
export declare const SCROLLER_FACTORY_TOKEN: InjectionToken<string>;
/**
 * @hidden
 */
export declare function DEFAULT_SCROLLER_FACTORY(observable: Observable<any>): ScrollerService;
/**
 * @hidden
 */
export declare class ListComponent implements OnInit, OnDestroy, AfterViewInit, OnChanges {
    private changeNotification;
    private suspendService;
    private rtl;
    private groupsService;
    private ngZone;
    private renderer;
    private scrollSyncService;
    private resizeService;
    readonly hostClass: boolean;
    data: Array<any>;
    groups: Array<GroupDescriptor>;
    total: number;
    rowHeight: number;
    detailRowHeight: number;
    take: number;
    skip: number;
    columns: ColumnsContainer;
    detailTemplate: DetailTemplateDirective;
    noRecordsTemplate: NoRecordsTemplateDirective;
    selectable: SelectableSettings | boolean;
    groupable: GroupableSettings | boolean;
    rowClass: RowClassFn;
    pageChange: EventEmitter<Action>;
    totalHeight: number;
    readonly showFooter: boolean;
    container: ElementRef;
    lockedContainer: ElementRef;
    lockedTable: ElementRef;
    table: ElementRef;
    resizeSensors: QueryList<ResizeSensorComponent>;
    private scroller;
    private subscriptions;
    private scrollerSubscription;
    private dispatcher;
    private rowHeightService;
    private skipScroll;
    private rebind;
    private scrollbarWidth;
    readonly lockedLeafColumns: QueryList<ColumnBase>;
    readonly nonLockedLeafColumns: QueryList<ColumnBase>;
    readonly lockedWidth: number;
    readonly nonLockedWidth: number | string;
    readonly isLocked: boolean;
    constructor(scrollerFactory: any, detailsService: DetailsService, changeNotification: ChangeNotificationService, suspendService: SuspendService, rtl: boolean, groupsService: GroupsService, ngZone: NgZone, renderer: Renderer2, scrollSyncService: ScrollSyncService, resizeService: ResizeService, supportService: BrowserSupportService);
    ngOnInit(): void;
    ngOnChanges(changes: {
        [propertyName: string]: SimpleChange;
    }): void;
    ngAfterViewInit(): void;
    syncRowsHeight(): void;
    ngOnDestroy(): void;
    init(): void;
    protected detailExpand({index, expand}: {
        index: number;
        dataItem: any;
        expand: boolean;
    }): void;
    private attachContainerScroll();
    private createScroller();
    private scroll({offset});
    private onContainerScroll({scrollTop});
    private handleRowSync();
    private cleanupScroller();
    private initResizeService();
    private syncContainerHeight();
}
