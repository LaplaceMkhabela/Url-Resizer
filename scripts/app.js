
function copy(text) {
  navigator.clipboard.writeText(text);
  alert("Copied");
}


function remove(id) {
  document.getElementById(id).remove();
}

function setup() {

  if (!localStorage.getItem("count")) {
    localStorage.setItem("count", 1000);
  }
}


let urlCounter = localStorage.getItem("count"); 
let prefix = "https://short.mk/";


const base62Chars =
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

const urlDatabase = {};
setup();


function toBase62(num) {
  if (num === 0) return "0";
  let result = "";
  while (num > 0) {
    result = base62Chars[num % 62] + result;
    num = Math.floor(num / 62);
  }
  return result;
}


function resize() {
  const longUrl = document.getElementById("longUrl").value.trim();

  if (!longUrl) {
    alert("Please enter a URL");
    return;
  }

  const shortCode = toBase62(urlCounter++);
  localStorage.setItem("count",urlCounter);

  urlDatabase[shortCode] = longUrl;
  localStorage.setItem(shortCode, longUrl);

  const shortUrl = `${prefix}/${shortCode}`;

  document.getElementsByClassName("results")[0].innerHTML += `
        <div id="${shortCode}" class="card">
                <div class="card-head">
                    <?xml version="1.0" ?><svg viewBox="0 0 500 32" xmlns="http://www.w3.org/2000/svg"><path d="M8,12a1,1,0,0,0,1,1h6a1,1,0,0,0,0-2H9A1,1,0,0,0,8,12Zm2,3H7A3,3,0,0,1,7,9h3a1,1,0,0,0,0-2H7A5,5,0,0,0,7,17h3a1,1,0,0,0,0-2Zm7-8H14a1,1,0,0,0,0,2h3a3,3,0,0,1,0,6H14a1,1,0,0,0,0,2h3A5,5,0,0,0,17,7Z" fill="#6563ff"/></svg>
                    <a href="${urlDatabase[shortCode]}" target="_blank">${shortUrl}</a>
                </div>
                <div class="card-main">
                    <span class="long">${longUrl}</span>
                    <span class="card-controls">
                        <button id="copy${shortCode}"><?xml version="1.0" ?><svg data-name="Layer 2" id="a5b357d0-b6bb-4b51-acaf-aaa20a4d1704" viewBox="0 0 35 35" xmlns="http://www.w3.org/2000/svg"><path d="M20.717,34.748H3.616A3.37,3.37,0,0,1,.25,31.381v-17.1a3.369,3.369,0,0,1,3.366-3.365h17.1a3.368,3.368,0,0,1,3.365,3.365v17.1A3.369,3.369,0,0,1,20.717,34.748ZM3.616,13.416a.866.866,0,0,0-.866.865v17.1a.867.867,0,0,0,.866.867h17.1a.867.867,0,0,0,.865-.867v-17.1a.865.865,0,0,0-.865-.865Z"/><path d="M31.384,24.079H22.837a1.25,1.25,0,1,1,0-2.5h8.547a.867.867,0,0,0,.866-.866V3.618a.866.866,0,0,0-.866-.865h-17.1a.866.866,0,0,0-.866.865v8.548a1.25,1.25,0,0,1-2.5,0V3.618A3.369,3.369,0,0,1,14.279.253H31.384A3.369,3.369,0,0,1,34.75,3.618v17.1A3.37,3.37,0,0,1,31.384,24.079Z"/></svg></button>
                        <button id="del${shortCode}"><?xml version="1.0" ?><svg enable-background="new 0 0 32 32" id="Editable-line" version="1.1" viewBox="0 0 32 32" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="  M25,10H7v17c0,1.105,0.895,2,2,2h14c1.105,0,2-0.895,2-2V10z" fill="none" id="XMLID_194_" stroke="#dc3545" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/><path d="  M20,7h-8V5c0-1.105,0.895-2,2-2h4c1.105,0,2,0.895,2,2V7z" fill="none" id="XMLID_193_" stroke="#dc3545" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/><path d="  M28,10H4V8c0-0.552,0.448-1,1-1h22c0.552,0,1,0.448,1,1V10z" fill="none" id="XMLID_192_" stroke="#dc3545" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/><line fill="none" id="XMLID_191_" stroke="#dc3545" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" x1="13" x2="19" y1="16" y2="22"/><line fill="none" id="XMLID_190_" stroke="#dc3545" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" x1="13" x2="19" y1="22" y2="16"/></svg></button>
                    </span>
                </div>
        </div>
  
  `;

  document.getElementById(`copy${shortCode}`).addEventListener("click", () => {
    copy(shortUrl);
  });

  document.getElementById(`del${shortCode}`).addEventListener("click", () => {
    remove(shortCode);
  });
}
