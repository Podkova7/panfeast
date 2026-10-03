---
title: "How to Create Custom Smart Folders in Apple Notes for Project Organization"
slug: "apple-notes-smart-folders-filters-guide"
seoTitle: "Apple Notes Smart Folders: Setup & Filter Guide"
publishDate: 2026-02-12T08:00:00Z
date: 2026-02-12T08:00:00Z
updatedDate: 2026-02-12T08:00:00Z
author: "Sylvie Fox"
category: "iOS Guides"
categories: ["iOS Guides","Mac & macOS"]
tags: ["Apple Notes","Smart Folders","Productivity","Organization","iOS"]
relatedSlugs: ["apple-notes-pkm-organization-system","advanced-apple-shortcuts-automations","icloud-advanced-data-protection-encryption"]
description: "Build dynamic smart folders in Apple Notes using automated tag filtering, checklist status queries, and date-modified criteria."
featuredImageAlt: "Apple Notes Smart Folders: Setup & Filter Guide tag management diagram"
image: "/images/apple-notes-smart-folders-filters-guide.jpg"
featuredImage: "/images/posts/apple-notes-smart-folders-filters-guide.jpg"
draft: false
---

Taking notes on digital devices is effortless, but finding specific information months later often degrades into endless scrolling and frustrating searches. Traditional folder structures force you to make a rigid decision for every document: does a client meeting note belong in the "Clients" folder, the "Financials" folder, or the "Projects" folder? Inevitably, related documents become fragmented across nested subdirectories, making holistic project tracking impossible.

With **Smart Folders**, Apple transformed the built-in Notes application into an automated, dynamic document database. Rather than requiring you to manually file notes into static directories, Smart Folders continuously aggregate documents based on customizable filtering rules—including hashtags, checklist completion states, mentions, date-modified timestamps, and attachment types. In this tutorial, we guide you through designing and automating custom Smart Folders across iOS, iPadOS, and macOS.

## How Smart Folders Differ from Static Folders

Understanding the architectural distinction between standard directories and Smart Folders is essential for effective knowledge management:

To integrate Smart Folders into a complete personal knowledge architecture, read our foundation guide on [Mastering Apple Notes as a Personal Knowledge Management (PKM) System](/apple-notes-pkm-organization-system/).

| Folder Architecture | Organizational Logic | Document Duplication | Automated Sorting |
| :--- | :--- | :--- | :--- |
| **Standard Folder** | Manual drag-and-drop filing | Single fixed home per note | None (Requires manual housekeeping) |
| **Smart Folder** | Query-based aggregation rules | Notes appear in multiple queries simultaneously | Continuous dynamic evaluation |
| **Tag Taxonomy** | In-text `#hashtags` anywhere in body | Granular indexing across all folders | Instant query population |

Because a note is never physically moved into a Smart Folder, a single meeting document tagged `#client-alpha` and `#q1-budget` can surface in your "Client Alpha" project folder, your "Financial Reviews" smart dashboard, and your "Action Items" checklist folder at the exact same time without creating messy duplicates.

To secure your cloud notes with zero-knowledge end-to-end encryption, consult our [iCloud Advanced Data Protection and Security Guide](/icloud-advanced-data-protection-encryption/).

## Available Smart Folder Filter Criteria

Apple Notes provides a comprehensive array of query parameters that can be combined using **AND** (All Selected Filters) or **OR** (Any Selected Filter) logical operators:

1. **Tags:** Filter by one or multiple `#tags` embedded within note text.
2. **Date Created / Date Modified:** Target notes generated or edited today, yesterday, within the past 7 days, 30 days, or custom date ranges.
3. **Shared Notes:** Filter notes shared with specific collaborators or filter for private notes.
4. **Mentions:** Aggregate notes where team members tagged you using `@name` mentions.
5. **Checklists:** Filter notes containing uncompleted action items, completed items, or any checklist.
6. **Attachments:** Target notes containing scanned receipts, PDF documents, photos, audio voice memos, or web map links.
7. **Pinned / Locked Notes:** Segment sensitive or high-priority notes automatically.

To automate note creation from external apps or web browsers, review our roundup of [Advanced Apple Shortcuts: 10 Actionable Automations for Daily Use](/advanced-apple-shortcuts-automations/).

## Step-by-Step: Creating a Dynamic Project Smart Folder

Setting up a Smart Folder requires less than two minutes:

### Step 1: Initiating a New Folder
1. Launch **Apple Notes** on your iPhone, iPad, or Mac.
2. In the main folder navigation sidebar, tap the **New Folder icon** in the bottom-left corner.
3. Choose whether to save the folder in your **iCloud** account (recommended for cross-device synchronization) or On My iPhone.
4. Tap **Make Into Smart Folder**.

### Step 2: Selecting and Chaining Filter Parameters
1. Assign a descriptive title to your Smart Folder (e.g., *Active Sprint Deliverables* or *Tax Year 2026 Receipts*).
2. Choose your logical matching rule at the top:
   - **All Selected Filters:** A note must satisfy every condition (AND logic).
   - **Any Selected Filter:** A note surfaces if it satisfies at least one condition (OR logic).
3. Tap **Tags** and select relevant project tags (e.g., `#project-phoenix`).
4. Tap **Checklists** and select **Unchecked Items** to ensure the folder functions as a live task dashboard.
5. Tap **Date Modified** and select **Past 30 Days** to automatically hide stale documents.

### Step 3: Saving and Reviewing Results
1. Tap **Done** in the upper-right corner.
2. The folder appears in your sidebar accompanied by a gear icon, denoting its dynamic status.
3. Tap into the folder: all existing notes across your entire library matching your criteria populate immediately.

## Three Actionable Smart Folder Templates for Power Users

Here are three tested Smart Folder configurations you can implement immediately:

### Template 1: The "Daily Action Items" Dashboard
- **Logic:** All Selected Filters
- **Criteria:**
  - *Checklists:* Unchecked Items
  - *Date Modified:* Past 7 Days
- **Outcome:** A unified, real-time list of all notes containing pending tasks that you touched this week.

### Template 2: The "Expense and Tax Vault"
- **Logic:** All Selected Filters
- **Criteria:**
  - *Tags:* `#expenses` OR `#tax-receipt`
  - *Attachments:* Scanned Documents OR Photos
- **Outcome:** Eliminates searching for business receipts during tax season by automatically gathering all scanned document attachments.

### Template 3: The "Collaborative Team Hub"
- **Logic:** All Selected Filters
- **Criteria:**
  - *Shared:* Shared with Anyone
  - *Mentions:* Mentions Me
- **Outcome:** Instantly gathers notes where team members have assigned deliverables or requested feedback.

For official documentation on smart folders, visit [Apple Support](https://support.apple.com/guide/notes/use-smart-folders-apd5e43690d7/mac).

By implementing Smart Folders, your Apple Notes library transforms from an unorganized filing cabinet into a self-organizing digital knowledge engine.
