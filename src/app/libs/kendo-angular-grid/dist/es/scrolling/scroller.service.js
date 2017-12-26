import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
/**
 * @hidden
 */
var ScrollAction = (function () {
    function ScrollAction(offset) {
        this.offset = offset;
    }
    return ScrollAction;
}());
export { ScrollAction };
/**
 * @hidden
 */
var PageAction = (function () {
    function PageAction(skip, take) {
        this.skip = skip;
        this.take = take;
    }
    return PageAction;
}());
export { PageAction };
/**
 * @hidden
 */
var ScrollerService = (function () {
    function ScrollerService(scrollObservable) {
        this.scrollObservable = scrollObservable;
        this.firstLoaded = 0;
    }
    ScrollerService.prototype.create = function (rowHeightService, skip, take, total) {
        var _this = this;
        this.rowHeightService = rowHeightService;
        this.firstLoaded = skip;
        this.lastLoaded = skip + take;
        this.take = take;
        this.total = total;
        this.lastScrollTop = 0;
        var subject = new BehaviorSubject(new ScrollAction(this.rowHeightService.offset(skip)));
        this.subscription = Observable.create(function (observer) {
            _this.unsubscribe();
            _this.scrollSubscription = _this.scrollObservable.subscribe(function (x) { return _this.onScroll(x, observer); });
        }).subscribe(function (x) { return subject.next(x); });
        return subject;
    };
    ScrollerService.prototype.destroy = function () {
        this.unsubscribe();
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    ScrollerService.prototype.onScroll = function (_a, observer) {
        var scrollTop = _a.scrollTop, offsetHeight = _a.offsetHeight;
        if (this.lastScrollTop === scrollTop) {
            return;
        }
        var up = this.lastScrollTop >= scrollTop;
        this.lastScrollTop = scrollTop;
        var firstItemIndex = this.rowHeightService.index(scrollTop);
        var firstItemOffset = this.rowHeightService.offset(firstItemIndex);
        var lastItemIndex = this.rowHeightService.index(scrollTop + offsetHeight);
        if (!up && lastItemIndex >= this.lastLoaded && this.lastLoaded < this.total) {
            this.firstLoaded = firstItemIndex;
            observer.next(new ScrollAction(firstItemOffset));
            var nextTake = this.firstLoaded + this.take;
            this.lastLoaded = Math.min(nextTake, this.total);
            nextTake = nextTake > this.total ? this.total - this.firstLoaded : this.take;
            observer.next(new PageAction(this.firstLoaded, nextTake));
        }
        if (up && firstItemIndex < this.firstLoaded) {
            var nonVisibleBuffer = Math.floor(this.take * 0.3);
            this.firstLoaded = Math.max(firstItemIndex - nonVisibleBuffer, 0);
            observer.next(new ScrollAction(this.rowHeightService.offset(this.firstLoaded)));
            this.lastLoaded = Math.min(this.firstLoaded + this.take, this.total);
            observer.next(new PageAction(this.firstLoaded, this.take));
        }
    };
    ScrollerService.prototype.unsubscribe = function () {
        if (this.scrollSubscription) {
            this.scrollSubscription.unsubscribe();
            this.scrollSubscription = undefined;
        }
    };
    return ScrollerService;
}());
export { ScrollerService };
