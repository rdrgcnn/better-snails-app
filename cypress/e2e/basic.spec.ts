context('Basic', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('basic nav', () => {
    cy.url().should('eq', 'http://localhost:3333/')

    cy.get('[btn]').should('exist')

    cy.get('[btn]')
      .click()
      .url()
      .should('eq', 'http://localhost:3333/vehicles')

    cy.get('.nav-back').should('exist')

    cy.get('.nav-back').click().url().should('eq', 'http://localhost:3333/')
  })

  it('configuration menu', () => {
    cy.get('.right').should('exist')
    cy.get('.right').click()
    cy.get('.menu').should('exist')
    cy.get('.right').click()
    cy.get('.menu').should('not.exist')
  })
})
