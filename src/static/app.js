document.addEventListener("DOMContentLoaded", () => {
  const activitiesList = document.getElementById("activities-list");
  const activitySelect = document.getElementById("activity");
  const signupForm = document.getElementById("signup-form");
  const messageDiv = document.getElementById("message");

  // Function to fetch activities from API
  async function fetchActivities() {
    try {
      const response = await fetch("/activities");
      const activities = await response.json();

      // Clear loading message
      activitiesList.innerHTML = "";

      // Populate activities list
      Object.entries(activities).forEach(([name, details]) => {
        const activityCard = document.createElement("div");
        activityCard.className = "activity-card";

        const spotsLeft = details.max_participants - details.participants.length;

        // Create participants list
        const participantsList = details.participants.length
          ? `<ul class="participants-list">
              ${details.participants.map((participant) => `<li>${participant}</li>`).join("")}
            </ul>`
          : "<p class='no-participants'>No participants yet.</p>";

        activityCard.innerHTML = `
          <h4>${name}</h4>
          <p>${details.description}</p>
          <p><strong>Schedule:</strong> ${details.schedule}</p>
          <p><strong>Availability:</strong> ${spotsLeft} spots left</p>
          <div class="participants-section">
            <h5>Participants:</h5>
            ${participantsList}
          </div>
        `;

        activitiesList.appendChild(activityCard);

        // Add option to select dropdown
        const option = document.createElement("option");
        option.value = name;
        option.textContent = name;
        activitySelect.appendChild(option);
      });
    } catch (error) {
      activitiesList.innerHTML = "<p>Failed to load activities. Please try again later.</p>";
      console.error("Error fetching activities:", error);
    }
  }

  // Handle form submission
  signupForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const activity = document.getElementById("activity").value;

    try {
      const response = await fetch("/signup", {
        method: "POST",deURIComponent(activity)}/signup?email=${encodeURIComponent(email)}`,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, activity }),;
      });

      const result = await response.json();

      if (response.ok) {ontent = result.message;
        messageDiv.textContent = "Successfully signed up!";
        messageDiv.className = "success";orm.reset();
        signupForm.reset();
      } else {
        messageDiv.textContent = result.detail || "An error occurred";";
        messageDiv.className = "error";
      }
 messageDiv.classList.remove("hidden");
      messageDiv.classList.remove("hidden");
      // Hide message after 5 seconds
      // Hide message after 5 seconds => {
      setTimeout(() => {lassList.add("hidden");
        messageDiv.classList.add("hidden");   }, 5000);
      }, 5000);    } catch (error) {












});  fetchActivities();  // Initialize app  });    }      console.error("Error signing up:", error);      messageDiv.classList.remove("hidden");      messageDiv.className = "error";      messageDiv.textContent = "Failed to sign up. Please try again.";    } catch (error) {      messageDiv.textContent = "Failed to sign up. Please try again.";
      messageDiv.className = "error";
      messageDiv.classList.remove("hidden");
      console.error("Error signing up:", error);
    }
  });

  // Initialize app
  fetchActivities();
});
