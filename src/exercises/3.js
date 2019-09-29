import moment from "moment"

class User {
    constructor(name, joinDate, isEmployee, isAffiliation) {
        this.name = name
        this.joinDate = joinDate
        this.isEmployee = isEmployee
        this.isAffiliation = isAffiliation
    }
}

class Discount {
    // type if either 0 or 1 which is direct subtract or percantage
    constructor(name, condition, type, value) {
        this.name = name
        this.condition = condition
        this.type = type
        this.value = value
    }

    static loyalCustomerDiscount(joinDate) {
        //should user has been a customer for over 2 years
        return moment().diff(joinDate, 'days') > 365 * 2
    }

}

class Item {
    constructor(name, price, type, quantity = 0) {
        this.name = name
        this.price = price
        this.type = type
        this.quantity = quantity
    }
}

class Transaction {
    constructor(user) {
        this.user = user
        this.items = []
        this.discounts = []
        this.totalAmount = 0
        this.initiateUserDiscount()
    }

    /**
     * time complexity for addItemFunction
     * would be o(n) with n being how many percentage discount available
     */
    addItem(item) {
        if (this.discounts.length === 0) {
            this.items.push(item)
        } else {
            this.discounts.forEach(discount => {
                if (discount.condition) {
                    if (discount.type === 0) this.items.push(item)
                    // only discount if anything but groceries
                    if (discount.type === 1 && item.type !== 'groceries') {
                        item.price = item.price -= (item.price * discount.value / 100)
                        this.items.push(item)
                    } else {
                        this.items.push(item)
                    }
                }
            })
        }
    }

    initiateUserDiscount() {
        this.addPercentageDiscount('Loyal Customer Discount', Discount.loyalCustomerDiscount(this.user.joinDate), 5)
        this.addPercentageDiscount('Employee Discount', this.user.isEmployee, 30)
        this.addPercentageDiscount('Affiliation User', this.user.isAffiliation, 10)
    }

    /**
     * add percentage discount's time complexity
     * would be similar to addItem which is o(n)
     * where the n is how many discount applied for the current transaction
     * 
     * add percentage make sure that there is no duplicate discount
     * being applied
     */
    addPercentageDiscount(name, condition, value) {
        if (!condition) return
        // check if there is any discount so that
        // we can check for duplicate percentage discounts
        if (this.discounts.length > 0) {
            this.discounts.forEach((v, i) => {
                if (v.type == 1 && v.value < value) {
                    this.discounts[i] = new Discount(name, condition, 1, value)
                } else {
                    this.discounts.push(new Discount(name, condition, 1, value))
                }
            })
        } else {
            this.discounts.push(new Discount(name, condition, 1, value))
        }
    }

    calculateBasicDiscount(totalAmount) {
        const basicDiscount = parseInt(this.totalAmount / 100)
        if (basicDiscount > 0) return totalAmount - (basicDiscount * 5)
    }

    /**
     * time complexity for total amount is
     * o(n) where n is how many items being calculated
     */
    getTotalAmount() {
        this.items.forEach(item => {
            this.totalAmount += item.price * item.quantity
        })
        return this.calculateBasicDiscount(this.totalAmount)
    }
}

export {
    User, Item, Transaction
}