'use strict';

describe('AdminScriptEditor', function() {
    beforeEach(function() {
        module('sovi.controllers');
    });

    it('should have correct editor defaults', inject(function($controller) {
        var scope = {};
        $controller('AdminScriptEditor', { $scope: scope });
        expect(scope.currentTheme).toBe('Monokai');
    }));
});
