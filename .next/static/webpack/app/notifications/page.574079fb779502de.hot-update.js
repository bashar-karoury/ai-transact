"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/notifications/page",{

/***/ "(app-pages-browser)/./src/app/notifications/page.js":
/*!***************************************!*\
  !*** ./src/app/notifications/page.js ***!
  \***************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Notifications)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _notifications_module_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./notifications.module.css */ \"(app-pages-browser)/./src/app/notifications/notifications.module.css\");\n/* harmony import */ var _notifications_module_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_notifications_module_css__WEBPACK_IMPORTED_MODULE_2__);\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\nfunction Notifications() {\n    _s();\n    const [notifications] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([\n        {\n            id: 1,\n            message: 'Notification One: You have a new transaction \"\"',\n            date: 'Date'\n        },\n        {\n            id: 2,\n            message: 'Notification Two: You have a new transaction',\n            date: 'Date'\n        },\n        {\n            id: 3,\n            message: 'Notification Three: You have a new transaction',\n            date: 'Date'\n        }\n    ]);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: (_notifications_module_css__WEBPACK_IMPORTED_MODULE_2___default().notificationsContainer),\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                className: (_notifications_module_css__WEBPACK_IMPORTED_MODULE_2___default().title),\n                children: \"Notifications\"\n            }, void 0, false, {\n                fileName: \"/root/ai-transact/src/app/notifications/page.js\",\n                lineNumber: 26,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: (_notifications_module_css__WEBPACK_IMPORTED_MODULE_2___default().notificationsList),\n                children: notifications.map((notification)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: (_notifications_module_css__WEBPACK_IMPORTED_MODULE_2___default().notificationCard),\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            className: (_notifications_module_css__WEBPACK_IMPORTED_MODULE_2___default().notificationContent),\n                            children: [\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                    className: (_notifications_module_css__WEBPACK_IMPORTED_MODULE_2___default().message),\n                                    children: notification.message\n                                }, void 0, false, {\n                                    fileName: \"/root/ai-transact/src/app/notifications/page.js\",\n                                    lineNumber: 32,\n                                    columnNumber: 15\n                                }, this),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                                    className: (_notifications_module_css__WEBPACK_IMPORTED_MODULE_2___default().date),\n                                    children: notification.date\n                                }, void 0, false, {\n                                    fileName: \"/root/ai-transact/src/app/notifications/page.js\",\n                                    lineNumber: 33,\n                                    columnNumber: 15\n                                }, this)\n                            ]\n                        }, void 0, true, {\n                            fileName: \"/root/ai-transact/src/app/notifications/page.js\",\n                            lineNumber: 31,\n                            columnNumber: 13\n                        }, this)\n                    }, notification.id, false, {\n                        fileName: \"/root/ai-transact/src/app/notifications/page.js\",\n                        lineNumber: 30,\n                        columnNumber: 11\n                    }, this))\n            }, void 0, false, {\n                fileName: \"/root/ai-transact/src/app/notifications/page.js\",\n                lineNumber: 28,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/root/ai-transact/src/app/notifications/page.js\",\n        lineNumber: 25,\n        columnNumber: 5\n    }, this);\n}\n_s(Notifications, \"WNMrtY7xUyKBlrzw6gn1uBF8d50=\");\n_c = Notifications;\nvar _c;\n$RefreshReg$(_c, \"Notifications\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9hcHAvbm90aWZpY2F0aW9ucy9wYWdlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQ2lDO0FBQ2U7QUFFakMsU0FBU0U7O0lBQ3RCLE1BQU0sQ0FBQ0MsY0FBYyxHQUFHSCwrQ0FBUUEsQ0FBQztRQUMvQjtZQUNFSSxJQUFJO1lBQ0pDLFNBQVM7WUFDVEMsTUFBTTtRQUNSO1FBQ0E7WUFDRUYsSUFBSTtZQUNKQyxTQUFTO1lBQ1RDLE1BQU07UUFDUjtRQUNBO1lBQ0VGLElBQUk7WUFDSkMsU0FBUztZQUNUQyxNQUFNO1FBQ1I7S0FDRDtJQUVELHFCQUNFLDhEQUFDQztRQUFJQyxXQUFXUCx5RkFBNkI7OzBCQUMzQyw4REFBQ1M7Z0JBQUdGLFdBQVdQLHdFQUFZOzBCQUFFOzs7Ozs7MEJBRTdCLDhEQUFDTTtnQkFBSUMsV0FBV1Asb0ZBQXdCOzBCQUNyQ0UsY0FBY1UsR0FBRyxDQUFDLENBQUNDLDZCQUNsQiw4REFBQ1A7d0JBQTBCQyxXQUFXUCxtRkFBdUI7a0NBQzNELDRFQUFDTTs0QkFBSUMsV0FBV1Asc0ZBQTBCOzs4Q0FDeEMsOERBQUNnQjtvQ0FBRVQsV0FBV1AsMEVBQWM7OENBQUdhLGFBQWFULE9BQU87Ozs7Ozs4Q0FDbkQsOERBQUNhO29DQUFLVixXQUFXUCx1RUFBVzs4Q0FBR2EsYUFBYVIsSUFBSTs7Ozs7Ozs7Ozs7O3VCQUgxQ1EsYUFBYVYsRUFBRTs7Ozs7Ozs7Ozs7Ozs7OztBQVVuQztHQW5Dd0JGO0tBQUFBIiwic291cmNlcyI6WyIvcm9vdC9haS10cmFuc2FjdC9zcmMvYXBwL25vdGlmaWNhdGlvbnMvcGFnZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIGNsaWVudCdcbmltcG9ydCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHN0eWxlcyBmcm9tICcuL25vdGlmaWNhdGlvbnMubW9kdWxlLmNzcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIE5vdGlmaWNhdGlvbnMoKSB7XG4gIGNvbnN0IFtub3RpZmljYXRpb25zXSA9IHVzZVN0YXRlKFtcbiAgICB7XG4gICAgICBpZDogMSxcbiAgICAgIG1lc3NhZ2U6ICdOb3RpZmljYXRpb24gT25lOiBZb3UgaGF2ZSBhIG5ldyB0cmFuc2FjdGlvbiBcIlwiJyxcbiAgICAgIGRhdGU6ICdEYXRlJ1xuICAgIH0sXG4gICAge1xuICAgICAgaWQ6IDIsXG4gICAgICBtZXNzYWdlOiAnTm90aWZpY2F0aW9uIFR3bzogWW91IGhhdmUgYSBuZXcgdHJhbnNhY3Rpb24nLFxuICAgICAgZGF0ZTogJ0RhdGUnXG4gICAgfSxcbiAgICB7XG4gICAgICBpZDogMyxcbiAgICAgIG1lc3NhZ2U6ICdOb3RpZmljYXRpb24gVGhyZWU6IFlvdSBoYXZlIGEgbmV3IHRyYW5zYWN0aW9uJyxcbiAgICAgIGRhdGU6ICdEYXRlJ1xuICAgIH1cbiAgXSk7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLm5vdGlmaWNhdGlvbnNDb250YWluZXJ9PlxuICAgICAgPGgxIGNsYXNzTmFtZT17c3R5bGVzLnRpdGxlfT5Ob3RpZmljYXRpb25zPC9oMT5cbiAgICAgIFxuICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5ub3RpZmljYXRpb25zTGlzdH0+XG4gICAgICAgIHtub3RpZmljYXRpb25zLm1hcCgobm90aWZpY2F0aW9uKSA9PiAoXG4gICAgICAgICAgPGRpdiBrZXk9e25vdGlmaWNhdGlvbi5pZH0gY2xhc3NOYW1lPXtzdHlsZXMubm90aWZpY2F0aW9uQ2FyZH0+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLm5vdGlmaWNhdGlvbkNvbnRlbnR9PlxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9e3N0eWxlcy5tZXNzYWdlfT57bm90aWZpY2F0aW9uLm1lc3NhZ2V9PC9wPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e3N0eWxlcy5kYXRlfT57bm90aWZpY2F0aW9uLmRhdGV9PC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICkpfVxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59XG4iXSwibmFtZXMiOlsidXNlU3RhdGUiLCJzdHlsZXMiLCJOb3RpZmljYXRpb25zIiwibm90aWZpY2F0aW9ucyIsImlkIiwibWVzc2FnZSIsImRhdGUiLCJkaXYiLCJjbGFzc05hbWUiLCJub3RpZmljYXRpb25zQ29udGFpbmVyIiwiaDEiLCJ0aXRsZSIsIm5vdGlmaWNhdGlvbnNMaXN0IiwibWFwIiwibm90aWZpY2F0aW9uIiwibm90aWZpY2F0aW9uQ2FyZCIsIm5vdGlmaWNhdGlvbkNvbnRlbnQiLCJwIiwic3BhbiJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/app/notifications/page.js\n"));

/***/ })

});