"use strict";
(() => {
var exports = {};
exports.id = 185;
exports.ids = [185];
exports.modules = {

/***/ 5345:
/***/ ((module) => {

module.exports = import("moralis");;

/***/ }),

/***/ 8768:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
/* harmony import */ var moralis__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5345);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([moralis__WEBPACK_IMPORTED_MODULE_0__]);
moralis__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];
// import Moralis from 'moralis';
// export default async function handler(req, res) {
//   const { address, network } = req.body;
//   await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });
//   try {
//     const data = await Moralis.SolApi.nft.getNFTMetadata({
//       network,
//       address,
//     });
//     res.status(200).json(data);
//   } catch (error) {
//     res.status(400).json(error);
//   }
// }

async function handler(req, res) {
    const { address , network  } = req.body;
    await moralis__WEBPACK_IMPORTED_MODULE_0__["default"].start({
        apiKey: process.env.MORALIS_API_KEY
    });
    try {
        const data = await moralis__WEBPACK_IMPORTED_MODULE_0__["default"].SolApi.account.getNFTs({
            address: address,
            network: network
        });
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(400).json({
            error: error.message
        });
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
var __webpack_exports__ = (__webpack_exec__(8768));
module.exports = __webpack_exports__;

})();