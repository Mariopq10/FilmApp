'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">film-app documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AppModule-6510c0ac0bd504a2305123d652e82870ee59501a9dd9ae3197dfbeb966fc3dfc1d6e449fee4467eb7402eb83009845f12c6d47f5db02c4edde468cbceae35668"' : 'data-bs-target="#xs-components-links-module-AppModule-6510c0ac0bd504a2305123d652e82870ee59501a9dd9ae3197dfbeb966fc3dfc1d6e449fee4467eb7402eb83009845f12c6d47f5db02c4edde468cbceae35668"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-6510c0ac0bd504a2305123d652e82870ee59501a9dd9ae3197dfbeb966fc3dfc1d6e449fee4467eb7402eb83009845f12c6d47f5db02c4edde468cbceae35668"' :
                                            'id="xs-components-links-module-AppModule-6510c0ac0bd504a2305123d652e82870ee59501a9dd9ae3197dfbeb966fc3dfc1d6e449fee4467eb7402eb83009845f12c6d47f5db02c4edde468cbceae35668"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AuthModule-e5bfa0d39f0e448ed7f2fcec845d1775e0dda6af2ea4a31143c67a6b8f4c0d82f9a68367288ffa516655944aec2705b08ef133b3f47e18b6138843e09fb520e5"' : 'data-bs-target="#xs-components-links-module-AuthModule-e5bfa0d39f0e448ed7f2fcec845d1775e0dda6af2ea4a31143c67a6b8f4c0d82f9a68367288ffa516655944aec2705b08ef133b3f47e18b6138843e09fb520e5"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AuthModule-e5bfa0d39f0e448ed7f2fcec845d1775e0dda6af2ea4a31143c67a6b8f4c0d82f9a68367288ffa516655944aec2705b08ef133b3f47e18b6138843e09fb520e5"' :
                                            'id="xs-components-links-module-AuthModule-e5bfa0d39f0e448ed7f2fcec845d1775e0dda6af2ea4a31143c67a6b8f4c0d82f9a68367288ffa516655944aec2705b08ef133b3f47e18b6138843e09fb520e5"' }>
                                            <li class="link">
                                                <a href="components/LayoutPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LayoutPageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoginPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoginPageComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthRoutingModule.html" data-type="entity-link" >AuthRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/FilmModule.html" data-type="entity-link" >FilmModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-FilmModule-a89a284415b4ce1ba6315665fe3d119fa8ddfb345e4807014dc72fce94bab0c901054b2370edc060f37132d9b8f0c24d32e98aaaf7048395f20f8d5c506cc017"' : 'data-bs-target="#xs-components-links-module-FilmModule-a89a284415b4ce1ba6315665fe3d119fa8ddfb345e4807014dc72fce94bab0c901054b2370edc060f37132d9b8f0c24d32e98aaaf7048395f20f8d5c506cc017"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-FilmModule-a89a284415b4ce1ba6315665fe3d119fa8ddfb345e4807014dc72fce94bab0c901054b2370edc060f37132d9b8f0c24d32e98aaaf7048395f20f8d5c506cc017"' :
                                            'id="xs-components-links-module-FilmModule-a89a284415b4ce1ba6315665fe3d119fa8ddfb345e4807014dc72fce94bab0c901054b2370edc060f37132d9b8f0c24d32e98aaaf7048395f20f8d5c506cc017"' }>
                                            <li class="link">
                                                <a href="components/CardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FavPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FavPageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FilmPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FilmPageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GenreComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GenreComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ListPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ListPageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SearchPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SearchPageComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#pipes-links-module-FilmModule-a89a284415b4ce1ba6315665fe3d119fa8ddfb345e4807014dc72fce94bab0c901054b2370edc060f37132d9b8f0c24d32e98aaaf7048395f20f8d5c506cc017"' : 'data-bs-target="#xs-pipes-links-module-FilmModule-a89a284415b4ce1ba6315665fe3d119fa8ddfb345e4807014dc72fce94bab0c901054b2370edc060f37132d9b8f0c24d32e98aaaf7048395f20f8d5c506cc017"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-FilmModule-a89a284415b4ce1ba6315665fe3d119fa8ddfb345e4807014dc72fce94bab0c901054b2370edc060f37132d9b8f0c24d32e98aaaf7048395f20f8d5c506cc017"' :
                                            'id="xs-pipes-links-module-FilmModule-a89a284415b4ce1ba6315665fe3d119fa8ddfb345e4807014dc72fce94bab0c901054b2370edc060f37132d9b8f0c24d32e98aaaf7048395f20f8d5c506cc017"' }>
                                            <li class="link">
                                                <a href="pipes/FilmImgPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FilmImgPipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/FilmRoutingModule.html" data-type="entity-link" >FilmRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/MaterialModule.html" data-type="entity-link" >MaterialModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SharedModule.html" data-type="entity-link" >SharedModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-SharedModule-1ea67e9f682c43656e6c25f51ba998796b3ae8566df3a98fbef8bd3f1c6c99f04a5a7d3f590f717fe62737294ca46e8d292b908e6646df1e19f1e4c82bb47cea"' : 'data-bs-target="#xs-components-links-module-SharedModule-1ea67e9f682c43656e6c25f51ba998796b3ae8566df3a98fbef8bd3f1c6c99f04a5a7d3f590f717fe62737294ca46e8d292b908e6646df1e19f1e4c82bb47cea"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SharedModule-1ea67e9f682c43656e6c25f51ba998796b3ae8566df3a98fbef8bd3f1c6c99f04a5a7d3f590f717fe62737294ca46e8d292b908e6646df1e19f1e4c82bb47cea"' :
                                            'id="xs-components-links-module-SharedModule-1ea67e9f682c43656e6c25f51ba998796b3ae8566df3a98fbef8bd3f1c6c99f04a5a7d3f590f717fe62737294ca46e8d292b908e6646df1e19f1e4c82bb47cea"' }>
                                            <li class="link">
                                                <a href="components/Error404PageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >Error404PageComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-UsersModule-4949ff662dd43de8bbe5ecff2696720eda855729b1b20bdfc9ce2bc5398260e711ce2d9c42b9a3b788c03920198c112e30b8d27cb501b7f5c40cf094f3e867f6"' : 'data-bs-target="#xs-components-links-module-UsersModule-4949ff662dd43de8bbe5ecff2696720eda855729b1b20bdfc9ce2bc5398260e711ce2d9c42b9a3b788c03920198c112e30b8d27cb501b7f5c40cf094f3e867f6"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-UsersModule-4949ff662dd43de8bbe5ecff2696720eda855729b1b20bdfc9ce2bc5398260e711ce2d9c42b9a3b788c03920198c112e30b8d27cb501b7f5c40cf094f3e867f6"' :
                                            'id="xs-components-links-module-UsersModule-4949ff662dd43de8bbe5ecff2696720eda855729b1b20bdfc9ce2bc5398260e711ce2d9c42b9a3b788c03920198c112e30b8d27cb501b7f5c40cf094f3e867f6"' }>
                                            <li class="link">
                                                <a href="components/AddUserComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AddUserComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DeleteUserComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DeleteUserComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditUserComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditUserComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UsersComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsuariosRoutingModule.html" data-type="entity-link" >UsuariosRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#components-links"' :
                            'data-bs-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/LayoutPageComponent-1.html" data-type="entity-link" >LayoutPageComponent</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CommonService.html" data-type="entity-link" >CommonService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FavService.html" data-type="entity-link" >FavService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FilmService.html" data-type="entity-link" >FilmService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RolesService.html" data-type="entity-link" >RolesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserService.html" data-type="entity-link" >UserService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AdminGuard.html" data-type="entity-link" >AdminGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/AuthGuardService.html" data-type="entity-link" >AuthGuardService</a>
                            </li>
                            <li class="link">
                                <a href="guards/NoLoginGuard.html" data-type="entity-link" >NoLoginGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/ApiResponse.html" data-type="entity-link" >ApiResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DataFilm.html" data-type="entity-link" >DataFilm</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Film.html" data-type="entity-link" >Film</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Genre.html" data-type="entity-link" >Genre</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Genre-1.html" data-type="entity-link" >Genre</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Page.html" data-type="entity-link" >Page</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Permises.html" data-type="entity-link" >Permises</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Rol.html" data-type="entity-link" >Rol</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SearchResponse.html" data-type="entity-link" >SearchResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/User.html" data-type="entity-link" >User</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});