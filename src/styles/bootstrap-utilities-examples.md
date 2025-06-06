# Bootstrap Utility Classes Available

## Display Classes

- `d-none` - display: none
- `d-flex` - display: flex
- `d-inline` - display: inline
- `d-block` - display: block
- `d-inline-block` - display: inline-block
- `d-grid` - display: grid

## Flexbox Classes

- `d-flex` - display: flex
- `flex-row` - flex-direction: row
- `flex-column` - flex-direction: column
- `justify-content-start` - justify-content: flex-start
- `justify-content-center` - justify-content: center
- `justify-content-between` - justify-content: space-between
- `justify-content-around` - justify-content: space-around
- `align-items-center` - align-items: center
- `align-items-start` - align-items: flex-start
- `align-items-end` - align-items: flex-end

## Spacing Classes (Margin & Padding)

- `m-0` to `m-5` - margin (all sides)
- `mt-0` to `mt-5` - margin-top
- `mb-0` to `mb-5` - margin-bottom
- `ms-0` to `ms-5` - margin-start (left in LTR)
- `me-0` to `me-5` - margin-end (right in LTR)
- `mx-0` to `mx-5` - margin horizontal
- `my-0` to `my-5` - margin vertical

- `p-0` to `p-5` - padding (all sides)
- `pt-0` to `pt-5` - padding-top
- `pb-0` to `pb-5` - padding-bottom
- `ps-0` to `ps-5` - padding-start (left in LTR)
- `pe-0` to `pe-5` - padding-end (right in LTR)
- `px-0` to `px-5` - padding horizontal
- `py-0` to `py-5` - padding vertical

## Text Classes

- `text-start` - text-align: left
- `text-center` - text-align: center
- `text-end` - text-align: right
- `text-uppercase` - text-transform: uppercase
- `text-lowercase` - text-transform: lowercase
- `text-capitalize` - text-transform: capitalize

## Width & Height

- `w-25`, `w-50`, `w-75`, `w-100` - width percentages
- `h-25`, `h-50`, `h-75`, `h-100` - height percentages

## Position

- `position-relative` - position: relative
- `position-absolute` - position: absolute
- `position-fixed` - position: fixed
- `position-sticky` - position: sticky

## Examples:

```html
<!-- Flexbox layout -->
<div class="d-flex justify-content-between align-items-center">
  <div>Left content</div>
  <div>Right content</div>
</div>

<!-- Spacing -->
<div class="p-3 m-2">Padded and margined div</div>
<div class="ps-2 pe-4">Padding start 2, padding end 4</div>

<!-- Text alignment -->
<div class="text-center">Centered text</div>
```
