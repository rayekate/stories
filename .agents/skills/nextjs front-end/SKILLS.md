---
title: Next.js Story App Frontend
description: Comprehensive skill for building a premium, visually stunning Next.js story generation interface.
---

# Next.js Story Generation App Skill

This skill provides instructions for building a modern, premium front-end for a story generation application using Next.js and Vanilla CSS. The goal is to create a "WOW" experience for the user with smooth transitions, vibrant colors, and a polished interface.

## Core Visual Requirements
- **Theme**: Sleek Dark Mode (e.g., background `#0a0a0b`).
- **Color Palette**: Use HSL-based tokens for harmony. Primary accent: Electric Indigo (`hsl(245, 100%, 65%)`).
- **Aesthetics**: Glassmorphism (semi-transparent cards with `backdrop-filter: blur(12px)`), subtle gradients, and micro-animations.
- **Typography**: Google Fonts (Inter or Outfit) for a premium feel.

## UI Component Specifications

### 1. Hero / Prompt Section
- **Prompt Input**: A sleek, auto-growing text area with a semi-transparent background and neon glow on focus.
- **Generate Button**: A high-contrast call-to-action button with a pulse effect. It should show a "Magic Wand" icon and a loading state (spinner/shimmer) when active.

### 2. Story Dialog / Overlay
- **Trigger**: The generated story should appear in a centered Modal/Dialog box after clicking 'Generate'.
- **Modal Design**: Corner-rounded (e.g., `24px`), glassmorphism effect, and a smooth "faded-in & scaled-up" entry animation.
- **Header**: Contains the story title and a 'Close' icon button.
- **Content**: Typography optimized for readability (line-height `1.6`, font-size `1.2rem`).

### 3. State Management
- **Loading State**: Implement a "Generating Experience" shimmer or progress bar while the backend is being hit.
- **Mock API Implementation**:
  ```javascript
  const handleGenerate = async (prompt) => {
    setLoading(true);
    // Future backend integration
    // const res = await fetch('/api/generate', { method: 'POST', body: JSON.stringify({ prompt }) });
    // const data = await res.json();
    setStory(data.content);
    setIsModalOpen(true);
    setLoading(false);
  };
  ```

## Implementation Workflow
1.  **Foundation**: Update `index.css` with HSL variables and base themes.
2.  **Layout**: Create a central container with a responsive padding.
3.  **Components**: Build `PromptInput`, `PrimaryButton`, and `StoryModal`.
4.  **Animations**: Use CSS keyframes for smooth transitions between states.