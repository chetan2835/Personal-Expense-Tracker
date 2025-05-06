$(document).ready(function () {
    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  
    function saveExpenses() {
      localStorage.setItem("expenses", JSON.stringify(expenses));
    }
  
    function updateSummary(filteredExpenses) {
      const total = filteredExpenses.reduce((sum, exp) => sum + Number(exp.amount), 0);
      $("#summary").text(`Total Expense: ₹${total}`);
    }
  
    function renderExpenses(filterCategory = "") {
      $("#expense-list").empty();
      const filtered = filterCategory
        ? expenses.filter(exp => exp.category === filterCategory)
        : expenses;
  
      filtered.forEach((exp, index) => {
        $("#expense-list").append(`
          <li class="list-group-item d-flex align-items-center">
            <strong>${exp.description}</strong> - ₹${exp.amount}
            <span class="badge bg-primary ms-3">${exp.category}</span>
            <small class="text-muted ms-auto">${exp.date}</small>
            <button class="btn btn-sm btn-outline-danger ms-3 delete-btn" data-index="${index}">🗑️</button>
          </li>
        `);
      });
  
      updateSummary(filtered);
    }
  
    // Initial render
    renderExpenses();
  
    // Add new expense
    $("#expense-form").submit(function (e) {
      e.preventDefault();
      const description = $("#description").val().trim();
      const amount = parseFloat($("#amount").val());
      const date = $("#date").val();
      const category = $("#category").val();
  
      if (description && amount > 0 && date && category) {
        expenses.push({ description, amount, date, category });
        saveExpenses();
        renderExpenses($("#filter-category").val());
        this.reset();
      }
    });
  
    // Delete expense
    $(document).on("click", ".delete-btn", function () {
      const index = $(this).data("index");
      expenses.splice(index, 1);
      saveExpenses();
      renderExpenses($("#filter-category").val());
    });
  
    // Filter by category
    $("#filter-category").change(function () {
      renderExpenses($(this).val());
    });
  });
  