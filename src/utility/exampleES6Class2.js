export default class ExampleES6Class2{
    constructor (){}
    getStaticString(){return 'Webpack';}
}
//needed if you want to require without using .default
module.exports = ExampleES6Class2;