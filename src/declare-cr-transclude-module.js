/* eslint import/prefer-default-export: 0 */

import { crTranscludeDirective } from './cr-transclude.directive';

export function declareCrTranscludeModule(angular) {
  const CrTranscludeModule = angular.module('crTransclude', []);

  CrTranscludeModule.directive('crTransclude', crTranscludeDirective);

  return CrTranscludeModule;
}
