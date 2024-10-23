
<h1>Mail</h1>
Project 3 for CS50’s Web Programming with Python and JavaScript.
<h2>Overview</h2>
A front-end for an email client that makes API calls to send and receive emails.
<h2>Specification</h2>
The project completes the following requirements:
<ul>
  <li><strong>Send Mail: </strong>When a user submits the email composition form, add JavaScript code to actually send the email.<ul><li>Once the email has been sent, load the user’s sent mailbox.</li></ul></li>
     <li><strong>Mailbox: </strong>
     When a user visits their Inbox, Sent mailbox, or Archive, load the appropriate mailbox.<ul><li>When a mailbox is visited, the application should first query the API for the latest emails in that mailbox.</li><li>When a mailbox is visited, the name of the mailbox should appear at the top of the page.</li><li>Each email should then be rendered in its own box (e.g. as a <div> with a border) that displays who the email is from, what the subject line is, and the timestamp of the email.</li><li>If the email is unread, it should appear with a white background. If the email has been read, it should appear with a gray background.</li></ul></li>
     <li><strong>View Email: </strong>
     When a user clicks on an email, the user should be taken to a view where they see the content of that email.<ul><li>Your application should show the email’s sender, recipients, subject, timestamp, and body.</li><li>Once the email has been clicked on, you should mark the email as read. Recall that you can send a PUT request to /emails/<email_id> to update whether an email is read or not.</li></ul></li>
     <li><strong>Archive and Unarchive: </strong>
     Allow users to archive and unarchive emails that they have received.
     <ul>
       <li>When viewing an Inbox email, the user should be presented with a button that lets them archive the email. When viewing an Archive email, the user should be presented with a button that lets them unarchive the email. This requirement does not apply to emails in the Sent mailbox.</li>
       <li>Once an email has been archived or unarchived, load the user’s inbox.</li>
     </ul>
     </li>
  <li><strong>Reply: </strong>
     Allow users to reply to an email.<ul><li>When viewing an email, the user should be presented with a “Reply” button that lets them reply to the email.</li><li>When the user clicks the “Reply” button, they should be taken to the email composition form.</li><li>Pre-fill the composition form with the recipient field set to whoever sent the original email.</li><li>Pre-fill the subject line. If the original email had a subject line of foo, the new subject line should be Re: foo. (If the subject line already begins with Re: , no need to add it again.)</li><li>Pre-fill the body of the email with a line like "On Jan 1 2020, 12:00 AM foo@example.com wrote:" followed by the original text of the email.</li></ul></li>
</ul>
<h2>Setup</h2>
To set up this project on your computer:

<ol>
  <li>Download this project:<br><code>git clone https://github.com/TahaFayyaz1/Mail.git </code></li>
  <li>Install all necessary dependencies <br><code>pip install -r requirements.txt</code></li>
  <li>Make migrations <br><code>python manage.py makemigrations</code></li>
  <li>Migrate <br><code>python manage.py migrate</code></li>
</ol>

<h2>Preview</h2>
A demonstration of my project's functionality has be recorded and uploaded on Youtube:
<a href="https://youtu.be/q9Ozvo8qFak">Project Demonstration</a>
