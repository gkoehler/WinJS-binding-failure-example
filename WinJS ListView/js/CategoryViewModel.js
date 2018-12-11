(function (WinJS) {
    "use strict";

    var viewModel = WinJS.Class.define(function () {
        this._initObservable();
        this._setupUIHandlers();
        this.init();
    }, {
            categories: null,
            message: null,

            init: function () {
                var flatCategories = new WinJS.Binding.List(
                    [...Array(500).keys()].map(i => {
                        return {
                            CategoryName: i,
                            ThumbnailURL: '/images/StoreLogo.png',
                            ParentCategoryName: 'Category 1',
                        }
                    })
                );

                this.categories = flatCategories.createGrouped(item => item.ParentCategoryName, item => item, (leftKey, rightKey) => leftKey.charCodeAt(0) - rightKey.charCodeAt(0));
            },
            _setupUIHandlers: function () {
                this.onItemInvoked = WinJS.UI.eventHandler(this._itemInvoked.bind(this));
            },
            _itemInvoked: function (args) {
                this.message = 'itemInvoked fired at ' + (new Date()).getTime();
            }
        });

    WinJS.Class.mix(
        viewModel,
        WinJS.Binding.mixin,
        WinJS.Binding.expandProperties({
            categories: null,
            message: null
        }));

    WinJS.Namespace.define('ViewModels', { CategoriesViewModel: viewModel });
})(WinJS);