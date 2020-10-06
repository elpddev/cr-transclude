# cr-transclude
Semi Template Transclude Directive for AngularJs/1 

![Node.js CI](https://github.com/elpddev/cr-transclude/workflows/Node.js%20CI/badge.svg?branch=main)

An augmented `ng-transclude` directives that can pass custom data to the transcluded content from its parent. Somewhat like Angular/2 [template outlet](https://angular.io/api/common/NgTemplateOutlet).

## Install

## Usage

1. Setting the module in an application:

```js
import angular from 'angular; // or <script src="...angular global"></script>

const crTranscludeModule = declareCrTranscludeModule(angular);
const myAppModule = angular.module('myApp', [crTranscludeModule.name]);
```

2. Then, using the directive in templates:

```js
<li ng-repeat="item in $ctrl.items track by item.id">
  <cr-transclude context="item"></cr-transclude>
</li>
```

In the transcluded content, there is access to the grandparent scope and the properties given to the context bindings.

```js
<div>{{ $ctrl.listName }}</div.

<my-list items="$ctrl.movies">
   <div>From context: {{ name }}</div>
   <div>From grandparent: {{ $ctrl.listName }}</div>
</my-list>
```

## Additional Resources

## License

[MIT](https://github.com/elpddev/cr-transclude/blob/main/LICENSE.md)


