<template>
    <div>
        <jquery-gridstack :reportconfig="reportconfig"></jquery-gridstack>
        <div class="builder-options-menu">
            <div class="grid-button-menu">
                <button class="fa fa-save" v-on:click="openSaveDialog" ></button>
                <button class="fa fa-download" v-on:click="openLoadDialog"></button>
            </div>
            <menu-tiles-list></menu-tiles-list>

        </div>
        <div id="dialog-save" class="tile hide">
                Enter config name:
                <input type="text" placeholder="Enter config name" v-model="currentReportName"/>
            </div>
            <div id="dialog-load" class="tile hide" >
                Enter or select config name:
                <input type="text" placeholder="Enter config name" v-model="loadReportName"/>
        </div>

    </div>
</template>
<script>
var Vue = require('vue');
var VueResource = require('vue-resource');
var Vuex = require('vuex');
var JqueryGrid = require('./jquery-gridstack.vue');
var $ = require('jquery');
var menuTilesList = require('./menu-tiles-list.vue');

module.exports = {
    name: 'report-builder',
    components:{
        'jquery-gridstack': JqueryGrid,
        'menu-tiles-list': menuTilesList,
    },
    data:function(){
        return {
            reportconfig:{
                maxColumns: 3,
                tilelayout:[
                        {
                            id:'btile_0',
                            tilename:'marketsynopsis_country_cds',
                            x: 0,
                            y: 0,
                            width: 2,
                            height: 3
                        }, {
                            id: 'btile_1',
                            tilename:'marketsynopsis_country_sector_valuation',
                            x: 2,
                            y: 0,
                            width: 1,
                            height: 3
                        }],
            },
            currentReportName: '',
            loadReportName: '',
            staticMsg: 'this is the report builder using gridstack',
        };
    },
    mounted: function(){
        console.log('Running create bandit app');

        this.$store.commit('setapploaded');
        var _this = this;
        this.$root.$on('returnTileLayout', function(tileLayout){
            _this.reportconfig.tilelayout = tileLayout;
            _this.SaveReportConfig(_this.reportconfig);
        })
    },
    methods: {
        openSaveDialog: function(){
            console.log('Opening save dialog');

            this.openDialog('dialog-save', 'Save Report Config',
                'Save', this.onCloseSaveDialogSave.bind(this),
                'Cancel', this.onCloseSaveDialogCancel.bind(this)
            );
        },
        onCloseSaveDialogSave: function(){
            console.log(this.staticMsg);
            this.closeDialog('dialog-save');
            this.makeToast('Starting save', 'info');
            this.$root.$emit('getTileLayout');
        },
        SaveReportConfig: function(json){
            var _this = this;
            var content = JSON.parse( JSON.stringify(this.reportconfig));
             _this.makeToast('Save complete','success');

        },
        onCloseSaveDialogCancel: function(){
            this.closeDialog('dialog-save');
        },
        openLoadDialog: function(){
            this.openDialog('dialog-load', 'Load Report Config',
                'Load', this.onCloseLoadDialogLoad.bind(this),
                'Cancel', this.onCloseLoadDialogCancel.bind(this)
            );
        },
        onCloseLoadDialogLoad: function(){
            this.closeDialog('dialog-load');
            this.makeToast('Loading existing config', 'info');
            var _this = this;
            _this.makeToast('Done loading existing config', 'success');
            _this.$store.commit('resetapploaded');
            _this.$root.$emit('reloadGrid',jsonObj);
        },
        onCloseLoadDialogCancel: function(){
            this.closeDialog('dialog-load');
        },

        closeDialog: function(domId){
            var domIdStr = '#'+domId;
            var _this = this;
            $(domIdStr).dialog('close');
            $('#modalfade').hide();
        },
        openDialog: function(domId, titleStr, okStr, okCb, cancelStr, cancelCB){
            var domIdStr = '#'+domId;
            $(domIdStr).dialog({
                autoOpen: false,
                modal: true,
                minWidth: 400,
                maxWidth: 700,
                minHeight: 150,
                maxHeight: 800,
                title: titleStr,
                buttons: [
                    { text: okStr, click: okCb},
                    { text: cancelStr, click: cancelCB}
                ],
            });
            $(domIdStr).dialog('open');
            $('#modalfade').show();
        },

        makeToast: function(textStr, typeStr){
            this.$root.$emit('makeToast',{text:textStr, type:typeStr});
        }

    },


}
</script>

<style>
.ui-dialog.ui-corner-all.ui-widget{
    z-index: 8000;
}

.grid-button-menu{
    position:fixed;
    left: 5vw;
    top: 5vh;
    font-size:3em;
}
.custom-gridster-container{
    float:right;
}
.builder-options-menu{
    position: absolute;
    height: 98vh;
    width: 20vw;
    top: 10vh;
    left: 0vw;
    overflow-y: auto;
    overflow-x: hidden;
}
</style>

