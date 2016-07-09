<div>AGENDA</div>

<label class="dateHeader">Agenda: {{date|date('d F Y') }} | CSC {{location}}</label>

<table class="table table-striped table-condensed table-responsive table-hover" cellpadding="0" cellspacing="0" border="1" width="100%">
  <thead class="data-grid-header">
    <tr>
      <th>Date</th>
      <th>Type</th>
      <th>Time (Hrs.)</th>
      <th>Session/Activity</th>
      <th>Venue</th>
    </tr>
  </thead>
  <tbody class="data-grid-data">  	
  	{% for schedule in sessions %}
  	<tr>
      <td>{{schedule.scheduleDate|date('d M Y')}}</td>
      <td>{{schedule.session.type}}</td>
      <td>{{schedule.session.startTime|date('H:ia', -330)}} - {{schedule.session.endTime|date('H:ia', -330)}}</td>
     	<!--Title -->
     	{% if schedule.session.type == 'presentation' || schedule.session.type == 'discussion' || schedule.session.type == 'floor-walk' || schedule.session.type == 'visit-wrap-up' %}
      		<td>{{schedule.session.title}}</td>
        {% elseif schedule.session.type == 'breakfast' || schedule.session.type == 'tea-break' || schedule.session.type == 'lunch' || schedule.session.type == 'dinner' %}
      		<td align="center">{{schedule.session.type}}</td>
      	{% endif %}
      <td>{{schedule.session.location}}</td>     
    </tr>
	{% endfor %}
  </tbody>
</table>

