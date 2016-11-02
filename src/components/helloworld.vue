
<template>
    <div class="aloha"> This is a static string from a subcomponent,  {{stuff}}</div>
</template>

<script>
module.exports = {
    name: 'helloworld',
    data: function(){
        return {
            stuff: ' World!!'
        };
    }
};
</script>

<style scoped>
.aloha {
    color: blue
}
</style>