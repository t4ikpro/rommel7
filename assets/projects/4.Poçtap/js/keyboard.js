function callKeyboard() {
    var keyboard = false;
    $(".closeKey").click(function () {
        $("#container").slideUp("fast", function () {
            keyboard = false;
        })
    })
    $(function () {
        var $write = $(".input-click"),
	        shift = false
        capslock = false;
        $(".input-click").click(function () {
            var offset = $(this).offset();
            var addToTop = $(this).height();
            $write = $(this);
            $("#container").css({ top: offset.top + addToTop + 20, left: 120 });
            $("#container").slideDown("fast", function () {
                keyboard = true;
            });
        });
        $('#keyboard li').click(function () {
            var $this = $(this),
	            character = $this.html(); // If it's a lowercase letter, nothing happens to this variable

            // Shift keys
            if ($this.hasClass('left-shift') || $this.hasClass('right-shift')) {
                $('.letter').toggleClass('uppercase');
                $('.symbol span').toggle();

                shift = (shift === true) ? false : true;
                capslock = false;
                return false;
            }

            // Caps lock
            if ($this.hasClass('capslock')) {
                $('.letter').toggleClass('uppercase');
                capslock = true;
                return false;
            }

            // Delete
            if ($this.hasClass('delete')) {
                var html = $write.val();

                $write.val(html.substr(0, html.length - 1));
                return false;
            }

            // Special characters
            if ($this.hasClass('symbol')) character = $('span:visible', $this).html();
            if ($this.hasClass('space')) character = ' ';
            if ($this.hasClass('tab')) character = "\t";
            if ($this.hasClass('return')) character = "\n";

            // Uppercase letter
            if ($this.hasClass('uppercase')) character = character.toUpperCase();

            // Remove shift once a key is clicked.
            if (shift === true) {
                $('.symbol span').toggle();
                if (capslock === false) $('.letter').toggleClass('uppercase');

                shift = false;
            }

            var lastText = $write.val();
            $write.val(lastText + $write.html() + character);
        });
    });
}

