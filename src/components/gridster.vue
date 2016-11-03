<template>
    <div>
        <div class="demo">
            <div class="gridster" v-gridup>
                <ul>
                    <li data-row="1" data-col="1" data-sizex="1" data-sizey="1"></li>
                    <li data-row="2" data-col="1" data-sizex="1" data-sizey="1"></li>
                    <li data-row="3" data-col="1" data-sizex="1" data-sizey="1"></li>

                    <li data-row="1" data-col="2" data-sizex="2" data-sizey="1"></li>
                    <li data-row="2" data-col="2" data-sizex="2" data-sizey="2"></li>

                    <li data-row="1" data-col="4" data-sizex="1" data-sizey="1"></li>
                    <li data-row="2" data-col="4" data-sizex="2" data-sizey="1"></li>
                    <li data-row="3" data-col="4" data-sizex="1" data-sizey="1"></li>

                    <li data-row="1" data-col="5" data-sizex="1" data-sizey="1"></li>
                    <li data-row="3" data-col="5" data-sizex="1" data-sizey="1"></li>

                    <li data-row="1" data-col="6" data-sizex="1" data-sizey="1"></li>
                    <li data-row="2" data-col="6" data-sizex="1" data-sizey="2"></li>
                </ul>
            </div>
            <p><i class="fa fa-rocket"></i></p>
        </div>
    </div>
</template>

<script>
var Vue = require('vue');
Vue.directive('gridup', {
    inserted: function(el){
        $(".gridster ul").gridster({
            widget_margins: [10, 10],
            widget_base_dimensions: [140, 140],
            resize:{
                enabled:true
            }
        });
    }
});

module.exports = {
    name: 'gridster',
    data: function(){
        return {
            message: ' World!!'
        };
    }
};
</script>

<style>
    ul, ol {
        list-style:none;
    }

    .gridster .gs-w {
        background: #98f442;
        cursor: pointer;
        -webkit-box-shadow: 0 0 5px rgba(0,0,0,0.3);
        box-shadow: 0 0 5px rgba(0,0,0,0.3);
    }
</style>