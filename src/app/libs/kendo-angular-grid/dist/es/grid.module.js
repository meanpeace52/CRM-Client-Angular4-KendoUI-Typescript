import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridComponent } from './grid.component';
import { ListComponent } from './rendering/list.component';
import { CldrIntlService, IntlService } from '@progress/kendo-angular-intl';
import { DataBindingDirective } from './databinding.directive';
import { SelectionDirective } from './selection/selection.directive';
import { LocalizedMessagesDirective } from './localization/localized-messages.directive';
import { CustomMessagesComponent } from './localization/custom-messages.component';
import { RowFilterModule } from "./filtering/filtering.module";
import { PagerModule } from "./pager/pager.module";
import { GroupModule } from "./grouping/group.module";
import { HeaderModule } from "./rendering/header/header.module";
import { BodyModule } from "./rendering/body.module";
import { FooterModule } from "./rendering/footer/footer.module";
import { SharedModule } from './shared.module';
import { ToolbarTemplateDirective } from "./rendering/toolbar/toolbar-template.directive";
import { ToolbarComponent } from "./rendering/toolbar/toolbar.component";
import { ResizeSensorModule } from '@progress/kendo-angular-resize-sensor';
import { TemplateEditingDirective } from './editing-directives/template-editing.directive';
import { ReactiveEditingDirective } from './editing-directives/reactive-editing.directive';
import { InCellEditingDirective } from './editing-directives/in-cell-editing.directive';
import { GroupBindingDirective } from './grouping/group-scroll-binding.directive';
var exportedModules = [
    GridComponent,
    ToolbarTemplateDirective,
    ToolbarComponent,
    DataBindingDirective,
    SelectionDirective,
    CustomMessagesComponent,
    GroupBindingDirective,
    TemplateEditingDirective,
    ReactiveEditingDirective,
    InCellEditingDirective
].concat(GroupModule.exports(), SharedModule.exports(), BodyModule.exports(), HeaderModule.exports(), FooterModule.exports(), PagerModule.exports(), RowFilterModule.exports());
var declarations = [
    GridComponent,
    ListComponent,
    ToolbarComponent,
    LocalizedMessagesDirective,
    CustomMessagesComponent,
    DataBindingDirective,
    ToolbarTemplateDirective,
    SelectionDirective,
    TemplateEditingDirective,
    ReactiveEditingDirective,
    InCellEditingDirective,
    GroupBindingDirective
];
/**
 * Represents the [NgModule](https://angular.io/docs/ts/latest/guide/ngmodule.html)
 * definition for the Grid component.
 *
 * @example
 *
 * ```ts-no-run
 * // Import the Grid module
 * import { GridModule } from '@progress/kendo-angular-grid';
 *
 * // The browser platform with a compiler
 * import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
 *
 * import { NgModule } from '@angular/core';
 *
 * // Import the app component
 * import { AppComponent } from './app.component';
 *
 * // Define the app module
 * _@NgModule({
 *     declarations: [AppComponent], // declare app component
 *     imports:      [BrowserModule, GridModule], // import Grid module
 *     bootstrap:    [AppComponent]
 * })
 * export class AppModule {}
 *
 * // Compile and launch the module
 * platformBrowserDynamic().bootstrapModule(AppModule);
 *
 * ```
 */
var GridModule = (function () {
    function GridModule() {
    }
    return GridModule;
}());
export { GridModule };
GridModule.decorators = [
    { type: NgModule, args: [{
                declarations: [declarations],
                exports: [exportedModules],
                imports: [
                    CommonModule,
                    GroupModule,
                    SharedModule,
                    BodyModule,
                    HeaderModule,
                    FooterModule,
                    PagerModule,
                    RowFilterModule,
                    ResizeSensorModule
                ],
                providers: [
                    { provide: IntlService, useClass: CldrIntlService }
                ]
            },] },
];
/** @nocollapse */
GridModule.ctorParameters = function () { return []; };
