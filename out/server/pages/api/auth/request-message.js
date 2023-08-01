"use strict";
(() => {
var exports = {};
exports.id = 493;
exports.ids = [493];
exports.modules = {

/***/ 5345:
/***/ ((module) => {

module.exports = import("moralis");;

/***/ }),

/***/ 5273:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
/* harmony import */ var moralis__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5345);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([moralis__WEBPACK_IMPORTED_MODULE_0__]);
moralis__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];

const TIME = new Date();
const FUTURE = new Date(TIME.getFullYear(), TIME.getMonth(), TIME.getDate() + 7, TIME.getHours(), TIME.getMinutes(), TIME.getSeconds(), TIME.getMilliseconds());
const DOMAIN = process.env.APP_DOMAIN;
const STATEMENT = "Please sign this message to confirm your identity.";
const URI = process.env.NEXTAUTH_URL;
const EXPIRATION_TIME = FUTURE.toISOString();
const NOT_BEFORE = TIME.toISOString();
const TIMEOUT = 30;
async function handler(req, res) {
    const { address , chain , network  } = req.body;
    await moralis__WEBPACK_IMPORTED_MODULE_0__["default"].start({
        apiKey: process.env.MORALIS_API_KEY
    });
    try {
        if (!DOMAIN || !URI) {
            throw new Error("Please add APP_DOMAIN in the .env.local");
        }
        const message = await moralis__WEBPACK_IMPORTED_MODULE_0__["default"].Auth.requestMessage({
            address: address,
            solNetwork: chain,
            network: network,
            domain: DOMAIN,
            statement: STATEMENT,
            uri: URI,
            expirationTime: EXPIRATION_TIME,
            timeout: TIMEOUT,
            notBefore: NOT_BEFORE
        });
        res.status(200).json(message);
    } catch (error) {
        console.log(error);
        res.status(400).json({
            error
        });
    }
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(5273));
module.exports = __webpack_exports__;

})();