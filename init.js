// Force Polymer to skip font import
window.polymerSkipLoadingFontRoboto = true;

let gameComponent;

document.addEventListener('deviceready', () => {
    // Cordova fires a 'pause' event when app goes to the background
    document.addEventListener('pause', onPause, false);    
}, false);

// Pause audio when quitting the app
function onPause() {
    gameComponent.stopPlayback();
}

function BlockMove(event) { 
    event.preventDefault(); 
  }

// When the game component is ready, run the callback
document.addEventListener('pie-game-connected', () => {
    gameComponent = document.getElementById('app').getGameComponent();

    // If the tutorial has been completed, don't run
    if (localStorage.getItem('tutorial-done')) {
        return;
    }

    // Initialize tutorial
    gameComponent.tutorial = new Tutorial(gameComponent);
    gameComponent.tutorial.stepList = [
        {
            userTarget: 'play-button',
            tooltipText: 'Tap here for a melody!',
            tooltipTarget: 'play-button'
        },
        {
            appEvent: 'playback-changed'
        },
        {
            userTarget: 'note-0-container',
            tooltipTarget: 'note-0-container',
            tooltipText: 'OK, the melody had two notes.<br> Can this be the first?'
        },
        {
            tooltipTarget: 'note-0',
            tooltipText: 'That\'s right!',
            duration: 1500
        },
        {
            userTarget: 'note-3-container',
            tooltipTarget: 'note-3',
            tooltipText: 'This the second?'
        },
        {
            tooltipTarget: 'note-3',
            tooltipText: 'Excellent! Ready to go!',
            duration: 1800
        },
    ];
});

let visibilityHidden, visibilityChange;
    if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support 
        visibilityHidden = "hidden";
        visibilityChange = "visibilitychange";
    } else if (typeof document.mozHidden !== "undefined") {
        visibilityHidden = "mozHidden";
        visibilityChange = "mozvisibilitychange";
    } else if (typeof document.msHidden !== "undefined") {
        visibilityHidden = "msHidden";
        visibilityChange = "msvisibilitychange";
    } else if (typeof document.webkitHidden !== "undefined") {
        visibilityHidden = "webkitHidden";
        visibilityChange = "webkitvisibilitychange";
    }

window.onpagehide = handleVisibilityChange;

// If the page is hidden, stop the playback
function handleVisibilityChange(e) {
    if (document[visibilityHidden]) {
        gameComponent.stopPlayback();
    }
}

// Handle page visibility change   
document.addEventListener(visibilityChange, handleVisibilityChange, false);

