var Vue = require('vue');
var VueRouter = require('vue-router');
var $ = require('jquery');
var statics = require('./utility/staticStrings.js');
var c_About = require('./components/about.vue');
var c_Home = require('./components/home.vue');
var c_Gridster = require('./components/gridster.vue');

Vue.use(VueRouter);

var routes = [
    {path:'/home', component: c_Home},
    {path:'/about', component: c_About},
    {path:'/gridster', component: c_Gridster},
    {path:'*', redirect: '/home'}

];
var router = new VueRouter({
    routes: routes
});

var app = new Vue({
    el: '#app',
    router: router,
    methods:{
        doClickMsg: function(e){
            console.log('Something clicked');
            console.log(e);
        }
    }
});


/*
var app = new Vue({
    el: '#app',
    components: {
        helloworld: hw
    },
    data:{
        message: 'Hello: '+statics.staticString,
    },
    methods:{
        doClickMsg: function(e){
            console.log('Something clicked');
            console.log(e);
        }
    }

});
*/


//document.write(statics.staticString);