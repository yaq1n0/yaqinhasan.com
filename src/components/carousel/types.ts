/**
 * Represents an item in the carousel
 */
export interface CarouselItem {
  /**
   * Unique identifier for the item
   */
  id: string;
  
  /**
   * Display label for the item
   */
  label: string;
  
  /**
   * Optional additional properties can be added by extending this interface
   */
  [key: string]: unknown;
} 