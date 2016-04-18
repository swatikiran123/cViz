Dear Visit Manager,

<p>
New Visit Agenda submitted by {{createBy.name.first}} {{createBy.name.last}} on {{createOn|date('jS \o\f F, Y')}}<br/>
</p>

<h2>Agenda Summary:</h2>

Title: {{title}}<br/>
Client: {{client.name}}<br/>
Start Date: {{startDate|date('jS \o\f F, Y')}}<br/>
End Date: {{endDate|date('jS \o\f F, Y')}}<br/>
Locations: {{locations}}<br/>
Status: {{status}}<br/>

<p>Please click here {{link}} (or copy paste the below link in your browser address bar) to open the visit agenda.
You can pick it by clicking on assign to myself link on the page.</p>

{{link}}

<p>
Best Regards,
Visit Portal Team
</p>

<hr/>
Note: This is an auto generated mail from Visit Portal. Please do not reply.
