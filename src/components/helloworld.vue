
<template>
    <div class="aloha"> Hello {{stuff}}</div>
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