# API Reference Guide

## Core Modules

### sync.ts - Retry & Error Handling
**Purpose**: Exponential backoff retry logic with error classification

```typescript
// Get retry delay for attempt number
getRetryDelay(attemptNumber: number): number
// Returns: 1000 * 2^attemptNumber (1s, 2s, 4s, 8s...)

// Check if error is retryable
isRetryableError(error: unknown): boolean
// Network errors and 408/429/500-504 return true

// Execute with automatic retry
executeWithRetry<T>(
  fn: () => Promise<T>,
  options?: {
    maxRetries?: number;           // default: 3
    onRetry?: (attempt, error) => void;
    onError?: (error: Error) => void;
  }
): Promise<T>

// Format time for display
formatLastSynced(date: Date | null): string
// Returns: "Just now", "5m ago", "2h ago", "1d ago", "Never"

// Get user-friendly error message
getSyncErrorMessage(error: unknown): string
// Returns: "Network connection issue...", "Please sign in...", etc.
```

### useSync - React State Integration
**Purpose**: Sync state management with automatic retry and metrics

```typescript
useSync<T>(
  operation: () => Promise<T>,
  options?: {
    onSuccess?: () => void;
    onError?: (error: Error) => void;
    showToast?: boolean;           // default: true
  }
): UseSyncResult

// Returns: {
//   status: "idle" | "syncing" | "success" | "error";
//   lastSynced: Date | null;
//   lastSyncedText: string;       // "Just now", "5m ago", etc.
//   error: string | null;
//   retryCount: number;
//   sync: () => Promise<void>;     // Manual sync trigger
//   isOnline: boolean;
// }
```

### cloud.ts - Cloud Operations
**Purpose**: Supabase integration with retry-wrapped operations

```typescript
// Fetch user data from cloud
fetchCloudData(userId: string): Promise<UserData | null>

// Upsert user data to cloud
upsertCloudData(
  userId: string,
  patch: Partial<UserData>
): Promise<boolean>  // true on success, false on failure

// Merge cloud data into localStorage
mergeCloudIntoLocal(cloud: UserData): void
// Takes max streak, resolves conflicts intelligently

// Hook for debounced sync
useCloudSync<T>(
  key: keyof UserData,
  value: T,
  ready: boolean  // only sync when logged in
): void
```

### offline.ts - Network Detection
**Purpose**: Real-time network status monitoring

```typescript
// Detect current network status
detectNetworkStatus(): OfflineState
// Returns: {
//   mode: "online" | "offline" | "slow-connection";
//   isOnline: boolean;
//   lastOnlineTime: number | null;
//   effectiveType?: "4g" | "3g" | "2g" | "slow-4g";
//   downlink?: number;  // Mbps
//   rtt?: number;       // milliseconds
//   saveData?: boolean;
// }

// Create detector with listener
createOfflineDetector(
  onStatusChange?: (status: OfflineState) => void
): { getStatus: () => OfflineState; destroy: () => void }

// Browser capability checks
supportsServiceWorkers(): boolean
supportsBackgroundSync(): boolean
supportsOfflineStorage(): boolean

// Check user preferences
userPrefersSaveData(): boolean
getDataSaverMode(): "lite" | "normal"

// Smart operation deferral
shouldDeferOperation(operationSize?: number): boolean
```

### cacheManager.ts - Offline Caching
**Purpose**: Multi-strategy cache with localStorage persistence

```typescript
// Initialize cache
const cache = new CacheManager({
  name: "my-cache",
  version: 1,
  maxAge?: 3600000,    // 1 hour
  maxSize?: 100        // max 100 entries
})

// Cache operations
await cache.set(key, value, ttl?)
await cache.get(key): Promise<unknown | null>
await cache.delete(key)
await cache.clear()
await cache.keys(): Promise<string[]>
cache.size(): number

// Fetch with strategy
fetchWithCache(
  url: string,
  strategy: "cache-first" | "network-first" | "stale-while-revalidate" | "network-only",
  cache?: CacheManager
): Promise<Response>
```

### serviceWorker.ts - Service Worker Management
**Purpose**: Register, update, and communicate with service workers

```typescript
// Registration
registerServiceWorker(scriptUrl?: string): Promise<ServiceWorkerStatus>
unregisterServiceWorker(): Promise<boolean>

// Status checking
getServiceWorkerStatus(): ServiceWorkerStatus
checkForServiceWorkerUpdates(): Promise<boolean>
requestServiceWorkerUpdate(): Promise<boolean>

// Messaging
sendMessageToServiceWorker(message: unknown): Promise<void>
onServiceWorkerMessage(handler: (event: any) => void): () => void

// Status monitoring
onServiceWorkerStatusChange(
  listener: (status: ServiceWorkerStatus) => void
): () => void
```

### a11y.ts - Accessibility
**Purpose**: ARIA helpers and keyboard navigation

```typescript
// ARIA attributes
createAriaLiveRegion(message, config): Record<string, any>
createAriaLoading(isLoading): Record<string, any>
createAriaAlert(error): Record<string, any>
createAriaExpandable(isExpanded, controlId): Record<string, any>

// Screen readers
announceToScreenReader(message, politeness?): void

// Keyboard handling
matchesKeyboardShortcut(event, shortcut, modifiers?): boolean
createFocusTrap(container): { activate, deactivate }

// Preferences
prefersReducedMotion(): boolean
prefersDarkMode(): boolean
isTouchDevice(): boolean

// Element utilities
getVisibleText(element): string
isElementVisible(element): boolean
```

### gestures.ts - Touch & Mobile
**Purpose**: Gesture recognition and touch handling

```typescript
// Swipe detection
detectSwipe(
  startPoint: GesturePoint,
  endPoint: GesturePoint
): SwipeGesture | null
// Returns: { direction: "left"|"right"|"up"|"down", distance, velocity, duration }

// Pinch detection
detectPinch(startTouches, currentTouches): PinchGesture | null
// Returns: { scale: number, distance: number }

// Handlers
createLongPressHandler(element, onLongPress, duration?): { destroy }
createDoubleTapHandler(element, onDoubleTap, interval?): { destroy }

// Pull-to-refresh
detectPullToRefresh(startPoint, currentPoint, threshold?): boolean

// Haptic feedback
triggerHapticFeedback(pattern: "light" | "medium" | "heavy"): void
```

### performance.ts - Performance Monitoring
**Purpose**: Collect and analyze performance metrics

```typescript
// Metrics collection
collectPerformanceMetrics(): PerformanceMetrics
// Returns: { fcp, lcp, ttfb, cls, inp, domContentLoaded, pageLoadTime, ... }

// Resource analysis
getResourceMetrics(): ResourceMetrics[]
generatePerformanceReport(): {
  metrics, resources, summary: {
    totalResources, cachedResources, totalBundleSize,
    slowestResource, averageResourceTime
  }
}

// Health checks
isPerformanceAcceptable(): boolean
getPerformanceRecommendations(): string[]

// Profiling
monitorLongTasks(callback, threshold?): () => void
measureExecutionTime<T>(fn, label?): Promise<{ result: T, duration }>
getMemoryUsage(): { usedJSHeapSize?, totalJSHeapSize?, jsHeapSizeLimit? }
```

### lazyLoad.ts - Code Splitting & Lazy Loading
**Purpose**: Optimize bundle size and load times

```typescript
// Image lazy loading
createImageLazyLoader(options?): {
  observe, unobserve, disconnect
}

// Resource hints
preloadResource(url, type): void
prefetchResource(url): void
dnsPrefetch(domain): void
preconnect(url, crossOrigin?): void

// Dynamic imports
dynamicImport<T>(
  importFn: () => Promise<T>,
  options?: { onProgress?, timeout? }
): Promise<T>

// Dynamic resource loading
loadScript(src, options?): Promise<HTMLScriptElement>
loadStylesheet(href, options?): Promise<HTMLLinkElement>

// Utilities
shouldPreload(): boolean
runWhenIdle(callback, timeout?): number
cancelIdleCallback(id): void
```

### analytics.ts - Event Tracking
**Purpose**: Centralized event and error logging

```typescript
// Event tracking
trackEvent(type, metadata?, userId?): void
trackSyncEvent(status, metadata?): void
trackAuthEvent(action, userId?, metadata?): void
trackError(error, context?): void
trackFeatureUsage(feature, metadata?): void

// Logging
logMessage(level, message, context?, error?): void
// level: "debug" | "info" | "warn" | "error"

// Data export
getAnalyticsBuffer(): AnalyticsEvent[]
getLogBuffer(): LogEntry[]
exportAnalytics(): { events, logs, exportedAt }
getAnalyticsSummary(): { totalEvents, eventTypes, logLevels, errorCount, ... }
clearBuffers(): void
```

### monitoring.ts - Performance Metrics
**Purpose**: Web Vitals and sync metrics tracking

```typescript
// Web Vitals
initializeWebVitals(): void
getMetrics(): { webVitals, sync }

// Sync metrics
reportSyncMetrics(status, latency, retryCount?): void
getSyncSuccessRate(): number
resetSyncMetrics(): void

// Performance health
isPerformanceHealthy(): boolean
```

## Common Patterns

### Authentication Flow
```typescript
const { user, loading, error } = useAuth();
if (loading) return <LoadingSpinner />;
if (error) return <ErrorMessage error={error} />;
if (!user) return <LoginPanel />;
return <AppContent />;
```

### Sync with Error Handling
```typescript
const { status, error, sync, lastSyncedText } = useSync(
  () => fetchCloudData(user.id),
  {
    onSuccess: () => console.log("Synced!"),
    onError: (err) => trackError(err, { context: "sync" }),
  }
);

if (status === "syncing") return <Syncing />;
if (error) return <Error message={error} />;
return <LastSynced text={lastSyncedText} />;
```

### Offline-First Data
```typescript
// Always save to localStorage first
safeSave("key", value);

// Then sync to cloud if online
if (navigator.onLine) {
  await upsertCloudData(userId, { key: value });
} else {
  // Queue for retry on reconnect
  enqueue(userId, "key", value);
}
```

### Lazy Loading Images
```typescript
const loader = createImageLazyLoader({ threshold: 0.1 });
useEffect(() => {
  const images = document.querySelectorAll("img[data-src]");
  images.forEach(img => loader.observe(img as HTMLImageElement));
  return () => loader.disconnect();
}, []);
```

## Type Definitions

All modules export TypeScript interfaces for full type safety:
- `SyncState`, `SyncError`, `SyncStatus`
- `OfflineState`, `OfflineMode`
- `PerformanceMetrics`, `ResourceMetrics`
- `CacheConfig`, `CacheEntry`
- `SwipeGesture`, `PinchGesture`, `GesturePoint`
- `AnalyticsEvent`, `LogEntry`, `EventType`, `LogLevel`

See source files for complete type definitions.

## Error Handling Best Practices

1. Always provide `onError` callback to useSync
2. Use `getSyncErrorMessage()` for user-facing messages
3. Log errors with `trackError()` for debugging
4. Distinguish between retryable and permanent errors
5. Queue offline changes for retry, don't discard

## Performance Best Practices

1. Lazy load non-critical images with `createImageLazyLoader()`
2. Use resource hints for known future resources
3. Measure critical operations with `measureExecutionTime()`
4. Monitor long tasks to identify bottlenecks
5. Check recommendations via `getPerformanceRecommendations()`

## Accessibility Best Practices

1. Use ARIA helpers for dynamic content
2. Support keyboard-only navigation with focus traps
3. Respect `prefers-reduced-motion` in animations
4. Announce status changes to screen readers
5. Test with keyboard navigation and screen readers
