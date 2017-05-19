import m from 'mithril';

export default class DashboardClients {

    constructor(p) {
        console.log('DashboardClients constructor');
        this.name = 'Stivenson';
    }

    view() {
        console.log('DashboardClients view');
        return m('div',{class:'dashboard-clients'},`Hello, this is a Component implementation of Mithril 1 and ES6 Classes (inside Container). Att ${this.name}`);
    }

    oncreate() {
        console.log('A Component was created');
    }

}

