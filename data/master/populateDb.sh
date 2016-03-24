
echo Initializing cViz-Test DB with master data...

echo
echo "Importing master group structure..."
mongoimport --db cViz-Test --collection groups --file jsonFiles\group.json --type json --jsonArray

echo
echo "Importing Admin user..."
mongoimport --db cViz-Test --collection users --file jsonFiles\user.json --type json --jsonArray

echo
echo "Importing master List of Values..."
mongoimport --db cViz-Test --collection lovs --file jsonFiles\lov.json --type json --jsonArray


echo
sleep
