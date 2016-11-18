<template>
    <toast :position="position"></toast>
</template>

<script>
var Vue = require('vue');
var Vuex = require('vuex');
var menuTilesList = require('./menu-tiles-list.vue');
var VuexToaster = require('vuex-toast');

module.exports = {
    name: 'toast-wrapper',
    data: function(){
        return{
            position: 'se'
        }
    },
    methods: Vuex.mapActions({
        add: VuexToaster.ADD_TOAST_MESSAGE
    }),
    components:{
        toast: VuexToaster.Toast
    },
    mounted: function(json){
        var _this = this;
        console.log(json);
        _this.$root.$on('makeToast',function(json){
            console.log(json);
            _this.add({text:json.text, type: json.type});
        });
        //this.$root.$emit('deleteCheck');
    }
};
</script>