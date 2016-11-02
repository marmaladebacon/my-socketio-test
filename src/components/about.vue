<template>
    <div>
        <div>This is a simple about view</div>
        <div>{{stuff}}</div>
    </div>
</template>

<script>
module.exports = {
    name: 'about',
    data: function(){
        return {
            stuff: ' World!!'
        };
    }
};
</script>