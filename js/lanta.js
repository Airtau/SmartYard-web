    postLoadingStarted = function() {
        if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.loadingStartedHandler) {
                window.webkit.messageHandlers.loadingStartedHandler.postMessage({
                    "loading": "started"
                });
        }
    }

    postloadingFinished = function() {
        if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.loadingFinishedHandler) {
                window.webkit.messageHandlers.loadingFinishedHandler.postMessage({
                    "loading": "finished"
                });
        }
    }

    postRefreshParent = function(timeout) {
        if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.refreshParentHandler) {
                window.webkit.messageHandlers.refreshParentHandler.postMessage({
                    "timeout": timeout
                });
        }
    }