class MakeOrder {
    constructor(SUDTCell, price) {
        // 构造函数
        this.SUDTCell = SUDTCell;
        this.price = price;
    }
 
    execute() {
        console.log('This is MakeOrder');
        console.log('This SUDTCell:',SUDTCell);
        console.log('This price:',price);
    }
}

module.exports = MakeOrder;