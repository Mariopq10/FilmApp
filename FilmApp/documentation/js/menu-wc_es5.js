'use strict';

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }
function _construct(t, e, r) { if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments); var o = [null]; o.push.apply(o, e); var p = new (t.bind.apply(t, o))(); return r && _setPrototypeOf(p, r.prototype), p; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _isNativeFunction(fn) { try { return Function.toString.call(fn).indexOf("[native code]") !== -1; } catch (e) { return typeof fn === "function"; } }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
customElements.define('compodoc-menu', /*#__PURE__*/function (_HTMLElement) {
  _inherits(_class, _HTMLElement);
  function _class() {
    var _this;
    _classCallCheck(this, _class);
    _this = _callSuper(this, _class);
    _this.isNormalMode = _this.getAttribute('mode') === 'normal';
    return _this;
  }
  _createClass(_class, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      this.render(this.isNormalMode);
    }
  }, {
    key: "render",
    value: function render(isNormalMode) {
      var tp = lithtml.html("\n        <nav>\n            <ul class=\"list\">\n                <li class=\"title\">\n                    <a href=\"index.html\" data-type=\"index-link\">film-app documentation</a>\n                </li>\n\n                <li class=\"divider\"></li>\n                ".concat(isNormalMode ? "<div id=\"book-search-input\" role=\"search\"><input type=\"text\" placeholder=\"Type to search\"></div>" : '', "\n                <li class=\"chapter\">\n                    <a data-type=\"chapter-link\" href=\"index.html\"><span class=\"icon ion-ios-home\"></span>Getting started</a>\n                    <ul class=\"links\">\n                        <li class=\"link\">\n                            <a href=\"overview.html\" data-type=\"chapter-link\">\n                                <span class=\"icon ion-ios-keypad\"></span>Overview\n                            </a>\n                        </li>\n                        <li class=\"link\">\n                            <a href=\"index.html\" data-type=\"chapter-link\">\n                                <span class=\"icon ion-ios-paper\"></span>README\n                            </a>\n                        </li>\n                                <li class=\"link\">\n                                    <a href=\"dependencies.html\" data-type=\"chapter-link\">\n                                        <span class=\"icon ion-ios-list\"></span>Dependencies\n                                    </a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"properties.html\" data-type=\"chapter-link\">\n                                        <span class=\"icon ion-ios-apps\"></span>Properties\n                                    </a>\n                                </li>\n                    </ul>\n                </li>\n                    <li class=\"chapter modules\">\n                        <a data-type=\"chapter-link\" href=\"modules.html\">\n                            <div class=\"menu-toggler linked\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"', ">\n                                <span class=\"icon ion-ios-archive\"></span>\n                                <span class=\"link-name\">Modules</span>\n                                <span class=\"icon ion-ios-arrow-down\"></span>\n                            </div>\n                        </a>\n                        <ul class=\"links collapse \" ").concat(isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"', ">\n                            <li class=\"link\">\n                                <a href=\"modules/AppModule.html\" data-type=\"entity-link\" >AppModule</a>\n                                    <li class=\"chapter inner\">\n                                        <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#components-links-module-AppModule-6510c0ac0bd504a2305123d652e82870ee59501a9dd9ae3197dfbeb966fc3dfc1d6e449fee4467eb7402eb83009845f12c6d47f5db02c4edde468cbceae35668"' : 'data-bs-target="#xs-components-links-module-AppModule-6510c0ac0bd504a2305123d652e82870ee59501a9dd9ae3197dfbeb966fc3dfc1d6e449fee4467eb7402eb83009845f12c6d47f5db02c4edde468cbceae35668"', ">\n                                            <span class=\"icon ion-md-cog\"></span>\n                                            <span>Components</span>\n                                            <span class=\"icon ion-ios-arrow-down\"></span>\n                                        </div>\n                                        <ul class=\"links collapse\" ").concat(isNormalMode ? 'id="components-links-module-AppModule-6510c0ac0bd504a2305123d652e82870ee59501a9dd9ae3197dfbeb966fc3dfc1d6e449fee4467eb7402eb83009845f12c6d47f5db02c4edde468cbceae35668"' : 'id="xs-components-links-module-AppModule-6510c0ac0bd504a2305123d652e82870ee59501a9dd9ae3197dfbeb966fc3dfc1d6e449fee4467eb7402eb83009845f12c6d47f5db02c4edde468cbceae35668"', ">\n                                            <li class=\"link\">\n                                                <a href=\"components/AppComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >AppComponent</a>\n                                            </li>\n                                        </ul>\n                                    </li>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"modules/AppRoutingModule.html\" data-type=\"entity-link\" >AppRoutingModule</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"modules/AuthModule.html\" data-type=\"entity-link\" >AuthModule</a>\n                                    <li class=\"chapter inner\">\n                                        <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#components-links-module-AuthModule-e5bfa0d39f0e448ed7f2fcec845d1775e0dda6af2ea4a31143c67a6b8f4c0d82f9a68367288ffa516655944aec2705b08ef133b3f47e18b6138843e09fb520e5"' : 'data-bs-target="#xs-components-links-module-AuthModule-e5bfa0d39f0e448ed7f2fcec845d1775e0dda6af2ea4a31143c67a6b8f4c0d82f9a68367288ffa516655944aec2705b08ef133b3f47e18b6138843e09fb520e5"', ">\n                                            <span class=\"icon ion-md-cog\"></span>\n                                            <span>Components</span>\n                                            <span class=\"icon ion-ios-arrow-down\"></span>\n                                        </div>\n                                        <ul class=\"links collapse\" ").concat(isNormalMode ? 'id="components-links-module-AuthModule-e5bfa0d39f0e448ed7f2fcec845d1775e0dda6af2ea4a31143c67a6b8f4c0d82f9a68367288ffa516655944aec2705b08ef133b3f47e18b6138843e09fb520e5"' : 'id="xs-components-links-module-AuthModule-e5bfa0d39f0e448ed7f2fcec845d1775e0dda6af2ea4a31143c67a6b8f4c0d82f9a68367288ffa516655944aec2705b08ef133b3f47e18b6138843e09fb520e5"', ">\n                                            <li class=\"link\">\n                                                <a href=\"components/LayoutPageComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >LayoutPageComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/LoginPageComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >LoginPageComponent</a>\n                                            </li>\n                                        </ul>\n                                    </li>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"modules/AuthRoutingModule.html\" data-type=\"entity-link\" >AuthRoutingModule</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"modules/FilmModule.html\" data-type=\"entity-link\" >FilmModule</a>\n                                    <li class=\"chapter inner\">\n                                        <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#components-links-module-FilmModule-a89a284415b4ce1ba6315665fe3d119fa8ddfb345e4807014dc72fce94bab0c901054b2370edc060f37132d9b8f0c24d32e98aaaf7048395f20f8d5c506cc017"' : 'data-bs-target="#xs-components-links-module-FilmModule-a89a284415b4ce1ba6315665fe3d119fa8ddfb345e4807014dc72fce94bab0c901054b2370edc060f37132d9b8f0c24d32e98aaaf7048395f20f8d5c506cc017"', ">\n                                            <span class=\"icon ion-md-cog\"></span>\n                                            <span>Components</span>\n                                            <span class=\"icon ion-ios-arrow-down\"></span>\n                                        </div>\n                                        <ul class=\"links collapse\" ").concat(isNormalMode ? 'id="components-links-module-FilmModule-a89a284415b4ce1ba6315665fe3d119fa8ddfb345e4807014dc72fce94bab0c901054b2370edc060f37132d9b8f0c24d32e98aaaf7048395f20f8d5c506cc017"' : 'id="xs-components-links-module-FilmModule-a89a284415b4ce1ba6315665fe3d119fa8ddfb345e4807014dc72fce94bab0c901054b2370edc060f37132d9b8f0c24d32e98aaaf7048395f20f8d5c506cc017"', ">\n                                            <li class=\"link\">\n                                                <a href=\"components/CardComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >CardComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/FavPageComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >FavPageComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/FilmPageComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >FilmPageComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/GenreComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >GenreComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/ListPageComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >ListPageComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/SearchPageComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >SearchPageComponent</a>\n                                            </li>\n                                        </ul>\n                                    </li>\n                                    <li class=\"chapter inner\">\n                                        <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#pipes-links-module-FilmModule-a89a284415b4ce1ba6315665fe3d119fa8ddfb345e4807014dc72fce94bab0c901054b2370edc060f37132d9b8f0c24d32e98aaaf7048395f20f8d5c506cc017"' : 'data-bs-target="#xs-pipes-links-module-FilmModule-a89a284415b4ce1ba6315665fe3d119fa8ddfb345e4807014dc72fce94bab0c901054b2370edc060f37132d9b8f0c24d32e98aaaf7048395f20f8d5c506cc017"', ">\n                                            <span class=\"icon ion-md-add\"></span>\n                                            <span>Pipes</span>\n                                            <span class=\"icon ion-ios-arrow-down\"></span>\n                                        </div>\n                                        <ul class=\"links collapse\" ").concat(isNormalMode ? 'id="pipes-links-module-FilmModule-a89a284415b4ce1ba6315665fe3d119fa8ddfb345e4807014dc72fce94bab0c901054b2370edc060f37132d9b8f0c24d32e98aaaf7048395f20f8d5c506cc017"' : 'id="xs-pipes-links-module-FilmModule-a89a284415b4ce1ba6315665fe3d119fa8ddfb345e4807014dc72fce94bab0c901054b2370edc060f37132d9b8f0c24d32e98aaaf7048395f20f8d5c506cc017"', ">\n                                            <li class=\"link\">\n                                                <a href=\"pipes/FilmImgPipe.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >FilmImgPipe</a>\n                                            </li>\n                                        </ul>\n                                    </li>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"modules/FilmRoutingModule.html\" data-type=\"entity-link\" >FilmRoutingModule</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"modules/MaterialModule.html\" data-type=\"entity-link\" >MaterialModule</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"modules/SharedModule.html\" data-type=\"entity-link\" >SharedModule</a>\n                                    <li class=\"chapter inner\">\n                                        <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#components-links-module-SharedModule-1ea67e9f682c43656e6c25f51ba998796b3ae8566df3a98fbef8bd3f1c6c99f04a5a7d3f590f717fe62737294ca46e8d292b908e6646df1e19f1e4c82bb47cea"' : 'data-bs-target="#xs-components-links-module-SharedModule-1ea67e9f682c43656e6c25f51ba998796b3ae8566df3a98fbef8bd3f1c6c99f04a5a7d3f590f717fe62737294ca46e8d292b908e6646df1e19f1e4c82bb47cea"', ">\n                                            <span class=\"icon ion-md-cog\"></span>\n                                            <span>Components</span>\n                                            <span class=\"icon ion-ios-arrow-down\"></span>\n                                        </div>\n                                        <ul class=\"links collapse\" ").concat(isNormalMode ? 'id="components-links-module-SharedModule-1ea67e9f682c43656e6c25f51ba998796b3ae8566df3a98fbef8bd3f1c6c99f04a5a7d3f590f717fe62737294ca46e8d292b908e6646df1e19f1e4c82bb47cea"' : 'id="xs-components-links-module-SharedModule-1ea67e9f682c43656e6c25f51ba998796b3ae8566df3a98fbef8bd3f1c6c99f04a5a7d3f590f717fe62737294ca46e8d292b908e6646df1e19f1e4c82bb47cea"', ">\n                                            <li class=\"link\">\n                                                <a href=\"components/Error404PageComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >Error404PageComponent</a>\n                                            </li>\n                                        </ul>\n                                    </li>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"modules/UsersModule.html\" data-type=\"entity-link\" >UsersModule</a>\n                                    <li class=\"chapter inner\">\n                                        <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#components-links-module-UsersModule-4949ff662dd43de8bbe5ecff2696720eda855729b1b20bdfc9ce2bc5398260e711ce2d9c42b9a3b788c03920198c112e30b8d27cb501b7f5c40cf094f3e867f6"' : 'data-bs-target="#xs-components-links-module-UsersModule-4949ff662dd43de8bbe5ecff2696720eda855729b1b20bdfc9ce2bc5398260e711ce2d9c42b9a3b788c03920198c112e30b8d27cb501b7f5c40cf094f3e867f6"', ">\n                                            <span class=\"icon ion-md-cog\"></span>\n                                            <span>Components</span>\n                                            <span class=\"icon ion-ios-arrow-down\"></span>\n                                        </div>\n                                        <ul class=\"links collapse\" ").concat(isNormalMode ? 'id="components-links-module-UsersModule-4949ff662dd43de8bbe5ecff2696720eda855729b1b20bdfc9ce2bc5398260e711ce2d9c42b9a3b788c03920198c112e30b8d27cb501b7f5c40cf094f3e867f6"' : 'id="xs-components-links-module-UsersModule-4949ff662dd43de8bbe5ecff2696720eda855729b1b20bdfc9ce2bc5398260e711ce2d9c42b9a3b788c03920198c112e30b8d27cb501b7f5c40cf094f3e867f6"', ">\n                                            <li class=\"link\">\n                                                <a href=\"components/AddUserComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >AddUserComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/DeleteUserComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >DeleteUserComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/EditUserComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >EditUserComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/UsersComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >UsersComponent</a>\n                                            </li>\n                                        </ul>\n                                    </li>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"modules/UsuariosRoutingModule.html\" data-type=\"entity-link\" >UsuariosRoutingModule</a>\n                            </li>\n                </ul>\n                </li>\n                    <li class=\"chapter\">\n                        <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#components-links"' : 'data-bs-target="#xs-components-links"', ">\n                            <span class=\"icon ion-md-cog\"></span>\n                            <span>Components</span>\n                            <span class=\"icon ion-ios-arrow-down\"></span>\n                        </div>\n                        <ul class=\"links collapse \" ").concat(isNormalMode ? 'id="components-links"' : 'id="xs-components-links"', ">\n                            <li class=\"link\">\n                                <a href=\"components/LayoutPageComponent-1.html\" data-type=\"entity-link\" >LayoutPageComponent</a>\n                            </li>\n                        </ul>\n                    </li>\n                        <li class=\"chapter\">\n                            <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#injectables-links"' : 'data-bs-target="#xs-injectables-links"', ">\n                                <span class=\"icon ion-md-arrow-round-down\"></span>\n                                <span>Injectables</span>\n                                <span class=\"icon ion-ios-arrow-down\"></span>\n                            </div>\n                            <ul class=\"links collapse \" ").concat(isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"', ">\n                                <li class=\"link\">\n                                    <a href=\"injectables/AuthService.html\" data-type=\"entity-link\" >AuthService</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/CommonService.html\" data-type=\"entity-link\" >CommonService</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/FavService.html\" data-type=\"entity-link\" >FavService</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/FilmService.html\" data-type=\"entity-link\" >FilmService</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/RolesService.html\" data-type=\"entity-link\" >RolesService</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/UserService.html\" data-type=\"entity-link\" >UserService</a>\n                                </li>\n                            </ul>\n                        </li>\n                    <li class=\"chapter\">\n                        <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#guards-links"' : 'data-bs-target="#xs-guards-links"', ">\n                            <span class=\"icon ion-ios-lock\"></span>\n                            <span>Guards</span>\n                            <span class=\"icon ion-ios-arrow-down\"></span>\n                        </div>\n                        <ul class=\"links collapse \" ").concat(isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"', ">\n                            <li class=\"link\">\n                                <a href=\"guards/AdminGuard.html\" data-type=\"entity-link\" >AdminGuard</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"guards/AuthGuardService.html\" data-type=\"entity-link\" >AuthGuardService</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"guards/NoLoginGuard.html\" data-type=\"entity-link\" >NoLoginGuard</a>\n                            </li>\n                        </ul>\n                    </li>\n                    <li class=\"chapter\">\n                        <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#interfaces-links"' : 'data-bs-target="#xs-interfaces-links"', ">\n                            <span class=\"icon ion-md-information-circle-outline\"></span>\n                            <span>Interfaces</span>\n                            <span class=\"icon ion-ios-arrow-down\"></span>\n                        </div>\n                        <ul class=\"links collapse \" ").concat(isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"', ">\n                            <li class=\"link\">\n                                <a href=\"interfaces/ApiResponse.html\" data-type=\"entity-link\" >ApiResponse</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/DataFilm.html\" data-type=\"entity-link\" >DataFilm</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/Film.html\" data-type=\"entity-link\" >Film</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/Genre.html\" data-type=\"entity-link\" >Genre</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/Genre-1.html\" data-type=\"entity-link\" >Genre</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/Page.html\" data-type=\"entity-link\" >Page</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/Permises.html\" data-type=\"entity-link\" >Permises</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/Rol.html\" data-type=\"entity-link\" >Rol</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/SearchResponse.html\" data-type=\"entity-link\" >SearchResponse</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/User.html\" data-type=\"entity-link\" >User</a>\n                            </li>\n                        </ul>\n                    </li>\n                    <li class=\"chapter\">\n                        <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#miscellaneous-links"' : 'data-bs-target="#xs-miscellaneous-links"', ">\n                            <span class=\"icon ion-ios-cube\"></span>\n                            <span>Miscellaneous</span>\n                            <span class=\"icon ion-ios-arrow-down\"></span>\n                        </div>\n                        <ul class=\"links collapse \" ").concat(isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"', ">\n                            <li class=\"link\">\n                                <a href=\"miscellaneous/variables.html\" data-type=\"entity-link\">Variables</a>\n                            </li>\n                        </ul>\n                    </li>\n                        <li class=\"chapter\">\n                            <a data-type=\"chapter-link\" href=\"routes.html\"><span class=\"icon ion-ios-git-branch\"></span>Routes</a>\n                        </li>\n                    <li class=\"chapter\">\n                        <a data-type=\"chapter-link\" href=\"coverage.html\"><span class=\"icon ion-ios-stats\"></span>Documentation coverage</a>\n                    </li>\n                    <li class=\"divider\"></li>\n                    <li class=\"copyright\">\n                        Documentation generated using <a href=\"https://compodoc.app/\" target=\"_blank\" rel=\"noopener noreferrer\">\n                            <img data-src=\"images/compodoc-vectorise.png\" class=\"img-responsive\" data-type=\"compodoc-logo\">\n                        </a>\n                    </li>\n            </ul>\n        </nav>\n        "));
      this.innerHTML = tp.strings;
    }
  }]);
  return _class;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement)));