JQuery Uploader List
====================

 jQuery plugin to upload a file queue.

Sponsor
-------

[http://www.cloudware360.com/]

Features
--------

 - Configurable upload
 - Options for simultaneous upload (default: 2).
 - Allows adding extra data.
 - Allows file rename.
 - Customizable through css.

Dependencies
------------

 * HTML5. 
 * [http://jquery.com/]   
 * [http://jqueryui.com/]	optional
 * [http://knockoutjs.com/]	optional

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

* That’s all. Enjoy! *

License
-------

***GNU GPLv3.***


