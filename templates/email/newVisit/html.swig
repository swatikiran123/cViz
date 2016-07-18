Hi, 

<p>A new client visit has been initiated by <b>{{createBy.name.first}} {{createBy.name.last}}</b>.</p>

Client name: {% if client.name != client.subName %} {{client.name}} {{client.subName}} {% endif %}
{% if client.name == client.subName %} {{client.name}} {% endif %}				
<br/>
Visit date: {{startDate|date('d M Y')}} - {{endDate|date('d M Y')}}<br/>
Visit locations: {{locations}}

<p>Please acknowledge the visit by clicking <a href="{{hostPath}}/manage/#/visits/{{visitId}}/edit" title="CSC Visit Portal">here</a>.</p>
<p>
Thanks.<br>
CSC India Visit Management Team<br>
<a href="https://c3.csc.com/groups/global-site-visit-management">Connect with us at on C3</a>
</p>