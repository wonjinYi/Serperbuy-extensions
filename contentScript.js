(async () => {
    const host = location.host;
    const pageType = (location.pathname.split('/'))[1] // detailView or workapp

    const targetHost = 'suite-anno.superb-ai.com';
    const targetType = 'workapp';

    if ((host === targetHost) && (pageType === targetType)) {
        const src = chrome.runtime.getURL('./main.js');
        const contentScript = await import(src);
        contentScript.main();
    }
})();