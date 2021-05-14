# cr-transclude
Template Transclude Directive for AngularJs/1 

![Node.js CI](https://github.com/elpddev/cr-transclude/workflows/Node.js%20CI/badge.svg?branch=main)

An augmented `ng-transclude` directives that can pass custom data to the transcluded content from its parent. Somewhat like Angular/2 [template outlet](https://angular.io/api/common/NgTemplateOutlet).

[Template Transclusion In AngularJs](https://dev.to/elpddev/hierarchical-dependency-injection-in-angularjs-23m6)

## Install

Package is available as [NPM package](https://www.npmjs.com/package/@code-restory/cr-transclude).

```
yarn add @code-restory/cr-transclude
```

## Usage

1. Setting the module in an application:

```js
import angular from 'angular'; // or <script src="...angular global"></script>

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
<div>{{ $ctrl.listName }}</div>

<my-list items="$ctrl.movies">
   <div>From context: {{ name }}</div>
   <div>From grandparent: {{ $ctrl.listName }}</div>
</my-list>
```

## Demo

https://codesandbox.io/s/cr-transclude-gi6fd?fontsize=14&hidenavigation=1&theme=dark

## Additional Info & Attributions

Many thanks to the people who contributed their knowledge and time in the github issues, documents and articles given below. They were invaluable.

* [AngularJs directive $compile document](https://docs.angularjs.org/api/ng/service/$compile#transclusion)
* [AngularJs ng-transclude directive & code](https://docs.angularjs.org/api/ng/directive/ngTransclude%5C)
* [AngularJS ng-repeat directive & code](https://docs.angularjs.org/api/ng/directive/ngRepeat#!)
* [Angular/2 ngTemplate outlet](https://angular.io/api/common/NgTemplateOutlet)
* [angular 1.2.18: ng-repeat problem with transclude](https://github.com/angular/angular.js/issues/7874)
* [ng-transclude should not create new sibling scope](https://github.com/angular/angular.js/issues/5489)
* [article - ng-content: The hidden docs](https://medium.com/claritydesignsystem/ng-content-the-hidden-docs-96a29d70d11b)
* [opensource - ngTranscludeMode](https://github.com/Izhaki/ngTranscludeMod/blob/master/ngTranscludeMod.js) & [fork for 1.5](https://github.com/NickBolles/ngTranscludeMod/blob/Angular1.5-multi-slot/ngTranscludeMod.js)
* [opensource - angular-directives-utils](https://github.com/gogoout/angular-directives-utils)

## License

[MIT](https://github.com/elpddev/cr-transclude/blob/main/LICENSE.md)


