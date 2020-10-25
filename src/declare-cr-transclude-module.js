/* eslint import/prefer-default-export: 0 */

import { crTranscludeDirectiveFactory } from './cr-transclude.directive';

export const crTranscludeModuleName = 'crTransclude';

export function declareCrTranscludeModule(angular) {
  const CrTranscludeModule = angular.module(crTranscludeModuleName, []);

  CrTranscludeModule.directive('crTransclude', crTranscludeDirectiveFactory(angular));

  return CrTranscludeModule;
}
