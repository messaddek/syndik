# Dynamic RTL/LTR Direction Support - Implementation Guide

## Overview

This implementation provides dynamic direction switching without page refresh for your Next.js application with internationalization support.

## Components Created/Modified

### 1. `useDirection` Hook (`/src/hooks/use-direction.ts`)

- Monitors locale changes and automatically updates direction
- Updates HTML document direction attributes
- Manages body classes for CSS styling
- Dispatches custom events for components that need to re-render

### 2. `DynamicDirectionProvider` (`/src/components/dynamic-direction-provider.tsx`)

- Wraps Radix UI's DirectionProvider
- Forces re-mount when direction changes (key prop)
- Provides seamless direction switching

### 3. `DirectionAware` Component (`/src/components/direction-aware.tsx`)

- Utility wrapper for components that need direction awareness
- Automatically applies direction classes
- Triggers layout recalculation on direction changes

### 4. Enhanced Sidebar (`/src/components/ui/sidebar.tsx`)

- Automatically adjusts sidebar position based on RTL/LTR
- Uses dynamic direction detection
- Handles mobile sheet positioning

### 5. Updated RTL Debug (`/src/components/rtl-debug.tsx`)

- Real-time direction monitoring
- Shows current state without refresh
- Listens to direction change events

## How It Works

1. **Locale Change Detection**: The `useDirection` hook monitors locale changes via `next-intl`
2. **Document Updates**: Automatically updates `document.documentElement.dir` and body classes
3. **Component Re-rendering**: Uses key prop technique to force re-mount of DirectionProvider
4. **Event System**: Custom events notify components of direction changes
5. **CSS Transitions**: Smooth animations during direction changes

## Usage Examples

### Basic Usage

```tsx
// Your layout is already set up with DynamicDirectionProvider
import { LayoutProvider } from '@/components/layout-provider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LayoutProvider>{children}</LayoutProvider>;
}
```

### Using Direction-Aware Components

```tsx
import { DirectionAware } from '@/components/direction-aware';

function MyComponent() {
  return (
    <DirectionAware className='my-component'>
      <div>This content will automatically adjust to direction changes</div>
    </DirectionAware>
  );
}
```

### Using the Direction Hook

```tsx
import { useDirection } from '@/hooks/use-direction';

function MyComponent() {
  const { direction, isRtl, locale } = useDirection();

  return (
    <div
      className={`my-component ${isRtl ? 'rtl-specific-class' : 'ltr-specific-class'}`}
    >
      Current direction: {direction}
    </div>
  );
}
```

## CSS Classes Added

The following CSS classes are automatically applied:

- `html[dir='rtl']` and `html[dir='ltr']` - HTML direction
- `body.rtl` and `body.ltr` - Body direction classes
- Smooth transitions for directional properties
- Special handling for Radix UI direction attributes

## Key Features

✅ **No Page Refresh Required**: Direction changes happen instantly
✅ **Automatic Sidebar Positioning**: Sidebar automatically moves to correct side
✅ **Radix UI Integration**: Full compatibility with Radix UI components
✅ **Smooth Transitions**: CSS transitions for better UX
✅ **Event-Driven Updates**: Components can listen to direction changes
✅ **TypeScript Support**: Full type safety

## Debugging

Use the `RTLDebug` component to monitor direction changes:

```tsx
import { RTLDebug } from '@/components/rtl-debug';

// Add anywhere in your app during development
<RTLDebug />;
```

## Testing

1. Change language to Arabic (RTL)
2. Verify sidebar moves to the right side
3. Check that no page refresh occurs
4. Confirm smooth transitions
5. Test mobile responsiveness

## Browser Support

- Modern browsers with CSS transitions support
- React 18+ with concurrent features
- Next.js 13+ with app router
