var names = "Jack,Ruth,John";

var jsonfied = {
    names: names.replace( /,$/, "" ).split(",").map(function(name) {
        return {name: name};
    })
};
console.log(jsonfied);
console.log(JSON.stringify(jsonfied));