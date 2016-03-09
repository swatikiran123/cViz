ECHO OFF
ECHO Populating cViz-Test DB


ECHO:
ECHO Creating User Collection
mongoimport --db cViz-Test --collection users --file jsonFiles\user.json --type json --jsonArray



ECHO:
ECHO Creating User Collection
mongoimport --db cViz-Test --collection lovs --file jsonFiles\lov.json --type json --jsonArray



ECHO:
ECHO Creating User Collection
mongoimport --db cViz-Test --collection groups --file jsonFiles\group.json --type json --jsonArray



ECHO:
PAUSE

