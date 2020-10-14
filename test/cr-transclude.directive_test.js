import assert from 'assert';
import $ from 'jquery';
import angular from 'angular';
import 'angular-mocks';
import { declareCrTranscludeModule } from '../src/declare-cr-transclude-module';

function myListComponent() {
  return {
    template: `
    <ul>
      <li ng-repeat="item in $ctrl.items track by item.id">
       <cr-transclude context="item"></cr-transclude>
      </li>
    </ul>
    `,
    bindings: {
      items: '<',
    },
    transclude: true,
  };
}

function cardComponent() {
  return {
    template: `
    <div class="my-card">
      <div class="header" cr-transclude="header">default card header</div>
      <div class="body" cr-transclude="body">default card body</div>
      <div class="footer" cr-transclude="footer">default card footer</div>
    </div>
    `,
    bindings: {
      items: '<',
    },
    transclude: {
      header: '?trnHeader',
      body: '?trnBody',
      footer: '?trnFooter',
    },
  };
}

function moviesApp() {
  return {
    template: `
      <div>
        <my-list items="$ctrl.movies">
          <div class="movieRow"><span class="movieName">{{ name }}</span></div>
          <div class="moviesCount">{{ $ctrl.movies.length }}</div>
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
  };
}

function movieProfileCompnent() {
  return {
    template: `
      <div>
        <my-card>
          <trn-header>{{ $ctrl.movie.name }}</trn-header>
          <trn-body>{{ $ctrl.movie.year }}</trn-body>
        </my-card>
      </div>
    `,
    controller: [function ctrl() {
      this.movie = {
        id: 1,
        name: 'watchmen',
        year: 2009,
        rating: 5,
      };
    }],
  };
}

describe('crTranscludeDirective', () => {
  let $compile = null;
  let $rootScope = null;

  beforeEach(angular.mock.inject(($injector) => {
    $compile = $injector.get('$compile');
    $rootScope = $injector.get('$rootScope');
  }));
  
  describe('data access', () => {
    beforeEach(() => {
      const crTranscludeModule = declareCrTranscludeModule(angular);
      const testModule = angular.module('testTransclude', [crTranscludeModule.name]);
      testModule.component('myList', myListComponent());
      testModule.component('app', moviesApp());
    });
    
    beforeEach(angular.mock.module('testTransclude'));

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

    it('should have each child access to the grandparent scope data', () => {
      const crTranscludeModule = declareCrTranscludeModule(angular);
      const testModule = angular.module('testTransclude', [crTranscludeModule.name]);
      testModule.component('myList', myListComponent());
      testModule.component('app', moviesApp());

      angular.mock.module('testTransclude')

      const node = $compile(`
        <app></app>
      `)($rootScope);

      $rootScope.$apply();

      /* eslint-disable-next-line */
      const result = $(node).find('.moviesCount').get(0).innerText.trim();
      assert.equal(result, '2');
    });
  });
  
  describe('slot transclusions', () => {
    beforeEach(() => {
      const crTranscludeModule = declareCrTranscludeModule(angular);
      const testModule = angular.module('testTransclude', [crTranscludeModule.name]);
      testModule.component('myCard', cardComponent());
      testModule.component('movieProfile', movieProfileComponent());
    });
    
    beforeEach(angular.mock.module('testTransclude'));  
    
    it('should transclude slot', () => {  
      const node = $compile(`
        <movie-profile></movie-profile>
      `)($rootScope);

      $rootScope.$apply();

      /* eslint-disable-next-line */
      const headerResult = $(node).find('.my-card .header').get(0).innerText.trim();
      const bodyResult = $(node).find('.my-card .body').get(0).innerText.trim();
      assert.equal(headerResult, 'watchmen');
      assert.equal(bodyResult, '2009'):
    });
    
    it('should use fallback html content when transcluded slot is optional and not given', () => {
      const node = $compile(`
        <movie-profile></movie-profile>
      `)($rootScope);

      $rootScope.$apply();

      /* eslint-disable-next-line */
      const headerResult = $(node).find('.my-card .footer').get(0).innerText.trim();
      assert.equal(footerResult, 'default card footer');
    });
  });  
});
