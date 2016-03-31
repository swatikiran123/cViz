set +v
echo Populating cViz-Test DB


echo
echo Creating User Collection
mongoimport --db cViz-Test --collection users --file jsonFiles/user.json --type json --jsonArray


echo
echo Creating User Collection
mongoimport --db cViz-Test --collection lovs --file jsonFiles/lov.json --type json --jsonArray


echo
echo Creating User Collection
mongoimport --db cViz-Test --collection groups --file jsonFiles/group.json --type json --jsonArray


echo
sleep