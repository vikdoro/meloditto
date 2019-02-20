// Force Polymer to skip font import
window.polymerSkipLoadingFontRoboto = true;

document.addEventListener('deviceready', () => {
    cordova.plugins.backgroundMode.enable();
    // Register the non-renewing subscription product with the store. You must
    // create this in iTunes Connect.
    store.register({
        id: "melowise1",
        type: store.NON_CONSUMABLE
    });

    store.when("melowise1").registered(function (p) {
        // Write a function that identifies this product ID as having been
        // initiated to purchase.
        console.log('product registered', p);
        // my_app_utils.setIsProductPurchaseInitiated("melowise1", true);
    });
    // Called when store.order("my_product_id") is executed. The user can
    // still cancel after this has been called.
    store.when("melowise1").initiated(function (p) {
        // Write a function that identifies this product ID as having been
        // initiated to purchase.
        console.log('order initiated');
        // my_app_utils.setIsProductPurchaseInitiated("melowise1", true);
    });

    // Called when the user has cancelled purchasing the product, after it has
    // been initiated.
    store.when("melowise1").cancelled(function (p) {
        console.log('order cancelled');
        // Write a function that marks this product ID as not being purchased
        // my_app_utils.setIsProductPurchaseInitiated("melowise1", false);
    });

    // Called when the product purchase is finished. This gets called every time
    // the app starts after the product has been purchased, so we use a helper
    // function to determine if we actually need to purchase the non-renewing
    // subscription on our own server.
    store.when("melowise1").approved(function (p) {
        console.log('order approved, premium active', p);
        document.querySelector('pie-app').set('premiumUser', true);
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

    console.log('store refresh');
    // Refresh the store to start everything
    store.refresh();
}, false);