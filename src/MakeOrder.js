class MakeOrder {
    constructor(usdtCell, price) {
        // 构造函数
        this.usdtCell = usdtCell;
        this.price = price;
    }

    execute() {
        console.log('This is MakeOrder');
        console.log('This usdtCell:',usdtCell);
        console.log('This price:',price);
    }
}

module.exports = MakeOrder;