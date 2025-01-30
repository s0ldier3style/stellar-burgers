const burgerConstructor = '[data-testid="burgerConstructor"]';
const bunTop = '[data-testid=bunTop]';
const bunBottom = '[data-testid=bunBottom]';
const ingredientMain = '[data-testid=main]';
const ingredientSauce = '[data-testid=sauce]';
const modal = '[data-testid=modal]';
const modalCloseButton = '[data-testid=closeButton]';
const modalOverlay = '[data-testid=modalOverlay]';
const userName = '[data-testid=userName]';
const orderButton = '[data-testid=orderButton]';
const orderNumber = '[data-testid=orderNumber]';

describe('Проверка функционала конструктора бургеров', function () {
  beforeEach(() => {
    cy.fixture('ingredients.json').as('ingredientsData');
    cy.fixture('user.json').as('user');
    cy.fixture('order.json').as('order');
    cy.intercept('GET', 'api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');
    cy.intercept('GET', 'api/auth/user', {
      fixture: 'user.json'
    }).as('getUser');
    cy.intercept('POST', `api/orders`, {
      fixture: 'order.json'
    }).as('createOrder');
    cy.visit('/');
    cy.wait('@getIngredients');
  });

  describe('Добавление ингредиентов в конструктор', () => {
    it('отображает ингредиенты и позволяет добавлять их в конструктор', () => {
      cy.get(burgerConstructor).should('exist');
      cy.get(burgerConstructor).should('not.contain', '[data-testid=bunTop]');
      cy.get(burgerConstructor).should('not.contain', bunTop);
      cy.contains('Добавить').should('exist').click();
      cy.get(bunTop).should('exist');
      cy.get(bunTop).contains('Краторная булка N-200i (верх)');
      cy.get(bunBottom).should('exist');
      cy.get(bunBottom).contains('Краторная булка N-200i (низ)');
      cy.get(ingredientMain)
        .parent()
        .find('button')
        .contains('Добавить')
        .click();
      cy.get(burgerConstructor).contains('Биокотлета из марсианской Магнолии');
      cy.get(ingredientSauce)
        .parent()
        .find('button')
        .contains('Добавить')
        .click();
      cy.get(burgerConstructor).contains('Соус Spicy-X');
    });
    describe('Проверяем работу модальных окон', () => {
      it('Открытие модального окна ингредиента', () => {
        cy.get(ingredientMain).first().click();
        cy.get(modal).should('be.visible');
        cy.get(modalCloseButton).should('exist').click();
        cy.get(modal).should('not.exist');
        cy.get(ingredientMain).first().click();
        cy.get(modalOverlay).click({ force: true });
        cy.get(modal).should('not.exist');
      });
    });
    describe('Проверяем создание заказа', () => {
      beforeEach(() => {
        cy.setCookie('accessToken', 'mockAccessToken');
        cy.setCookie('refreshToken', 'mockRefreshToken');
        cy.visit('/', {
          onBeforeLoad(win) {
            win.localStorage.setItem('accessToken', 'mockAccessToken');
            win.localStorage.setItem('refreshToken', 'mockRefreshToken');
          }
        });
        cy.wait('@getUser');
      });
      it('Проверяем создание заказа', () => {
        cy.get(userName).contains('Test Name');
        cy.contains('Добавить').should('exist').click();
        cy.get(bunTop).should('exist');
        cy.get(bunBottom).should('exist');
        cy.get(ingredientMain)
          .parent()
          .find('button')
          .contains('Добавить')
          .click();
        cy.get(ingredientSauce)
          .parent()
          .find('button')
          .contains('Добавить')
          .click();
        cy.get(orderButton).click();
        cy.get(modal).should('be.visible');
        cy.get(orderNumber).should('contain', '12345');
        cy.get(modalCloseButton).should('exist').click();
        cy.get(modal).should('not.exist');
        cy.get(burgerConstructor).should('not.contain', bunTop);
        cy.get(burgerConstructor).should('not.contain', bunBottom);
        cy.get(burgerConstructor).should('not.contain', ingredientMain);
        cy.get(burgerConstructor).should('not.contain', ingredientSauce);
      });
      afterEach(() => {
        cy.clearCookies();
        cy.clearLocalStorage();
      });
    });
  });
});
