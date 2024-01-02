import { NavigationEnd, NavigationStart, Router } from "@angular/router";
import {
  Component,
  Inject,
  OnDestroy,
  OnInit,
  ElementRef,
  Renderer2,
  ViewChild,
} from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { Title } from "@angular/platform-browser";

import { Subject } from "rxjs";
import { filter, takeUntil } from "rxjs/operators";
import { TranslateService } from "@ngx-translate/core";
import * as Waves from "node-waves";

import { CoreMenuService } from "@core/components/core-menu/core-menu.service";
import { CoreSidebarService } from "@core/components/core-sidebar/core-sidebar.service";
import { CoreConfigService } from "@core/services/config.service";
import { CoreLoadingScreenService } from "@core/services/loading-screen.service";
import { CoreTranslationService } from "@core/services/translation.service";

import { menu } from "app/menu/menu";
import { locale as menuEnglish } from "app/menu/i18n/en";
import { locale as menuFrench } from "app/menu/i18n/fr";
import { locale as menuGerman } from "app/menu/i18n/de";
import { locale as menuPortuguese } from "app/menu/i18n/pt";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit, OnDestroy {
  coreConfig: any;
  menu: any;
  defaultLanguage: "fr"; // This language will be used as a fallback when a translation isn't found in the current language
  appLanguage: "fr"; // Set application default language i.e fr
  progressBar: boolean;
  // Private
  private _unsubscribeAll: Subject<any>;

  constructor(
    @Inject(DOCUMENT) private document: any,
    private _title: Title,
    private _renderer: Renderer2,
    private _elementRef: ElementRef,
    public _coreConfigService: CoreConfigService,
    private _coreSidebarService: CoreSidebarService,
    private _coreLoadingScreenService: CoreLoadingScreenService,
    private _coreMenuService: CoreMenuService,
    private _coreTranslationService: CoreTranslationService,
    private _translateService: TranslateService,
    private _router: Router,
    private _modalService: NgbModal
  ) {
    // Get the application main menu
    this.menu = menu;

    // Register the menu to the menu service
    this._coreMenuService.register("main", this.menu);
    // Register the menu to the menu service
    this._coreMenuService.register("main", this.menu);

    // Set the main menu as our current menu
    this._coreMenuService.setCurrentMenu("main");
    // Set the main menu as our current menu
    this._coreMenuService.setCurrentMenu("main");

    // Add languages to the translation service
    this._translateService.addLangs(["en", "fr", "de", "pt", "ar"]);

    // This language will be used as a fallback when a translation isn't found in the current language
    this._translateService.setDefaultLang("fr");

    const browserLang = this._translateService.getBrowserLang();

    this._translateService.use(browserLang.match(/en|ar/) ? browserLang : "en");

    // Set the translations for the menu
    this._coreTranslationService.translate(
      menuEnglish,
      menuFrench,
      menuGerman,
      menuPortuguese
    );

    // Set the private defaults
    this._unsubscribeAll = new Subject();
    // Set the private defaults
    this._unsubscribeAll = new Subject();

    // Subscribe on route change for the loader
    this._router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((_: NavigationEnd) => {
        this.closeLoader();
      });

    // Subscribe on route start
    this._router.events
      .pipe(filter((event) => event instanceof NavigationStart))
      .subscribe((_: NavigationStart) => {
        this.showLoader();
      });
  }

  showLoader() {
    console.log("SHOW LOADER")
    let load = window.document.getElementById("transition-load");
    if (load) {
      load.style.display = "block";
    }
  }

  closeLoader() {
    console.log("closeLoader LOADER")

    let load = window.document.getElementById("transition-load");
    if (load) {
      load.style.display = "none";
    }
  }

  // Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------
  // Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Init wave effect (Ripple effect)
    Waves.init();
    /**
     * On init
     */
    // Init wave effect (Ripple effect)
    Waves.init();

    // Subscribe to config changes
    this._coreConfigService.config
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((config) => {
        this.coreConfig = config;
        // Subscribe to config changes
        this._coreConfigService.config
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe((config) => {
            this.coreConfig = config;

            // ? Use app-config.ts file to set default language
            const appLanguage = this.coreConfig.app.appLanguage || "en";
            this._translateService.use(appLanguage);

            // ? OR
            // ? User the current browser lang if available, if undefined use 'en'
            // const browserLang = this._translateService.getBrowserLang();
            // this._translateService.use(browserLang.match(/en|fr|de|pt/) ? browserLang : 'en');
            // ? OR
            // ? User the current browser lang if available, if undefined use 'en'
            // const browserLang = this._translateService.getBrowserLang();
            // this._translateService.use(browserLang.match(/en|fr|de|pt/) ? browserLang : 'en');

            /**
             * ! Fix : ngxTranslate
             * ----------------------------------------------------------------------------------------------------
             */
            /**
             * ! Fix : ngxTranslate
             * ----------------------------------------------------------------------------------------------------
             */

            /**
             *
             * Using different language than the default ('en') one i.e French?
             * In this case, you may find the issue where application is not properly translated when your app is initialized.
             *
             * It's due to ngxTranslate module and below is a fix for that.
             * Eventually we will move to the multi language implementation over to the Angular's core language service.
             *
             **/
            /**
             *
             * Using different language than the default ('en') one i.e French?
             * In this case, you may find the issue where application is not properly translated when your app is initialized.
             *
             * It's due to ngxTranslate module and below is a fix for that.
             * Eventually we will move to the multi language implementation over to the Angular's core language service.
             *
             **/

            // Set the default language to 'en' and then back to 'fr'.
            // Set the default language to 'en' and then back to 'fr'.

            setTimeout(() => {
              this._translateService.setDefaultLang("fr");
              this._translateService.setDefaultLang(appLanguage);
            });
            setTimeout(() => {
              this._translateService.setDefaultLang("fr");
              this._translateService.setDefaultLang(appLanguage);
            });

            /**
             * !Fix: ngxTranslate
             * ----------------------------------------------------------------------------------------------------
             */
            /**
             * !Fix: ngxTranslate
             * ----------------------------------------------------------------------------------------------------
             */

            // Layout
            //--------
            // Layout
            //--------

            // Remove default classes first
            this._elementRef.nativeElement.classList.remove(
              "vertical-layout",
              "vertical-menu-modern",
              "horizontal-layout",
              "horizontal-menu"
            );
            // Add class based on config options
            if (this.coreConfig.layout.type === "vertical") {
              this._elementRef.nativeElement.classList.add(
                "vertical-layout",
                "vertical-menu-modern"
              );
            } else if (this.coreConfig.layout.type === "horizontal") {
              this._elementRef.nativeElement.classList.add(
                "horizontal-layout",
                "horizontal-menu"
              );
            }

            // Navbar
            //--------

            // Remove default classes first
            this._elementRef.nativeElement.classList.remove(
              "navbar-floating",
              "navbar-static",
              "navbar-sticky",
              "navbar-hidden"
            );

            // Add class based on config options
            if (this.coreConfig.layout.navbar.type === "navbar-static-top") {
              this._elementRef.nativeElement.classList.add("navbar-static");
            } else if (this.coreConfig.layout.navbar.type === "fixed-top") {
              this._elementRef.nativeElement.classList.add("navbar-sticky");
            } else if (this.coreConfig.layout.navbar.type === "floating-nav") {
              this._elementRef.nativeElement.classList.add("navbar-floating");
            } else {
              this._elementRef.nativeElement.classList.add("navbar-hidden");
            }

            // Footer
            //--------

            // Remove default classes first
            this._elementRef.nativeElement.classList.remove(
              "footer-fixed",
              "footer-static",
              "footer-hidden"
            );

            // Add class based on config options
            if (this.coreConfig.layout.footer.type === "footer-sticky") {
              this._elementRef.nativeElement.classList.add("footer-fixed");
            } else if (this.coreConfig.layout.footer.type === "footer-static") {
              this._elementRef.nativeElement.classList.add("footer-static");
            } else {
              this._elementRef.nativeElement.classList.add("footer-hidden");
            }

            // Blank layout
            if (
              this.coreConfig.layout.menu.hidden &&
              this.coreConfig.layout.navbar.hidden &&
              this.coreConfig.layout.footer.hidden
            ) {
              this._elementRef.nativeElement.classList.add("blank-page");
              // ! Fix: Transition issue while coming from blank page
              this._renderer.setAttribute(
                this._elementRef.nativeElement.getElementsByClassName(
                  "app-content"
                )[0],
                "style",
                "transition:none"
              );
            } else {
              this._elementRef.nativeElement.classList.remove("blank-page");
              // ! Fix: Transition issue while coming from blank page
              setTimeout(() => {
                this._renderer.setAttribute(
                  this._elementRef.nativeElement.getElementsByClassName(
                    "app-content"
                  )[0],
                  "style",
                  "transition:300ms ease all"
                );
              }, 0);
              // If navbar hidden
              if (this.coreConfig.layout.navbar.hidden) {
                this._elementRef.nativeElement.classList.add("navbar-hidden");
              }
              // Menu (Vertical menu hidden)
              if (this.coreConfig.layout.menu.hidden) {
                this._renderer.setAttribute(
                  this._elementRef.nativeElement,
                  "data-col",
                  "1-column"
                );
              } else {
                this._renderer.removeAttribute(
                  this._elementRef.nativeElement,
                  "data-col"
                );
              }
              // Footer
              if (this.coreConfig.layout.footer.hidden) {
                this._elementRef.nativeElement.classList.add("footer-hidden");
              }
            }
            // Blank layout
            if (
              this.coreConfig.layout.menu.hidden &&
              this.coreConfig.layout.navbar.hidden &&
              this.coreConfig.layout.footer.hidden
            ) {
              this._elementRef.nativeElement.classList.add("blank-page");
              // ! Fix: Transition issue while coming from blank page
              this._renderer.setAttribute(
                this._elementRef.nativeElement.getElementsByClassName(
                  "app-content"
                )[0],
                "style",
                "transition:none"
              );
            } else {
              this._elementRef.nativeElement.classList.remove("blank-page");
              // ! Fix: Transition issue while coming from blank page
              setTimeout(() => {
                this._renderer.setAttribute(
                  this._elementRef.nativeElement.getElementsByClassName(
                    "app-content"
                  )[0],
                  "style",
                  "transition:300ms ease all"
                );
              }, 0);
              // If navbar hidden
              if (this.coreConfig.layout.navbar.hidden) {
                this._elementRef.nativeElement.classList.add("navbar-hidden");
              }
              // Menu (Vertical menu hidden)
              if (this.coreConfig.layout.menu.hidden) {
                this._renderer.setAttribute(
                  this._elementRef.nativeElement,
                  "data-col",
                  "1-column"
                );
              } else {
                this._renderer.removeAttribute(
                  this._elementRef.nativeElement,
                  "data-col"
                );
              }
              // Footer
              if (this.coreConfig.layout.footer.hidden) {
                this._elementRef.nativeElement.classList.add("footer-hidden");
              }
            }

            // Skin Class (Adding to body as it requires highest priority)
            if (
              this.coreConfig.layout.skin !== "" &&
              this.coreConfig.layout.skin !== undefined
            ) {
              this.document.body.classList.remove(
                "default-layout",
                "bordered-layout",
                "dark-layout",
                "semi-dark-layout"
              );
              this.document.body.classList.add(
                this.coreConfig.layout.skin + "-layout"
              );
            }
          });
      });

    // Set the application page title
    this._title.setTitle(this.coreConfig.app.appTitle);

    setTimeout(() => {
      this._coreLoadingScreenService.hide();
    }, 3000);
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  // Public methods
  // -----------------------------------------------------------------------------------------------------
  // Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Toggle sidebar open
   *
   * @param key
   */
  toggleSidebar(key): void {
    this._coreSidebarService.getSidebarRegistry(key).toggleOpen();
  }
}
