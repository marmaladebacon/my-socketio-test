<template>
    <div class='custom-rh-menu'>
        <ul class="list-group" style="padding-left: 4px">
            <li @dragstart="dragStart_Handler" draggable class="list-group-item" v-for="(item, index) in collection" :id="item.id">{{item.id}}</li>
        </ul>
    </div>
</template>
<script>


module.exports = {
    name: 'menu-tiles-list',
    data: function(){
        return {
            collection: [
                {
                    id: 'One'
                },{
                    id: 'Two'
                },{
                    id: 'Three'
                },{
                    id: 'Four'
                },{
                    id: 'Five'
                },{
                    id: 'Six'
                },{
                    id: 'Seven'
                },{
                    id: 'Eight'
                },{
                    id: 'Nine'
                },{
                    id: 'Ten'
                }
            ],
        }
    },
    methods:{
        dragStart_Handler: function(ev){
            ev.dataTransfer.setData('text', ev.target.id);
        }
    },
    created:function(){
        var _this = this;
        /* Updating array example
        gitlabAPI.GetTurtleStoreRepositoryListing().then(function(response){
            var updatedArray = [];
            var blacklist = ['Gruntfile.js', 'bower.json','package.json'];
            var filteredResponse = _.filter(response, function(element){
                if(element.name.indexOf('.') !== 0){ return true;}
                return false;
            })
            _.forEach(filteredResponse, function(element){
                if(element.type === 'blob' && !_.includes(blacklist, element.name)){
                    var cleanedName = element.name.replace('.json', '');
                    updatedArray.push({id: cleanedName});
                }
            });
            _this.collection = updatedArray;
            console.log(updatedArray);
            console.log(_this.collection);
        });*/
    }
}

</script>

<style>
.custom-rh-menu{
    padding-left: 5px;
    top:10vh;
    overflow-y: auto;
    overflow-x: hidden;
}
</style>