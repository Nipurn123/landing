const VISITOR_COOKIE_NAME = '_vid';
const SESSION_KEY = '_sid';
const SESSION_START_KEY = '_sst';
const SESSION_TRACKED_KEY = '_st';
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';
const TRACKING_ENABLED = import.meta.env.PROD && API_BASE.includes('backend.100xprompt.com');

function generateId(): string {
  return `${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 15)}`;
}

function setCookie(name: string, value: string, days: number = 365): void {
  const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
  document.cookie = `${name}=${value};expires=${expires};path=/;domain=.100xprompt.com;SameSite=Lax;Secure`;
}

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
}

function getVisitorId(): string {
  let visitorId = getCookie(VISITOR_COOKIE_NAME);
  if (!visitorId) {
    visitorId = generateId();
    setCookie(VISITOR_COOKIE_NAME, visitorId);
  }
  return visitorId;
}

function getSessionId(): string {
  let sessionId = sessionStorage.getItem(SESSION_KEY);
  if (!sessionId) {
    sessionId = generateId();
    sessionStorage.setItem(SESSION_KEY, sessionId);
    sessionStorage.setItem(SESSION_START_KEY, Date.now().toString());
    sessionStorage.removeItem(SESSION_TRACKED_KEY);
  }
  return sessionId;
}

function isSessionTracked(): boolean {
  return sessionStorage.getItem(SESSION_TRACKED_KEY) === 'true';
}

function markSessionTracked(): void {
  sessionStorage.setItem(SESSION_TRACKED_KEY, 'true');
}

function getSessionDuration(): number {
  const startTime = sessionStorage.getItem(SESSION_START_KEY);
  if (!startTime) return 0;
  return Math.floor((Date.now() - parseInt(startTime, 10)) / 1000);
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

function sendBeacon(endpoint: string, data: object): void {
  if (!TRACKING_ENABLED) return;
  
  const payload = JSON.stringify(data);
  
  if (navigator.sendBeacon) {
    const blob = new Blob([payload], { type: 'application/json' });
    navigator.sendBeacon(`${API_BASE}${endpoint}`, blob);
  } else {
    fetch(`${API_BASE}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: payload,
      keepalive: true,
    }).catch(() => {});
  }
}

const tracker = {
  visitorId: '' as string,
  sessionId: '' as string,
  appDomain: '' as string,

  async trackVisitor(): Promise<void> {
    const isNewSession = !isSessionTracked();
    const data = {
      visitorId: this.visitorId,
      sessionId: this.sessionId,
      referrer: document.referrer || null,
      screenResolution: `${window.screen.width}x${window.screen.height}`,
      language: navigator.language,
      appDomain: this.appDomain,
      isNewSession,
    };

    try {
      const response = await fetch(`${API_BASE}/api/track/visitor`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: 'include',
      });
      
      if (response.ok && isNewSession) {
        markSessionTracked();
      }
    } catch (error) {
      console.error('Track visitor error:', error);
    }
  },

  trackPageView(pagePath?: string, pageTitle?: string): void {
    const data = {
      visitorId: this.visitorId,
      sessionId: this.sessionId,
      pagePath: pagePath || window.location.pathname,
      pageTitle: pageTitle || document.title,
      referrer: document.referrer || null,
      appDomain: this.appDomain,
      utm: parseUTM(),
    };

    sendBeacon('/api/track/pageview', data);
  },

  trackSession(): void {
    const data = {
      visitorId: this.visitorId,
      sessionId: this.sessionId,
      durationSeconds: getSessionDuration(),
      pageViews: parseInt(sessionStorage.getItem('_pv') || '1', 10),
      appDomain: this.appDomain,
    };

    sendBeacon('/api/track/session', data);
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
      sessionId: this.sessionId,
      elementType,
      elementId: options?.elementId || null,
      elementText: options?.elementText || null,
      elementClass: options?.elementClass || null,
      pagePath: window.location.pathname,
      href: options?.href || null,
      x: options?.x || null,
      y: options?.y || null,
      appDomain: this.appDomain,
      utm: parseUTM(),
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
      sessionId: this.sessionId,
      eventName,
      eventCategory: options?.category || null,
      eventLabel: options?.label || null,
      eventValue: options?.value || null,
      pagePath: window.location.pathname,
      appDomain: this.appDomain,
      metadata: options?.metadata || {},
    };

    sendBeacon('/api/track/event', data);
  },

  init(appDomain: string = 'landing'): void {
    if (!TRACKING_ENABLED) return;
    
    this.visitorId = getVisitorId();
    this.sessionId = getSessionId();
    this.appDomain = appDomain;
    
    this.trackVisitor();

    let pageViewTracked = false;
    let pageCount = parseInt(sessionStorage.getItem('_pv') || '0', 10);
    
    const trackInitialPageView = () => {
      if (!pageViewTracked) {
        this.trackPageView();
        sessionStorage.setItem('_pv', String(pageCount + 1));
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
      this.trackSession();
      
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
      const count = parseInt(sessionStorage.getItem('_pv') || '0', 10);
      sessionStorage.setItem('_pv', String(count + 1));
      tracker.trackPageView();
    };

    history.replaceState = function(...args) {
      originalReplaceState.apply(this, args);
      tracker.trackPageView();
    };

    window.addEventListener('popstate', () => {
      const count = parseInt(sessionStorage.getItem('_pv') || '0', 10);
      sessionStorage.setItem('_pv', String(count + 1));
      this.trackPageView();
    });
  },
};

export default tracker;
