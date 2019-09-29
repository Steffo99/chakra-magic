function openPage() {
    browser.tabs.create({
        url: "https://steamcommunity.com/my/gcpd/570/?category=Account&tab=MatchPlayerReportIncoming"
    });
}

browser.browserAction.onClicked.addListener(openPage);