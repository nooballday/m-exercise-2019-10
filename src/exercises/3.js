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
    constructor(name, price, type) {
        this.name = name
        this.price = price
        this.type = type
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

    addItem(item) {
        this.items.push(item)
        this.totalAmount += item.price
    }

    initiateUserDiscount() {
        this.addPercentageDiscount('Loyal Customer Discount', Discount.loyalCustomerDiscount(this.user.joinDate), 5)
        this.addPercentageDiscount('Employee Discount', this.user.isEmployee, 30)
        this.addPercentageDiscount('Affiliation User', this.user.isAffiliation, 10)
    }

    addPercentageDiscount(name, condition, value) {
        if (!condition) return
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

    calculateDiscount() {
        const basicDiscount = parseInt(this.totalAmount / 100)
        if (basicDiscount > 0) this.discounts.push(new Discount('Basic Discount', true, 0, basicDiscount * 5))
        this.discounts.forEach(discount => {
            if (discount.condition) {
                if (discount.type === 0) this.totalAmount -= discount.value
                if (discount.type === 1) this.totalAmount -= (this.totalAmount * discount.value / 100)
            }
        })
    }

    printDiscount() {
        this.discounts.forEach(v => console.log(`You got ${v.name}`))
    }

    getTotalAmount() {
        return this.totalAmount
    }
}

export {
    User, Item, Transaction
}