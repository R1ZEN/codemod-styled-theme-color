'use strict';

const defineTest = require('jscodeshift/dist/testUtils').defineTest;

defineTest(__dirname, 'styled-theme-color', null, 'without-color', { parser: 'ts' });
defineTest(__dirname, 'styled-theme-color', null, 'without-imports', { parser: 'ts' });
defineTest(__dirname, 'styled-theme-color', null, 'theme-import-if-need', { parser: 'ts' });
defineTest(__dirname, 'styled-theme-color', null, 'replace-color-with-theme-path', { parser: 'ts' });
