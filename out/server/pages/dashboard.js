"use strict";
(() => {
var exports = {};
exports.id = 26;
exports.ids = [26];
exports.modules = {

/***/ 2511:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var gun__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(940);
/* harmony import */ var gun__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(gun__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1649);
/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_auth_react__WEBPACK_IMPORTED_MODULE_3__);




const gun = gun__WEBPACK_IMPORTED_MODULE_2___default()({
    peers: [
        "https://peer.wallie.io/gun"
    ]
});
const Addfriend = ({ username  })=>{
    const { 0: friendSearch , 1: setFriendSearch  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const { data: session , status  } = (0,next_auth_react__WEBPACK_IMPORTED_MODULE_3__.useSession)();
    const { 0: friendList , 1: setFriendList  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const { 0: error , 1: setError  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null); // Add an error state
    const handleFriendSearchButton = (event)=>{
        event.preventDefault();
        if (friendSearch === session?.user.address) {
            setError("Cannot Add Yourself!"); // Set the error message
            setFriendSearch("");
        } else {
            let friendAlreadyExist = false;
            gun.get(session?.user.address + "friends").on((data)=>{
                for(const prop in data){
                    //   console.log(prop);
                    if (friendSearch === prop) {
                        // console.log(prop);
                        friendAlreadyExist = true;
                        break;
                    } else {
                        friendAlreadyExist = false;
                    }
                }
            });
            if (friendAlreadyExist) {
                setError("Friend Already Exists!"); // Set the error message
            } else {
                gun.get("allusers").once((data)=>{
                    let userExists = false;
                    for(const prop in data){
                        // console.log(prop);
                        if (friendSearch === prop) {
                            let friendObject = {};
                            let friendObjectForYourFriend = {};
                            let messageDBNameObject = {};
                            let messageDBNameObjectForYourFriend = {};
                            friendObject[friendSearch] = data[prop];
                            messageDBNameObject[friendSearch + "dbname"] = session?.user.address + friendSearch;
                            gun.get("currentUsername").once((data)=>{
                                for(const prop in data.username){
                                    const currentUserName = data.username;
                                    friendObjectForYourFriend[session?.user.address] = currentUserName;
                                //   console.log(friendObjectForYourFriend)
                                }
                            });
                            messageDBNameObjectForYourFriend[session?.user.address + "dbname"] = session?.user.address + friendSearch;
                            gun.get(session?.user.address + "friends").put(friendObject);
                            gun.get(friendSearch + "friends").put(friendObjectForYourFriend);
                            gun.get(session?.user.address + "messagesdbnames").put(messageDBNameObject);
                            gun.get(friendSearch + "messagesdbnames").put(messageDBNameObjectForYourFriend);
                            // gun.get(md5(address + friendSearch)).put({ null: { address: null, message: null, time: null } })
                            userExists = true;
                            setFriendSearch("");
                            setError(null); // Clear the error state
                            break;
                        } else {
                            // console.log('i was here')
                            userExists = false;
                        }
                    }
                    if (!userExists) {
                        setError("User Doesn't Exist!"); // Set the error message
                        setFriendSearch("");
                    } else {
                        setError("Friend Added Successfully!!"); // Set the success message
                        setFriendSearch("");
                    }
                });
            }
        }
    };
    gun.get(session?.user.address + "friends").once((data)=>{
        let userExists = false;
        for(const prop in data){
        //   console.log(prop);
        }
    });
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        // This code will be executed only on the client
        // and not during server-side rendering
        const closePopup = (event)=>{
            if (event.target.classList.contains("popup-overlay")) {
                setError(null); // Clear the error state when clicked anywhere else on the screen
            }
        };
        document.addEventListener("click", closePopup);
        return ()=>{
            document.removeEventListener("click", closePopup);
        };
    }, []);
    //   console.log(username)
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("form", {
        className: "flex items-center",
        onSubmit: handleFriendSearchButton,
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                className: "sr-only"
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "relative w-full",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: "absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none",
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("svg", {
                            "aria-hidden": "true",
                            className: "w-5 h-5 text-gray-500 dark:text-gray-400",
                            fill: "currentColor",
                            viewBox: "0 0 20 20",
                            xmlns: "http://www.w3.org/2000/svg",
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                                fillRule: "evenodd",
                                d: "M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z",
                                clipRule: "evenodd"
                            })
                        })
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                        className: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
                        placeholder: "add friends... [wallet address]",
                        name: "name",
                        value: friendSearch,
                        onChange: (e)=>{
                            setFriendSearch(e.target.value);
                        }
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                className: "p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",
                type: "submit",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("svg", {
                        className: "w-5 h-5",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24",
                        xmlns: "http://www.w3.org/2000/svg",
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: "2",
                            d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        })
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                        className: "sr-only",
                        children: "Search"
                    })
                ]
            }),
            error && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: "fixed inset-0 flex items-center justify-center popup-overlay backdrop-filter backdrop-blur-sm",
                onClick: ()=>setError(null),
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "bg-gray-700 p-4 rounded-lg",
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                            className: "text-white",
                            children: error
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                            className: "mt-4 px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300",
                            onClick: ()=>setError(null),
                            children: "Close"
                        })
                    ]
                })
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Addfriend);


/***/ }),

/***/ 8470:
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {

/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var gun__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(940);
/* harmony import */ var gun__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(gun__WEBPACK_IMPORTED_MODULE_2__);



function AnotherComponent() {
    const { 0: allUsers , 1: setAllUsers  } = useState(null);
    useEffect(()=>{
        const gun = Gun({
            peers: [
                "https://peer.wallie.io/gun"
            ]
        });
        gun.get("allusers").on((data)=>{
            setAllUsers(JSON.stringify(data));
        });
    }, []);
    return /*#__PURE__*/ _jsx("div", {
        children: /*#__PURE__*/ _jsx("p", {
            children: allUsers
        })
    });
}
/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = ((/* unused pure expression or super */ null && (AnotherComponent)));


/***/ }),

/***/ 2967:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ components_Chat)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: external "gun"
var external_gun_ = __webpack_require__(940);
var external_gun_default = /*#__PURE__*/__webpack_require__.n(external_gun_);
// EXTERNAL MODULE: external "next-auth/react"
var react_ = __webpack_require__(1649);
;// CONCATENATED MODULE: external "emoji-picker-react"
const external_emoji_picker_react_namespaceObject = require("emoji-picker-react");
var external_emoji_picker_react_default = /*#__PURE__*/__webpack_require__.n(external_emoji_picker_react_namespaceObject);
;// CONCATENATED MODULE: ./app/components/Chat.js





const gun = external_gun_default()({
    peers: [
        "https://peer.wallie.io/gun"
    ]
});
function Chat({ userAddress , friend  }) {
    const { data: session , status  } = (0,react_.useSession)();
    const { 0: messages , 1: setMessages  } = (0,external_react_.useState)([]);
    const { 0: message , 1: setMessage  } = (0,external_react_.useState)("");
    const { 0: friendAddress , 1: setFriendAddress  } = (0,external_react_.useState)("");
    const { 0: friendName , 1: setFriendName  } = (0,external_react_.useState)("");
    const { 0: friendProfilePicture , 1: setFriendProfilePicture  } = (0,external_react_.useState)("");
    const { 0: showEmojiPicker , 1: setShowEmojiPicker  } = (0,external_react_.useState)(false);
    const isUserMessage = (from)=>from === session?.user.address;
    const chatId = [
        session?.user.address,
        friendAddress
    ].sort().join("-");
    const messagesEndRef = (0,external_react_.useRef)(null);
    const chatContainerRef = (0,external_react_.useRef)(null);
    (0,external_react_.useEffect)(()=>{
        if (friend && friend.address) {
            setFriendAddress(friend.address);
            setFriendName(friend.name);
        }
    }, [
        friend
    ]);
    (0,external_react_.useEffect)(()=>{
        if (!friendAddress) return;
        const friendProfilePictureUrl = gun.get(friendAddress).get("pfp");
        friendProfilePictureUrl.on((data)=>{
            setFriendProfilePicture(data);
        // console.log(data);
        });
        return ()=>{
            setFriendProfilePicture("");
        };
    }, [
        friendAddress
    ]);
    (0,external_react_.useEffect)(()=>{
        if (!friendAddress) return;
        const chatId = [
            session?.user.address,
            friendAddress
        ].sort().join("-");
        const chat = gun.get(chatId).map();
        const onMessage = (message, id)=>{
            setMessages((prevMessages)=>{
                const messageExists = prevMessages.some((prevMessage)=>prevMessage.id === id);
                if (!messageExists) {
                    const newMessages = [
                        ...prevMessages,
                        {
                            id,
                            ...message
                        }
                    ];
                    return newMessages.sort((a, b)=>new Date(a.timestamp) - new Date(b.timestamp));
                }
                return prevMessages;
            });
        };
        chat.on(onMessage);
        return ()=>{
            chat.off(onMessage);
            setMessages([]);
        };
    }, [
        session?.user.address,
        friendAddress
    ]);
    (0,external_react_.useEffect)(()=>{
        const handleClickOutsideDropdown = (event)=>{
            if (chatContainerRef.current && !chatContainerRef.current.contains(event.target) && event.target.getAttribute("aria-label") !== "emoji-picker-button") {
                setShowEmojiPicker(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutsideDropdown);
        return ()=>{
            document.removeEventListener("mousedown", handleClickOutsideDropdown);
        };
    }, []);
    (0,external_react_.useEffect)(()=>{
        scrollToBottom();
    }, [
        messages
    ]);
    const scrollToBottom = ()=>{
        messagesEndRef.current.scrollIntoView({
            behavior: "smooth"
        });
    };
    const sendMessage = (e)=>{
        e.preventDefault();
        if (message.trim() === "") return;
        const newMessage = {
            content: message,
            timestamp: new Date().toISOString(),
            from: session?.user.address
        };
        gun.get(chatId).set(newMessage);
        setMessage("");
    };
    const handleEmojiClick = (emoji)=>{
        setMessage(message + emoji.emoji);
    };
    const toggleEmojiPicker = ()=>{
        setShowEmojiPicker(!showEmojiPicker);
    };
    return /*#__PURE__*/ jsx_runtime_.jsx("div", {
        className: "bg-gray-900 min-h-screen h-screen text-white",
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
            className: "container mx-auto py-4 flex flex-col h-full",
            children: [
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    className: "flex items-center px-12 -mt-2 ",
                    children: [
                        friendProfilePicture && /*#__PURE__*/ jsx_runtime_.jsx("img", {
                            src: friendProfilePicture,
                            alt: "Profile",
                            className: "w-12 h-12 rounded-full"
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("h1", {
                            className: "px-4 text-3xl font-extrabold ",
                            children: friendName
                        })
                    ]
                }),
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("ul", {
                    className: "mx-2 text-lg flex-1 overflow-y-auto no-scrollbar",
                    children: [
                        messages.map((message, index)=>/*#__PURE__*/ jsx_runtime_.jsx("li", {
                                className: "mb-4",
                                children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                    className: `flex ${isUserMessage(message.from) ? "justify-end" : "justify-start"}`,
                                    children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                        className: `rounded shadow ${isUserMessage(message.from) ? "bg-blue-500 rounded-br-none ml-4" : "bg-black rounded-bl-none mr-4"}`,
                                        children: /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                            className: "p-2 break-all",
                                            children: message.content
                                        })
                                    })
                                })
                            }, index)),
                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                            ref: messagesEndRef
                        })
                    ]
                }),
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("form", {
                    onSubmit: sendMessage,
                    className: "flex items-center px-3 py-2 -my-2 rounded-lg bg-gray-50 dark:bg-gray-700",
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                            className: "flex-1",
                            children: /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                type: "text",
                                placeholder: "Type your message...",
                                value: message,
                                onChange: (e)=>setMessage(e.target.value),
                                className: "w-full outline-none text-white bg-transparent placeholder-gray-500 pr-5"
                            })
                        }),
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                            className: "flex items-center",
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                    type: "button",
                                    className: "p-2 ml-2 text-2xl text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600",
                                    onClick: toggleEmojiPicker,
                                    "aria-label": "emoji-picker-button",
                                    children: "\uD83D\uDE00"
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                    type: "submit",
                                    className: `ml-2 inline-flex justify-center p-2 text-white rounded-lg cursor-pointer hover:text-gray-900 dark:hover:text-white ${message.trim() !== "" ? "bg-blue-600" : "text-gray-500"}`,
                                    children: "Send"
                                })
                            ]
                        })
                    ]
                }),
                showEmojiPicker && /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    className: "absolute bottom-14 right-4",
                    ref: chatContainerRef,
                    children: /*#__PURE__*/ jsx_runtime_.jsx((external_emoji_picker_react_default()), {
                        onEmojiClick: handleEmojiClick
                    })
                })
            ]
        })
    });
}
/* harmony default export */ const components_Chat = (Chat);


/***/ }),

/***/ 5277:
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {

/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1649);
/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_auth_react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var gun__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(940);
/* harmony import */ var gun__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(gun__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _Addfriend__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2511);





function EnterUsername() {
    const { data: session , status  } = useSession();
    const { 0: username , 1: setUsername  } = useState("");
    const { 0: currentUsername , 1: setCurrentUsername  } = useState("");
    const gun = Gun({
        peers: [
            "https://peer.wallie.io/gun"
        ]
    });
    useEffect(()=>{
        gun.get(session?.user.address).get("username").on((data)=>{
            setCurrentUsername(data);
        });
    }, [
        session
    ]);
    function handleSubmit(event) {
        event.preventDefault();
        const user = gun.get(session?.user.address);
        user.put({
            username: username
        });
    }
    function handleChange(event) {
        setUsername(event.target.value);
    }
    return /*#__PURE__*/ _jsxs("form", {
        onSubmit: handleSubmit,
        children: [
            /*#__PURE__*/ _jsxs("label", {
                children: [
                    "New Username",
                    /*#__PURE__*/ _jsx("input", {
                        type: "text",
                        value: username,
                        onChange: handleChange
                    })
                ]
            }),
            /*#__PURE__*/ _jsx("button", {
                className: "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1.5 mr-2 mb-1 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800",
                type: "submit",
                children: "Submit"
            }),
            /*#__PURE__*/ _jsxs("p", {
                children: [
                    "Current Username: ",
                    currentUsername
                ]
            }),
            /*#__PURE__*/ _jsxs("p", {
                children: [
                    " Wallet address: ",
                    session?.user.address,
                    " "
                ]
            })
        ]
    });
}
/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = ((/* unused pure expression or super */ null && (EnterUsername)));


/***/ }),

/***/ 9463:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var gun__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(940);
/* harmony import */ var gun__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(gun__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1649);
/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_auth_react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _Chat__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2967);
/* harmony import */ var _Addfriend__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(2511);
/* harmony import */ var _Settings__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(4827);
/* harmony import */ var _solana_wallet_adapter_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(1247);
/* harmony import */ var _logoutBtn_logoutBtn__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(9569);
/* harmony import */ var _EnterUsername__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(5277);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_Settings__WEBPACK_IMPORTED_MODULE_6__, _solana_wallet_adapter_react__WEBPACK_IMPORTED_MODULE_7__]);
([_Settings__WEBPACK_IMPORTED_MODULE_6__, _solana_wallet_adapter_react__WEBPACK_IMPORTED_MODULE_7__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);










const gun = gun__WEBPACK_IMPORTED_MODULE_2___default()({
    peers: [
        "https://peer.wallie.io/gun"
    ]
});
function FriendList() {
    const { data: session , status  } = (0,next_auth_react__WEBPACK_IMPORTED_MODULE_3__.useSession)();
    const { 0: username , 1: setUsername  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const { 0: profilePicture , 1: setProfilePicture  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const { 0: friends , 1: setFriends  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const { 0: selectedFriend , 1: setSelectedFriend  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
        name: "",
        address: ""
    });
    const { 0: showSettings , 1: setShowSettings  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { 0: showDropdown , 1: setShowDropdown  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { 0: friendProfilePicture , 1: setFriendProfilePicture  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const dropdownRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const friendList = gun.get(session?.user.address + "friends");
        friendList.map().on((data, key)=>{
            const address = key;
            const name = data;
            setFriends((prevFriends)=>{
                const friendIndex = prevFriends.findIndex((f)=>f.address === address);
                if (friendIndex !== -1) {
                    // Update the existing friend's name
                    const updatedFriend = {
                        ...prevFriends[friendIndex],
                        name
                    };
                    const updatedFriends = [
                        ...prevFriends
                    ];
                    updatedFriends[friendIndex] = updatedFriend;
                    return updatedFriends;
                } else {
                    // Add a new friend
                    const friend = {
                        address,
                        name
                    };
                    return [
                        ...prevFriends,
                        friend
                    ];
                }
            });
            // Fetch the profile picture for each friend
            const friendProfilePictureUrl = gun.get(address).get("pfp");
            friendProfilePictureUrl.on((data)=>{
                setFriends((prevFriends)=>{
                    const friendIndex = prevFriends.findIndex((f)=>f.address === address);
                    if (friendIndex !== -1) {
                        const updatedFriend = {
                            ...prevFriends[friendIndex],
                            profilePicture: data
                        };
                        const updatedFriends = [
                            ...prevFriends
                        ];
                        updatedFriends[friendIndex] = updatedFriend;
                        return updatedFriends;
                    }
                    return prevFriends;
                });
            });
        });
        // Unsubscribe from friend list updates when the component unmounts
        return ()=>{
            friendList.off();
        };
    }, [
        session
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        // Listen for changes in the friend's name continuously
        const friend = gun.get(selectedFriend.address);
        friend.get("username").on((name)=>{
            setFriends((prevFriends)=>{
                const friendIndex = prevFriends.findIndex((f)=>f.address === selectedFriend.address);
                if (friendIndex !== -1) {
                    // Update the existing friend's name
                    const updatedFriend = {
                        ...prevFriends[friendIndex],
                        name
                    };
                    const updatedFriends = [
                        ...prevFriends
                    ];
                    updatedFriends[friendIndex] = updatedFriend;
                    return updatedFriends;
                }
                return prevFriends;
            });
        });
        // Unsubscribe from the friend's name updates when the component unmounts
        return ()=>{
            friend.get("username").off();
        };
    }, [
        selectedFriend
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        // Fetch the profile picture data from Gun.js
        gun.get(session?.user.address).get("pfp").on((data)=>{
            setProfilePicture(data);
        });
        if (session?.user?.address) {
            gun.get(session.user.address).get("username").on((data)=>{
                setUsername(data);
            });
        }
    }, [
        session
    ]);
    const handleFriendClick = (e)=>{
        const name = e.currentTarget.getAttribute("name");
        const address = e.currentTarget.getAttribute("address");
        setSelectedFriend({
            name,
            address
        });
    };
    const toggleDropdown = ()=>{
        setShowDropdown((prevState)=>!prevState);
    };
    const handleSettingsClose = ()=>{
        setShowSettings(false);
    };
    const handleClickOutsideDropdown = (e)=>{
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            setShowDropdown(false);
        }
    };
    const toggleSettings = ()=>{
        setShowSettings(!showSettings);
    };
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        document.addEventListener("click", handleClickOutsideDropdown, true);
        return ()=>{
            document.removeEventListener("click", handleClickOutsideDropdown, true);
        };
    }, []);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "flex flex-row",
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: "sidebar w-1/4 bg-gray-200 h-screen text-center dark:text-white dark:bg-gray-800",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "flex flex-col h-full justify-between",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    className: "py-2 ",
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_Addfriend__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {})
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h1", {
                                    className: "p-4 font-bold text-lg font-extrabold",
                                    children: "My Friends"
                                }),
                                friends.map((friend)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        name: friend.name,
                                        address: friend.address,
                                        onClick: handleFriendClick,
                                        className: "p-4 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700 cursor-pointer text-center hover:rounded-lg ",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "flex items-center justify-center mb-2",
                                                children: [
                                                    friend.profilePicture ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                                        className: "w-8 h-8 rounded-full mr-2",
                                                        src: friend.profilePicture,
                                                        alt: "friend photo"
                                                    }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                        className: "w-8 h-8 bg-gray-300 rounded-full mr-2"
                                                    }),
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                        className: "font-semibold",
                                                        children: friend.name
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                className: "text-gray-600",
                                                children: `${friend.address.substring(0, 4)}...${friend.address.slice(-4)}`
                                            })
                                        ]
                                    }, friend.address))
                            ]
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            className: "flex flex-row justify-center items-center p-2 py-4",
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "relative",
                                ref: dropdownRef,
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                        id: "dropdownAvatarNameButton",
                                        "data-dropdown-toggle": "dropdownAvatarName",
                                        className: "flex items-center text-sm font-medium text-gray-900 rounded-full hover:text-blue-600 dark:hover:text-blue-500 md:mr-0 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-white",
                                        type: "button",
                                        onClick: toggleDropdown,
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                className: "sr-only",
                                                children: "Open user menu"
                                            }),
                                            profilePicture ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                                className: "w-8 h-8 mr-2 rounded-full",
                                                src: profilePicture,
                                                alt: "user photo"
                                            }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                className: "w-8 h-8 bg-gray-300 rounded-full mr-2"
                                            }),
                                            username,
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("svg", {
                                                className: "w-4 h-4 ml-2",
                                                "aria-hidden": "true",
                                                fill: "currentColor",
                                                viewBox: "0 0 20 20",
                                                xmlns: "http://www.w3.org/2000/svg",
                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                                                    fillRule: "evenodd",
                                                    d: "M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z",
                                                    clipRule: "evenodd"
                                                })
                                            })
                                        ]
                                    }),
                                    showDropdown && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        id: "dropdownAvatarName",
                                        className: "z-10 bg-white divide-y divide-gray-100 rounded-lg shadow text-center absolute px-2 bottom-full mt-2 bottom-11 left-1/2 transform -translate-x-1/2 dark:bg-gray-700 dark:divide-gray-600 w-44",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "px-4 py-3 text-sm text-gray-900 dark:text-white",
                                                children: [
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                        className: "font-medium",
                                                        children: username
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                        className: "truncate",
                                                        children: [
                                                            " ",
                                                            `${session?.user.address.substring(0, 4)}...${session?.user.address.slice(-4)}`,
                                                            " "
                                                        ]
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("ul", {
                                                className: "py-2 text-sm text-gray-700 dark:text-gray-200",
                                                "aria-labelledby": "dropdownAvatarNameButton",
                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                                        href: "#",
                                                        onClick: toggleSettings,
                                                        className: "inline-flex p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group",
                                                        className: "block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white",
                                                        children: "Settings"
                                                    })
                                                })
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                className: "py-2",
                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_logoutBtn_logoutBtn__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .Z, {
                                                    href: "#",
                                                    className: "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white",
                                                    children: "Sign out"
                                                })
                                            })
                                        ]
                                    })
                                ]
                            })
                        })
                    ]
                })
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: "w-3/4",
                children: !selectedFriend.address ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: "flex items-center justify-center h-full bg-gray-900 text-white",
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                        children: "Select a chat to talk"
                    })
                }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react__WEBPACK_IMPORTED_MODULE_1__.Suspense, {
                    fallback: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        children: "Loading..."
                    }),
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_Chat__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
                        userAddress: session?.user.address,
                        friend: selectedFriend
                    })
                })
            }),
            showSettings && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_Settings__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {
                onClose: handleSettingsClose
            })
        ]
    });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FriendList);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 8830:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _AnotherComponent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8470);
/* harmony import */ var _FriendList__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9463);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_FriendList__WEBPACK_IMPORTED_MODULE_3__]);
_FriendList__WEBPACK_IMPORTED_MODULE_3__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];




function Layout() {
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_FriendList__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {})
    });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Layout);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 7226:
/***/ ((module, __unused_webpack___webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9648);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([axios__WEBPACK_IMPORTED_MODULE_2__]);
axios__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];



const Indexxx = ({ nftMintValues  })=>{
    const { 0: nfts , 1: setNFTs  } = useState([]);
    const { 0: loading , 1: setLoading  } = useState(false);
    const { 0: error , 1: setError  } = useState(null);
    const network = "mainnet";
    const address = nftMintValues;
    useEffect(()=>{
        if (address) {
            fetchNFTs();
        }
    }, [
        address
    ]);
    const fetchNFTs = async ()=>{
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post("/api/getNFTMetdata", {
                address,
                network
            });
            if (response.status !== 200) {
                throw new Error("Failed to fetch NFTs");
            }
            const data = response.data;
            console.log("Data:", data); // Log the response to inspect the data structure
            if (typeof data !== "object" || Array.isArray(data)) {
                throw new Error("Invalid data format: response data is not an object");
            }
            const processedNFTs = [];
            for(const key in data){
                if (data.hasOwnProperty(key)) {
                    const nft = data[key];
                    const { metadataUri , ...rest } = nft;
                    try {
                        console.log("Metadata URI:", metadataUri); // Log the metadata URI
                        const metadataResponse = await axios.get(metadataUri, {
                            headers: {
                                "Content-Type": "application/json"
                            }
                        });
                        const processedNFT = {
                            ...rest,
                            metadata: metadataResponse.data
                        };
                        processedNFTs.push(processedNFT);
                    } catch (error) {
                        console.error("Failed to fetch metadata:", error);
                    // You can handle the error as per your requirements
                    }
                }
            }
            setNFTs(processedNFTs);
        } catch (error1) {
            setError(error1.message);
            console.error("Fetch NFTs error:", error1);
        } finally{
            setLoading(false);
        }
    };
    useEffect(()=>{
        fetchNFTs();
    }, []);
    return /*#__PURE__*/ _jsxs("div", {
        children: [
            /*#__PURE__*/ _jsx("h2", {
                className: "text-2xl font-bold mb-4",
                children: "NFTs:"
            }),
            loading ? /*#__PURE__*/ _jsxs("div", {
                className: "py-2 mx-4 ",
                children: [
                    /*#__PURE__*/ _jsxs("svg", {
                        "aria-hidden": "true",
                        className: "inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600",
                        viewBox: "0 0 100 101",
                        fill: "none",
                        xmlns: "http://www.w3.org/2000/svg",
                        children: [
                            /*#__PURE__*/ _jsx("path", {
                                d: "M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z",
                                fill: "currentColor"
                            }),
                            /*#__PURE__*/ _jsx("path", {
                                d: "M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z",
                                fill: "currentFill"
                            })
                        ]
                    }),
                    /*#__PURE__*/ _jsx("span", {
                        className: "sr-only",
                        children: "Loading..."
                    })
                ]
            }) : /*#__PURE__*/ _jsx(_Fragment, {
                children: !error && /*#__PURE__*/ _jsx("div", {
                    children: /*#__PURE__*/ _jsx("div", {
                        className: "grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 ",
                        children: nfts.map((nft, index)=>/*#__PURE__*/ _jsxs("div", {
                                className: "bg-gray-800 rounded-lg p-4 shadow-md",
                                children: [
                                    nft.metadata && /*#__PURE__*/ _jsx("img", {
                                        src: nft.metadata.image,
                                        alt: "NFT",
                                        className: "mx-auto max-w-full h-30 object-contain "
                                    }),
                                    /*#__PURE__*/ _jsxs("div", {
                                        className: "mt-2 text-gray-500 ",
                                        children: [
                                            /*#__PURE__*/ _jsx("p", {
                                                className: "font-bold text-lg",
                                                children: nft.metadata.name
                                            }),
                                            /*#__PURE__*/ _jsx("p", {
                                                className: "",
                                                children: nft.metadata.symbol
                                            })
                                        ]
                                    })
                                ]
                            }, index))
                    })
                })
            })
        ]
    });
};
/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = ((/* unused pure expression or super */ null && (Indexxx)));

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 8461:
/***/ ((module, __unused_webpack___webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1649);
/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_auth_react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Metadata__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7226);
/* harmony import */ var _Settings__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4827);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_Metadata__WEBPACK_IMPORTED_MODULE_3__, _Settings__WEBPACK_IMPORTED_MODULE_4__]);
([_Metadata__WEBPACK_IMPORTED_MODULE_3__, _Settings__WEBPACK_IMPORTED_MODULE_4__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);





const Indexx = ()=>{
    const { 0: contractAddresses , 1: setContractAddresses  } = useState([]);
    const { 0: loading , 1: setLoading  } = useState(false);
    const { 0: error , 1: setError  } = useState(null);
    const { data: session , status  } = useSession();
    const address = session?.user.address || "";
    const network = "mainnet";
    useEffect(()=>{
        if (address) {
            fetchAddress();
        }
    }, [
        address
    ]);
    const fetchAddress = async ()=>{
        setLoading(true);
        setError(null);
        try {
            const response = await fetch("/api/getNFTs", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    address,
                    network
                })
            });
            if (!response.ok) {
                throw new Error("Failed to fetch NFTs");
            }
            const data = await response.json();
            console.log("Data:", data); // Log the response to inspect the data structure
            // Extract the relevant properties from the data object
            const extractedNFTs = data.map((item)=>({
                    associatedTokenAddress: item.associatedTokenAddress,
                    mint: item.mint
                }));
            setContractAddresses(extractedNFTs);
        } catch (error) {
            setError(error.message);
        } finally{
            setLoading(false);
        }
    };
    return /*#__PURE__*/ _jsx("div", {
        children: /*#__PURE__*/ _jsx("div", {
            children: /*#__PURE__*/ _jsx(Settings, {
                nftMintValues: contractAddresses.length > 0 ? contractAddresses[0].mint : ""
            })
        })
    });
};
/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = ((/* unused pure expression or super */ null && (Indexx)));

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 4827:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1649);
/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_auth_react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var gun__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(940);
/* harmony import */ var gun__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(gun__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _NFT__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8461);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9648);
/* harmony import */ var _Metadata__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(7226);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_NFT__WEBPACK_IMPORTED_MODULE_4__, axios__WEBPACK_IMPORTED_MODULE_5__, _Metadata__WEBPACK_IMPORTED_MODULE_6__]);
([_NFT__WEBPACK_IMPORTED_MODULE_4__, axios__WEBPACK_IMPORTED_MODULE_5__, _Metadata__WEBPACK_IMPORTED_MODULE_6__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);







function Settings({ onClose , nftMintValues  }) {
    const { data: session , status  } = (0,next_auth_react__WEBPACK_IMPORTED_MODULE_2__.useSession)();
    const { 0: username , 1: setUsername  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const { 0: currentUsername , 1: setCurrentUsername  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const { 0: profilePicture , 1: setProfilePicture  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const { 0: removeProfilePicture , 1: setRemoveProfilePicture  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { 0: activeCategory , 1: setActiveCategory  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("profile");
    const { 0: nfts , 1: setNFTs  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const { 0: loading , 1: setLoading  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { 0: error , 1: setError  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const network = "mainnet";
    const { 0: contractAddresses , 1: setContractAddresses  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const contractAddress = contractAddresses.length > 0 ? contractAddresses[0].mint : "";
    const { 0: selectedNFT , 1: setSelectedNFT  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const address = session?.user.address || "";
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (address) {
            fetchAddress();
        }
    }, [
        address
    ]);
    const fetchAddress = async ()=>{
        setLoading(true);
        setError(null);
        try {
            const response = await fetch("/api/getNFTs", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    address,
                    network
                })
            });
            if (!response.ok) {
                throw new Error("Failed to fetch NFTs");
            }
            const data = await response.json();
            // console.log('Data:', data); 
            // Extract the relevant properties from the data object
            const extractedNFTs = data.map((item)=>({
                    associatedTokenAddress: item.associatedTokenAddress,
                    mint: item.mint
                }));
            setContractAddresses(extractedNFTs);
        } catch (error) {
            setError(error.message);
        } finally{
            setLoading(false);
        }
    };
    const gun = gun__WEBPACK_IMPORTED_MODULE_3___default()({
        peers: [
            "https://peer.wallie.io/gun"
        ]
    });
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        gun.get(session?.user.address).get("username").on((data)=>{
            setCurrentUsername(data);
        });
    }, [
        session
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        gun.get(session?.user.address).get("pfp").on((data)=>{
            setProfilePicture(data);
        });
    }, [
        session
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        // Set default profile picture on component mount
        const user = gun.get(session?.user.address);
        user.get("pfp").once((data)=>{
            if (!data) {
                // Set the default profile picture here
                const defaultProfilePicture = "/user.png";
                user.get("pfp").put(defaultProfilePicture);
            }
        });
    }, [
        session
    ]);
    function handleSubmit(event) {
        event.preventDefault();
        const user = gun.get(session?.user.address);
        // Update the username
        if (username.trim() !== "") {
            user.get("username").put(username);
            setCurrentUsername(username);
        }
    }
    function handleChange(event) {
        setUsername(event.target.value);
    }
    function handleProfilePictureChange(event) {
        const file = event.target.files[0];
        if (file instanceof Blob) {
            const reader = new FileReader();
            reader.onload = (e)=>{
                const base64Image = e.target.result;
                const user = gun.get(session?.user.address);
                user.get("pfp").put(base64Image);
            };
            reader.readAsDataURL(file);
        }
    }
    function handleRemoveProfilePicture() {
        // Check if the profile picture is the default
        if (profilePicture === "/user.png") {
            return; // Do nothing if it's the default picture
        }
        const user = gun.get(session?.user.address);
        user.get("pfp").put("/user.png"); // Set default profile picture immediately
        setProfilePicture("/user.png"); // Update the profile picture state
        setRemoveProfilePicture(true);
    }
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (contractAddress) {
            fetchNFTs();
        }
    }, [
        contractAddress
    ]);
    const fetchNFTs = async ()=>{
        setLoading(true);
        setError(null);
        try {
            const response = await axios__WEBPACK_IMPORTED_MODULE_5__["default"].post("/api/getNFTMetdata", {
                contractAddress,
                network
            });
            if (response.status !== 200) {
                throw new Error("Failed to fetch NFTs");
            }
            const data = response.data;
            // console.log('Data:', data); 
            if (typeof data !== "object" || Array.isArray(data)) {
                throw new Error("Invalid data format: response data is not an object");
            }
            const processedNFTs = [];
            for(const key in data){
                if (data.hasOwnProperty(key)) {
                    const nft = data[key];
                    const { metadataUri , ...rest } = nft;
                    try {
                        // console.log('Metadata URI:', metadataUri); 
                        const metadataResponse = await axios__WEBPACK_IMPORTED_MODULE_5__["default"].get(metadataUri, {
                            headers: {
                                "Content-Type": "application/json"
                            }
                        });
                        const processedNFT = {
                            ...rest,
                            metadata: metadataResponse.data
                        };
                        processedNFTs.push(processedNFT);
                    } catch (error) {
                        console.error("Failed to fetch metadata:", error);
                    // You can handle the error as per your requirements
                    }
                }
            }
            setNFTs(processedNFTs);
        } catch (error1) {
            setError(error1.message);
            console.error("Fetch NFTs error:", error1);
        } finally{
            setLoading(false);
        }
    };
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        fetchNFTs();
    }, []);
    const handleNFTSelection = (nft)=>{
        if (selectedNFT === nft) {
            setSelectedNFT(null); // Unselect the NFT if it was already selected
        } else {
            setSelectedNFT(nft); // Select the NFT if it was not already selected
        }
    };
    function handleSetProfilePicture() {
        if (selectedNFT) {
            const user = gun.get(session?.user.address);
            user.get("pfp").put(selectedNFT.metadata.image); // Save selected NFT image as profile picture in Gun.js
            setProfilePicture(selectedNFT.metadata.image); // Update the profile picture state
            setSelectedNFT(null); // Reset selectedNFT state
            setIsNFTModalOpen(false); // Close the popup
        }
    }
    const { 0: isDropdownOpen , 1: setIsDropdownOpen  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    function handleDropdownToggle() {
        setIsDropdownOpen(!isDropdownOpen);
    }
    const { 0: isNFTModalOpen , 1: setIsNFTModalOpen  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    function openNFTSelection() {
        setIsNFTModalOpen(true);
    }
    function handleNFTModalClose() {
        setIsNFTModalOpen(false);
    }
    const dropdownRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const handleOutsideClick = (event)=>{
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleOutsideClick);
        return ()=>{
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);
    const { 0: walletAddress , 1: setWalletAddress  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const walletAddressRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const { 0: isCopied , 1: setIsCopied  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (session?.user?.address) {
            setWalletAddress(session.user.address);
        }
    }, [
        session
    ]);
    const copyWalletAddress = async ()=>{
        try {
            await navigator.clipboard.writeText(walletAddress);
            setIsCopied(true);
        // console.log('Wallet address copied to clipboard');
        } catch (error) {
        // console.error('Failed to copy wallet address to clipboard:', error);
        }
    };
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        let timer;
        if (isCopied) {
            timer = setTimeout(()=>{
                setIsCopied(false);
            }, 2000);
        }
        return ()=>{
            clearTimeout(timer);
        };
    }, [
        isCopied
    ]);
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        className: "absolute top-0 left-0 w-full h-full flex items-center justify-center backdrop-filter backdrop-blur-sm",
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "bg-gray-700 text-white p-8 rounded-lg flex w-[1000px] min-h-[400px] h-[600px] relative",
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                    className: "hover:text-gray-900 absolute top-2 right-2 p-2",
                    onClick: onClose,
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        className: "h-8 w-8",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        stroke: "currentColor",
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: 2,
                            d: "M6 18L18 6M6 6l12 12"
                        })
                    })
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "w-1/4",
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            className: "flex items-center mb-8",
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h2", {
                                className: "text-2xl font-bold mr-4 ",
                                children: "Settings"
                            })
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("ul", {
                            className: "space-y-2",
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                    className: `border-l-4 pl-2 ${activeCategory === "profile" ? "border-blue-500" : "border-transparent"}`,
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                        className: "cursor-pointer",
                                        onClick: ()=>setActiveCategory("profile"),
                                        children: "Profile"
                                    })
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                    className: `border-l-4 pl-2 ${activeCategory === "wallet" ? "border-blue-500" : "border-transparent"}`,
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                        className: "cursor-pointer",
                                        onClick: ()=>setActiveCategory("wallet"),
                                        children: "Wallet"
                                    })
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                    className: `border-l-4 pl-2 ${activeCategory === "help" ? "border-blue-500" : "border-transparent"}`,
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                        className: "cursor-pointer",
                                        onClick: ()=>setActiveCategory("help"),
                                        children: "Help & Support"
                                    })
                                })
                            ]
                        })
                    ]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "w-3/4 pl-8 py-10 overflow-y-auto",
                    children: [
                        activeCategory === "profile" && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                        className: "text-2xl font-bold mr-4 py-4",
                                        children: "Profile"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("form", {
                                        onSubmit: handleSubmit,
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
                                                className: "mb-4",
                                                children: [
                                                    "New Username",
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                                        className: "mx-2 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
                                                        type: "text",
                                                        value: username,
                                                        onChange: handleChange
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                                className: "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1.5 mr-2 mb-1 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800",
                                                type: "submit",
                                                children: "Submit"
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                                className: "mb-4",
                                                children: [
                                                    "Current Username: ",
                                                    currentUsername
                                                ]
                                            }),
                                            walletAddress && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "flex items-center",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                                        className: "mr-2",
                                                        children: [
                                                            "Wallet Address: ",
                                                            `${session?.user.address.substring(0, 8)}...${session?.user.address.slice(-8)}`
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                                        onClick: copyWalletAddress,
                                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
                                                            width: "25",
                                                            height: "25",
                                                            viewBox: "0 0 20 20",
                                                            fill: "none",
                                                            xmlns: "http://www.w3.org/2000/svg",
                                                            children: [
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                                                                    d: "M8 2C7.44772 2 7 2.44772 7 3C7 3.55228 7.44772 4 8 4H10C10.5523 4 11 3.55228 11 3C11 2.44772 10.5523 2 10 2H8Z",
                                                                    fill: `${isCopied ? "#1E40AF" : "#000000"}`
                                                                }),
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                                                                    d: "M3 5C3 3.89543 3.89543 3 5 3C5 4.65685 6.34315 6 8 6H10C11.6569 6 13 4.65685 13 3C14.1046 3 15 3.89543 15 5V11H10.4142L11.7071 9.70711C12.0976 9.31658 12.0976 8.68342 11.7071 8.29289C11.3166 7.90237 10.6834 7.90237 10.2929 8.29289L7.29289 11.2929C6.90237 11.6834 6.90237 12.3166 7.29289 12.7071L10.2929 15.7071C10.6834 16.0976 11.3166 16.0976 11.7071 15.7071C12.0976 15.3166 12.0976 14.6834 11.7071 14.2929L10.4142 13H15V16C15 17.1046 14.1046 18 13 18H5C3.89543 18 3 17.1046 3 16V5Z",
                                                                    fill: `${isCopied ? "#1E40AF" : "#000000"}`
                                                                }),
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                                                                    d: "M15 11H17C17.5523 11 18 11.4477 18 12C18 12.5523 17.5523 13 17 13H15V11Z",
                                                                    fill: `${isCopied ? "#1E40AF" : "#000000"}`
                                                                })
                                                            ]
                                                        })
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                className: "mb-4 mt-4",
                                                children: "Select a Profile Picture"
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "flex mt-4",
                                                children: [
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                                        className: "flex items-center justify-center bg-gray-100 border-2 border-gray-300 rounded-full cursor-pointer",
                                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                            className: "relative inline-block",
                                                            children: [
                                                                profilePicture ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                                                    src: profilePicture,
                                                                    alt: "Profile",
                                                                    className: "w-20 h-20 rounded-full hover:bg-gray-900 ",
                                                                    onClick: handleDropdownToggle
                                                                }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {}),
                                                                profilePicture && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("svg", {
                                                                    xmlns: "http://www.w3.org/2000/svg",
                                                                    className: "w-6 h-6 text-gray-300 absolute bottom-0 right-1 bg-gray-400 rounded-full cursor-pointer",
                                                                    viewBox: "0 0 24 24",
                                                                    id: "edit",
                                                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                                                                        d: "M5,18H9.24a1,1,0,0,0,.71-.29l6.92-6.93h0L19.71,8a1,1,0,0,0,0-1.42L15.47,2.29a1,1,0,0,0-1.42,0L11.23,5.12h0L4.29,12.05a1,1,0,0,0-.29.71V17A1,1,0,0,0,5,18ZM14.76,4.41l2.83,2.83L16.17,8.66,13.34,5.83ZM6,13.17l5.93-5.93,2.83,2.83L8.83,16H6ZM21,20H3a1,1,0,0,0,0,2H21a1,1,0,0,0,0-2Z"
                                                                    })
                                                                })
                                                            ]
                                                        })
                                                    }),
                                                    isDropdownOpen && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                        ref: dropdownRef,
                                                        className: "absolute mt-20 -mx-6 py-2 w-40 bg-white rounded-md shadow-lg divide-y divide-gray-100 shadow w-34 h-34 dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-200",
                                                        children: [
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                                                className: "block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white rounded w-full",
                                                                onClick: openNFTSelection,
                                                                children: "Select NFT"
                                                            }),
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
                                                                className: "block px-4 py-2 hover:bg-gray-100 cursor-pointer dark:hover:bg-gray-600 dark:hover:text-white",
                                                                children: [
                                                                    "Select from Gallery",
                                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                                                        className: "hidden",
                                                                        type: "file",
                                                                        accept: "image/*",
                                                                        onChange: handleProfilePictureChange
                                                                    })
                                                                ]
                                                            })
                                                        ]
                                                    }),
                                                    isNFTModalOpen && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                        className: "absolute top-0 left-0 w-full h-full flex items-center justify-center backdrop-filter backdrop-blur-sm",
                                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                            className: "bg-gray-700 text-white p-8 rounded-lg flex w-[1000px] min-h-[400px] h-[600px] relative",
                                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                                className: "mt-4",
                                                                children: [
                                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                                        className: "mb-4",
                                                                        children: "Select an NFT as Profile Picture"
                                                                    }),
                                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                                        className: "py-2 mx-4",
                                                                        children: loading ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                                            className: "flex items-center justify-center",
                                                                            children: [
                                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
                                                                                    "aria-hidden": "true",
                                                                                    className: "inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600",
                                                                                    viewBox: "0 0 100 101",
                                                                                    fill: "none",
                                                                                    xmlns: "http://www.w3.org/2000/svg",
                                                                                    children: [
                                                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                                                                                            d: "M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z",
                                                                                            fill: "currentColor"
                                                                                        }),
                                                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                                                                                            d: "M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z",
                                                                                            fill: "currentFill"
                                                                                        })
                                                                                    ]
                                                                                }),
                                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                                                    className: "sr-only",
                                                                                    children: "Loading..."
                                                                                })
                                                                            ]
                                                                        }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                                                            children: [
                                                                                error && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                                                    className: "text-red-500 text-sm ",
                                                                                    children: "Error: No NFTs found"
                                                                                }),
                                                                                !error && nfts.length === 0 && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                                                    children: "No NFTs available."
                                                                                }),
                                                                                !error && nfts.length > 0 && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                                                    className: "flex flex-wrap",
                                                                                    children: nfts.map((nft)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                                                            className: `flex items-center justify-center w-32 h-32 border-2 ${selectedNFT === nft ? "border-blue-500" : "border-gray-300"} rounded-lg m-2 cursor-pointer`,
                                                                                            onClick: ()=>handleNFTSelection(nft),
                                                                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                                                                                src: nft.metadata.image,
                                                                                                alt: "NFT",
                                                                                                className: "w-full h-full rounded-lg"
                                                                                            })
                                                                                        }, nft.mint))
                                                                                }),
                                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                                                                    className: "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1.5 mt-4 mb-1 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800",
                                                                                    onClick: handleSetProfilePicture,
                                                                                    disabled: !selectedNFT,
                                                                                    children: "Set as Profile Picture"
                                                                                }),
                                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                                                                    className: "text-gray-400 hover:text-gray-300 font-medium rounded-lg text-sm px-2 py-1.5 mt-2 mb-1 focus:outline-none",
                                                                                    onClick: handleNFTModalClose,
                                                                                    children: "Cancel"
                                                                                })
                                                                            ]
                                                                        })
                                                                    })
                                                                ]
                                                            })
                                                        })
                                                    })
                                                ]
                                            }),
                                            profilePicture !== "/user.png" && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                                className: "text-blue-500 focus:ring-4 font-medium rounded-lg text-sm px-4 mt-2",
                                                onClick: handleRemoveProfilePicture,
                                                children: "Remove"
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                        className: "text-blue hover:text-gray-700 absolute top-2 right-2 p-2",
                                        onClick: onClose,
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("svg", {
                                            xmlns: "http://www.w3.org/2000/svg",
                                            className: "h-8 w-8",
                                            fill: "none",
                                            viewBox: "0 0 24 24",
                                            stroke: "currentColor",
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round",
                                                strokeWidth: 2,
                                                d: "M6 18L18 6M6 6l12 12"
                                            })
                                        })
                                    })
                                ]
                            })
                        }),
                        activeCategory === "wallet" && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                    className: "text-2xl font-bold mr-4 py-4",
                                    children: "  Wallet "
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h2", {
                                            className: "text-2xl mb-4",
                                            children: "NFTs:"
                                        }),
                                        loading ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "py-2 mx-4 ",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
                                                    "aria-hidden": "true",
                                                    className: "inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600",
                                                    viewBox: "0 0 100 101",
                                                    fill: "none",
                                                    xmlns: "http://www.w3.org/2000/svg",
                                                    children: [
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                                                            d: "M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z",
                                                            fill: "currentColor"
                                                        }),
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                                                            d: "M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z",
                                                            fill: "currentFill"
                                                        })
                                                    ]
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                    className: "sr-only",
                                                    children: "Loading..."
                                                })
                                            ]
                                        }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                            children: [
                                                error && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                    className: "text-red-500 text-sm ",
                                                    children: "Error: No NFTs found"
                                                }),
                                                !error && nfts.length === 0 && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                    children: "No NFTs available."
                                                }),
                                                !error && nfts.length > 0 && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                        className: "grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 ",
                                                        children: nfts.map((nft, index)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                                className: "bg-gray-800 rounded-lg p-4 shadow-md",
                                                                children: [
                                                                    nft.metadata && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                                                        src: nft.metadata.image,
                                                                        alt: "NFT",
                                                                        className: "mx-auto max-w-full h-30 object-contain "
                                                                    }),
                                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                                        className: "mt-2 text-gray-500 ",
                                                                        children: [
                                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                                                className: "font-bold text-lg",
                                                                                children: nft.metadata.name
                                                                            }),
                                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                                                className: "",
                                                                                children: nft.metadata.symbol
                                                                            })
                                                                        ]
                                                                    })
                                                                ]
                                                            }, index))
                                                    })
                                                })
                                            ]
                                        })
                                    ]
                                })
                            ]
                        }),
                        activeCategory === "help" && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                className: "text-2xl font-bold mr-4 py-4",
                                children: " Help & Support "
                            })
                        })
                    ]
                })
            ]
        })
    });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Settings);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 9569:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ LogoutBtn)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1649);
/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_auth_react__WEBPACK_IMPORTED_MODULE_2__);


// import { Button } from "@web3uikit/core";

function LogoutBtn() {
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
        className: " w-full text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white",
        text: "Logout",
        theme: "outline",
        onClick: ()=>(0,next_auth_react__WEBPACK_IMPORTED_MODULE_2__.signOut)(),
        children: "Log out"
    });
}


/***/ }),

/***/ 1600:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* unused harmony export default */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1649);
/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_auth_react__WEBPACK_IMPORTED_MODULE_2__);





function UserData() {
    const { data: session , status  } = useSession();
    if (session) {
        return /*#__PURE__*/ _jsxs("div", {
            className: styles.data,
            children: [
                /*#__PURE__*/ _jsxs("div", {
                    className: styles.dataCell,
                    children: [
                        /*#__PURE__*/ _jsx(Typography, {
                            variant: "subtitle2",
                            children: "Profile Id:"
                        }),
                        /*#__PURE__*/ _jsx("div", {
                            className: styles.address,
                            children: /*#__PURE__*/ _jsx(Typography, {
                                variant: "body16",
                                children: session?.user.profileId
                            })
                        })
                    ]
                }),
                /*#__PURE__*/ _jsxs("div", {
                    className: styles.dataCell,
                    children: [
                        /*#__PURE__*/ _jsx(Typography, {
                            variant: "subtitle2",
                            children: "Account:"
                        }),
                        /*#__PURE__*/ _jsx("div", {
                            className: styles.address,
                            children: /*#__PURE__*/ _jsx(Typography, {
                                copyable: true,
                                variant: "body16",
                                children: session?.user.address
                            })
                        })
                    ]
                }),
                /*#__PURE__*/ _jsxs("div", {
                    className: styles.dataCell,
                    children: [
                        /*#__PURE__*/ _jsx(Typography, {
                            variant: "subtitle2",
                            children: "Network:"
                        }),
                        /*#__PURE__*/ _jsx("div", {
                            className: styles.address,
                            children: /*#__PURE__*/ _jsx(Typography, {
                                variant: "body16",
                                children: session?.user.network
                            })
                        })
                    ]
                }),
                /*#__PURE__*/ _jsxs("div", {
                    className: styles.dataCell,
                    children: [
                        /*#__PURE__*/ _jsx(Typography, {
                            variant: "subtitle2",
                            children: "ExpTime:"
                        }),
                        /*#__PURE__*/ _jsx("div", {
                            className: styles.address,
                            children: /*#__PURE__*/ _jsx(Typography, {
                                variant: "body16",
                                children: session?.user.expirationTime
                            })
                        })
                    ]
                })
            ]
        });
    }
}


/***/ }),

/***/ 9045:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Home),
/* harmony export */   "getServerSideProps": () => (/* binding */ getServerSideProps)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1649);
/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_auth_react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _app_components_userData_userData__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1600);
/* harmony import */ var _app_components_logoutBtn_logoutBtn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9569);
/* harmony import */ var _solana_wallet_adapter_react_ui__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8847);
/* harmony import */ var _solana_wallet_adapter_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(1247);
/* harmony import */ var _app_components_Addfriend__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(2511);
/* harmony import */ var gun__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(940);
/* harmony import */ var gun__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(gun__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _app_components_EnterUsername__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(5277);
/* harmony import */ var _app_components_AnotherComponent__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(8470);
/* harmony import */ var _app_components_Layout__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(8830);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(1664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _app_components_FriendList__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(9463);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_solana_wallet_adapter_react_ui__WEBPACK_IMPORTED_MODULE_5__, _solana_wallet_adapter_react__WEBPACK_IMPORTED_MODULE_6__, _app_components_Layout__WEBPACK_IMPORTED_MODULE_11__, _app_components_FriendList__WEBPACK_IMPORTED_MODULE_13__]);
([_solana_wallet_adapter_react_ui__WEBPACK_IMPORTED_MODULE_5__, _solana_wallet_adapter_react__WEBPACK_IMPORTED_MODULE_6__, _app_components_Layout__WEBPACK_IMPORTED_MODULE_11__, _app_components_FriendList__WEBPACK_IMPORTED_MODULE_13__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);















__webpack_require__(2121);
async function getServerSideProps(context) {
    const session = await (0,next_auth_react__WEBPACK_IMPORTED_MODULE_2__.getSession)(context);
    if (!session) {
        return {
            redirect: {
                destination: "/"
            }
        };
    }
    return {
        props: {
            userSession: session
        }
    };
}
function Home({ userSession  }) {
    const { publicKey , disconnecting  } = (0,_solana_wallet_adapter_react__WEBPACK_IMPORTED_MODULE_6__.useWallet)();
    const { 0: isPending , 1: startTransition  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useTransition)();
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        startTransition(()=>{
            publicKey && console.log(publicKey.toBase58());
        });
    }, [
        publicKey
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        startTransition(()=>{
            disconnecting && (0,next_auth_react__WEBPACK_IMPORTED_MODULE_2__.signOut)();
        });
    }, [
        disconnecting
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        startTransition(()=>{
            console.log({
                disconnecting
            });
        });
    }, [
        disconnecting
    ]);
    if (userSession) {
        return(// <div className={styles.body}>
        //   {!isPending && (
        //     <div>
        //       <Layout/>
        //     <div className={styles.card}>
        //       <>
        //         <UserData />
        //         <div className={styles.buttonsRow}>
        //           {publicKey ? (
        //             <WalletDisconnectButton />
        //           ) : (
        //             !disconnecting && <LogoutBtn />
        //           )}
        //         </div>
        //         <div>
        //         </div>
        //       </>
        //       </div>
        //     </div>
        //   )}
        // </div>
        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                children: [
                    "  ",
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_app_components_Layout__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .Z, {}),
                    " "
                ]
            })
        }));
    }
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 940:
/***/ ((module) => {

module.exports = require("gun");

/***/ }),

/***/ 1649:
/***/ ((module) => {

module.exports = require("next-auth/react");

/***/ }),

/***/ 3280:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/app-router-context.js");

/***/ }),

/***/ 2796:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/head-manager-context.js");

/***/ }),

/***/ 4014:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/i18n/normalize-locale-path.js");

/***/ }),

/***/ 8524:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/is-plain-object.js");

/***/ }),

/***/ 8020:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/mitt.js");

/***/ }),

/***/ 4406:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/page-path/denormalize-page-path.js");

/***/ }),

/***/ 4964:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router-context.js");

/***/ }),

/***/ 1751:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/add-path-prefix.js");

/***/ }),

/***/ 6220:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/compare-states.js");

/***/ }),

/***/ 299:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/format-next-pathname-info.js");

/***/ }),

/***/ 3938:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/format-url.js");

/***/ }),

/***/ 9565:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/get-asset-path-from-route.js");

/***/ }),

/***/ 5789:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/get-next-pathname-info.js");

/***/ }),

/***/ 1897:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/is-bot.js");

/***/ }),

/***/ 1428:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/is-dynamic.js");

/***/ }),

/***/ 8854:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/parse-path.js");

/***/ }),

/***/ 1292:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/parse-relative-url.js");

/***/ }),

/***/ 4567:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/path-has-prefix.js");

/***/ }),

/***/ 979:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/querystring.js");

/***/ }),

/***/ 3297:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/remove-trailing-slash.js");

/***/ }),

/***/ 6052:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/resolve-rewrites.js");

/***/ }),

/***/ 4226:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/route-matcher.js");

/***/ }),

/***/ 5052:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/route-regex.js");

/***/ }),

/***/ 9232:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/utils.js");

/***/ }),

/***/ 6689:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ }),

/***/ 1247:
/***/ ((module) => {

module.exports = import("@solana/wallet-adapter-react");;

/***/ }),

/***/ 8847:
/***/ ((module) => {

module.exports = import("@solana/wallet-adapter-react-ui");;

/***/ }),

/***/ 9648:
/***/ ((module) => {

module.exports = import("axios");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [598,676,961], () => (__webpack_exec__(9045)));
module.exports = __webpack_exports__;

})();