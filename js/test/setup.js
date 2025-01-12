import { jest } from '@jest/globals';
import * as mainJs from '../../js/main.js';

// Make all exports from main.js available globally
Object.assign(global, mainJs);

// Mock browser globals
global.sessionStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
};

// Mock window.matchMedia
global.window.matchMedia = jest.fn().mockImplementation(query => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: jest.fn(),
  removeListener: jest.fn(),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn(),
}));

// Helper function to simulate viewport width
global.setViewportWidth = (width) => {
  Object.defineProperty(document.documentElement, 'clientWidth', {
    value: width,
    writable: true
  });
};

// Initialize required DOM elements
document.body.innerHTML = `
  <div id="nav-divider"></div>
  <div id="dropdown-icon"></div>
  <div id="page-shortcuts"></div>
`; 