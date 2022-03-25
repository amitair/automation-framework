describe("a meh test", function () {
  it("does meh stuff", function () {
    cy.visit("https://meh.com/");
    // cy.get("div[class=iframes-container]")
    cy.get(".membership").first().dblclick();
    // cy.get(".fa fa-fw fa-question-circle").first().click();
    // cy.get('button[class^="submit_btn"]').click();
    //   cy.get("title").should("contain", "Todoist")
  });
});
