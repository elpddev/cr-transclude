/* eslint import/prefer-default-export: 0 */

import { crTranscludeDirective } from './cr-transclude.directive';

export const crTranscludeModuleName = 'crTransclude';

export function declareCrTranscludeModule(angular) {
  const CrTranscludeModule = angular.module(crTranscludeModuleName, []);

  CrTranscludeModule.directive('crTransclude', crTranscludeDirective);

  return CrTranscludeModule;
}
