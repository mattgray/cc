


/**
Design.project.formatText($(".project_content"));



  formatText: function(node, includeWhitespaceNodes) {
    var c = node.contents();
    var validTags = ['img', 'object', 'video', 'audio', 'iframe', 'div'];
    var pageCache = [];
    var pageCount = 0;
    var textPages = {};
    var newPageFromCache = true;

    c.each(function(key, val) {
      if ($.inArray(getTag(val), validTags) >= 0) {
        // save cache as new page
        if (pageCache.length > 0) {
          textPages[pageCount] = pageCache;
          pageCache = [];
          pageCount++;
        }
      } else {
        if (isValidText(val.data) && val.nodeType != 8) {
          pageCache.push(val);
        }
      }
    });

    // Still some stuff left in cache
    if (pageCache.length > 0) {
      // Check if it needs a new page
      for (var i = 0; i < pageCache.length; i++) {
        if (pageCache[i].nodeType == 8 || pageCache[i].nodeName == "SCRIPT" || pageCache[i].nodeName == "STYLE") {
          // Contains text, create new page
          newPageFromCache = false;
        }
      }

      if (newPageFromCache) {
        // Create new page
        textPages[pageCount] = pageCache;
        pageCache = [];
        pageCount++;
      } else {
        for (var i = 0; i < pageCache.length; i++) {
          // Dump and hide remaining elements
          $(pageCache[i]).hide().appendTo($('.project_footer'));
        }
      }
    }

    $.each(textPages, function(key, arr) {
      var breaks = 0;

      $.each(arr, function(key, el) {
        if (el.nodeName == "BR") {
          breaks++;
        }
      });

      if (breaks < arr.length) {
        var first = arr[0];
        var parent = $('<p />');
        $(first).before(parent);

        $.each(arr, function(key, el) {
          $(el).appendTo(parent);
        });
      } else {
        $.each(arr, function(key, el) {
          $(el).remove();
        });
      }
    });

    function isValidText(txt, strict) {
      if (txt !== undefined) {
        txt = txt.replace(/<!--([\s\S]*?)-->/mig, "");
        txt = txt.replace(/(\r\n|\n|\r|\t| )/gm, "");
        txt = txt.replace(/[^A-Za-z0-9\s!?\.,-\/#!$%\^&\*;:{}=\-_`~()[[\]]/g, "");

        if (txt.length > 0) {
          return true;
        }
      } else {
        if (strict) {
          return false;
        } else {
          return true;
        }
      }

      return false;
    }

    function getTag(el) {
      if (typeof el !== "undefined") {
        var tag = el.tagName;
        if (typeof tag === "undefined") {
          tag = 'text';
        }

        return tag.toLowerCase();
      }
    }
  }

  **/