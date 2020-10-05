import assert from 'assert';
import $ from 'jquery';
import angular from 'angular';
import 'angular-mocks';
import { declareCrTranscludeModule } from '../src/declare-cr-transclude-module';

describe('crTranscludeDirective', () => {
  let $compile = null;
  let $rootScope = null;

  before(() => {
    const crTranscludeModule = declareCrTranscludeModule(angular);
    const testModule = angular.module('testTransclude', [crTranscludeModule.name]);

    testModule.component('myList', {
      template: `
      <ul>
        <li ng-repeat="item in $ctrl.items track by item.id">
         <div>Ng repeat item scope id: {{ $id }}</div>

         <cr-transclude context="item"></cr-transclude>
        </li>
      </ul>
      `,
      bindings: {
        items: '<',
      },
      transclude: true,
    });

    testModule.component('app', {
      template: `
        <div>
          <my-list items="$ctrl.movies">
            <div class="movieRow"><span class="movieName">{{ name }}</span></div>
          </my-list>
        </div>
      `,
      controller: [function ctrl() {
        this.movies = [{
          id: 1,
          name: 'watchmen',
          year: 2009,
          rating: 5,
        }, {
          id: 2,
          name: 'x-men',
          year: 2000,
          rating: 4,
        },
        ];
      }],
    });
  });

  beforeEach(angular.mock.module('testTransclude'));

  beforeEach(angular.mock.inject(($injector) => {
    $compile = $injector.get('$compile');
    $rootScope = $injector.get('$rootScope');
  }));

  it('should give each item in the list a customize data', () => {
    const node = $compile(`
      <div><app></app></div>
    `)($rootScope);

    $rootScope.$apply();

    /* eslint-disable-next-line */
    const result = $(node).find('.movieName').get(0).innerText.trim();
    const result2 = $(node).find('.movieName').get(1).innerText.trim();

    assert.equal(result, 'watchmen');
    assert.equal(result2, 'x-men');
  });
});
