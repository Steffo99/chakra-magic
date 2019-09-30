let this_browser = null;
if(!this_browser) try { this_browser = browser; } catch(e){}
if(!this_browser)try { this_browser = chrome; } catch(e) {}

function openPage() {
    this_browser.tabs.create({
        url: "https://steamcommunity.com/my/gcpd/570/?category=Account&tab=MatchPlayerReportIncoming"
    });
}

this_browser.browserAction.onClicked.addListener(openPage);