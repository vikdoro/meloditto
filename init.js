// Force Polymer to skip font import
window.polymerSkipLoadingFontRoboto = true;
document.addEventListener('deviceready', () => {
    cordova.plugins.backgroundMode.enable();
    // Register the non-renewing subscription product with the store. You must
    // create this in iTunes Connect.
    store.register({
        id: "premium1",
        type: store.NON_CONSUMABLE
    });

    // Called when store.order("my_product_id") is executed. The user can
    // still cancel after this has been called.
    store.when("premium1").initiated(function (p) {
        // Write a function that identifies this product ID as having been
        // initiated to purchase.
        // my_app_utils.setIsProductPurchaseInitiated("premium1", true);
    });

    // Called when the user has cancelled purchasing the product, after it has
    // been initiated.
    store.when("premium1").cancelled(function (p) {
        // Write a function that marks this product ID as not being purchased
        // my_app_utils.setIsProductPurchaseInitiated("premium1", false);
    });

    // Called when the product purchase is finished. This gets called every time
    // the app starts after the product has been purchased, so we use a helper
    // function to determine if we actually need to purchase the non-renewing
    // subscription on our own server.
    store.when("premium1").approved(function (p) {
        console.log('after approved', p);
    });

    // Errors communicating with the iTunes server happen quite often,
    // so it's highly recommended you implement some feedback to the user.
    store.error(function (e) {
        console.log("storekit ERROR " + e.code + ": " + e.message);
        // my_app_utils.alertUserAboutITunesError({
        //     title: 'Subscription Purchase Error',
        //     template: 'We could not reach the Apple iTunes ordering server. ' +
        //         'Please ensure you are connected to the Internet and try ' +
        //         'again.'
        // });
    });

    // Refresh the store to start everything
    store.refresh();
}, false);