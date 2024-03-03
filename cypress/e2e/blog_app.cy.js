describe('Blog app', function () {

  Cypress.Commands.add('login', ({ username, password }) => {
    cy.request('POST', 'http://localhost:3003/api/login', {
      username, password
    }).then(({ body }) => {
      localStorage.setItem('loggedBlogappUser', JSON.stringify(body))
      cy.visit('http://localhost:5173')
    })
  })

  Cypress.Commands.add('createBlog', ({ title, author, url, likes }) => {
    cy.request({
      url: 'http://localhost:3003/api/blogs',
      method: 'POST',
      body: { title, author, url, likes },
      headers: {
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('loggedBlogappUser')).token}`
      }
    })

    cy.visit('http://localhost:5173')
  })

  Cypress.Commands.add('addBlog', (blog) => {
    cy.contains('new blog').click()
    cy.get('#title').type(blog.title)
    cy.get('#author').type(blog.author)
    cy.get('#url').type(blog.url)
    cy.contains('save').click()
  })

  describe('Blog login', function () {

    beforeEach(function () {
      cy.visit('http://localhost:5173')
    })

    it('Login form is shown', function () {
      cy.contains('log in').click()
    })

    describe('Login in', function () {
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
      it('succeeds with correct credentials', function () {
        cy.contains('log in').click()
        cy.get('#username').type('root')
        cy.get('#password').type('demo')
        cy.get('#login-button').click()
        cy.contains('root logged in')
      })

      it('fails with wrong credentials', function () {
        cy.contains('log in').click()
        cy.get('#username').type('roots')
        cy.get('#password').type('demo')
        cy.get('#login-button').click()
        cy.contains('Error login wrong password')
      })
    })

    describe('When logged in', function () {
      beforeEach(function () {
        cy.login({username:'root' , password:'demo'})
      })

      it('A blog can be created', function () {
        cy.contains('new blog').click()
        cy.get('#title').type('Sample 0')
        cy.get('#author').type('User 1')
        cy.get('#url').type('http://localhost:5173/')
        cy.contains('save').click()
        cy.contains('You successful added new blog post')
      })
    })

    describe('When like added to blog', function () {
      beforeEach(function () {
        cy.login({ username: 'root', password: 'demo' })
      })

      it('Like button pressed', function () {
        cy.contains('show').click()
        cy.contains('like').click()
        cy.contains('Like')
      })
    })
    describe('When blog is deleted', function () {
      beforeEach(function () {
        cy.login({ username: 'root', password: 'demo' })
      })

      it('Blog delete button press', function () {
        cy.contains('show').click()
        cy.contains('delete').click()
        cy.contains('Blog deleted')
      })
      
    })

    describe('Sort by like', function () {
      beforeEach(function () {
        cy.login({ username: 'root', password: 'demo' })
        cy.createBlog({ title: 'Sample 1', author: 'Author 1', url: 'http://localhost:5173', likes: 5 })
        cy.wait(500)
        cy.createBlog({ title: 'Sample 2', author: 'Author 2', url: 'http://localhost:5173', likes: 8 })
        cy.wait(500)

      })
      it('sort buton click', function () {
        cy.wait(500)
        cy.contains('sort').click()
        cy.get('.title').eq(0).should('contain', 'Sample 2 Author 2')
        cy.get('.title').eq(1).should('contain', 'Sample 1 Author 1')
      })

    })
  })


})