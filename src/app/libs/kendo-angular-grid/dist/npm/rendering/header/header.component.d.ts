import { EventEmitter, QueryList, OnDestroy } from '@angular/core';
import { ColumnComponent } from '../../columns/column.component';
import { ColumnBase } from '../../columns/column-base';
import { DetailTemplateDirective } from '../details/detail-template.directive';
import { SortDescriptor } from '@progress/kendo-data-query';
import { SortSettings } from '../../columns/sort-settings';
import { GroupDescriptor, CompositeFilterDescriptor } from '@progress/kendo-data-query';
import { DraggableDirective } from '../../common/draggable.directive';
import { GroupDragService } from '../../grouping/group-connection.service';
import { SelectionService } from "../../selection/selection.service";
/**
 * @hidden
 */
export declare class HeaderComponent implements OnDestroy {
    private groupDragService;
    private selectionService;
    /**
     * @hidden
     */
    totalColumnLevels: number;
    columns: Array<ColumnBase>;
    groups: Array<GroupDescriptor>;
    detailTemplate: DetailTemplateDirective;
    scrollable: boolean;
    filterable: boolean;
    sort: Array<SortDescriptor>;
    filter: CompositeFilterDescriptor;
    sortable: SortSettings;
    groupable: boolean;
    lockedColumnsCount: number;
    resizable: boolean;
    sortChange: EventEmitter<Array<SortDescriptor>>;
    readonly headerClass: boolean;
    draggables: QueryList<DraggableDirective>;
    private draggablesSubscription;
    constructor(groupDragService: GroupDragService, selectionService: SelectionService);
    sortColumn(column: ColumnComponent, event: any, link: any, icon: any): boolean;
    sortIcon(field: string): any;
    toggleSort(column: ColumnComponent): Array<SortDescriptor>;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    selectAllCheckboxId(): string;
    isFirstOnRow(column: ColumnComponent, index: number): boolean;
    protected isSortable(column: ColumnComponent): boolean;
    protected isCheckboxColumn(column: any): boolean;
    protected toggleDirection(field: string, allowUnsort: boolean): SortDescriptor;
    protected columnsForLevel(level: number): Array<ColumnBase>;
    protected isColumnGroupComponent(column: ColumnBase): boolean;
    private sortDescriptor(field);
    private readonly columnLevels;
    readonly leafColumns: ColumnBase[];
}
