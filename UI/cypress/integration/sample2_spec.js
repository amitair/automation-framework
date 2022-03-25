describe("multiformis verify", function () {
  it("does stuff", function () {
    cy.visit("http://website.multiformis.com/");
    // cy.get("div[class=iframes-container]")
    cy.contains("CLOSE").click();
    cy.contains("Sort and Tables").click();
    cy.get('[name=tablepress-2_length]').select("25");
    cy.contains('mail_city').click();
    // cy.get('button[class^="submit_btn"]').click();
    //   cy.get("title").should("contain", "Todoist")
  });
});
