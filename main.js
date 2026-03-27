// main.js

document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll(".dpr-section");
  const nextButtons = document.querySelectorAll(".next-btn");
  const progressBar = document.getElementById("progress-bar");
  const totalSections = sections.length;
  let currentSection = 0;

  // Show the first section
  showSection(currentSection);

  // Function to show a section
  function showSection(index) {
    sections.forEach((sec, i) => {
      sec.style.display = i === index ? "block" : "none";
    });
    updateProgress(index);
  }

  // Update progress bar
  function updateProgress(index) {
    const step = index + 1;
    const percent = Math.round((step / totalSections) * 100);
    progressBar.style.width = percent + "%";
    progressBar.textContent = `Step ${step}/${totalSections}`;
  }

  // Next button click handler
  nextButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (currentSection < totalSections - 1) {
        currentSection++;
        showSection(currentSection);
      }
    });
  });

  // --- Section 2: Dynamic Members Table ---
  const addMemberBtn = document.getElementById("add-member");
  const membersContainer = document.getElementById("members-container");
  let memberCount = 0;

  function createMemberRow(id) {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${id}</td>
      <td><input type="text" class="form-control form-control-sm" placeholder="Full Name"></td>
      <td><input type="text" class="form-control form-control-sm" placeholder="Role/Designation"></td>
      <td><input type="number" class="form-control form-control-sm" placeholder="Age"></td>
      <td>
        <select class="form-select form-select-sm">
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
      </td>
      <td><input type="text" class="form-control form-control-sm" placeholder="Educational Qualification"></td>
      <td><input type="text" class="form-control form-control-sm" placeholder="ID Proof Type"></td>
      <td><input type="text" class="form-control form-control-sm" placeholder="ID Proof Number"></td>
      <td><input type="text" class="form-control form-control-sm" placeholder="Mobile Number"></td>
      <td><input type="file" class="form-control form-control-sm"></td>
      <td><input type="file" class="form-control form-control-sm"></td>
      <td><button type="button" class="btn btn-danger btn-sm remove-member">Remove</button></td>
    `;
    return tr;
  }

  if (addMemberBtn) {
    addMemberBtn.addEventListener("click", () => {
      memberCount++;
      const newRow = createMemberRow(memberCount);
      membersContainer.appendChild(newRow);

      // Attach remove listener
      newRow.querySelector(".remove-member").addEventListener("click", () => {
        membersContainer.removeChild(newRow);
        updateMemberNumbers();
      });
    });
  }

  function updateMemberNumbers() {
    const rows = membersContainer.querySelectorAll("tr");
    rows.forEach((row, index) => {
      const firstCell = row.querySelector("td");
      if (firstCell) {
        firstCell.textContent = index + 1;
      }
    });
  }

  // --- Section 7: Financial Estimates Auto-calculation ---
  const section7 = document.getElementById("section7");
  if (section7) {
    const costInputs = section7.querySelectorAll("input[placeholder='Amount (Rs.)']");
    const totalProjectCostField = section7.querySelector("input[placeholder='Auto-calculated']");
    const loanInput = section7.querySelector("input[placeholder='Amount (Rs.)']");
    const ownContributionInput = section7.querySelectorAll("input[placeholder='Amount (Rs.)']")[8];
    const subsidyInput = section7.querySelectorAll("input[placeholder='Amount (Rs.)']")[9];
    const totalFundsField = section7.querySelectorAll("input[placeholder='Auto-calculated']")[1];

    function calculateTotalCost() {
      let sum = 0;
      // First 8 cost inputs (7.1 to 7.8)
      for (let i = 0; i < 8 && i < costInputs.length; i++) {
        sum += Number(costInputs[i].value) || 0;
      }
      if (totalProjectCostField) totalProjectCostField.value = sum;
      return sum;
    }

    function calculateTotalFunds() {
      let sum = 0;
      // Bank loan, Own contribution, Subsidy/grant
      if (loanInput && loanInput.value) sum += Number(loanInput.value) || 0;
      if (ownContributionInput && ownContributionInput.value) sum += Number(ownContributionInput.value) || 0;
      if (subsidyInput && subsidyInput.value) sum += Number(subsidyInput.value) || 0;
      if (totalFundsField) totalFundsField.value = sum;
      return sum;
    }

    costInputs.forEach(input => {
      input.addEventListener("input", () => {
        calculateTotalCost();
        calculateTotalFunds();
      });
    });

    if (loanInput) loanInput.addEventListener("input", calculateTotalFunds);
    if (ownContributionInput) ownContributionInput.addEventListener("input", calculateTotalFunds);
    if (subsidyInput) subsidyInput.addEventListener("input", calculateTotalFunds);

    // Initial calculation
    calculateTotalCost();
    calculateTotalFunds();
  }

  // --- Section 9: Infrastructure conditional logic (optional enhancement) ---
  const section9 = document.getElementById("section9");
  if (section9) {
    const workspaceRadios = section9.querySelectorAll("input[name='workspace']");
    const workspaceStatusDiv = section9.querySelectorAll("input[name='workspace_status']")[0]?.closest(".mb-2");
    const monthlyRentInput = section9.querySelector("input[placeholder='9.3 Monthly rent (if rented)']");

    function toggleWorkspaceFields() {
      const selectedWorkspace = section9.querySelector("input[name='workspace']:checked");
      if (selectedWorkspace && selectedWorkspace.value === "yes") {
        if (workspaceStatusDiv) workspaceStatusDiv.style.display = "block";
        if (monthlyRentInput) monthlyRentInput.closest(".mb-2").style.display = "block";
      } else {
        if (workspaceStatusDiv) workspaceStatusDiv.style.display = "none";
        if (monthlyRentInput) monthlyRentInput.closest(".mb-2").style.display = "none";
      }
    }

    if (workspaceRadios) {
      workspaceRadios.forEach(radio => {
        radio.addEventListener("change", toggleWorkspaceFields);
      });
      toggleWorkspaceFields();
    }
  }

  // --- Section 3: Seasonal variation conditional logic ---
  const section3 = document.getElementById("section3");
  if (section3) {
    const seasonalRadios = section3.querySelectorAll("input[name='seasonal']");
    const offSeasonDaysInput = section3.querySelector("input[placeholder='Number of off-season days']");

    function toggleOffSeasonDays() {
      const selectedSeasonal = section3.querySelector("input[name='seasonal']:checked");
      if (selectedSeasonal && selectedSeasonal.value === "yes" && offSeasonDaysInput) {
        offSeasonDaysInput.closest(".mb-2").style.display = "block";
      } else {
        if (offSeasonDaysInput) offSeasonDaysInput.closest(".mb-2").style.display = "none";
      }
    }

    if (seasonalRadios) {
      seasonalRadios.forEach(radio => {
        radio.addEventListener("change", toggleOffSeasonDays);
      });
      toggleOffSeasonDays();
    }
  }

  // --- Section 13: Set date automatically (already has PHP value, but ensure JS fallback) ---
  const dateInput = document.querySelector("#section13 input[type='date']");
  if (dateInput && !dateInput.value) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.value = today;
  }

  // --- Section 11: Eco-friendly and training conditional textareas ---
  const section11 = document.getElementById("section11");
  if (section11) {
    const ecoRadios = section11.querySelectorAll("input[name='eco_friendly']");
    const ecoDesc = section11.querySelector("textarea[placeholder='11.5 If yes, describe them']");
    const trainingRadios = section11.querySelectorAll("input[name='training']");
    const trainingDesc = section11.querySelector("textarea[placeholder='11.7 If yes, describe the training']");

    function toggleEcoDesc() {
      const selected = section11.querySelector("input[name='eco_friendly']:checked");
      if (ecoDesc) {
        if (selected && selected.value === "yes") {
          ecoDesc.closest(".mb-2").style.display = "block";
        } else {
          ecoDesc.closest(".mb-2").style.display = "none";
        }
      }
    }

    function toggleTrainingDesc() {
      const selected = section11.querySelector("input[name='training']:checked");
      if (trainingDesc) {
        if (selected && selected.value === "yes") {
          trainingDesc.closest(".mb-2").style.display = "block";
        } else {
          trainingDesc.closest(".mb-2").style.display = "none";
        }
      }
    }

    if (ecoRadios) {
      ecoRadios.forEach(radio => radio.addEventListener("change", toggleEcoDesc));
      toggleEcoDesc();
    }
    if (trainingRadios) {
      trainingRadios.forEach(radio => radio.addEventListener("change", toggleTrainingDesc));
      toggleTrainingDesc();
    }
  }

  // --- Section 14: GST and Udyam conditional fields ---
  const section14 = document.getElementById("section14");
  if (section14) {
    const gstRadios = section14.querySelectorAll("input[name='gst']");
    const gstNumberInput = section14.querySelector("input[placeholder='GST number']");
    const udyamRadios = section14.querySelectorAll("input[name='udyam']");
    const udyamNumberInput = section14.querySelector("input[placeholder='Udyam registration number']");

    function toggleGSTField() {
      const selected = section14.querySelector("input[name='gst']:checked");
      if (gstNumberInput) {
        if (selected && selected.value === "yes") {
          gstNumberInput.closest(".mb-2").style.display = "block";
        } else {
          gstNumberInput.closest(".mb-2").style.display = "none";
          gstNumberInput.value = "";
        }
      }
    }

    function toggleUdyamField() {
      const selected = section14.querySelector("input[name='udyam']:checked");
      if (udyamNumberInput) {
        if (selected && selected.value === "yes") {
          udyamNumberInput.closest(".mb-2").style.display = "block";
        } else {
          udyamNumberInput.closest(".mb-2").style.display = "none";
          udyamNumberInput.value = "";
        }
      }
    }

    if (gstRadios) {
      gstRadios.forEach(radio => radio.addEventListener("change", toggleGSTField));
      toggleGSTField();
    }
    if (udyamRadios) {
      udyamRadios.forEach(radio => radio.addEventListener("change", toggleUdyamField));
      toggleUdyamField();
    }
  }

  // --- Section 15: Loan before conditional fields ---
  const section15 = document.getElementById("section15");
  if (section15) {
    const loanBeforeRadios = section15.querySelectorAll("input[name='loan_before']");
    const loanTypeSelect = section15.querySelector("select");
    const lendingInstitution = section15.querySelector("input[placeholder='Lending institution']");
    const loanAmount = section15.querySelector("input[placeholder='Loan amount']");
    const loanOutstanding = section15.querySelector("input[placeholder='Current loan outstanding']");
    const loanDefaultsRadios = section15.querySelectorAll("input[name='loan_defaults']");
    const defaultsExplain = section15.querySelector("textarea[placeholder='If yes, explain']");

    const loanFields = [loanTypeSelect, lendingInstitution, loanAmount, loanOutstanding, loanDefaultsRadios[0]?.closest(".mb-2")];

    function toggleLoanFields() {
      const selected = section15.querySelector("input[name='loan_before']:checked");
      const show = selected && selected.value === "yes";
      if (loanTypeSelect && loanTypeSelect.closest(".mb-2")) {
        loanTypeSelect.closest(".mb-2").style.display = show ? "block" : "none";
      }
      if (lendingInstitution && lendingInstitution.closest(".mb-2")) {
        lendingInstitution.closest(".mb-2").style.display = show ? "block" : "none";
      }
      if (loanAmount && loanAmount.closest(".mb-2")) {
        loanAmount.closest(".mb-2").style.display = show ? "block" : "none";
      }
      if (loanOutstanding && loanOutstanding.closest(".mb-2")) {
        loanOutstanding.closest(".mb-2").style.display = show ? "block" : "none";
      }
      if (loanDefaultsRadios.length > 0) {
        const defaultsDiv = loanDefaultsRadios[0].closest(".mb-2");
        if (defaultsDiv) defaultsDiv.style.display = show ? "block" : "none";
      }
      if (show) {
        toggleDefaultsExplain();
      } else {
        if (defaultsExplain && defaultsExplain.closest(".mb-2")) {
          defaultsExplain.closest(".mb-2").style.display = "none";
        }
      }
    }

    function toggleDefaultsExplain() {
      const selected = section15.querySelector("input[name='loan_defaults']:checked");
      if (defaultsExplain && defaultsExplain.closest(".mb-2")) {
        if (selected && selected.value === "yes") {
          defaultsExplain.closest(".mb-2").style.display = "block";
        } else {
          defaultsExplain.closest(".mb-2").style.display = "none";
        }
      }
    }

    if (loanBeforeRadios) {
      loanBeforeRadios.forEach(radio => radio.addEventListener("change", toggleLoanFields));
      toggleLoanFields();
    }
    if (loanDefaultsRadios) {
      loanDefaultsRadios.forEach(radio => radio.addEventListener("change", toggleDefaultsExplain));
    }
  }

  // --- Sidebar Navigation: Click to jump to section ---
  const sidebarLinks = document.querySelectorAll("#sidebar-nav .nav-link");
  sidebarLinks.forEach((link, idx) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const href = link.getAttribute("href");
      if (href && href.startsWith("#section")) {
        const sectionId = href.substring(1);
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
          const sectionIndex = Array.from(sections).indexOf(targetSection);
          if (sectionIndex !== -1) {
            currentSection = sectionIndex;
            showSection(currentSection);
          }
        }
      }
    });
  });

  // --- Form Submission with Data Collection ---
  const dprForm = document.getElementById("dpr-form");
  dprForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Collect all form data (excluding file inputs for alert simplicity)
    const formData = new FormData(dprForm);
    let formSummary = "DPR Form Data Summary:\n\n";
    
    for (let [key, value] of formData.entries()) {
      if (typeof value === "string" && value.length > 0 && !key.includes("file")) {
        formSummary += `${key}: ${value}\n`;
      }
    }
    
    // Add member count info
    const memberRows = membersContainer ? membersContainer.querySelectorAll("tr").length : 0;
    formSummary += `\nTotal Members Added: ${memberRows}`;
    
    console.log("Form submitted:", Object.fromEntries(formData));
    alert("DPR submitted successfully! Check console for data.\n\n" + formSummary.substring(0, 500) + (formSummary.length > 500 ? "..." : ""));
    
    // Optional: Here you can integrate docx generation or API submission
    // For now, just show success message
  });
});