import m from 'mithril';


export default class MainLayout {

    constructor(p) {
        console.log('MainLayout Constructor');
        this.children = p.children;
    }

    logout() {  // Hypothetical logout (simple example of variable)
        alert('This is a called to class method');
        console.log('logout');
    }

    existUser() {
        return localStorage.getItem('user') != 'false'; // Hypothetical control variable in the localstorage
    }

    view() {
        console.log('MainLayout View');
        return m('div',{class:"MainLayout"},m('div',{class:"text-center "+(this.existUser.bind(this) ? "" : "hidden")},[
                m('a',{onclick:this.logout.bind(this)},[
                m('span',{class:'pt-icon-standard pt-icon-cross'}),'This is a simple link'
            ]),
            m('br'),
            this.children
        ]));
    }

    oncreate() {
        console.log('A Layout (component) was created');
    }

}
