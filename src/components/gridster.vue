<template>
    <div>
        <div class="starter-template">
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

module.exports = {
    name: 'gridster',
    data: function(){
        return {
            message: ' World!!'
        };
    }
};
</script>