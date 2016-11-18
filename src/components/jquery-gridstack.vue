<template>
    <div class="custom-gridster-container darklue" v-on:click="serializeGridData" @dragover.prevent @drop="dropoff">
        <div class="grid-stack" v-gridstack-init style="height: 100%">

        </div>
    </div>
</template>
<script>
var Vue = require('vue');
var Vuex = require('vuex');
var GridsterChild = require('./gridster-list-tile-child.vue');
//var menuTilesList = require('./menu-tiles-list.vue');
//var GridsterChild = require('./gridster-list-tile-child.vue');
//var GridStack = require('./../../resources/gridstack27/gridstack.js');
//var GridStackjQuery = require('./../../resources/gridstack27/gridstack.jQueryUI.js');

Vue.directive('gridstack-init', {
    inserted: function(el){
        $('.grid-stack').gridstack({
                width: 3,
                height: 16,
                cellHeight: '10vh',
                float: true,
                alwaysShowResizeHandle: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
                resizable: {
                    handles: 'e, se, s, sw, w'
                }
            });
    }
});

module.exports = {
    name: 'jquery-gridstack',
    props: ['reportconfig'],
    beforeCreate: function(){
        this.$store.commit('resetapploaded');
    },
    data: function(){
        return{
            currReportConfig: this.reportconfig,
            currtileid: 0,
            tiles: [],
            grid:{},
        }
    },
    computed: Vuex.mapState({
        apploaded:'apploaded'
    }),
    mounted: function(){
        var _this = this;
        this.$root.$on('reloadGrid', function(jsonObj){
            _this.currReportConfig = jsonObj;
            _this.grid.removeAll();
            _this.tiles = [];
            _this.loadGrid();
        });
        this.$root.$on('getTileLayout', function(){
            _this.$root.$emit('returnTileLayout', _this.serializeGridData());
        });
        this.$root.$on('deleteCheck',function(){
            _this.doDeleteCycle();
        });
    },
    watch: {
        apploaded:{
            handler: function(value, oldVal){
                console.log('Changed from '+oldVal+ ' to '+value);
                //ToDo: Load bandit tile and attach it to the app here
                if(value === true){
                    console.log('App should have loaded, Loading grid');
                    this.loadGrid();

                }
            },
            immediate: true
        }
    },
    methods:{
        dropoff: function(ev){
            console.log(ev);
            var tilename = ev.dataTransfer.getData('text');
            if(_.isUndefined(tilename)){return;}
            var tileComponent = this.addNewItem({
                tilename: tilename,
                x: 0,
                y: 0,
                width: 1,
                height: 3,
            })
            tileComponent.startBanditTileCreation();

        },
        //conversion to turtle report config will be based width of each tile.
        //if current total width exceeds column number, we will automatically make a new row.
        loadGrid: function(){
            var _this = this;
            if(_.isEmpty(this.grid) || _.isUndefined(this.grid)){
                this.grid = $('.grid-stack').data('gridstack');
            }
            console.log('LOADING REPORT');
            console.log(this.currReportConfig);

            this.currReportConfig.tilelayout.forEach(function(tile, col_index){
                    _this.addNewItem({
                        id:tile.id,
                        tilename: tile.tilename,
                        x: tile.x,
                        y: tile.y,
                        width: tile.width,
                        height: tile.height
                    });
                }, this);

            this.tiles.forEach(function(ele){
                ele.testMethod();
                //ele.startBanditTileCreation();
            });
        },
        addNewItem: function(tileConfig){
            //this.grid.addWidget($('<div><div class="grid-stack-item-content" /><div/>'),node.x, node.y, node.width, node.height);
            //this.grid.addWidget($('<div><div class="grid-stack-item-content" /><div/>'),1,1,10,10);
            //var li_dom_jquery_ref = this.grid.addWidget($('<div><div class="grid-stack-item-content" /></div>'));
            var usedIds = [];
            console.log('Adding new tile config:');
            console.log(tileConfig);
            $('.gridstack-tile-placeholder').each(function(){
                console.log(this);
                usedIds.push($(this).attr('data-custom-id'));
            });
            console.log('usedIds'+ usedIds);
            var currTileIdStr = (_.isEmpty(tileConfig.id) || _.isUndefined(tileConfig.id))? 'btile_'+this.currtileid : tileConfig.id;
            while(_.includes(usedIds, currTileIdStr)){
                this.currtileid+=1;
                currTileIdStr = 'btile_'+this.currtileid;
            }
            this.currtileid+=1;
            var li_dom_jquery_ref = this.grid.addWidget('<div class="gridstack-tile-placeholder" data-custom-id=\"'+currTileIdStr+'\" data-tile-name=\"'+
                tileConfig.tilename+'\"><div class="grid-stack-item-content"></div></div>',tileConfig.x,tileConfig.y,
                tileConfig.width,tileConfig.height);

            console.log(li_dom_jquery_ref);
            console.log('Adding tile:'+tileConfig.tilename);
            var _this = this;

            var component = new GridsterChild({
                //template:'<div class="tilewrapper" :tileid="tileid">Ello<div class="tile loading" ></div> </div>',
                parent: _this,
                data: {
                    tileid: currTileIdStr,//tileConfig.tileId,
                    tileconfigname: tileConfig.tilename,
                    showloadingtile: true,
                    showtile: false,
                    showsettings: false,
                    deleteFlag: false,
                }
            }).$mount();
            li_dom_jquery_ref.append(component.$el);
            //console.log($(queryStr));
            console.log(component);
            this.tiles.push(component);
            return component;
        },
        doDeleteCycle: function(){
            console.log('Delete check called');
            var toBeDeleted = [];
            var _this = this;
            this.tiles.forEach(function(ele){
                console.log(ele);
                if(ele.deleteFlag === true){
                    //toBeDeleted.push();
                    _this.grid.removeWidget(ele.$el.parentElement);
                }
            });
            console.log(this.tiles.length);
            console.log('deleting tile');
            _.remove(this.tiles, function(ele){
                return ele.deleteFlag === true;
            });
            console.log(this.tiles.length);
            //grid-stack-item-content class probably has a z-index between tile and none
        },
        serializeGridData: function(){
            var tileLayout = _.map($('.grid-stack > .grid-stack-item:visible'), function (el) {
                        el = $(el);
                        var node = el.data('_gridstack_node');
                        return {
                            id: el.attr('data-custom-id'),
                            tilename: el.attr('data-tile-name'),
                            x: node.x,
                            y: node.y,
                            width: node.width,
                            height: node.height
                        };
                    }, this);
            console.log(tileLayout);
            return tileLayout;
        }
    }
}
//Delete widget demo view-source:http://troolee.github.io/gridstack.js/demo/rtl.html
//Add widget demo: view-source:http://troolee.github.io/gridstack.js/demo/float.html
//2grid demo: http://troolee.github.io/gridstack.js/demo/two.html

/* See view-source:http://troolee.github.io/gridstack.js/
>
 */
</script>


<style>

.custom-gridster-container{
    width: 78vw;
    height:98vh;
    padding-left:0px;
    margin-left: 0px;
    overflow-y: scroll;
}
.grid-stack-item {
    background-color: whitesmoke;
    margin-left: 5px;
    margin-right: 5px;
}
.stack-item-handle{
    z-index: 7000;
}
.darklue { background: #2c3e50; }
.darklue hr.star-light::after {
    background-color: #2c3e50;
}

</style>