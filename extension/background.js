let thisBrowser = null;
if(!thisBrowser) try { thisBrowser = browser; } catch(e) {}
if(!thisBrowser) try { thisBrowser = chrome; } catch(e) {}

function openPage() {
    thisBrowser.tabs.create({
        url: "https://steamcommunity.com/my/gcpd/570/?category=Account&tab=MatchPlayerReportIncoming"
    });
}

thisBrowser.browserAction.onClicked.addListener(openPage);
