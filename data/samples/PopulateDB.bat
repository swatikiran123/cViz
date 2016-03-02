ECHO OFF
ECHO Populating cViz-Test DB


ECHO:
ECHO Creating User Collection
mongoimport --db cViz-Test --collection users --file jsonFiles\user.json --type json --jsonArray



ECHO:
ECHO Creating Client Collection
mongoimport --db cViz-Test --collection clients --file jsonFiles\client.json --type json --jsonArray



ECHO:
ECHO Creating Visit Collection
mongoimport --db cViz-Test --collection visits --file jsonFiles\visit.json --type json --jsonArray



ECHO:
ECHO Creating Visit_schedule Collection
mongoimport --db cViz-Test --collection visit_schedules --file jsonFiles\visit_schedule.json --type json --jsonArray

ECHO:
PAUSE
