var targetFrame = parent.document.getElementById('target-frame'),
    targetDocument = targetFrame.contentDocument || targetFrame.contentWindow.contentDocument,
    items = ['aaaa', 'aaab', 'aaaca', 'aaacb', 'aacc'];

$(targetDocument).ready(function(){
    var list = '<ul>';
    for(var i = 0; i < items.length; i++){
        list += '<li>@' + items[i] + '</li>';
    }
    list += '</ul>';
    $(list).insertAfter($('h1', targetDocument));

    var $textarea = $('textarea', targetDocument);
    var $positionIndicator = $('#position', targetDocument);

    // ------------------------------------------------------

    $textarea
        .atwho('setIframe', targetFrame, true)
        .atwho({
            at: "@",
            data: items,
            callbacks: {
                before_reposition: function(offset){
                    $positionIndicator.html('before_reposition; top: ' + offset.top + ', left: ' + offset.left);
                }
            }
        });

    $textarea.caret('pos', 2);

    $textarea
        .focus()
        .atwho('run');
});