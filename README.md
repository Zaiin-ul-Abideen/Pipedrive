# Pipedrive

**Requirements:**
- Node version v16.17.0

**To Run Project**:
- To install node modules run 'npm run install:all' in main Pipedrive Directory
- To start project run 'npm start' in main Pipedrive Directory

**Create PipeDrive Deals with React-Form**

- To Create a Deal, fill the requirements.

- Title Input Field: Give Name to your deal. e.g:"My First Deal"
- Value Input Field: The value of the deal. If omitted, value will be set to 0. e.g:"100"
- Currency Input Field: The currency of the deal. Accepts a 3-character currency code. e.g: "USD", "PKR"
- Person Id Input Field: The ID of a person which this deal will be linked to. e.g In this case the person ID is "43"
- Success probability Input Field: The success probability percentage of the deal. e.g "77"
- Expected Close Date Input Field: The expected close date of the deal
- Status Selector: Select the status of your deal
- Organization Name Selector: The Name of an organization which this deal will be linked to. There are two organizations already created. The deal can belong to anyone of them
- User Id Selector: The Name of the user which will be the owner of the created deal. There is also a User Created which can be selected using dropdown
- Press "CREATE DEAL" Button
- A new Deal is created Successfully.


**Create Pipedrive Person with GoogleForm**

Submit "Person" basic info via GoogleForm:

 Fields:
   - Name ( New Person name ) => required*
   
    Optional:
     - Owner ID
     - Organization ID  ( In which Organizaiton you want to add person )
     - Phone 
     - Email

GoogleForm link:  
https://docs.google.com/forms/d/e/1FAIpQLScSGLdhne0RvtCUOTbIoE0B0Whn6p3LWI0K7-n2I3-EkVLnrA/viewform

Googlesheet link:
https://docs.google.com/spreadsheets/d/1ykYOkP_OcDeLjWKj6q2m2CJGsJKD1RGRQ2UFIhTxo2k/edit?resourcekey#gid=908266939

After Submitted:
    Call Rest API to send recent added person from Googlesheet to Pipedrive
    
    POST http://localhost:3000/dev/persons/googlesheet          It will "Add" recent Person from Googlesheet to Pipedrive Persons
    
    GET http://localhost:3000/dev/persons                       Get All People and verify recently added Person






**Rest APIs for:**
- Deals
- Organizations
- People

Deals:

    POST http://localhost:3000/dev/deals                              Create New Deal

        Required body to make a deal:
            "title":"New Deal"     Required*
            "value":"150"          The value of the deal. If omitted, value will be set to 0.
            "currency":"USD"       The currency of the deal. Accepts a 3-character currency code
            "user_id":15273529     The ID of the user which will be the owner of the created deal.
            "person_id":48         The ID of a person which this deal will be linked to.
            "org_id":27            The ID of an organization which this deal will be linked to.
            "pipeline_id":1        The ID of the pipeline this deal will be added to
            "status":" "           open, won, lost, deleted
            "expected_close_date":"YYYY-MM-DD"  The expected close date of the deal.
            "probability": 70      The success probability percentage of the deal
            "add_time": "MM-DD-YYYY HH:MM:SS"   The optional creation date & time of the deal in UTC

        Sample JSON Body:
        {
            "title": "Custom Deal 4",
            "value": "56",
            "currency": "PKR",
            "user_id": 15273529,
            "person_id": 32,
            "org_id": 1,
            "pipeline_id": 1,
            "status": "Open",
            "expected_close_date": "2022-12-25",
            "probability": 79
        }


    GET http://localhost:3000/dev/deals                               Get All Deals

    GET http://localhost:3000/dev/deals/7                             Get Deal By ID

    PUT http://localhost:3000/dev/deals/8                             Update Deal By ID

    DELETE http://localhost:3000/dev/deals/7                          Delete Deal By ID

    POST http://localhost:3000/dev/deals/remove                       Delete multiple Deals give required ID's e.g. "16,18"

        Required body to remove deals:
            "ids":"16,18"

Organizations:

    POST http://localhost:3000/dev/organizations                      Create New Organization

        Required body to Create an Organization:
            "name":"Organization1"      Required
            "owner_id": 15273529        The ID of the user who will be marked as the owner of this organization
            "visible_to":"1" or "3"     The visibility of the organization "1 Owner & followers", "3 Entire company"

        Sample JSON Body:
        {
            "name": "Organization 8",
            "owner_id": 15273529,
            "visible_to": "3"
        }

    GET http://localhost:3000/dev/organizations                       Get All Organizations

    GET http://localhost:3000/dev/organizations/25                    Get Organization By ID

    DELETE http://localhost:3000/dev/organizations/26                 Delete Organization By ID

    POST http://localhost:3000/dev/organizations/remove               Delete multiple Organizations give required ID's e.g. "16,18"

        Required body to remove organizations:
            "ids":"16,18"


People:

    POST http://localhost:3000/dev/persons                            Create New Person

        Required body to create a Person
            "name": "Person-1"              Required
            "owner_id": 15273529           The ID of the user who will be marked as the owner of this person`
            "org_id": 25                   The ID of the organization this person will belong to`
            "email": "person1@mail.com"    List of email data related to the person`
            "phone":                       List of phone data related to the person`
            "marketing_status":            (no_consent, unsubscribed, subscribed, archived)

        Sample JSON Body:
        {
             "name": "person5",
             "owner_id": 15273529,
             "org_id": 3,
             "email": [
                 {
                     "value": "person4@gmail.com"
                 }
              ],
            "phone": [
                 {
                     "value": "090078601"
                 }
              ],
            "marketing_status": "in-progress"
        }


    GET http://localhost:3000/dev/persons                             To Get All People

Note: Please check schemas for required fields while Creating & Updating data

