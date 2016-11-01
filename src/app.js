var statics = require('./utility/staticStrings.js');
var Vue = require('vue');
var hw = require('./components/helloworld.vue');

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

//document.write(statics.staticString);