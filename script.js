document.getElementById('estimatorForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const age = parseFloat(document.getElementById('age').value);
    const gender = document.getElementById('gender').value;
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value) / 100;  // Convert cm to m for BMI calculation
    const activityLevel = parseFloat(document.getElementById('activityLevel').value);

    if (!name || isNaN(age) || isNaN(weight) || isNaN(height) || isNaN(activityLevel)) {
        alert("Please fill out all fields correctly.");
        return;
    }

    // BMI Calculation
    const bmi = weight / (height * height);

    // TDEE Calculation
    let tdee;
    if (gender === "male") {
        tdee = (10 * weight) + (6.25 * height) - (5 * age) + 5;
    } else {  // female
        tdee = (10 * weight) + (6.25 * height) - (5 * age) - 161;
    }
    tdee *= activityLevel;

    // TDEE-based Advice
    let caloricAdvice = `Dear ${name}, `;

    if (bmi < 18.5) {
        caloricAdvice += "Considering your underweight status, it's essential to focus on a nutrient-rich diet that aligns with your TDEE of approximately " + tdee.toFixed(2) + " calories.";
    } else if (bmi >= 18.5 && bmi < 24.9) {
        caloricAdvice += "As you're in a healthy weight range, ensure you're maintaining a balanced diet in line with your TDEE of around " + tdee.toFixed(2) + " calories.";
    } else if (bmi >= 25 && bmi < 29.9) {
        caloricAdvice += "Being overweight, it's crucial to watch your diet, especially ensuring you're not exceeding your TDEE of " + tdee.toFixed(2) + " calories, and incorporate regular exercise.";
    } else {
        caloricAdvice += "With an obese classification, focusing on a well-balanced, calorie-restricted diet below your TDEE of " + tdee.toFixed(2) + " calories can help in achieving a healthier weight. Consultation with a nutritionist or doctor would be beneficial.";
    }

    document.getElementById('caloric-advice').innerText = caloricAdvice;

    // Further BMI-based Advice
    let bmiAdvice = "";
    let riskAdvice = "";
    let hospitalAdvice = "";

    if (bmi < 18.5) {
        bmiAdvice = "Based on your BMI, you're categorized as underweight.";
        riskAdvice = "Predisposed risks: weakened immune system, osteoporosis, anemia. Consult a health professional.";
        hospitalAdvice = "For further medical assistance, consider visiting these hospitals in Kenya:\n- Nairobi Hospital, Nairobi\n- Aga Khan University Hospital, Nairobi\n- Kenyatta National Hospital, Nairobi\n- Mombasa Hospital, Mombasa\n- Eldoret Hospital, Eldoret\n\nRemember to schedule an appointment and verify availability of relevant specialists.";
    } else if (bmi >= 18.5 && bmi < 24.9) {
        bmiAdvice = "Based on your BMI, you're within the normal weight range.";
        riskAdvice = "Typically associated with the lowest health risks. Maintain a balanced diet and active lifestyle.";
    } else if (bmi >= 25 && bmi < 29.9) {
        bmiAdvice = "Based on your BMI, you're categorized as overweight.";
        riskAdvice = "Predisposed risks: heart diseases, high blood pressure, type 2 diabetes. Consider regular check-ups.";
        hospitalAdvice = "For further medical assistance, consider visiting these hospitals in Kenya:\n- Nairobi Hospital, Nairobi\n- Aga Khan University Hospital, Nairobi\n- Kenyatta National Hospital, Nairobi\n- Mombasa Hospital, Mombasa\n- Eldoret Hospital, Eldoret\n\nRemember to schedule an appointment and verify availability of relevant specialists.";
    } else {
        bmiAdvice = "Based on your BMI, you're categorized as obese.";
        riskAdvice = "Predisposed risks: heart diseases, certain cancers, liver disease. Essential to seek a healthcare professional's advice.";
        hospitalAdvice = "For further medical assistance, consider visiting these hospitals in Kenya:\n- Nairobi Hospital, Nairobi\n- Aga Khan University Hospital, Nairobi\n- Kenyatta National Hospital, Nairobi\n- Mombasa Hospital, Mombasa\n- Eldoret Hospital, Eldoret\n\nRemember to schedule an appointment and verify availability of relevant specialists.";
    }

    document.getElementById('bmi-advice').innerText = bmiAdvice;
    document.getElementById('risk-advice').innerText = riskAdvice;
    document.getElementById('hospital-advice').innerText = hospitalAdvice;

    // Activity-based Advice
    let activityAdvice = "";
    if (activityLevel === 1.2) {
        activityAdvice = "Since you're sedentary, consider incorporating light exercises into your daily routine.";
    } else if (activityLevel === 1.375) {
        activityAdvice = "With your light activity level, ensure you're stretching and maintaining flexibility.";
    } else if (activityLevel === 1.55) {
        activityAdvice = "Being moderately active, balance your diet to match your energy expenditure.";
    } else if (activityLevel === 1.725) {
        activityAdvice = "Given your very active lifestyle, ensure you're replenishing with nutrient-dense foods and hydrating well.";
    } else {
        activityAdvice = "With your super active regimen, consider periodical health checks and maintain a balanced diet.";
    }
    document.getElementById('activity-advice').innerText = activityAdvice;
});