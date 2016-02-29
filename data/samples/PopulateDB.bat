ECHO OFF
ECHO Populating cViz-Test DB


ECHO:
ECHO Creating User Collection
mongoimport --db cViz-Test --collection users --file Json's\user.json --type json --jsonArray



ECHO:
ECHO Creating Client Collection
mongoimport --db cViz-Test --collection clients --file Json's\client.json --type json --jsonArray



ECHO:
ECHO Creating Visit Collection
mongoimport --db cViz-Test --collection visits --file Json's\visit.json --type json --jsonArray



ECHO:
ECHO Creating Visit_schedule Collection
mongoimport --db cViz-Test --collection visit_schedules --file Json's\visit_schedule.json --type json --jsonArray

ECHO:
PAUSE