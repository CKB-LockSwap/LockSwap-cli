class TakeOrder {
    constructor(hash) {
        // 构造函数
        this.hash = hash;
    }

    execute() {
        console.log('This is TakeOrder');
        console.log('order hash:',this.hash);
    }
}

module.exports = TakeOrder;