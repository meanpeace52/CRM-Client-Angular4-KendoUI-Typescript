import {
  Component,
  ContentChild,
  ContentChildren,
  ElementRef,
  EventEmitter,
  HostBinding,
  Inject,
  Input,
  Optional,
  Output,
  Renderer2,
  QueryList,
  ViewChild,
  isDevMode,
  NgZone,
  ViewChildren
} from '@angular/core';
import {
  FormControl,
  FormGroup
} from '@angular/forms';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/groupBy';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/do';
import {
  RTL
} from '@progress/kendo-angular-l10n';
import {
  ColumnComponent,
  isColumnComponent
} from './columns/column.component';
import {
  isColumnGroupComponent
} from './columns/column-group.component';
import {
  DetailTemplateDirective
} from './rendering/details/detail-template.directive';
import {
  isArray,
  anyChanged,
  isChanged,
  isPresent,
  isUniversal,
  observe,
  isTruthy
} from './utils';
import {
  BrowserSupportService
} from './layout/browser-support.service';
import {
  DataResultIterator,
  DataCollection
} from './data/data.collection';
import {
  SelectionService
} from './selection/selection.service';
import {
  Selection
} from "./selection/selection-default";
import {
  EditService
} from './editing/edit.service';
import {
  DetailsService
} from './rendering/details/details.service';
import {
  GroupsService
} from './grouping/groups.service';
import {
  ColumnsContainer
} from './columns/columns-container';
import {
  GroupInfoService
} from './grouping/group-info.service';
import {
  GroupConnectionService
} from './grouping/group-connection.service';
import {
  ChangeNotificationService
} from './data/change-notification.service';
import {
  NoRecordsTemplateDirective
} from './rendering/no-records-template.directive';
import {
  ColumnBase
} from './columns/column-base';
import {
  syncRowsHeight
} from './layout/row-sync';
import {
  CELL_CONTEXT,
  EMPTY_CELL_CONTEXT
} from './rendering/common/cell-context';
import {
  L10N_PREFIX,
  LocalizationService
} from '@progress/kendo-angular-l10n';
import {
  FilterService
} from './filtering/filter.service';
import {
  PagerTemplateDirective
} from './pager/pager-template.directive';
import {
  PagerContextService
} from "./pager/pager-context.service";
import {
  PDFService
} from './pdf/pdf.service';
import {
  PDFExportEvent
} from './pdf/pdf-export-event';
import {
  SuspendService
} from './scrolling/suspend.service';
import {
  ResponsiveService
} from "./layout/responsive.service";
import {
  ExcelService
} from './excel/excel.service';
import {
  ColumnList
} from './columns/column-list';
import {
  ToolbarTemplateDirective
} from "./rendering/toolbar/toolbar-template.directive";
import {
  columnsToRender,
  expandColumns,
  isValidFieldName
} from "./columns/column-common";
import {
  ScrollSyncService
} from "./scrolling/scroll-sync.service";
import {
  ResizeService
} from "./layout/resize.service";
import {
  closest,
  matchesClasses,
  matchesNodeName,
  findFocusable
} from './rendering/common/dom-queries';
import {
  LocalDataChangesService
} from './editing/local-data-changes.service';
import {
  DomEventsService
} from './common/dom-events.service';
import {
  ColumnResizingService
} from "./column-resizing/column-resizing.service";
var createControl = function (source) {
  return function (acc, key) {
    acc[key] = new FormControl(source[key]);
    return acc;
  };
};
var validateColumnsField = function (columns) {
  return expandColumns(columns.toArray())
    .filter(isColumnComponent)
    .filter(function (_a) {
      var field = _a.field;
      return !isValidFieldName(field);
    })
    .forEach(function (_a) {
      var field = _a.field;
      return console.warn("\n                Grid column field name '" + field + "' does not look like a valid JavaScript identifier.\n                Identifiers can contain only alphanumeric characters (including \"$\" or \"_\"), and may not start with a digit.\n                Please use only valid identifier names to ensure error-free operation.\n            ");
    });
};
var handleExpandCollapseService = function (service, expandEmitter, collapseEmitter, map) {
  return (service.changes.filter(function (_a) {
      var dataItem = _a.dataItem;
      return isPresent(dataItem);
    })
    .subscribe(function (x) {
      return x.expand ? expandEmitter.emit(map(x)) : collapseEmitter.emit(map(x));
    }));
};
/**
 * Represents the Kendo UI Grid component for Angular.
 *
 * @example
 * ```ts-preview
 * _@Component({
 *    selector: 'my-app',
 *    template: `
 *        <kendo-grid [data]="gridData">
 *        </kendo-grid>
 *    `
 * })
 * class AppComponent {
 *    private gridData: any[] = products;
 * }
 *
 * const products = [{
 *    "ProductID": 1,
 *    "ProductName": "Chai",
 *    "UnitPrice": 18.0000,
 *    "Discontinued": true
 *  }, {
 *    "ProductID": 2,
 *    "ProductName": "Chang",
 *    "UnitPrice": 19.0000,
 *    "Discontinued": false
 *  }
 * ];
 * ```
 */
var GridComponent = (function () {
  function GridComponent(supportService, selectionService, wrapper, groupInfoService, groupsService, changeNotification, detailsService, editService, filterService, pdfService, responsiveService, renderer, excelService, ngZone, scrollSyncService, domEvents, rtl, columnResizingService) {
    var _this = this;
    this.selectionService = selectionService;
    this.wrapper = wrapper;
    this.groupInfoService = groupInfoService;
    this.groupsService = groupsService;
    this.changeNotification = changeNotification;
    this.detailsService = detailsService;
    this.editService = editService;
    this.filterService = filterService;
    this.pdfService = pdfService;
    this.responsiveService = responsiveService;
    this.renderer = renderer;
    this.excelService = excelService;
    this.ngZone = ngZone;
    this.scrollSyncService = scrollSyncService;
    this.domEvents = domEvents;
    this.rtl = rtl;
    this.columnResizingService = columnResizingService;
    /**
     * Sets the data of the Grid. If an array is provided, the Grid automatically gets the total count.
     */
    this.data = [];
    /**
     * Defines the number of records to be skipped by the pager.
     * Required by the [paging]({% slug paging_grid_kendouiforangular %}) functionality.
     */
    this.skip = 0;
    /**
     * Defines the scroll mode used by the Grid.
     *
     * The available options are:
     *  - `none`&mdash;Renders no scrollbar.
     *  - `scrollable`&mdash;This is the default scroll mode. It requires the setting of the `height` option.
     *  - `virtual`&mdash;Displays no pager and renders a portion of the data (optimized rendering) while the user is scrolling the content.
     */
    this.scrollable = 'scrollable';
    /**
     * Enables the single-row [selection]({% slug selection_grid_kendouiforangular %}) of the Grid.
     */
    this.selectable = false;
    /**
     * Enables the [filtering]({% slug filtering_grid_kendouiforangular %}) of the Grid columns that have their `field` option set.
     */
    this.filterable = false;
    /**
     * Enables the [sorting]({% slug sorting_grid_kendouiforangular %}) of the Grid columns that have their `field` option set.
     */
    this.sortable = false;
    /**
     * Configures the pager of the Grid.
     *
     * The available options are:
     *
     * - `buttonCount: Number`&mdash;Sets the maximum numeric buttons count before the buttons are collapsed.
     * - `info: Boolean`&mdash;Toggles the information about the current page and the total number of records.
     * - `type: PagerType`&mdash;Accepts the `numeric` (buttons with numbers) and `input` (input for typing the page number) values.
     * - `pageSizes: Boolean` or `Array<number>`&mdash;Shows a menu for selecting the page size.
     * - `previousNext: Boolean`&mdash;Toggles the **Previous** and **Next** buttons.
     */
    this.pageable = false;
    /**
     * If set to `true`, the user can group the Grid by dragging the column header cells.
     * By default, grouping is disabled.
     */
    this.groupable = false;
    /**
     * If set to `true`, the user can resize columns by dragging the edges (resize handles) of their header cells.
     * @default false
     */
    this.resizable = false;
    /**
     * Fires when the Grid filter is modified through the UI.
     * You have to handle the event yourself and filter the data.
     */
    this.filterChange = new EventEmitter();
    /**
     * Fires when the page of the Grid is changed.
     * You have to handle the event yourself and page the data.
     */
    this.pageChange = new EventEmitter();
    /**
     * Fires when the grouping of the Grid is changed.
     * You have to handle the event yourself and group the data.
     */

    this.groupChange = new EventEmitter();
    /**
     * Fires when the sorting of the Grid is changed.
     * You have to handle the event yourself and sort the data.
     */
    this.sortChange = new EventEmitter();
    /**
     * Fires when the user selects a Grid row.
     * Emits the [`SelectionEvent`]({% slug api_grid_selectionevent_kendouiforangular %}#toc-selectionchange).
     */
    this.selectionChange = new EventEmitter();
    /**
     * Fires when the data state of the Grid is changed.
     */
    this.dataStateChange = new EventEmitter();
    /**
     * Fires when the user expands a group header.
     */
    this.groupExpand = new EventEmitter();
    /**
     * Fires when the user collapses a group header.
     */
    this.groupCollapse = new EventEmitter();
    /**
     * Fires when the user expands a master row.
     */
    this.detailExpand = new EventEmitter();
    /**
     * Fires when the user collapses a master row.
     */
    this.detailCollapse = new EventEmitter();
    /**
     * Fires when the user clicks the **Edit** command button to edit a row.
     */
    this.edit = new EventEmitter();
    /**
     * Fires when the user clicks the **Cancel** command button to close a row.
     */
    this.cancel = new EventEmitter();
    /**
     * Fires when the user clicks the **Save** command button to save changes in a row.
     */
    this.save = new EventEmitter();
    /**
     * Fires when the user clicks the **Remove** command button to remove a row.
     */
    this.remove = new EventEmitter();
    /**
     * Fires when the user clicks the **Add** command button to add a new row.
     */
    this.add = new EventEmitter();
    /**
     * Fires when the user leaves an edited cell.
     */
    this.cellClose = new EventEmitter();
    /**
     * Fires when the user clicks a cell.
     */
    this.cellClick = new EventEmitter();
    /**
     * Fires when the user clicks the **Export to PDF** command button.
     */
    this.pdfExport = new EventEmitter();
    /**
     * Fires when the user clicks the **Export to PDF** command button.
     */
    this.pdfExportAsString = new EventEmitter();
    /**
     * Fires when the user clicks the **Export to Excel** command button.
     */
    this.excelExport = new EventEmitter();
    /**
     * Fires when the user completes the resizing of the column.
     */
    this.columnResize = new EventEmitter();
    this.columns = new QueryList();
    this.footer = new QueryList();
    this.selectionDirective = false;
    this.columnsContainer = new ColumnsContainer(function () {
      return _this.columnList.filter(function (column) {
        return !_this.isHidden(column) && _this.matchesMedia(column);
      });
    });
    this.view = new DataCollection(function () {
      return new DataResultIterator(_this.data, _this.skip, _this.showGroupFooters);
    });
    this.shouldGenerateColumns = true;
    this._sort = new Array();
    this._group = new Array();
    this.cachedWindowWidth = 0;
    this._rowSelected = null;
    this.columnResizingInProgress = false;
    this._rowClass = function () {
      return null;
    };
    this.direction = rtl ? 'rtl' : 'ltr';
    this.scrollbarWidth = supportService.scrollbarWidth;
    this.groupInfoService.registerColumnsContainer(function () {
      return _this.columnList;
    });
    if (selectionService) {
      this.selectionSubscription = selectionService.changes.subscribe(function (event) {
        _this.selectionChange.emit(event);
      });
    }
    this.groupExpandCollapseSubscription = handleExpandCollapseService(groupsService, this.groupExpand, this.groupCollapse, function (_a) {
      var group = _a.dataItem,
        index = _a.index;
      return ({
        group: group,
        groupIndex: index
      });
    });
    this.detailsServiceSubscription = handleExpandCollapseService(detailsService, this.detailExpand, this.detailCollapse, function (_a) {
      var dataItem = _a.dataItem,
        index = _a.index;
      return ({
        dataItem: dataItem,
        index: index
      });
    });
    this.filterSubscription = this.filterService.changes.subscribe(function (x) {
      _this.filterChange.emit(x);
    });
    this.attachStateChangesEmitter();
    this.attachEditHandlers();
    this.attachDomEventHandlers();
    this.pdfSubscription = this.pdfService.exportClick.subscribe(this.emitPDFExportEvent.bind(this));
    this.exportDoneSubscription = this.pdfService.exportDone.subscribe(this.emitPDFExportDone.bind(this));
    this.excelSubscription = this.excelService.exportClick.subscribe(this.saveAsExcel.bind(this));
    this.columnsContainerChange();
    this.columnResizingSubscription = this.columnResizingService
      .changes
      .do(function (e) {
        return _this.columnResizingInProgress = e.type !== 'end';
      })
      .filter(function (e) {
        return e.type === 'end';
      })
      .subscribe(this.notifyResize.bind(this));
    this.columnList = new ColumnList(this.columns);
  }
  Object.defineProperty(GridComponent.prototype, "sort", {
    /**
     */
    get: function () {
      return this._sort;
    },
    /**
     * The descriptors by which the data will be sorted.
     */
    set: function (value) {
      if (isArray(value)) {
        this._sort = value;
      }
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(GridComponent.prototype, "group", {
    /**
     */
    get: function () {
      return this._group;
    },
    /**
     * The descriptors by which the data will to be grouped.
     */
    set: function (value) {
      if (isArray(value)) {
        this._group = value;
      }
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(GridComponent.prototype, "showTopToolbar", {
    /**
     * @hidden
     */
    get: function () {
      return this.toolbarTemplate && ['top', 'both'].indexOf(this.toolbarTemplate.position) > -1;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(GridComponent.prototype, "showBottomToolbar", {
    /**
     * @hidden
     */
    get: function () {
      return this.toolbarTemplate && ['bottom', 'both'].indexOf(this.toolbarTemplate.position) > -1;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(GridComponent.prototype, "isLocked", {
    /**
     * @hidden
     */
    get: function () {
      return this.lockedLeafColumns.length > 0;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(GridComponent.prototype, "showPager", {
    /**
     * @hidden
     */
    get: function () {
      return !this.isVirtual && this.pageable !== false;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(GridComponent.prototype, "showGroupPanel", {
    /**
     * @hidden
     */
    get: function () {
      return this.groupable && this.groupable.enabled !== false;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(GridComponent.prototype, "rowClass", {
    get: function () {
      return this._rowClass;
    },
    /**
     * Defines a function that is executed for every data row in the component.
     *
     * @example
     * ```ts-preview
     * import { Component, ViewEncapsulation } from '@angular/core';
     * import { RowClassArgs } from '@progress/kendo-angular-grid';
     *
     * _@Component({
     *    selector: 'my-app',
     *    encapsulation: ViewEncapsulation.None,
     *    styles: [`
     *        .k-grid tr.even { background-color: #f45c42; }
     *        .k-grid tr.odd { background-color: #41f4df; }
     *    `],
     *    template: `
     *        <kendo-grid [data]="gridData" [rowClass]="rowCallback">
     *        </kendo-grid>
     *    `
     * })
     * class AppComponent {
     *    private gridData: any[] = products;
     *
     *    rowCallback(context: RowClassArgs) {
     *        const isEven = context.index % 2 == 0;
     *        return {
     *            even: isEven,
     *            odd: !isEven
     *        };
     *    }
     * }
     *
     * const products = [{
     *    "ProductID": 1,
     *    "ProductName": "Chai",
     *    "UnitPrice": 18.0000,
     *    "Discontinued": true
     *  }, {
     *    "ProductID": 2,
     *    "ProductName": "Chang",
     *    "UnitPrice": 19.0000,
     *    "Discontinued": false
     *  }
     * ];
     * ```
     */
    set: function (fn) {
      if (typeof fn !== 'function') {
        throw new Error("rowClass must be a function, but received " + JSON.stringify(fn) + ".");
      }
      this._rowClass = fn;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(GridComponent.prototype, "rowSelected", {
    get: function () {
      return this._rowSelected;
    },
    /**
     * Defines a Boolean function that is executed for each data row in the component.
     * It determines whether the row will be selected.
     */
    set: function (fn) {
      if (typeof fn !== 'function') {
        throw new Error("rowSelected must be a function, but received " + JSON.stringify(fn) + ".");
      }
      this._rowSelected = fn;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(GridComponent.prototype, "dir", {
    get: function () {
      return this.direction;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(GridComponent.prototype, "hostClasses", {
    get: function () {
      return true;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(GridComponent.prototype, "lockedClasses", {
    get: function () {
      return this.lockedLeafColumns.length > 0;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(GridComponent.prototype, "virtualClasses", {
    get: function () {
      return this.isVirtual;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(GridComponent.prototype, "columnResizing", {
    get: function () {
      return this.columnResizingInProgress;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(GridComponent.prototype, "headerPadding", {
    get: function () {
      if (isUniversal()) {
        return "";
      }
      var padding = Math.max(0, this.scrollbarWidth - 1) + 'px';
      var right = this.rtl ? 0 : padding;
      var left = this.rtl ? padding : 0;
      return "0 " + right + " 0 " + left;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(GridComponent.prototype, "showGroupFooters", {
    get: function () {
      return columnsToRender(this.columnList.toArray()).filter(function (column) {
        return column.groupFooterTemplateRef;
      }).length > 0;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(GridComponent.prototype, "showFooter", {
    get: function () {
      return this.columnList.filter(function (column) {
        return column.footerTemplateRef;
      }).length > 0;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(GridComponent.prototype, "isVirtual", {
    get: function () {
      return this.scrollable === 'virtual';
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(GridComponent.prototype, "isScrollable", {
    get: function () {
      return this.scrollable !== 'none';
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(GridComponent.prototype, "visibleColumns", {
    get: function () {
      return this.columnsContainer.allColumns;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(GridComponent.prototype, "lockedColumns", {
    get: function () {
      return this.columnsContainer.lockedColumns;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(GridComponent.prototype, "nonLockedColumns", {
    get: function () {
      return this.columnsContainer.nonLockedColumns;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(GridComponent.prototype, "lockedLeafColumns", {
    get: function () {
      return this.columnsContainer.lockedLeafColumns;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(GridComponent.prototype, "nonLockedLeafColumns", {
    get: function () {
      return this.columnsContainer.nonLockedLeafColumns;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(GridComponent.prototype, "leafColumns", {
    get: function () {
      return this.columnsContainer.leafColumns;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(GridComponent.prototype, "totalColumnLevels", {
    get: function () {
      return this.columnsContainer.totalLevels;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(GridComponent.prototype, "lockedWidth", {
    get: function () {
      var groupCellsWidth = this.group.length * 30; // this should be the value of group-cell inside the theme!
      return expandColumns(this.lockedLeafColumns.toArray()).reduce(function (prev, curr) {
        return prev + (curr.width || 0);
      }, groupCellsWidth);
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(GridComponent.prototype, "nonLockedWidth", {
    get: function () {
      if (this.lockedLeafColumns.length) {
        return expandColumns(this.nonLockedLeafColumns.toArray()).reduce(function (prev, curr) {
          return prev + (curr.width || 0);
        }, 0);
      }
      return undefined;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(GridComponent.prototype, "selectableSettings", {
    get: function () {
      if (this.selectionService) {
        return this.selectionService.options;
      }
      return undefined;
    },
    enumerable: true,
    configurable: true
  });
  /**
   * Expands the specified master row.
   *
   * @param {number} index - The absolute index of the master row.
   */
  GridComponent.prototype.expandRow = function (index) {
    if (!this.detailsService.isExpanded(index)) {
      this.detailsService.toggleRow(index, null);
    }
  };
  /**
   * Collapses the specified master row.
   *
   * @param {number} index - The absolute index of the master row.
   */
  GridComponent.prototype.collapseRow = function (index) {
    if (this.detailsService.isExpanded(index)) {
      this.detailsService.toggleRow(index, null);
    }
  };
  /**
   * Expands a group header item for the given index.
   * For example, `0_1` expands the second inner group of the first master group.
   *
   * @param {string} index - The underscore separated hierarchical index of the group.
   */
  GridComponent.prototype.expandGroup = function (index) {
    if (!this.groupsService.isExpanded(index)) {
      this.groupsService.toggleRow(index, null);
    }
  };
  /**
   * Collapses a group header item for the given index.
   * For example, `0_1` collapses the second inner group of the first master group.
   *
   * @param {string} index - The underscore separated hierarchical index of the group.
   */
  GridComponent.prototype.collapseGroup = function (index) {
    if (this.groupsService.isExpanded(index)) {
      this.groupsService.toggleRow(index, null);
    }
  };
  /**
   * @hidden
   */
  GridComponent.prototype.resetGroupsState = function () {
    this.groupsService.reset();
  };
  /**
   * @hidden
   */
  GridComponent.prototype.expandGroupChildren = function (groupIndex) {
    this.groupsService.expandChildren(groupIndex);
  };
  /**
   * @hidden
   */
  GridComponent.prototype.onDataChange = function () {
    this.autoGenerateColumns();
    this.changeNotification.notify();
    this.pdfService.dataChanged.emit();
    if (isPresent(this.defaultSelection)) {
      this.defaultSelection.reset();
    }
    this.initSelectionService();
  };
  GridComponent.prototype.ngOnChanges = function (changes) {
    if (isChanged("data", changes)) {
      this.onDataChange();
    }
    if (this.lockedLeafColumns.length && anyChanged(["pageSize", "skip", "sort", "group"], changes)) {
      this.changeNotification.notify();
    }
    if (isChanged("height", changes, false)) {
      this.renderer.setStyle(this.wrapper.nativeElement, 'height', this.height + "px");
    }
  };
  GridComponent.prototype.ngAfterViewInit = function () {
    var _this = this;
    var resizeCheck = this.resizeCheck.bind(this);
    this.resizeSubscription = this.renderer.listen('window', 'resize', resizeCheck);
    this.orientationSubscription = this.renderer.listen('window', 'orientationchange', resizeCheck);
    this.attachScrollSync();
    this.ngZone.runOutsideAngular(function () {
      _this.documentClickSubscription = _this.renderer.listen('document', 'click', function (args) {
        if (_this.editService.shouldCloseCell() &&
          !closest(args.target, matchesClasses('k-animation-container k-grid-ignore-click'))) {
          _this.ngZone.run(function () {
            _this.editService.closeCell(args);
          });
        }
      });
      _this.windowBlurSubscription = _this.renderer.listen('window', 'blur', function (args) {
        var activeElement = document.activeElement;
        if (!(matchesNodeName('input')(activeElement) && activeElement.type === 'file' &&
            closest(activeElement, matchesClasses('k-grid-edit-cell')) &&
            closest(activeElement, matchesNodeName('kendo-grid')) === _this.wrapper.nativeElement)) {
          _this.ngZone.run(function () {
            _this.editService.closeCell(args);
          });
        }
      });
    });
  };
  GridComponent.prototype.ngAfterContentChecked = function () {
    this.columnsContainer.refresh();
    this.verifySettings();
    this.initSelectionService();
  };
  GridComponent.prototype.ngAfterContentInit = function () {
    var _this = this;
    this.shouldGenerateColumns = !this.columns.length;
    this.autoGenerateColumns();
    this.columnList = new ColumnList(this.columns);
    this.columnsChangeSubscription = this.columns.changes.subscribe(function () {
      return _this.verifySettings();
    });
  };
  GridComponent.prototype.ngOnDestroy = function () {
    if (this.selectionSubscription) {
      this.selectionSubscription.unsubscribe();
    }
    if (this.stateChangeSubscription) {
      this.stateChangeSubscription.unsubscribe();
    }
    if (this.groupExpandCollapseSubscription) {
      this.groupExpandCollapseSubscription.unsubscribe();
    }
    if (this.detailsServiceSubscription) {
      this.detailsServiceSubscription.unsubscribe();
    }
    if (this.editServiceSubscription) {
      this.editServiceSubscription.unsubscribe();
    }
    if (this.pdfSubscription) {
      this.pdfSubscription.unsubscribe();
    }
    if (this.exportDoneSubscription) {
      this.exportDoneSubscription.unsubscribe();
    }
    if (this.filterSubscription) {
      this.filterSubscription.unsubscribe();
    }
    if (this.columnsChangeSubscription) {
      this.columnsChangeSubscription.unsubscribe();
    }
    if (this.resizeSubscription) {
      this.resizeSubscription();
    }
    if (this.orientationSubscription) {
      this.orientationSubscription();
    }
    if (this.excelSubscription) {
      this.excelSubscription.unsubscribe();
    }
    if (this.columnsContainerChangeSubscription) {
      this.columnsContainerChangeSubscription.unsubscribe();
    }
    if (this.scrollSyncService) {
      this.scrollSyncService.destroy();
    }
    if (this.documentClickSubscription) {
      this.documentClickSubscription();
    }
    if (this.windowBlurSubscription) {
      this.windowBlurSubscription();
    }
    if (this.defaultSelection) {
      this.defaultSelection.destroy();
    }
    if (this.cellClickSubscription) {
      this.cellClickSubscription.unsubscribe();
    }
    if (this.footerChangeSubscription) {
      this.footerChangeSubscription.unsubscribe();
    }
    this.ngZone = null;
    if (this.columnResizingSubscription) {
      this.columnResizingSubscription.unsubscribe();
    }
  };
  /**
   * @hidden
   */
  GridComponent.prototype.attachScrollSync = function () {
    var _this = this;
    if (isUniversal()) {
      return;
    }
    if (this.header) {
      this.scrollSyncService.registerEmitter(this.header.nativeElement, "header");
    }
    if (this.footer) {
      this.footerChangeSubscription = observe(this.footer)
        .subscribe(function (footers) {
          return footers
            .map(function (footer) {
              return footer.nativeElement;
            })
            .filter(isPresent)
            .forEach(function (element) {
              return _this.scrollSyncService.registerEmitter(element, "footer");
            });
        });
    }
  };
  /**
   * Switches the specified table row in the edit mode.
   *
   * @param {number} index - The row index that will be switched in the edit mode.
   * @param {FormGroup} group - The [`FormGroup`](https://angular.io/docs/ts/latest/api/forms/index/FormGroup-class.html)
   * that describes the edit form.
   */
  GridComponent.prototype.editRow = function (index, group) {
    this.editService.editRow(index, group);
    this.focusEditElement("tr[data-kendo-grid-item-index=\"" + index + "\"]");
  };
  /**
   * Closes the editor for a given row.
   *
   * @param {number} index - The row index that will be switched out of the edit mode. If no index is provided, it is assumed
   * that the new item editor will be closed.
   */
  GridComponent.prototype.closeRow = function (index) {
    this.editService.close(index);
  };
  /**
   * Creates a new row editor.
   *
   * @param {FormGroup} group - The [`FormGroup`](https://angular.io/docs/ts/latest/api/forms/index/FormGroup-class.html) that describes
   * the edit form. If called with a data item, it will build the `FormGroup` from the data item fields.
   */
  GridComponent.prototype.addRow = function (group) {
    var isFormGroup = group instanceof FormGroup;
    if (!isFormGroup) {
      var fields = Object.keys(group).reduce(createControl(group), {}); // FormBuilder?
      group = new FormGroup(fields);
    }
    this.editService.addRow(group);
    this.focusEditElement('.k-grid-add-row');
  };
  /**
   * Puts the cell that is specified by the table row and column in edit mode.
   *
   * @param {number} rowIndex - The row index that will be switched in the edit mode.
   * @param {number|string|any} column - The leaf column index, or the field name or the column instance that should be edited.
   * @param {FormGroup} group - The [`FormGroup`](https://angular.io/docs/ts/latest/api/forms/index/FormGroup-class.html)
   * that describes the edit form.
   */
  GridComponent.prototype.editCell = function (rowIndex, column, group) {
    var instance = this.columnInstance(column);
    this.editService.editCell(rowIndex, instance, group);
    this.focusEditElement('.k-grid-edit-cell');
  };
  /**
   * Closes the current cell in edit mode and fires the `cellClose` event.
   */
  GridComponent.prototype.closeCell = function () {
    this.editService.closeCell();
  };
  /**
   * Closes the current cell in edit mode.
   */
  GridComponent.prototype.cancelCell = function () {
    this.editService.cancelCell();
  };
  /**
   * Initiates the PDF export.
   */
  GridComponent.prototype.saveAsPDF = function () {
    this.pdfService.save(this);
  };
  /**
   * Initiates the PDF export .
   */
  GridComponent.prototype.export = function () {
    return this.pdfService.export(this);
  };
  /**
   * Initiates the Excel export.
   */
  GridComponent.prototype.saveAsExcel = function () {
    this.excelService.save(this);
  };
  /**
   * @hidden
   */
  GridComponent.prototype.notifyPageChange = function (source, event) {
    if (source === "list" && !this.isVirtual) {
      return;
    }
    this.pageChange.emit(event);
  };
  /**
   * @hidden
   */
  GridComponent.prototype.focusEditElement = function (containerSelector) {
    var _this = this;
    this.ngZone.runOutsideAngular(function () {
      _this.ngZone.onStable.asObservable().take(1).subscribe(function () {
        var wrapper = _this.wrapper.nativeElement;
        if (!_this.setEditFocus(wrapper.querySelector(containerSelector)) && _this.isLocked) {
          _this.setEditFocus(wrapper.querySelector(".k-grid-content " + containerSelector));
        }
      });
    });
  };
  GridComponent.prototype.initSelectionService = function () {
    if (!this.selectionDirective && !isPresent(this.defaultSelection)) {
      this.defaultSelection = new Selection(this);
    }
    this.selectionService.init({
      rowSelected: this.rowSelected,
      selectable: this.selectable,
      view: this.view
    });
    if (!this.selectionDirective && !this.selectableSettings.enabled) {
      this.defaultSelection.reset();
    }
  };
  GridComponent.prototype.setEditFocus = function (element) {
    if (element) {
      var focusable = findFocusable(element);
      if (focusable) {
        focusable.focus();
        return true;
      }
    }
  };
  GridComponent.prototype.columnInstance = function (column) {
    var instance;
    if (typeof column === 'number') {
      instance = this.columnList.filter(function (item) {
        return !item.isColumnGroup && !item.hidden;
      })[column];
    } else if (typeof column === 'string') {
      instance = this.columnList.filter(function (item) {
        return item.field === column;
      })[0];
    } else {
      instance = column;
    }
    if (!instance && isDevMode()) {
      throw new Error("Invalid column " + column);
    }
    return instance;
  };
  GridComponent.prototype.verifySettings = function () {
    if (isDevMode()) {
      if (this.lockedLeafColumns.length && this.detailTemplate) {
        throw new Error('Having both detail template and locked columns is not supported');
      }
      if (this.lockedLeafColumns.length && !this.nonLockedLeafColumns.length) {
        throw new Error('There should be at least one non locked column');
      }
      if (this.lockedLeafColumns.length && expandColumns(this.columnList.toArray()).filter(function (x) {
          return !x.width;
        }).length) {
        throw new Error('Locked columns feature requires all columns to have width set');
      }
      if (this.lockedLeafColumns.length && !this.isScrollable) {
        throw new Error('Locked columns are only supported when scrolling is enabled');
      }
      if (this.columnList.filter(isColumnGroupComponent).filter(function (x) {
          return x.children.length < 2;
        }).length) {
        throw new Error('ColumnGroupComponent should contain ColumnComponent or CommandColumnComponent');
      }
      if (this.columnList.filter(function (x) {
          return x.locked && x.parent && !x.parent.isLocked;
        }).length) {
        throw new Error('Locked child columns require their parent columns to be locked.');
      }
      if ((this.rowHeight || this.detailRowHeight) && !this.isVirtual) {
        throw new Error('Row height and detail row height settings requires virtual scrolling mode to be enabled.');
      }
      validateColumnsField(this.columnList);
    }
  };
  GridComponent.prototype.autoGenerateColumns = function () {
    if (this.shouldGenerateColumns && !this.columns.length && this.view.length) {
      this.columns.reset(Object.keys(this.view.at(0)).map(function (field) {
        var column = new ColumnComponent();
        column.field = field;
        return column;
      }));
    }
  };
  GridComponent.prototype.attachStateChangesEmitter = function () {
    var _this = this;
    this.stateChangeSubscription =
      this.pageChange.map(function (x) {
        return ({
          filter: _this.filter,
          group: _this.group,
          skip: x.skip,
          sort: _this.sort,
          take: x.take
        });
      })
      .merge(this.sortChange.map(function (sort) {
        return ({
          filter: _this.filter,
          group: _this.group,
          skip: _this.skip,
          sort: sort,
          take: _this.pageSize
        });
      }))
      .merge(this.groupChange.map(function (group) {
        return ({
          filter: _this.filter,
          group: group,
          skip: _this.skip,
          sort: _this.sort,
          take: _this.pageSize
        });
      }))
      .merge(this.filterChange.map(function (filter) {
        return ({
          filter: filter,
          group: _this.group,
          skip: 0,
          sort: _this.sort,
          take: _this.pageSize
        });
      }))
      .subscribe(function (x) {
        _this.closeCell();
        _this.cancelCell();
        _this.dataStateChange.emit(x);
      });
  };
  GridComponent.prototype.attachEditHandlers = function () {
    if (!this.editService) {
      return;
    }
    this.editServiceSubscription = this.editService
      .changes.subscribe(this.emitCRUDEvent.bind(this));
  };
  GridComponent.prototype.emitCRUDEvent = function (args) {
    var action = args.action,
      rowIndex = args.rowIndex,
      formGroup = args.formGroup;
    var dataItem = this.view.at(rowIndex - this.skip);
    if (action !== 'add' && !dataItem) {
      dataItem = formGroup.value;
    }
    this.closeCell();
    Object.assign(args, {
      dataItem: dataItem,
      sender: this
    });
    switch (action) {
      case 'add':
        this.add.emit(args);
        break;
      case 'cancel':
        this.cancel.emit(args);
        break;
      case 'edit':
        this.edit.emit(args);
        break;
      case 'remove':
        this.remove.emit(args);
        break;
      case 'save':
        this.save.emit(args);
        break;
      case 'cellClose':
        this.cellClose.emit(args);
        break;
      default:
        break;
    }
  };
  GridComponent.prototype.attachDomEventHandlers = function () {
    var _this = this;
    this.cellClickSubscription = this.domEvents.cellClick.subscribe(function (args) {
      _this.cellClick.emit(Object.assign({
        sender: _this
      }, args));
    });
  };
  GridComponent.prototype.isHidden = function (c) {
    return c.hidden || (c.parent && this.isHidden(c.parent));
  };
  GridComponent.prototype.matchesMedia = function (c) {
    var matches = this.responsiveService.matchesMedia(c.media);
    return matches && (!c.parent || this.matchesMedia(c.parent));
  };
  GridComponent.prototype.resizeCheck = function () {
    if (window.innerWidth !== this.cachedWindowWidth) {
      this.cachedWindowWidth = window.innerWidth;
      this.columnsContainer.refresh();
      this.verifySettings();
    }
  };
  GridComponent.prototype.emitPDFExportEvent = function () {
    var args = new PDFExportEvent();
    this.pdfExport.emit(args);
    if (!args.isDefaultPrevented()) {
      this.saveAsPDF();
    }
  };
  GridComponent.prototype.emitPDFExportDone = function (e) {
    var _this = this;
    e.then(function (pdfString) {
      _this.pdfExport.emit(pdfString);
    })
  };
  GridComponent.prototype.columnsContainerChange = function () {
    var _this = this;
    this.columnsContainerChangeSubscription = this.columnsContainer.changes
      .filter(function () {
        return _this.lockedColumns.length > 0;
      })
      .switchMap(function () {
        return _this.ngZone.onStable.asObservable().take(1);
      })
      .filter(function () {
        return isPresent(_this.lockedHeader);
      })
      .subscribe(function () {
        return syncRowsHeight(_this.lockedHeader.nativeElement.children[0], _this.header.nativeElement.children[0]);
      });
  };
  GridComponent.prototype.notifyResize = function (e) {
    var args = e.resizedColumns
      .filter(function (item) {
        return isTruthy(item.column.resizable) && !item.column.isColumnGroup;
      })
      .map(function (item) {
        return ({
          column: item.column,
          newWidth: item.column.width,
          oldWidth: item.oldWidth
        });
      });
    this.columnResize.emit(args);
  };
  return GridComponent;
}());
export {
  GridComponent
};
GridComponent.decorators = [{
  type: Component,
  args: [{
    exportAs: 'kendoGrid',
    providers: [
      LocalizationService,
      BrowserSupportService,
      SelectionService,
      DetailsService,
      GroupsService,
      GroupInfoService,
      GroupConnectionService,
      ChangeNotificationService,
      EditService,
      PDFService,
      SuspendService,
      {
        provide: CELL_CONTEXT,
        useValue: EMPTY_CELL_CONTEXT
      },
      {
        provide: L10N_PREFIX,
        useValue: 'kendo.grid'
      },
      FilterService,
      ResponsiveService,
      PagerContextService,
      ExcelService,
      ScrollSyncService,
      ResizeService,
      LocalDataChangesService,
      DomEventsService,
      ColumnResizingService
    ],
    selector: 'kendo-grid',
    template: "\n        <ng-container kendoGridLocalizedMessages\n            i18n-groupPanelEmpty=\"kendo.grid.groupPanelEmpty|The label visible in the Grid group panel when it is empty\"\n            groupPanelEmpty=\"Drag a column header and drop it here to group by that column\"\n\n            i18n-noRecords=\"kendo.grid.noRecords|The label visible in the Grid when there are no records\"\n            noRecords=\"No records available.\"\n\n            i18n-pagerFirstPage=\"kendo.grid.pagerFirstPage|The label for the first page button in Grid pager\"\n            pagerFirstPage=\"Go to the first page\"\n\n            i18n-pagerPreviousPage=\"kendo.grid.pagerPreviousPage|The label for the previous page button in Grid pager\"\n            pagerPreviousPage=\"Go to the previous page\"\n\n            i18n-pagerNextPage=\"kendo.grid.pagerNextPage|The label for the next page button in Grid pager\"\n            pagerNextPage=\"Go to the next page\"\n\n            i18n-pagerLastPage=\"kendo.grid.pagerLastPage|The label for the last page button in Grid pager\"\n            pagerLastPage=\"Go to the last page\"\n\n            i18n-pagerPage=\"kendo.grid.pagerPage|The label before the current page number in the Grid pager\"\n            pagerPage=\"Page\"\n\n            i18n-pagerOf=\"kendo.grid.pagerOf|The label before the total pages number in the Grid pager\"\n            pagerOf=\"of\"\n\n            i18n-pagerItems=\"kendo.grid.pagerItems|The label after the total pages number in the Grid pager\"\n            pagerItems=\"items\"\n\n            i18n-pagerItemsPerPage=\"kendo.grid.pagerItemsPerPage|The label for the page size chooser in the Grid pager\"\n            pagerItemsPerPage=\"items per page\"\n\n            i18n-filterEqOperator=\"kendo.grid.filterEqOperator|The text of the equal filter operator\"\n            filterEqOperator=\"Is equal to\"\n\n            i18n-filterNotEqOperator=\"kendo.grid.filterNotEqOperator|The text of the not equal filter operator\"\n            filterNotEqOperator=\"Is not equal to\"\n\n            i18n-filterIsNullOperator=\"kendo.grid.filterIsNullOperator|The text of the is null filter operator\"\n            filterIsNullOperator=\"Is null\"\n\n            i18n-filterIsNotNullOperator=\"kendo.grid.filterIsNotNullOperator|The text of the is not null filter operator\"\n            filterIsNotNullOperator=\"Is not null\"\n\n            i18n-filterIsEmptyOperator=\"kendo.grid.filterIsEmptyOperator|The text of the is empty filter operator\"\n            filterIsEmptyOperator=\"Is empty\"\n\n            i18n-filterIsNotEmptyOperator=\"kendo.grid.filterIsNotEmptyOperator|The text of the is not empty filter operator\"\n            filterIsNotEmptyOperator=\"Is not empty\"\n\n            i18n-filterStartsWithOperator=\"kendo.grid.filterStartsWithOperator|The text of the starts with filter operator\"\n            filterStartsWithOperator=\"Starts with\"\n\n            i18n-filterContainsOperator=\"kendo.grid.filterContainsOperator|The text of the contains filter operator\"\n            filterContainsOperator=\"Contains\"\n\n            i18n-filterNotContainsOperator=\"kendo.grid.filterNotContainsOperator|The text of the does not contain filter operator\"\n            filterNotContainsOperator=\"Does not contain\"\n\n            i18n-filterEndsWithOperator=\"kendo.grid.filterEndsWithOperator|The text of the ends with filter operator\"\n            filterEndsWithOperator=\"Ends with\"\n\n            i18n-filterGteOperator=\"kendo.grid.filterGteOperator|The text of the greater than or equal filter operator\"\n            filterGteOperator=\"Is greater than or equal to\"\n\n            i18n-filterGtOperator=\"kendo.grid.filterGtOperator|The text of the greater than filter operator\"\n            filterGtOperator=\"Is greater than\"\n\n            i18n-filterLteOperator=\"kendo.grid.filterLteOperator|The text of the less than or equal filter operator\"\n            filterLteOperator=\"Is less than or equal to\"\n\n            i18n-filterLtOperator=\"kendo.grid.filterLtOperator|The text of the less than filter operator\"\n            filterLtOperator=\"Is less than\"\n\n            i18n-filterIsTrue=\"kendo.grid.filterIsTrue|The text of the IsTrue boolean filter option\"\n            filterIsTrue=\"Is True\"\n\n            i18n-filterIsFalse=\"kendo.grid.filterIsFalse|The text of the IsFalse boolean filter option\"\n            filterIsFalse=\"Is False\"\n\n            i18n-filterBooleanAll=\"kendo.grid.filterBooleanAll|The text of the (All) boolean filter option\"\n            filterBooleanAll=\"(All)\"\n\n            i18n-filterAfterOrEqualOperator=\"kendo.grid.filterAfterOrEqualOperator|The text of the after or equal date filter operator\"\n            filterAfterOrEqualOperator=\"Is after or equal to\"\n\n            i18n-filterAfterOperator=\"kendo.grid.filterAfterOperator|The text of the after date filter operator\"\n            filterAfterOperator=\"Is after\"\n\n            i18n-filterBeforeOperator=\"kendo.grid.filterBeforeOperator|The text of the before date filter operator\"\n            filterBeforeOperator=\"Is before\"\n\n            i18n-filterBeforeOrEqualOperator=\"kendo.grid.filterBeforeOrEqualOperator|The text of the before or equal date filter operator\"\n            filterBeforeOrEqualOperator=\"Is before or equal to\"\n        >\n        </ng-container>\n        <kendo-grid-toolbar *ngIf=\"showTopToolbar\"></kendo-grid-toolbar>\n        <kendo-grid-group-panel\n            *ngIf=\"showGroupPanel\"\n            [text]=\"groupable.emptyText\"\n            [groups]=\"group\"\n            (change)=\"groupChange.emit($event)\">\n        </kendo-grid-group-panel>\n        <ng-template [ngIf]=\"isScrollable\">\n            <div\n                class=\"k-grid-header\"\n                [style.padding]=\"headerPadding\">\n                <div class=\"k-grid-header-locked\" #lockedHeader\n                    *ngIf=\"isLocked\"\n                     [style.width.px]=\"lockedWidth\">\n                    <table [locked]=\"true\">\n                        <colgroup kendoGridColGroup\n                            [columns]=\"lockedLeafColumns\"\n                            [groups]=\"group\"\n                            [detailTemplate]=\"detailTemplate\">\n                        </colgroup>\n                        <thead kendoGridHeader\n                            [resizable]=\"resizable\"\n                            [scrollable]=\"true\"\n                            [columns]=\"lockedColumns\"\n                            [totalColumnLevels]=\"totalColumnLevels\"\n                            [sort]=\"sort\"\n                            [groups]=\"group\"\n                            [filter]=\"filter\"\n                            [filterable]=\"filterable\"\n                            [groupable]=\"showGroupPanel\"\n                            [sortable]=\"sortable\"\n                            (sortChange)=\"sortChange.emit($event)\"\n                            [detailTemplate]=\"detailTemplate\">\n                        </thead>\n                    </table>\n                </div><div class=\"k-grid-header-wrap\" #header\n                    [kendoGridResizableContainer]=\"lockedLeafColumns.length\"\n                    [lockedWidth]=\"lockedWidth + scrollbarWidth + 2\">\n                    <table [style.width.px]=\"nonLockedWidth\">\n                        <colgroup kendoGridColGroup\n                            [columns]=\"nonLockedLeafColumns\"\n                            [groups]=\"isLocked ? [] : group\"\n                            [detailTemplate]=\"detailTemplate\">\n                        </colgroup>\n                        <thead kendoGridHeader\n                            [resizable]=\"resizable\"\n                            [scrollable]=\"true\"\n                            [columns]=\"nonLockedColumns\"\n                            [totalColumnLevels]=\"totalColumnLevels\"\n                            [sort]=\"sort\"\n                            [filter]=\"filter\"\n                            [filterable]=\"filterable\"\n                            [groupable]=\"showGroupPanel\"\n                            [groups]=\"isLocked ? [] : group\"\n                            [sortable]=\"sortable\"\n                            [lockedColumnsCount]=\"lockedLeafColumns.length\"\n                            (sortChange)=\"sortChange.emit($event)\"\n                            [detailTemplate]=\"detailTemplate\">\n                        </thead>\n                    </table>\n                </div>\n            </div>\n            <kendo-grid-list\n                [data]=\"view\"\n                [rowHeight]=\"rowHeight\"\n                [detailRowHeight]=\"detailRowHeight\"\n                [total]=\"isVirtual ? view.total : pageSize\"\n                [take]=\"pageSize\"\n                [groups]=\"group\"\n                [groupable]=\"groupable\"\n                [skip]=\"skip\"\n                [columns]=\"columnsContainer\"\n                [selectable]=\"selectable\"\n                [detailTemplate]=\"detailTemplate\"\n                [noRecordsTemplate]=\"noRecordsTemplate\"\n                (pageChange)=\"notifyPageChange('list', $event)\"\n                [rowClass]=\"rowClass\">\n            </kendo-grid-list>\n            <div\n                *ngIf=\"showFooter\"\n                class=\"k-grid-footer\"\n                [style.padding]=\"headerPadding\">\n                <div\n                    *ngIf=\"lockedLeafColumns.length\"\n                    class=\"k-grid-footer-locked\"\n                    [style.width.px]=\"lockedWidth\">\n                    <table [locked]=\"true\">\n                        <colgroup kendoGridColGroup\n                            [columns]=\"lockedLeafColumns\"\n                            [groups]=\"group\"\n                            [detailTemplate]=\"detailTemplate\">\n                        </colgroup>\n                        <tfoot kendoGridFooter\n                            [scrollable]=\"true\"\n                            [groups]=\"group\"\n                            [columns]=\"lockedLeafColumns\"\n                            [detailTemplate]=\"detailTemplate\">\n                        </tfoot>\n                    </table>\n                </div><div #footer\n                    class=\"k-grid-footer-wrap\"\n                    [kendoGridResizableContainer]=\"lockedLeafColumns.length\"\n                    [lockedWidth]=\"lockedWidth + scrollbarWidth + 3\">\n                    <table [style.width.px]=\"nonLockedWidth\">\n                        <colgroup kendoGridColGroup\n                            [columns]=\"nonLockedLeafColumns\"\n                            [groups]=\"isLocked ? [] : group\"\n                            [detailTemplate]=\"detailTemplate\">\n                        </colgroup>\n                        <tfoot kendoGridFooter\n                            [scrollable]=\"true\"\n                            [groups]=\"isLocked ? [] : group\"\n                            [columns]=\"nonLockedLeafColumns\"\n                            [lockedColumnsCount]=\"lockedLeafColumns.length\"\n                            [detailTemplate]=\"detailTemplate\">\n                        </tfoot>\n                    </table>\n                </div>\n            </div>\n        </ng-template>\n        <ng-template [ngIf]=\"!isScrollable\">\n            <table>\n                <colgroup kendoGridColGroup\n                    [columns]=\"leafColumns\"\n                    [groups]=\"group\"\n                    [detailTemplate]=\"detailTemplate\">\n                </colgroup>\n                <thead kendoGridHeader\n                    [resizable]=\"resizable\"\n                    [scrollable]=\"false\"\n                    [columns]=\"visibleColumns\"\n                    [totalColumnLevels]=\"totalColumnLevels\"\n                    [groups]=\"group\"\n                    [groupable]=\"showGroupPanel\"\n                    [sort]=\"sort\"\n                    [sortable]=\"sortable\"\n                    [filter]=\"filter\"\n                    [filterable]=\"filterable\"\n                    (sortChange)=\"sortChange.emit($event)\"\n                    [detailTemplate]=\"detailTemplate\">\n                </thead>\n                <tbody kendoGridTableBody\n                    [groups]=\"group\"\n                    [data]=\"view\"\n                    [skip]=\"skip\"\n                    [columns]=\"leafColumns\"\n                    [selectable]=\"selectable\"\n                    [noRecordsTemplate]=\"noRecordsTemplate\"\n                    [detailTemplate]=\"detailTemplate\"\n                    [rowClass]=\"rowClass\">\n                </tbody>\n                <tfoot kendoGridFooter\n                    *ngIf=\"showFooter\"\n                    [scrollable]=\"false\"\n                    [groups]=\"group\"\n                    [columns]=\"leafColumns\"\n                    [detailTemplate]=\"detailTemplate\">\n                </tfoot>\n            </table>\n        </ng-template>\n        <kendo-pager\n            *ngIf=\"showPager\"\n            [template]=\"pagerTemplate\"\n            [pageSize]=\"pageSize\"\n            [total]=\"view.total\"\n            [skip]=\"skip\"\n            [options]=\"pageable\"\n            (pageChange)=\"notifyPageChange('pager', $event)\">\n        </kendo-pager>\n        <kendo-grid-toolbar *ngIf=\"showBottomToolbar\"></kendo-grid-toolbar>\n    "
  }, ]
}, ];
/** @nocollapse */
GridComponent.ctorParameters = function () {
  return [{
      type: BrowserSupportService,
    },
    {
      type: SelectionService,
    },
    {
      type: ElementRef,
    },
    {
      type: GroupInfoService,
    },
    {
      type: GroupsService,
    },
    {
      type: ChangeNotificationService,
    },
    {
      type: DetailsService,
    },
    {
      type: EditService,
    },
    {
      type: FilterService,
    },
    {
      type: PDFService,
    },
    {
      type: ResponsiveService,
    },
    {
      type: Renderer2,
    },
    {
      type: ExcelService,
    },
    {
      type: NgZone,
    },
    {
      type: ScrollSyncService,
    },
    {
      type: DomEventsService,
    },
    {
      type: undefined,
      decorators: [{
        type: Optional
      }, {
        type: Inject,
        args: [RTL, ]
      }, ]
    },
    {
      type: ColumnResizingService,
    },
  ];
};
GridComponent.propDecorators = {
  'data': [{
    type: Input
  }, ],
  'pageSize': [{
    type: Input
  }, ],
  'height': [{
    type: Input
  }, ],
  'rowHeight': [{
    type: Input
  }, ],
  'detailRowHeight': [{
    type: Input
  }, ],
  'skip': [{
    type: Input
  }, ],
  'scrollable': [{
    type: Input
  }, ],
  'selectable': [{
    type: Input
  }, ],
  'sort': [{
    type: Input
  }, ],
  'filter': [{
    type: Input
  }, ],
  'group': [{
    type: Input
  }, ],
  'filterable': [{
    type: Input
  }, ],
  'sortable': [{
    type: Input
  }, ],
  'pageable': [{
    type: Input
  }, ],
  'groupable': [{
    type: Input
  }, ],
  'rowClass': [{
    type: Input
  }, ],
  'rowSelected': [{
    type: Input
  }, ],
  'resizable': [{
    type: Input
  }, ],
  'filterChange': [{
    type: Output
  }, ],
  'pageChange': [{
    type: Output
  }, ],
  'groupChange': [{
    type: Output
  }, ],
  'sortChange': [{
    type: Output
  }, ],
  'selectionChange': [{
    type: Output
  }, ],
  'dataStateChange': [{
    type: Output
  }, ],
  'groupExpand': [{
    type: Output
  }, ],
  'groupCollapse': [{
    type: Output
  }, ],
  'detailExpand': [{
    type: Output
  }, ],
  'detailCollapse': [{
    type: Output
  }, ],
  'edit': [{
    type: Output
  }, ],
  'cancel': [{
    type: Output
  }, ],
  'save': [{
    type: Output
  }, ],
  'remove': [{
    type: Output
  }, ],
  'add': [{
    type: Output
  }, ],
  'cellClose': [{
    type: Output
  }, ],
  'cellClick': [{
    type: Output
  }, ],
  'pdfExport': [{
    type: Output
  }, ],
  'excelExport': [{
    type: Output
  }, ],
  'columnResize': [{
    type: Output
  }, ],
  'columns': [{
    type: ContentChildren,
    args: [ColumnBase, ]
  }, ],
  'dir': [{
    type: HostBinding,
    args: ['attr.dir', ]
  }, ],
  'hostClasses': [{
    type: HostBinding,
    args: ['class.k-widget', ]
  }, {
    type: HostBinding,
    args: ['class.k-grid', ]
  }, ],
  'lockedClasses': [{
    type: HostBinding,
    args: ['class.k-grid-lockedcolumns', ]
  }, ],
  'virtualClasses': [{
    type: HostBinding,
    args: ['class.k-grid-virtual', ]
  }, ],
  'columnResizing': [{
    type: HostBinding,
    args: ['class.k-grid-column-resizing', ]
  }, ],
  'detailTemplate': [{
    type: ContentChild,
    args: [DetailTemplateDirective, ]
  }, ],
  'noRecordsTemplate': [{
    type: ContentChild,
    args: [NoRecordsTemplateDirective, ]
  }, ],
  'pagerTemplate': [{
    type: ContentChild,
    args: [PagerTemplateDirective, ]
  }, ],
  'toolbarTemplate': [{
    type: ContentChild,
    args: [ToolbarTemplateDirective, ]
  }, ],
  'lockedHeader': [{
    type: ViewChild,
    args: ["lockedHeader", ]
  }, ],
  'header': [{
    type: ViewChild,
    args: ["header", ]
  }, ],
  'footer': [{
    type: ViewChildren,
    args: ["footer", ]
  }, ],
};
