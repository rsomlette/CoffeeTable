# CoffeeTable

CoffeeTable is a lightweight content management system written in `node.js` and utilises `MongoDB` as a database. The focus of CoffeeTable is to provide a simple engine to write and host blogs. The functionality of CoffeeTable is to be simple. The UI will be simplistic, and Markdown will be written to write blogs with a WYSIWYG editor on site. 


CoffeeTable is currently still being built and is not in a usable state.

## Installation

* Get the source code from [GitHub](https://github.com/JRIngram/CoffeeTable)
* Install [Node.js](https://nodejs.org/en/)
* Install [MongoDB](https://www.mongodb.com/)
* Edit `config/database.js`
    * Change `dbName` to the appropriate database name
    * Change `dbUrl` to the appropriate URL.
* Move to the `CoffeeTable` directory on your local machine.
* Run `npm i`
* Run `createDB.js`:
    * Move to project root directory in terminal
    * Run `createDB.js`

## Usage
Start MongoDB from terminal:
* `service mongod start`
* `mongo`

Start server:
* Move to project root directory in terminal
* Run `node index.js`
* Open a browser and type `localhost:8080` into the search bar.

## Contributing
Pull requests are welcome.

For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests and documentation as appropriate.

Please ensure that unit tests are written for new features. 

## License
The licence is still being considered and will be updated in future. For now, assume this is released under the [MIT Licence](https://choosealicense.com/licenses/mit/)