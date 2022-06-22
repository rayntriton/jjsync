# jjsync
## Synchronizes package.json and package.js

```jjsync``` watches two files ( defaults are ```package.json``` and ```package.jsos``` ) and makes them sync'ed
## Example
You just edited your ```package.jsos``` and commented ```task3```:
```js
{
  name : "jjsync",
  scripts : {
    task1 : "echo task1",
    task2 : "echo task2",
    //task3 : "echo task3"
  }
}
```
after saving ```package.json``` syncs: 
```json
{
  "name" : "jjsync",
  "scripts" : {
    "task1" : "echo task1",
    "task2" : "echo task2"
  }
}
```
then you install ```lodash``` library
```bash
yarn add lodash
```
after installation, ```package.json``` gets altered
```json
{
  "name" : "jjsync",
  "scripts" : {
    "task1" : "echo task1",
    "task2" : "echo task2"
  },
  "dependencies" : {
    "lodash" : "^4.17.21"
  }
}
```
then ```package.jsos``` gets sync'ed
```js
{
  name : "jjsync",
  scripts : {
    task1 : "echo task1",
    task2 : "echo task2",
    //task3 : "echo task3"
  },
  dependencies : {
    lodash : "^4.17.21"
  }
}
```
## Usage
```bash
cd your-project
## defaults are json=package.json and js=package.jsos
npx jjsync [ json=json-file ] [ js=js-file ]
```
## Considerations
```js-file``` is created if it doesn't exist.

Comments are ignored outside of the main object {}

Because of beta status, ie if something may fail, every time a synchronization occurs, a file ( .package.json_history ) gets appended with the latest package.json content. 
