# Node.js RESTful API

## Entities
There are 3 models in the ORM:
* football club
* players
* doctors
They have the following references:
* 1:N - football club : players   
* 1:N - football club : doctors
* N:N - players : doctors

## Request Methods
The following HTTP Request Methods are supported:
* POST (create)
* GET (read)
* PUT (update field)
* DELETE (delete)

## Request Content-Types
Two content types of requests are supported:
* JSON
* XML

## Request API

### GET
* GET http://host/{entityType} - returns a **list** of existing objects of {entityType}
* GET http://host/{entityType}/{entityId} - returns **info** about the object of {entityType} with {entityId}
Supported entity types:
* clubs
* players
* doctors
Entity ID is an int value.

### JSON
#### POST club
```
{
  "club":"Club Name"
}
```
#### POST player
```
{
  "player":"Player Name",
  "doctor":"Doctor Name",  <-- from 1 to N times
  "club":"Club Name"
}
```
#### POST doctor
```
{
  "doctor":"Doctor Name",
  "player":"Player Name",  <-- from 1 to N
  "club":"Club Name"
}
```
#### PUT club field
```
{
  "field":"club",
  "player":"Player Name",  <-- can be "doctor"
  "newClub":"New Club Name"
}
```
#### PUT player field
```
{
  "field":"player",
  "doctor":"Doctor Name",
  "action":"add",  <-- action can be "delete"
  "player":"Player Name"
}
```
#### PUT doctor field
```
{
  "field":"doctor",
  "player":"Player Name",
  "action":"add",  <-- action can be "delete"
  "doctor":"Doctor Name"
}
```
#### DELETE club
```
{
  "club":"Club Name"
}
```
#### DELETE player
```
{
  "player":"Player Name"
}
```
#### DELETE doctor
```
{
  "doctor":"Doctor Name"
}
```

### XML
#### POST club
```
<post>
  <club>Club Name</club>
</post>
```
#### POST player
```
<post>
  <player>Player Name</player>
  <doctor>Doctor Name</doctor>  <-- from 1 to N
  <club>Club Name</club>
<post>
```
#### POST doctor
```
<post>
  <doctor>Doctor Name</doctor>
  <player>Player Name</player>  <-- from 1 to N
  <club>Club Name</club>
</post>
```
#### PUT club field
```
<put>
  <field>club</field>
  <player>Player Name</player>  <-- can be "doctor"
  <newClub>New Club Name</newClub>
<put>
```
#### PUT player field
```
<put>
  <field>player</field>
  <doctor>Doctor Name</doctor>
  <action>add</action>  <-- action can be "delete"
  <player>Player Name</player>
</put>
```
#### PUT doctor field
```
<put>
  <field>doctor</field>
  <player>Player Name</player>
  <action>add</action>  <-- action can be "delete"
  <doctor>Doctor Name</doctor>
</put>
```
#### DELETE club
```
<delete>
  <club>Club Name</club>
</delete>
```
#### DELETE player
```
<delete>
  <player>Player Name</player>
</delete>
```
#### DELETE doctor
```
<delete>
  <doctor>Doctor Name</doctor>
</delete>
```
