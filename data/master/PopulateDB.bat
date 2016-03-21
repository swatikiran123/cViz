ECHO OFF
ECHO Initializing cViz-Test DB with master data...

ECHO:
ECHO "Importing master group structure..."
mongoimport --db cViz-Test --collection groups --file jsonFiles\group.json --type json --jsonArray

ECHO:
ECHO "Importing Admin user..."
mongoimport --db cViz-Test --collection users --file jsonFiles\user.json --type json --jsonArray

ECHO:
ECHO "Importing master List of Values..."
mongoimport --db cViz-Test --collection lovs --file jsonFiles\lov.json --type json --jsonArray


ECHO:
PAUSE
