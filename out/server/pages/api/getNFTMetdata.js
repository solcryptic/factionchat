"use strict";
(() => {
var exports = {};
exports.id = 423;
exports.ids = [423];
exports.modules = {

/***/ 5345:
/***/ ((module) => {

module.exports = import("moralis");;

/***/ }),

/***/ 6535:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
/* harmony import */ var moralis__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5345);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([moralis__WEBPACK_IMPORTED_MODULE_0__]);
moralis__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];

async function handler(req, res) {
    const { contractAddress , network  } = req.body;
    await moralis__WEBPACK_IMPORTED_MODULE_0__["default"].start({
        apiKey: process.env.MORALIS_API_KEY
    });
    try {
        const data = await moralis__WEBPACK_IMPORTED_MODULE_0__["default"].SolApi.nft.getNFTMetadata({
            network: network,
            address: contractAddress
        });
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json(error);
    }
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(6535));
module.exports = __webpack_exports__;

})();