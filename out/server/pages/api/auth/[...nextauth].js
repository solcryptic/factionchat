"use strict";
(() => {
var exports = {};
exports.id = 748;
exports.ids = [748];
exports.modules = {

/***/ 3227:
/***/ ((module) => {

module.exports = require("next-auth");

/***/ }),

/***/ 7449:
/***/ ((module) => {

module.exports = require("next-auth/providers/credentials");

/***/ }),

/***/ 5345:
/***/ ((module) => {

module.exports = import("moralis");;

/***/ }),

/***/ 3696:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7449);
/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3227);
/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var moralis__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5345);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([moralis__WEBPACK_IMPORTED_MODULE_2__]);
moralis__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (next_auth__WEBPACK_IMPORTED_MODULE_1___default()({
    providers: [
        next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_0___default()({
            name: "MoralisAuth",
            credentials: {
                message: {
                    label: "Message",
                    type: "text",
                    placeholder: "0x0"
                },
                signature: {
                    label: "Signature",
                    type: "text",
                    placeholder: "0x0"
                }
            },
            async authorize (credentials) {
                try {
                    const { message , signature  } = credentials;
                    await moralis__WEBPACK_IMPORTED_MODULE_2__["default"].start({
                        apiKey: process.env.MORALIS_API_KEY
                    });
                    const { address , network , profileId , expirationTime  } = (await moralis__WEBPACK_IMPORTED_MODULE_2__["default"].Auth.verify({
                        message,
                        signature,
                        network: "solana"
                    })).raw;
                    const user = {
                        address,
                        network,
                        profileId,
                        expirationTime
                    };
                    return user;
                } catch (e) {
                    console.error(e);
                    return null;
                }
            }
        }), 
    ],
    callbacks: {
        async jwt ({ token , user  }) {
            user && (token.user = user);
            return token;
        },
        async session ({ session , token  }) {
            session.expires = token.user.expirationTime;
            session.user = token.user;
            return session;
        }
    },
    session: {
        strategy: "jwt"
    },
    pages: {
        signIn: "/signin"
    }
}));

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(3696));
module.exports = __webpack_exports__;

})();