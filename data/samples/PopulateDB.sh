set +v
echo Populating cViz-Test DB


echo
echo Creating User Collection
mongoimport --db cViz-Test --collection users --file jsonFiles/user.json --type json --jsonArray



echo
echo Creating Client Collection
mongoimport --db cViz-Test --collection clients --file jsonFiles/client.json --type json --jsonArray



echo
echo Creating Visit Collection
mongoimport --db cViz-Test --collection visits --file jsonFiles/visit.json --type json --jsonArray



echo
echo Creating Visit_schedule Collection
mongoimport --db cViz-Test --collection visit_schedules --file jsonFiles/visit_schedule.json --type json --jsonArray



echo
echo Creating Visit_schedule Collection
mongoimport --db cViz-Test --collection teasers --file jsonFiles/teaser.json --type json --jsonArray



echo
echo Creating Visit_schedule Collection
mongoimport --db cViz-Test --collection city_facts --file jsonFiles/cityFacts.json --type json --jsonArray



echo
echo Creating Visit_schedule Collection
mongoimport --db cViz-Test --collection fact_sheets --file jsonFiles/factSheets.json --type json --jsonArray



echo
sleep