document.getElementById('estimatorForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const age = parseFloat(document.getElementById('age').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value) / 100;

    if (!name || isNaN(age) || isNaN(weight) || isNaN(height)) {
        alert("Please fill out all fields correctly.");
        return;
    }

    const bmi = weight / (height * height);
    provideFeedback(name, bmi);

    // After providing feedback, make the output fade in
    const outputElem = document.getElementById('output');
    setTimeout(() => {
        outputElem.style.opacity = 1;
    }, 100);
});

function provideFeedback(name, bmi) {
    const bmiAdviceElem = document.getElementById('bmi-advice');
    const riskAdviceElem = document.getElementById('risk-advice');
    const hospitalAdviceElem = document.getElementById('hospital-advice');

    let bmiAdvice = `Dear ${name}, `;
    let riskAdvice = "";
    let hospitalAdvice = "";

    if (bmi < 18.5) {
        bmiAdvice += "based on your BMI, you're underweight.";
        riskAdvice = "Predisposed risks: Weakened immune system, Osteoporosis, Anemia. Consult a health professional for further diagnostics.";
        hospitalAdvice = "For further medical assistance, consider visiting these hospitals in Kenya:\n- Nairobi Hospital, Nairobi\n- Aga Khan University Hospital, Nairobi\n- Kenyatta National Hospital, Nairobi\n- Mombasa Hospital, Mombasa\n- Eldoret Hospital, Eldoret\n\nRemember to schedule an appointment and verify the availability of relevant specialists.";
    } else if (bmi >= 18.5 && bmi < 24.9) {
        bmiAdvice += "based on your BMI, you're within the normal weight range.";
        riskAdvice = "Within the healthy weight range you are associated with the lowest health risks. Maintain a balanced diet and live an active life.";
    } else if (bmi >= 25 && bmi < 29.9) {
        bmiAdvice += "based on your BMI, you're overweight.";
        riskAdvice = "Predisposed risks: Heart diseases, High blood pressure, Type 2 diabetes. Consider regular check-ups and be mindful of what you eat.";
        hospitalAdvice = "For further medical assistance, consider visiting these hospitals in Kenya:\n- Nairobi Hospital, Nairobi\n- Aga Khan University Hospital, Nairobi\n- Kenyatta National Hospital, Nairobi\n- Mombasa Hospital, Mombasa\n- Eldoret Hospital, Eldoret\n\nRemember to schedule an appointment and verify the availability of relevant specialists.";
    } else {
        bmiAdvice += "based on your BMI, you're obese!";
        riskAdvice = "Predisposed risks: Heart diseases, Certain cancers, Liver disease. It's essential to focus on a healthier lifestyle.";
        hospitalAdvice = "For further medical assistance, consider visiting these hospitals in Kenya:\n- Nairobi Hospital, Nairobi\n- Aga Khan University Hospital, Nairobi\n- Kenyatta National Hospital, Nairobi\n- Mombasa Hospital, Mombasa\n- Eldoret Hospital, Eldoret\n\nRemember to schedule an appointment and verify the availability of relevant specialists.";
    }

    bmiAdviceElem.innerText = bmiAdvice;
    riskAdviceElem.innerText = riskAdvice;
    hospitalAdviceElem.innerText = hospitalAdvice;

    populateMealPlan(bmi);
}

function populateMealPlan(bmi) {
    const mealPlanElem = document.getElementById('meal-plan-content');
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    let mealPlanContent = "";

    days.forEach(day => {
        let breakfast, lunch, supper;

        if (bmi < 18.5) {
            breakfast = "2 eggs and a banana smoothie";
            lunch = "Rice with beans/peas, greens, and avocado";
            supper = "Ugali with beef and greens";
        } else if (bmi >= 18.5 && bmi < 24.9) {
            breakfast = "Tea/coffee with boiled sweet potatoes or yams";
            lunch = "Githeri with greens and avocado";
            supper = "Potatoes with beef and vegetable salad";
        } else if (bmi >= 25 && bmi < 29.9) {
            breakfast = "Green tea";
            lunch = "Protein of your choice with greens and avocado";
            supper = "Githeri with greens";
        } else {
            breakfast = "Green tea";
            lunch = "Protein of your choice with greens";
            supper = "Complex carbohydrates like arrowroot and yams with beef stew";
        }

        mealPlanContent += `
            <tr>
                <td colspan="2" style="background-color: #f7f7f7; font-weight: bold;">${day}</td>
            </tr>
            <tr>
                <td>Breakfast</td>
                <td>${breakfast}</td>
            </tr>
            <tr>
                <td>Lunch</td>
                <td>${lunch}</td>
            </tr>
            <tr>
                <td>Supper</td>
                <td>${supper}</td>
            </tr>
        `;

    });

    mealPlanElem.innerHTML = mealPlanContent;
}