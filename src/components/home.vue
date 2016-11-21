<template>
    <div>
        <div class="starter-template">
            <h1>Turtle Report Builder</h1><p><i class="fa fa-rocket"></i></p>
            <p class="lead">A report assembly tool<br><a href="https://gitlab.factset.com/mko/turtle-report-builder">Docs</a> </p>

        </div>
        <helloworld></helloworld>
        <!-- <div>{{message}}

        </div> -->
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