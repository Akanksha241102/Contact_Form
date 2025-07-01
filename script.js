document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const submitBtn = document.querySelector('.submit-btn');

    // Email validation regex
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    // Validate name field
    function validateName() {
        const name = nameInput.value.trim();
        const errorElement = document.getElementById('nameError');

        if (name === '') {
            showError(nameInput, errorElement, 'Name is required');
            return false;
        } else if (name.length < 2) {
            showError(nameInput, errorElement, 'Name must be at least 2 characters');
            return false;
        } else if (!/^[a-zA-Z\s'-]+$/.test(name)) {
            showError(nameInput, errorElement, 'Name contains invalid characters');
            return false;
        } else {
            showSuccess(nameInput, errorElement);
            return true;
        }
    }

    // Validate email field
    function validateEmail() {
        const email = emailInput.value.trim();
        const errorElement = document.getElementById('emailError');

        if (email === '') {
            showError(emailInput, errorElement, 'Email is required');
            return false;
        } else if (!emailRegex.test(email)) {
            showError(emailInput, errorElement, 'Please enter a valid email');
            return false;
        } else {
            showSuccess(emailInput, errorElement);
            return true;
        }
    }

    // Validate message field
    function validateMessage() {
        const message = messageInput.value.trim();
        const errorElement = document.getElementById('messageError');

        if (message === '') {
            showError(messageInput, errorElement, 'Message is required');
            return false;
        } else if (message.length < 10) {
            showError(messageInput, errorElement, 'Message must be at least 10 characters');
            return false;
        } else {
            showSuccess(messageInput, errorElement);
            return true;
        }
    }

    // Show error message and style
    function showError(input, errorElement, message) {
        errorElement.textContent = message;
        input.classList.add('invalid');
        input.classList.remove('valid');
    }

    // Show success state
    function showSuccess(input, errorElement) {
        errorElement.textContent = '';
        input.classList.add('valid');
        input.classList.remove('invalid');
    }

    // Real-time validation
    nameInput.addEventListener('input', validateName);
    emailInput.addEventListener('input', validateEmail);
    messageInput.addEventListener('input', validateMessage);

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Validate all fields
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isMessageValid = validateMessage();

        if (isNameValid && isEmailValid && isMessageValid) {
            // Simulate form submission
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';

            setTimeout(() => {
                // Show success message
                const successMessage = document.getElementById('formSuccess');
                successMessage.textContent = 'Thank you! Your message has been sent.';
                successMessage.style.display = 'block';

                // Reset form
                form.reset();
                
                // Remove validation classes
                nameInput.classList.remove('valid');
                emailInput.classList.remove('valid');
                messageInput.classList.remove('valid');

                // Reset button
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send Message';

                // Hide success message after 5 seconds
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 5000);
            }, 1500);
        }
    });

    // Initial validation on blur
    nameInput.addEventListener('blur', validateName);
    emailInput.addEventListener('blur', validateEmail);
    messageInput.addEventListener('blur', validateMessage);
});
