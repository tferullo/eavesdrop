# eavesdrop.js
A jQuery plugin for tracking elements in the viewport and relaying the state to a separate element.

# Getting Started
Initiate eavesdrop on the "Navigation" element that will track the elements that come in and out of view.

```html
<!-- example navigation item -->
<nav class="top-nav">
  <ul>
    <li><a href="#one">one</a></li>
    <li><a href="#two">two</a></li>
    <li><a href="#three">three</a></li>
  </ul>
</nav>
```
The html output is up to you, but each navigation item must at least include an anchor tag `<a>` with a hash `#one` defined in the `href`.

The second part of the html structure is defining which elements will be attached to navigation defined above. This is done by adding a class to the elements that you wish to track.

By default, the class being tracked is `eavesdrop` but you can define a custom class as shown below.
```html
<div class="eavesdrop">
  <p>Hello World! This item is being "tracked" by the nav above.</p>
</div>
<div class="eavesdrop">
  <p>So is this one!</p>
</div>
<div class="eavesdrop">
  <p>And this one!</p>
</div>
```
The elements are related to the nav items in sequential order, meaning the first nav item correlates to the first tracked item and so on.

# Initiate the plugin
```javascript
//call plugin with default optons
$('.element').eavesdrop();

//call the plugin with custom options
$('.element').eavesdrop({
  watchClass: 'eavesdrop',
  activeClass: 'active',
  trackUrl: true,
  offset: 50
});
```

| Option        | Type           | Default    | Descripton |
| ------------- | -------------- | ---------- | ---------- |
| watchClass    | string         | 'eavesdrop'| class to be applied to elements the nav should track |
| activeClass   | string         | 'active'   | class added to the active item in the nav            |
| trackUrl      | boolean        | true       | updates url has on scroll or click (Will always be false if the plugin is initialized more than once.)                   |
| offset        | integer        | 0          | offset pixel to scroll                               |

## Dependencies
jQuery

## License
Licensed under the MIT license.
