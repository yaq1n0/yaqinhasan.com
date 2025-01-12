/**
 * Test suite for main.js
 * Run with Jest
 */

import { CONFIG, State, DOMHelpers, ResponsiveManager, NavManager, DevManager, CarouselManager } from './main.js';

describe('State Management', () => {
  beforeEach(() => {
    sessionStorage.clear();
    State.initDevMode();
  });

  test('getDev should return false by default', () => {
    expect(State.getDev()).toBe('false');
  });

  test('setDev should update dev mode state', () => {
    State.setDev('true');
    expect(State.getDev()).toBe('true');
  });

  test('initDevMode should set default state', () => {
    State.initDevMode();
    expect(State.getDev()).toBe('false');
  });
});

describe('Responsive Layout', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="show-portrait-only"></div>
      <div class="show-landscape-only"></div>
      <div id="nav-divider"></div>
      <div id="page-shortcuts"></div>
      <div id="dropdown-icon"></div>
      <div class="overflow-item"></div>
    `;
  });

  test('handlePortrait should show portrait elements below threshold', () => {
    setViewportWidth(800); // Below threshold
    ResponsiveManager.handlePortrait();
    const portraitElems = DOMHelpers.getPortraitElems();
    expect(portraitElems[0].style.display).toBe('flex');
  });

  test('handlePortrait should show landscape elements above threshold', () => {
    setViewportWidth(1000); // Above threshold
    ResponsiveManager.handlePortrait();
    const landscapeElems = DOMHelpers.getLandscapeElems();
    expect(landscapeElems[0].style.display).toBe('flex');
  });
});

describe('Navigation Menu', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="overflow-item"></div>
      <div id="dropdown-icon"></div>
    `;
  });

  test('showNavOverflow should display overflow items', () => {
    NavManager.showNavOverflow();
    const overflowItems = DOMHelpers.getNavElements().overflowItems;
    expect(overflowItems[0].style.display).toBe('flex');
  });

  test('hideNavOverflow should hide overflow items', () => {
    NavManager.hideNavOverflow();
    const overflowItems = DOMHelpers.getNavElements().overflowItems;
    expect(overflowItems[0].style.display).toBe('none');
  });
});

describe('Developer Mode', () => {
  beforeEach(() => {
    sessionStorage.clear();
    document.body.innerHTML = `
      <div class="show-dev-only"></div>
      <input type="checkbox" id="dev-toggle">
    `;
  });

  test('enabling dev mode should show dev items', () => {
    State.setDev('true');
    DevManager.handleDev();
    const devItems = DOMHelpers.getDevItems();
    expect(devItems[0].style.display).toBe('flex');
  });

  test('disabling dev mode should hide dev items', () => {
    State.setDev('false');
    DevManager.handleDev();
    const devItems = DOMHelpers.getDevItems();
    expect(devItems[0].style.display).toBe('none');
  });
});

describe('Carousel Management', () => {
  beforeEach(() => {
    sessionStorage.clear();
    document.body.innerHTML = `
      <div id="0" class="carousel-item"></div>
      <div id="1" class="carousel-item"></div>
      <div id="2" class="carousel-item"></div>
    `;
  });

  test('initializePage should use provided default', () => {
    const current = CarouselManager.initializePage('test', '1');
    expect(current).toBe('1');
    expect(document.getElementById('1').style.display).toBe('flex');
  });

  test('carouselCycle should show correct item', () => {
    CarouselManager.carouselCycle('test', '1');
    expect(document.getElementById('1').style.display).toBe('flex');
    expect(document.getElementById('0').style.display).toBe('none');
  });

  test('carouselNext should cycle to next item', () => {
    CarouselManager.carouselCycle('test', '0');
    CarouselManager.carouselNext('test');
    expect(document.getElementById('1').style.display).toBe('flex');
  });

  test('carouselPrevious should cycle to previous item', () => {
    CarouselManager.carouselCycle('test', '1');
    CarouselManager.carouselPrevious('test');
    expect(document.getElementById('0').style.display).toBe('flex');
  });
}); 