<script>
var Vue = require('vue');
var Vuex = require('vuex');

module.exports = Vue.extend({
    name:'gridster-list-tile-child',
    //using <Template> scripts only works if we're not initializing this manually
    template:'<div class="tilewrapper">'+
            '<span class="fa fa-cog" v-on:click="ToggleView" style="position: absolute;z-index: 50;left: 2px;top: 2px;"></span>'+
            '<span class="fa fa-times" v-on:click="DeleteTile" style="position: absolute;z-index: 50;right: 15px;top: 2px;"></span>'+
            '<div class="tile loading" v-show="showloadingtile"></div>'+
            '<div :id="tileid" v-show="showtile" :data-component="tileid" class="tilegridstyle" ></div>'+
            '<div class="settings" v-show="showsettings">'+
                'Tile Config:<input v-model="tileconfigname" />'+
                '<button v-on:click="startTileCreation">Save and close</button>'+
            '</div>'+
            '</div>',
    methods:{
        testMethod:function(){
            console.log('This is '+ this.tileid);
        },
        ToggleView:function(){
            this.showtile = !this.showtile;
            this.showsettings = !this.showsettings;
        },
        DeleteTile: function(ev){
            console.log(ev);
            console.log($(ev.srcElement));
            console.log($(ev.srcElement.parentElement.parentElement));
            this.deleteFlag = true;
            console.log(this);
            this.$root.$emit('deleteCheck');

        },
        startTileCreation: function(){
            this.showtile = false;
            this.showsettings = false;
            this.showloadingtile = true;
            console.log('starting tile creation');
            var tileWrapper = {};
            var _this = this;
        },
    }
});

</script>
<style>
div .tile {
    height: 100%;
    margin: 0px;
    padding: 5px 10px 5px 10px;
    overflow: auto;
}
.tilewrapper {
    height:100%;
}
.tilegridstyle{
    height:100%;
}
.icon-download{
    display:none;
}
.download-button{
    display:none;
}

.settings{
    position:absolute;
    top:10px;
}
</style>