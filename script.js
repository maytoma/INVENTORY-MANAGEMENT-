// Global Transactions Array
const transactions = [];
const items = [
  { name: "High-Performance Computing (HPC) Clusters", category: "Equipment", addedAt: "2025-01-21T10:30:00" },
  { name: "Workstations", category: "Equipment", addedAt: "2025-01-21T10:30:00" },
  { name: "DNA Sequencers", category: "Equipment", addedAt: "2025-01-21T10:30:00" },
  { name: "RNA Sequencers", category: "Equipment", addedAt: "2025-01-21T10:30:00" },
  { name: "Protein Analyzers", category: "Equipment", addedAt: "2025-01-21T10:30:00" },
  { name: "Robotic Liquid Handlers", category: "Equipment", addedAt: "2025-01-21T10:30:00" },
  { name: "Microarray Scanners", category: "Equipment", addedAt: "2025-01-21T10:30:00" },
  { name: "Data Storage Systems", category: "Equipment", addedAt: "2025-01-21T10:30:00" },
  { name: "Microscopes", category: "Equipment", addedAt: "2025-01-21T10:30:00" },
  { name: "PCR Machines", category: "Equipment", addedAt: "2025-01-21T10:30:00" },
  { name: "Electrophoresis Equipment", category: "Equipment", addedAt: "2025-01-21T10:30:00" },
  { name: "Bioinformatics Databases", category: "Equipment", addedAt: "2025-01-21T10:30:00" },
  { name: "Pipettes", category: "Apparatus", addedAt: "2025-01-21T10:30:00" },
  { name: "Centrifuges", category: "Apparatus", addedAt: "2025-01-21T10:30:00" },
  { name: "Thermal Cyclers", category: "Apparatus", addedAt: "2025-01-21T10:30:00" },
  { name: "Gel Electrophoresis Systems", category: "Apparatus", addedAt: "2025-01-21T10:30:00" },
  { name: "Microscopes", category: "Apparatus", addedAt: "2025-01-21T10:30:00" },
  { name: "Balances", category: "Apparatus", addedAt: "2025-01-21T10:30:00" },
  { name: "Incubators", category: "Apparatus", addedAt: "2025-01-21T10:30:00" },
  { name: "Water Baths", category: "Apparatus", addedAt: "2025-01-21T10:30:00" },
  { name: "Laboratory Glassware", category: "Apparatus", addedAt: "2025-01-21T10:30:00" },
  { name: "Laboratory Consumables", category: "Apparatus", addedAt: "2025-01-21T10:30:00" },
  { name: "Safety Equipment", category: "Apparatus", addedAt: "2025-01-21T10:30:00" },
  { name: "Personal Computers", category: "Apparatus", addedAt: "2025-01-21T10:30:00" },
  { name: "Buffers", category: "Chemicals", addedAt: "2025-01-21T10:30:00" },
  { name: "Nucleic Acid Extraction and Purification Reagents", category: "Chemicals", addedAt: "2025-01-21T10:30:00" },
  { name: "PCR Reagents", category: "Chemicals", addedAt: "2025-01-21T10:30:00" },
  { name: "Agarose Gel Electrophoresis Reagents", category: "Chemicals", addedAt: "2025-01-21T10:30:00" },
  { name: "Protein Analysis Reagents", category: "Chemicals", addedAt: "2025-01-21T10:30:00" },
  { name: "Enzymes and Enzyme Substrates", category: "Chemicals", addedAt: "2025-01-21T10:30:00" },
  { name: "Cell Culture Reagents", category: "Chemicals", addedAt: "2025-01-21T10:30:00" },
  { name: "Chemicals for Molecular Biology Techniques", category: "Chemicals", addedAt: "2025-01-21T10:30:00" },
  { name: "Stains and Indicators", category: "Chemicals", addedAt: "2025-01-21T10:30:00" },
  { name: "Chemicals for Sterilization and Decontamination", category: "Chemicals", addedAt: "2025-01-21T10:30:00" },
  { name: "Analytical Reagents", category: "Chemicals", addedAt: "2025-01-21T10:30:00" },
  { name: "Molecular Biology Kits", category: "Chemicals", addedAt: "2025-01-21T10:30:00" },
];

const stockedItems = []; // List to keep track of items that are stocked in
let stockInTotal = 0; // Total Stock In
let stockOutTotal = 0; // Total Stock Out

// Function to switch pages
function showPage(pageId) {
  document.querySelectorAll(".page").forEach((page) => page.classList.remove("active"));
  const selectedPage = document.getElementById(pageId);
  if (selectedPage) {
    selectedPage.classList.add("active");
  } else {
    console.error(`Page with ID "${pageId}" not found.`);
  }
}

// Add a new transaction
function addTransaction(itemName, quantity, action) {
  const transaction = {
    date: new Date().toLocaleString(),
    itemName,
    quantity,
    action,
  };
  transactions.push(transaction);
  updateTransactionHistory();
}

// Update the transaction history table
function updateTransactionHistory() {
  const transactionData = document.getElementById("transaction-data");
  transactionData.innerHTML = ""; // Clear previous transactions

  transactions.forEach((transaction) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${transaction.date}</td>
      <td>${transaction.itemName}</td>
      <td>${transaction.quantity}</td>
      <td>${transaction.action}</td>
    `;
    transactionData.appendChild(row);
  });
}

// Add a new item to the stock
function addItemToStock(itemName, category, quantity) {
  const existingItem = stockedItems.find(item => item.name === itemName && item.category === category);

  if (existingItem) {
    existingItem.quantity += quantity; // Update quantity if item exists
  } else {
    const newItem = {
      name: itemName,
      category: category || "Uncategorized",
      quantity: quantity,
      addedAt: new Date().toISOString(),
    };
    stockedItems.push(newItem);
  }
  stockInTotal += quantity; // Update Stock In total
  updateStats(); // Update the UI for stats
  displayStockedItems(); // Update the UI for stocked items
}

// Remove items from stock
function removeItemFromStock(itemName, quantity) {
  const existingItem = stockedItems.find(item => item.name === itemName);

  if (existingItem) {
    if (existingItem.quantity > quantity) {
      existingItem.quantity -= quantity; // Decrease the quantity
    } else {
      const index = stockedItems.indexOf(existingItem);
      stockedItems.splice(index, 1); // Remove the item if quantity becomes zero or negative
    }
    stockOutTotal += quantity; // Update Stock Out total
    updateStats(); // Update the UI for stats
    displayStockedItems(); // Update the UI for stocked items
  } else {
    alert("Item not found in stock.");
  }
}

// Update the stats (Stock In, Stock Out, Total)
function updateStats() {
  document.getElementById("stockIn").value = stockInTotal;
  document.getElementById("stockOut").value = stockOutTotal;
  document.getElementById("totalStock").textContent = stockInTotal - stockOutTotal;
}

// Updated filterItems function
function filterItems(category) {
  const filteredItems = category
      ? stockedItems.filter(item => item.category === category)
      : stockedItems; // Show all if no category is selected

  displayStockedItems(filteredItems);
}

// Display stocked items dynamically based on the provided list
function displayStockedItems(itemsToDisplay = stockedItems) {
  const itemsList = document.getElementById("itemsList");
  itemsList.innerHTML = ""; // Clear the existing content

  if (itemsToDisplay.length > 0) {
    itemsToDisplay
      .sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt)) // Sort by added date
      .forEach(item => {
        const itemElement = document.createElement("p");
        itemElement.textContent = `${item.name} (${item.category}) - Quantity: ${item.quantity}`;
        itemsList.appendChild(itemElement);
      });
  } else {
    itemsList.innerHTML = "<p>No items available for the selected filter.</p>";
  }
}

// Search functionality
function handleSearch() {
  const searchInput = document.getElementById("searchItems").value.trim().toLowerCase();
  const filteredItems = stockedItems.filter((item) => item.name.toLowerCase().includes(searchInput));
  displayStockedItems(filteredItems);
}

// Attach event listeners
function setupEventListeners() {
  // Admin Sign-In Form
  document.getElementById("signinAdminForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Admin signed in successfully!");
    showPage("homePage");
  });

  // Admin Sign-Up Form
  document.getElementById("signupAdminForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("adminName").value.trim();
    const email = document.getElementById("adminSignupEmail").value.trim();
    const password = document.getElementById("adminSignupPassword").value;
    const confirmPassword = document.getElementById("adminConfirmPassword").value;

    if (!name || !email || !password || !confirmPassword) {
      alert("All fields are required. Please fill out the form completely.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      document.getElementById("adminSignupPassword").value = "";
      document.getElementById("adminConfirmPassword").value = "";
      return;
    }

    alert(`Admin signed up successfully!\nName: ${name}\nEmail: ${email}`);
    showPage("homePage");
  });

  // User Sign-In Form
  document.getElementById("signinUserForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("User signed in successfully!");
    showPage("homePage");
  });
  
  let userRole = ""; // Store user role globally

// Admin Sign-In
document.getElementById("signinAdminForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    userRole = "admin"; // Set role to admin
    alert("Admin signed in successfully!");
    updateUIForRole(); // Call function to update UI
    showPage("homePage");
});

// User Sign-In
document.getElementById("signinUserForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    userRole = "user"; // Set role to user
    alert("User signed in successfully!");
    updateUIForRole(); // Call function to update UI
    showPage("homePage");
});
  
  function updateUIForRole() {
    const userManagementBtn = document.querySelector(".menu-btn[onclick=\"showPage('userManagementPage')\"]");

    if (userRole === "user") {
        if (userManagementBtn) userManagementBtn.style.display = "none"; // Hide the button
    } else if (userRole === "admin") {
        if (userManagementBtn) userManagementBtn.style.display = "block"; // Show for admins
    }
}

  function showPage(pageId) {
    document.querySelectorAll(".page").forEach((page) => page.classList.remove("active"));
    const selectedPage = document.getElementById(pageId);

    if (selectedPage) {
        selectedPage.classList.add("active");
        updateUIForRole(); // Update UI based on role
    } else {
        console.error(`Page with ID "${pageId}" not found.`);
    }
}

  // Items In Form
  document.getElementById("itemsInForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const itemName = document.getElementById("itemName").value.trim();
    const category = document.getElementById("itemCategory").value;
    const quantity = parseInt(document.getElementById("quantity").value, 10);

    if (itemName && category && quantity > 0) {
        addItemToStock(itemName, category, quantity); // Add item to stock with category
        addTransaction(itemName, quantity, "Added");
        alert("Item stocked successfully!");
        e.target.reset();
        showPage("homePage");
    } else {
        alert("Please enter valid item details.");
    }
  });

  // Items Out Form
  document.getElementById("itemsOutForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const itemName = document.getElementById("itemNameOut").value.trim();
    const category = document.getElementById("itemCategoryOut").value;
    const quantity = parseInt(document.getElementById("quantityOut").value, 10);

    if (itemName && category && quantity > 0) {
        removeItemFromStock(itemName, quantity); // Remove item from stock
        addTransaction(itemName, quantity, "Removed");
        alert("Item removed successfully!");
        e.target.reset();
        showPage("homePage");
    } else {
        alert("Please enter valid item details.");
    }
  });

  // Add New Item Form
  document.getElementById("addNewItemForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const itemName = document.getElementById("newItemName").value.trim();
    const category = document.getElementById("newItemCategory").value;
    const quantity = parseInt(document.getElementById("newItemQuantity").value, 10);

    if (itemName && category && quantity > 0) {
        addItemToStock(itemName, category, quantity); // Add new item to stock with category
        addTransaction(itemName, quantity, "New Item Added");
        alert("New item added successfully!");
        e.target.reset();
        showPage("homePage");
    } else {
        alert("Please enter valid item details.");
    }
  });

  // Search Button
  document.getElementById("searchButton")?.addEventListener("click", handleSearch);

  // Notifications Button
  document.getElementById("notifications")?.addEventListener("click", () => {
    showPage("notificationsPage");
  });

  // Google Sign-In Placeholder
  document.getElementById("googleSignIn")?.addEventListener("click", () => {
    alert("Google Sign-In is not implemented yet. Please integrate Google API.");
  });

  document.getElementById("googleSignInUser")?.addEventListener("click", () => {
    alert("Google Sign-In is not implemented yet. Please integrate Google API.");
  });

  // Forgot Password Handlers
  document.getElementById("forgotPasswordForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("forgotEmail").value;
    if (email) {
      alert(`Password reset link sent to ${email}.`);
      showPage("signinAdminPage");
    } else {
      alert("Please enter a valid email.");
    }
  });

  document.getElementById("forgotUserPasswordForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("forgotUserEmail").value;
    if (email) {
      alert(`Password reset link sent to ${email}.`);
      showPage("signinUserPage");
    } else {
      alert("Please enter a valid email.");
    }
  });
}

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
  displayStockedItems();
  setupEventListeners();
  showPage("welcomePage");
});

document.addEventListener("DOMContentLoaded", () => {
    // Show page functionality
    function showPage(pageId) {
        document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
        const selectedPage = document.getElementById(pageId);
        if (selectedPage) {
            selectedPage.classList.add('active');
        } else {
            console.error(`Page with ID "${pageId}" not found.`);
        }
    }

    // Change Password Functionality
    function changePassword(event) {
        event.preventDefault();
        alert("Your password was changed successfully!");
        showPage('account-security-page');
    }

    // Add any other event listeners if necessary
});

// Show User Management Page
function populateUserManagement() {
    const userTable = document.getElementById("userTable");
    const users = [
        { username: "john_doe", signedIn: "2024-12-20 08:00 AM", signedOut: "2024-12-20 05:00 PM" },
        { username: "jane_smith", signedIn: "2024-12-20 09:30 AM", signedOut: "2024-12-20 04:45 PM" },
        { username: "user123", signedIn: "2024-12-20 10:15 AM", signedOut: "2024-12-20 06:30 PM" },
    ];

    userTable.innerHTML = users
        .map(
            (user) => `
            <tr>
                <td>${user.username}</td>
                <td>${user.signedIn}</td>
                <td>${user.signedOut}</td>
            </tr>
        `
        )
        .join("");
}

// Logout Functionality
function logout() {
    alert("You have been logged out.");
    showPage("welcomePage");
}

// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("userManagement")?.addEventListener("click", populateUserManagement);
});

// Load existing notifications from localStorage (persistent storage)
const notifications = JSON.parse(localStorage.getItem("notifications")) || [];

// Function to add a notification
function addNotification(message, type) {
    notifications.push({
        message,
        type, // 'user_login' or 'stock_action' etc.
        date: new Date().toLocaleString(),
    });

    // Save notifications to localStorage
    localStorage.setItem("notifications", JSON.stringify(notifications));

    updateNotificationBell();
}

// Function to update the notification bell (only for admins)
function updateNotificationBell() {
    if (userRole === "admin") {
        const notificationBell = document.getElementById("notifications");
        const unseenCount = notifications.length;
        notificationBell.innerHTML = `??${unseenCount > 0 ? ` (${unseenCount})` : ""}`;
    }
}

// Function to display notifications based on role
function displayNotifications() {
    const notificationsContent = document.getElementById("notificationsContent");
    notificationsContent.innerHTML = ""; // Clear previous notifications

    let filteredNotifications;
    
    if (userRole === "admin") {
        filteredNotifications = notifications; // Admin sees all notifications
    } else {
        // Users should only see non-login-related notifications (e.g., stock changes)
        filteredNotifications = notifications.filter(n => n.type !== "user_login");
    }

    if (filteredNotifications.length === 0) {
        notificationsContent.innerHTML = "<p>No notifications at the moment.</p>";
    } else {
        filteredNotifications.forEach((notification) => {
            const notificationElement = document.createElement("div");
            notificationElement.textContent = `${notification.date} - ${notification.message}`;
            notificationsContent.appendChild(notificationElement);
        });
    }

    // Update bell icon again
    updateNotificationBell();
}

// Function to clear notifications when button is clicked
function clearNotifications() {
    if (userRole === "admin") {
        localStorage.removeItem("notifications"); // Clear from storage
        notifications.length = 0; // Clear array
        displayNotifications(); // Refresh UI
        updateNotificationBell(); // Update bell icon
        alert("All notifications cleared.");
    }
}

// Attach event listener to the "Clear Notifications" button
document.getElementById("clearNotifications")?.addEventListener("click", clearNotifications);

// When an admin logs in, log the event
document.getElementById("signinAdminForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    userRole = "admin"; // Set role to admin
    alert("Admin signed in successfully!");
    addNotification("Admin logged in.", "user_login"); // Log login event
    updateUIForRole();
    showPage("homePage");
});

// When a user logs in, log the event (but only store for admins)
document.getElementById("signinUserForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    userRole = "user"; // Set role to user
    alert("User signed in successfully!");

    // Log login notification but only for admins
    addNotification("A user has logged in.", "user_login");

    updateUIForRole();
    showPage("homePage");
});

function updateUIForRole() {
    const userManagementBtn = document.querySelector(".menu-btn[onclick=\"showPage('userManagementPage')\"]");
    const notificationBell = document.getElementById("notifications");

    if (userRole === "user") {
        if (userManagementBtn) userManagementBtn.style.display = "none"; // Hide User Management
        if (notificationBell) notificationBell.style.display = "none"; // Hide Notifications
    } else if (userRole === "admin") {
        if (userManagementBtn) userManagementBtn.style.display = "block"; // Show for admins
        if (notificationBell) notificationBell.style.display = "block"; // Show Notifications
    }
}

// Attach the display function to the bell click event
document.getElementById("notifications").addEventListener("click", displayNotifications);

// Update notifications for user actions
function logUserLogin(username) {
  addNotification(`User "${username}" has logged in.`);
}

function logStockAction(itemName, action, quantity) {
  addNotification(`Item "${itemName}" was ${action} (${quantity}).`);
}

// Example Usage: Call these functions when relevant events occur
document.getElementById("signinUserForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.getElementById("userEmail").value.trim();
  logUserLogin(username);
  alert("User signed in successfully!");
  showPage("homePage");
});

document.getElementById("itemsInForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const itemName = document.getElementById("itemName").value.trim();
  const category = document.getElementById("itemCategory").value;
  const quantity = parseInt(document.getElementById("quantity").value, 10);

  if (itemName && category && quantity > 0) {
    addItemToStock(itemName, category, quantity);
    logStockAction(itemName, "added to stock", quantity);
    addTransaction(itemName, quantity, "Added");
    alert("Item stocked successfully!");
    e.target.reset();
    showPage("homePage");
  } else {
    alert("Please enter valid item details.");
  }
});

document.getElementById("itemsOutForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const itemName = document.getElementById("itemNameOut").value.trim();
  const quantity = parseInt(document.getElementById("quantityOut").value, 10);

  if (itemName && quantity > 0) {
    removeItemFromStock(itemName, quantity);
    logStockAction(itemName, "removed from stock", quantity);
    addTransaction(itemName, quantity, "Removed");
    alert("Item removed successfully!");
    e.target.reset();
    showPage("homePage");
  } else {
    alert("Please enter valid item details.");
  }
});

// Load approved users from localStorage
let approvedUsers = JSON.parse(localStorage.getItem("approvedUsers")) || [];

// Function to add a new approved user
function addApprovedUser(email) {
    if (!approvedUsers.includes(email)) {
        approvedUsers.push(email);
        localStorage.setItem("approvedUsers", JSON.stringify(approvedUsers));
    }
}

// Function to remove an approved user
function removeApprovedUser(email) {
    approvedUsers = approvedUsers.filter(user => user !== email);
    localStorage.setItem("approvedUsers", JSON.stringify(approvedUsers));
}

// Function to check if a user is approved
function isUserApproved(email) {
    return approvedUsers.includes(email);
}

// User Sign-In - Prevent login if not approved
document.getElementById("signinUserForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("userEmail").value.trim();

    if (!isUserApproved(email)) {
        alert("Access Denied: You are not approved by an admin.");
        return;
    }

    userRole = "user"; // Set role to user
    alert("User signed in successfully!");
    
    // Log user login notification
    addNotification(`User ${email} has logged in.`, "user_login");

    updateUIForRole();
    showPage("homePage");
});

// Load logged-in users from localStorage
let loggedInUsers = JSON.parse(localStorage.getItem("loggedInUsers")) || [];

// Function to update User Management Table
function populateUserManagement() {
    const userTable = document.getElementById("userTable");
    userTable.innerHTML = ""; // Clear existing rows

    loggedInUsers.forEach(user => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${user.email}</td>
            <td>${user.signedIn}</td>
            <td>${user.signedOut || "Still Logged In"}</td>
            <td>
                <button onclick="removeUser('${user.email}')">Remove</button>
            </td>
        `;
        userTable.appendChild(row);
    });
}

// Function to log a user login (only for admins to see)
function logUserLogin(email) {
    const user = {
        email,
        signedIn: new Date().toLocaleString(),
        signedOut: null
    };

    loggedInUsers.push(user);
    localStorage.setItem("loggedInUsers", JSON.stringify(loggedInUsers));

    populateUserManagement();
}

// Call `populateUserManagement` when opening the User Management Page
document.getElementById("userManagementPage")?.addEventListener("click", populateUserManagement);

// Function for Admin to Remove a User
function removeUser(email) {
    removeApprovedUser(email); // Remove from approved users
    loggedInUsers = loggedInUsers.filter(user => user.email !== email);
    localStorage.setItem("loggedInUsers", JSON.stringify(loggedInUsers));
    alert(`User ${email} has been removed.`);
    populateUserManagement();
}

// Function for Admin to Add a User
function addUser() {
    const email = prompt("Enter the email of the user to add:");
    if (email && !approvedUsers.includes(email)) {
        addApprovedUser(email);
        alert(`User ${email} has been approved.`);
        populateUserManagement();
    } else {
        alert("Invalid email or user is already approved.");
    }
}



// Function to filter transactions
function filterTransactions() {
    const filterValue = document.getElementById("timeFilter").value;
    const now = new Date();

    const filteredTransactions = transactions.filter(transaction => {
        const transactionDate = new Date(transaction.date);

        if (filterValue === "weekly") {
            const oneWeekAgo = new Date();
            oneWeekAgo.setDate(now.getDate() - 7);
            return transactionDate >= oneWeekAgo;
        } else if (filterValue === "monthly") {
            const oneMonthAgo = new Date();
            oneMonthAgo.setMonth(now.getMonth() - 1);
            return transactionDate >= oneMonthAgo;
        } else if (filterValue === "yearly") {
            const oneYearAgo = new Date();
            oneYearAgo.setFullYear(now.getFullYear() - 1);
            return transactionDate >= oneYearAgo;
        } else {
            return true; // Default: show all transactions
        }
    });

    updateTransactionHistory(filteredTransactions);
}

// Function to update transaction history (now accepts filtered data)
function updateTransactionHistory(data = transactions) {
    const transactionData = document.getElementById("transaction-data");
    transactionData.innerHTML = ""; // Clear previous transactions

    data.forEach(transaction => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${transaction.date}</td>
            <td>${transaction.itemName}</td>
            <td>${transaction.action}</td>
            <td>${transaction.quantity}</td>
        `;
        transactionData.appendChild(row);
    });
}

// Function to download transaction report
function downloadTransactionReport() {
    const csvContent = "data:text/csv;charset=utf-8," +
        "Date,Item Name,Type,Quantity\n" + 
        transactions.map(transaction =>
            `${transaction.date},${transaction.itemName},${transaction.action},${transaction.quantity}`
        ).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "transaction_history.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Display stocked items dynamically based on the provided list
function displayStockedItems(itemsToDisplay = stockedItems) {
    const itemsList = document.getElementById("itemsList");
    itemsList.innerHTML = ""; // Clear the existing content

    if (itemsToDisplay.length > 0) {
        itemsToDisplay
            .sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt)) // Sort by added date
            .forEach(item => {
                // Determine the manual link based on category
                let manualLink = "";
                if (item.category === "Equipment") {
                    manualLink = "/manuals/Equipment Manual.pdf";
                } else if (item.category === "Apparatus") {
                    manualLink = "/manuals/Apparatus Manual.pdf";
                } else if (item.category === "Chemicals") {
                    manualLink = "/manuals/Chemicals SDS.pdf";
                }

                // Create the item element with manual link
                const itemElement = document.createElement("div");
                itemElement.style.marginBottom = "10px";
                itemElement.innerHTML = `
                    <p>
                        ${item.name} (${item.category}) - Quantity: ${item.quantity}
                        ${manualLink ? `<a href="${manualLink}" target="_blank" style="margin-left: 10px; color: blue; text-decoration: underline;">View Manual</a>` : ""}
                    </p>
                `;

                itemsList.appendChild(itemElement);
            });
    } else {
        itemsList.innerHTML = "<p>No items available for the selected filter.</p>";
    }
}
