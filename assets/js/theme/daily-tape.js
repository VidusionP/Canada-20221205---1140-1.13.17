import $ from 'jquery';

let stContent = `

<div id="tapeContainer" class="tape-container">
  <div id="columnOne">
    <div class="tape-main-title" style="height: 175px;"></div>
    <div class="tape-title" style="height: 60px;">Poly</div>
    <div class="tape-title" style="background: none; height: 60px;">Lace</div>
    <div class="tape-title" style="background: none; height: 170px;"><span style="height: 120px">Description</span></div>
    <div class="tape-title" style="height: 102px;"><span style="height: 72px">Comparable</span></div>

  </div>
  <div id="columnTwo">
    <div class="tape-subtitle">
      <div class="tape-subtitle-text">
        <div class="tape-double">
          <img src="/content/images/marketing/tape/daily1.jpg" style="height: 75px;">
          <img src="/content/images/marketing/tape/daily2.jpg" style="height: 75px;">
        </div>
        <div>3M/1522<br/>(Rolls & Strips)</div>
      </div>   
      <button id="TB1" class="tape-button" onclick="hideColumn(b)"><img src="/content/images/marketing/tape/close.png"></button>
    </div>
    <div class="tape-box"><img src="/content/images/marketing/tape/checkmark.png"></div>
    <div class="tape-question">No</div>
    <div class="tape-text" style="height: 170px">
      <ul style="text-align: left; margin-bottom: 0; margin-left: 10px; height: 120px;">
      <li >Lasts: 1-2 day</li>
      <li>Clear</li>
      <li>Hypoallergenic</li>
      <li>Moderate hold</li>
      <li>Easy removal</li>
      </ul>
    </div>

    <div class="tape-text" style="height: 102px">
      <ul style="text-align: left; margin-bottom: 0; margin-left: 10px; height: 72px;">
        <li>Vapon Topstick</li>
        <li>Davlyn #52</li>
      </ul>
    </div>

  
  </div>
  <div id="columnThree">
    <div class="tape-subtitle">
      <div class="tape-subtitle-text">
        <img src="/content/images/marketing/tape/daily3.jpg" style="height: 75px;">
        <div>Vapon Topstick<br/>Pre-cut (Strips)</div>
      </div>     
      <button id="TB2" class="tape-button" onclick="hideColumn(c)"><img src="/content/images/marketing/tape/close.png"></button>
    </div>
    <div class="tape-box"><img src="/content/images/marketing/tape/checkmark.png"></div>
    <div class="tape-question">No</div>
    <div class="tape-text" style="height: 170px">
      <ul style="text-align: left; margin-bottom: 0; margin-left: 10px; height: 120px;">
        <li>Lasts: 1-2 days</li>
        <li>Hypoallergenic</li>
        <li>Waterproof</li>
        <li>Low residue</li>
      </ul>
    </div>
 
    <div class="tape-text" style="height: 102px">
      <ul style="text-align: left; margin-bottom: 0; margin-left: 10px; height: 72px;">
        <li>Davlyn #52</li>
        <li>3M</li>
        <li>super1522</li>

      </ul>
    </div>

  </div>
  <div id="columnFour">
    <div class="tape-subtitle">
      <div class="tape-subtitle-text">
        <div class="tape-double">
          <img src="/content/images/marketing/tape/daily4.jpg" style="height: 75px;">
          <img src="/content/images/marketing/tape/daily5.jpg" style="height: 75px;">
        </div>
        <div>Davlyn #52<br/>(Rolls & Strips)</div>
      </div>
      <button id="TB3" class="tape-button" onclick="hideColumn(d)"><img src="/content/images/marketing/tape/close.png"></button>
    </div>
    <div class="tape-box"><img src="/content/images/marketing/tape/checkmark.png"></div>
    <div class="tape-question">No</div>
    <div class="tape-text" style="height: 170px">
      <ul style="text-align: left; margin-bottom: 0; margin-left: 10px; height: 120px;">
        <li>Lasts: 1-2 days</li>
        <li>Clear</li>
        <li>Hypoallergenic</li>
        <li>Moderate hold</li>
        <li>Easy removal</li>
      </ul>
    </div>

    <div class="tape-text" style="height: 102px">
      <ul style="text-align: left; margin-bottom: 0; margin-left: 10px; height: 72px;">
        <li>Vapon Topstick</li>
        <li>3M</li>
        <li>super1522</li>
      </ul>
    </div>

  </div>
  <div id="columnFive">
    
    <div class="tape-subtitle">
      <div class="tape-subtitle-text">
        <div class="tape-double">
          <img src="/content/images/marketing/tape/daily6.jpg" style="height: 75px;">
          <img src="/content/images/marketing/tape/daily7.jpg" style="height: 75px;">
        </div>
        <div>Red Liner/Super Red<br/>(Rolls & Strips)</div>
      </div>
      <button id="TB4" class="tape-button" onclick="hideColumn(e)"><img src="/content/images/marketing/tape/close.png"></button>

    </div>
    <div class="tape-box"><img src="/content/images/marketing/tape/checkmark.png"></div>
    <div class="tape-question">No</div>
    <div class="tape-text" style="height: 170px">
      <ul style="text-align: left; margin-bottom: 0; margin-left: 10px; height: 120px;">
        <li>Lasts: 2-4 days</li>
        <li>Clear</li>
        <li>Most water resistant</li>
        <li>Strong hold</li>
        <li>Easy removal</li>
      </ul>
    </div>

    <div class="tape-text" style="height: 102px">
      <ul style="text-align: left; margin-bottom: 0; margin-left: 10px; height: 72px;">
        <li>Davlyn Red Liner</li>
      </ul>
    </div>

  </div>
  <div id="columnSix">
    <div class="tape-subtitle">
      <div class="tape-subtitle-text">
        <img src="/content/images/marketing/tape/daily8.jpg" style="height: 75px;">
        <div>Davlyn Red Liner<br/>(Strips)</div>
      </div>   
      <button id="TB5" class="tape-button" onclick="hideColumn(f)"><img src="/content/images/marketing/tape/close.png"></button>

    </div>
    <div class="tape-box"><img src="/content/images/marketing/tape/checkmark.png"></div>
    <div class="tape-question">No</div>
    <div class="tape-text" style="height: 170px">
      <ul style="text-align: left; margin-bottom: 0; margin-left: 10px; height: 120px;">
        <li>Lasts: 2-4 days</li>
        <li>Clear</li>
        <li>Most water resistant</li>
        <li>Strong hold</li>
        <li>Easy removal</li>
      </ul>
    </div>

    <div class="tape-text" style="height: 102px">
      <ul style="text-align: left; margin-bottom: 0; margin-left: 10px; height: 72px;">
        <li>Red Liner</li>
        <li>Super Red</li>
      </ul>
    </div>

  </div>
  <div id="columnSeven" >
    <div class="tape-subtitle" style="border-right: 1px solid #C4C4C4;">
      <div class="tape-subtitle-text">
        <img src="/content/images/marketing/tape/daily9.jpg" style="height: 75px;">
        <div>Sunshine to Base<br/>(Strips)</div>
      </div>  
      <button id="TB6" class="tape-button" onclick="hideColumn(g)"><img src="/content/images/marketing/tape/close.png"></button>
    </div>
    <div class="tape-box" style="border-right: 1px solid #C4C4C4;"><img src="/content/images/marketing/tape/checkmark.png"></div>
    <div class="tape-box" style="border-right: 1px solid #C4C4C4;"><img src="/content/images/marketing/tape/checkmark.png"></div>
    <div class="tape-text"style="height: 170px"  style="border-right: 1px solid #C4C4C4;">
      <ul style="text-align: left; margin-bottom: 0; margin-left: 10px; height: 120px;">
        <li>Lasts: 1-4 days</li>
        <li>Clear</li>
        <li>Hypoallergenic</li>
        <li>Easy clean up</li>
      </ul>
    </div>
  
    <div class="tape-empty" style="border-right: 1px solid #C4C4C4;height: 102px" id = "col7E">--</div>

  </div>
  
</div>
<div class="tape-footer"></div>
<script>
var b = "columnTwo";
var c = "columnThree";
var d = "columnFour";
var e = "columnFive";
var f = "columnSix";
var g = "columnSeven";
counter = 0;
function showColumns(){
    // document.getElementById("tapeCounter").innerHTML="Showing 1-6 of 6 products";
  
    document.getElementById("tapeShowColumns").style.display="none";
    document.getElementById("tapeContainer").style.gridTemplateColumns="10fr 10fr 10fr 10fr 10fr 10fr 10fr ";
    document.getElementById("columnTwo").style.display = "grid";
    document.getElementById("columnThree").style.display = "grid";
    document.getElementById("columnFour").style.display = "grid";
    document.getElementById("columnFive").style.display = "grid";
    document.getElementById("columnSix").style.display = "grid";
    document.getElementById("columnSeven").style.display = "grid";
    counter = 0;
    var elements = document.getElementsByClassName('tape-button');
      for(var i=0; i<elements.length; i++) { 
        elements[i].style.display='block';
      }
  }
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
function revealButton(a,b,c,d){
  document.getElementById(a).style.display="grid";
  document.getElementById(b).style.display="none";
  document.getElementById(c).style.display="grid";

}
function hideButton(a,b,c,d){

  document.getElementById(a).style.display="none";
  document.getElementById(b).style.display="grid";
  document.getElementById(c).style.display="none";

}
var c1 = "contentOne";
var c2 = "contentTwo";
var c3 = "contentThree";
var c4 = "contentFour";
var c5 = "contentFive";
var c6 = "contentSix";
var c7 = "contentSeven";
var c8 = "contentEight";
var c9 = "contentNine";
var c10 = "contentTen";

var b1 = "buttonOne";
var b2 = "buttonTwo";
var b3 = "buttonThree";
var b4 = "buttonFour";
var b5 = "buttonFive";
var b6 = "buttonSix";
var b7 = "buttonSeven";
var b8 = "buttonEight";
var b9 = "buttonNine";
var b10 = "buttonTen";

var br1 = "buttonOneReveal";
var br2 = "buttonTwoReveal";
var br3 = "buttonThreeReveal";
var br4 = "buttonFourReveal";
var br5 = "buttonFiveReveal";
var br6 = "buttonSixReveal";
var br7 = "buttonSevenReveal";
var br8 = "buttonEightReveal";
var br9 = "buttonNineReveal";
var br10 = "buttonTenReveal";

var i1 = "itemOne";
var i2 = "itemTwo";
var i3 = "itemThree";
var i4 = "itemFour";
var i5 = "itemFive";
var i6 = "itemSix";
var i7 = "itemSeven";
var i8 = "itemEight";
var i9 = "itemNine";
var i10 = "itemTen";
<\/script>
<div class='tape-mobile-container'>
<div class="tape-mobile-top"id="tape-target"></div>
  <div class="tape-mobile-bottom"id="tape-target-2"></div>

  <div class="tape-mobile-body">
    <div id="itemOne">
      <div class="tape-mobile-content">
          <div class="tape-mobile-split">
            <div class="tape-mobile-split-2" style="grid-template-columns: 1fr 10fr 20fr">
              <div class="tape-mobile-subtitle" style="margin-left: 2vw;"><li></li></div>
              <div class="tape-mobile-subtitle">3M/1522<br/> (Rolls & Strips)</div>
              <div style="text-align: right"><img class="tape-mobile-img" style="max-width: 58px; max-height: 58px;" src="/content/images/marketing/tape/daily1.jpg"><img class="tape-mobile-img" style="max-width: 58px; max-height: 58px;" src="/content/images/marketing/tape/daily2.jpg"></div>
            </div>
            <button id="buttonOne" class="tape-mobile-box" style="padding: 0" onclick="revealButton(c1,b1,br1,i1)"><img src="/content/images/marketing/tape/plus.png"></button>
            <button id="buttonOneReveal" class="tape-mobile-box" style="padding: 0;display: none" onclick="hideButton(c1,b1,br1,i1)"><img src="/content/images/marketing/tape/minus.png"></button>

          </div>
      </div>
      <div id="contentOne" class="tape-mobile-hidden">
        <div style="border-left: 1px solid #C4C4C4; border-right: 1px solid #C4C4C4;">
          <div class="tape-mobile-title">Description</div>
          <div class="tape-mobile-text">Last: 1-2 days<br/><br/>Clear<br/><br/>Hypoallergenic</div>
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
          <div class="tape-mobile-text">Vapon Topstick<br/><br/>Davlyn #52</div>

        </div>
      </div>
      <div class="tape-mobile-pad"></div>
    </div>

    <div id="itemTwo">
      <div class="tape-mobile-content">
        <div class="tape-mobile-split">
          <div class="tape-mobile-split-2" style="grid-template-columns: 1fr 25fr 10fr">
            <div class="tape-mobile-subtitle" style="margin-left: 2vw;"><li></li></div>
            <div class="tape-mobile-subtitle">Vapon Topstick<br/>Pre-cut (Strips)</div>
            <div style="text-align: right"><img class="tape-mobile-img" style="max-width: 75px; max-height: 60px;" src="/content/images/marketing/tape/daily3.jpg"></div>
          </div>
          <button id="buttonTwo" class="tape-mobile-box" style="padding: 0" onclick="revealButton(c2,b2,br2,i2)"><img src="/content/images/marketing/tape/plus.png"></button>
          <button id="buttonTwoReveal" class="tape-mobile-box" style="padding: 0;display: none" onclick="hideButton(c2,b2,br2,i2)"><img src="/content/images/marketing/tape/minus.png"></button>

        </div>
      </div>
      <div id="contentTwo" class="tape-mobile-hidden" >
        <div style="border-left: 1px solid #C4C4C4; border-right: 1px solid #C4C4C4;">
          <div class="tape-mobile-title">Description</div>
          <div class="tape-mobile-text">Last: 1-2 days<br/><br/>Clear<br/><br/>Hypoallergenic<br/><br/>Waterproof<br/><br/>Low residue</div>
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
          <div class="tape-mobile-text">Davlyn #52<br/><br/>3M<br/><br/>super1522</div>
        </div>
      </div>
      <div class="tape-mobile-pad"></div>
    </div>

    <div id="itemThree">
      <div class="tape-mobile-content">
        <div class="tape-mobile-split">
          <div class="tape-mobile-split-2" style="grid-template-columns: 1fr 9fr 20fr">
            <div class="tape-mobile-subtitle" style="margin-left: 2vw;"><li></li></div>
            <div class="tape-mobile-subtitle">Davlyn #52<br/>(Rolls & Strips)</div>
            <div style="text-align: right"><img class="tape-mobile-img" style="max-width: 63px; max-height: 62px;" src="/content/images/marketing/tape/daily4.jpg"><img class="tape-mobile-img" style="max-width: 62px; max-height: 62px;" src="/content/images/marketing/tape/daily5.jpg"></div>
          </div>
          <button id="buttonThree" class="tape-mobile-box" style="padding: 0" onclick="revealButton(c3,b3,br3,i3)"><img src="/content/images/marketing/tape/plus.png"></button>
          <button id="buttonThreeReveal" class="tape-mobile-box" style="padding: 0;display: none" onclick="hideButton(c3,b3,br3,i3)"><img src="/content/images/marketing/tape/minus.png"></button>

        </div>
      </div>
      <div id="contentThree" class="tape-mobile-hidden">
        <div style="border-left: 1px solid #C4C4C4; border-right: 1px solid #C4C4C4;">
          <div class="tape-mobile-title">Description</div>
          <div class="tape-mobile-text">Last: 1-2 days<br/><br/>Clear<br/><br/>Hypoallergenic</div>
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
          <div class="tape-mobile-text">Vapon Topstick<br/><br/>3M<br/><br/>super1522</div>

        </div>
      </div>
      <div class="tape-mobile-pad"></div>
    </div>

    <div id="itemFour">
      <div class="tape-mobile-content">
        <div class="tape-mobile-split">
          <div id="tapeRowFour" class="tape-mobile-split-2" >
            <div class="tape-mobile-subtitle" style="margin-left: 2vw;"><li></li></div>
            <div class="tape-mobile-subtitle">Red Liner/Super Red<br/>(Rolls & Strips)</div>
            <div style="text-align: right"><img id="tapeRowFourImage1"class="tape-mobile-img" style="max-width: 54px; max-height: 54px;" src="/content/images/marketing/tape/daily6.jpg"><img id="tapeRowFourImage2" class="tape-mobile-img" style="max-width: 63px; max-height: 63px;" src="/content/images/marketing/tape/daily7.jpg"></div>
          </div>
          <button id="buttonFour" class="tape-mobile-box" style="padding: 0" onclick="revealButton(c4,b4,br4,i4)"><img src="/content/images/marketing/tape/plus.png"></button>
          <button id="buttonFourReveal" class="tape-mobile-box" style="padding: 0;display: none" onclick="hideButton(c4,b4,br4,i4)"><img src="/content/images/marketing/tape/minus.png"></button>

        </div>
      </div>
      <div id="contentFour" class="tape-mobile-hidden">
        <div style="border-left: 1px solid #C4C4C4; border-right: 1px solid #C4C4C4;">
          <div class="tape-mobile-title">Description</div>
          <div class="tape-mobile-text">Last: 2-4 days<br/><br/>Clear<br/><br/>Most water resistant<br/><br/>Strong <br/><br/>Easy removal</div>
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
          <div class="tape-mobile-text">Vapon Topstick<br/><br/>3M<br/><br/>super1522</div>

        </div>
      </div>
      <div class="tape-mobile-pad"></div>
    </div>

    <div id="itemFive">
      <div class="tape-mobile-content">
        <div class="tape-mobile-split">
          <div class="tape-mobile-split-2" style="grid-template-columns: 1fr 25fr 10fr">
            <div class="tape-mobile-subtitle" style="margin-left: 2vw;"><li></li></div>
            <div class="tape-mobile-subtitle">Davlyn Red Liner (Strips)</div>
            <div style="text-align: right"><img class="tape-mobile-img" style="max-width: 107px; max-height: 58px;" src="/content/images/marketing/tape/daily8.jpg"></div>
          </div>
          <button id="buttonFive" class="tape-mobile-box" style="padding: 0" onclick="revealButton(c5,b5,br5,i5)"><img src="/content/images/marketing/tape/plus.png"></button>
          <button id="buttonFiveReveal" class="tape-mobile-box" style="padding: 0;display: none" onclick="hideButton(c5,b5,br5,i5)"><img src="/content/images/marketing/tape/minus.png"></button>

        </div>
      </div>
      <div id="contentFive" class="tape-mobile-hidden">
        <div style="border-left: 1px solid #C4C4C4; border-right: 1px solid #C4C4C4;">
          <div class="tape-mobile-title">Description</div>
          <div class="tape-mobile-text">Last: 2-4 days<br/><br/>Clear<br/><br/>Most water resistant<br/><br/>Strong hold<br/><br/>Easy removal</div>
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
          <div class="tape-mobile-text">Red Liner<br/><br/>Super Red</div>

        </div>
      </div>
      <div class="tape-mobile-pad"></div>
    </div>

    <div id="itemSix">
      <div class="tape-mobile-content">
        <div class="tape-mobile-split">
          <div class="tape-mobile-split-2" style="grid-template-columns: 1fr 25fr 10fr">
            <div class="tape-mobile-subtitle" style="margin-left: 2vw;"><li></li></div>
            <div class="tape-mobile-subtitle">Sunshine to Base<br/>(Strips)</div>
            <div style="text-align: right"><img class="tape-mobile-img" style="max-width: 93px; max-height: 51px;" src="/content/images/marketing/tape/daily9.jpg"></div>
          </div>
          <button id="buttonSix" class="tape-mobile-box" style="padding: 0" onclick="revealButton(c6,b6,br6,i6)"><img src="/content/images/marketing/tape/plus.png"></button>
          <button id="buttonSixReveal" class="tape-mobile-box" style="padding: 0;display: none" onclick="hideButton(c6,b6,br6,i6)"><img src="/content/images/marketing/tape/minus.png"></button>

        </div>
      </div>
      <div id="contentSix" class="tape-mobile-hidden">
        <div style="border-left: 1px solid #C4C4C4; border-right: 1px solid #C4C4C4;">
          <div class="tape-mobile-title">Description</div>
          <div class="tape-mobile-text">Last: 1-4 days<br/><br/>Clear<br/><br/>Hypoallergenic<br/><br/>Easy clean up</div>
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
          <div class="tape-mobile-text">- -</div>

        </div>
      </div>
      <div class="tape-mobile-pad"></div>
    </div>
  </div>
</div>
`

export default function() {
  $(".st-ann2").append(`<div class="tape-header">Which tape is right for your hair system?</div>
  <div class="tape-feature-container" id="tapeShowColumnsContainer">
      <div class="tape-show-columns" id="tapeShowColumns"><button style="text-decoration-line: underline" onclick="showColumns()">Show Hidden Columns</button></div>
  </div>
  <div class="tapeTabs">
      <div class="tapeTabs-head" >Daily</div>
      <div class="tapeTabs-head" >Weekly</div>
      <div class="tapeTabs-head" >Monthly</div>
  </div>
  <script>
  var i1 = "itemOne";
  var i2 = "itemTwo";
  var i3 = "itemThree";
  var i4 = "itemFour";
  var i5 = "itemFive";
  var i6 = "itemSix";
  var i7 = "itemSeven";
  var i8 = "itemEight";
  var i9 = "itemNine";
  var i10 = "itemTen";


  var c1 = "contentOne";
  var c2 = "contentTwo";
  var c3 = "contentThree";
  var c4 = "contentFour";
  var c5 = "contentFive";
  var c6 = "contentSix";
  var c7 = "contentSeven";
  var c8 = "contentEight";
  var c9 = "contentNine";
  var c10 = "contentTen";

  var b1 = "buttonOne";
  var b2 = "buttonTwo";
  var b3 = "buttonThree";
  var b4 = "buttonFour";
  var b5 = "buttonFive";
  var b6 = "buttonSix";
  var b7 = "buttonSeven";
  var b8 = "buttonEight";
  var b9 = "buttonNine";
  var b10 = "buttonTen";

  var br1 = "buttonOneReveal";
  var br2 = "buttonTwoReveal";
  var br3 = "buttonThreeReveal";
  var br4 = "buttonFourReveal";
  var br5 = "buttonFiveReveal";
  var br6 = "buttonSixReveal";
  var br7 = "buttonSevenReveal";
  var br8 = "buttonEightReveal";
  var br9 = "buttonNineReveal";
  var br10 = "buttonTenReveal";
  </script>
  `)

  if ($('.st-ann2').length) {
    const tabHead = $('.st-ann2').data('name')
  
      if (tabHead === 'Daily') {
        $('.tapeTabs-head')[0].classList.add("activeTab")
      } else if (tabHead === 'Weekly') {
        $('.tapeTabs-head')[1].classList.add("activeTab")
      } else if (tabHead === 'Monthly') {
        $('.tapeTabs-head')[2].classList.add("activeTab")
      } else {
    
      }
    }
    
  $(".tapeTabs-head").on('click', function(n) {

    Array.from(n.target.parentElement.children).forEach(sib => sib.classList.remove('activeTab'));
      n.target.classList.add('activeTab');
      let innerEl = n.target.innerHTML;
      document.getElementById("tapeShowColumns").style.display="none";

      if (innerEl === "Daily") {
        $(".st-ann3").empty();
        $(".st-ann3").css('display','block');

        $(".st-ann3").removeAttr('id');
        $(".st-ann3").append(stContent);
      }
  })
  $(".st-ann3").append(stContent);
}

