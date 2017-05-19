(function() {
  'use strict';

  var globals = typeof global === 'undefined' ? self : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = {}.hasOwnProperty;

  var expRe = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (expRe.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var hot = hmr && hmr.createHot(name);
    var module = {id: name, exports: {}, hot: hot};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var expandAlias = function(name) {
    return aliases[name] ? expandAlias(aliases[name]) : name;
  };

  var _resolve = function(name, dep) {
    return expandAlias(expand(dirname(name), dep));
  };

  var require = function(name, loaderPath) {
    if (loaderPath == null) loaderPath = '/';
    var path = expandAlias(name);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    throw new Error("Cannot find module '" + name + "' from '" + loaderPath + "'");
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  var extRe = /\.[^.\/]+$/;
  var indexRe = /\/index(\.[^\/]+)?$/;
  var addExtensions = function(bundle) {
    if (extRe.test(bundle)) {
      var alias = bundle.replace(extRe, '');
      if (!has.call(aliases, alias) || aliases[alias].replace(extRe, '') === alias + '/index') {
        aliases[alias] = bundle;
      }
    }

    if (indexRe.test(bundle)) {
      var iAlias = bundle.replace(indexRe, '');
      if (!has.call(aliases, iAlias)) {
        aliases[iAlias] = bundle;
      }
    }
  };

  require.register = require.define = function(bundle, fn) {
    if (bundle && typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          require.register(key, bundle[key]);
        }
      }
    } else {
      modules[bundle] = fn;
      delete cache[bundle];
      addExtensions(bundle);
    }
  };

  require.list = function() {
    var list = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        list.push(item);
      }
    }
    return list;
  };

  var hmr = globals._hmr && new globals._hmr(_resolve, require, modules, cache);
  require._cache = cache;
  require.hmr = hmr && hmr.wrap;
  require.brunch = true;
  globals.require = require;
})();

(function() {
var global = typeof window === 'undefined' ? this : window;
var __makeRelativeRequire = function(require, mappings, pref) {
  var none = {};
  var tryReq = function(name, pref) {
    var val;
    try {
      val = require(pref + '/node_modules/' + name);
      return val;
    } catch (e) {
      if (e.toString().indexOf('Cannot find module') === -1) {
        throw e;
      }

      if (pref.indexOf('node_modules') !== -1) {
        var s = pref.split('/');
        var i = s.lastIndexOf('node_modules');
        var newPref = s.slice(0, i).join('/');
        return tryReq(name, newPref);
      }
    }
    return none;
  };
  return function(name) {
    if (name in mappings) name = mappings[name];
    if (!name) return;
    if (name[0] !== '.' && pref) {
      var val = tryReq(name, pref);
      if (val !== none) return val;
    }
    return require(name);
  }
};
require.register("components/dashboard/clients.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mithril = require('mithril');

var _mithril2 = _interopRequireDefault(_mithril);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DashboardClients = function () {
    function DashboardClients(p) {
        _classCallCheck(this, DashboardClients);

        console.log('DashboardClients constructor');
        this.name = 'Stivenson';
    }

    _createClass(DashboardClients, [{
        key: 'view',
        value: function view() {
            console.log('DashboardClients view');
            return (0, _mithril2.default)('div', { class: 'dashboard-clients' }, 'Hello, this is a Component implementation of Mithril 1 and ES6 Classes (inside Container). Att ' + this.name);
        }
    }, {
        key: 'oncreate',
        value: function oncreate() {
            console.log('A Component was created');
        }
    }]);

    return DashboardClients;
}();

exports.default = DashboardClients;

});

require.register("config.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var Config = exports.Config = {
    API_URL: 'xxxxxxxxxx'
};

});

require.register("containers/dashboard/dashboard.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mithril = require('mithril');

var _mithril2 = _interopRequireDefault(_mithril);

var _clients = require('../../components/dashboard/clients');

var _clients2 = _interopRequireDefault(_clients);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Dashboard = function () {
    function Dashboard(p) {
        _classCallCheck(this, Dashboard);

        console.log('Dashboard constructor');
        this.theBetter = 'Mithril';
    }

    _createClass(Dashboard, [{
        key: 'view',
        value: function view() {
            console.log('Dashboard view');
            return (0, _mithril2.default)('div', { class: 'dashboard' }, ['Hello, this is a Container implementation of ' + this.theBetter + ' 1 and ES6 Classes.', (0, _mithril2.default)('br'), (0, _mithril2.default)(_clients2.default)]);
        }
    }, {
        key: 'oncreate',
        value: function oncreate() {
            console.log('A Container (component) was created');
        }
    }]);

    return Dashboard;
}();

exports.default = Dashboard;

});

require.register("initialize.js", function(exports, require, module) {
'use strict';

require('localstorage-polyfill');

var _mithril = require('mithril');

var _mithril2 = _interopRequireDefault(_mithril);

var _dashboard = require('containers/dashboard/dashboard');

var _dashboard2 = _interopRequireDefault(_dashboard);

var _MainLayout = require('layouts/MainLayout/MainLayout');

var _MainLayout2 = _interopRequireDefault(_MainLayout);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener('DOMContentLoaded', function () {
    var root = document.getElementById('app');
    localStorage.setItem('user', true); // Hypothetical control variable in the localstorage

    _mithril2.default.route.mode = 'hash';

    var paramsMainLayout = { children: (0, _mithril2.default)(_dashboard2.default) };

    _mithril2.default.route(root, '/', {
        '/': new _MainLayout2.default(paramsMainLayout)
    });
});

});

require.register("layouts/MainLayout/MainLayout.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mithril = require('mithril');

var _mithril2 = _interopRequireDefault(_mithril);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MainLayout = function () {
    function MainLayout(p) {
        _classCallCheck(this, MainLayout);

        console.log('MainLayout Constructor');
        this.children = p.children;
    }

    _createClass(MainLayout, [{
        key: 'logout',
        value: function logout() {
            // Hypothetical logout (simple example of variable)
            alert('This is a called to class method');
            console.log('logout');
            _mithril2.default.route('/');
        }
    }, {
        key: 'existUser',
        value: function existUser() {
            return localStorage.getItem('user') != 'false'; // Hypothetical control variable in the localstorage
        }
    }, {
        key: 'view',
        value: function view() {
            console.log('MainLayout View');
            return (0, _mithril2.default)('div', { class: "MainLayout" }, (0, _mithril2.default)('div', { class: "text-center " + (this.existUser.bind(this) ? "" : "hidden") }, [(0, _mithril2.default)('a', { onclick: this.logout.bind(this) }, [(0, _mithril2.default)('span', { class: 'pt-icon-standard pt-icon-cross' }), 'This is a simple link']), (0, _mithril2.default)('br'), this.children]));
        }
    }, {
        key: 'oncreate',
        value: function oncreate() {
            console.log('A Layout (component) was created');
        }
    }]);

    return MainLayout;
}();

exports.default = MainLayout;

});

require.register("localstorage-polyfill.js", function(exports, require, module) {
'use strict';

// I mean, seriously, localStorage is supported even by your mum. How about instead of
// casing the feature out, you give users in-memory (stale) storage instead?
// If they close your application, they deserve to lose data anyway.

if (!('localStorage' in window)) {
    window.localStorage = {
        _data: {},
        setItem: function setItem(id, val) {
            return this._data[id] = String(val);
        },
        getItem: function getItem(id) {
            return this._data.hasOwnProperty(id) ? this._data[id] : undefined;
        },
        removeItem: function removeItem(id) {
            return delete this._data[id];
        },
        clear: function clear() {
            return this._data = {};
        }
    };
}

});

;require.register("___globals___", function(exports, require, module) {
  
});})();require('___globals___');


//# sourceMappingURL=app.js.map