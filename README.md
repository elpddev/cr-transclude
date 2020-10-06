# cr-transclude
Semi Template Transclude Directive for AngularJs/1 

![Node.js CI](https://github.com/elpddev/cr-transclude/workflows/Node.js%20CI/badge.svg?branch=main)

An augmented `ng-transclude` directives that can pass custom data to the transcluded content from its parent. Somewhat like Angular/2 [template outlet](https://angular.io/api/common/NgTemplateOutlet).

[Template Transclusion In AngularJs](https://medium.com/@eyal.lapid/template-transclusion-in-angularjs-da0b1e252be3)

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
<div>{{ $ctrl.listName }}</div.

<my-list items="$ctrl.movies">
   <div>From context: {{ name }}</div>
   <div>From grandparent: {{ $ctrl.listName }}</div>
</my-list>
```

## Additional Info & Attributions

Many thanks to the people who contributed their knowledge and time in the github issues, documents and articles given below. They were invaluable.

* [AngularJs directive $compile document](https://docs.angularjs.org/api/ng/service/$compile#transclusion)
* [AngularJs ng-transclude directive & code](https://docs.angularjs.org/api/ng/directive/ngTransclude%5C)
* [AngularJS ng-repeat directive & code](https://docs.angularjs.org/api/ng/directive/ngRepeat#!)
* [Angular/2 ngTemplate outlet](https://angular.io/api/common/NgTemplateOutlet)
* [angular 1.2.18: ng-repeat problem with transclude](https://medium.com/r?url=https%3A%2F%2Fgithub.com%2Fangular%2Fangular.js%2Fissues%2F7874)
* [article - ng-content: The hidden docs](https://medium.com/claritydesignsystem/ng-content-the-hidden-docs-96a29d70d11b)
* [opensource - ngTranscludeMode & fork for 1.5](https://medium.com/claritydesignsystem/ng-content-the-hidden-docs-96a29d70d11b)

## License

[MIT](https://github.com/elpddev/cr-transclude/blob/main/LICENSE.md)


