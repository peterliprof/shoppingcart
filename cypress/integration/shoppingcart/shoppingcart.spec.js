/// <reference types="cypress" />

context('shoppingcart app', () => {

    beforeEach(() => {
        cy.visit('http://localhost:3000/')
    })

    it('app title', () => {
        cy.get('[data-cy=app-title]').should('have.text', 'Shopping Cart Example')
    })

    it('displays three items by default', () => {
        cy.get('[data-cy=product]').should('have.length', 3)
        cy.get('[data-cy=product]').first().should('have.text', 'iPad 4 Mini - $500.01 x 2')
        cy.get('[data-cy=product]').last().should('have.text', 'Charli XCX - Sucker CD - $19.99 x 5')
    })



    it('default total', () => {
        cy.get('[data-cy=total]').last().should('have.text', 'Total: $0.00')
    })

    it('default checkout button', () => {
        cy.get('[data-cy=checkoutBtn]').should('be.disabled')
    })

    it('can add item to cart', () => {

        cy.get('[data-cy=addBtn]').first().click()
        cy.get('[data-cy=total]').should('have.text', 'Total: $500.01')
        cy.get('[data-cy=product]').first().should('have.text', 'iPad 4 Mini - $500.01 x 1')
        cy.get('[data-cy=checkoutBtn]').should('be.enabled')
        cy.screenshot('addToCart')
    })


    it('should sold out', () => {
        cy.get('[data-cy=addBtn]').first().click().click()
        cy.get('[data-cy=addBtn]').first().should('be.disabled')
        cy.screenshot('soldOut')
    })

    it('add one to cart from every three products', () => {
        cy.get('[data-cy=addBtn]').eq(0).click()
        cy.get('[data-cy=addBtn]').eq(1).click()
        cy.get('[data-cy=addBtn]').eq(2).click()
        cy.get('[data-cy=total]').should('have.text', 'Total: $530.99')
        cy.screenshot('addThree')
    })

    it('type into email', () => {
        cy.get('[data-cy=email]').type('customer@company.com', { delay: 100 }).should('have.value', 'customer@company.com')
        cy.screenshot('typeEmail')
    })

    it('aliasing test', () => {
        cy.get('[data-cy=addBtn]').eq(0).as('firstBtn')
        cy.get('@firstBtn').click()
    })

    it('then test', () => {
        cy.get('[data-cy=product]').first().then(item => {
            const pd = item;
            cy.wrap(pd).as('product');
        });

        cy.get('@product').then(pd => {
            expect(pd).to.contain('iPad 4 Mini')
        })

    })

})