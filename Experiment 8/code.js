<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Iron Pulse Gym Admission Form</title>
    <style>
        body { font-family: system-ui, sans-serif; margin: 40px; background: #0f172a; color: #f8fafc; }
        .form-card { max-width: 500px; margin: 0 auto; background: #1e293b; padding: 30px; border-radius: 12px; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.3); border: 1px solid #334155; }
        h2 { margin-top: 0; color: #38bdf8; border-bottom: 1px solid #334155; padding-bottom: 10px; }
        .form-group { margin-bottom: 20px; position: relative; }
        label { display: block; margin-bottom: 6px; font-size: 14px; font-weight: 500; color: #94a3b8; }
        input, select { width: 100%; padding: 10px; box-sizing: border-box; background: #0f172a; border: 2px solid #334155; border-radius: 6px; color: white; font-size: 15px; transition: all 0.2s; }
        input:focus, select:focus { outline: none; border-color: #38bdf8; box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.15); }
        
        /* Validation States */
        .form-group.success input, .form-group.success select { border-color: #10b981; }
        .form-group.error input, .form-group.error select { border-color: #ef4444; }
        
        .feedback { font-size: 12px; margin-top: 5px; min-height: 16px; color: #94a3b8; }
        .form-group.error .feedback { color: #f87171; }
        .form-group.success .feedback { color: #34d399; }

        .row { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
        button { width: 100%; padding: 12px; background: #0284c7; color: white; border: none; border-radius: 6px; font-size: 16px; font-weight: 600; cursor: pointer; margin-top: 10px; transition: background 0.2s; }
        button:hover { background: #0369a1; }
        button:disabled { background: #475569; color: #94a3b8; cursor: not-allowed; }
        .success-banner { background: #064e3b; border: 1px solid #059669; color: #34d399; padding: 15px; border-radius: 6px; margin-bottom: 20px; text-align: center; display: none; }
    </style>
</head>
<body>

<div class="form-card">
    <h2>Iron Pulse Gym Registration</h2>
    <div id="successBanner" class="success-banner">🎉 Registration Successful! Welcome aboard.</div>

    <form id="gymForm" novalidate>
        <!-- Full Name (Input Event) -->
        <div class="form-group" id="nameGroup">
            <label for="fullName">Full Name</label>
            <input type="text" id="fullName" placeholder="e.g., Rohan Sharma">
            <div class="feedback">Must be at least 3 characters long.</div>
        </div>

        <!-- Email Address (Blur Event) -->
        <div class="form-group" id="emailGroup">
            <label for="email">Email Address</label>
            <input type="email" id="email" placeholder="name@example.com">
            <div class="feedback">We will validate format on departure.</div>
        </div>

        <div class="row">
            <!-- Age (Input Event) -->
            <div class="form-group" id="ageGroup">
                <label for="age">Age</label>
                <input type="number" id="age" placeholder="Min 16">
                <div class="feedback">Eligible age: 16 - 80.</div>
            </div>

            <!-- Membership Plan (Change Event) -->
            <div class="form-group" id="planGroup">
                <label for="membershipPlan">Membership Plan</label>
                <select id="membershipPlan">
                    <option value="">Choose Plan...</option>
                    <option value="monthly">Monthly (₹1,500)</option>
                    <option value="quarterly">Quarterly (₹4,000)</option>
                    <option value="annual">Annual (₹12,000)</option>
                </select>
                <div class="feedback">Select a tier package.</div>
            </div>
        </div>

        <button type="submit" id="submitBtn" disabled>Submit Membership</button>
    </form>
</div>

<script>
// ==========================================
// 1. DOM ELEMENTS SELECTION
// ==========================================
const form = document.getElementById('gymForm');
const fullName = document.getElementById('fullName');
const email = document.getElementById('email');
const age = document.getElementById('age');
const membershipPlan = document.getElementById('membershipPlan');
const submitBtn = document.getElementById('submitBtn');
const successBanner = document.getElementById('successBanner');

// ==========================================
// 2. VALIDATION UTILITIES & STATE
// ==========================================
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Tracks form fields structural validity status instantly
const formState = {
    nameValid: false,
    emailValid: false,
    ageValid: false,
    planValid: false
};

// Modifies UI wrappers based on validity pass checks
const updateUIState = (inputElement, isValid, message) => {
    const groupElement = inputElement.closest('.form-group');
    const feedbackElement = groupElement.querySelector('.feedback');
    
    feedbackElement.textContent = message;

    if (isValid) {
        groupElement.classList.add('success');
        groupElement.classList.remove('error');
    } else {
        groupElement.classList.add('error');
        groupElement.classList.remove('success');
    }
    
    toggleSubmitButton();
};

// Enables or disables submit button based on global state
const toggleSubmitButton = () => {
    const allValid = Object.values(formState).every(state => state === true);
    submitBtn.disabled = !allValid;
};

// ==========================================
// 3. CORE FIELD VALIDATORS
// ==========================================
const validateName = () => {
    const value = fullName.value.trim();
    if (value.length >= 3) {
        formState.nameValid = true;
        updateUIState(fullName, true, "Name looks perfect!");
    } else if (value.length === 0) {
        formState.nameValid = false;
        updateUIState(fullName, false, "Name field cannot be left blank.");
    } else {
        formState.nameValid = false;
        updateUIState(fullName, false, "Name must contain at least 3 characters.");
    }
};

const validateEmail = () => {
    const value = email.value.trim();
    if (EMAIL_REGEX.test(value)) {
        formState.emailValid = true;
        updateUIState(email, true, "Email format verified.");
    } else if (value.length === 0) {
        formState.emailValid = false;
        updateUIState(email, false, "Email field cannot be empty.");
    } else {
        formState.emailValid = false;
        updateUIState(email, false, "Please enter a valid email structure.");
    }
};

const validateAge = () => {
    const numericAge = parseInt(age.value, 10);
    if (isNaN(numericAge)) {
        formState.ageValid = false;
        updateUIState(age, false, "Age must be numeric.");
    } else if (numericAge >= 16 && numericAge <= 80) {
        formState.ageValid = true;
        updateUIState(age, true, "Age criterion met.");
    } else {
        formState.ageValid = false;
        updateUIState(age, false, "Age must be between 16 and 80.");
    }
};

const validatePlan = () => {
    if (membershipPlan.value !== "") {
        formState.planValid = true;
        updateUIState(membershipPlan, true, "Plan option locked.");
    } else {
        formState.planValid = false;
        updateUIState(membershipPlan, false, "Please choose a membership track.");
    }
};

// ==========================================
// 4. EVENT BINDING REGISTRY
// ==========================================

// 'input' fires continuously on typing: Great for dynamic text lengths
fullName.addEventListener('input', validateName);
age.addEventListener('input', validateAge);

// 'blur' fires when the user clicks away from a field: Ideal for heavy format lookups like emails
email.addEventListener('blur', validateEmail);

// 'change' fires once an option selection block modification completes
membershipPlan.addEventListener('change', validatePlan);

// 'submit' blocks server execution routing natively
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Safety check fallback verification layer
    if (submitBtn.disabled) return;

    // Show completion alert structures
    successBanner.style.display = "block";
    form.reset();
    
    // Clear validation styling artifacts smoothly
    document.querySelectorAll('.form-group').forEach(group => {
        group.classList.remove('success', 'error');
    });
    
    // Reset global state machines tracking arrays
    Object.keys(formState).forEach(key => formState[key] = false);
    toggleSubmitButton();
    
    // Hide Success Banner smoothly after 4 seconds
    setTimeout(() => { successBanner.style.display = "none"; }, 4000);
});
</script>

</body>
</html>
