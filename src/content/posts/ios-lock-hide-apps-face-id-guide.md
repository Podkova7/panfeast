---
title: "How to Lock and Hide Apps with Face ID on iPhone and iPad"
slug: "ios-lock-hide-apps-face-id-guide"
seoTitle: "Lock and Hide Apps with Face ID: iOS Privacy Guide"
publishDate: 2026-01-29T08:00:00Z
date: 2026-01-29T08:00:00Z
updatedDate: 2026-01-29T08:00:00Z
author: "Sylvie Fox"
category: "iOS Guides"
categories: ["iOS Guides","iPhone Tips"]
tags: ["iOS","Privacy","Face ID","Security","Apps"]
relatedSlugs: ["ios-privacy-settings-hardening","ios-accessibility-back-tap-assistivetouch-guide","apple-passkeys-setup-security-guide"]
description: "Protect sensitive banking, health, and messaging apps by locking them behind Face ID or hiding them completely in the Hidden App folder."
featuredImageAlt: "Lock and Hide Apps with Face ID: iOS Privacy Guide security lock screen interface"
image: "/images/ios-lock-hide-apps-face-id-guide.jpg"
featuredImage: "/images/posts/ios-lock-hide-apps-face-id-guide.jpg"
draft: false
---

Smartphones are deeply personal devices, holding our most private conversations, medical documents, financial records, and personal photos. Yet, we regularly hand our unlocked phones to others—whether showing a photo to a friend, letting a child play a game, or handing a device to a colleague for navigation. Historically, handing over an unlocked iPhone meant that any app on the device could be opened freely unless the third-party developer specifically built a proprietary passcode lock into their software.

With native **App Locking and Hiding**, Apple solved this long-standing privacy challenge. Users can lock any application behind **Face ID**, **Touch ID**, or device passcode authentication. Furthermore, users can remove sensitive apps from the Home Screen entirely, sequestering them inside a cryptographically concealed **Hidden folder** in the App Library. This comprehensive tutorial walks you through setting up, managing, and troubleshooting app locks and hidden folders across iOS and iPadOS.

## The Architecture of Native App Locking vs. Hiding

Apple implements privacy protection at two distinct operational tiers:

To understand how hardware isolation protects authentication tokens, see our [Apple Passkeys Setup and Security Guide](/apple-passkeys-setup-security-guide/).

| Privacy Protection Level | Visual Visibility | Authentication Required | Notification Previews & Search |
| :--- | :--- | :--- | :--- |
| **Standard Unlocked App** | Full Home Screen & App Library | None (Accessible upon unlock) | Full preview alerts, indexed in Spotlight |
| **Require Face ID (Locked)** | Visible on Home Screen | Face ID / Touch ID upon every tap | Notifications scrubbed; App Switcher blurred |
| **Hide and Require Face ID** | Removed from Home Screen | Face ID required to open Hidden folder | Zero notifications; Excluded from Spotlight & Siri |

### What Happens When an App is Locked:
1. **Biometric Gate:** Tapping the app icon requires an immediate Face ID or Touch ID scan before opening.
2. **App Switcher Concealment:** When swiping up into the multitasking App Switcher, the contents of the locked app are blurred to prevent over-the-shoulder snooping.
3. **Notification Content Scrubbing:** Incoming notifications from locked apps do not reveal message text, preview photos, or caller identities on your Lock Screen.
4. **Spotlight Privacy:** Searching for files inside Spotlight will not expose indexed data stored within the locked application.

### What Happens When an App is Hidden:
1. The app icon is completely stripped from your Home Screen, App Library categories, and search results.
2. The app is relocated into a locked **Hidden** folder located at the very bottom of the App Library.
3. Incoming notifications and call alerts from hidden apps are completely silenced and suppressed to avoid revealing that the app is even installed on the device.

To configure hardware gestures to quickly return to your home screen or lock your device, explore our guide on [Essential iOS Accessibility Tools: Powering Up Back Tap and AssistiveTouch](/ios-accessibility-back-tap-assistivetouch-guide/).

## Step-by-Step: How to Lock an App with Face ID

Locking an app requires no third-party utilities or complex Shortcuts automations:

### Step 1: Engaging the Context Menu
1. Locate the app you wish to secure on your Home Screen or App Library (e.g., Banking, Photos, Notes, or Messages).
2. Long-press on the app icon until the haptic context menu appears.

### Step 2: Selecting Biometric Requirement
1. Tap **Require Face ID** (or **Require Touch ID** on compatible iPads and iPhone SE).
2. A confirmation prompt appears presenting two options:
   - **Require Face ID:** Locks the app while keeping its icon on your Home Screen.
   - **Hide and Require Face ID:** Locks the app and removes it from your Home Screen entirely.
3. Tap **Require Face ID**.
4. Authenticate with your face to confirm your identity.
5. The app is now protected; every subsequent launch will verify your biometrics before revealing content.

## Step-by-Step: How to Hide an App in the Hidden Folder

If you want an app to be completely invisible to anyone browsing your device:

1. Long-press the target app icon.
2. Tap **Require Face ID**.
3. Select **Hide and Require Face ID**.
4. iOS displays an informational modal explaining that notifications will be muted and the app will move to the Hidden folder.
5. Tap **Hide App**.
6. The icon instantly vanishes from your Home Screen and standard App Library grids.

### Accessing Your Hidden Apps:
1. Swipe left across your Home Screen until you reach the **App Library**.
2. Scroll to the very bottom of the App Library.
3. You will see a folder titled **Hidden** displaying an eye icon with a slash through it.
4. Tap the **Hidden** folder.
5. The device scans your face via Face ID. Upon verification, the folder opens, displaying your hidden applications.

## Removing App Locks and Restoring Hidden Apps

If you no longer need biometric protection on an application:

### Unlocking a Locked App:
1. Long-press the locked app icon on your Home Screen.
2. Tap **Don't Require Face ID**.
3. Authenticate with Face ID to confirm. The app returns to standard open behavior.

### Restoring a Hidden App to Your Home Screen:
1. Navigate to the **App Library** and open the **Hidden** folder with Face ID.
2. Long-press the app icon inside the folder.
3. Tap **Don't Require Face ID** (or drag the app icon outward onto your Home Screen).
4. Authenticate with Face ID to confirm the restoration.

For comprehensive privacy settings and security hardening, review our [iOS Privacy Settings Hardening Guide](/ios-privacy-settings-hardening/).

For official documentation on app privacy controls, visit [Apple Support](https://support.apple.com/guide/iphone/lock-or-hide-an-app-iph3e098a87b/ios).

Native App Locking and Hiding gives iPhone and iPad users absolute control over their sensitive information, providing complete peace of mind when sharing devices with others.
