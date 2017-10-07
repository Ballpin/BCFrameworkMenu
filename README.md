# Introduction
This script is intended for Business Catalyst partners. 

The purpose of this plugin is to help clients to get menus from framework to work without the need to add classes
through BC Menu system.

# Usage

1. Copy the Default folder from ModuleTemplates/Menu and name it to Bootstrap ()or another name if you prefer). 
2. Remove some code from the files in Bootstrap folder (the folder that you recently copied).

    The files should look something like this...
    
    File: **group.html**
    ```
    <ul>{tag_menuchilditem}</ul>
    ```
    
    File: **container.html**
    ```
    {tag_menugroup}
    ```
    
    File: **childitem.html**
    ```
    <li {tag_menuitemidname_withid} {tag_menuitemcssclass_withclass}><a href="{tag_menuitemurl}">{tag_menuitemlabel}</a>{tag_menugroup}</li>
    ```
3. Copy the script from dist folder, and add it at the bottom of the body tag.
4. Add the following code into your website
   ````
   <nav class="navbar navbar-default">
        <div class="container-fluid">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
                        data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="#">Brand</a>
            </div>
    
            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                {module_menu, version="2", menuId="menuId", moduleTemplateGroup="Bootstrap"}
            </div><!-- /.navbar-collapse -->
        </div><!-- /.container-fluid -->
    </nav>
   ````
5. Then in either of your javascript file or in html template. Add the following code..

    ```
    // Run it with default settings. Default is Click to Toggle Menu.
    <script>const bcmenu = new setBcMenu(BootstrapThreeMenu, '#bs-example-navbar-collapse-1')</script>
    
    // If you want on hover then add true as last argument.
    <script>const bcmenu = new setBcMenu(BootstrapThreeMenu, '#bs-example-navbar-collapse-1', true)</script>
    ```