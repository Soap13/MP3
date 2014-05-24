

   
    //开始和暂停按钮
$(document).ready(function () {




    $("tr:odd").css("background", "#EFDBCC");
    //  $("td:gt(2)").css("display", "none");
    //首先得到音频工具
    var audio = document.getElementById("myMusic");
    //默认自己循环播放
    audio.loop = "loop";
    //提前加载时间的显示
    TimeSpan();
    var now_tr;
    var music = new Array();
    //测试tr遍历td
    $("tr").bind("click", function () {
        //标题这不参加
        if (0 == $(this).index("tr")) {
            return false;
        }
       // if (confirm("确认播放?")) {
            //赋值一边上一首下一首
            now_tr = $(this);
            // alert($(this).html());
            // var name=$(this).find("td").children(0).html();
            var name = $(this).children('td').eq(0).html();
            //判断是否是第一行
            var isth = null;
            if (name != isth) {
                //歌曲名字
                music[0] = name;
                //歌手名字
                music[1] = $(this).children("td").eq(1).html();
                //歌曲路径
                music[2] = $(this).children("td").eq(2).html();
                //图片路径
                music[3] = $(this).children("td").eq(3).html();
                //歌词路径
                music[4] = $(this).children("td").eq(4).html();

                fn_init(music);
            };
        //} else {
//
          //  return false;
  //      }
    });
    $("#MainControl").click(function () {

        //如果播放状态时暂停的
        if (audio.paused) {
            if (audio.src == "") {
                //播放器没有路径还要播放音乐的
                $("tr").eq(1).trigger("click");

            } else {
                $(this).removeClass("MainControl").addClass("StopControl");
                TimeSpan();
                audio.play();
            }

        } else {
            //播放状态时进行的
            $(this).removeClass("StopControl").addClass("MainControl");
            audio.pause();
        }
    });

    $(".Process_style").toggle(function(){
	
	
	$(this).css("backgroundPosition", "-1px -23px");
	
	},function(){
	
	$(this).css("backgroundPosition", "-28px -23px");
	},function(){
	
	$(this).css("backgroundPosition", "-1px -47px");
	});

    //声音如果点击
    $(".VoiceEmp").click(function () {

        if (audio.muted) {

            $(this).css("backgroundPosition", "0px 5px");
            audio.muted = false;

        } else {
            $(this).css("backgroundPosition", "-30px 5px");
            audio.muted = true;
        }

    });


    //音量的控制事件
    $(".VoidProcess_1").click(function (e) {

        var x = $(this).offset().left;
        //获得当前鼠标的位置
        var xx = e.pageX;
        //$("this").css("width", x - xx);
        //  alert(x - xx);
        //alert(xx - x);
        // alert(x + "  " + xx);
        var xxx = -148 + (xx - x - 66);
        $(this).css("backgroundPosition", xxx + "px -25px");
        audio.volume = (xx - x) / 66;
    });

  /*  $(".SongTime").click(function () {
        //  var Musictime = audio.druduration;

        alert(timeDispose(TimeAll()));
        alert(audio.duration);
    });*/

    //下一首歌
    $(".RightControl").click(function () {

        if (now_tr.index("tr") == ($("tr").length - 1)) {
            alert("已经是最后一首了");
            return false;
        }

        now_tr.next().trigger("click");

    });
    $(".LeftControl").click(function () {

        //alert(now_tr.index("tr"));
        if (1 == now_tr.index("tr")) {
            alert("已经是第一首了");
            return false;
        }
        now_tr.prev().trigger("click");
    });


    $("tr").onmouseover(function () {
        $(this).css("backgroundcolor", "red");
    });
});
    function fn_init(musicArray) {
    //首先得到音频工具
    var audio = document.getElementById("myMusic");
    audio.src = musicArray[2];
    //显示信息
    $(".music .Author").css("background", "url(" + musicArray[3] + ") " + " no-repeat");
	 $(".SongName").html(musicArray[0]);
	 $(".SongAuthor").html(musicArray[1]);

	 //播放
	 $("#MainControl").removeClass("MainControl").addClass("StopControl");
	 audio.play();

	}
    //改变选择模式
  // $("tr").each(function(){
	//时间格式化处理


	//时间进度处理程序
	function TimeSpan() {
	  
	    var audio = document.getElementById("myMusic");
	    var ProcessYet = 0;
	    setInterval(function () {
	        var ProcessYet = (audio.currentTime / audio.duration) * 390;
	        $(".Process_1").css("width", ProcessYet);
	        var currentTime = timeDispose(audio.currentTime);
	        var timeAll = timeDispose(TimeAll());
	      //  alert(currentTime + "&nbsp;|&nbsp;" + timeAll);
	        $(".SongTime").html(currentTime + "&nbsp;|&nbsp;" + timeAll);
	    }, 1000);
	}

	//时间处理，因为时间是以为单位算的，所以这边执行格式处理一下
	function timeDispose(number) {
	    var minute = parseInt(number / 60);
	    var second = parseInt(number % 60);
	    minute = minute >= 10 ? minute : "0" + minute;
	    second = second >= 10 ? second : "0" + second;
	    return minute + ":" + second;
	}

	//当前歌曲的总时间
	function TimeAll() {
	    var audio = document.getElementById("myMusic");
	    return audio.duration;
	}