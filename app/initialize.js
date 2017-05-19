import 'localstorage-polyfill';
import m from 'mithril';

import Dashboard from 'containers/dashboard/dashboard';
import MainLayout from 'layouts/MainLayout/MainLayout';


document.addEventListener('DOMContentLoaded', () => {
    var root = document.getElementById('app');
    localStorage.setItem('user',true); // Hypothetical control variable in the localstorage

    m.route.mode = 'hash';

    let paramsMainLayout = {children: m(Dashboard)}

    m.route(root, '/', {
        '/': new MainLayout(paramsMainLayout)
    });
});

