/* main JavaScript file for yaqinhasan.com */

/**
 * Core site configuration
 */
export const CONFIG = {
  PORTRAIT_THRESHOLD: 900,
  ANIMATION_SPEEDS: {
    NORMAL: '1',
    FAST: '0.5'
  }
};

/**
 * State management
 */
export const State = {
  portraitMode: false,
  overflowShown: false,

  // Dev mode
  getDev() {
    return sessionStorage.getItem('devMode');
  },

  setDev(val) {
    sessionStorage.setItem('devMode', val);
  },

  initDevMode() {
    if (sessionStorage.getItem('devMode') === null) {
      this.setDev('false');
    }
  }
};

// Initialize dev mode immediately
State.initDevMode();

/**
 * DOM Helper functions
 */
export const DOMHelpers = {
  getPortraitElems() {
    return document.getElementsByClassName("show-portrait-only");
  },

  getLandscapeElems() {
    return document.getElementsByClassName("show-landscape-only");
  },

  getDevItems() {
    return document.getElementsByClassName('show-dev-only');
  },

  getNavElements() {
    return {
      overflowItems: document.getElementsByClassName('overflow-item'),
      dropdownIcon: document.getElementById('dropdown-icon'),
      navDivider: document.getElementById('nav-divider'),
      pageShortcuts: document.getElementById('page-shortcuts'),
      devToggle: document.getElementById('dev-toggle')
    };
  }
};

/**
 * Responsive layout management
 */
export const ResponsiveManager = {
  handlePortrait() {
    const { navDivider, pageShortcuts } = DOMHelpers.getNavElements();
    const portraitElems = DOMHelpers.getPortraitElems();
    const landscapeElems = DOMHelpers.getLandscapeElems();
    const viewportWidth = document.documentElement.clientWidth;
    
    const isLandscape = viewportWidth >= CONFIG.PORTRAIT_THRESHOLD;

    // Handle landscape mode
    if (isLandscape) {
      this._showLandscapeElements(landscapeElems);
      this._hideMobileElements(portraitElems);
      if (pageShortcuts) pageShortcuts.open = true;
      navDivider.style.display = 'flex';
    } 
    // Handle portrait/mobile mode
    else {
      this._hideLandscapeElements(landscapeElems);
      this._showMobileElements(portraitElems);
      if (pageShortcuts) pageShortcuts.open = false;
      navDivider.style.display = 'none';
      NavManager.hideNavOverflow();
    }
  },

  _showLandscapeElements(elements) {
    for (let elem of elements) {
      if (!elem.classList.contains('show-dev-only') || State.getDev() === 'true') {
        elem.style.display = "flex";
      }
    }
  },

  _hideLandscapeElements(elements) {
    for (let elem of elements) {
      elem.style.display = "none";
    }
  },

  _showMobileElements(elements) {
    for (let elem of elements) {
      if (!elem.classList.contains('show-dev-only') || State.getDev() === 'true') {
        elem.style.display = "flex";
      }
    }
  },

  _hideMobileElements(elements) {
    for (let elem of elements) {
      elem.style.display = "none";
    }
  }
};

/**
 * Navigation menu management
 */
export const NavManager = {
  showNavOverflow() {
    const { overflowItems, dropdownIcon } = DOMHelpers.getNavElements();
    
    for (let item of overflowItems) {
      item.style.display = 'flex';
    }

    DevManager.handleDev();
    dropdownIcon.style.transform = 'rotate(90deg)';
    State.overflowShown = true;
  },

  hideNavOverflow() {
    const { overflowItems, dropdownIcon } = DOMHelpers.getNavElements();
    
    for (let item of overflowItems) {
      item.style.display = 'none';
    }
    
    dropdownIcon.style.transform = 'none';
    State.overflowShown = false;
  },

  handleNavOverflow() {
    State.overflowShown ? this.hideNavOverflow() : this.showNavOverflow();
  }
};

/**
 * Developer mode management
 */
export const DevManager = {
  handleDev() {
    const devMode = State.getDev();
    const devItems = DOMHelpers.getDevItems();
    const { devToggle } = DOMHelpers.getNavElements();
    const root = document.documentElement;

    if (devMode === 'true') {
      this._enableDevMode(devItems, devToggle, root);
    } else {
      this._disableDevMode(devItems, devToggle, root);
    }
  },

  _enableDevMode(items, toggle, root) {
    for (let item of items) {
      item.style.display = 'flex';
    }
    if (toggle) {
      toggle.checked = true;
    }
    root.style.setProperty('--animation-speed-base', CONFIG.ANIMATION_SPEEDS.FAST);
  },

  _disableDevMode(items, toggle, root) {
    for (let item of items) {
      item.style.display = 'none';
    }
    if (toggle) {
      toggle.checked = false;
    }
    root.style.setProperty('--animation-speed-base', CONFIG.ANIMATION_SPEEDS.NORMAL);
  },

  toggleDev() {
    const { devToggle } = DOMHelpers.getNavElements();
    const newState = devToggle.checked ? 'true' : 'false';
    State.setDev(newState);
    this.handleDev();
  }
};

/**
 * Carousel functionality
 */
export const CarouselManager = {
  initializePage(pageName, defaultId = "0") {
    // Get current state from session storage or use provided default
    const current = sessionStorage.getItem(`${pageName}Current`) || defaultId;
    // Show the current item
    this.carouselCycle(pageName, current);
    return current;
  },

  setPageCurrent(pageName, current) {
    sessionStorage.setItem(`${pageName}Current`, current);
  },

  getPageCurrent(pageName) {
    let current = sessionStorage.getItem(`${pageName}Current`);
    if (current === null) {
      this.setPageCurrent(pageName, "0");
      current = "0";
    }
    return current;
  },

  carouselCycle(pageName, id) {
    const items = document.getElementsByClassName('carousel-item');
    for (let item of items) {
      item.style.display = "none";
    }
    document.getElementById(id).style.display = "flex";
    this.setPageCurrent(pageName, id);
  },

  carouselPrevious(pageName) {
    const current = this.getPageCurrent(pageName);
    const items = document.getElementsByClassName('carousel-item');
    const last = items.length - 1;
    
    if (current !== null) {
      let previous = parseInt(current) - 1;
      if (previous < 0) previous = last;
      this.carouselCycle(pageName, previous);
    }
  },

  carouselNext(pageName) {
    const current = this.getPageCurrent(pageName);
    const items = document.getElementsByClassName('carousel-item');
    const last = items.length - 1;
    
    if (current !== null) {
      let next = parseInt(current) + 1;
      if (next > last) next = 0;
      this.carouselCycle(pageName, next);
    }
  },

  subCarouselCycle(id) {
    const items = document.getElementsByClassName("sub-carousel-item");
    for (let item of items) {
      item.style.display = "none";
    }
    document.getElementById(id).style.display = "flex";
  }
};

/**
 * Initialize event listeners and setup
 */
function initializeEventListeners() {
  try {
    // Initialize dev mode
    State.initDevMode();
    DevManager.handleDev();

    // Portrait mode handling
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia(`(min-width: ${CONFIG.PORTRAIT_THRESHOLD}px)`);
      mediaQuery.addEventListener('change', () => ResponsiveManager.handlePortrait());
    }
    
    window.addEventListener('resize', () => ResponsiveManager.handlePortrait());
    
    // Only add DOMContentLoaded listener if not in test environment
    if (typeof jest === 'undefined') {
      document.addEventListener('DOMContentLoaded', () => {
        // Set up responsive layout
        ResponsiveManager.handlePortrait();
        
        // Set up dev toggle
        const devToggle = document.getElementById('dev-toggle');
        if (devToggle) {
          devToggle.checked = State.getDev() === 'true';
          devToggle.addEventListener('click', () => DevManager.toggleDev());
        }

        // Apply current dev mode state
        DevManager.handleDev();
      });

      window.addEventListener('load', () => {
        DevManager.handleDev();
        ResponsiveManager.handlePortrait();
      });
    }

  } catch (error) {
    console.error('Error initializing event listeners:', error);
  }
}

// Make functions available globally for HTML event handlers
Object.assign(window, {
  handlePortrait: () => ResponsiveManager.handlePortrait(),
  toggleDev: () => DevManager.toggleDev(),
  handleNavOverflow: () => NavManager.handleNavOverflow(),
  setPageCurrent: (page, current) => CarouselManager.setPageCurrent(page, current),
  carouselCycle: (page, id) => CarouselManager.carouselCycle(page, id),
  carouselPrevious: (page) => CarouselManager.carouselPrevious(page),
  carouselNext: (page) => CarouselManager.carouselNext(page),
  subCarouselCycle: (id) => CarouselManager.subCarouselCycle(id),
  // Expose managers directly for HTML onclick handlers
  DevManager,
  ResponsiveManager,
  NavManager,
  CarouselManager
});

// Initialize
initializeEventListeners();

// Hot Module Replacement (HMR) support
if (import.meta.hot) {
  import.meta.hot.accept((newModule) => {
    if (newModule) {
      // Re-run initialization when module updates
      newModule.initializeEventListeners();
      
      // Re-apply current state
      const devMode = State.getDev();
      if (devMode === 'true') {
        DevManager.handleDev();
      }
      ResponsiveManager.handlePortrait();
    }
  });
}

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    CONFIG,
    State,
    DOMHelpers,
    ResponsiveManager,
    NavManager,
    DevManager,
    CarouselManager
  };
}


