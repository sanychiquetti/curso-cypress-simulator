describe("Cypress Simulator", () => {

  beforeEach(() => {
    cy.visit("./src/index.html?skipCaptcha=true", {
      onBeforeLoad(win) {
        win.localStorage.setItem("cookieConsent", "accepted")
      }
    })
    cy.contains("button", "Login").click()
  })
  it("successfully simulates a Cypress command cy.visit()", () => {
    cy.get("#codeInput").type("cy.visit('https://www.linkedin.com/in/sanychiquettigarcia/')")
    cy.contains("button", "Run").click()

    cy.get("#outputArea", { timeout: 6000 })
      .should("contain", "Success:")
      .and("contain", "cy.visit('https://www.linkedin.com/in/sanychiquettigarcia/') // Visited URL 'https://www.linkedin.com/in/sanychiquettigarcia/'")
      .and("be.visible")
  })

  it("shows error message when typing and running invalid Cypress command cy.run()", () => {
    cy.get("#codeInput").type("cy.run()")
    cy.contains("button", "Run").click()

    cy.get("#outputArea", { timeout: 6000 })
      .should("contain", "Error:")
      .and("contain", "Invalid Cypress command: cy.run()")
      .and("be.visible")
  })

  it("shows warning message when typing and running a not-implemented Cypress command ", () => {
    cy.get("#codeInput").type("cy.contains('Logout')")
    cy.contains("button", "Run").click()

    cy.get("#outputArea", { timeout: 6000 })
      .should("contain", "Warning:")
      .and("contain", "The `cy.contains` command has not been implemented yet.")
      .and("be.visible")
  })

  it("shows error message when typing and running a valid command without parentheses", () => {
    cy.get("#codeInput").type("cy.visit")
    cy.contains("button", "Run").click()

    cy.get("#outputArea", { timeout: 6000 })
      .should("contain", "Error:")
      .and("contain", "Missing parentheses on `cy.visit` command")
      .and("be.visible")
  })

  it("asks for help and gets common Cypress commands and examples with a link to the docs", () => {
    cy.get("#codeInput").type("help")
    cy.contains("button", "Run").click()

    cy.get("#outputArea", { timeout: 6000 })
      .should("contain", "cy.visit(url: string)")
      .and("contain", "For more commands and details, visit the official Cypress API documentation")
      .and("be.visible")
    cy.contains("#outputArea a", "official Cypress API documentation")
      .should("have.attr", "href", "https://docs.cypress.io/api/table-of-contents")
      .and("have.attr", "target", "_blank")
      .and("have.attr", "rel", "noopener noreferrer")
      .and("be.visible")
  })

  it.only("maximizes and minimizes a simulation result", () => {
    cy.get("#codeInput").type("cy.log('Hi there!')")
    cy.contains("button", "Run").click()

    cy.get(".expand-collapse").click()

    cy.get("#outputArea", { timeout: 6000 })
      .should("contain", "Success:")
      .and("contain", "cy.log('Hi there!') // Logged message 'Hi there!'")
      .and("be.visible")
    cy.get("#collapseIcon").should("be.visible")

    cy.get(".expand-collapse").click()
    cy.get("#expandIcon").should("be.visible")
  })

  it("logout", () => {
    
  })

  it("show and hide button", () => {
    
  })

  it("running... state", () => {
    
  })

  it("accept cookies", () => {
    
  })

  it("decline cookies", () => {
    
  })

  it("no cookies banner on the login page", () => {
    
  })

  it("captcha button states", () => {
    
  })

  it("captcha error", () => {
    
  })

  it("run button - enabled/disabled states", () => {
    
  })

  it("reset textarea on logout and login", () => {
    
  })

  it("disabled run button on logout and login", () => {
   
  })

  it("reset output on logout and login", () => {
    
  })

  it("disabled run button on logout and login", () => {
    
  })
})