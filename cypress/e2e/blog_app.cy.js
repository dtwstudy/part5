describe('Blog login', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
   
    const user = {
      name: 'Admin',
      username: 'root',
      password: 'demo'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user) 
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function() {
    cy.contains('log in').click()
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('log in').click()
      cy.get('#username').type('root')
      cy.get('#password').type('demo')
      cy.get('#login-button').click()
      cy.contains('root logged in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('log in').click()
      cy.get('#username').type('roots')
      cy.get('#password').type('demo')
      cy.get('#login-button').click()
      cy.contains('Error login wrong password')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      // log in user here
    })

    it('A blog can be created', function() {
      // ...
    })
  })

  // it('login form can be opened', function () {

  //   cy.contains('new blog').click()
  //   // cy.get('input').type('a note created by cypress')
  //   cy.get('#title').type('Sample 1')
  //   cy.get('#author').type('User 1')
  //   cy.get('#url').type('http://localhost:5173/')
  //   debugger
  //   cy.contains('save').click()

  // })



})
