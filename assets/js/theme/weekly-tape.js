import $ from 'jquery';
let stContent1 = `
<style>
#tapeCounter{
  max-width: 1350px;
  margin: auto;
  width: 100%;
}
.tape-show-columns{
  display: none;

  text-align: right;
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  text-decoration-line: underline;
  color: #000000;
}
.tape-container {
  display: flex;
}
.columnOne {
  width:14.3%;
  flex:1 0 auto;
}
.tape-container1 {
  /* border-radius: 10px; */
  width:100%;

  /* margin: auto; */
  display: grid;
  /* grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr; */
  text-align: center;

      /* How many columns to show. */
      --visible-cols: 6;

/* Gap between columns. */
--col-gap: 0px;

/* How much to show of the next hidden column. You can use this as a hint to show the user there are more scrollable items. Particularly helpful for mobile devices where the scrollbar gets hidden by default.*/
--col-hint: 0px;

/* Whitespace between the slider and the scrollbar. */
--scroller-padding: 0px;

/*  Calculated column size. */
--col-size: calc((100% / var(--visible-cols)) - var(--col-gap) - var(--col-hint));
grid-auto-flow: column;
  grid-template-columns: var(--col-size);
  grid-auto-columns: var(--col-size);
  overflow-x: auto;
  overflow-y: hidden;
  grid-gap: var(--col-gap);
  padding-bottom: var(--scroller-padding);
}

.tape-main-title {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 900;
  font-size: 36px;
  text-transform: uppercase;
  color: #ffffff;
  border-top: 1px solid #C4C4C4;
  border-bottom: 1px solid #C4C4C4;
  border-right: 1px solid #C4C4C4;
  border-left: 1px solid #C4C4C4;
  display : flex;
  align-items : center;
  justify-content : right;
  padding-right: 30px;   
}
.tape-title {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  text-transform: uppercase;
  color: #000000;
  border-bottom: 1px solid #C4C4C4;
  border-right: 1px solid #C4C4C4;
  border-left: 1px solid #C4C4C4;
  display: flex;
  align-items: center;
  justify-content: right;   
  padding-right: 30px;

}


.tape-subtitle {
  display : flex;
  align-items : center;
  justify-content : center;   

  border-top: 1px solid #C4C4C4;
  border-bottom: 1px solid #C4C4C4;
  border-right: 1px solid #C4C4C4;
  height: 175px;
  position: relative;
}
.tape-subtitle-text{
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 24px;
  color: #000000;

}
.tape-text {
  font-family: 'Poppins';
  font-style: normal;
  font-family: 'Poppins';
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  color: #000000;
  border-right: 1px solid #C4C4C4;
  padding-left: 20px;
  border-bottom: 1px solid #C4C4C4;
  display: flex;
  align-items: center;
  justify-content: left;

}
.tape-box{
  border-right: 1px solid #C4C4C4;
  height: 60px;
  display : flex;
  align-items : center;
  justify-content : center;
  border-bottom: 1px solid #C4C4C4;

}
.tape-question {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  display : flex;
  align-items : center;
  justify-content : center;
  color: #000000;
  border-right: 1px solid #C4C4C4;
  height: 60px;
  border-bottom: 1px solid #C4C4C4;

}
.tape-empty{
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  display : flex;
  align-items : center;
  justify-content : center;
  color: #000000;
  border-right: 1px solid #C4C4C4;
  height: 60px;
  border-bottom: 1px solid #C4C4C4;
}
.tape-double{
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: auto;
}
.tape-triple{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin: auto;
}
.tape-button{
  position: absolute;
  top: 5px;
  right: 5px;
}
.tape-header{
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 200;
  font-size: 24px;
  line-height: 36px;
  text-align: left;
  color: #000000;
  padding-top: 4vh;
  padding-bottom: 3vh;
}
.tape-footer{
  height: 6vh;
}
.tape-feature-container{
  display: grid;
  margin: auto;
  max-width: 1350px;
  height: 26px;
}
#tapeRowFour{
  grid-template-columns: 1fr 15fr 17fr;
}
@media(max-width: 420px){
  .tape-new-line{
    display: block !important; 
  }
  
}
@media(max-width: 370px){
  #tapeRowFourImage1{
    max-width: 45px !important;
    max-height: 45px !important;
  }
  #tapeRowFourImage2{
    max-width: 45px !important;
    max-height: 45px !important;
  }
  #tapeRowFour{
    grid-template-columns: 1fr 25fr 17fr !important;
  }
}
@media(max-width: 335px){
  #tapeRowFourImage1{
    max-width: 40px !important;
    max-height: 40px !important;
  }
  #tapeRowFourImage2{
    max-width: 40px !important;
    max-height: 40px !important;
  }
  #tapeRowFour{
    grid-template-columns: 1fr 27fr 17fr !important;
  }
}
@media(max-width: 1210px){
  .tape-mobile-container{
    display: block !important;
  }
  .tape-container{
    display: none !important;
  }
  #tapeShowColumnsContainer{
    display: none !important;
  }

  .tape-footer{
    display: none !important;
  }
}
.tape-mobile-container{
  display: none;
  max-width: 500px;
  margin: auto;
}
@media(max-width: 500px){
  .tape-mobile-container{
    margin-left: 20px;
    margin-right: 20px;
  }
}
.tape-mobile-header{
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  color: #000000;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  text-align: center;
  padding-top: 2vh;
  padding-bottom: 2vh;
}
.tape-mobile-body{
  display: grid;
  grid-template-columns: 1fr;
  margin-left: 3vw;
  margin-right: 3vw;
  margin: auto;
}
.tape-mobile-footer{
  height: 33px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
}
.tape-mobile-content{
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: left;   
  border: 1px solid #C4C4C4;
}
.tape-mobile-pad{
  height: 20px;
}
.tape-mobile-subtitle{
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 600;
  font-size: 13px;
  line-height: 20px;
  color: #000000;
  display: flex;
  align-items: center;
  justify-content: left;  
}
@media(max-width: 330px){
  .tape-mobile-subtitle{
    font-size: 11px;
  }
}
.tape-mobile-box{
  height: 34px;
  width: 34px;
  text-align: center;
  color: white;
  font-weight: 400;
  font-size: 30px;
  line-height: 25px;
  margin: auto;
}
.tape-mobile-split{
  display: grid;
  grid-template-columns: 13fr 2fr;
  margin: auto;
  width: 100%;
}
.tape-mobile-hidden{
  display: none;
  grid-template-columns: 2fr 1fr 1fr 2fr;
  margin: auto;
  width: 100%;
  border-bottom: 1px solid #C4C4C4;
}
.tape-mobile-title{
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 700;
  font-size: 11px;
  line-height: 45px;
  height: 45px;
  text-align: center;
  border-bottom: 1px solid #C4C4C4;
  text-transform: uppercase;
}
.tape-mobile-text{
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 180px;
  padding-left: 2px;
  padding-right: 2px;
  text-align: center;
}
.tape-mobile-question{
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000000;
  height: 135px;
  text-align: center;
}
.tape-mobile-check{
  display: flex;
  align-items: center;
  justify-content: center;
  height: 135px;
}
.tape-mobile-split-2{
  display: grid;  
}
</style>
<div id="columnOne" class="columnOne">
  <div class="tape-main-title" style="height: 175px;"></div>
  <div class="tape-title" style="height: 60px;">Poly</div>
  <div class="tape-title" style="background: none; height: 60px;">Lace</div>
  <div class="tape-title" style="background: none; height: 270px;"><span style="height: 220px">Description</span></div>
  <div class="tape-title" style="height: 102px;"><span style="height: 72px">Comparable</span></div>

</div>
<div class="tape-container1">
  
  <div id="columnTwo">
      <div class="tape-subtitle">
        <div class="tape-subtitle-text">

            <img src="/content/images/marketing/tape/weeklytape1.jpg" style="height: 75px;">
            <!-- <img src="/content/images/marketing/tape/img2.png" style="height: 75px;"> -->

          <div>Vapon Topstick<br/>Plus</div>
        </div>   
        <button id="TB1" class="tape-button" onclick="hideColumn(b)"><img src="/content/images/marketing/tape/close.png"></button>
      </div>
      <div class="tape-box"><img src="/content/images/marketing/tape/checkmark.png"></div>
      <div class="tape-question">No</div>
      <div class="tape-text" style="height: 270px">
        <ul style="text-align: left; margin-bottom: 0; margin-left: 10px; height: 220px; width: 95%;">
        <li >Lasts: 1-2 weeks</li>
        <li>Clear</li>
        </ul>
      </div>
  
      <div class="tape-empty" style="border-right: 1px solid #C4C4C4;height: 102px" id = "col7E">No Glue</div>

  
    
    </div>
    <div id="columnThree">
      <div class="tape-subtitle">
        <div class="tape-subtitle-text">
          <img src="/content/images/marketing/tape/weeklytape2.jpg" style="height: 75px;">
          <div>Vapon LACEFX</div>
        </div>     
        <button id="TB2" class="tape-button" onclick="hideColumn(c)"><img src="/content/images/marketing/tape/close.png"></button>
      </div>
      <div class="tape-box"><img src="/content/images/marketing/tape/checkmark.png"></div>
      <div class="tape-question"><img src="/content/images/marketing/tape/checkmark.png"></div>
      <div class="tape-text" style="height: 270px">
        <ul style="text-align: left; margin-bottom: 0; margin-left: 10px; height: 220px; width: 95%;">
          <li>Lasts: 1-2 weeks</li>
          <li>Clear</li>
          <li>A Favorite with many lace front users</li>
        </ul>
      </div>
   
      <div class="tape-empty" style="border-right: 1px solid #C4C4C4;height: 102px" id = "col7E">--</div>

  
    </div>
    <div id="columnFour">
      <div class="tape-subtitle">
        <div class="tape-subtitle-text">
          <div class="tape-double">
            <img src="/content/images/marketing/tape/weeklytape3.jpg" style="height: 75px;">
            <img src="/content/images/marketing/tape/weeklytape4.jpg" style="height: 75px;">
          </div>
          <div>MAX Matrix Lace Tape<br/>(Strips only)</div>
        </div>
        <button id="TB3" class="tape-button" onclick="hideColumn(d)"><img src="/content/images/marketing/tape/close.png"></button>
      </div>
      <div class="tape-box"><img src="/content/images/marketing/tape/checkmark.png"></div>
      <div class="tape-question"><img src="/content/images/marketing/tape/checkmark.png">(Recommended)</div>
      <div class="tape-text" style="height: 270px">
        <ul style="text-align: left; margin-bottom: 0; margin-left: 10px; height: 220px; width: 95%;">
          <li>Lasts: 1-2 weeks</li>
          <li>Waterproof</li>
          <li>Amazing Special Effects</li>
          <li>Theatrical and</li>
          <li>Stage Hair Goods</li>
        </ul>
      </div>
  
      <div class="tape-empty" style="border-right: 1px solid #C4C4C4;height: 102px" id = "col7E">--</div>

  
    </div>
    <div id="columnFive">
      
      <div class="tape-subtitle">
        <div class="tape-subtitle-text">
          <div class="tape-double">
            <img src="/content/images/marketing/tape/weeklytape5.jpg" style="height: 75px;">
            <img src="/content/images/marketing/tape/weeklytape6.jpg" style="height: 75px;">
          </div>
          <div>Brown Liner<br/>(Rolls & Strips)</div>
        </div>
        <button id="TB4" class="tape-button" onclick="hideColumn(e)"><img src="/content/images/marketing/tape/close.png"></button>
  
      </div>
      <div class="tape-box"><img src="/content/images/marketing/tape/checkmark.png"></div>
      <div class="tape-question">No</div>
      <div class="tape-text" style="height: 270px">
        <ul style="text-align: left; margin-bottom: 0; margin-left: 10px; height: 220px; width: 95%;">
          <li>Lasts: 1-2 weeks</li>
          <li>Creamy color</li>
          <li>Cloth tape & thick</li>
          <li>Very gooey</li>
        </ul>
      </div>
  
      <div class="tape-empty" style="border-right: 1px solid #C4C4C4;height: 102px" id = "col7E">--</div>

  
    </div>
    <div id="columnSix">
      <div class="tape-subtitle">
        <div class="tape-subtitle-text">
          <div class="tape-triple">
            <img src="/content/images/marketing/tape/weeklytape7.jpg" style="height: 75px;">
            <img src="/content/images/marketing/tape/weeklytape8.jpg" style="height: 75px;">
            <img src="/content/images/marketing/tape/weeklytape9.jpg" style="height: 75px;">
          </div>
          <div>Blue Tape<br/>(Rolls & Strips)</div>
        </div>   
        <button id="TB5" class="tape-button" onclick="hideColumn(f)"><img src="/content/images/marketing/tape/close.png"></button>
  
      </div>
      <div class="tape-box"><img src="/content/images/marketing/tape/checkmark.png"></div>
      <div class="tape-question"><img src="/content/images/marketing/tape/checkmark.png"></div>
      <div class="tape-text" style="height: 270px">
        <ul style="text-align: left; margin-bottom: 0; margin-left: 10px; height: 220px; width: 95%;">
          <li>Lasts: 1-3 weeks</li>
          <li>Clear - dull finish</li>
          <li>Very strong hold</li>
          <li>Easy melt, gets gooey</li>
        </ul>
      </div>
  

      <div class="tape-empty" style="border-right: 1px solid #C4C4C4;height: 102px" id = "col7E">
        Our hairstylist likes the most for lace system
      </div>

  
    </div>
    <div id="columnSeven" >
      <div class="tape-subtitle" style="border-right: 1px solid #C4C4C4;">
        <div class="tape-subtitle-text">
          <img src="/content/images/marketing/tape/weeklytape10.jpg" style="height: 75px;">
          <div>Duo tac tape<br/>(Strips Only)</div>
        </div>  
        <button id="TB6" class="tape-button" onclick="hideColumn(g)"><img src="/content/images/marketing/tape/close.png"></button>
      </div>
      <div class="tape-box" style="border-right: 1px solid #C4C4C4;"><img src="/content/images/marketing/tape/checkmark.png"></div>
      <div class="tape-box" style="border-right: 1px solid #C4C4C4;"><img src="/content/images/marketing/tape/checkmark.png"></div>
      <div class="tape-text"style="height: 270px"  style="border-right: 1px solid #C4C4C4;">
        <ul style="text-align: left; margin-bottom: 0; margin-left: 10px; height: 220px; width: 95%;">
          <li>Lasts: 2-3weeks</li>
          <li>Clear - dull finished</li>
          <li>Contains Red & blue tape</li>
          <li>Easy clean</li>
        </ul>
      </div>
    
      <div class="tape-empty" style="border-right: 1px solid #C4C4C4;height: 102px" id = "col7E">--</div>
  
    </div>
    <div id="columnEight" >
      <div class="tape-subtitle" style="border-right: 1px solid #C4C4C4;">
        <div class="tape-subtitle-text">
          <div class="tape-double">
            <img src="/content/images/marketing/tape/weeklytape11.jpg" style="height: 75px;">
            <img src="/content/images/marketing/tape/weeklytape12.jpg" style="height: 75px;">
          </div>
          <div>No Glue<br/>(Strips Only)</div>
        </div>  
        <button id="TB6" class="tape-button" onclick="hideColumn(h)"><img src="/content/images/marketing/tape/close.png"></button>
      </div>
      <div class="tape-box" style="border-right: 1px solid #C4C4C4;"><img src="/content/images/marketing/tape/checkmark.png"></div>
      <div class="tape-box" style="border-right: 1px solid #C4C4C4;"><img src="/content/images/marketing/tape/checkmark.png"></div>
      <div class="tape-text"style="height: 270px"  style="border-right: 1px solid #C4C4C4;">
        <ul style="text-align: left; margin-bottom: 0; margin-left: 10px; height: 220px; width: 95%;">
          <li>Lasts: 1-2 weeks</li>
          <li>Dull shine and matte finish</li>
          <li>Easy clean</li>
        </ul>
      </div>
    
      <div class="tape-empty" style="border-right: 1px solid #C4C4C4;height: 102px" id = "col7E">Vapon Topstick plus</div>
  
    </div>
    <div id="columnNine" >
      <div class="tape-subtitle" style="border-right: 1px solid #C4C4C4;">
        <div class="tape-subtitle-text">
          <div class="tape-double">
            <img src="/content/images/marketing/tape/weeklytape13.jpg" style="height: 75px;">
            <img src="/content/images/marketing/tape/weeklytape14.jpg" style="height: 75px;">
          </div>
          <div>No Shine<br/>(Rolls & Strips)</div>
        </div>  
        <button id="TB6" class="tape-button" onclick="hideColumn(i)"><img src="/content/images/marketing/tape/close.png"></button>
      </div>
      <div class="tape-box" style="border-right: 1px solid #C4C4C4;"><img src="/content/images/marketing/tape/checkmark.png"></div>
      <div class="tape-box" style="border-right: 1px solid #C4C4C4;"><img src="/content/images/marketing/tape/checkmark.png"></div>
      <div class="tape-text"style="height: 270px"  style="border-right: 1px solid #C4C4C4;">
        <ul style="text-align: left; margin-bottom: 0; margin-left: 10px; height: 220px; width: 95%;">
          <li>Lasts: 2-4 weeks</li>
          <li>Clear- dull finish</li>
          <li>Strong hold</li>
        </ul>
      </div>
    
      <div class="tape-empty" style="border-right: 1px solid #C4C4C4;height: 102px" id = "col7E">--</div>
  
    </div>
    <div id="columnTen" >
      <div class="tape-subtitle" style="border-right: 1px solid #C4C4C4;">
        <div class="tape-subtitle-text">
          <div class="tape-double">
            <img src="/content/images/marketing/tape/weeklytape15.jpg" style="height: 75px;">
            <img src="/content/images/marketing/tape/weeklytape16.jpg" style="height: 75px;">
          </div>
          <div>MAX Prodigy (Rolls)<br/>(Rolls)</div>
        </div>  
        <button id="TB6" class="tape-button" onclick="hideColumn(j)"><img src="/content/images/marketing/tape/close.png"></button>
      </div>
      <div class="tape-box" style="border-right: 1px solid #C4C4C4;"><img src="/content/images/marketing/tape/checkmark.png"></div>
      <div class="tape-box" style="border-right: 1px solid #C4C4C4;"><img src="/content/images/marketing/tape/checkmark.png"></div>
      <div class="tape-text"style="height: 270px"  style="border-right: 1px solid #C4C4C4;">
        <ul style="text-align: left; margin-bottom: 0; margin-left: 10px; height: 220px; width: 95%;">
          <li>Lasts: 2-4 weeks</li>
          <li>No shine, no sheen</li>
          <li>Premiium product</li>
          <li>Stronger, holds longer, waterproof, hypoallergenic</li>
        </ul>
      </div>
    
      <div class="tape-empty" style="border-right: 1px solid #C4C4C4;height: 102px" id = "col7E">--</div>
  
    </div>
    <div id="columnEleven" >
      <div class="tape-subtitle" style="border-right: 1px solid #C4C4C4;">
        <div class="tape-subtitle-text">
          <img src="/content/images/marketing/tape/weeklytape17.jpg" style="height: 75px;">
          <div>Walker Tape<br/>Pro-Flex ll Tape</div>
        </div>  
        <button id="TB6" class="tape-button" onclick="hideColumn(k)"><img src="/content/images/marketing/tape/close.png"></button>
      </div>
      <div class="tape-box" style="border-right: 1px solid #C4C4C4;"><img src="/content/images/marketing/tape/checkmark.png"></div>
      <div class="tape-box" style="border-right: 1px solid #C4C4C4;">No</div>
      <div class="tape-text"style="height: 270px"  style="border-right: 1px solid #C4C4C4;">
        <ul style="text-align: left; margin-bottom: 0; margin-left: 10px; height: 220px; width: 95%;">
          <li>Lasts: 2-4 days</li>
          <li>Clear</li>
          <li>Most water resistant</li>
          <li>Strong hold, easy removal</li>
        </ul>
      </div>
    
      <div class="tape-empty" style="border-right: 1px solid #C4C4C4;height: 102px" id = "col7E">--</div>
  
    </div>
</div>
<script>
  var b = "columnTwo";
var c = "columnThree";
var d = "columnFour";
var e = "columnFive";
var f = "columnSix";
var g = "columnSeven";
var h = "columnEight";
var i = "columnNine";
var j = "columnTen";
var k = "columnEleven";

counter = 0;
function hideColumn(n){
  document.getElementById(n).style.display = "none";
  document.getElementById("tapeShowColumns").style.display = "block";
  counter += 1;
  var total = 10 - counter;

  if(counter == 1){
    document.getElementById("tapeContainer").style.gridTemplateColumns="5fr 6fr 6fr 6fr 6fr 6fr ";
  }
  else if(counter == 2){
    document.getElementById("tapeContainer").style.gridTemplateColumns="2fr 3fr 3fr 3fr 3fr";
  }
  else if(counter == 3){
    document.getElementById("tapeContainer").style.gridTemplateColumns="1fr 2fr 2fr 2fr";

  } 
  else if(counter == 4){
    document.getElementById("tapeContainer").style.gridTemplateColumns="1fr 3fr 3fr";
    var elements = document.getElementsByClassName('tape-button');
    for(var i=0; i<elements.length; i++) { 
      elements[i].style.display='none';
    }
  } 
  else if(counter == 5){
    document.getElementById("tapeContainer").style.gridTemplateColumns="1fr 3fr 3fr";
    
  } 
 
}

function showColumns(){

document.getElementById("tapeShowColumns").style.display="none";
document.getElementById("tapeContainer").style.gridTemplateColumns="10fr 10fr 10fr 10fr 10fr 10fr 10fr ";
document.getElementById("columnTwo").style.display = "grid";
document.getElementById("columnThree").style.display = "grid";
document.getElementById("columnFour").style.display = "grid";
document.getElementById("columnFive").style.display = "grid";
document.getElementById("columnSix").style.display = "grid";
document.getElementById("columnSeven").style.display = "grid";
document.getElementById("columnEight").style.display = "grid";
document.getElementById("columnNine").style.display = "grid";
document.getElementById("columnTen").style.display = "grid";
document.getElementById("columnEleven").style.display = "grid";
counter = 0;
var elements = document.getElementsByClassName('tape-button');
  for(var i=0; i<elements.length; i++) { 
    elements[i].style.display='block';
  }
}
// var i1 = "itemOne";
// var i2 = "itemTwo";
// var i3 = "itemThree";
// var i4 = "itemFour";
// var i5 = "itemFive";
// var i6 = "itemSix";
// var i7 = "itemSeven";
// var i8 = "itemEight";
// var i9 = "itemNine";
// var i10 = "itemTen";


// var c1 = "contentOne";
// var c2 = "contentTwo";
// var c3 = "contentThree";
// var c4 = "contentFour";
// var c5 = "contentFive";
// var c6 = "contentSix";
// var c7 = "contentSeven";
// var c8 = "contentEight";
// var c9 = "contentNine";
// var c10 = "contentTen";

// var b1 = "buttonOne";
// var b2 = "buttonTwo";
// var b3 = "buttonThree";
// var b4 = "buttonFour";
// var b5 = "buttonFive";
// var b6 = "buttonSix";
// var b7 = "buttonSeven";
// var b8 = "buttonEight";
// var b9 = "buttonNine";
// var b10 = "buttonTen";

// var br1 = "buttonOneReveal";
// var br2 = "buttonTwoReveal";
// var br3 = "buttonThreeReveal";
// var br4 = "buttonFourReveal";
// var br5 = "buttonFiveReveal";
// var br6 = "buttonSixReveal";
// var br7 = "buttonSevenReveal";
// var br8 = "buttonEightReveal";
// var br9 = "buttonNineReveal";
// var br10 = "buttonTenReveal";

function revealButton(a,b,c,d){
    document.getElementById(a).style.display="grid";
    document.getElementById(b).style.display="none";
    document.getElementById(c).style.display="grid";

}
function hideButton(a,b,c,d){

    document.getElementById(a).style.display="none";
    document.getElementById(b).style.display="grid";
    document.getElementById(c).style.display="none";

}<\/script>

`
let stContent3 = `<div class='tape-mobile-container'>
<div class="tape-mobile-top"id="tape-target"></div>
  <div class="tape-mobile-bottom"id="tape-target-2"></div>

  <div class="tape-mobile-body">
    <div id="itemOne">
      <div class="tape-mobile-content">
          <div class="tape-mobile-split">
            <div class="tape-mobile-split-2" style="grid-template-columns: 1fr 17fr 20fr">
              <div class="tape-mobile-subtitle" style="margin-left: 2vw;"><li></li></div>
              <div class="tape-mobile-subtitle">Vapon Topstick Plus</div>
              <div style="text-align: right"><img class="tape-mobile-img" style="max-width: 58px; max-height: 58px;" src="/content/images/marketing/tape/weeklytape1.jpg"></div>
            </div>
            <button id="buttonOne" class="tape-mobile-box" style="padding: 0" onclick="revealButton(c1,b1,br1,i1)"><img src="/content/images/marketing/tape/plus.png"></button>
            <button id="buttonOneReveal" class="tape-mobile-box" style="padding: 0;display: none" onclick="hideButton(c1,b1,br1,i1)"><img src="/content/images/marketing/tape/minus.png"></button>

          </div>
      </div>
      <div id="contentOne" class="tape-mobile-hidden">
        <div style="border-left: 1px solid #C4C4C4; border-right: 1px solid #C4C4C4;">
          <div class="tape-mobile-title">Description</div>
          <div class="tape-mobile-text">Last: 1-2 weeks<br/><br/>Clear<br/><br/></div>
        </div>

        <div style="border-right: 1px solid #C4C4C4;">
          <div class="tape-mobile-title">Poly</div>
          <div class="tape-mobile-check"><img src="/content/images/marketing/tape/checkmark.png"></div>
        </div>

        <div>
          <div class="tape-mobile-title">Lace</div>
          <div class="tape-mobile-question">No</div>
        </div>

        <div style="border-left: 1px solid #C4C4C4; border-right: 1px solid #C4C4C4;">
          <div class="tape-mobile-title">Comparable</div>
          <div class="tape-mobile-text">No Glue</div>

        </div>
      </div>
      <div class="tape-mobile-pad"></div>
    </div>

    <div id="itemTwo">
      <div class="tape-mobile-content">
        <div class="tape-mobile-split">
          <div class="tape-mobile-split-2" style="grid-template-columns: 1fr 25fr 10fr">
            <div class="tape-mobile-subtitle" style="margin-left: 2vw;"><li></li></div>
            <div class="tape-mobile-subtitle">Vapon LACEFX</div>
            <div style="text-align: right"><img class="tape-mobile-img" style="max-width: 75px; max-height: 60px;" src="/content/images/marketing/tape/weeklytape2.jpg"></div>
          </div>
          <button id="buttonTwo" class="tape-mobile-box" style="padding: 0" onclick="revealButton(c2,b2,br2,i2)"><img src="/content/images/marketing/tape/plus.png"></button>
          <button id="buttonTwoReveal" class="tape-mobile-box" style="padding: 0;display: none" onclick="hideButton(c2,b2,br2,i2)"><img src="/content/images/marketing/tape/minus.png"></button>

        </div>
      </div>
      <div id="contentTwo" class="tape-mobile-hidden" >
        <div style="border-left: 1px solid #C4C4C4; border-right: 1px solid #C4C4C4;">
          <div class="tape-mobile-title">Description</div>
          <div class="tape-mobile-text">Last: 1-2 weeks<br/><br/>Clear<br/><br/>a favorite with many lace front users</div>
        </div>

        <div style="border-right: 1px solid #C4C4C4;">
          <div class="tape-mobile-title">Poly</div>
          <div class="tape-mobile-check"><img src="/content/images/marketing/tape/checkmark.png"></div>
        </div>

        <div>
          <div class="tape-mobile-title">Lace</div>
          <div class="tape-mobile-question"><img src="/content/images/marketing/tape/checkmark.png"></div>
        </div>

        <div style="border-left: 1px solid #C4C4C4; border-right: 1px solid #C4C4C4;">
          <div class="tape-mobile-title">Comparable</div>
          <div class="tape-mobile-text">--</div>
        </div>
      </div>
      <div class="tape-mobile-pad"></div>
    </div>

    <div id="itemThree">
      <div class="tape-mobile-content">
        <div class="tape-mobile-split">
          <div class="tape-mobile-split-2" style="grid-template-columns: 1fr 17fr 20fr">
            <div class="tape-mobile-subtitle" style="margin-left: 2vw;"><li></li></div>
            <div class="tape-mobile-subtitle">MAX Matrix Lace Tape<br/>(Strips Only)</div>
            <div style="text-align: right"><img class="tape-mobile-img" style="max-width: 58px; max-height: 58px;" src="/content/images/marketing/tape/weeklytape3.jpg"><img class="tape-mobile-img" style="max-width: 58px; max-height: 58px;" src="/content/images/marketing/tape/weeklytape4.jpg"></div>
          </div>
          <button id="buttonThree" class="tape-mobile-box" style="padding: 0" onclick="revealButton(c3,b3,br3,i3)"><img src="/content/images/marketing/tape/plus.png"></button>
          <button id="buttonThreeReveal" class="tape-mobile-box" style="padding: 0;display: none" onclick="hideButton(c3,b3,br3,i3)"><img src="/content/images/marketing/tape/minus.png"></button>

        </div>
      </div>
      <div id="contentThree" class="tape-mobile-hidden">
        <div style="border-left: 1px solid #C4C4C4; border-right: 1px solid #C4C4C4;">
          <div class="tape-mobile-title">Description</div>
          <div class="tape-mobile-text">Last: 1-2 weeks<br/><br/>Waterproof<br/><br/>Amazing Special Effects<br/><br/>Theatrical and<br/><br/>Stage Hair Goods</div>
        </div>

        <div style="border-right: 1px solid #C4C4C4;">
          <div class="tape-mobile-title">Poly</div>
          <div class="tape-mobile-check"><img src="/content/images/marketing/tape/checkmark.png"></div>

        </div>

        <div>
          <div class="tape-mobile-title">Lace</div>
          <div class="tape-mobile-question"><img src="/content/images/marketing/tape/checkmark.png"></div>
        </div>

        <div style="border-left: 1px solid #C4C4C4; border-right: 1px solid #C4C4C4;">
          <div class="tape-mobile-title">Comparable</div>
          <div class="tape-mobile-text">--</div>

        </div>
      </div>
      <div class="tape-mobile-pad"></div>
    </div>

    <div id="itemFour">
      <div class="tape-mobile-content">
        <div class="tape-mobile-split">
          <div id="tapeRowFour" class="tape-mobile-split-2" >
            <div class="tape-mobile-subtitle" style="margin-left: 2vw;"><li></li></div>
            <div class="tape-mobile-subtitle">Brown liner<br/>(Rolls & Strips)</div>
            <div style="text-align: right"><img id="tapeRowFourImage1"class="tape-mobile-img" style="max-width: 54px; max-height: 54px;" src="/content/images/marketing/tape/weeklytape5.jpg"><img id="tapeRowFourImage2" class="tape-mobile-img" style="max-width: 58px; max-height: 58px;" src="/content/images/marketing/tape/weeklytape6.jpg"></div>
          </div>
          <button id="buttonFour" class="tape-mobile-box" style="padding: 0" onclick="revealButton(c4,b4,br4,i4)"><img src="/content/images/marketing/tape/plus.png"></button>
          <button id="buttonFourReveal" class="tape-mobile-box" style="padding: 0;display: none" onclick="hideButton(c4,b4,br4,i4)"><img src="/content/images/marketing/tape/minus.png"></button>

        </div>
      </div>
      <div id="contentFour" class="tape-mobile-hidden">
        <div style="border-left: 1px solid #C4C4C4; border-right: 1px solid #C4C4C4;">
          <div class="tape-mobile-title">Description</div>
          <div class="tape-mobile-text">Last: 1-2 weeks<br/><br/>Creamy Color<br/><br/>Cloth tape & thick<br/><br/>Very gooey</div>
        </div>

        <div style="border-right: 1px solid #C4C4C4;">
          <div class="tape-mobile-title">Poly</div>
          <div class="tape-mobile-check"><img src="/content/images/marketing/tape/checkmark.png"></div>

        </div>

        <div>
          <div class="tape-mobile-title">Lace</div>
          <div class="tape-mobile-question">No</div>
        </div>

        <div style="border-left: 1px solid #C4C4C4; border-right: 1px solid #C4C4C4;">
          <div class="tape-mobile-title">Comparable</div>
          <div class="tape-mobile-text">--</div>

        </div>
      </div>
      <div class="tape-mobile-pad"></div>
    </div>

    <div id="itemFive">
      <div class="tape-mobile-content">
        <div class="tape-mobile-split">
          <div class="tape-mobile-split-2" style="grid-template-columns: 1fr 10fr 10fr">
            <div class="tape-mobile-subtitle" style="margin-left: 2vw;"><li></li></div>
            <div class="tape-mobile-subtitle">Blue tape<br/>(Rolls & Strips)</div>
            <div style="text-align: right"><img class="tape-mobile-img" style="max-width: 35px; max-height: 35px;" src="/content/images/marketing/tape/weeklytape7.jpg"><img class="tape-mobile-img" style="max-width: 35px; max-height: 35px;" src="/content/images/marketing/tape/weeklytape8.jpg"><img class="tape-mobile-img" style="max-width: 35px; max-height: 35px;" src="/content/images/marketing/tape/weeklytape9.jpg"></div>
          </div>
          <button id="buttonFive" class="tape-mobile-box" style="padding: 0" onclick="revealButton(c5,b5,br5,i5)"><img src="/content/images/marketing/tape/plus.png"></button>
          <button id="buttonFiveReveal" class="tape-mobile-box" style="padding: 0;display: none" onclick="hideButton(c5,b5,br5,i5)"><img src="/content/images/marketing/tape/minus.png"></button>

        </div>
      </div>
      <div id="contentFive" class="tape-mobile-hidden">
        <div style="border-left: 1px solid #C4C4C4; border-right: 1px solid #C4C4C4;">
          <div class="tape-mobile-title">Description</div>
          <div class="tape-mobile-text">Last: 1-3 weeks<br/><br/>Clear- dull finish<br/><br/>Very strong hold<br/><br/>Easy melt, gets gooey</div>
        </div>

        <div style="border-right: 1px solid #C4C4C4;">
          <div class="tape-mobile-title">Poly</div>
          <div class="tape-mobile-check"><img src="/content/images/marketing/tape/checkmark.png"></div>

        </div>

        <div>
          <div class="tape-mobile-title">Lace</div>
          <div class="tape-mobile-question"><img src="/content/images/marketing/tape/checkmark.png"></div>
        </div>

        <div style="border-left: 1px solid #C4C4C4; border-right: 1px solid #C4C4C4;">
          <div class="tape-mobile-title">Comparable</div>
          <div class="tape-mobile-text">Our hairstylist likes the most for lace system</div>

        </div>
      </div>
      <div class="tape-mobile-pad"></div>
    </div>

    <div id="itemSix">
      <div class="tape-mobile-content">
        <div class="tape-mobile-split">
          <div class="tape-mobile-split-2" style="grid-template-columns: 1fr 25fr 10fr">
            <div class="tape-mobile-subtitle" style="margin-left: 2vw;"><li></li></div>
            <div class="tape-mobile-subtitle">Duo tac tape<br/>(Strips only)</div>
            <div style="text-align: right"><img class="tape-mobile-img" style="max-width: 93px; max-height: 51px;" src="/content/images/marketing/tape/weeklytape10.jpg"></div>
          </div>
          <button id="buttonSix" class="tape-mobile-box" style="padding: 0" onclick="revealButton(c6,b6,br6,i6)"><img src="/content/images/marketing/tape/plus.png"></button>
          <button id="buttonSixReveal" class="tape-mobile-box" style="padding: 0;display: none" onclick="hideButton(c6,b6,br6,i6)"><img src="/content/images/marketing/tape/minus.png"></button>

        </div>
      </div>
      <div id="contentSix" class="tape-mobile-hidden">
        <div style="border-left: 1px solid #C4C4C4; border-right: 1px solid #C4C4C4;">
          <div class="tape-mobile-title">Description</div>
          <div class="tape-mobile-text">Last: 2-3 weeks<br/><br/>Clear- dull finish<br/><br/>Contains Red & Blue tape<br/><br/>Easy clean</div>
        </div>

        <div style="border-right: 1px solid #C4C4C4;">
          <div class="tape-mobile-title">Poly</div>
          <div class="tape-mobile-check"><img src="/content/images/marketing/tape/checkmark.png"></div>

        </div>

        <div>
          <div class="tape-mobile-title">Lace</div>
          <div class="tape-mobile-check"><img src="/content/images/marketing/tape/checkmark.png"></div>
        </div>

        <div style="border-left: 1px solid #C4C4C4; border-right: 1px solid #C4C4C4;">
          <div class="tape-mobile-title">Comparable</div>
          <div class="tape-mobile-text">--</div>

        </div>
      </div>
      <div class="tape-mobile-pad"></div>
      
    </div>
    <div id="itemSeven">
      <div class="tape-mobile-content">
        <div class="tape-mobile-split">
          <div class="tape-mobile-split-2" style="grid-template-columns: 1fr 10fr 10fr">
            <div class="tape-mobile-subtitle" style="margin-left: 2vw;"><li></li></div>
            <div class="tape-mobile-subtitle">No Glue<br/>(Strips only)</div>
            <div style="text-align: right"><img class="tape-mobile-img" style="max-width: 93px; max-height: 51px;" src="/content/images/marketing/tape/weeklytape11.jpg"><img class="tape-mobile-img" style="max-width: 93px; max-height: 51px;" src="/content/images/marketing/tape/weeklytape12.jpg"></div>
          </div>
          <button id="buttonSeven" class="tape-mobile-box" style="padding: 0" onclick="revealButton(c7,b7,br7,i7)"><img src="/content/images/marketing/tape/plus.png"></button>
          <button id="buttonSevenReveal" class="tape-mobile-box" style="padding: 0;display: none" onclick="hideButton(c7,b7,br7,i7)"><img src="/content/images/marketing/tape/minus.png"></button>

        </div>
      </div>
      <div id="contentSeven" class="tape-mobile-hidden">
        <div style="border-left: 1px solid #C4C4C4; border-right: 1px solid #C4C4C4;">
          <div class="tape-mobile-title">Description</div>
          <div class="tape-mobile-text">Last: 1-2 weks<br/><br/>dull shine and matte finish<br/><br/>Easy to clean</div>
        </div>

        <div style="border-right: 1px solid #C4C4C4;">
          <div class="tape-mobile-title">Poly</div>
          <div class="tape-mobile-check"><img src="/content/images/marketing/tape/checkmark.png"></div>

        </div>

        <div>
          <div class="tape-mobile-title">Lace</div>
          <div class="tape-mobile-check"><img src="/content/images/marketing/tape/checkmark.png"></div>
        </div>

        <div style="border-left: 1px solid #C4C4C4; border-right: 1px solid #C4C4C4;">
          <div class="tape-mobile-title">Comparable</div>
          <div class="tape-mobile-text">Vapon Topstick Plus</div>

        </div>
      </div>
      <div class="tape-mobile-pad"></div>
      
    </div>
    <div id="itemEight">
      <div class="tape-mobile-content">
        <div class="tape-mobile-split">
          <div class="tape-mobile-split-2" style="grid-template-columns: 1fr 10fr 10fr">
            <div class="tape-mobile-subtitle" style="margin-left: 2vw;"><li></li></div>
            <div class="tape-mobile-subtitle">No Shine<br/>(Rolls & Strips)</div>
            <div style="text-align: right"><img class="tape-mobile-img" style="max-width: 93px; max-height: 51px;" src="/content/images/marketing/tape/weeklytape13.jpg"><img class="tape-mobile-img" style="max-width: 93px; max-height: 51px;" src="/content/images/marketing/tape/weeklytape14.jpg"></div>
          </div>
          <button id="buttonEight" class="tape-mobile-box" style="padding: 0" onclick="revealButton(c8,b8,br8,i8)"><img src="/content/images/marketing/tape/plus.png"></button>
          <button id="buttonEightReveal" class="tape-mobile-box" style="padding: 0;display: none" onclick="hideButton(c8,b8,br8,i8)"><img src="/content/images/marketing/tape/minus.png"></button>

        </div>
      </div>
      <div id="contentEight" class="tape-mobile-hidden">
        <div style="border-left: 1px solid #C4C4C4; border-right: 1px solid #C4C4C4;">
          <div class="tape-mobile-title">Description</div>
          <div class="tape-mobile-text">Last: 2-4 weeks<br/><br/>Clear- dull finish<br/><br/>Strong hold</div>
        </div>

        <div style="border-right: 1px solid #C4C4C4;">
          <div class="tape-mobile-title">Poly</div>
          <div class="tape-mobile-check"><img src="/content/images/marketing/tape/checkmark.png"></div>

        </div>

        <div>
          <div class="tape-mobile-title">Lace</div>
          <div class="tape-mobile-check"><img src="/content/images/marketing/tape/checkmark.png"></div>
        </div>

        <div style="border-left: 1px solid #C4C4C4; border-right: 1px solid #C4C4C4;">
          <div class="tape-mobile-title">Comparable</div>
          <div class="tape-mobile-text">--</div>

        </div>
      </div>
      <div class="tape-mobile-pad"></div>
      
    </div>
    <div id="itemNine">
      <div class="tape-mobile-content">
        <div class="tape-mobile-split">
          <div class="tape-mobile-split-2" style="grid-template-columns: 1fr 10fr 10fr">
            <div class="tape-mobile-subtitle" style="margin-left: 2vw;"><li></li></div>
            <div class="tape-mobile-subtitle">MAX Prodigy(Rolls)</div>
            <div style="text-align: right"><img class="tape-mobile-img" style="max-width: 93px; max-height: 51px;" src="/content/images/marketing/tape/weeklytape15.jpg"><img class="tape-mobile-img" style="max-width: 93px; max-height: 51px;" src="/content/images/marketing/tape/weeklytape16.jpg"></div>
          </div>
          <button id="buttonNine" class="tape-mobile-box" style="padding: 0" onclick="revealButton(c9,b9,br9,i9)"><img src="/content/images/marketing/tape/plus.png"></button>
          <button id="buttonNineReveal" class="tape-mobile-box" style="padding: 0;display: none" onclick="hideButton(c9,b9,br9,i9)"><img src="/content/images/marketing/tape/minus.png"></button>

        </div>
      </div>
      <div id="contentNine" class="tape-mobile-hidden">
        <div style="border-left: 1px solid #C4C4C4; border-right: 1px solid #C4C4C4;">
          <div class="tape-mobile-title">Description</div>
          <div class="tape-mobile-text">Last: 2-4 weeks<br/><br/>No shine, no sheen<br/><br/>Premium product<br/><br/>Stronger, holds longer, waterproof, hypoallergenic</div>
        </div>

        <div style="border-right: 1px solid #C4C4C4;">
          <div class="tape-mobile-title">Poly</div>
          <div class="tape-mobile-check"><img src="/content/images/marketing/tape/checkmark.png"></div>

        </div>

        <div>
          <div class="tape-mobile-title">Lace</div>
          <div class="tape-mobile-check"><img src="/content/images/marketing/tape/checkmark.png"></div>
        </div>

        <div style="border-left: 1px solid #C4C4C4; border-right: 1px solid #C4C4C4;">
          <div class="tape-mobile-title">Comparable</div>
          <div class="tape-mobile-text">--</div>

        </div>
      </div>
      <div class="tape-mobile-pad"></div>
      
    </div>
    <div id="itemTen">
      <div class="tape-mobile-content">
        <div class="tape-mobile-split">
          <div class="tape-mobile-split-2" style="grid-template-columns: 1fr 25fr 10fr">
            <div class="tape-mobile-subtitle" style="margin-left: 2vw;"><li></li></div>
            <div class="tape-mobile-subtitle">Walker Tape Pro-Flex ll Tape</div>
            <div style="text-align: right"><img class="tape-mobile-img" style="max-width: 93px; max-height: 51px;" src="/content/images/marketing/tape/weeklytape17.jpg"></div>
          </div>
          <button id="buttonTen" class="tape-mobile-box" style="padding: 0" onclick="revealButton(c10,b10,br10,i10)"><img src="/content/images/marketing/tape/plus.png"></button>
          <button id="buttonTenReveal" class="tape-mobile-box" style="padding: 0;display: none" onclick="hideButton(c10,b10,br10,i10)"><img src="/content/images/marketing/tape/minus.png"></button>

        </div>
      </div>
      <div id="contentTen" class="tape-mobile-hidden">
        <div style="border-left: 1px solid #C4C4C4; border-right: 1px solid #C4C4C4;">
          <div class="tape-mobile-title">Description</div>
          <div class="tape-mobile-text">Last: 2-4 days<br/><br/>Clear<br/><br/>Most water resistant<br/><br/>Strong hold, easy removal</div>
        </div>

        <div style="border-right: 1px solid #C4C4C4;">
          <div class="tape-mobile-title">Poly</div>
          <div class="tape-mobile-check"><img src="/content/images/marketing/tape/checkmark.png"></div>

        </div>

        <div>
          <div class="tape-mobile-title">Lace</div>
          <div class="tape-mobile-check">No</div>
        </div>

        <div style="border-left: 1px solid #C4C4C4; border-right: 1px solid #C4C4C4;">
          <div class="tape-mobile-title">Comparable</div>
          <div class="tape-mobile-text">--</div>

        </div>
      </div>
      <div class="tape-mobile-pad"></div>
      
    </div>
    </div>`
export default function() {
  const tabHead = $('.st-ann2').data('name')
  if (tabHead === 'Weekly') {
    let d = document.createElement('div');
      $(".st-ann3").empty()
      $(d).addClass('tape-container').attr('id', 'tapeContainer').append(stContent1).appendTo($(".st-ann3"))
      $(".st-ann3").append(stContent3)
}
  $(".tapeTabs-head").on('click', function(n) {
    if (n.target.innerHTML === 'Weekly') {
        let d = document.createElement('div');
          $(".st-ann3").empty()
          $(d).addClass('tape-container').attr('id', 'tapeContainer').append(stContent1).appendTo($(".st-ann3"))
          $(".st-ann3").append(stContent3)
    }
})
}
