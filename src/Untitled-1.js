// Function to generate form based on selected template
function generateForm(template) {
    // Get form container element
    const formContainer = document.getElementById("form-container");
  
    // Clear form container
    formContainer.innerHTML = "";
  
    // Create form header
    const header = document.createElement("h2");
    header.textContent = template.name;
    formContainer.appendChild(header);
  
    // Create form description
    const description = document.createElement("p");
    description.textContent = template.description;
    formContainer.appendChild(description);
  
    // Loop through questions and create form elements
    for (const question of template.questions) {
      // Create question container
      const questionContainer = document.createElement("div");
  
      // Create question label
      const questionLabel = document.createElement("label");
      questionLabel.textContent = question.text;
      questionContainer.appendChild(questionLabel);
  
      // Create form element based on question type
      if (question.type === "multi-select") {
        const select = document.createElement("select");
        select.multiple = true;
        for (const option of question.options) {
          const optionElement = document.createElement("option");
          optionElement.value = option;
          optionElement.textContent = option;
          select.appendChild(optionElement);
        }
        questionContainer.appendChild(select);
      } else if (question.type === "radio") {
        for (const option of question.options) {
          const radioContainer = document.createElement("div");
          const radio = document.createElement("input");
          radio.type = "radio";
          radio.name = `question-${question.id}`;
          radio.value = option;
          const optionLabel = document.createElement("label");
          optionLabel.textContent = option;
          radioContainer.appendChild(radio);
          radioContainer.appendChild(optionLabel);
          questionContainer.appendChild(radioContainer);
        }
      } else if (question.type === "yes-no") {
        const yesRadio = document.createElement("input");
        yesRadio.type = "radio";
        yesRadio.name = `question-${question.id}`;
        yesRadio.value = "yes";
        const yesLabel = document.createElement("label");
        yesLabel.textContent = "Yes";
        const noRadio = document.createElement("input");
        noRadio.type = "radio";
        noRadio.name = `question-${question.id}`;
        noRadio.value = "no";
        const noLabel = document.createElement("label");
        noLabel.textContent = "No";
        questionContainer.appendChild(yesRadio);
        questionContainer.appendChild(yesLabel);
        questionContainer.appendChild(noRadio);
        questionContainer.appendChild(noLabel);
      }
  
      // Add question container to form
      formContainer.appendChild(questionContainer);
    }
  }
  
  // Function to retrieve form template from Firebase database
  async function getFormTemplate(templateId) {
    const templateRef = db.collection("form_templates").doc(templateId);
    const templateDoc = await templateRef.get();
    if (templateDoc.exists) {
      return templateDoc.data();
    } else {
      console.log(`Form template with ID ${templateId} does not exist.`);
      return null;
    }
  }
  
  // Example usage
  const templateId = "cold-flu-template";
  const template = await getFormTemplate(templateId);
  if (template) {
    generateForm(template);
  }
  