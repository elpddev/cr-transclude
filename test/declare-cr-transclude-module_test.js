/* global angular */

import assert from 'assert';
import { declareCrTranscludeModule, crTranscludeModuleName } from '../src/declare-cr-transclude-module';

describe('declareCrTranscludeModule', () => {
  it('should declare the module', () => {
    declareCrTranscludeModule(angular);
  });

  it('should have the module with the same name as the exported name', () => {
    const crTranscludeModule = declareCrTranscludeModule(angular);
    assert.equal(crTranscludeModule.name, crTranscludeModuleName);
  });
});
