//VARIABLES
const sendBtn = document.querySelector("#send")
const resetBtn = document.querySelector("#resetBtn")
const form = document.querySelector("#send-mail")
const email = document.querySelector("#email")
const subject = document.querySelector("#subject")
const message = document.querySelector("#message")

const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i

//EVENTS
eventListeners()
function eventListeners() {
  document.addEventListener("DOMContentLoaded", startApp)

  //Validate Form
  email.addEventListener("blur", validateForm)
  subject.addEventListener("blur", validateForm)
  message.addEventListener("blur", validateForm)

  //Send Email
  form.addEventListener("submit", sendEmail)

  //Reset form bottom
  resetBtn.addEventListener("click", resetForm)
}

//FUNCTIONS

function startApp() {
  //Disable send buttom
  sendBtn.disabled = true
  sendBtn.classList.add("cursor-not-allowed", "opacity-50")
}

function validateForm(e) {
  //Validate subject and message
  if (e.target.value.length > 0) {
    const error = document.querySelector("p.error")
    if (error) {
      error.remove()
    }

    e.target.classList.remove("border", "border-red-500")
    e.target.classList.add("border", "border-green-500")
  } else {
    e.target.classList.remove("border", "border-green-500")
    e.target.classList.add("border", "border-red-500")
    showError("All fields are required")
  }

  // validate email
  if (e.target.type === "email") {
    if (emailRegex.test(e.target.value)) {
      const error = document.querySelector("p.error")
      if (error) {
        error.remove()
      }

      e.target.classList.remove("border", "border-red-500")
      e.target.classList.add("border", "border-green-500")
    } else {
      e.target.classList.remove("border", "border-green-500")
      e.target.classList.add("border", "border-red-500")
      showError("Invalid email")
    }
  }

  if (
    emailRegex.test(email.value) &&
    subject.value != "" &&
    message.value != ""
  ) {
    sendBtn.disabled = false
    sendBtn.classList.remove("cursor-not-allowed", "opacity-50")
  } else {
    sendBtn.disabled = true
    sendBtn.classList.add("cursor-not-allowed", "opacity-50")
  }
}

function showError(message) {
  const errorMsg = document.createElement("p")
  errorMsg.textContent = message
  errorMsg.classList.add(
    "border",
    "border-red-500",
    "background-red-100",
    "text-red-500",
    "p-3",
    "mt-5",
    "text-center",
    "error"
  )

  const errors = document.querySelectorAll(".error")

  if (errors.length === 0) {
    form.appendChild(errorMsg)
  } else {
    errors[0].textContent = message
  }
}

function sendEmail(e) {
  e.preventDefault()

  startApp()

  //To show spinner
  const spineer = document.querySelector("#spinner")
  spineer.style.display = "flex"

  //Hide Spinner
  setTimeout(() => {
    spineer.style.display = "none"

    //Message done
    const doneMsg = document.createElement("p")
    doneMsg.textContent = "Message sent"
    doneMsg.classList.add(
      "border",
      "border-green-500",
      "bg-green-100",
      "text-green-500",
      "p-3",
      "mt-5",
      "text-center",
      "done"
    )

    const done = document.querySelectorAll(".done")

    if (done.length === 0) {
      form.appendChild(doneMsg)
    }

    setTimeout(() => {
      doneMsg.remove()
      resetForm()
    }, 5000)
  }, 3000)
}

// Reset Form

function resetForm() {
  form.reset()
  deleteBorderColor()
  startApp()

  const done = document.querySelector("p.done")

  if (done) {
    done.remove()
  }
}

// DELETE BORDER FORM

function deleteBorderColor() {
  email.classList.remove("border", "border-green-500")
  subject.classList.remove("border", "border-green-500")
  message.classList.remove("border", "border-green-500")
}
