set +v
echo Populating cViz-Test DB


echo
echo Creating Users Collection
mongoimport --db cViz-Test --collection users --file jsonFiles/user.json --type json --jsonArray



echo
echo Creating Clients Collection
mongoimport --db cViz-Test --collection clients --file jsonFiles/client.json --type json --jsonArray



echo
echo Creating Visits Collection
mongoimport --db cViz-Test --collection visits --file jsonFiles/visit.json --type json --jsonArray



echo
echo Creating Visit_schedules Collection
mongoimport --db cViz-Test --collection visit_schedules --file jsonFiles/visit_schedule.json --type json --jsonArray



echo
echo Creating Teasers Collection
mongoimport --db cViz-Test --collection teasers --file jsonFiles/teaser.json --type json --jsonArray



echo
echo Creating FactSheets Collection
mongoimport --db cViz-Test --collection fact_sheets --file jsonFiles/factSheet.json --type json --jsonArray


echo
echo Creating Feedback-Defs Collection
mongoimport --db cViz-Test --collection feedbackdefs --file jsonFiles/feedbackDef.json --type json --jsonArray

echo
sleep