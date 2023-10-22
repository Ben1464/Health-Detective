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

    const bmi = weight / (height * height);
    let tdee;
    if (gender === "male") {
        tdee = (10 * weight) + (6.25 * height * 100) - (5 * age) + 5;
    } else {
        tdee = (10 * weight) + (6.25 * height * 100) - (5 * age) - 161;
    }
    tdee *= activityLevel;

    provideFeedback(name, bmi, tdee);
    checkMilestones(bmi);
});

function provideFeedback(name, bmi, tdee) {
    const caloricAdviceElem = document.getElementById('caloric-advice');
    const bmiAdviceElem = document.getElementById('bmi-advice');
    const riskAdviceElem = document.getElementById('risk-advice');
    const hospitalAdviceElem = document.getElementById('hospital-advice');
    const activityAdviceElem = document.getElementById('activity-advice');

    let caloricAdvice = `Dear ${name}, `;
    let bmiAdvice = "";
    let riskAdvice = "";
    let hospitalAdvice = "";
    let activityAdvice = "";

    if (bmi < 18.5) {
        caloricAdvice += "Considering your underweight status, it's essential to focus on a nutrient-rich diet that aligns with your TDEE of approximately " + tdee.toFixed(2) + " calories.Increase your general food intake.";
        bmiAdvice = "Based on your BMI, you're underweight.";
        riskAdvice = "Predisposed risks: Weakened immune system, Osteoporosis, Anemia. Consult a health professional for further diagnostics.";
        hospitalAdvice = "For further medical assistance, consider visiting these hospitals in Kenya:\n- Nairobi Hospital, Nairobi\n- Aga Khan University Hospital, Nairobi\n- Kenyatta National Hospital, Nairobi\n- Mombasa Hospital, Mombasa\n- Eldoret Hospital, Eldoret\n\nRemember to schedule an appointment and verify the availability of relevant specialists.";
    } else if (bmi >= 18.5 && bmi < 24.9) {
        caloricAdvice += "As you're in a healthy weight range, ensure you're maintaining a balanced diet, working out, and avoiding stress. Always ensure you are maintaining your TDEE of approximately " + tdee.toFixed(2) + " calories.";
        bmiAdvice = "Based on your BMI, you're within the normal weight range.";
        riskAdvice = "Within the healthy weight range you are associated with the lowest health risks. Maintain a balanced diet and live an active life.";
    } else if (bmi >= 25 && bmi < 29.9) {
        caloricAdvice += "Being overweight, it's important you watch your diet, if you don't you will be obese soon. Stop taking junk food and be more active (workout).Ensure your keep your calories below" + tdee.toFixed(2) + "";
        bmiAdvice = "Based on your BMI, you're overweight.";
        riskAdvice = "Predisposed risks: Heart diseases, High blood pressure, Type 2 diabetes. Consider regular check-ups and be mindful of what you eat.";
        hospitalAdvice = "For further medical assistance, consider visiting these hospitals in Kenya:\n- Nairobi Hospital, Nairobi\n- Aga Khan University Hospital, Nairobi\n- Kenyatta National Hospital, Nairobi\n- Mombasa Hospital, Mombasa\n- Eldoret Hospital, Eldoret\n\nRemember to schedule an appointment and verify the availability of relevant specialists.";
    } else {
        caloricAdvice += "You are obese! focus on a well-balanced calorie-restricted diet below your TDEE of " + tdee.toFixed(2) + " Cutting down calories can help in achieving a healthier weight. Consultation with a nutritionist or doctor would be beneficial.";
        bmiAdvice = "Based on your BMI, you're OBESSED!.";
        riskAdvice = "Predisposed risks: Heart diseases, Certain cancers, Liver disease. STOP taking junk food, cut down on sugar, start fasting, intermittent fasting, join a gym before you become a liability to your own self.";
        hospitalAdvice = "For further medical assistance, consider visiting these hospitals in Kenya:\n- Nairobi Hospital, Nairobi\n- Aga Khan University Hospital, Nairobi\n- Kenyatta National Hospital, Nairobi\n- Mombasa Hospital, Mombasa\n- Eldoret Hospital, Eldoret\n\nRemember to schedule an appointment and verify the availability of relevant specialists. DO NOT FORGET GYM SUBSCRIPTION!";
    }

    caloricAdviceElem.innerText = caloricAdvice;
    bmiAdviceElem.innerText = bmiAdvice;
    riskAdviceElem.innerText = riskAdvice;
    hospitalAdviceElem.innerText = hospitalAdvice;

    switch (activityLevel) {
        case 1.2:
            activityAdvice = "Since you're sedentary, consider incorporating exercises into your daily routine.";
            break;
        case 1.375:
            activityAdvice = "With your light activity level, ensure you're stretching and maintaining flexibility.";
            break;
        case 1.55:
            activityAdvice = "Being moderately active, balance your diet to match your energy expenditure.";
            break;
        case 1.725:
            activityAdvice = "Given your very active lifestyle, ensure you're replenishing with nutrient-dense foods and hydrating well.";
            break;
        case 1.9:
            activityAdvice = "With your super active regimen, eat a balanced diet, hydrate and LIVE, my friend!";
            break;
    }

    activityAdviceElem.innerText = activityAdvice;
    populateMealPlan(bmi);
}

function populateMealPlan(bmi) {
    const mealAdviceElem = document.getElementById('meal-advice');
    const mealPlanElem = document.getElementById('meal-plan-content');

    let mealAdvice = "";
    let mealPlanContent = "";

    if (bmi < 18.5) {
        mealAdvice = "You're underweight. Here's a plan to help you gain weight in a healthy way.";
        mealPlanContent = `
            <tr>
                <td>Breakfast</td>
                <td>2 Kienyeji eggs, arrowroots or sweet potatoes, and a banana smoothie.</td>
            </tr>
            <tr>
                <td>Lunch</td>
                <td>Rice with beans/peas/njahi, greens, and avocado.</td>
            </tr>
            <tr>
                <td>Supper</td>
                <td>Ugali beef with greens or cabbage of your choice.</td>
            </tr>
            <tr>
                <td>Snack</td>
                <td>Yogurt and a fruit of your choice.</td>
            </tr>`;
    } else if (bmi >= 18.5 && bmi < 24.9) {
        mealAdvice = "You're in a healthy weight range. Here's a balanced meal plan to help you maintain.";
        mealPlanContent = `
            <tr>
                <td>Breakfast</td>
                <td>Sugarless tea/coffee with boiled sweet potatoes or yams.</td>
            </tr>
            <tr>
                <td>Lunch</td>
                <td>Githeri with greens and avocado.</td>
            </tr>
            <tr>
                <td>Dinner</td>
                <td>Smashed/potatoes matoke with beef and vegetable salad.</td>
            </tr>
            <tr>
                <td>Snack</td>
                <td>A piece of fruit of your choice.</td>
            </tr>`;
    } else if (bmi >= 25 && bmi < 29.9) {
        mealAdvice = "You're overweight. Here's a meal plan focused on healthy weight loss.";
        mealPlanContent = `
            <tr>
                <td>Breakfast</td>
                <td>Sugarless black coffee/Green tea ONLY.</td>
            </tr>
            <tr>
                <td>Lunch</td>
                <td>Protein of your choice with greens and avocado.</td>
            </tr>
            <tr>
                <td>Dinner</td>
                <td>Githeri with greens.</td>
            </tr>
            <tr>
                <td>Snack</td>
                <td>No snack, you're cutting weight remember!</td>
            </tr>`;
    } else {
        mealAdvice = "You're obesed! Here's a calorie-restricted plan to help in weight loss.";
        mealPlanContent = `
            <tr>
                <td>Breakfast</td>
                <td>Sugarless black coffee/green tea.</td>
            </tr>
            <tr>
                <td>Lunch</td>
                <td>Protein of your choice with greens.</td>
            </tr>
            <tr>
                <td>Dinner</td>
                <td>Controlled portion of complex carbohydrates like arrowroot and yams with beef stew.</td>
            </tr>
            <tr>
                <td>Snack</td>
                <td>No snacks, you're cutting weight remember!</td>
            </tr>`;
    }

    mealAdviceElem.innerText = mealAdvice;
    mealPlanElem.innerHTML = mealPlanContent;
}

// New function to check the milestones achieved based on BMI.
function checkMilestones(bmi) {
    const milestonesList = document.getElementById('milestones-list');

    // Sample milestones for demonstration purposes.
    const milestones = [
        { threshold: 18.5, achievement: "Reached minimum healthy weight!", achieved: false },
        { threshold: 21, achievement: "Achieved median healthy weight!", achieved: false },
        { threshold: 24.9, achievement: "Reached maximum healthy weight!", achieved: false },
        { threshold: 27, achievement: "Warning! Approaching obesity!", achieved: false }
    ];

    for (let milestone of milestones) {
        if (bmi >= milestone.threshold) {
            milestone.achieved = true;
        }
    }

    // Render the milestones on the page.
    let content = "";
    for (let milestone of milestones) {
        content += `
            <li class="${milestone.achieved ? 'achieved' : ''}">
                ${milestone.achievement}
            </li>`;
    }
    milestonesList.innerHTML = content;
}