// Type definitions for non-npm package firemonkey-browser 2.70
// Project: https://github.com/erosman/support/tree/FireMonkey
// Definitions by: DrakeTDL <https://github.com/DrakeTDL>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 5.1
//
// This definition is based on the API reference of FireMonkey
// https://erosman.github.io/support/content/help.html#Script-API

declare namespace GM {
    type Value = string | boolean | number | object;
    type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'TRACE' | 'OPTIONS' | 'CONNECT';
    type RunAt = 'document_start' | 'document_end' | 'document_idle';
    type USVString = string;
    type PopupAnimationType =
        | 'center'
        | 'slide-left'
        | 'slide-right'
        | 'slide-top'
        | 'slide-bottom'
        | 'panel-left'
        | 'panel-right'
        | 'panel-top'
        | 'panel-bottom';

    interface PopupElement {
        /** Used to change the popup overall style. */
        style: Element;
        /** Used to change the popup overall style. */
        host: Element;
        /** Used to style the main content. */
        content: Element;
        /** Styles the close button */
        close: Element;
        /** Adds styles to the popup overall style. */
        addStyle: (css: string) => { new (): PopupElement };
        /** Adds additional element content to popup box */
        append: (...content: Node[]) => { new (): PopupElement };
        show: () => { new (): PopupElement };
        hide: () => { new (): PopupElement };
        remove: () => void;
    }

    interface InfoPlatform {
        os: 'mac' | 'win' | 'android' | 'cros' | 'linux' | 'openbsd' | 'fuchsia';
        arch: 'arm' | 'x86-32' | 'x86-64';
    }

    interface InfoBrowser {
        name: 'Firefox';
        vendor: string;
        version: string;
        buildID: string;
    }

    interface InfoScript {
        name: string;
        version: string;
        description: string;
        matches: string[];
        excludeMatches: string[];
        includes: string[];
        excludes: string[];
        includeGlobs: string[];
        excludeGlobs: string[];
        grant: string[];
        require: string[];
        /** key/pair consisting of ResourceURL/ResourceName  */
        resources: Record<string, string>;
        'run-at': RunAt;
        runAt: RunAt;
        injectInto: 'page';
        namespace: string;
        metadata: string;
    }

    interface XMLRequest {
        /**
         * The URL to make the request to. May be relative to the current page.
         */
        url: string | URL;
        method?: RequestMethod;
        /** A set of headers to include in the request */
        headers?: HeadersInit;
        /**
         * Data to send in the request body. Usually for POST method requests.
         * If the data field contains form-encoded data, you usually must also
         * set the header `'Content-Type': 'application/x-www-form-urlencoded'`
         * in the `headers` field.
         */
        data?: XMLHttpRequestBodyInit;
        /**
         * A MIME type to specify with the request (e.g.
         * "text/html; charset=ISO-8859-1")
         */
        overrideMimeType?: string;
        /** User name to use for authentication purposes. */
        user?: string;
        /** Password to use for authentication purposes */
        password?: string;
        /**
         * The number of milliseconds to wait before terminating the call. Zero
         * (the default) means wait forever.
         */
        timeout?: number;
        withCredentials?: boolean;
        responseType?: XMLHttpRequestResponseType;
        /** if true, no cookie will be sent with the request */
        anonymous?: boolean;

        /** Called when the request has completed successfully */
        onload?(response: XMLResponse): void;
        /** Called if an error occurs while processing the request */
        onerror?(response: XMLResponse): void;
        /** Called if/when the request times out */
        ontimeout?(response: XMLResponse): void;
        /** Called when the request is aborted */
        onabort?(response: XMLResponse): void;
    }

    interface XMLResponse {
        readonly readyState: 1 | 2 | 3 | 4;
        readonly response: any;
        readonly responseHeaders: string;
        readonly responseText: string;
        readonly responseType?: string;
        readonly responseURL?: string;
        readonly responseXML: Document | undefined;
        readonly status: number;
        readonly statusText: string;
        /** clone of responseURL for GM|TM|VM compatibility */
        readonly finalUrl: string;
    }

    interface FetchRequest {
        /** @default 'GET' */
        method?: RequestMethod;
        /** A set of headers to include in the request */
        headers?: HeadersInit;
        body?: XMLHttpRequestBodyInit | USVString;
        mode?: RequestMode;
        credentials?: RequestCredentials;
        cache?: RequestCache;
        redirect?: RequestRedirect;
        /**
         *  A USVString
         * @default 'client'
         */
        referrer?: 'no-referrer' | 'client' | URL;
        referrerPolicy?: ReferrerPolicy;
        /** Contains the subresource integrity value of the request */
        integrity?: string;
        /** The keepalive option can be used to allow the request to outlive the page. */
        keepalive?: boolean;
        /**
         * An AbortSignal object instance;
         * allows you to communicate with a fetch request and abort it if desired via an AbortController
         */
        signal?: AbortSignal | string;
        /** @default 'text' */
        responseType?: XMLHttpRequestResponseType | 'formData';
        /** If true, no cookie will be sent with the request. */
        anonymous?: boolean;
    }

    interface FetchResponse {
        readonly headers: Headers;
        readonly bodyUsed: boolean;
        readonly ok: boolean;
        readonly redirected: boolean;
        readonly status: number;
        readonly statusText: string;
        readonly type: string;
        readonly url: string;

        // One of the following properties based on responseType, if method is not HEAD
        readonly text?: string;
        readonly json?: JSON;
        readonly blob?: Blob;
        readonly arrayBuffer?: ArrayBuffer;
        readonly formData?: FormData;
    }
}

/**
 * An alias for `window.wrappedJSObject`.
 * @description
 * You can also use `window.wrappedJSObject` or `window.eval()` to access page JavaScript globals or to create function & objects in `page` context.
 * @see {@link https://erosman.github.io/support/content/help.html#unsafeWindow}
 */
declare var unsafeWindow: Window;

/**
 * exports content script function to the page script's scope, so the page script can call it.
 * @param func
 * The function to export.
 * @param targetScope
 * The object to attach the function to. This does not have to be the global window object:
 * it could be any other object in the target window, or an object created by the caller.
 * @param options.defineAs
 * determines the name of the function in _targetScope_.
 * If this is omitted, you need to assign the return value of exportFunction() to an object in the target scope.
 * @param options.allowCrossOriginArguments
 * do not check that arguments to the exported function are subsumed by the
 * caller: this allows the caller to pass objects with a different origin into the exported function,
 * which can then use its privileged status to make cross-origin requests with them
 * @returns
 * A function which has been created in the target context.
 * @example
 * // defines a function, then exports it to a content window
 * exportFunction(notify, window, {defineAs: 'notify'});
 * @example
 * // Instead of using defineAs, the script can assign the result of exportFunction to an object in the target scope
 * window.notify = exportFunction(notify, window);
 * @see {@link https://erosman.github.io/support/content/help.html}
 * @see {@link https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Sharing_objects_with_page_scripts#exportfunction}
 */
declare function exportFunction<Function extends () => void>(
    func: Function,
    targetScope: object,
    options?: { defineAs?: string; allowCrossOriginArguments?: boolean },
): Function;

/**
 * This function provides a safe way to take an object defined in a privileged scope and
 * create a structured clone of it in a less-privileged scope.
 * @param obj
 * The object to clone.
 * @param targetScope
 * The object to attach the object to.
 * @param options.cloneFunctions
 * if functions should be cloned. Cloned functions have the same semantics as functions exported using exportFunction()
 * @param options.wrapReflectors
 * if objects reflected from C++, such as DOM objects, should be cloned.
 * @returns
 * A reference to the cloned object.
 * @example
 * // object without methods
 * unsafeWindow.messenger = cloneInto(obj, unsafeWindow);
 * @example
 * // object with methods
 * unsafeWindow.messenger = cloneInto(obj, unsafeWindow, {cloneFunctions: true});
 * @see {@link https://erosman.github.io/support/content/help.html}
 * @see {@link https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Sharing_objects_with_page_scripts#cloneinto}
 */
declare function cloneInto<Object extends Record<string, any>>(
    obj: Object,
    targetScope: object,
    options?: { cloneFunctions?: boolean; wrapReflectors?: boolean },
): Object;

//#region GM3 style APIs

declare var GM: {
    /**
     * Utility function to appends and returns an element with the specified attributes
     * @param parent
     * If omitted, it will be set as:
     *  - `document.head)` || `document.body` for 'script', 'link', 'style', 'meta' tags
     *  - `document.body)` || `document.documentElement` for others
     * @param tag
     * Any valid HTML tag
     * @param attr
     * Object with any valid attribute and/or textContent
     * @example
     * // loading an external script
     * const elem = GM.addElement('script', {src: 'https://....'});
     * elem.onload = () => console.log(elem, 'loaded');
     * @example
     * // appending to shadowRoot
     * const elem = GM_addElement(parentElement.shadowRoot, 'iframe', {src: 'https://....'});
     * @example
     * // appending to DOM
     * const elem = GM_addElement(
     *   parentElement,
     *   'a',
     *   {href: 'https://....', title: 'Some title', target: '_blank', textContent: 'Some text'}
     * );
     * @see {@link https://erosman.github.io/support/content/help.html#addElement}
     */
    addElement(tag: string, attr: Record<string, string>): HTMLElement | undefined;
    addElement(parent: Node | ShadowRoot, tag: string, attr: Record<string, string>): HTMLElement | undefined;

    /**
     * Utility function to inject script element.
     * @param js 
     * A string that contains javascript code.
     * @example
     * const js = `function sum(x, y) {
     *   return x + y;
     * }`;
     * GM_addScript(js);
     * @example
     * function someFunc() {
     *   sayHello() { alert('Hello, world! (named)')}
     * }
     * GM.addScript('(' + someFunc + ')();');
     * @see {@link https://erosman.github.io/support/content/help.html#addScript}
     */
    addScript(js: string): void;

    /**
     * Utility function to inject style element.
     * @param css
     * A string that contains css code.
     * @example
     * const css = `body {
     *   border-top: 2px solid grey;
     * }`;
     * GM.addStyle(css);
     * @see {@link https://erosman.github.io/support/content/help.html#addStyle}
     */
    addStyle(css: string): void;

    /**
     * Script storage change listener that returns the key as listener ID
     * @see {@link https://erosman.github.io/support/content/help.html#addValueChangeListener}
     */
    addValueChangeListener<ListenerId extends string>(
        key: string,
        callback: (key: string, oldValue: string, newValue: string, remote: boolean) => void,
    ): ListenerId;

    /**
     * Utility function to first convert the string/object to a blob and
     * then to a string containing a URL representing the object given in the
     * parameter. The API was created to facilitate GM import.
     * @param option.type
     * Requires MIMI type value. Defaults to 'text/javascript'
     * @returns
     *  A string containing an object URL that can be used to reference the contents of the specified source object.
     * @see {@link https://erosman.github.io/support/content/help.html#createObjectURL}
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL_static}
     * @experimental
     */
    createObjectURL(val: string, option?: { type: string }): string;

    /**
     * Deletes an existing name / value pair from storage.
     * @see {@link https://erosman.github.io/support/content/help.html#deleteValue}
     */
    deleteValue(key: string): Promise<void>;
    deleteValue(key: string): void;

    /**
     * Simple file download from the Internet.
     * @param url
     * Must be an absolute/relative path to the file (not on ftp/ftps).
     * @see {@link https://erosman.github.io/support/content/help.html#download}
     */
    download(url: URL | string, filename?: string): Promise<number | undefined>;

    /**
     * An API is based on the
     * {@link https://developer.mozilla.org/docs/Web/API/WindowOrWorkerGlobalScope/fetch JavaScript Fetch API}
     * which provides the new Promise based interface for fetching resources (including
     * {@link https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy across the network}).
     * It will seem familiar to anyone who has used
     * XMLHttpRequest, but it provides a more powerful and flexible feature set
     * @see {@link https://erosman.github.io/support/content/help.html#fetch}
     */
    fetch(url: string | URL, init?: GM.FetchRequest): Promise<Response>;

    /**
     * If Metadata Block contains `@resource` and GM.getResourceText, text `@resource` targets (not images) are
     * fetched at the registration time and cached.
     * Consequently, the latest version of the file will always be fetched
     * @see {@link https://erosman.github.io/support/content/help.html#getResourceText}
     */
    getResourceText(resourceName: string): Promise<string>;
    getResourceText(resourceName: string): string;

    /**
     * @returns
     * `@resource` url as string
     * @see {@link https://erosman.github.io/support/content/help.html#getResourceUrl}
     */
    getResourceUrl(resourceName: string): Promise<string | undefined>;
    getResourceUrl(resourceName: string): string | undefined;

    /**
     * Retrieves a value that was set with `GM.setValue`
     * @see {@link https://erosman.github.io/support/content/help.html#getValue}
     */
    getValue(key: string): Promise<GM.Value>;
    getValue(key: string): GM.Value;
    getValue<TValue = GM.Value>(key: string, defaultValue?: TValue): Promise<TValue>;
    getValue<TValue = GM.Value>(key: string, defaultValue?: TValue): TValue;

    /**
     * Import internal or remote dependency-free modules
     * @see {@link https://erosman.github.io/support/content/help.html#import}
     * @experimental
     */
    import(
        url: string,
        option?: {
            type:
                | 'javascript'
                | 'PSL'
                | 'cjs'
                | 'mjs'
                | 'json'
                | 'css'
                | 'text'
                | 'gif'
                | 'jpeg'
                | 'jpg'
                | 'png'
                | 'webp'
                | 'html'
                | 'xhtml'
                | 'xml'
                | 'svg';
        },
    ): Promise<Record<string, unknown> | undefined>;

    /**
     * An object containing info about FireMonkey and the current running script.
     * @see {@link https://erosman.github.io/support/content/help.html#info}
     */
    info: {
        /**
         * The name of the user script engine handling this script's execution.
         * The string `FireMonkey`
         */
        scriptHandler: 'FireMonkey';
        /** The version of FireMonkey, a string e.g. `2.60` */
        version: string;
        /** An object containing data about the currently running platform */
        platform: GM.InfoPlatform;
        /** An object containing data about the currently running browser */
        browser: GM.InfoBrowser;
        /**
         * A string, the entire literal Metadata Block (without the delimiters)
         * for the currently running script
         */
        scriptMetaStr: string;
        /** An object containing data about the currently running script */
        script: GM.InfoScript;
    };

    /**
     * Retrieves an array of preference names that this script has stored
     * @see {@link https://erosman.github.io/support/content/help.html#listValues}
     */
    listValues(): Promise<string[]>;
    listValues(): string[];

    /**
     * The API is added for convenience.
     * @see {@link https://erosman.github.io/support/content/help.html#log}
     */
    log(...data: any[]): void;

    /**
     * Displays a notification to the user, using the underlying operating system's notification mechanism
     * @param title
     * This param isn't used, title is same as script
     * @param image
     * A data URL, blob URL or http/https URL
     * @param onclick
     * This param isn't used
     * @see {@link https://erosman.github.io/support/content/help.html#notification}
     */
    notification(text: string, title?: string, image?: Blob | string, onclick?: () => void): Promise<string>;

    /**
     * Opens the specified URL in a new tab.
     * @param opt
     * Open in background, defaults true
     * @see {@link https://erosman.github.io/support/content/help.html#openInTab}
     */
    openInTab(url: string, opt?: boolean | { active: boolean }): Promise<boolean>;

    /**
     * utility function to create a shadow DOM popup blank element with animation that can be customized
     * @see {@link https://erosman.github.io/support/content/help.html#popup}
     */
    popup(options?: { type: GM.PopupAnimationType; modal: boolean }): GM.PopupElement;

    /**
     * Adds an item to the User Script Commands menu.
     * @example
     * // anonymous function
     * GM_registerMenuCommand('Hello, world (anon)', () => { alert('Hello, world! (anon)')});
     * @example
     * // named function
     * function sayHello() { alert('Hello, world! (named)')}
     * GM.registerMenuCommand('Hello, world (named)', sayHello);
     * @see {@link https://erosman.github.io/support/content/help.html#registerMenuCommand}
     */
    registerMenuCommand(name: string, onClick: () => void): void;

    /**
     * Remove storage change listener for key
     * @see {@link https://erosman.github.io/support/content/help.html#removeValueChangeListener}
     */
    removeValueChangeListener(key: string): void;

    /**
     * Sets the current contents of the operating system's clipboard
     * @param data
     * Can be either a plain string or data.
     * @param type
     * If `data` parameter is something other than plain text, then you must specifiy a MIME type that matches data.
     * @see {@link https://erosman.github.io/support/content/help.html#setClipboard}
     */
    setClipboard(data: string, type: string): Promise<void>;

    /**
     * Allows user script authors to persist simple values across page loads and
     * across origins. Strings, booleans, and integers are currently the only allowed data types.
     * @see {@link https://erosman.github.io/support/content/help.html#setValue}
     */
    setValue(key: string, value: GM.Value): Promise<void>;
    setValue(key: string, value: GM.Value): void;

    /**
     * removes an item from the User Script Commands menu.
     * @see {@link https://erosman.github.io/support/content/help.html#unregisterMenuCommand}
     */
    unregisterMenuCommand(name: string): void;

    /**
     * Performs a similar function to the standard XMLHttpRequest object, but
     * allows these requests to cross the
     * {@link https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy same origin policy} boundaries.
     * @see {@link https://erosman.github.io/support/content/help.html#xmlHttpRequest}
     */
    xmlHttpRequest(init: GM.XMLRequest): void;
};

//#endregion

//#region GM4 style APIs

declare var GM_addElement: typeof GM.addElement;
declare var GM_addScript: typeof GM.addScript;
declare var GM_addStyle: typeof GM.addStyle;
declare var GM_addValueChangeListener: typeof GM.addValueChangeListener;
declare var GM_createObjectURL: typeof GM.createObjectURL;
declare var GM_deleteValue: typeof GM.deleteValue;
declare var GM_download: typeof GM.download;
declare var GM_fetch: typeof GM.fetch;
declare var GM_getResourceText: typeof GM.getResourceText;
declare var GM_getResourceURL: typeof GM.getResourceUrl;
declare var GM_getValue: typeof GM.getValue;
declare var GM_info: typeof GM.info;
declare var GM_listValues: typeof GM.listValues;
declare var GM_log: typeof GM.log;
declare var GM_notification: typeof GM.notification;
declare var GM_openInTab: typeof GM.openInTab;
declare var GM_popup: typeof GM.popup;
declare var GM_registerMenuCommand: typeof GM.registerMenuCommand;
declare var GM_removeValueChangeListener: typeof GM.removeValueChangeListener;
declare var GM_setClipboard: typeof GM.setClipboard;
declare var GM_setValue: typeof GM.setValue;
declare var GM_unregisterMenuCommand: typeof GM.unregisterMenuCommand;
declare var GM_xmlhttpRequest: typeof GM.xmlHttpRequest;

//#endregion
