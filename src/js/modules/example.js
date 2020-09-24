export default class Example {

    constructor(foo) {
        this.bar = foo;
    }

    foo() {
        //something
        console.log("foo");
    }

    toString() {
        console.log(this);
    }
}