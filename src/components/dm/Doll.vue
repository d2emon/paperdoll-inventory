<template>
  <div class="paperDoll">
    <v-btn-toggle v-model="gender" class="gender">
      <v-btn flat>Male</v-btn>
      <v-btn flat>Female</v-btn>
    </v-btn-toggle>

    <div id="slctLeft">
      <v-tabs
        v-model="tab"
        dark
        slider-color="yellow"
      >
        <v-tab
          v-for="c in categories"
          :key="c"
          ripple
        >
          {{ c }}
        </v-tab>

        <v-tab-item
          v-for="c in categories"
          :key="c"
        >
          <v-card flat class="slctContLeft">
            <v-card-text>{{c}}</v-card-text>

            <div id="scarfsBg" class="slctBgs activeContLeft">
              <div id="scarf1" class="armBg"></div>
              <div id="scarf2" class="armBg"></div>
              <div id="scarf3" class="armBg"></div>
              <div id="scarf4" class="armBg"></div>
              <div id="scarf5" class="armBg"></div>
              <div id="scarf6" class="armBg"></div>
              <div id="scarf7" class="armBg"></div>
              <div id="scarf8" class="armBg"></div>
              <div id="scarf9" class="armBg"></div>
              <div id="scarf10" class="armBg"></div>
              <div id="scarf11" class="armBg"></div>
              <div id="scarf12" class="armBg"></div>
              <div id="scarf13" class="armBg"></div>
              <div id="scarf14" class="armBg"></div>
              <div id="scarf15" class="armBg"></div>
              <div id="scarf16" class="armBg"></div>
              <div id="scarf17" class="armBg"></div>
              <div id="scarf18" class="armBg"></div>
              <div id="scarf19" class="armBg"></div>
              <div id="scarf20" class="armBg"></div>
              <div id="scarf21" class="armBg"></div>
              <div id="scarf22" class="armBg"></div>
              <div id="scarf23" class="armBg"></div>
              <div id="scarf24" class="armBg"></div>
              <div id="scarf25" class="armBg"></div>
              <div id="scarf26" class="armBg"></div>
              <div id="scarf27" class="armBg"></div>
              <div id="scarf28" class="armBg"></div>
              <div id="scarf29" class="armBg"></div>
              <div id="scarf30" class="armBg"></div>
            </div>
            <div id="jacketsBg" class="slctBgs">
              <div id="jacket1" class="armBg"></div>
              <div id="jacket2" class="armBg"></div>
              <div id="jacket3" class="armBg"></div>
              <div id="jacket4" class="armBg"></div>
              <div id="jacket5" class="armBg"></div>
              <div id="jacket6" class="armBg"></div>
              <div id="jacket7" class="armBg"></div>
              <div id="jacket8" class="armBg"></div>
              <div id="jacket9" class="armBg"></div>
              <div id="jacket10" class="armBg"></div>
              <div id="jacket11" class="armBg"></div>
              <div id="jacket12" class="armBg"></div>
              <div id="jacket13" class="armBg"></div>
              <div id="jacket14" class="armBg"></div>
              <div id="jacket15" class="armBg"></div>
              <div id="jacket16" class="armBg"></div>
              <div id="jacket17" class="armBg"></div>
              <div id="jacket18" class="armBg"></div>
              <div id="jacket19" class="armBg"></div>
              <div id="jacket20" class="armBg"></div>
              <div id="jacket21" class="armBg"></div>
              <div id="jacket22" class="armBg"></div>
              <div id="jacket23" class="armBg"></div>
              <div id="jacket24" class="armBg"></div>
              <div id="jacket25" class="armBg"></div>
              <div id="jacket26" class="armBg"></div>
              <div id="jacket27" class="armBg"></div>
              <div id="jacket28" class="armBg"></div>
              <div id="jacket29" class="armBg"></div>
              <div id="jacket30" class="armBg"></div>
            </div>
            <div id="shirtsBg" class="slctBgs">
              <div id="shirt1" class="armBg"></div>
              <div id="shirt2" class="armBg"></div>
              <div id="shirt3" class="armBg"></div>
              <div id="shirt4" class="armBg"></div>
              <div id="shirt5" class="armBg"></div>
              <div id="shirt6" class="armBg"></div>
              <div id="shirt7" class="armBg"></div>
              <div id="shirt8" class="armBg"></div>
              <div id="shirt9" class="armBg"></div>
              <div id="shirt10" class="armBg"></div>
              <div id="shirt11" class="armBg"></div>
              <div id="shirt12" class="armBg"></div>
              <div id="shirt13" class="armBg"></div>
              <div id="shirt14" class="armBg"></div>
              <div id="shirt15" class="armBg"></div>
              <div id="shirt16" class="armBg"></div>
              <div id="shirt17" class="armBg"></div>
              <div id="shirt18" class="armBg"></div>
              <div id="shirt19" class="armBg"></div>
              <div id="shirt20" class="armBg"></div>
              <div id="shirt21" class="armBg"></div>
              <div id="shirt22" class="armBg"></div>
              <div id="shirt23" class="armBg"></div>
              <div id="shirt24" class="armBg"></div>
              <div id="shirt25" class="armBg"></div>
              <div id="shirt26" class="armBg"></div>
              <div id="shirt27" class="armBg"></div>
              <div id="shirt28" class="armBg"></div>
              <div id="shirt29" class="armBg"></div>
              <div id="shirt30" class="armBg"></div>
            </div>
            <div id="pantsBg" class="slctBgs">
              <div id="pants1" class="armBg"></div>
              <div id="pants2" class="armBg"></div>
              <div id="pants3" class="armBg"></div>
              <div id="pants4" class="armBg"></div>
              <div id="pants5" class="armBg"></div>
              <div id="pants6" class="armBg"></div>
              <div id="pants7" class="armBg"></div>
              <div id="pants8" class="armBg"></div>
              <div id="pants9" class="armBg"></div>
              <div id="pants10" class="armBg"></div>
              <div id="pants11" class="armBg"></div>
              <div id="pants12" class="armBg"></div>
              <div id="pants13" class="armBg"></div>
              <div id="pants14" class="armBg"></div>
              <div id="pants15" class="armBg"></div>
              <div id="pants16" class="armBg"></div>
              <div id="pants17" class="armBg"></div>
              <div id="pants18" class="armBg"></div>
              <div id="pants19" class="armBg"></div>
              <div id="pants20" class="armBg"></div>
              <div id="pants21" class="armBg"></div>
              <div id="pants22" class="armBg"></div>
              <div id="pants23" class="armBg"></div>
              <div id="pants24" class="armBg"></div>
              <div id="pants25" class="armBg"></div>
              <div id="pants26" class="armBg"></div>
              <div id="pants27" class="armBg"></div>
              <div id="pants28" class="armBg"></div>
              <div id="pants29" class="armBg"></div>
              <div id="pants30" class="armBg"></div>
            </div>
            <div id="shoesBg" class="slctBgs">
              <div id="shoes1" class="armBg"></div>
              <div id="shoes2" class="armBg"></div>
              <div id="shoes3" class="armBg"></div>
              <div id="shoes4" class="armBg"></div>
              <div id="shoes5" class="armBg"></div>
              <div id="shoes6" class="armBg"></div>
              <div id="shoes7" class="armBg"></div>
              <div id="shoes8" class="armBg"></div>
              <div id="shoes9" class="armBg"></div>
              <div id="shoes10" class="armBg"></div>
              <div id="shoes11" class="armBg"></div>
              <div id="shoes12" class="armBg"></div>
              <div id="shoes13" class="armBg"></div>
              <div id="shoes14" class="armBg"></div>
              <div id="shoes15" class="armBg"></div>
              <div id="shoes16" class="armBg"></div>
              <div id="shoes17" class="armBg"></div>
              <div id="shoes18" class="armBg"></div>
              <div id="shoes19" class="armBg"></div>
              <div id="shoes20" class="armBg"></div>
              <div id="shoes21" class="armBg"></div>
              <div id="shoes22" class="armBg"></div>
              <div id="shoes23" class="armBg"></div>
              <div id="shoes24" class="armBg"></div>
              <div id="shoes25" class="armBg"></div>
              <div id="shoes26" class="armBg"></div>
              <div id="shoes27" class="armBg"></div>
              <div id="shoes28" class="armBg"></div>
              <div id="shoes29" class="armBg"></div>
              <div id="shoes30" class="armBg"></div>
            </div>
            <div id="shirts2Bg" class="slctBgs">
              <div id="shirt31" class="armBg"></div>
              <div id="shirt32" class="armBg"></div>
              <div id="shirt33" class="armBg"></div>
              <div id="shirt34" class="armBg"></div>
              <div id="shirt35" class="armBg"></div>
              <div id="shirt36" class="armBg"></div>
              <div id="shirt37" class="armBg"></div>
              <div id="shirt38" class="armBg"></div>
              <div id="shirt39" class="armBg"></div>
              <div id="shirt40" class="armBg"></div>
              <div id="shirt41" class="armBg"></div>
              <div id="shirt42" class="armBg"></div>
              <div id="shirt43" class="armBg"></div>
              <div id="shirt44" class="armBg"></div>
              <div id="shirt45" class="armBg"></div>
              <div id="shirt46" class="armBg"></div>
              <div id="shirt47" class="armBg"></div>
              <div id="shirt48" class="armBg"></div>
              <div id="shirt49" class="armBg"></div>
              <div id="shirt50" class="armBg"></div>
              <div id="shirt51" class="armBg"></div>
              <div id="shirt52" class="armBg"></div>
              <div id="shirt53" class="armBg"></div>
              <div id="shirt54" class="armBg"></div>
              <div id="shirt55" class="armBg"></div>
              <div id="shirt56" class="armBg"></div>
              <div id="shirt57" class="armBg"></div>
              <div id="shirt58" class="armBg"></div>
              <div id="shirt59" class="armBg"></div>
              <div id="shirt60" class="armBg"></div>
            </div>
            <div id="skirtsBg" class="slctBgs">
              <div id="skirt1" class="armBg"></div>
              <div id="skirt2" class="armBg"></div>
              <div id="skirt3" class="armBg"></div>
              <div id="skirt4" class="armBg"></div>
              <div id="skirt5" class="armBg"></div>
              <div id="skirt6" class="armBg"></div>
              <div id="skirt7" class="armBg"></div>
              <div id="skirt8" class="armBg"></div>
              <div id="skirt9" class="armBg"></div>
              <div id="skirt10" class="armBg"></div>
              <div id="skirt11" class="armBg"></div>
              <div id="skirt12" class="armBg"></div>
              <div id="skirt13" class="armBg"></div>
              <div id="skirt14" class="armBg"></div>
              <div id="skirt15" class="armBg"></div>
              <div id="skirt16" class="armBg"></div>
              <div id="skirt17" class="armBg"></div>
              <div id="skirt18" class="armBg"></div>
              <div id="skirt19" class="armBg"></div>
              <div id="skirt20" class="armBg"></div>
              <div id="skirt21" class="armBg"></div>
              <div id="skirt22" class="armBg"></div>
              <div id="skirt23" class="armBg"></div>
              <div id="skirt24" class="armBg"></div>
              <div id="skirt25" class="armBg"></div>
              <div id="skirt26" class="armBg"></div>
              <div id="skirt27" class="armBg"></div>
              <div id="skirt28" class="armBg"></div>
              <div id="skirt29" class="armBg"></div>
              <div id="skirt30" class="armBg"></div>
            </div>
            <div id="beltsBg" class="slctBgs">
              <div id="belt1" class="armBg"></div>
              <div id="belt2" class="armBg"></div>
              <div id="belt3" class="armBg"></div>
              <div id="belt4" class="armBg"></div>
              <div id="belt5" class="armBg"></div>
              <div id="belt6" class="armBg"></div>
              <div id="belt7" class="armBg"></div>
              <div id="belt8" class="armBg"></div>
              <div id="belt9" class="armBg"></div>
              <div id="belt10" class="armBg"></div>
              <div id="belt11" class="armBg"></div>
              <div id="belt12" class="armBg"></div>
              <div id="belt13" class="armBg"></div>
              <div id="belt14" class="armBg"></div>
              <div id="belt15" class="armBg"></div>
              <div id="belt16" class="armBg"></div>
              <div id="belt17" class="armBg"></div>
              <div id="belt18" class="armBg"></div>
              <div id="belt19" class="armBg"></div>
              <div id="belt20" class="armBg"></div>
              <div id="belt21" class="armBg"></div>
              <div id="belt22" class="armBg"></div>
              <div id="belt23" class="armBg"></div>
              <div id="belt24" class="armBg"></div>
              <div id="belt25" class="armBg"></div>
              <div id="belt26" class="armBg"></div>
              <div id="belt27" class="armBg"></div>
              <div id="belt28" class="armBg"></div>
              <div id="belt29" class="armBg"></div>
              <div id="belt30" class="armBg"></div>
            </div>
            <div id="glovesBg" class="slctBgs">
              <div id="gloves1" class="armBg"></div>
              <div id="gloves2" class="armBg"></div>
              <div id="gloves3" class="armBg"></div>
              <div id="gloves4" class="armBg"></div>
              <div id="gloves5" class="armBg"></div>
              <div id="gloves6" class="armBg"></div>
              <div id="gloves7" class="armBg"></div>
              <div id="gloves8" class="armBg"></div>
              <div id="gloves9" class="armBg"></div>
              <div id="gloves10" class="armBg"></div>
              <div id="gloves11" class="armBg"></div>
              <div id="gloves12" class="armBg"></div>
              <div id="gloves13" class="armBg"></div>
              <div id="gloves14" class="armBg"></div>
              <div id="gloves15" class="armBg"></div>
              <div id="gloves16" class="armBg"></div>
              <div id="gloves17" class="armBg"></div>
              <div id="gloves18" class="armBg"></div>
              <div id="gloves19" class="armBg"></div>
              <div id="gloves20" class="armBg"></div>
              <div id="gloves21" class="armBg"></div>
              <div id="gloves22" class="armBg"></div>
              <div id="gloves23" class="armBg"></div>
              <div id="gloves24" class="armBg"></div>
              <div id="gloves25" class="armBg"></div>
              <div id="gloves26" class="armBg"></div>
              <div id="gloves27" class="armBg"></div>
              <div id="gloves28" class="armBg"></div>
              <div id="gloves29" class="armBg"></div>
              <div id="gloves30" class="armBg"></div>
            </div>

          </v-card>
        </v-tab-item>
      </v-tabs>

    </div>
    <div id="armor">
      <section class="armorPieces">
        <div class="armPiece" id="scarfArm"></div>
        <div class="armPiece" id="jacketArm"></div>
        <div class="armPiece" id="gloveArm"></div>
        <div class="armPiece" id="beltArm"></div>
        <div class="armPiece" id="shirtArm"></div>
        <div class="armPiece" id="shoesArm"></div>
        <div class="armPiece" id="skirtArm"></div>
        <div class="armPiece" id="pantsArm"></div>
        <div class="armPiece" id="gndArm"></div>
        <div class="armPiece" id="bshoesArm"></div>
        <div class="armPiece" id="bskirtArm"></div>
        <div class="armPiece" id="bshirtArm"></div>
        <div class="armPiece" id="bjacketArm"></div>
      </section>
    </div>

    <div id="saveButtons">
      <v-btn-toggle class="save-buttons">
        <v-btn>Save 1</v-btn>
        <v-btn>Load 1</v-btn>
      </v-btn-toggle>

      <v-btn-toggle class="save-buttons">
        <v-btn>Save 2</v-btn>
        <v-btn>Load 2</v-btn>
      </v-btn-toggle>

      <v-btn-toggle class="save-buttons">
        <v-btn>Save 3</v-btn>
        <v-btn>Load 3</v-btn>
      </v-btn-toggle>

      <v-btn-toggle class="save-buttons">
        <v-btn>Save 4</v-btn>
        <v-btn>Load 4</v-btn>
      </v-btn-toggle>
    </div>


    <div id="canvasCont" style="width: 600px; margin: 0 auto; float: none;">
      <v-btn>Clear All</v-btn>
      <canvas id="canvas" width="600" height="400"></canvas>
      <v-btn>Turn to image</v-btn>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Doll',
    data: () => ({
      gender: null,
      tab: null,
      categories: [
        'Jackets',
        'Shirts',
        'Shirts 2',
        'Pants',
        'Skirts',
        'Shoes',
        'Scarfs',
        'Belts',
        'Gloves',
      ]
    })
  }

/*
$(document).ready(function(){
	var gnd = "male";
	var scarf = "";
	var jacket = "";
	var shirt = "";
	var pants = "";
	var shoes = "";
	var gloves = "";
	var belt = "";
	var skirt = "";

	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");

	$(".selection").click(function(){
		var slct = $(this).attr('id');
		$('.slctnLeft > .selection').removeClass('activeTitleLeft');
		$(this).addClass('activeTitleLeft');
		$('.slctContLeft > .slctBgs').removeClass('activeContLeft');
		$("#" + slct + 'Bg').addClass('activeContLeft');
	});
	$("#load1, #load2, #load3, #load4").click(function(){
		var nm = $(this).attr("name");
		$("#armor").html(window.localStorage["outfitSaved" + nm]);
	});
	$("#save1, #save2, #save3, #save4").click(function(){
		var nm = $(this).attr("name");
		window.localStorage.setItem('outfitSaved' + nm, $("#armor").html());
	});
	$(".genderSlct").click(function(){
		gnd = $(this).attr('id');
		$('#gender > .genderSlct').removeClass('slctdGender');
		$(this).addClass('slctdGender');

		$("#gndArm").css("background-image", "url('../images/armor/" + gnd + "/body.png')");
		$(".armBg").each(function(i, obj){
			var curId = $(this).attr('id');
			var newUrl = "url('../images/clothing/n" + gnd + "/" + curId + ".png')";
			$(this).css("background-image", newUrl);
		});
		$("#scarfArm").css("background-image", "url('../images/clothing/n" + gnd + "/" + scarf + ".png')");
		$("#gloveArm").css("background-image", "url('../images/clothing/n" + gnd + "/" + gloves + ".png')");
		$("#jacketArm").css("background-image", "url('../images/clothing/n" + gnd + "/" + jacket + ".png')");
		$("#shirtArm").css("background-image", "url('../images/clothing/n" + gnd + "/" + shirt + ".png')");
		$("#shirtArm").css("background-image", "url('../images/clothing/n" + gnd + "/" + shirt + ".png')");
		$("#shoesArm").css("background-image", "url('../images/clothing/n" + gnd + "/" + shoes + ".png')");
		$("#pantsArm").css("background-image", "url('../images/clothing/n" + gnd + "/" + pants + ".png')");
		$("#skirtArm").css("background-image", "url('../images/clothing/n" + gnd + "/" + skirt + ".png')");
		$("#beltArm").css("background-image", "url('../images/clothing/n" + gnd + "/" + belt + ".png')");
		$("#bshoesArm").css("background-image", "url('../images/clothing/n" + gnd + "/b" + shoes + ".png')");
		$("#bshirtArm").css("background-image", "url('../images/clothing/n" + gnd + "/b" + shirt + ".png')");
		$("#bjacketArm").css("background-image", "url('../images/clothing/n" + gnd + "/b" + jacket + ".png')");
	});
	$("#clearAll").click(function(){
		$(".armPiece").css('background-image', 'none');
		$('.genderSlct').removeClass('slctdGender');
		scarf = "";
		jacket = "";
		shirt = "";
		pants = "";
		gloves = "";
		shoes = "";
		skirt = "";
	});
	$("#scarfsBg > .armBg").click(function(){
		nscarf = $(this).attr('id');
		if(nscarf === scarf){
			$("#scarfArm").css('background-image', 'none');
			scarf = "";
		}else{
			var slct = $(this).css('background-image');
			$("#scarfArm").css({"background-image": slct});
			scarf = nscarf;
		}
	});
	$("#jacketsBg > .armBg").click(function(){
		njacket = $(this).attr('id');
		if(njacket === jacket){
			$("#jacketArm, #bjacketArm").css('background-image', 'none');
			jacket = "";
		}else{
			var slct = $(this).css('background-image');
			$("#jacketArm").css({"background-image": slct});
			$("#bjacketArm").css({"background-image": "url('../images/clothing/n" + gnd + "/b" + njacket + ".png')"});
			jacket = njacket;
		}
	});
	$("#shirtsBg > .armBg, #shirts2Bg > .armBg").click(function(){
		nshirt = $(this).attr('id');
		if(nshirt === shirt){
			$("#shirtArm, #bshirtArm").css('background-image', 'none');
			shirt = "";
		}else{
			var slct = $(this).css('background-image');
			$("#shirtArm").css({"background-image": slct});
			$("#bshirtArm").css({"background-image": "url('../images/clothing/n" + gnd + "/b" + nshirt + ".png')"});
			shirt = nshirt;
		}
	});
	$("#skirtsBg > .armBg").click(function(){
		nskirt = $(this).attr('id');
		if(nskirt === skirt){
			$("#skirtArm, #bskirtArm").css('background-image', 'none');
			skirt = "";
		}else{
			var slct = $(this).css('background-image');
			$("#skirtArm").css({"background-image": slct});
			$("#bskirtArm").css({"background-image": "url('../images/clothing/n" + gnd + "/b" + nskirt + ".png')"});
			skirt = nskirt;
		}
	});
	$("#pantsBg > .armBg").click(function(){
		npants = $(this).attr('id');
		if(npants === pants){
			$("#pantsArm").css('background-image', 'none');
			pants = "";
		}else{
			var slct = $(this).css('background-image');
			$("#pantsArm").css({"background-image": slct});
			pants = npants;
		}
	});
	$("#shoesBg > .armBg").click(function(){
		nshoes = $(this).attr('id');
		if(nshoes === shoes){
			$("#shoesArm, #bshoesArm").css('background-image', 'none');
			shoes = "";
		}else{
			var slct = $(this).css('background-image');
			$("#shoesArm").css({"background-image": slct});
			$("#bshoesArm").css({"background-image": "url('../images/clothing/n" + gnd + "/b" + nshoes + ".png')"});
			shoes = nshoes;
		}
	});
	$("#glovesBg > .armBg").click(function(){
		ngloves = $(this).attr('id');
		if(ngloves === gloves){
			$("#gloveArm").css('background-image', 'none');
			gloves = "";
		}else{
			var slct = $(this).css('background-image');
			$("#gloveArm").css({"background-image": slct});
			gloves = ngloves;
		}
	});
	$("#beltsBg > .armBg").click(function(){
		nbelt = $(this).attr('id');
		if(nbelt === belt){
			$("#beltArm").css('background-image', 'none');
			belt = "";
		}else{
			var slct = $(this).css('background-image');
			$("#beltArm").css({"background-image": slct});
			belt = nbelt;
		}
	});
	$("#toPic").click(function(){
		context.clearRect(0, 0, canvas.width, canvas.height);
		$("#canvas").css({"display": "inline"});
		$($(".armPiece").get().reverse()).each(function(){
			imgTop = $(this).css("margin-top").replace('px','');
			imgLeft = $(this).css("margin-left").replace('px','');
			imgWd = $(this).css("width").replace('px','');
			imgHt = $(this).css("height").replace('px','');
			var img = new Image();
			img.src = $(this).css("background-image").replace('url(\"','').replace('\")','');
			context.drawImage(img, imgLeft, imgTop, imgWd, imgHt);
		});
	});
});
 */
</script>

<style scoped>
  .paperDoll{
    -webkit-box-shadow: 0px 0px 5px 3px rgba(0,0,0,0.25);
    -moz-box-shadow: 0px 0px 5px 3px rgba(0,0,0,0.25);
    box-shadow: 0px 0px 5px 3px rgba(0,0,0,0.25);
    font-size: 120%;
    height: auto;
    overflow: hidden;
    text-align: center;
    width: 600px;
  }

  #saveButtons{
    border-bottom: 1px solid #ff9900;
    float: left;
    height: 50px;
    width: 100%;
  }
  #slctLeft, #slctRight, #armor{
    float: left;
  }
  #armor, #canvas{
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    background-color: #ffffff;
    border: 1px solid #ff9900;
    border-bottom: none;
    height: 400px;
    width: 600px;
  }
  #canvas{
    border-radius: 5px;
    -moz-border-radius: 5px;
    -webkit-border-radius: 5px;
    display: none;
    margin-top: 15px;
  }
  .slctnLeft, .slctContRight, .slctContLeft, .selectionRight, .selection, .cloakSepOne, .cloakSepTwo{
    float: left;
    width: 100%;
  }
  .gender {
    width: 100%;
  }
  .gender button{
    height: 50px;
    width: 50%;
  }
  .armorSlct p, .genderSlct p, .selectionRight p, .selection p{
    margin-top: 14px;
  }
  .selection{
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    border: 1px solid #ff9900;
    border-right: none;
    font-size: 90%;
    height: 48px;
    width: 33.3333333333%;
  }
  .slctContRight, .slctContLeft{
    background-color: #ffffff;
  }
  #scarfsBg, #jacketsBg, #shirtsBg, #pantsBg, #shoesBg, #glovesBg, #shirts2Bg, #skirtsBg, #beltsBg{
    display: none;
  }
  .activeTitleLeft, .activeTitleRight, .slctdGender, .slctdType{
    color: #ffffff;
  }
  .activeContLeft, .activeContRight{
    display: block!important;
  }
  .armBg, .armBgs{
    background-size: cover;
    border: 1px solid #ff9900;
    float: left;
    height: 48px;
    width: 48px;
  }
  #shldLeftBg .armBg{
    transform: scale(-1, 1);
    -webkit-transform: scale(-1, 1);
    -moz-transform: scale(-1, 1);
  }
  #scarfArm, #gloveArm, #jacketArm, #shirtArm, #shoesArm, #pantsArm, #bshoesArm, #bshirtArm, #bjacketArm, #gndArm, #skirtArm, #bskirtArm, #beltArm{
    background-repeat: no-repeat;
    height: 500px;
    position: absolute;
    width: 200px;
    z-index: 2;
  }
  #beltsBg div{
    background-size: contain;
    background-repeat: no-repeat;
    background-position: 50%;
  }
  #gndArm{
    height: 400px;
    margin: 0 0 0 200px;
    z-index: 5;
  }
  #scarfArm{
    height: 106px;
    margin: 78px 0 0 253px;
    width: 95px;
    z-index: 13;
  }
  #beltArm{
    height: 37px;
    margin: 182px 0 0 257px;
    width: 86px;
    z-index: 10;
  }
  #skirtArm{
    height: 178px;
    margin: 182px 0 0 249px;
    width: 102px;
    z-index: 8;
  }
  #bskirtArm{
    height: 172px;
    margin: 189px 0 0 254px;
    width: 92px;
    z-index: 3;
  }
  #jacketArm{
    height: 203px;
    margin: 77px 0 0 222px;
    width: 155px;
    z-index: 12;
  }
  #shirtArm{
    height: 178px;
    margin: 92px 0 0 231px;
    width: 136px;
    z-index: 9;
  }
  #pantsArm{
    height: 175px;
    margin: 182px 0 0 257px;
    width: 85px;
    z-index: 6;
  }
  #shoesArm{
    height: 66px;
    margin: 322px 0 0 245px;
    width: 109px;
    z-index: 7;
  }
  #gloveArm{
    height: 48px;
    margin: 180px 0 0 229px;
    width: 142px;
    z-index: 11;
  }
  #bjacketArm{
    height: 227px;
    margin: 77px 0 0 249px;
    width: 102px;
    z-index: 1;
  }
  #bshoesArm{
    height: 39px;
    margin: 322px 0 0 255px;
    width: 89px;
    z-index: 4;
  }
  #bshirtArm{
    height: 234px;
    margin: 92px 0 0 237px;
    width: 126px;
    z-index: 2;
  }
  .armControl{
    float: left;
    width: 33%;
  }
  .canvasControl{
    margin: 0 auto;
    text-align: center;
  }
  .saveBtn{
    float: left;
    width: 25%;
  }
  #toPic{
    margin-bottom: 10px;
    position: relative;
    z-index: 9999;
  }
  .armControl input, .saveBtn input, .canvasControl input{
    border-radius: 5px;
    -moz-border-radius: 5px;
    -webkit-border-radius: 5px;
    -webkit-box-shadow: 0px 0px 5px 3px rgba(0,0,0,0.25);
    -moz-box-shadow: 0px 0px 5px 3px rgba(0,0,0,0.25);
    box-shadow: 0px 0px 5px 3px rgba(0,0,0,0.25);
    background-color: transparent;
    border: 1px solid #ff9900;
    color: #ff9900;
    font-size: 79%;
    height: 25px;
    margin-top: 13px;
  }
</style>
