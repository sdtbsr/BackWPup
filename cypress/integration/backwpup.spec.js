import {backwpupUrl} from '../support/backwpup.constant'
import {productsPage, wpProducts} from '../support/wpProducts'


describe('Adding products to cart and cart totals',()=>{

    beforeEach('Navigate to backwpup.com',()=>{
        cy.visit(backwpupUrl)
    })

    it('Verify that the names and prices of products are visible on landing page', ()=>{
        productsPage.urlVerification()
        productsPage.productVerification()
        productsPage.priceVerification()
    })

    it('Add one product(s) to the cart', ()=>{

        productsPage.addOneProductToTheCart()
    })

    it('Verify the total price for one product',()=>{
        productsPage.verifyTheTotalPriceForOneProduct()
    })

    it('Verify that same product cannot not be added to cart a second time', ()=>{
        productsPage.addSameProductTwoTimesToCart()
    })

    it('Add multiple products to the cart', ()=>{
        productsPage.addMultipleProductsToCart()
    })

    it('Verify the total price of all products in the cart', ()=>{
        productsPage.verifyTheTotalPriceOfAllProductsInTheCart()
    })
})
