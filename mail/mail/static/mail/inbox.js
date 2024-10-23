document.addEventListener("DOMContentLoaded", function () {
  // Use buttons to toggle between views
  document
    .querySelector("#inbox")
    .addEventListener("click", () => load_mailbox("inbox"));
  document
    .querySelector("#sent")
    .addEventListener("click", () => load_mailbox("sent"));
  document
    .querySelector("#archived")
    .addEventListener("click", () => load_mailbox("archive"));
  document.querySelector("#compose").addEventListener("click", () => {
    compose_email();
  });

  // By default, load the inbox
  load_mailbox("inbox");
});

function compose_email(recipients = "", subject = "", body = "") {
  // Show compose view and hide other views
  document.querySelector("#emails-view").style.display = "none";
  document.querySelector("#email-view").style.display = "none";
  document.querySelector("#compose-view").style.display = "block";

  // Clear out composition fields
  document.querySelector("#compose-recipients").value = recipients;

  if (subject.slice(0, 4) === "Re: ") {
    document.querySelector("#compose-subject").value = subject;
  } else if (subject === "") {
    document.querySelector("#compose-subject").value = "";
  } else {
    document.querySelector("#compose-subject").value = `Re: ${subject}`;
  }
  document.querySelector("#compose-body").value = body;

  document.querySelector("#compose-form").onsubmit = send_mail;
}

function load_mailbox(mailbox) {
  // Show the mailbox and hide other views
  document.querySelector("#emails-view").style.display = "block";
  document.querySelector("#email-view").style.display = "none";
  document.querySelector("#compose-view").style.display = "none";

  document.querySelector("#emails-view").innerHTML = "";
  // Show the mailbox name
  document.querySelector("#emails-view").innerHTML = `<h3>${
    mailbox.charAt(0).toUpperCase() + mailbox.slice(1)
  }</h3>`;

  fetch(`/emails/${mailbox}`)
    .then((response) => response.json())
    .then((emails) => {
      console.log(emails);
      for (let i = 0; i < emails.length; i++) {
        const container = document.createElement("div");
        container.className = "emails";

        if (emails[i].read === true) {
          container.id = "emails_read";
        }
        container.innerHTML = `<span id="senderdiv">${emails[i].sender}</span><span id="subjectdiv">${emails[i].subject}</span><span id="timestampdiv">${emails[i].timestamp}</span>`;
        container.addEventListener("click", function () {
          load_email(emails[i].id, mailbox);
        });
        document.querySelector("#emails-view").append(container);
      }
    });
}

function load_email(id, mailbox) {
  document.querySelector("#emails-view").style.display = "none";
  document.querySelector("#email-view").style.display = "block";
  document.querySelector("#compose-view").style.display = "none";
  fetch(`/emails/${id}`)
    .then((response) => response.json())
    .then((email) => {
      console.log(email);

      document.querySelector(
        "#from"
      ).innerHTML = `<strong>From: </strong> ${email.sender}`;
      document.querySelector(
        "#to"
      ).innerHTML = `<strong>To: </strong> ${email.recipients}`;
      document.querySelector(
        "#subject"
      ).innerHTML = `<strong>Subject: </strong> ${email.subject}`;
      document.querySelector(
        "#timestamp"
      ).innerHTML = `<strong>Timestamp: </strong> ${email.timestamp}`;
      document.querySelector("#body").innerHTML = email.body;

      fetch(`/emails/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          read: true,
        }),
      });

      const archive_button = document.querySelector("#archive-button");
      if (mailbox !== "sent") {
        archive_button.hidden = false;
        if (email.archived === false) {
          archive_button.innerHTML = "Archive";
        } else {
          archive_button.innerHTML = "Unarchive";
        }

        archive_button.onclick = () => {
          if (email.archived === false) {
            fetch(`/emails/${id}`, {
              method: "PUT",
              body: JSON.stringify({
                archived: true,
              }),
            }).then(() => load_mailbox("inbox"));
          } else {
            fetch(`/emails/${id}`, {
              method: "PUT",
              body: JSON.stringify({
                archived: false,
              }),
            }).then(() => load_mailbox("inbox"));
          }
        };
      } else {
        archive_button.hidden = true;
      }

      reply_body = `On ${email.timestamp} ${email.sender} wrote: ${email.body}`;
      document.querySelector("#reply-button").onclick = () => {
        compose_email(email.sender, email.subject, reply_body);
      };
    });
}

function send_mail() {
  const recipients = document.querySelector("#compose-recipients").value;
  const subject = document.querySelector("#compose-subject").value;
  const body = document.querySelector("#compose-body").value;
  fetch("/emails", {
    method: "POST",
    body: JSON.stringify({
      recipients: recipients,
      subject: subject,
      body: body,
    }),
  })
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
    })
    .then(() => {
      load_mailbox("sent");
    });
  return false;
}
