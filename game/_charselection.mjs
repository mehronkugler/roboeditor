/**
 * Attach selectable player profiles to the document
 * @param  {[type]} characterJsonList A list of character json objects
 */
var populateCharacterList = function populateCharacterList( characterJsonList ) {

  var playerCharacterList = document.getElementById('charselect');

  for (let i = 0; i < characterJsonList.length; i++) {
    playerCharacterList.appendChild( createProfileElement( characterJsonList[i], i ) );
  }

};

/**
 * Produce a div like so:
 * // <div class="profile">
  //     <img src="/img/profile1_lg.png">
  //     <h4>Repair Bot</h4>
  //     <p>I was designed to clean and repair rooms in this publishing building. After some bleach spilled on my brain manifold, my inner circuitry keeps generating
  //         random words. And I need to share these with the world.
  //     </p>
  //     <button class="button charpick" charchoice=1 charname="Repair Bot">Pick Repair Bot</button>
  // </div>
 * @param  {[type]} characterJson An object containing information about the character
 * @param  {[type]} profileNum    The index of the data in the collection
 * @return {[type]}               HTMLElement
 */
var createProfileElement = function createProfileElement( characterJson, profileNum ) {

  var profile        = document.createElement('DIV');
  var profileImage   = document.createElement('IMG');
  var profileHeader  = document.createElement('H4');
  var profileSummary = document.createElement('P');
  var pickButton     = document.createElement('BUTTON');

  profile.classList.add("profile");
  profileImage.setAttribute('src', "/img/"+characterJson.portrait);
  profileHeader.innerText = characterJson.name;
  profileSummary.innerHTML = characterJson.introText;
  pickButton.classList.add("button", "charpick");
  pickButton.setAttribute("charchoice", parseInt(profileNum));
  pickButton.setAttribute("charname", characterJson.name);
  pickButton.innerText = "Pick " + characterJson.name;

  profile.appendChild(profileImage);
  profile.appendChild(profileHeader);
  profile.appendChild(profileSummary);
  profile.appendChild(pickButton);

  return profile;

};

export default populateCharacterList;
