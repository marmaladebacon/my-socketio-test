<template>
    <div>
        <div class="starter-template">
            <h1>A collection of unrelated projects</h1><p><i class="fa fa-rocket"></i></p>
            <p class="lead">docs<br><a href="https://gitlab.factset.com/mko/turtle-report-builder">Docs</a> </p>

        </div>
        <helloworld></helloworld>
        <!-- <div>{{message}}

        </div> -->
    </div>
</template>

<script>

import hw from './helloworld.vue';

export default {
    name: 'home',
    data(){
        return {
            message: ' World!!'
        };
    },
    components: {
        helloworld: hw
    },
    mounted(){
        //let url = 'http://localhost:8888/mynsp'

    }
};
</script>