describe("Cypress Simulator", () => {

  beforeEach(() => {
    cy.visit("./src/index.html?skipCaptcha=true", {
      onBeforeLoad(win) {
        win.localStorage.setItem("cookieConsent", "accepted")
      }
    })
    cy.contains("button", "Login").click()
  })
  it.only("simulation ", () => {
    cy.get("#codeInput").type("cy.visit('https://www.linkedin.com/in/sanychiquettigarcia/')")
    cy.contains("button", "Run").click()

    cy.get("#outputArea", { timeout: 6000 })
      .should("contain", "Success:")
      .and("contain", "cy.visit('https://www.linkedin.com/in/sanychiquettigarcia/') // Visited URL 'https://www.linkedin.com/in/sanychiquettigarcia/'")
      .and("be.visible")
  })

  it("error: invalid cypress command", () => {
    
  })

  it("warning", () => {
    
  })

  it("error: valid command without parentheses", () => {
    
  })

  it("help", () => {
    
  })

  it("maximize/minimize", () => {
    
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