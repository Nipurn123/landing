const VISITOR_ID_KEY = '_vid';
const SESSION_ID_KEY = '_sid';
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';

function generateId(): string {
  return `${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 15)}`;
}

function getVisitorId(): string {
  let visitorId = localStorage.getItem(VISITOR_ID_KEY);
  if (!visitorId) {
    visitorId = generateId();
    localStorage.setItem(VISITOR_ID_KEY, visitorId);
  }
  return visitorId;
}

function getSessionId(): string {
  let sessionId = sessionStorage.getItem(SESSION_ID_KEY);
  if (!sessionId) {
    sessionId = generateId();
    sessionStorage.setItem(SESSION_ID_KEY, sessionId);
  }
  return sessionId;
}

function parseUTM(): Record<string, string> {
  const params = new URLSearchParams(window.location.search);
  return {
    source: params.get('utm_source') || '',
    medium: params.get('utm_medium') || '',
    campaign: params.get('utm_campaign') || '',
    term: params.get('utm_term') || '',
    content: params.get('utm_content') || '',
  };
}

async function sendBeacon(endpoint: string, data: Record<string, unknown>): Promise<void> {
  const url = `${API_BASE}${endpoint}`;
  
  fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    keepalive: true,
    credentials: 'omit',
  }).catch(() => {});
}

export const tracker = {
  visitorId: getVisitorId(),
  sessionId: getSessionId(),

  async trackVisitor(): Promise<void> {
    const data = {
      visitorId: this.visitorId,
      referrer: document.referrer || null,
      screenResolution: `${window.screen.width}x${window.screen.height}`,
      language: navigator.language,
    };

    try {
      await fetch(`${API_BASE}/api/track/visitor`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: 'omit',
      });
    } catch (error) {
      console.error('Track visitor error:', error);
    }
  },

  trackPageView(pagePath?: string, pageTitle?: string): void {
    const data = {
      visitorId: this.visitorId,
      pagePath: pagePath || window.location.pathname,
      pageTitle: pageTitle || document.title,
      referrer: document.referrer || null,
      utm: parseUTM(),
    };

    sendBeacon('/api/track/pageview', data);
  },

  trackClick(
    elementType: string,
    options?: {
      elementId?: string;
      elementText?: string;
      elementClass?: string;
      href?: string;
      x?: number;
      y?: number;
    }
  ): void {
    const data = {
      visitorId: this.visitorId,
      elementType,
      elementId: options?.elementId || null,
      elementText: options?.elementText || null,
      elementClass: options?.elementClass || null,
      pagePath: window.location.pathname,
      href: options?.href || null,
      x: options?.x || null,
      y: options?.y || null,
    };

    sendBeacon('/api/track/click', data);
  },

  trackEvent(
    eventName: string,
    options?: {
      category?: string;
      label?: string;
      value?: number;
      metadata?: Record<string, unknown>;
    }
  ): void {
    const data = {
      visitorId: this.visitorId,
      eventName,
      eventCategory: options?.category || null,
      eventLabel: options?.label || null,
      eventValue: options?.value || null,
      pagePath: window.location.pathname,
      metadata: options?.metadata || {},
    };

    sendBeacon('/api/track/event', data);
  },

  init(): void {
    this.trackVisitor();

    let pageViewTracked = false;
    const trackInitialPageView = () => {
      if (!pageViewTracked) {
        this.trackPageView();
        pageViewTracked = true;
      }
    };

    if (document.readyState === 'complete') {
      trackInitialPageView();
    } else {
      window.addEventListener('load', trackInitialPageView);
    }

    document.addEventListener('click', (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      const clickTarget = target.closest('a, button, [data-track], input[type="submit"]');
      if (!clickTarget) return;

      const tagName = clickTarget.tagName.toLowerCase();
      let elementType = tagName;
      
      if (tagName === 'a') {
        elementType = 'link';
      } else if (tagName === 'button' || (tagName === 'input' && (clickTarget as HTMLInputElement).type === 'submit')) {
        elementType = 'button';
      } else if (clickTarget.hasAttribute('data-track')) {
        elementType = clickTarget.getAttribute('data-track') || 'custom';
      }

      const rect = clickTarget.getBoundingClientRect();
      
      this.trackClick(elementType, {
        elementId: clickTarget.id || undefined,
        elementText: clickTarget.textContent?.trim().substring(0, 200) || undefined,
        elementClass: clickTarget.className || undefined,
        href: (clickTarget as HTMLAnchorElement).href || undefined,
        x: Math.round(e.clientX - rect.left),
        y: Math.round(e.clientY - rect.top),
      });
    }, true);

    let maxScroll = 0;
    window.addEventListener('scroll', () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );
      if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;
      }
    }, { passive: true });

    window.addEventListener('beforeunload', () => {
      if (maxScroll > 25) {
        this.trackEvent('scroll_depth', {
          category: 'engagement',
          value: maxScroll,
        });
      }
    });

    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;

    history.pushState = function(...args) {
      originalPushState.apply(this, args);
      tracker.trackPageView();
    };

    history.replaceState = function(...args) {
      originalReplaceState.apply(this, args);
      tracker.trackPageView();
    };

    window.addEventListener('popstate', () => {
      this.trackPageView();
    });
  },
};

export default tracker;
