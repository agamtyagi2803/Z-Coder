browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'copyUrl') {
        browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
            var currentTab = tabs[0];
            if (currentTab) {
                var url = currentTab.url;
                navigator.clipboard.writeText(url).then(() => {
                    console.log('URL copied to clipboard:', url);
                    browser.runtime.sendMessage({ action: 'urlCopied' });
                }).catch((err) => {
                    console.error('Failed to copy URL: ', err);
                });
            } else {
                console.error('No active tab found');
            }
        }).catch((error) => {
            console.error('Error querying tabs: ', error);
        });
    }
});
