const testingUrl = "http://localhost:3000/?listId:10"

const testingResetUrl = 'http://raccoon-shopping-server.herokuapp.com/api/testing/reset'
// const testingResetUrl = 'http://localhost:3001/api/testing/reset

describe("raccoon app", function () {

  beforeEach(function () {
    cy.request('POST', testingResetUrl)
    cy.visit(testingUrl);
  });

  it("front page can be opened", function () {
    cy.contains("List");
  });

  describe("item handling", function () {
    it("item can be added", function () {
      cy.get("#text").type("Cookies");
      cy.get("#amount").type(1);
      cy.get("#addButton").click();
      cy.contains("Cookies");
    });

    it("item can deleted", function () {
      cy.get("#removeButton").click();
      cy.get('.app').should('not.have.value', 'Cookies')
    });


    // add testing for completing items

  });



  describe("list handling", function () {
    //disabled to avoid spamming DB with testing lists 
    it("new list can be created", function () {
      // cy.get("#createNewList").click();
      // cy.contains('Open New List')
    });

    it("new list can be opened", function () {
      //
    });

    it("new list can be shared", function () {
      //
    });

  });

});


// https://docs.cypress.io/guides/references/assertions.html