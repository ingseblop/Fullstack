describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('login').click()
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('Matti Luukkainen logged-in')
    })

    it('fails with wrong credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.contains('Wrong credentials')
    })
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'mluukkai', password: 'salainen' })
    })

    it('a new blog can be created', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('mluukkai')
      cy.get('#author').type('wrong')
      cy.get('#url').type('something.com')
      cy.get('#add-button').click()
    })

    describe('and several blogs exist', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'first title',
          author: 'who knows',
          url: 'adivina.com',
          likes: '3'
        })
        cy.createBlog({
          title: 'second title',
          author: 'who knows',
          url: 'adivina.com',
          likes: '3'
        })
        cy.createBlog({
          title: 'third title',
          author: 'who knows',
          url: 'adivina.com',
          likes: '1'
        })
      })

      it('Like test on a blog', function () {
        cy.contains('second title').contains('view').click()
        cy.contains('second title').contains('Like').click()
      })

      it('remove a blog', function () {
        cy.contains('third title').contains('view').click()
        cy.contains('third title').contains('Remove blog').click()
      })
      it.only('Are ordered', function () {
        cy.log('first title is The title with the most likes')
        cy.contains('second title').contains('view').click()
        cy.contains('second title').contains('Like').click()
        cy.log('Now the second title is The title with the most likes')
      })
    })
  })
})
