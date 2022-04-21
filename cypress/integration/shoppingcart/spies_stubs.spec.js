
context('spys_stubs', () => {


    it('stub method', () => {
        const developer = {
            getName: (name) => {
                return name;
            },
            getEmail: (email) => {
                return email;
            },
            errorMethod: () => {
                throw new Error('Error Method')
            }
        }


        cy.spy(developer, 'errorMethod')
        cy.spy(developer, 'getEmail')

        cy.stub(developer, 'getName').returns('Peter Li')

        try {
            developer.errorMethod()
        } catch (e) {

        }

        expect(developer.errorMethod).to.have.throw('Error')

        const name = developer.getName('Developer Name')
        expect(name).to.be.eq('Peter Li')

        const email=developer.getEmail('peterli@company.com')
        expect(email).to.be.eq('peterli@company.com')
        expect(developer.getEmail).to.be.calledWith('peterli@company.com')
        expect(developer.getEmail).to.have.returned('peterli@company.com')
     
    })
})