import assert from 'assert';
import $ from 'jquery';
import angular from 'angular';
import 'angular-mocks';
import { declareCrTranscludeModule } from '../src/declare-cr-transclude-module';

describe('declareCrTranscludeModule', () => {
  let crTranscludeModule = null;
  let $compile = null;
  let $rootScope = null;

  before(() => {
    crTranscludeModule = declareCrTranscludeModule(angular);
  });
  
  it('should declare the module', () => {
  });
  
  it('should have the module with the same name as the exported name', () => {
  });
});
