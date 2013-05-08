JQuery Uploader List
====================

 jQuery plugin to upload a file queue.

Sponsor
-------

[http://www.cloudware360.com/]

Features
--------

<<<<<<< HEAD
 - Allows upload configurable
   simoultaneos upload(default: 2).
 - Allows added extra data.
 - You can rename file name (default: "file").
 - Automatic mode. (default automatic:true)
 - Customizable css Items.
=======
 - Configurable upload
 - Options for simultaneous upload (default: 2).
 - Allows adding extra data.
 - Allows file rename.
 - Customizable through css.
>>>>>>> 61eea307120ca9d6629c8aaf80eb57bb6d2b17e5

Dependencies
------------

 * HTML5. 
 * [http://jquery.com/]   
 * [http://jqueryui.com/]   optional
 * [http://knockoutjs.com/] optional

Usage
-----

**Example 1: very basic test**

**In HTML:**

    <!-- 1.- Basic Control -->
    <input type="file" id="file" multiple />
    <!-- Basic Control -->
    
    <!-- 2.- Editable Template-->
    <div class="ui-widget-content">
    <div data-bind="template: { name: 'uploaderList', foreach: model }"></div>
    </div>
    <script type="text/html" id="uploaderList">   
    <div class="uploaderListItem">
    <div data-bind="text: file_name" class="uploaderListFileName" style="float:left"></div>
    <div style="float:right">
    <span data-bind="text: loaded"></span>/<span data-bind="text: total"></span>
      </div>
      <div data-bind="updateProgress: progress" style="clear:both">  
      </div></div>
    </script>
    <!--Editable Template-->
    
    <!-- 3.- Include Resources-->
    <link href="js/uploaderList/jquery.uploaderList.css" rel="stylesheet" type="text/css">
    <script src="js/uploaderList/jquery.uploaderList.js" type="text/javascript"></script>
    <!--Include Resources-->

**Into JQuery onload:**

 

    $("#file").uploadlist({url : "http://myserver.com/"});

<<<<<<< HEAD

**Example 1: Manual mode and 5 simoultaneos file upload.**

**In HTML:**

    <!-- 1.- Basic Control -->
    <input type="file" id="file" multiple />
    <!-- Basic Control -->
    
    <!-- 2.- Editable Template-->
    <div class="ui-widget-content">
    <div data-bind="template: { name: 'uploaderList', foreach: model }"></div>
    </div>
    <script type="text/html" id="uploaderList">   
    <div class="uploaderListItem">
    <div data-bind="text: file_name" class="uploaderListFileName" style="float:left"></div>
    <div style="float:right">
    <span data-bind="text: loaded"></span>/<span data-bind="text: total"></span>
      </div>
      <div data-bind="updateProgress: progress" style="clear:both">  
      </div></div>
    </script>
    <!--Editable Template-->

    <!--Start Button-->
    <button id="btn_file" >START</button>
    <!--Start Button-->
    
    <!-- 3.- Include Resources-->
    <link href="js/uploaderList/jquery.uploaderList.css" rel="stylesheet" type="text/css">
    <script src="js/uploaderList/jquery.uploaderList.js" type="text/javascript"></script>
    <!--Include Resources-->

**Into JQuery onload:**

 

    $("#file").uploaderList({
        url : "http://myserver.com/",
        automatic : false,
        simultaneousUploads : 5
    }); 

*That it's all Enjoy.*
=======
* That’s all. Enjoy! *
>>>>>>> 61eea307120ca9d6629c8aaf80eb57bb6d2b17e5

License
-------

***GNU GPLv3.***


