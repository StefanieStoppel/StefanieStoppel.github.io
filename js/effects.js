/** This creates the hover effect on the logo using velocity.js **/
$(document).ready(function(){

    var WIDTH_SMARTPHONE = 479,
        WIDTH_TABLET = 664,
        WIDTH_DESKTOP = 890;

    var windowWidth = $(window).innerWidth(),
        main = $(".main"),
        $logoBrid = $(".logo--brid"),
        amountDots = $(".dot").length;
    // This attribute is used for checking whether an animation is running already.
    // If it is, stop and reverse the current animation.
    $logoBrid.data({ animating: false });

    function animateBrid(options) {
        if(windowWidth > WIDTH_TABLET) {
            if ($logoBrid.data("animating") === true){
                $logoBrid.velocity("stop", true).velocity("reverse",{ duration:300});
                $logoBrid.data({animating:false});

            } else {
                $logoBrid.velocity({
                    left: options.left,
                    opacity: options.opacity
                }, {
                    duration: 300,
                    easing: [ 250, 15 ],
                    begin: function(){
                        $logoBrid.data({animating:true});
                    },
                    complete: function(){
                        $logoBrid.data({animating:false});
                    }
                });
            }
        }
    }

    main.hover(
        function(){
            animateBrid({left: "-5%", opacity: 1});
        }, function() {
            animateBrid({left: "-100%", opacity: 0});
        }
    );

    function countdownAndAnimateBrid(milliseconds) {
        setTimeout(function(){
            animateBrid({left: "-5%", opacity: 1});
        }, milliseconds);
    }
    countdownAndAnimateBrid(700);

    function animateDot(idx) {
        if(idx <= 5){
            setTimeout(function() {
                $(".dot:nth-child(" + idx + ")").velocity({
                        translateY: "30px",
                        opacity: 0.1
                    }, {
                        loop: true,
                        easing: "swing",
                        delay: 56.66,
                        begin: animateDot(idx + 1)
                    }
                );
            }, 130);
        }
    }
    animateDot(0);

    $(window).resize(function(){
        windowWidth = $(window).innerWidth();
        if(windowWidth < WIDTH_TABLET) {
            $logoBrid.css({left: "-5%", opacity: 1})
        }
    });
});

