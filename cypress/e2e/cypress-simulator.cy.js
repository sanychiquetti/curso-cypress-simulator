describe("Cypress Simulator", () => {

  beforeEach(() => {
    cy.login()
    cy.visit("./src/index.html?skipCaptcha=true$chancesOfError=0", {
      onBeforeLoad(win) {
        win.localStorage.setItem("cookieConsent", "accepted")
      }
    })
  })
   it("shows error message when typing and running a valid command without parentheses", () => {
    cy.run('cy.visit')

    cy.get("#outputArea", { timeout: 6000 })
      .should("contain", "Error:")
      .and("contain", "Missing parentheses on `cy.visit` command")
      .and("be.visible")
  })
 
  it("check the run button disabled/enabled states", () => {
    cy.contains('button', 'Run')
      .should('be.disabled')

    cy.get('textarea[placeholder="Write your Cypress code here..."]')
      .type('cy.log("Hi there!")')

    cy.contains('button', 'Run')
      .should('be.enabled')

    cy.get('textarea[placeholder="Write your Cypress code here..."]')
      .clear()
    
    cy.contains('button', 'Run')
      .should('be.disabled')
  })

  it("clear the code input when logging off then logging in again", () => {
    cy.get('textarea[placeholder="Write your Cypress code here..."]')
      .type('cy.log("Hi there!")')

    cy.get('#sandwich-menu').click()
    cy.contains('button', 'Logout').click()
    cy.contains('button', 'Login').click()

    cy.get('textarea[placeholder="Write your Cypress code here..."]')
      .should('have.value', '')
  })

  it("disabled the run button when logging off then logging in again", () => {
    cy.get('textarea[placeholder="Write your Cypress code here..."]')
    .type('cy.log("Hi there!")')

   cy.get('#sandwich-menu').click()
   cy.contains('button', 'Logout').click()
   cy.contains('button', 'Login').click()

    cy.contains('button', 'Run')
      .should('be.disabled')
  })

  it("clears the code output when logging off then logging in again", () => {
    cy.run('cy.log("Hi there!")')

    cy.get('#outputArea', { timeout: 6000 })
      .should('contain', 'Success:')
      .and('contain', 'cy.log("Hi there!") // Logged message "Hi there!"')
      .and('be.visible')

    cy.get('#sandwich-menu').click()
    cy.contains('button', 'Logout').click()
    cy.contains('button', 'Login').click()
      
    cy.get('#outputArea')
      .and('not.contain', 'cy.log("Hi there!") // Logged message "Hi there!"')
  })

  it('doesm´t shows the cookie consent banner on the login page', () => {
    cy.clearAllLocalStorage()

    cy.reload()

    cy.contains('button', 'Login')
      .should('be.visible')
    cy.get('#cookieConsent')
      .should('not.be.visible')
  })
})

describe('Cypress Simulator - Cookies consent', () => {
  beforeEach(() => {
    cy.login()
    cy.visit('./src/index.html?skipCaptcha=true')
})

  it("decline cookies", () => {
    cy.get('#cookieConsent')
      .as('cookiesConsentBanner')
      .find('button:contains("Decline")')
      .click()

    cy.get('@cookiesConsentBanner')
      .should('not.be.visible')
    
    cy.window()
      .its('localStorage.cookieConsent')
      .should('be.equal', 'declined')
  })
})
