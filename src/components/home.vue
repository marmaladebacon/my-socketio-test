<template>
    <div>
        <div class="starter-template">
            <h1>My Next Project Home</h1>
            <p class="lead">Here's where i describe what goes into my next project<br> node-gulp-webpack-vuejs-bootstrap-awesomefont-git</p>
            <h2>Icons</h2>
            <p><i class="fa fa-rocket"></i></p>
        </div>

        <div>{{message}}
            <helloworld></helloworld>
        </div>
    </div>
</template>

<script>

var hw = require('./helloworld.vue');

module.exports = {
    name: 'home',
    data: function(){
        return {
            message: ' World!!'
        };
    },
    components: {
        helloworld: hw
    }
};
</script>