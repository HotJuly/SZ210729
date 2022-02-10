import view from './components/view';
import link from './components/link';

function install(Vue){
    Vue.component(view.name,view);
    Vue.component(link.name,link);
}

export default install