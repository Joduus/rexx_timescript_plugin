/*
 * @copyright Copyright (c) rexx systems GmbH
 *
 * @link https://www.rexx-systems.com
 *
 * This software is protected by copyright.
 *
 * It is not permitted to copy, present, send, lease and / or lend the website
 * or individual parts thereof without the consent of the copyright holder.
 *
 * Contravention of this law will result in proceedings under criminal
 * or civil law.
 *
 * All rights reserved.
 */

chrome.runtime.onInstalled.addListener(function() {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [
                new chrome.declarativeContent.PageStateMatcher({
                    pageUrl: {
                        hostContains: 'hrbox',
                        pathContains: 'calendar.php'
                    },
                })
            ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }])
    });

    chrome.storage.onChanged.addListener(function (changes, namespace) {
        for (let key in changes) {
            let storageChange = changes[key];
            console.log('Storage key "%s" in namespace "%s" changed. ' +
                'Old value was "%s", new value is "%s".',
                key,
                namespace,
                storageChange.oldValue,
                storageChange.newValue);
        }
    });
});
