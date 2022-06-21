# jjsync
## Synchronizes package.json and package.js

jjsync watches two files ( defaults are package.json and package.jsos ) and makes then sync'ed
## Exaple
You just edited your package.jsos, you commented some task:
```js
{
  name : "jjsync"
  },
  scripts : {
    task1 : "echo task1",
    task2 : "echo task2",
    //task3 : "echo task3"
  }
}
```
then package.json syncs: 
```json
{
  "name" : "jjsync"
  },
  "scripts" : {
    "task1" : "echo task1",
    "task2" : "echo task2"
  }
}
```
## Usage
```bash
cd your-project
## defaults are json=package.json and js=package.jsos
xpm jjsync [ json=json-file ] [ js=js-file ]
```
## Considerations
js-file is created if doesn't exist.

Comments are ignored outside of the main object {}

Because of beta status, ie if something fails, every time a synchronization occurs, a file ( .package.json_history ) gets appended with the latest package.json content. 
