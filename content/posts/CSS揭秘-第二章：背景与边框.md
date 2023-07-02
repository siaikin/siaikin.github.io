---
title: CSS揭秘 第二章：背景与边框
date: 2019-06-04 09:14:23
tags:
  - CSS Secrets(CSS揭秘)
categories:
  - 练习   
toc: true
---
<style type="text/css">
    .m-20 {
        margin: 20px;
    }
    .text_center {
        text-align: center;
        line-height: 1.5em;
    }
    .bg_color {
        width: 200px;
        height: 100px;
        background: greenyellow;
    }
    .dashed_border {
        border: 10px dashed gray;
    }
    .bg_image {
        width: 200px;
        height: 100px;
        background: url("./images/stone-art.jpg");
    }
    .translucent_border {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        border: 10px solid hsla(0, 0%, 100%, 0.5);
        background: white;
        background-clip: padding-box;
    }
    .shadow_border {
        box-shadow: 0   0   0   10px #655,
                    0   0   0   15px deeppink,
                    0   2px 5px 20px rgba(0, 0, 0, .6);
    }
    .outline_border {
        border: 10px solid #655;
        outline: 5px solid deeppink;
    }
    .bg_position {
        background: url("./images/code-pirate.svg") no-repeat #58a right bottom;
        background-position: right 20px bottom 10px;
    }
    .bg_origin {
        padding: 10px;
        background: url("./images/code-pirate.svg") no-repeat #58a bottom right;
        background-origin: content-box;
    }
    .bg_calc {
        background: url("./images/code-pirate.svg") no-repeat #5588aa;
        background-position: calc(100% - 20px) calc(100% - 20px);
    }
    .border_bg {
        background: #655;
        padding: .8em;
    }
    .border_inset {
        background: tan;
        border-radius: .8em;
        padding: 1em;
    }
    .border_single {
        background: tan;
        border-radius: .8em;
        padding: 1em;
        box-shadow: 0 0 0 .4em #655;
        outline: .6em solid #655;
    }
    .stripe_bg {
        background: linear-gradient(#fb3 50%, #58a 0);
        background-size: 100% 30px;
    }
    .vertical_stripe_bg {
        background: linear-gradient(to right, #fb3 50%, #58a 0);
        background-size: 30px 100%;
    }
    .fail_deg_stripe_bg {
        background: linear-gradient(45deg, #fb3 50%, #58a 0);
        background-size: 30px 30px;
    }
    .deg_stripe_bg {
        background: linear-gradient(45deg,
        #fb3 25%, #58a 0, #58a 50%,
        #fb3 0, #fb3 75%, #58a 0);
        background-size: 30px 30px;
    }
    .repeat_deg_stripe_bg {
        background: repeating-linear-gradient(45deg,
        #fb3, #fb3 15px, #58a 0, #58a 30px);
    }
    .tone_on_tone_deg_stripe_bg {
        background: repeating-linear-gradient(30deg,
        hsla(0, 0%, 100%, .1),
        hsla(0, 0%, 100%, .1) 15px,
        transparent 0,
        transparent 30px) #58a;
    }
    .grid_desktop {
        background: linear-gradient(90deg, rgba(200, 0, 0, .5) 50%, transparent 0),
                    linear-gradient(rgba(200, 0, 0, .5) 50%, transparent 0);
        background-size: 30px 30px;
    }
    .grid_desktop_able_adjust {
        background:
                linear-gradient(white 1px, transparent 0),
                linear-gradient(90deg, white 1px, transparent 0),
                #58a;
        background-size: 30px 30px;
    }
    .grid_desktop_able_adjust_double {
        background:
                linear-gradient(white 2px, transparent 0),
                linear-gradient(90deg, white 2px, transparent 0),
                linear-gradient(hsla(0, 0%, 100%, .3) 1px, transparent 0),
                linear-gradient(90deg, hsla(0, 0%, 100%, .3) 1px, transparent 0),
                #58a;
        background-size:
                75px 75px,
                75px 75px,
                15px 15px,
                15px 15px;
    }
    .wave_point {
        background:
            radial-gradient(tan 30%, transparent 0),
            #655;
        background-size: 30px 30px;
    }
    .deg_wave_point {
        background:
                radial-gradient(tan 30%, transparent 0) 0 0,
                radial-gradient(tan 30%, transparent 0) 15px 15px,
                #655;
        background-size: 30px 30px;
    }
    .chessboard {
        background:
                linear-gradient(45deg, rgba(0, 0, 0, .25) 25%, transparent 0, transparent 75%, rgba(0, 0, 0, .25) 0),
                linear-gradient(45deg, rgba(0, 0, 0, .25) 25%, transparent 0, transparent 75%, rgba(0, 0, 0, .25) 0),
                #5588aa;
        background-position: 0 0, 15px 15px;
        background-size: 30px 30px;
    }
</style>


<section>
    <header>半透明边框</header>
    <p>默认情况下，背景会延申到border-box边界（边框下方）</p>
    <div class="bg_color dashed_border m-20">
    </div>
    <h2>半透明边框</h2>
    <div class="bg_image m-20">
        <div class="translucent_border text_center">
            半透明边框
        </div>
    </div>
</section>
<section>
    <header>多重边框</header>
    <p><code>box-shadow</code>方案</p>
    <div class="bg_color shadow_border m-20"></div>
    <p><code>outline</code>方案</p>
    <p>这个方案只适用于双层边框的情况</p>
    <div class="bg_color outline_border m-20"></div>
</section>
<section>
    <header>背景定位</header>
    <p><code>background-position</code>方案</p>
    <div class="bg_color bg_position m-20">
    </div>
    <p><code>background-origin</code>方案</p>
    <div class="bg_color bg_origin m-20">
    </div>
    <p><code>calc()</code>方案</p>
    <div class="bg_color bg_calc m-20"></div>
</section>
<section>
    <header>边框内圆角</header>
    <p>用两个div实现的方案</p>
    <div class="border_bg m-20">
        <div class="border_inset">
            内部div，内角圆
        </div>
    </div>
    <div class="border_single">
        内部div，内角圆
    </div>
</section>
<section>
    <header>条纹背景</header>
    <p>水平条纹</p>
    <div class="bg_color stripe_bg"></div>
    <p>垂直条纹</p>
    <div class="bg_color vertical_stripe_bg"></div>
    <p>失败的斜向条纹</p>
    <div class="bg_color fail_deg_stripe_bg"></div>
    <p>半成功的斜向条纹</p>
    <div class="bg_color deg_stripe_bg"></div>
    <p>完美的斜向条纹</p>
    <div class="bg_color repeat_deg_stripe_bg"></div>
    <p>同色系条纹</p>
    <div class="bg_color tone_on_tone_deg_stripe_bg"></div>
</section>
<section>
    <header>复杂的背景图案</header>
    <p>网格</p>
    <div class="bg_color grid_desktop m-20">
    </div>
    <p>可调整大小且固定分割线的网格</p>
    <div class="bg_color grid_desktop_able_adjust m-20">
    </div>
    <p>可调整大小且固定分割线的重叠网格</p>
    <div class="bg_color grid_desktop_able_adjust_double m-20">
    </div>
    <p>波点</p>
    <div class="bg_color wave_point m-20"></div>
    <p>交错波点</p>
    <div class="bg_color deg_wave_point m-20"></div>
    <p>棋盘</p>
    <div class="bg_color chessboard m-20"></div>
</section>
