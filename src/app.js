var Vue = require('vue');
var VueRouter = require('vue-router');
var VueResource = require('vue-resource');
var Vuex = require('vuex');
var $ = require('jquery');

var c_Home = require('./components/home.vue');
var c_ReportBuilderGridstack = require('./components/report-builder-gridstack.vue');

var c_ToastWrapper = require('./components/toast-wrapper.vue');
var VuexToast = require('vuex-toast');
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(Vuex);
Vue.directive('gridup', {
    inserted: function(el){
        $(".gridster ul").gridster({
            widget_margins: [10, 10],
            widget_base_dimensions: [140, 140],
            resize:{
                enabled:true
            }
        });
    }
});
/* not sure how this works, tried binding to the main instance but it does not change
var bus = new Vue();
*/

var store = new Vuex.Store({
    modules:{
        toast: VuexToast.createModule({
            dismissInterval: 8000,
        })
    },
    state:{
        count:0,
        apploaded: false,
        tileToDelete: {}
    },
    mutations:{
        increment: function(state){
            state.count++;
        },
        decrement: function(state){
            state.count--;
        },
        setapploaded: function(state){
            state.apploaded= true;
            console.log('true mutation called');
        },
        resetapploaded:function(state){
            state.apploaded= false;
            console.log('false mutation called');
        }
    },
    actions:{

    }
});

var routes = [
    {path:'/home', component: c_Home},
    {path: '/reportbuildergridstack', component: c_ReportBuilderGridstack},
    {path:'*', redirect: '/home'}

];
var router = new VueRouter({
    routes: routes
});

var app = new Vue({
    el: '#app',

    router: router,
    store: store,
    components:{
        c_Home: c_Home,
        c_ReportBuilderGridstack: c_ReportBuilderGridstack,
        'toast-wrapper': c_ToastWrapper,
    },
    methods:{
        doClickMsg: function(e){
            console.log('Something clicked');
            console.log(e);
        }
    }
});