describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Wafa Anam',
      username: 'w_anam',
      password: 'pass123'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Log in to application')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('w_anam')
      cy.get('#password').type('pass123')
      cy.contains('login').click()
      cy.contains('Wafa Anam logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('w_anam')
      cy.get('#password').type('wrong')
      cy.contains('login').click()
      cy.get('.error')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'w_anam', password: 'pass123' })
    })

    it('A blog can be created', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('Test Blog Post')
      cy.get('#author').type('Nobody')
      cy.get('#url').type('https://fake.ca')
      cy.get('#create-blog').click()
      cy.contains('Test Blog Post')
    })

    describe('and several blogs exist', function () {
      beforeEach(function () {
        cy.createBlog({ title: 'Blog 1', auhtor: 'Me', url: 'https://none1' })
        cy.createBlog({ title: 'Blog 2', auhtor: 'Me', url: 'https://none2' })
        cy.createBlog({ title: 'Blog 3', auhtor: 'Me', url: 'https://none3' })

        cy.contains('Blog 2').contains('view').click()
        cy.get('.likes').find('button').click()
        cy.get('.likes').find('button').click()
      }, 30000)

      it('a blog can be liked', function () {
        cy.contains('Blog 2').contains('view').click()
        cy.get('.likes').contains('1')
        cy.get('.likes').find('button').click()
        cy.get('.likes').contains('2')
      })

      it('a blog can be deleted', function () {
        cy.contains('Blog 2').as('ourBlog')
        cy.get('@ourBlog').contains('view').click()
        cy.get('#delete-blog').click()
        cy.get('@ourBlog').should('not.exist')
      })

      it.only('blogs are ordered according to likes', function () {
        cy.get('.view-btn').then(views => {
          views.click()
        })
        cy.get('.likes-num').then(likes => {
          const likesArr = [...likes].map(like => Number(like.innerText))
          cy.wrap(likesArr).should('equal', likesArr.sort())
        })
      })

    })
  })

})