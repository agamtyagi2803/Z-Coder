document.addEventListener('DOMContentLoaded', function() {
    var copyButton = document.getElementById('copyButton');
    var statusMessage = document.getElementById('statusMessage');
    copyButton.addEventListener('click', function() {
        browser.runtime.sendMessage({ action: 'copyUrl' });
    });

    browser.runtime.onMessage.addListener((message) => {
        if (message.action === 'urlCopied') {
            statusMessage.style.display = 'block';
            setTimeout(() => {
                statusMessage.style.display = 'none';
            }, 2000);
        }
    });
});
