describe('raccoon app', function() {
    
    // beforeEach(function() {
    //   cy.request('POST', 'http://localhost:3001/api/testing/reset')
    //   const user = {
    //     name: 'root',
    //     username: 'root',
    //     password: 'sekret'
    //   }
    //   cy.request('POST', 'http://localhost:3001/api/users/', user)
  
    //   cy.visit('http://localhost:3000')
    // })
  
    beforeEach(function() { 
        cy.visit('http://localhost:3000')
    })

    it('front page can be opened', function() {
      
      cy.contains('List')
    })
  

  
    // describe('when logged in', function() {
    //   beforeEach(function() {
    //     cy.contains('login').click()
    //     cy.get('input:first').type('root')
    //     cy.get('input:last').type('sekret')
    //     cy.get('#login-button').click()
  
    //     // cy.login({ username: 'root', password: 'sekret' })
    //   })
  
    //   it('a new item can be added', function() {
    //     cy.contains('new blog').click()
    //     cy.get('#title').type('a blog created by cypress')
    //     cy.get('#author').type('author')
    //     cy.get('#url').type('www.test.io')
    //     cy.contains('create').click()
    //     cy.contains('a blog created by cypress')
    //   })
    // })
  
    // describe('when db is not empty', function() {
    //   beforeEach(function() {
    //     cy.contains('login').click()
    //     cy.get('input:first').type('root')
    //     cy.get('input:last').type('sekret')
    //     cy.get('#login-button').click()
  
    //     cy.contains('new blog').click()
    //     cy.get('#title').type('a blog created by cypress')
    //     cy.get('#author').type('author')
    //     cy.get('#url').type('www.test.io')
    //     cy.contains('create').click()
  
    //   })
  
    //   it('items can be updated', function() {
  
    //     cy.contains('view').click()
    //     cy.contains('like').click()
    //     cy.contains('1 likes')
    //   })
  
    //   it('items can be deleted', function() {
  
    //     // cy.contains('new blog').click()
    //     // cy.get('#title').type('a blog created to be removed')
    //     // cy.get('#author').type('author')
    //     // cy.get('#url').type('www.test.io')
    //     // cy.contains('create').click()
  
  
    //     // cy.contains('view').click()
    //     // cy.contains('delete').click()
    //     // cy.get('.error').contains('removed')
    //   })
  
    // })
  
  })