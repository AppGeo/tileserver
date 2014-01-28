# Old Saybrook WPCA SharePoint

Adds a property landing page to the OSWPCA SharePoint site which can be
linked from MapGeo.

## Team

* Peter Girard (programmer) [pgirard@appgeo.com](mailto:pgirard@appgeo.com)

## Infrastructure

* [OSPWCA SharePoint 2013 Site](https://appgeoportal.sharepoint.com/sites/oswpca) - requires account with full privileges

## Development

### HTML

The HTML source code for the **WWMD Property Info** page is in WWMD\_Property\_Info.htm.  To open the page for editing:

* Go to [SitePages/WWMD Property Info.aspx](https://appgeoportal.sharepoint.com/sites/oswpca/SitePages/WWMD%20Property%20Info.aspx)
* Click _Edit_ in the upper-right (make sure there is no query string on URL)

To copy in the script references:

* Hover over the _Script_ web part and click the down-triangle
* Click _Edit Web Part_
* Click _Edit Snippet_ in the web part
* Paste the script references into the _Embed_ window

To copy in the HTML content:

* Click _Edit Source_ in the ribbon
* Skip the first `<div>` - this is the _Script_ web part
* Replace the second major `<div>` with the one from the HTM file 

### Site Assets

The scripts and stylesheet are placed in _Site Assets_ area of the site:

* Go to [SiteAssets/Forms/AllItems.aspx](https://appgeoportal.sharepoint.com/sites/oswpca/SiteAssets/Forms/AllItems.aspx)
* Drag each asset file over the _drag files here_ text and drop to replace

### Stylesheet Reference

The stylesheet reference is added to the master page for the site:

* Go to [_layouts/15/ChangeSiteMasterPage.aspx](https://appgeoportal.sharepoint.com/sites/oswpca/_layouts/15/ChangeSiteMasterPage.aspx)
* Click _Alternate CSS URL_ at the bottom
* Select _Specify a CSS File to be used by this site and all sites that inherit from it_
* Paste the server absolute path to the stylesheet in the text box: [/sites/oswpca/SiteAssets/WWMD\_Property\_Info.css](https://appgeoportal.sharepoint.com/sites/oswpca/SiteAssets/WWMD_Property_Info.css)

### Programming

The page uses `jQuery.ajax()` to call [SharePoint's REST API](http://msdn.microsoft.com/en-us/library/office/fp142380.aspx).  By
default this API returns `application/atom+xml`.  An `Accepts` header is added to the AJAX requests to return JSON.





