import m from 'mithril';
import DashboardClients from '../../components/dashboard/clients';

export default class Dashboard {

	constructor(p) {
		console.log('Dashboard constructor');
		this.theBetter = 'Mithril';
	}

    view() {
    	console.log('Dashboard view');
        return m('div',{class: 'dashboard'},[
        	`Hello, this is a Container implementation of ${this.theBetter} 1 and ES6 Classes.`,
        	m('br'),
        	m(DashboardClients)
        	]);
    }

    oncreate() {
        console.log('A Container (component) was created');
    }


}
