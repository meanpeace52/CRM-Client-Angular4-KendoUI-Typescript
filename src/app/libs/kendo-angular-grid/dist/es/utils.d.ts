import { QueryList, InjectionToken } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/merge';
/**
 * @hidden
 */
export declare const isPresent: (value: any) => boolean;
/**
 * @hidden
 */
export declare const isBlank: Function;
/**
 * @hidden
 */
export declare const isArray: Function;
/**
 * @hidden
 */
export declare const isTruthy: Function;
/**
 * @hidden
 */
export declare const isNullOrEmptyString: Function;
/**
 * @hidden
 */
export declare const isChanged: (propertyName: string, changes: any, skipFirstChange?: boolean) => boolean;
/**
 * @hidden
 */
export declare const anyChanged: (propertyNames: string[], changes: any, skipFirstChange?: boolean) => boolean;
/**
 * @hidden
 */
export declare const observe: <T>(list: QueryList<T>) => Observable<any>;
/**
 * @hidden
 */
export declare const isUniversal: () => boolean;
/**
 * @hidden
 */
export declare const extractFormat: (format: string) => string;
/**
 * @hidden
 */
export declare const not: (fn: (...x: any[]) => boolean) => (...args: any[]) => boolean;
/**
 * @hidden
 * Represents a condition&mdash;a unary function which takes an argument and returns a Boolean.
 */
export declare type Condition<T> = (x: T) => boolean;
/**
 * @hidden
 */
export declare const or: <T>(...conditions: Condition<T>[]) => (value: T) => boolean;
/**
 * @hidden
 */
export declare const and: <T>(...conditions: Condition<T>[]) => (value: T) => boolean;
/**
 * @hidden
 */
export declare const Skip: InjectionToken<{}>;
