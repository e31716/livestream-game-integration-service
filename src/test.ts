// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'zone.js/dist/zone-testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

declare const require: {
  context(path: string, deep?: boolean, filter?: RegExp): {
    keys(): string[];
    <T>(id: string): T;
  };
};

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);
// Then we find all the tests.

// 利用simonTest生成出來的檔名會多“.gen”這段字來篩選哪些是我們要測試的檔案
const context = require.context('./', true, /\.gen\.spec\.ts$/);
// 或者“指定”要測試的spec檔,用以下寫法
// const context = require.context('./', true, /live-stream-panel.component.gen\.spec\.ts$/);

// And load the modules.
context.keys().map(context);
