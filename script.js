const passwordInput = document.getElementById('passwordInput');
const togglePassword = document.getElementById('togglePassword');
const strengthBar = document.getElementById('strengthBar');
const strengthText = document.getElementById('strengthText');

const lengthReq = document.getElementById('lengthReq');
const uppercaseReq = document.getElementById('uppercaseReq');
const lowercaseReq = document.getElementById('lowercaseReq');
const numberReq = document.getElementById('numberReq');
const symbolReq = document.getElementById('symbolReq');

// Toggle password visibility
togglePassword.addEventListener('click', () => {
    const type =
        passwordInput.getAttribute('type') === 'password'
            ? 'text'
            : 'password';

    passwordInput.setAttribute('type', type);
    togglePassword.textContent = type === 'password' ? '👁️' : '🙈';
});

// Check password strength in real time
passwordInput.addEventListener('input', () => {
    checkPasswordStrength(passwordInput.value);
});

function checkPasswordStrength(password) {
    if (password.length === 0) {
        resetStrengthMeter();
        return;
    }

    const hasLength = password.length >= 15;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSymbol = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

    updateRequirement(lengthReq, hasLength);
    updateRequirement(uppercaseReq, hasUppercase);
    updateRequirement(lowercaseReq, hasLowercase);
    updateRequirement(numberReq, hasNumber);
    updateRequirement(symbolReq, hasSymbol);

    let score = 0;
    if (hasLength) score++;
    if (hasUppercase) score++;
    if (hasLowercase) score++;
    if (hasNumber) score++;
    if (hasSymbol) score++;

    updateStrengthMeter(score);
}

function updateRequirement(element, isMet) {
    element.classList.toggle('met', isMet);
}

function updateStrengthMeter(score) {
    strengthBar.className = 'strength-bar';
    strengthText.className = 'strength-text';

    if (score <= 2) {
        strengthBar.classList.add('weak');
        strengthText.classList.add('weak');
        strengthText.textContent = 'Weak';
    } else if (score <= 4) {
        strengthBar.classList.add('medium');
        strengthText.classList.add('medium');
        strengthText.textContent = 'Medium';
    } else {
        strengthBar.classList.add('strong');
        strengthText.classList.add('strong');
        strengthText.textContent = 'Strong';
    }
}

function resetStrengthMeter() {
    strengthBar.className = 'strength-bar';
    strengthText.className = 'strength-text';
    strengthText.textContent = 'Enter a password';

    updateRequirement(lengthReq, false);
    updateRequirement(uppercaseReq, false);
    updateRequirement(lowercaseReq, false);
    updateRequirement(numberReq, false);
    updateRequirement(symbolReq, false);
}
