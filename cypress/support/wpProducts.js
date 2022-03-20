/// <reference types = "cypress"/>

import {backwpupUrl, urlAfterAddtoCart, errorMessage} from './backwpup.constant'
var data =require('../fixtures/products.json')

export class products{

    urlVerification(){
        cy
        .wait(500)
        
        cy
        .url()
        .should('eq',backwpupUrl)
    }

    productVerification(){
        cy
        .wait(500)
        
        cy
        .get('[class="LicenceSection-boxHeadline"]')
        .each((prod,index)=>{
            const text = prod.text()
            expect(text).to.contain(data.products[index])
        })
    }

    priceVerification(){
        cy.wait(500)
        cy.get('.the-price').each((price,index)=>{
            const text = price.text()
            cy.log(text)
            expect(text).to.contain(data.prices[index])
        })
    }

    addOneProductToTheCart(){
        cy.wait(500)
        
        cy.get('button[type="submit"]').first().click()
        cy.url().should('eq', urlAfterAddtoCart)

    }

    verifyTheTotalPriceForOneProduct(){
        cy
        .get('button[type="submit"]')
        .eq(2)
        .click()
        
        cy
        .wait(500)
        
        cy
        .get('strong > .woocommerce-Price-amount > bdi')
        .should('contain.text','199.00')
    }

    addSameProductTwoTimesToCart(){
        cy
        .wait(500)

        cy
        .get('button[type="submit"]')
        .first()
        .click()
        
        cy
        .go('back')
        
        cy
        .wait(500)
        
        cy
        .get('button[type="submit"]')
        .first()
        .click()
        
        cy
        .contains(errorMessage.trim())
        .should('be.visible')
    }

    addMultipleProductsToCart(){
        
        for (let index = 1; index < 6; index++) {
            cy
            .get(':nth-child('+index+') > footer > form > .LicenceSection-button').click()
            
            cy
            .go('back')
            
        }
        
    }

    verifyTheTotalPriceOfAllProductsInTheCart(){

        for (let index = 1; index < 6; index++) {
            cy
            .get(':nth-child('+index+') > footer > form > .LicenceSection-button').click()
            
            cy
            .go('back')            
        }

        cy.get('.muenchen_header_additions > .muenchen_mini_cart > :nth-child(1) > .woocommerce-Price-amount')
        .scrollIntoView()
        .click()
        .title()
        .should('equal','Cart – BackWPup')
        
        cy
        .get('strong > .woocommerce-Price-amount > bdi')
        .should('contain.text','1,015.00')
        

    }

}

export const productsPage = new products