# INICET Study Planner - Architecture & System Design

## Overview

The INICET Study Planner is built with a **layered, modular architecture** that emphasizes offline-first, performance-optimized, and user-centric design. The system is designed to work seamlessly across all network conditions and devices.

## System Architecture Layers

### 1. **Core Authentication & State** (Phase 1)
- **HeaderAuth**: Top-right authentication component
- **useAuth hook**: Global authentication state management
- **Cloud data sync**: Real-time synchronization with Supabase
- **Offline-first queueing**: Persisted writes during offline periods

### 2. **Sync & Error Handling** (Phase 2)
- **sync.ts**: Exponential backoff retry logic (3 retries, 1s/2s/4s delays)
- **useSync hook**: React integration for sync operations
- **SyncStatus component**: Real-time sync state indicator in header
- **Error classification**: Network vs. auth vs. permission errors

### 3. **Testing Infrastructure** (Phase 3)
- **Unit tests**: 21 tests for sync utilities
- **Integration tests**: 10 tests for cloud operations
- **Mock-based testing**: Isolation from external services
- **Performance**: Deterministic timing with fake timers

### 4. **Monitoring & Analytics** (Phase 4)
- **Web Vitals tracking**: LCP, INP, CLS, TTFB via web-vitals library
- **Sync metrics**: Success rate, latency, retry counts
- **Event tracking**: Auth, sync, errors, feature usage
- **Performance health checks**: Validates metrics against thresholds

### 5. **Accessibility & Mobile UX** (Phase 5)
- **a11y utilities**: ARIA helpers, keyboard navigation, focus traps
- **Gesture support**: Swipe, pinch, long-press, double-tap, pull-to-refresh
- **Screen reader integration**: Live regions, announcements
- **Touch optimization**: Haptic feedback, gesture recognition

### 6. **Progressive Enhancement & Offline** (Phase 6)
- **Network detection**: Online/offline/slow-connection modes
- **Service Worker management**: Register, update, message passing
- **Cache strategies**: Cache-first, network-first, stale-while-revalidate
- **Offline persistence**: localStorage with TTL and size limits

### 7. **Performance Optimization** (Phase 7)
- **Metrics collection**: Performance API integration
- **Lazy loading**: Images via Intersection Observer
- **Resource hints**: Preload, prefetch, preconnect, DNS prefetch
- **Dynamic imports**: Code splitting with timeout and progress tracking
- **Long task monitoring**: Identifies JavaScript blocking

## Data Flow Architecture

```
User Interaction
    ↓
Component State (Zustand)
    ↓
localStorage (immediate feedback)
    ↓
Debounced Cloud Sync (useCloudSync)
    ↓
Offline Queue (if network fails)
    ↓
Supabase (when online)
    ↓
Metrics & Analytics Tracking
```

## Offline-First Strategy

The app uses a **3-tier persistence model**:

1. **Memory**: React state for current session
2. **localStorage**: Immediate persistence for offline availability
3. **Cloud (Supabase)**: Authoritative source when online

**Sync Flow**:
- User updates state → saved to localStorage immediately
- Debounced write to Supabase (1.5s delay)
- If write fails → queued in offline mutation queue
- On reconnect → queued writes flush with retry logic
- Streak conflicts resolved: take max count/longest/most recent

## Error Handling Strategy

### Error Classification
- **Network errors** (ECONNREFUSED, ENOTFOUND, fetch failures) → retryable
- **HTTP 408, 429, 500-504** → retryable (server errors, timeouts, rate limits)
- **Auth errors (PGRST301, 401, 403)** → non-retryable
- **Client errors (4xx except 408/429)** → non-retryable

### Retry Logic
- **Max retries**: 3 attempts
- **Backoff**: 1s → 2s → 4s
- **Callbacks**: onRetry, onError, onSuccess tracking
- **Auto-retry on reconnect**: When network returns online

## Performance Optimization Strategy

### Core Web Vitals Targets
- **FCP** (First Contentful Paint): < 1.8s
- **LCP** (Largest Contentful Paint): < 2.5s
- **INP** (Interaction to Next Paint): < 200ms
- **CLS** (Cumulative Layout Shift): < 0.1

### Code Splitting
- **Main bundle**: Core app, auth, sync
- **vendor-react**: React library
- **vendor-charts**: Recharts visualization
- **vendor-ai**: AI integration
- **vendor-utils**: Zod, Zustand, Sonner
- **vendor-icons**: Lucide React icons
- **vendor-supabase**: Supabase client

### Lazy Loading
- **Images**: Intersection Observer based
- **Components**: Dynamic imports with React.lazy
- **Resources**: Preload critical, prefetch future, prefetch-DNS for domains

## Security & Privacy

### Authentication
- **Supabase Auth**: OAuth (Google, GitHub) + Email/Password
- **Session management**: JWT tokens in secure cookies
- **Row-level security**: Database-enforced per-user isolation

### Data Privacy
- **Analytics buffers**: In-memory only, no automatic transmission
- **Offline data**: Encrypted at rest via localStorage
- **Monitoring**: Privacy-focused, no PII tracking
- **Cache management**: TTL and size limits for sensitive data

## Testing Strategy

### Test Coverage
- **Unit tests**: Sync utilities, performance helpers, gesture detection
- **Integration tests**: Cloud operations with mocked Supabase
- **Component tests**: Accessibility, keyboard navigation (planned)
- **Performance tests**: Metrics collection, resource tracking

### Test Environment
- **Framework**: Vitest with jsdom
- **Mocking**: vi.mock for external dependencies
- **Timers**: Fake timers for deterministic async testing
- **Coverage**: 233+ passing tests across all utilities

## Browser Support

- **Modern browsers**: Chrome, Firefox, Safari, Edge (latest)
- **Progressive enhancement**: Gracefully degrades in older browsers
- **Polyfills**: requestIdleCallback, IntersectionObserver detection
- **Service Workers**: Optional, app works without SW support

## Performance Characteristics

### Initial Load
- **First Byte**: ~100-300ms (Vercel edge)
- **First Contentful Paint**: ~1.2-1.8s
- **Largest Contentful Paint**: ~2.0-2.5s
- **Interactive**: ~2.5-3.5s

### Runtime Performance
- **Sync latency**: ~200-500ms (network dependent)
- **State updates**: <16ms (60fps)
- **Network detection**: Real-time via online/offline events
- **Memory**: ~50-100MB including React and dependencies

## Future Optimization Opportunities

1. **Code splitting by route**: Lazy load components per page
2. **Service worker caching**: Cache API for static assets
3. **Image optimization**: WebP format, responsive sizing
4. **Critical CSS**: Inline critical styles, defer non-critical
5. **Compression**: Brotli compression for text assets
6. **CDN**: Cloudflare for global distribution
7. **Database optimization**: Query optimization, indexing
8. **Real-time sync**: WebSocket for live updates instead of polling

## Deployment Architecture

```
Source Code (GitHub)
    ↓
Build (Vite)
    ↓
TypeScript Compilation (strict mode)
    ↓
Code Splitting (manual chunks)
    ↓
Minification & Optimization
    ↓
Vercel Deployment
    ↓
Edge Network CDN
    ↓
Browser Cache
    ↓
Service Worker Cache (optional)
```

## Related Documentation

- [API Reference](./API.md) - Complete function documentation
- [Best Practices](./BEST_PRACTICES.md) - Do's and don'ts
- [Quick Start Guide](./QUICK_START.md) - Getting started
- [Testing Guide](./TESTING.md) - How to write and run tests
