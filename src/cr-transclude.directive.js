/* eslint no-unused-vars: 0 */
/* eslint import/prefer-default-export: 0 */

// eslint-disable-next-line import/no-extraneous-dependencies
import angular from 'angular';

const NODE_TYPE_TEXT = 3;

export const crTranscludeDirective = [
  '$compile',
  ($compile) => ({
    restrict: 'EAC',
    compile: function crTranscludeCompile(tElement) {
      // Remove and cache any original content to act as a fallback
      const fallbackLinkFn = $compile(tElement.contents());
      tElement.empty();

      return function crTranscludePostLink(
        $scope,
        $element,
        $attrs,
        _controller,
        $transclude,
      ) {
        let context = null;
        let childScope = null;

        function useFallbackContent() {
          // Since this is the fallback content rather than the transcluded content,
          // we link against the scope of this directive rather than the transcluded scope
          fallbackLinkFn($scope, (clone) => {
            $element.append(clone);
          });
        }

        function updateScope(scope, varsHash) {
          if (!scope || !varsHash) {
            return;
          }

          angular.extend(scope, varsHash);
        }

        function notWhitespace(nodes) {
          for (let i = 0, ii = nodes.length; i < ii; i += 1) {
            const node = nodes[i];
            if (node.nodeType !== NODE_TYPE_TEXT || node.nodeValue.trim()) {
              return true;
            }
          }

          return false;
        }

        function transcludeCloneAttachFn(clone, transcludedScope) {
          if (clone.length && notWhitespace(clone)) {
            $element.append(clone);
            childScope = transcludedScope;
            updateScope(childScope, context);
          } else {
            useFallbackContent();
            /*
             * There is nothing linked against the transcluded scope
             * since no content was available,
             * so it should be safe to clean up the generated scope.
             */
            transcludedScope.$destroy();
          }
        }

        if (!$transclude) {
          throw new Error(
            'orphan',
            'Illegal use of crTransclude directive in the template! '
            + 'No parent directive that requires a transclusion found. '
            + 'Element: {0}',
          );
        }

        /*
         * If the attribute is of the form: `ng-transclude="ng-transclude"`
         * then treat it like the default
         */
        if ($attrs.crTransclude === $attrs.$attr.crTransclude) {
          // eslint-disable-next-line no-param-reassign
          $attrs.crTransclude = '';
        }
        const slotName = $attrs.crTransclude || $attrs.crTranscludeSlot;

        $scope.$watch($attrs.context, (newVal, _oldVal) => {
          context = newVal;
          updateScope(childScope, context);
        });

        /*
         * If the slot is required and no transclusion content
         * is provided then this call will throw an error
         */
        $transclude(transcludeCloneAttachFn, null, slotName);

        /*
         * If the slot is optional and no transclusion content
         * is provided then use the fallback content
         */
        if (slotName && !$transclude.isSlotFilled(slotName)) {
          useFallbackContent();
        }
      };
    },
  }),
];
