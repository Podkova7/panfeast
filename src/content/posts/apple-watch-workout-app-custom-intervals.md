---
title: "How to Build Custom Workouts and Structured Heart Rate Zones on Apple Watch"
slug: "apple-watch-workout-app-custom-intervals"
seoTitle: "Apple Watch Custom Workouts: Intervals & HR Zones"
publishDate: 2026-09-05T08:00:00Z
updatedDate: 2026-09-05T08:00:00Z
author: "Sophia Garcia"
category: "Apple Watch"
categories: ["Apple Watch","iPhone Tips"]
tags: ["Apple Watch","Fitness","Workouts","Heart Rate","Intervals"]
relatedSlugs: ["apple-watch-vitals-heart-rate-variability-guide","apple-health-records-trend-analysis","iphone-battery-health-preservation-guide"]
description: "Create structured interval workouts and customize target heart rate zones in the Apple Watch Workout app for precise athletic training."
featuredImageAlt: "How to Build Custom Workouts and Structured Heart Rate Zones on Apple Watch"
image: "/images/apple-watch-workout-app-custom-intervals.jpg"
featuredImage: "/images/posts/apple-watch-workout-app-custom-intervals.jpg"
draft: false
---
The native Workout app on Apple Watch has evolved from a basic calorie tracker into a capable athletic training computer. While casual runners and gym-goers often rely on open-ended workouts with standard calorie or time targets, structured athletic progression requires precise pacing, target heart rate management, and customized interval blocks.

Whether you are preparing for a marathon, performing high-intensity interval training (HIIT), or following low-intensity steady-state (Zone 2) cardio to build mitochondrial efficiency, the Workout app on watchOS provides the tools you need. You can design multi-stage custom workouts with automated work/recovery intervals, calibrate personal heart rate zones, and configure custom workout metric screens. This guide details how to build and execute structured workouts on your Apple Watch.

## The Physiology of Heart Rate Zones in watchOS

Heart rate zone training categorizes cardiovascular effort into five distinct physiological tiers based on a percentage of your maximum heart rate (HRmax). Training within specific zones prompts targeted physiological adaptations:

To cross-reference your recovery heart rate after intense interval sessions, explore our companion tutorial on [Apple Watch Vitals and Heart Rate Variability (HRV) Analysis](/apple-watch-vitals-heart-rate-variability-guide/).

| Training Zone | % of Heart Rate Max | Primary Metabolic Energy Source | Physiological Benefit |
| :--- | :--- | :--- | :--- |
| **Zone 1: Warm Up** | 50% – 60% HRmax | Free fatty acids | Active recovery, tissue oxygenation |
| **Zone 2: Easy / Aerobic** | 60% – 70% HRmax | Fat oxidation (aerobic lipolysis) | Mitochondrial density, endurance base |
| **Zone 3: Aerobic / Tempo** | 70% – 80% HRmax | Balanced fats & carbohydrates | Capillary volume, cardiovascular capacity |
| **Zone 4: Threshold** | 80% – 90% HRmax | Muscle glycogen (anaerobic threshold) | Lactate clearance capacity, high speed sustain |
| **Zone 5: Maximum / Neuromuscular** | 90% – 100% HRmax | Phosphagen & fast glycolysis | Anaerobic power, sprint velocity |

By default, watchOS automatically calculates your heart rate zones on the first day of each month using the **Heart Rate Reserve (Karvonen) method**, which factors in your measured resting heart rate and estimated maximum heart rate. If your laboratory-tested numbers differ from Apple's estimates, you can manually adjust your thresholds on your iPhone under **Watch app > Workout > Heart Rate Zones > Manual**.

## Step-by-Step: Designing a Custom Interval Workout

Building an interval workout on Apple Watch lets you alternate between defined intervals of work and recovery, accompanied by distinct audio cues and haptic taps on your wrist.

### Step 1: Selecting the Workout Discipline

1. Launch the **Workout** app on your Apple Watch.
2. Scroll to the desired activity profile (e.g., **Outdoor Run**, **Outdoor Cycle**, or **Functional Strength Training**).
3. Tap the **More (...)** button in the upper right corner of the workout card.

### Step 2: Creating the Workout Architecture

1. Scroll to the bottom and tap **Create Workout**.
2. Tap **Custom**.
3. Configure your **Warmup**:
   - Tap **Warmup** and set an objective (e.g., Time: 10 minutes, or Distance: 1 mile).
   - Tap **Alert** to set a target heart rate zone (such as *Zone 1* or *Zone 2*).

### Step 3: Defining Work and Recovery Intervals

1. Tap **Add** and select **Work**:
   - Choose a target based on **Distance** (e.g., 800 meters), **Time** (e.g., 3 minutes), or **Open**.
   - Tap **Alert** to configure a target pace (e.g., 7:30 min/mile) or heart rate zone (*Zone 4 Threshold*).
2. Tap **Add** and select **Recovery**:
   - Choose a recovery duration (e.g., Time: 90 seconds, or until your heart rate drops back into *Zone 2*).

### Step 4: Setting the Repeat Loop and Cooldown

1. Tap **Add > Repeats**.
2. Select your work interval and recovery interval to link them together.
3. Specify the number of iterations (e.g., **6 times**).
4. Tap **Cooldown** to establish a structured 5-minute cool-down walk.
5. Tap **Title** at the top of the screen to name your workout (e.g., *800m Speed Repeats*), then tap **Done**.

The custom workout will now appear at the top of that activity category whenever you open the Workout app.

## Customizing In-Workout Metric Views

During a fast-paced interval workout, scrolling through multiple screens on a small display is impractical. Setting up your metric views beforehand ensures all critical information is visible at a glance.

1. On your iPhone, open the **Watch** app.
2. Tap **Workout > Workout Views**.
3. Select your workout type (such as *Outdoor Run*).
4. Tap **Edit** to adjust the metrics visible on the screen:
   - **Heart Rate Zone View:** Displays a live gauge showing your current zone, time spent in each zone, and average heart rate.
   - **Segment / Split Pace:** Shows your pace for the current interval rather than the entire workout average.
   - **Running Power & Ground Contact Time:** Provides real-time biomechanical power output measured in watts.

To manage battery life during long-distance training or marathons, review the optimization strategies in our [iPhone Battery Health Preservation Guide](/iphone-battery-health-preservation-guide/).

## Action Button Triggers for Interval Navigation on Apple Watch Ultra

If you use an Apple Watch Ultra, you can assign physical hardware actions to the orange **Action button** to control your workouts without relying on the touchscreen:

1. Open **Settings** on your watch and select **Action Button**.
2. Set the primary action to **Workout**.
3. Under the first press setting, choose **Start a Workout** or **Record a Segment**.
4. During a structured workout, pressing the Action button instantly marks the end of an interval or advances to the next stage, which is particularly helpful when training with wet hands or winter gloves.

To see how cardiovascular adaptations translate into long-term health improvements, refer to our guide on [Apple Health Trends: Biomarkers & Cardio Recovery](/apple-health-records-trend-analysis/).

## Exporting Workout Telemetry for Analytical Review

Your workout data is stored securely in Apple Health and can be reviewed in detail or exported to third-party platforms:
- **Fitness App Summaries:** Open the **Fitness** app on your iPhone to view post-workout split paces, elevation maps, and zone distribution bar graphs.
- **Third-Party Syncing:** Athletic platforms like Strava, TrainingPeaks, and Nike Run Club can import workout files automatically using HealthKit permissions.

For full technical specifications on workout sensors and calibration routines, consult the official documentation on [Apple Support](https://support.apple.com/guide/watch/workout-types-apd5cf64a66a/watchos).

By taking advantage of custom intervals and target heart rate zones, your Apple Watch becomes an intelligent, personal training companion for structured athletic training.
