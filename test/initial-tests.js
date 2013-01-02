/*

this is a simple test file.
Since we cannot load external file yet, tests are very very basic
*/
dump('Initial tests\n');

function assertExists(arg, title) {
    dump(title+" ")
    if (arg) {
        dump("OK\n");
    }
    else
        dump("\t\t-----> FAIL!!!\n");
}

function assertEquals(expected, result, title) {
    dump(title+" ")
    if (expected == result) {
        dump("OK\n");
    }
    else{
        dump("\t\t-----> FAIL!!! given result: "+result+"\n");
    }
}
function assertNotEquals(expected, result, title) {
    dump(title+" ")
    if (expected != result) {
        dump("OK\n");
    }
    else{
        dump("\t\t-----> FAIL!!! given result: "+result+"\n");
    }
}

assertExists(window, "has window object? ");
assertExists(document, "has document object? ");
assertExists(window.document, "has window.document object? ");
assertExists(console, "has console object? ");
assertExists(alert, "has alert object? ");
assertExists(confirm, "has alert object? ");
dump('Message console should be "log ok": ');
console.log('log ok');

assertExists(slimer, "has slimer object? ");
assertExists(phantom, "has phantom object? ");

assertExists(slimer.version, "has slimer.version object? ");

assertEquals("0", slimer.version.major, "slimer has the good major version");
assertEquals("0", slimer.version.minor, "slimer has the good minor version");
assertEquals("3", slimer.version.patch, "slimer has the good patch version");
assertEquals("1", phantom.version.major, "phantom has the good major version");
assertEquals("7", phantom.version.minor, "phantom has the good minor version");
assertEquals("0", phantom.version.patch, "phantom has the good patch version");


var ex = require('requiredexample');
assertExists(ex, "is 'ex' defined? ");
assertEquals("foo", ex.myExample, "value of ex.myExample");
assertEquals(5, ex.myCalcFunc(2), "value of ex.myCalcFunc(2)");

var m = require('a/b');
assertEquals("Laurent", m.identity.firstName, "value of m.identity.firstName");

var fs = require("fs");

var system = require("system");

dump("os.architecture="+system.os.architecture+"\n");
dump("os.name="+system.os.name+"\n");
dump("os.version="+system.os.version+"\n");

dump("\n\n------ check yourself if following values are ok\n")

dump("--- Environment variable:\n")
dump("  HOME="+system.env['HOME']+"\n");
dump("  LOGNAME="+system.env['LOGNAME']+"\n");

dump("--- Command line arguments:\n")
system.args.forEach(function(arg, i){
    dump("   "+i+": "+arg+"\n");
});

dump('\n------ tests on webpage:\n');
var webpage = require("webpage").create();
var url = "http://jelix.org/";
webpage.open(url, function(success){
    assertEquals("success", success, "Webpage testapp loaded");
    assertEquals(url, webpage.url, "browser should have the right url");
    assertNotEquals("", webpage.evaluate(function(prefix){
                    return prefix+document.title;
                }, "title: "), "retrieve title page");
    webpage.close();
    dump('\n------------------- END of tests\n');
    slimer.exit()
})
