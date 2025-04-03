function sendMail() {
  const email = document.querySelector(
    "div.form-example:nth-child(4) > input:nth-child(2)"
  ).value;
  const recipient = "rayan.boughalia@gmail.com";
  const message = document.querySelector("#msg").value;

  alert("email: " + email + " message: " + message+ " recipient: " + recipient);
}
