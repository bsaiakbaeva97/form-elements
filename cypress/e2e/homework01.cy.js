/// <reference types="cypress"/>

describe('Login Form', () => {

    beforeEach(() => {
        cy.visit('https://techglobal-training.com/frontend/project-1');
    });

    it('Validate the Contact Us Information', () => {
    
        cy.get('.is-size-3').should('have.text', 'Contact Us');
        cy.get('#address').should('have.text', '2800 S River Rd Suite 310, Des Plaines, IL 60018');
        cy.get('#email').should('have.text', 'info@techglobalschool.com');
        cy.get('#phone-number').should('have.text', '(224) 580-2150');
        
    });

    it('Validate the Full Name input box', () => {
        cy.get('[for="name"]').should('have.text', 'Full name *');

        cy.get('.field:nth-child(1) .input')
        .should('be.visible')
        .and('have.attr', 'placeholder', 'Enter your full name')
        .and('have.attr', 'required')
    });



    it('Validate Gender radio button', () => {
    /*
    Validate the label is “Gender *”
    Validate that the Gender is required
    Validate the options are “Female”, “Male” and “Prefer not to disclose”
    Validate the options are clickable and not selected
    Click on the “Male” option and validate it is selected while the others are not selected
    Click on the “Female” option and validate it is selected while the others are not selected
    */

        cy.get('.control > .label').should('have.text', 'Gender *');
        cy.get('[class$=radio] > input').should('have.attr', 'required');

        const inputs = ['Male', 'Female', 'Prefer not to disclose']

        cy.get('.radio').each(($el, index) => {       
            cy.wrap($el)
            .should('have.text', inputs[index])  
            .find('input')
            .and('be.visible')
            .and('not.be.checked')
            
        });

       
        cy.get('.radio').contains(inputs[0]).click();
        cy.get('.mr-1').each(($el, index) => {

            if(inputs[index] === 'Male') cy.wrap($el).check().should('be.checked')
            else cy.wrap($el).should('not.be.checked');
            
        });

        cy.get('.radio').contains(inputs[1]).click();
        cy.get('.mr-1').each(($el, index) => {
            
            if(inputs[index] === 'Female') cy.wrap($el).check().should('be.checked')
            else cy.wrap($el).should('not.be.checked')
        });
    });        

       
    it('Validate the Address input box', () => {

        /**
        Validate that the Address input box is displayed
        Validate that the Address input box is not required
        Validate that the label of the Address input box is “Address”
        Validate that the placeholder of the Address input box is “Enter your address” 
         */

        cy.get('.field:nth-child(3) input')
        .should('be.visible')
        .and('have.attr', 'placeholder', 'Enter your address')
        .and('not.have.attr', 'required')
    
        cy.get('.field:nth-child(3) label')
        .should('have.text', 'Address')
    });

    it('Validate the Email input box', () => {

        /*
        Validate that the Email input box is displayed
        Validate that the Email input box is required
        Validate that the label of the Email input box is “Email *”
        Validate that the placeholder of the Email input box is “Enter your email”
        */
        cy.get('.field:nth-child(4) input')
        .should('be.visible')
        .and('have.attr', 'placeholder', 'Enter your email')
        .and('have.attr', 'required')
        
        cy.get('.field:nth-child(4)>label')
        .should('have.text', 'Email *')
    });

    it('Validate the Phone input box', () => {

        /*
        Validate that the Phone input box is displayed
        Validate that the Phone input box is not required
        Validate that the label of the Phone input box is “Phone”
        Validate that the placeholder of the Address input box is “Enter your phone number”
        */
        cy.get('.field:nth-child(5) input')
        .should('be.visible')
        .and('have.attr', 'placeholder', 'Enter your phone number')
        .and('not.have.attr', 'required')
        
        cy.get('.field:nth-child(5)>.label')
        .should('have.text', 'Phone');
        
    });


    it('Validate the Message text area', () => {

        /*
        Validate that the Message text area is displayed
        Validate that the Message text area is not required
        Validate that the label of the Message text area is “Message”
        Validate that the placeholder of the Message text area is “Type your message here…”
        */
        cy.get('.textarea')
        .should('be.visible')
        .and('have.attr', 'placeholder', 'Type your message here...')
        .and('not.have.attr', 'required')
        
        cy.get('.field:nth-child(6)>.label')
        .should('have.text', 'Message');
        
    });

    it('Validate the Consent text box', () => {
        /*
        Validate the label is “I give my consent to be contacted.”
        Validate that the Consent checkbox is required
        Validate that the Consent checkbox is clickable
        Click on the “I give my consent to be contacted.” checkbox and validate it is selected
        Click on the “I give my consent to be contacted.” checkbox again and validate it is not selected
        */


        cy.get('.field:nth-child(7) label')
        .should('have.text', ' I give my consent to be contacted.')

        cy.get('.field:nth-child(7) input')
        .should('be.enabled')
        .check()
        .and('be.checked')
        .uncheck()
        .and('not.be.checked')
        .and('have.attr', 'required') 
    });

    it('Validate the Submit button', () => {
        /*
        Validate the “SUBMIT” button is displayed
        Validate the “SUBMIT” button is clickable
        Validate that the button text is “SUBMIT”
        */
        cy.get('[type="submit"]')
        .should('have.text', 'SUBMIT')
        .and('be.visible')
        .and('be.enabled')
    });


    it.only('Validate the Form submission', () => {
        /*
        Enter a first name
        Select a gender
        Enter an address
        Enter an email
        Enter a phone number
        Enter a message
        Select the “I give my consent to be contacted.” checkbox
        Click on the “SUBMIT” button
        Validate the form message “Thanks for submitting!” is displayed under the “SUBMIT” button
        */
        cy.get('.field:nth-child(1) .input')
        .type('Bermet Saiakbaeva');

        cy.get('.radio')
        .contains('Female')
        .click();

        cy.get('.field:nth-child(3) input')
        .type('7632 N Milwaukee Ave');

        cy.get('.field:nth-child(4) input')
        .type('bsaikabaeva97@gmail.com');

        cy.get('.field:nth-child(5) input')
        .type('312-833-1736');

        cy.get('.textarea')
        .type('Thank you for your time!');

        cy.get('.field:nth-child(7) label')
        .click();

        // Error occurred on this line
        cy.get('[type="submit"]')
       .click();

        /* The error on Form Submission. (Message from DOM console)
        Project1.jsx:9 Uncaught TypeError: Cannot read properties of undefined (reading 'preventDefault')
        at i (Project1.jsx:9:9)
        at onClick (Project1.jsx:115:72)
        at Object.Le (react-dom.production.min.js:54:317)
        at Be (react-dom.production.min.js:54:471)
        at react-dom.production.min.js:55:35
        at jr (react-dom.production.min.js:105:68)
        at Fr (react-dom.production.min.js:106:380)
        at react-dom.production.min.js:117:104
        at uu (react-dom.production.min.js:274:42)
        at Pe (react-dom.production.min.js:52:375)
       */

        // Unable to proceed
        cy.get('.mt-5')
        .should('be.visible')
        .and('have.text', 'Thanks for submitting!')
        
    });


})

