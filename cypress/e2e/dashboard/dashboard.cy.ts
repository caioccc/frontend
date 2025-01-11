import { loginRoutine } from "../../routines/login"

describe('Teste de Fluxo para Tarefas', () => {
    beforeEach(() => {
        loginRoutine()
    })

    it('Testes para criar categoria', () => {
        cy.get('.test-see-category').click()

        cy.url().should('include', '/categories')

        cy.get('.test-add-category').click()
        cy.get('.name').type('Test Category')
        cy.get('.test-button').click()

        cy.wait('@create_category')

        cy.url().should('include', '/categories')

    })


    it('Testes para criar tarefa', () => {
        cy.get('.test-see-category').click()

        cy.url().should('include', '/categories')

        cy.get('.test-add-category').click()
        cy.get('.name').type('Test Category')
        cy.get('.test-button').click()

        cy.wait('@create_category')

        cy.url().should('include', '/categories')

        cy.get('.test-see-tasks').click()

        cy.url().should('include', '/tasks')

        cy.get('.test-add-task').click()
        cy.get('.name').type('Test Task')
        cy.get('.test-button').click()

        cy.wait('@create_task')

        cy.url().should('include', '/tasks')

        cy.wait('@list_tasks')
    })

})
