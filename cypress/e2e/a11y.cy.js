describe('Cypress Simulator - A11y Checks', () => {
   beforeEach(() => {
      cy.login()
      cy.visit('./src/index.html?skipCaptcha=true&chancesOfError=0', {
         onBeforeLoad(win) {
            win.localStorage.setItem('cookieConsent', 'accepted')
         } 
      })
      cy.injectAxe()
   })

   it("successfully simulates a Cypress command cy.visit()", () => {
      cy.run("cy.visit('https://www.linkedin.com/in/sanychiquettigarcia/')")
  
      cy.get("#outputArea", { timeout: 8000 })
        .should("contain", "Success:")
        .and("contain", "cy.visit('https://www.linkedin.com/in/sanychiquettigarcia/') // Visited URL 'https://www.linkedin.com/in/sanychiquettigarcia/'")
        .and("be.visible")

      cy.checkA11y('.success')
    })
    it("shows error message when typing and running invalid Cypress command cy.run()", () => {
      cy.run('cy.run()')
  
      cy.get("#outputArea", { timeout: 6000 })
        .should("contain", "Error:")
        .and("contain", "Invalid Cypress command: cy.run()")
        .and("be.visible")
      
      cy.checkA11y('.error')
    })
  
    it("shows warning message when typing and running a not-implemented Cypress command ", () => {
      cy.run('cy.contains("Logout")')
  
      cy.get("#outputArea", { timeout: 6000 })
        .should("contain", "Warning:")
        .and("contain", "The `cy.contains` command has not been implemented yet.")
        .and("be.visible")

      cy.checkA11y('.warning')
    })

    it("asks for help and gets common Cypress commands and examples with a link to the docs", () => {
      cy.run('help')
  
      cy.get("#outputArea", { timeout: 6000 })
        .should("contain", "cy.visit(url: string)")
        .and("contain", "For more commands and details, visit the official Cypress API documentation")
        .and("be.visible")
      cy.contains("#outputArea a", "official Cypress API documentation")
        .should("have.attr", "href", "https://docs.cypress.io/api/table-of-contents")
        .and("have.attr", "target", "_blank")
        .and("have.attr", "rel", "noopener noreferrer")
        .and("be.visible")

        cy.checkA11y('#outputArea')
    })
  
    it("maximizes and minimizes a simulation result", () => {
      cy.run('cy.log("Hi there!")')
  
      cy.get(".expand-collapse").click()
  
      cy.get("#outputArea", { timeout: 8000 })
        .should("contain", "Success:")
        .and("contain", 'cy.log("Hi there!") // Logged message "Hi there!"')
        .and("be.visible")
      cy.get("#collapseIcon").should("be.visible")

      cy.checkA11y()
  
      cy.get(".expand-collapse").click()
      cy.get("#expandIcon").should("be.visible")
    })
  
    it("logs out successfully", () => {
      cy.get('#sandwich-menu').click()
      cy.contains("button", "Logout").click()
  
      cy.contains("button", "Login").should("be.visible")
      cy.get('#sandwich-menu').should('not.be.visible')

      cy.checkA11y()
    })

    it("shows and hides the logout  button", () => {
      cy.get('#sandwich-menu').click()
  
      cy.contains("button", "Logout").should("be.visible")

      cy.checkA11y()
  
      cy.get('#sandwich-menu').click()
   
      cy.contains("button", "Logout").should("not.be.visible")
    })
  
    it("shows the running state before showing the final result", () => {
      cy.run('cy.log("Hi there!")')
  
      cy.contains('button', 'Running...').should('be.visible')
      cy.contains('#outputArea', 'Running... Please wait.')
        .should('be.visible')
  
      cy.contains(
        'button', 
        'Running...', 
        { timeout: 6000}
      ).should('not.exist')

      cy.checkA11y()

      cy.contains('button', 'Run')
         .should('be.visible')

      cy.contains(
        '#outputArea', 
        'Running... Please wait.',
        { timeout: 6000}
      ).should('not.exist')
  
      cy.get('#outputArea')
        .should('contain', 'Success:')
        .and('contain', 'cy.log("Hi there!") // Logged message "Hi there!"')
        .and('be.visible')
    })
})

describe('Cypress Simulator - Cookies consent', () => {
   beforeEach(() => {
      cy.login()
      cy.visit('./src/index.html?skipCaptcha=true')
      cy.injectAxe()
   })

   it("it consents on the cookies usage", () => {
      cy.get('#cookieConsent')
         .as('cookiesConsentBanner')
         .should('be.visible')

      cy.checkA11y()

      cy.get('@cookiesConsentBanner')
         .find('button:contains("Accept")')
         .click()
     
      cy.get('@cookiesConsentBanner')
         .should('not.be.visible')
      cy.window()
         .its('localStorage.cookieConsent')
         .should('be.equal', 'accepted')
   })
})

describe('Cypress Simulator - Captcha', () => {
   beforeEach(() => {
      cy.visit('./src/index.html')
      cy.contains('button', 'Login').click()
      cy.injectAxe()
   })
      
   it("finds no a11 issues on all captch view states (button enables/disabled and errot)", () => {
      cy.contains('button', 'Verify')
         .should('be.disabled')
          
      cy.get('input[placeholder="Enter your answer"]')
         .type('1000')
    
      cy.contains('button', 'Verify')
         .should('be.enabled')
      cy.checkA11y()

      cy.contains('button', 'Verify')
         .click()
      cy.contains('.error', 'Incorrect answer, please try again.')
         .should('be.visible')
    
      cy.get('input[placeholder="Enter your answer"]')
         .should('have.value', '')
      cy.contains('button', 'Verify').should('be.disabled')

      cy.checkA11y()
   })
})
