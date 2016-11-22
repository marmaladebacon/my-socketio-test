
<template>
    <div class="aloha"> Using the following: {{stuff}}</div>
</template>

<script>
//var ExampleES6Class = require('./../utility/exampleES6Class.js').default;
import exampleES6Class from './../utility/exampleES6Class.js';
var ExampleES6Class2 =  require('./../utility/exampleES6Class2.js');
var stat = new exampleES6Class();
var stat2 = new ExampleES6Class2();
module.exports = {
    name: 'helloworld',
    data: function(){
        return {
            stuff: stat.getStaticString()+','+stat2.getStaticString(),
        };
    }
};
</script>

<style scoped>
.aloha {
    color: blue
}
</style>